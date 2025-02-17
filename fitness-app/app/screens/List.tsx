import { View, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import Toast from 'react-native-toast-message';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
                position: 'top',
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
                text2: error.message,
                position: 'top',
            });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('Details')} title='Open Details' />
            <Button onPress={handleLogout} title='Logout' />
            <Toast />
        </View>
    );
};

export default List;
