import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {BoldText, OtpInput} from '../../../components';
import {textConfig} from '../../../configs';
import {StackParamList} from '../../../navigation/navigator';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {useStatusBar} from '../../../utils/hooks';
import LogoWrapper from '../layout/logoWrapper';

export type verifyEmailProps = NativeStackScreenProps<
  StackParamList,
  'verifyEmail'
>;
let email = 'test@gmail.com';

const VerifyEmail = ({navigation}: verifyEmailProps) => {
  const theme = useTheme();
  useStatusBar('transparent', 'light-content', true);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = () => {
    navigation.push('uploadAvatar');
  };
  return (
    <LogoWrapper handleBack={handleBack}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BoldText variant="titleLarge" style={styles.title}>
          {textConfig.verifyEmailTitle}
        </BoldText>
        <BoldText
          variant="bodyMedium"
          style={[styles.title, {color: theme.colors.onBackground}]}
          children={`${textConfig.verifyEmailSubTitle} ${textConfig.resetPwdSubTitle} ${email} `}
        />
        <OtpInput
          buttonText={textConfig.verifyEmailTitle}
          handleSubmit={handleSubmit}
        />
        <Button
          mode="text"
          textColor={theme.colors.secondary}
          children={textConfig.resendOtp}
          rippleColor={'transparent'}
        />
      </ScrollView>
    </LogoWrapper>
  );
};

export default VerifyEmail;

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 35,
    height: SCREEN_HEIGHT / 2.5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});