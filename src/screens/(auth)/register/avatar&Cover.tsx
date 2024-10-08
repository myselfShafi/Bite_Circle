import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {Avatar, Surface, Tooltip, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BoldText,
  CustomButton,
  CustomSnackbar,
  MainView,
  MediaUpload,
} from '../../../components';
import {textConfig} from '../../../configs';
import {StackParamList} from '../../../navigation/navigator';
import {authLogin} from '../../../store/features/authSlice';
import {useAppDispatch} from '../../../store/hooks';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';

export type uploadAvatarProps = NativeStackScreenProps<
  StackParamList,
  'uploadAvatar'
>;

const UploadAvatar = ({route}: uploadAvatarProps) => {
  const theme = useTheme();
  const {data} = route.params;

  const dispatch = useAppDispatch();
  const {fetchData, handleError, error, loading} = useCustomFetch();
  const [coverImage, setCoverImage] = useState<Asset | null>(null);
  const [avatar, setAvatar] = useState<Asset | null>(null);

  const handleSkip = () => dispatch(authLogin(data));

  let avatarSrc = avatar
    ? {uri: avatar?.uri}
    : require('../../../assets/avatar.webp');
  let coverImageSrc = coverImage
    ? {uri: coverImage?.uri}
    : require('../../../assets/cover.webp');

  const fetch = useCallback(
    async (url: string, fieldName: string, media: Asset) => {
      let formdata = new FormData();
      formdata.append(fieldName, {
        uri: media.uri,
        type: media.type,
        name: media.fileName,
      });
      return await fetchData({
        method: 'POST',
        url,
        data: formdata,
        authorize: true,
        headers: {'Content-Type': 'multipart/form-data'},
      });
    },
    [fetchData],
  );

  const handleSubmit = async () => {
    let result;
    if (avatar) {
      result = await fetch('/api/users/edit-avatar', 'avatar', avatar);
    }
    if (coverImage) {
      result = await fetch(
        '/api/users/edit-coverImage',
        'coverImage',
        coverImage,
      );
    }
    if (result?.data.success) dispatch(authLogin(result.data.data.user));
  };

  return (
    <MainView>
      <SafeAreaView style={styles.container}>
        <BoldText
          variant="displaySmall"
          children={'Almost there!'}
          style={styles.title}
        />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <BoldText variant="bodyLarge" children={'Your Username'} />
            <Tooltip
              title={'You can change this later from your profile.'}
              enterTouchDelay={0}>
              <Surface elevation={0} style={styles.username}>
                <BoldText>@{data?.userName || 'new_user2018'}</BoldText>
              </Surface>
            </Tooltip>
          </View>
          <View style={styles.wrapper}>
            <BoldText variant="bodyLarge" children={'Upload Your Avatar'} />
            <MediaUpload
              disabled={loading}
              style={styles.center}
              setUpload={setAvatar}>
              <Avatar.Image size={SCREEN_HEIGHT / 5} source={avatarSrc} />
            </MediaUpload>
          </View>
          <View style={styles.wrapper}>
            <BoldText
              variant="bodyLarge"
              children={'Upload Your Cover Image'}
            />
            <MediaUpload
              disabled={loading}
              style={[
                styles.coverWrapper,
                styles.center,
                {
                  borderColor: theme.colors.surfaceVariant,
                  backgroundColor: theme.colors.surface,
                },
              ]}
              setUpload={setCoverImage}>
              <Image
                source={coverImageSrc}
                style={coverImage ? styles.cover : styles.placeholder}
              />
            </MediaUpload>
          </View>
        </View>
        <View style={styles.action}>
          <CustomButton
            mode="text"
            color={theme.colors.primary}
            variant="bodyMedium"
            size="small"
            disabled={loading}
            onPress={handleSkip}>
            {textConfig.skip}
          </CustomButton>
          <CustomButton
            variant="bodyMedium"
            size="small"
            loading={loading}
            disabled={loading}
            style={styles.button}
            onPress={handleSubmit}>
            {textConfig.continue}
          </CustomButton>
        </View>
      </SafeAreaView>
      <CustomSnackbar
        variant="error"
        visible={error.status}
        onDismiss={handleError}
        onIconPress={handleError}
        children={error.message}
      />
    </MainView>
  );
};

export default UploadAvatar;

interface Style {
  container: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  action: ViewStyle;
  wrapper: ViewStyle;
  center: ViewStyle;
  coverWrapper: ViewStyle;
  cover: ImageStyle;
  placeholder: ImageStyle;
  content: ViewStyle;
  username: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 35,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    minWidth: 100,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    gap: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverWrapper: {
    borderWidth: 2,
    borderRadius: 20,
    height: SCREEN_HEIGHT / 4,
    width: '100%',
    overflow: 'hidden',
  },
  placeholder: {
    height: 80,
    width: 80,
  },
  cover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  username: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
});
