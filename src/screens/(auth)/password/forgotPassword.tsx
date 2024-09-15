import React, {Fragment} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {SCREEN_HEIGHT} from '../../../utils/constants';

const ForgotPassword = ({addProgress}: {addProgress: () => void}) => {
  const theme = useTheme();

  const handleSubmit = () => {
    addProgress();
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.forgotPwdTitle}
      </BoldText>
      <BoldText
        variant="bodyMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}
        children={textConfig.forgotPwdSubTitle}
      />
      <InputBox
        placeholder={'Email'}
        keyboardType="email-address"
        textContentType="emailAddress"
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
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        onPress={handleSubmit}>
        {textConfig.submit}
      </CustomButton>
    </Fragment>
  );
};

export default ForgotPassword;

interface Style {
  title: TextStyle;
  container: ViewStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    height: SCREEN_HEIGHT / 2.5,
    padding: 35,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    marginVertical: 20,
  },
});