import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import BoldText from './common/BoldText';
import CustomButton from './common/Button';

const Suggestion = (): JSX.Element => {
  return (
    <Surface elevation={0} style={styles.wrapper}>
      <Avatar.Image
        size={75}
        source={{
          uri: 'https://images.unsplash.com/photo-1594583388647-364ea6532257',
        }}
      />
      <BoldText variant="labelLarge" numberOfLines={1} ellipsizeMode="tail">
        John Doe
      </BoldText>
      <CustomButton size="small" children={'Follow'} />
    </Surface>
  );
};

export default Suggestion;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 10,
    rowGap: 5,
    maxWidth: 115,
  },
});
