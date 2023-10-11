import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button, Snackbar } from "react-native-paper"
import { globalStyles } from "../../../styles"
import { authCtrl } from "../../../api"
import { useAuth } from "../../../hooks"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./LoginForm.form"


export function LoginForm(props) {
    const { showRegister } = props;
    const { login } = useAuth()
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { email, password } = formValue;
                const response = await authCtrl.login(email, password)
                login(response.jwt)
                console.log(response);
            } catch (error) {
                setVisible(true)
                console.log(error);
            }
        }
    })

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 25, paddingVertical: 30 }}>INICIAR SESION</Text>
            <View style={styles.formContainer}>
                <TextInput
                    label="Correo electronico"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    mode='outlined'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    value={formik.values.email}
                    error={formik.errors.email}
                />

                <TextInput
                    label="Contraseña"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    secureTextEntry
                    mode="outlined"
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
                />

                <Button
                    mode='elevated'
                    style={globalStyles.form.btnSuccess}
                    labelStyle={{ color: "white" }}
                    loading={formik.isSubmitting}
                    onPress={formik.handleSubmit}
                >
                    Iniciar sesion
                </Button>
                <Text style={{ paddingVertical: 15, fontWeight: "bold", alignSelf: "center" }}> ¿No tienes una cuenta?</Text>
                <Button
                    mode='text'
                    style={globalStyles.form.btnTextLabel}
                    labelStyle={{ color: "black" }}
                    onPress={showRegister}>Registrate aqui!
                </Button>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Cerrar',
                        onPress: onDismissSnackBar,
                    }}>
                    Error al enviar los datos.
                </Snackbar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        marginTop: -25,
        backgroundColor: "#ffff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    formContainer: {
        padding: 10,
        marginHorizontal: 20
    }
});
