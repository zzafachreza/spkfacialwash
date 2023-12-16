import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyButton, MyGap } from '../../components';

export default function BrandDetail({ navigation, route }) {
    const item = route.params;
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <Image source={{
                uri: item.image
            }} style={{
                width: '100%',
                resizeMode: 'contain',
                height: 200,
            }} />
            <View style={{
                padding: 30,
                backgroundColor: colors.white
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    marginVertical: 5,
                    fontSize: 15,
                    color: colors.black
                }}>{item.nama_brand}</Text>

                <Text style={{
                    fontFamily: fonts.secondary[400],
                    marginVertical: 5,
                    fontSize: 12,
                    color: colors.black
                }}>{item.profil}</Text>

                <MyGap jarak={20} />
                <MyButton warna={colors.secondary} title="Kunjungi Web" Icons="globe" onPress={() => {
                    Linking.openURL(item.alamat_web)
                }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})