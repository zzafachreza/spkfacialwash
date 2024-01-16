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
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

export default function Hasil({ navigation, route }) {

    const [ket, setKey] = useState('');
    const [kategori, setKategori] = useState([{ label: '-- Pilih Kategori --', value: 0 }]);

    const [SPK, setSPK] = useState({
        alternatif: [],
        kriteria: [],
        matriks_keputusan: [],
        matriks_normalisasi: [],
        matriks_hasil: [],
        data_hasil: [],
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        kategori: '',
        budget: '',
        merk: '',
        usia: ''
    })
    useEffect(() => {
        // ambil data kategori
        axios.post(apiURL + 'kategori.php').then(res => {
            console.log(res.data);
            let tmp = [...kategori];
            res.data.map(i => {
                tmp.push({ label: i.label, value: i.value });
            })
            console.log(tmp)
            setKategori(tmp);
        })
    }, []);

    const createPDF = async () => {


        let thead =
            `
<center><h1>HASIL PEMILIHAN FACIAL WASH TERBAIK</h1></center>
<center><h1>KATEGORI ${kategori.filter(i => i.value == SPK.data_hasil[0].id_kategori)[0].label.toUpperCase()}</h1></center>

<p>Budget : ${new Intl.NumberFormat().format(kirim.budget)}</p>
<p>Usia : ${kirim.usia} Tahun</p>

        <table width="100%" border="1" style="margin-top:5%;border-collapse:collapse" cellpadding="4">
            <tr style="background:#F2F6FC">
                <th>No</th>
                <th>Kode</th>
                <th>Gambar</th>
                <th>Nama Alternatif</th>
                <th>Nilai</th>
                <th>Ranking</th>
                <th>Harga</th>
             </tr>` ;

        let tbody = ``;

        SPK.data_hasil.filter(ii => ii.harga <= parseFloat(kirim.budget * 1.5)).map((i, index) => {

            tbody += `<tr>
                <td style="text-align:center">${index + 1}</td>
                <td style="text-align:center">${i.kode_alternatif}</td>
                <td style="text-align:center"><img src="${i.image}" width="50" height="50" /></td>
                <td style="text-align:center">${i.nama_alternatif}</td>
                <td style="text-align:center">${parseFloat(i.nilai_saw).toFixed(4)}</td>
                <td style="text-align:center">${index + 1}</td>
                <td style="text-align:center">${new Intl.NumberFormat().format(i.harga)}</td>
            
            </tr>`
        })


        let tfoot = `</table>`;




        let options = {
            html: thead + tbody + tfoot,
            fileName: 'SPKFacialWash',
            directory: 'Documents',
            height: 1122.52, width: 793.7,
        };


        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        // alert(file.filePath);

        await Share.open({
            title: MYAPP,
            message: "Print data",
            url: 'file:///' + file.filePath,
            subject: "Report",
        })
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                err && console.log(err);
            });

    }


    const __getPerhitungan = () => {


        setLoading(true);
        axios.post(apiURL + 'perhitungan.php', {
            key: kirim.id_kategori
        }).then(res => {
            // console.log(res.data.data_hasil);
            let tmp = [];
            res.data.data_hasil.map((aa, index) => {

                res.data.kriteria.filter(ii => ii.nama_kriteria == 'Harga').map(kk => {
                    aa.harga = res.data.matriks_keputusan[aa.id_alternatif][kk.id_kriteria]['nama_subkriteria'];
                    tmp.push(aa)
                    // 
                })


            })
            console.log(tmp)
            setSPK({
                alternatif: res.data.alternatif,
                kriteria: res.data.kriteria,
                matriks_keputusan: res.data.matriks_keputusan,
                matriks_normalisasi: res.data.matriks_normalisasi,
                matriks_hasil: res.data.matriks_hasil,
                data_hasil: tmp,
            });
        }).finally(() => {
            setLoading(false);
            setOpen(true)
        })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            paddingHorizontal: 20,

        }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
                flex: 1,
            }}>
                <MyPicker label="Kategori" iconname="options" data={kategori} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        id_kategori: x
                    })
                }} />

                <View style={{
                    marginTop: 5,
                    flexDirection: 'row'
                }}>

                    <View style={{
                        flex: 1,
                        paddingRight: 5
                    }}>
                        <MyInput keyboardType='number-pad' label="Budget" iconname="ribbon" onChangeText={x => {
                            setKirim({
                                ...kirim,
                                budget: x
                            })
                        }} />

                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5
                    }}>
                        <MyInput keyboardType='number-pad' label="Usia (tahun)" iconname="list" onChangeText={x => {
                            setKirim({
                                ...kirim,
                                usia: x
                            })
                        }} />
                    </View>
                </View>


                {!open &&

                    <>
                        <MyGap jarak={20} />
                        <MyButton title="Lihat Hasil" Icons="search" onPress={__getPerhitungan} />
                    </>}


                {!loading && open &&


                    <>

                        <Text style={styles.judul}>RANKING {kategori.filter(i => i.value == SPK.data_hasil[0].id_kategori)[0].label.toUpperCase()}</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                paddingVertical: 2,
                                borderBottomColor: colors.primary,
                                backgroundColor: colors.primary,
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 11,
                                    textAlign: 'center',
                                    color: colors.white
                                }}>Kode</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 11,
                                    textAlign: 'center',
                                    color: colors.white
                                }}>Gambar</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 11,
                                    textAlign: 'center',
                                    color: colors.white
                                }}>Alternatif</Text>

                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 11,
                                    textAlign: 'center',
                                    color: colors.white
                                }}>Nilai SAW</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 11,
                                    textAlign: 'center',
                                    color: colors.white
                                }}>Rangking</Text>
                            </View>

                            {SPK.data_hasil.filter(ii => ii.harga <= parseFloat(kirim.budget * 1.5)).map((aa, index) => {
                                return (

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        paddingVertical: 2,
                                        borderBottomColor: colors.primary,
                                    }}>


                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            fontFamily: fonts.secondary[800],
                                            fontSize: 11,
                                            color: colors.primary,
                                        }}>{aa.kode_alternatif}</Text>

                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignContent: 'center'
                                        }}>
                                            <Image source={{
                                                uri: aa.image
                                            }} style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: 'contain'
                                            }} />
                                        </View>

                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 11,
                                            color: colors.black,
                                        }}>{aa.nama_alternatif}</Text>

                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 11,
                                            textAlign: 'center'
                                        }}>{parseFloat(aa.nilai_saw).toFixed(4)}</Text>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Text style={{

                                                fontFamily: fonts.secondary[800],
                                                fontSize: 11,
                                                textAlign: 'center'
                                            }}>{index + 1}</Text>

                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 12
                                            }}>{new Intl.NumberFormat().format(aa.harga)}</Text>





                                        </View>



                                    </View>



                                )
                            })}
                        </View>


                        <MyGap jarak={20} />



                        <MyButton onPress={createPDF} warna={colors.danger} title="Print Hasil Penilaian" Icons="print" />


                    </>}
                <MyGap jarak={20} />
            </ScrollView>
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.secondary} />
            </View>}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[800],
        fontSize: 20,
        borderBottomWidth: 3,
        borderBottomColor: colors.secondary,
        paddingBottom: 5,
        marginVertical: 10,
    }
})