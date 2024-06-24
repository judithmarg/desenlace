import { collection, addDoc, orderBy, onSnapshot, query } from "firebase/firestore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useLayoutEffect, useCallback } from "react"
import { FlatList, StyleSheet, Keyboard, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView } from "react-native"
import { signOut } from "firebase/auth";
import { auth, firestore } from '../../config/firebaseConfig'
import { useFocusEffect, useRouter } from "expo-router";
import { useUserStore } from "@/navigation/store/userStore";

export default function ChatScreen() {
  const [messageCurrent, setMessageCurrent] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const {currentUser} = useUserStore();
  const route = useRouter();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => { setKeyboardStatus('shown') });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => { setKeyboardStatus('hidden') });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  }

  useLayoutEffect(() => {
    const collectionRef = collection(firestore, 'chats');
    const queryRef = query(collectionRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(queryRef, snapshot => {  //listener que nos avisa cuando hay un evento en la tabla
      console.log('snapshot');
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(prev => [...prev, ...messages])
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(firestore, 'chats'), {
      _id,
      createdAt,
      text,
      user
    }).catch(error => console.log(error));

  }, [])

  const onSendTest = () => {
    const newMessage = {
      _id: Date.now().toString(),
      createdAt: new Date(),
      text: messageCurrent,
      user: {
        _id: auth.currentUser.uid,
        name: currentUser.name || 'Anonymous'
      }
    };
    onSend([newMessage]);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.textHeader}>CHAT</ThemedText>
      </ThemedView>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior="height"
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          keyboardShouldPersistTaps='handled'
        >
      <View style={{display:'flex', flexDirection: 'column', alignItems:'flex-end', marginRight:-30, }}>
        {messages.map((message)=>(
          <View key={message._id} style={styles.messageMine}>
            <Text style={styles.textMine}>{message.text}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
      <ThemedView style={styles.sendMessage}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Escribe un mensaje..."
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={(text)=>setMessageCurrent(text)}
        />
        <TouchableOpacity onPress={onSendTest} style={styles.send}>
          <Ionicons size={27} name="send-outline" style={styles.iconSend} />
        </TouchableOpacity>
      </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36, //cambiaa
    paddingBottom: 5,
    paddingLeft:18,
    paddingRight:6,
  },
  header: {
    backgroundColor: 'rgb(82, 64, 90)',
    marginHorizontal: -36,
    paddingTop: 35,
    paddingBottom: 15,
    marginTop: -36,
  },
  textHeader: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 3,
  },
  messagesContainer:{
    flexGrow: 1,
    paddingHorizontal: 35,
    paddingVertical:5,
    justifyContent:'flex-end'
  },
  sendMessage: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: -5,
    gap: 5,
  },
  input: {
    backgroundColor: 'rgb(215, 189, 226)',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(107, 49, 133)',
    borderRadius: 18,
    color: 'black',
    width: '90%',
    height: 'auto',
    fontSize: 16,
  },
  send: {
  },
  iconSend: {
    color: 'rgb(215, 189, 226)',
  },
  messageMine: {
    backgroundColor: 'rgb(162, 132, 198)',
    marginVertical: 4,
    borderRadius: 20,
    padding:15,
    width: 'auto',
  },
  textMine:{
    fontSize:16,
  }
})