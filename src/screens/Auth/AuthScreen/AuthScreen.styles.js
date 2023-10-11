import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    loginImage: {
        width: width,
        aspectRatio: 16 / 9
    },
})