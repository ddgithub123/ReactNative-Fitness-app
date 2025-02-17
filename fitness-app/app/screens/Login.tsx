import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [error, setError] = useState(" ");
    const [success, setSuccess] = useState(" ");
    const [loading,setLoading] = useState(false)
    const auth =FIREBASE_AUTH

    const signIn = async() =>{
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false)
            alert('Check your credentials')
            setSuccess("Login Success")
        } catch (error) {
            console.log(error)
            alert('SignIn failed')
                
        }finally{
            setLoading(false)
        }
    }

    const signUp = async() =>{
        setLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            setLoading(false)
            setSuccess("Sign Up Success")
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <TextInput style = {styles.input} placeholder='Email' value={email} autoCapitalize='none' onChangeText={(text)=>setEmail(text)}></TextInput>
      <TextInput style = {styles.input} secureTextEntry={true} placeholder='password' value={password} autoCapitalize='none' onChangeText={(text)=>setPassword(text)}></TextInput>
      {loading ? (<ActivityIndicator size='large' color='#0000ff'/>)
      :<>
      <Button title='Login' onPress={signIn}/>
      <Button title='Create Account' onPress={signUp}/>
        </>
        }
        </KeyboardAvoidingView>
      
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center', 
    },
    input: {
        marginVertical:4,
        height: 50,
        borderWidth: 1,
        borderRadius:4,
        padding: 10,
        backgroundColor: '#fff'
    }
})