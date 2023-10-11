import { View, Text, SafeAreaView } from 'react-native'
import { Button } from "react-native-paper"
import { useAuth } from "../hooks"

export function AppNavigation() {
    const { logout } = useAuth()
    return (
        <SafeAreaView>
            <Text>AppNavigation</Text>
            <Button onPress={logout}>Cerrar sesion</Button>
        </SafeAreaView>
    )
}