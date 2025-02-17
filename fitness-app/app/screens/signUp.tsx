import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            
            // Logout immediately after signing up
            await signOut(FIREBASE_AUTH);

            // Show success message
            Toast.show({
                type: 'success',
                text1: 'Account created!',
                text2: 'Please log in to continue.',
                position: 'top',
            });

            // Navigate back to Login
            navigation.navigate('Login');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Sign-up failed',
                text2: error.message,
                position: 'top',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={signUp} disabled={loading} />
            <Toast />
        </View>
    );
};

export default SignUp;
