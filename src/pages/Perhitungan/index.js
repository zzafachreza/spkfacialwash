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
import { MyGap, MyPicker } from '../../components';

export default function Perhitungan({ navigation, route }) {

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


    const __getPerhitungan = (id_kategori) => {
        console.log(id_kategori);
        setLoading(true);
        axios.post(apiURL + 'perhitungan.php', {
            key: id_kategori
        }).then(res => {
            console.log(res.data.data_hasil);
            setSPK(res.data);
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
            paddingVertical: 10,
        }}>
            <MyPicker label="Kategori" iconname="options" data={kategori} onValueChange={x => {
                __getPerhitungan(x)
            }} />

            {!loading && open && <>

                <ScrollView showsVerticalScrollIndicator={false} style={{
                    padding: 10,
                    flex: 1,
                }}>
                    <Text style={styles.judul}>Alternatif</Text>

                    {SPK.alternatif.map((aa, index) => {
                        return (
                            <View style={{
                                padding: 10,
                                borderWidth: 1,
                                marginVertical: 5,
                                borderRadius: 10,
                                borderColor: colors.border,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 15,
                                    color: colors.primary,
                                }}>{aa.kode_alternatif} - {aa.nama_alternatif}</Text>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        {SPK.kriteria.map(kk => {
                                            return (
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        marginBottom: 2,
                                                    }}>
                                                        <Text style={{
                                                            flex: 1,
                                                            fontFamily: fonts.secondary[600],
                                                            fontSize: 12
                                                        }}>{kk.nama_kriteria}</Text>
                                                        {kk.nama_kriteria == 'Harga' &&

                                                            <Text style={{
                                                                flex: 1,
                                                                fontFamily: fonts.secondary[400],
                                                                fontSize: 12
                                                            }}>{new Intl.NumberFormat().format(SPK.matriks_keputusan[aa.id_alternatif][kk.id_kriteria]['nama_subkriteria'])}</Text>

                                                        }

                                                        {kk.nama_kriteria !== 'Harga' &&

                                                            <Text style={{
                                                                flex: 1,
                                                                fontFamily: fonts.secondary[400],
                                                                fontSize: 12
                                                            }}>{SPK.matriks_keputusan[aa.id_alternatif][kk.id_kriteria]['nama_subkriteria']}</Text>

                                                        }

                                                    </View>

                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{
                                        // flex: 1,
                                    }}>
                                        <Image source={{
                                            uri: aa.image
                                        }} style={{
                                            width: windowWidth / 5,
                                            height: windowWidth / 5,
                                            resizeMode: 'contain'
                                        }} />
                                    </View>
                                </View>

                            </View>
                        )
                    })}

                    <Text style={styles.judul}>Matriks Keputusan</Text>

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
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Alternatif</Text>
                            {SPK.kriteria.map(kk => {
                                return (
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: colors.white
                                    }}>{kk.kode_kriteria}</Text>



                                )
                            })}
                        </View>

                        {SPK.alternatif.map((aa, index) => {
                            return (

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    paddingVertical: 2,
                                    borderBottomColor: colors.primary,
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}>{aa.kode_alternatif}</Text>
                                    {SPK.kriteria.map(kk => {
                                        return (
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}>{SPK.matriks_keputusan[aa.id_alternatif][kk.id_kriteria]['bobot_subkriteria']}</Text>



                                        )
                                    })}
                                </View>


                            )
                        })}
                    </View>

                    <Text style={styles.judul}>Matriks Ternormalisasi</Text>
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
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Alternatif</Text>
                            {SPK.kriteria.map(kk => {
                                return (
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: colors.white
                                    }}>{kk.kode_kriteria}</Text>



                                )
                            })}
                        </View>

                        {SPK.alternatif.map((aa, index) => {
                            return (

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    paddingVertical: 2,
                                    borderBottomColor: colors.primary,
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}>{aa.kode_alternatif}</Text>
                                    {SPK.kriteria.map(kk => {
                                        return (
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}>{SPK.matriks_normalisasi[aa.id_alternatif][kk.id_kriteria]}</Text>



                                        )
                                    })}
                                </View>


                            )
                        })}
                    </View>

                    <Text style={styles.judul}>Matriks Hasil</Text>
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
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Alternatif</Text>
                            {SPK.kriteria.map(kk => {
                                return (
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: colors.white
                                    }}>{kk.kode_kriteria}</Text>



                                )
                            })}
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Total</Text>
                        </View>

                        {SPK.alternatif.map((aa, index) => {
                            return (

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    paddingVertical: 2,
                                    borderBottomColor: colors.primary,
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}>{aa.kode_alternatif}</Text>
                                    {SPK.kriteria.map(kk => {
                                        return (
                                            <Text style={{
                                                flex: 1,
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}>{SPK.matriks_hasil[aa.id_alternatif][kk.id_kriteria]}</Text>



                                        )
                                    })}
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}>{parseFloat(SPK.hasil[aa.id_alternatif]).toFixed(4)}</Text>
                                </View>


                            )
                        })}
                    </View>


                    <Text style={styles.judul}>Ranking</Text>
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
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Alternatif</Text>

                            <Text style={{
                                flex: 0.5,
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Nilai SAW</Text>
                            <Text style={{
                                flex: 0.5,
                                fontFamily: fonts.secondary[800],
                                fontSize: 12,
                                textAlign: 'center',
                                color: colors.white
                            }}>Rangking</Text>
                        </View>

                        {SPK.data_hasil.map((aa, index) => {
                            return (

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    paddingVertical: 2,
                                    borderBottomColor: colors.primary,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        // justifyContent: 'center',
                                        // alignItems: 'center'
                                        paddingHorizontal: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[800],
                                            fontSize: 12,
                                            color: colors.primary,
                                        }}>{aa.kode_alternatif}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 11,
                                            color: colors.black,
                                        }}>{aa.nama_alternatif}</Text>
                                    </View>
                                    <Text style={{
                                        flex: 0.4,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}>{parseFloat(aa.nilai_saw).toFixed(4)}</Text>
                                    <Text style={{
                                        flex: 0.4,
                                        fontFamily: fonts.secondary[800],
                                        fontSize: 12,

                                        textAlign: 'center'
                                    }}>{index + 1}</Text>

                                </View>


                            )
                        })}
                    </View>

                    <MyGap jarak={20} />
                </ScrollView>

            </>}

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