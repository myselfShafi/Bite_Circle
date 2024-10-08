import React, {useState} from 'react';
import {
  ImageStyle,
  Pressable,
  PressableProps,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {PostData} from '../configs/types';

type FoodCardProps = PressableProps & {
  data: PostData;
  mode?: 'outlined' | 'elevated' | 'contained' | undefined;
};

export const dummyImg =
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718881367~exp=1718884967~hmac=eae0014733b68da80852a536180ff451c7ddceda3c08f01539848bb9b13f5e76&w=740';

const FoodCard = ({
  data,
  mode = 'contained',
  ...prop
}: FoodCardProps): JSX.Element => {
  const theme = useTheme();
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);

  const expandPost = () => setExpand(true);

  return (
    <Pressable {...prop}>
      <Card
        style={[
          styles.container,
          {backgroundColor: theme.colors.elevation.level1},
        ]}
        mode={mode}>
        <Card.Title
          titleStyle={styles.title}
          title={data.name}
          subtitle={data.timestamp}
          left={props => (
            <Avatar.Image {...props} source={{uri: data.avatar}} />
          )}
          right={props => (
            <View style={styles.icons} {...props}>
              <IconButton icon="share-outline" size={24} />
              <IconButton icon="dots-vertical" size={24} />
            </View>
          )}
        />
        <Card.Cover source={{uri: data.image}} style={styles.cover} />
        <Card.Actions style={styles.action}>
          <View style={styles.icons}>
            <Button
              icon={({color}) => (
                <Icon
                  source={liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={liked ? theme.colors.error : color}
                />
              )}
              mode="text"
              rippleColor={'transparent'}
              onPress={() => setLiked(!liked)}>
              123
            </Button>
            <Button
              icon={({color}) => (
                <Icon source={'chat-outline'} size={24} color={color} />
              )}
              mode="text"
              rippleColor={'transparent'}
              onPress={() => console.log('Pressed')}>
              45
            </Button>
          </View>
          <IconButton
            icon={bookmark ? 'bookmark' : 'bookmark-outline'}
            size={20}
            onPress={() => setBookmark(!bookmark)}
          />
        </Card.Actions>
        <Card.Content>
          <Text variant="bodyLarge" numberOfLines={expand ? 0 : 2}>
            {data.post}
          </Text>
          {!expand && (
            <Button mode="text" onPress={expandPost}>
              read more
            </Button>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default FoodCard;

interface Style {
  container: ViewStyle;
  title: TextStyle;
  cover: ImageStyle;
  icons: ViewStyle;
  action: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    borderRadius: 0,
  },
  title: {
    fontWeight: '900',
    minHeight: 24,
  },
  cover: {
    borderRadius: 0,
    height: 400,
    // height: '100%',
    // maxHeight: 400,
  },
  icons: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    padding: 0,
  },
});
