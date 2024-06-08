import ParallaxScrollView from "@/components/ParallaxScrollView"
import { Ionicons } from "@expo/vector-icons"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { useState, useEffect } from "react"
import { FlatList, StyleSheet, Keyboard, TextInput } from "react-native"

const messages = [
  {
    id: '1',
    userName: 'Sandra Belle',
    userImg: require('../../assets/images/react-logo.png'),
    messageTime: '5 min ago',
    messageText:
      'Hola, esta es una prueba de mensaje en realidad',
  },
  {
    id: '2',
    userName: 'James Alcaraz',
    userImg: require('../../assets/images/react-logo.png'),
    messageTime: '35 min ago',
    messageText:
      'Hola, aca otro mensaje de prueba',
  },
  {
    id: '3',
    userName: 'Mia Fernandez',
    userImg: require('../../assets/images/react-logo.png'),
    messageTime: '45 min ago',
    messageText:
      'Si se pudiera realizar mejores funcionalidades entonces',
  }
];

export default function home() {
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => { setKeyboardStatus('shown') });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => { setKeyboardStatus('hidden') });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
    <ThemedView>
      <ThemedText>Hola</ThemedText>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ThemedView>
            <ThemedText>{item.userName}</ThemedText>

          </ThemedView>
        )}
      />
    </ThemedView>
    </ParallaxScrollView>
  )
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -80,
    left: -35,
    position: 'absolute',
  }
})
