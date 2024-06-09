import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react"
import { FlatList, StyleSheet, Keyboard, TextInput, TouchableOpacity } from "react-native"

export default function ChatScreen() {
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
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.textHeader}>CHAT</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sendMessage}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Escribe un mensaje..."
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity onPress={() => { }} style={styles.send}>
          <Ionicons size={27} name="send-outline" style={styles.iconSend} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36, //cambiaa
    paddingBottom: 5,
  },
  header: {
    backgroundColor: 'rgb(82, 64, 90)',
    marginHorizontal: -36,
    paddingTop: 35,
    paddingBottom: 15,
    marginTop: -36,
  },
  textHeader:{
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 3,
  },
  sendMessage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: -25,
    gap: 5,
  },
  input: {
    backgroundColor: 'rgb(215, 189, 226)',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(107, 49, 133)',
    borderRadius: 18,
    color: 'white',
    width: '90%',
    height: 'auto',
    fontSize: 16,
  },
  send: {
  },
  iconSend: {
    color: 'rgb(215, 189, 226)',
  }
})