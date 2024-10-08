import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  CustomButton,
  CustomSnackbar,
  InputBox,
} from '../../../components';
import {textConfig} from '../../../configs';
import {authLogin} from '../../../store/features/authSlice';
import {useAppDispatch} from '../../../store/hooks';
import {storeSession} from '../../../utils/encryptStorage';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import {LoginSchema} from '../../../utils/validationSchema';
import {AuthProps} from '../welcome';

const Login = ({navigation}: Omit<AuthProps, 'route'>): JSX.Element => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const {loading, error, handleError, fetchData} = useCustomFetch();
  const dispatch = useAppDispatch();

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const goToForgotPwd = () => {
    navigation.push('forgotPwd');
  };

  const handleLogin = async (value: any) => {
    const result = await fetchData({
      method: 'POST',
      url: 'api/users/login',
      data: {email: value.email, passwordHash: value.password},
    });
    if (result?.data.success) {
      let userData = result.data.data.user;
      if (!userData.isVerifiedEmail) {
        // temp store data
        const resendOtp = await fetchData({
          method: 'POST',
          url: 'api/otp/send-emailOtp',
          data: {email: value.email, action: 'VERIFY-EMAIL'},
        });
        if (resendOtp?.data.success) {
          navigation.push('verifyEmail', {
            data: {
              fullName: userData.fullName,
              email: userData.email,
            },
          });
        }
      } else {
        await storeSession('tokens', {
          accessToken: result.data.data.accessToken,
          refreshToken: result.data.data.refreshToken,
        });
        dispatch(authLogin(userData));
      }
    }
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.loginTitle}
      </BoldText>
      <Formik
        initialValues={{email: 'test@gmail.com', password: 'qwertyuiop'}}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <InputBox
              placeholder={textConfig.placeholders.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorText={errors.email}
              disabled={loading}
              wrapperStyle={styles.gap}
              left={
                <TextInput.Icon
                  icon={({size, color}) => (
                    <IonIcon name="mail-outline" size={size} color={color} />
                  )}
                  size={20}
                  disabled
                  aria-disabled
                />
              }
            />
            <InputBox
              placeholder={textConfig.placeholders.password}
              textContentType="password"
              secureTextEntry={!showPwd}
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorText={errors.password}
              disabled={loading}
              wrapperStyle={styles.gap}
              left={
                <TextInput.Icon
                  icon={({size, color}) => (
                    <IonIcon
                      name={
                        showPwd ? 'lock-open-outline' : 'lock-closed-outline'
                      }
                      size={size}
                      color={color}
                    />
                  )}
                  size={20}
                  disabled
                  aria-disabled
                />
              }
              right={
                <TextInput.Icon
                  icon={({size, color}) => (
                    <IonIcon
                      name={showPwd ? 'eye-outline' : 'eye-off-outline'}
                      size={size}
                      color={color}
                    />
                  )}
                  size={20}
                  onPress={togglePwd}
                />
              }
            />
            <CustomButton
              mode="text"
              children={textConfig.forgotPwd}
              size="small"
              disabled={loading}
              style={styles.gap}
              onPress={goToForgotPwd}
            />
            <CustomButton
              variant="titleMedium"
              size="large"
              loading={loading}
              disabled={loading}
              style={styles.button}
              onPress={() => handleSubmit()}>
              {textConfig.login}
            </CustomButton>
          </>
        )}
      </Formik>
      <CustomSnackbar
        variant="error"
        visible={error.status}
        onDismiss={handleError}
        onIconPress={handleError}
        children={error.message}
      />
    </Fragment>
  );
};

export default Login;

interface Style {
  title: TextStyle;
  button: ViewStyle;
  gap: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
  },
  gap: {
    marginBottom: 20,
  },
});
