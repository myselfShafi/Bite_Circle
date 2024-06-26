import React, {useState} from 'react';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {getTruncText} from '../utils';

export const dummyImg =
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718881367~exp=1718884967~hmac=eae0014733b68da80852a536180ff451c7ddceda3c08f01539848bb9b13f5e76&w=740';

const FoodCard = (props: PressableProps) => {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const content = getTruncText(
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium enim omnis provident quaerat, nobis dicta ut maiores nesciunt, voluptatem ab totam id voluptates, nemo atque porro laborum temporibus iste accusamus?',
  );

  return (
    <Pressable {...props}>
      <Card style={styles.container}>
        <Card.Title
          titleStyle={styles.title}
          title="John Doe"
          subtitle="8 hours ago"
          left={props => <Avatar.Image {...props} source={{uri: dummyImg}} />}
          right={props => (
            <View style={styles.icons} {...props}>
              <IconButton icon="share-variant-outline" size={20} />
              <IconButton icon="dots-vertical" size={24} />
            </View>
          )}
        />
        <Card.Cover
          source={{uri: 'https://picsum.photos/800'}}
          style={styles.cover}
        />
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
          <Text>
            <Text variant="bodyLarge">{content}</Text>
            <Text style={{color: theme.colors.primary}}>read more</Text>
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
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
