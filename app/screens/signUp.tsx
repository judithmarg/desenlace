import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TextInput, TouchableOpacity, Image, View, Alert, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [loaded] = useFonts({
    Sofia: require('../../assets/fonts/Sofia-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Exito en registro');
          router.push('/screens/login');
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
      <Link href="/screens/login" style={{ color: 'black' }}>Ya te registraste?</Link>
        <View style={styles.minicontainer}>
          <TouchableOpacity style={styles.buttonContinue} onPress={onHandleSignup}>
            {/* <Link push href={'/screens/login'} style={styles.buttooon}>Continuar</Link> */}
            <Text style={styles.buttooon} >Continuar</Text>
          </TouchableOpacity>
        </View>
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
    left: -100,
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
    padding: 36,
  },
  label: {
    color: 'black',
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgb(255, 244, 241)',
    padding: 8,
    borderRadius: 15,
    margin: 15,
    fontSize: 16,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 80,
    marginHorizontal: 20,
  },
  minicontainer:{
    alignItems: 'flex-end',
    
  },
  buttonContinue: {
    backgroundColor: 'rgb(162, 132, 198)',
    height: 'auto',
    width: 'auto',
    padding: 16,
    borderRadius: 15,
    
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