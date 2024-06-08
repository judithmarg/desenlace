import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from  '../config/firebaseConfig';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function login() {
    const [stateLogin, setStateLogin] = useState('');

    return(
        <ThemedView>
            <ThemedText>hola</ThemedText>
        </ThemedView>
    )
}