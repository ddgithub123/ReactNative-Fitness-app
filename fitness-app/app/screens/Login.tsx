import { View, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const showToast = (type: 'success' | 'error', message: string) => {
        Toast.show({
            type: type,
            text1: message,
            position: 'top',
        });
    };

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            showToast('success', 'Login Successful');
        } catch (error: any) {
            console.log(error);
            showToast('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    value={email} 
                    autoCapitalize="none" 
                    onChangeText={(text) => setEmail(text)} 
                />
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    placeholder="Password" 
                    value={password} 
                    autoCapitalize="none" 
                    onChangeText={(text) => setPassword(text)} 
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create Account" onPress={() => navigation.navigate('SignUp')} /> {/* ✅ Fix navigation */}
                    </>
                )}
            </KeyboardAvoidingView>
            <Toast />
        </View>
    );
};

export default Login;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
});
