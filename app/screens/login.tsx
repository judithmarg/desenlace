import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TextInput, Text, TouchableOpacity, Image, View, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { useFonts } from "expo-font";
import { useUserStore } from "@/navigation/store/userStore";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser, setCurrentUser} = useUserStore();
  const router = useRouter();
  const [loaded] = useFonts({
    Sofia: require('../../assets/fonts/Sofia-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          setCurrentUser({
            _id: auth.currentUser.uid,
            name: email
          });
          console.log('Exito en inicio de sesion');
          router.push('/(tabs)/chat');
        })
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
        <Text style={styles.title}>AssistanceU</Text>
      </View>
      <View style={styles.formu}>
        <ThemedText style={styles.label}>Correo electrónico: </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <ThemedText style={styles.label}>Contraseña: </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.buttonContinue} onPress={onHandleLogin}>
          <Text style={styles.buttooon}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(153, 129, 177)',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: 'white',
    position: 'absolute',
    right: -100,
    top: 60,
  },
  title: {
    fontSize: 30,
    color: '#573920',
    textAlign: 'center',
    fontFamily: 'Sofia',
  },
  formu: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 36,
    paddingLeft: 76,
  },
  label: {
    color: 'black',
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgb(245, 227, 253)',
    padding: 8,
    borderRadius: 15,
    margin: 15,
    fontSize: 16,
  },
  containerButton: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttonContinue: {
    backgroundColor: 'rgb(182, 139, 101)',
    height: 'auto',
    width: 'auto',
    padding: 16,
    borderRadius: 15,
    marginVertical: 80,
    marginHorizontal: 20,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttooon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})