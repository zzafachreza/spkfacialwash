import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);



  const _getTransaction = () => {

    getData('user').then(u => {
      console.log('data user', u)
      setUser(u);
    });

    axios.post(apiURL + 'brand.php').then(res => {
      console.log(res.data);
      setData(res.data);
    })


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      position: 'relative'
    }}>

      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 0
      }}>
        <Image source={require('../../assets/top2.png')} style={{
          width: 80,
          height: 110,
        }} />
      </View>




      <View style={{
        paddingHorizontal: 10,
      }}>

        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/logo.png')} style={{
              width: 60,
              height: 60,
            }} />
            <View style={{
              paddingLeft: 10,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.black
              }}>Selamat datang,  </Text>
              <Text style={{
                fontFamily: fonts.secondary[800],
                fontSize: 15,
                color: colors.black
              }}>{user.nama_lengkap}</Text>
            </View>
          </View>

          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.primary,
            fontSize: 20,
          }}>SPK FACIAL WASH</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.secondary
          }}>SPK PEMILIHAN FACIAL WASH METODE SAW</Text>
        </View>
      </View>

      <View style={{
        flex: 1,
        padding: 10,
      }}>
        <FlatList numColumns={2} data={data} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('BrandDetail', item)}>
              <View style={{
                flex: 1,
                margin: 10,
                borderRadius: 10,
                borderColor: colors.border,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={{
                  uri: item.image
                }} style={{
                  width: windowWidth / 3,
                  height: windowWidth / 4,
                  resizeMode: 'contain'
                }} />
                <Text style={{
                  fontFamily: fonts.secondary[800],
                  fontSize: 15,
                  color: colors.black
                }}>{item.nama_brand}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
      </View>
      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 11,
            color: colors.white
          }}>Home</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perhitungan')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='grid-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 11,
            color: colors.white
          }}>Perhitungan</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Hasil')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='print-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 11,
            color: colors.white
          }}>Hasil</Text>

        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 11,
            color: colors.white
          }}>Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})