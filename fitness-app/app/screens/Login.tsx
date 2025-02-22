/*import { View, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet } from 'react-native';
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
                        <Button title="Create Account" onPress={() => navigation.navigate('SignUp')} /> 
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



*/




import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}>
        <Icon name="log-in-outline" size={80} color="#4CAF50" />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </KeyboardAvoidingView>
  );
}

// ✅ Styles
// Get screen width & height
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2C",
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  header: {
    alignItems: "center",
    marginBottom: height * 0.05, // 5% of screen height
  },
  title: {
    fontSize: width * 0.07, // Scale font size
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E3E",
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.02,
    width: "100%",
  },
  inputIcon: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: width * 0.045, // Scale input text
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: height * 0.015,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05, // Scale font
    fontWeight: "bold",
  },
  signupText: {
    color: "gray",
    fontSize: width * 0.04,
  },
  signupLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
