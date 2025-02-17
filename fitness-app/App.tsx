import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Toast from 'react-native-toast-message';

import Login from './app/screens/Login';
import SignUp from './app/screens/signUp';
import List from './app/screens/List';
import Details from './app/screens/Details';

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
            console.log('User state changed:', authUser);
            setUser(authUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null; // Prevents flickering while checking auth state
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
                    {user ? (
                        <Stack.Screen name="Home" component={List} options={{ headerShown: true }} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        </>
                    )}
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </>
    );
}
