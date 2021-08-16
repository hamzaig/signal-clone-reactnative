import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import { auth } from '../firebase'


const LoginScreen = ({ navigation }) => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
    }

    return (
        <View behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
            }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <View style={{ width: 250 }}>
                <Button onPress={signIn} title="Login" onPress={signIn} />
            </View>
            <View style={{ width: 250, marginTop: 10 }}>
                <Button onPress={() => navigation.navigate("Register")} type="outline" Style={styles.button} title="Register" />
            </View>
            <View style={{ height: 10 }}></View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 50,
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
})
