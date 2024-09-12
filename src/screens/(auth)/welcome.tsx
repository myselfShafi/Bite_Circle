import React, {Fragment, useState} from 'react';
import {
  ImageBackground,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BoldText, CustomButton, IconBtn, MainView} from '../../components';
import {textConfig} from '../../configs';
import {useAppTheme} from '../../context/Theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import Login from './login/login';
import Register from './register/register';

type authType = 'login' | 'signup' | null;

const Welcome = (): JSX.Element => {
  const {theme} = useAppTheme();

  const [authMode, setAuthMode] = useState<authType>(null);

  const screenHeight = useSharedValue<number>(SCREEN_HEIGHT / 2.5);
  const scale = useSharedValue<number>(1);
  const shift = useSharedValue<number>(1);

  const AnimateScreen = useAnimatedStyle(() => ({
    height: screenHeight.value,
  }));

  const AnimateLogo = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const AnimateShift = useAnimatedStyle(() => ({
    opacity: shift.value,
  }));

  const handleBack = () => {
    screenHeight.value = withSpring(SCREEN_HEIGHT / 2.5);
    scale.value = withTiming(1, {duration: 500});
    shift.value = withTiming(1, {duration: 500});
    setAuthMode(null);
  };

  const handleAuth = (mode: authType) => {
    let height = mode === 'login' ? SCREEN_HEIGHT / 1.75 : SCREEN_HEIGHT / 1.4;
    let options = {duration: 500};
    screenHeight.value = withTiming(height, options);
    scale.value = withTiming(0.75, options);
    shift.value = withTiming(0, options, () => {
      'worklet';
      runOnJS(setAuthMode)(mode);
    });
  };

  return (
    <MainView>
      <ImageBackground
        source={require('../../assets/welcome1.webp')}
        resizeMode="cover"
        style={styles.image}>
        {authMode && (
          <IconBtn
            name={'return-up-back'}
            onPress={handleBack}
            style={styles.back}
          />
        )}
        <LinearGradient
          colors={['transparent', 'transparent', theme.colors.background]}
          style={styles.logoWrapper}>
          <Animated.Image
            source={require('../../assets/bg_logo.png')}
            style={[styles.logo, AnimateLogo]}
            resizeMode="contain"
          />
        </LinearGradient>
      </ImageBackground>
      <Animated.View style={[AnimateScreen]}>
        <Animated.View style={[AnimateShift, styles.container]}>
          {!authMode && (
            <BoldText
              variant="titleSmall"
              style={styles.tagline}
              children={textConfig.tagline}
            />
          )}
          {!authMode && (
            <Fragment>
              <CustomButton
                variant="titleMedium"
                size="large"
                style={styles.button}
                onPress={() => handleAuth('signup')}>
                {textConfig.signup}
              </CustomButton>
              <CustomButton
                mode="outlined"
                variant="titleMedium"
                size="large"
                style={styles.button}
                onPress={() => handleAuth('login')}>
                {textConfig.login}
              </CustomButton>
            </Fragment>
          )}
        </Animated.View>
        <Animated.View style={[styles.container]}>
          {authMode === 'login' && <Login />}
          {authMode === 'signup' && <Register />}
        </Animated.View>
      </Animated.View>
    </MainView>
  );
};

export default Welcome;

interface Style {
  logoWrapper: ViewStyle;
  back: ViewStyle;
  image: ImageStyle;
  logo: ImageStyle;
  container: ViewStyle;
  tagline: TextStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: 15,
  },
  image: {
    flex: 1,
  },
  logo: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
  },
  container: {
    paddingBottom: 35,
    paddingHorizontal: 35,
    rowGap: 20,
  },
  tagline: {
    width: SCREEN_WIDTH / 1.75,
    fontStyle: 'italic',
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
  },
});