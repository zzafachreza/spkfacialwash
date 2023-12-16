import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});





  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'Username dan Password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'Username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login.php', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data[0]);
            navigation.replace('Home')
          }
        }).finally(() => {
          setLoading(false)
        });



    }




  }

  useEffect(() => {

    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}>

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
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: windowWidth / 3,
            height: windowWidth / 3,
            resizeMode: 'contain',
          }} />
          <Text style={{
            marginTop: 10,
            fontSize: windowWidth / 12,
            fontFamily: fonts.primary[800],
            color: colors.primary,

          }}>Login</Text>
        </View>


        <View style={{
          padding: 20, flex: 1, backgroundColor: colors.white, margin: 20,
          borderRadius: 10,
        }}>
          <MyInput label="Username" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}
            iconname="at" placeholder="Masukan username" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <TouchableOpacity onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
            Linking.openURL(urlWA)
          }} style={{
            marginTop: 10,
          }}>
            <Text style={{
              textAlign: 'right',
              fontFamily: fonts.secondary[600],
              color: colors.white,
              size: 12
            }}>Lupa password ?</Text>
          </TouchableOpacity>
          <MyGap jarak={40} />
          {!loading &&




            <MyButton
              onPress={masuk}
              title="Masuk"


              Icons="log-in-outline"
            />


          }

        </View>


        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
        padding: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{
        fontSize: windowWidth / 28,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        color: colors.primary
      }}>Belum memiliki Akun ? <Text style={{
        fontSize: windowWidth / 28,
        fontFamily: fonts.primary[600],
        textAlign: 'center',
        color: colors.border
      }}>Daftar disini</Text></Text></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
