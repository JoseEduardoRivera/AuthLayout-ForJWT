import { useState } from 'react'
import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { styles } from "./AuthScreen.styles"
import { LoginForm, RegisterForm } from "../../../components/Auth"

export function AuthScreen() {
    const [showLogin, setshowLogin] = useState(true);

    const onShowLoginRegister = () => setshowLogin((prevState) => !prevState)

    return (
        <View>
            <Image style={styles.loginImage} source={require('../../../../assets/Login.jpg')} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {showLogin ? <LoginForm showRegister={onShowLoginRegister} /> : <RegisterForm showLogin={onShowLoginRegister} />}
            </KeyboardAvoidingView>
        </View>
    )
}
