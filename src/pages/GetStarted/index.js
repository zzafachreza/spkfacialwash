import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function GetStarted({ navigation }) {


    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 0,
            backgroundColor: colors.white,
            justifyContent: 'center',
            position: 'relative'

        }}>


            <View style={{
                position: 'absolute',
                top: 0,
                zIndex: 99
            }}>
                <Image source={require('../../assets/top.png')} style={{
                    width: 150,
                    height: 140,
                }} />
            </View>





            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 1.5,
                    height: windowWidth / 1.5,
                    resizeMode: 'contain'
                }} />

                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.secondary[800],
                    fontSize: 15,
                    textAlign: 'center'
                }}>{MYAPP}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    textAlign: 'center',
                }}>SISTEM PENGAMBILAN KEPUTUSAN{'\n'}PEMILIHAN FACIAL WASH DENGAN METODE{'\n'}SIMPLE ADDITIVE WEIGHTING (SAW)</Text>

            </View>

            <View style={{
                marginBottom: 20,
                padding: 10,
            }}>
                <MyButton title="Login" Icons="log-in" warna={colors.primary} onPress={() => navigation.navigate('Login')} />
                <MyGap jarak={20} />
                <MyButton title="Register" Icons="create" warna={colors.secondary} onPress={() => navigation.navigate('Register')} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
