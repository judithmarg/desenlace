import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TextInput, TouchableOpacity, Image, View, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if(email !== '' && password !== ''){
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Exito en login'))
        .catch((err) => Alert.alert('Error en', err.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.circle}></ThemedView>
      <View style={{ marginTop: 64 }}>
        <Image
          source={require("../../assets/images/huroncito2.png")}
          style={{ width: 100, height: 100, alignSelf: 'center' }} />
      </View>
      <View style={styles.formu}>
        <ThemedText style={styles.label}>Correo: </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        <ThemedText style={styles.label}>Contrasena: </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contrasena"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text)=>setPassword(text)}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(226, 197, 189)',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  formu:{
    display: 'flex',
    flexDirection: 'column',
    padding: 36,
  },
  label:{
    color:'black',
    fontSize:18,
    fontWeight:600,
    letterSpacing:1,
  },
  input:{
    backgroundColor: 'rgb(255, 244, 241)',
  }
})