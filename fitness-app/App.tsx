import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Toast from 'react-native-toast-message';

import Login from './app/screens/Login';
import SignUp from './app/screens/signUp';
import List from './app/screens/List';
import Profile from './app/screens/Profile';
import Activity from './app/screens/Activity';
import Leaderboard from './app/screens/Leaderboard';
import Details from './app/screens/Details';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        return null;
    }

    const TabNavigator = () => (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={List} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
        </Tab.Navigator>
    );

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={user ? 'TabNavigator' : 'Login'}>
                    {user ? (
                        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
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
