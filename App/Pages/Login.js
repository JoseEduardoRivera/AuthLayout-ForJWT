import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from 'react'
import Color from '../Shared/Color';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"

const { width } = Dimensions.get('window');

export function Login() {

    const [accessToken, SetAccessToken] = useState();

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '851191819355-2jgh0jh7sgg8qhkchfk5eqtfb19ieg0s.apps.googleusercontent.com',
        expoClientId: '851191819355-judim9i3u3nq8qfiit94h7aus1c3pmbs.apps.googleusercontent.com'
    });

    useEffect(() => {
        if (response?.type == 'success') {
            SetAccessToken(response.authentication.accessToken);
            console.log(response.authentication.accessToken);
        }
    }, [response])




    return (
        <View>
            <Image style={styles.loginImage} source={require('./../Assets/Images/Login.jpg')} />
            <View style={styles.container}>
                <Text style={styles.bienvenidaText}>
                    Bienvenido a CourseX
                </Text>
                <TouchableOpacity>
                    <Text style={styles.logSignText}>
                        Login/Sign Up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
                    <Ionicons style={{ marginRight: 10 }} name='logo-google' size={24} color="white" />
                    <Text style={{ color: Color.white }}>Sign In with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginImage: {
        width: width,
        aspectRatio: 16 / 9
    },
    container: {
        paddingTop: 5,
        marginTop: -25,
        backgroundColor: "#ffff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bienvenidaText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        paddingTop: 50
    },
    logSignText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 25,
        borderColor: "black",
        borderWidth: 2,
        marginHorizontal: 30,
        borderRadius: 10
    },
    button: {
        backgroundColor: Color.primary,
        padding: 10,
        margin: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    }

})
