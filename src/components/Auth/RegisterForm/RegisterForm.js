import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button, SegmentedButtons, Snackbar } from "react-native-paper"
import { globalStyles } from "../../../styles"
import { authCtrl } from "../../../api"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./RegisterForm.form"

export function RegisterForm(props) {
    const { showLogin } = props;
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { email, username, telefono, cargo, password } = formValue;
                await authCtrl.register(email, username, telefono, cargo, password)
                showLogin()
            } catch (error) {
                setVisible(true)
                console.log(error);
            }
        }
    })


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 25 }}>REGISTRATE</Text>
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
                    label="Nombre del usuario"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    mode='outlined'
                    onChangeText={(text) => formik.setFieldValue("username", text)}
                    value={formik.values.username}
                    error={formik.errors.username}

                />
                <TextInput
                    label="Telefono"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    mode='outlined'
                    onChangeText={(text) => formik.setFieldValue("telefono", text)}
                    value={formik.values.telefono}
                    error={formik.errors.telefono}
                    keyboardType='numeric'
                />
                <SegmentedButtons
                    value={formik.values.cargo}
                    onValueChange={(value) => formik.setFieldValue("cargo", value)}
                    buttons={[
                        { value: 'Supervisor', label: "Supervisor", checkedColor: "blue" },
                        { value: 'Inspector', label: "Inspector", checkedColor: "green" },
                    ]}


                />
                <TextInput
                    label="Contraseña (Min:8)"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    secureTextEntry
                    mode="outlined"
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <TextInput
                    label="Repetir contraseña"
                    style={globalStyles.form.input}
                    activeOutlineColor='blue'
                    autoCapitalize="none"
                    secureTextEntry
                    mode="outlined"
                    onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                    value={formik.values.repeatPassword}
                    error={formik.errors.repeatPassword}
                />
                <Button
                    mode='elevated'
                    style={globalStyles.form.btnSuccess}
                    labelStyle={{ color: "white" }}
                    loading={formik.isSubmitting}
                    onPress={formik.handleSubmit}
                >
                    Registrarse
                </Button>
                <Text style={{ paddingVertical: 15, fontWeight: "bold", alignSelf: "center" }}> ¿Ya tienes una cuenta?</Text>
                <Button
                    mode='text'
                    style={globalStyles.form.btnTextLabel}
                    labelStyle={{ color: "black" }}
                    onPress={showLogin}>Iniciar sesion
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