import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';


const MyList = ({ label, value }) => {
    return (
        <View
            style={{
                marginVertical: 3,
                padding: 5,
                backgroundColor: colors.white,
                borderRadius: 5,
            }}>
            <Text
                style={{
                    fontFamily: fonts.primary[400],
                    color: '#8E99A2',
                }}>
                {label}
            </Text>
            <Text
                style={{
                    fontFamily: fonts.primary[400],
                    color: colors.black,
                }}>
                {value}
            </Text>
        </View>
    )
}

export default function Account({ navigation, route }) {
    const [user, setUser] = useState({
        username: ' ',
        nama_lengkap: ' ',
        level: ' '
    });
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(true);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F4F6FF'
        }}>





            <View style={{
                backgroundColor: colors.white,
                margin: 10,
            }}>


                <View style={{ padding: 10, }}>
                    <MyList label="Username" value={user.username} />
                    <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                    <MyList label="Level" value={user.level} />


                </View>
                {/* data detail */}
            </View>


            <View style={{
                padding: 20,
            }}>

                <MyButton onPress={() => navigation.navigate('AccountEdit', user)} warna={colors.secondary} title="Edit Profile" Icons="create" iconColor={colors.white} colorText={colors.white} />
                <MyGap jarak={20} />
                <MyButton onPress={btnKeluar} warna={colors.black} title="Log Out" Icons="log-out" iconColor={colors.white} colorText={colors.white} />

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
