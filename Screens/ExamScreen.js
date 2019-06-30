import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Button, ScrollView, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { LinearGradient } from 'expo';
import ArrowBack from '../Icons/arrowBack2.svg';
import ArrowDown from '../Icons/arrowDown.svg';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Components/Asset';
import { BaseButton } from 'react-native-gesture-handler';


const SCREENWIDTH = Dimensions.get('window').width;
let _dday = 24; //constructure 에서 선언

const Data = {
    examTimetable: 'http://mblogthumb1.phinf.naver.net/MjAxNzA5MTNfMjA1/MDAxNTA1MzA5OTU4ODMx.POt-NKLlmaR_bSv9CO9gy0iMXKsInanpykrbrx1z4ggg.qX1hVbBYMMGjUhRb64BrF0H2sXGRNC4I3IpshqPTipYg.PNG.take_mentor/%EA%B5%AC%EB%A6%AC%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90.png?type=w2',
    data: [
        {
            subject: '수학',
            scoreData: {
                multipleChoice: {
                    num: 18,
                    totalScore: 85,
                },
                descriptiveForm: {
                    num: 18,
                    totalScore: 85,
                }
            },
            others: [
                '7월 14일 방과후 컴퓨터실',
                '7월 7일 까지 3층과학실에 신청 할 것',
                '전체인원의 10% 수상'
            ],
            commentNum: 5,
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
        {
            subject: '수학',
            scoreData: {
                multipleChoice: {
                    num: 18,
                    totalScore: 85,
                },
                descriptiveForm: {
                    num: 18,
                    totalScore: 85,
                }
            },
            others: [
            ],
            commentNum: 5,
            image: [
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
    ]
}

export default class ExamScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            timetable: Data.examTimetable,
            data: Data.data,
        }
    }

    render() {
        const subjectList = <View style={{ width: SCREENWIDTH, alignItems: 'center', marginTop: 40 }}>
            {this.state.data.map((data, index) =>
                <View key={index} style={{
                    backgroundColor: 'white', marginBottom: 36,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 20,
                    width: SCREENWIDTH - 40,
                }}>
                    <View style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14 }}>{data.subject}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.red, marginRight: 4 }} />
                            <Text style={{ fontSize: 14, lineHeight: 20 }}>객관식 {data.scoreData.multipleChoice.num} ({data.scoreData.multipleChoice.totalScore})</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.blue, marginRight: 4 }} />
                            <Text style={{ fontSize: 14, lineHeight: 20 }}>서술형 {data.scoreData.descriptiveForm.num} ({data.scoreData.descriptiveForm.totalScore})</Text>
                        </View>

                        {data.others.length > 0 && <View style={{ height: 1, width: 100, marginTop: 4, backgroundColor: '#dbdbdb' }} />}

                        <View>
                            {data.others.map((info, index2) =>
                                <View key={index2}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: index2 % 2 === 0 ? Colors.red : Colors.blue, marginRight: 4 }} />
                                        <Text style={{ fontSize: 14, lineHeight: 20 }}>{info}</Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <Text style={{ fontSize: 10, color: Colors.lightGray, fontWeight: 'bold', textAlign: 'right' }}>댓글 {data.commentNum}</Text>
                        </View>
                    </View>

                    <View style={{ height: 40, width: '100%', borderRadius: 20, overflow: 'hidden' }}>
                        <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ width: '100%', height: '100%', flexDirection: 'row' }} start={[1, 0]} end={[0, 1]} >
                            <BaseButton onPress={() => {
                                if (data.image.length !== 0) {
                                    this.props.navigation.navigate('Photo', { image: data.image, index: 0 })
                                } else {
                                    Alert.alert('사진이 없습니다');
                                }
                            }
                            } style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>사진보기</Text>
                            </BaseButton>
                            <BaseButton onPress={() => this.props.navigation.navigate('Comment', { key: data.key })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>댓글</Text>
                            </BaseButton>
                            <BaseButton onPress={() => {
                                let d = this.state.data;
                                d[index].bookmark = !d[index].bookmark;
                                this.setState({ data: d });
                            }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {data.bookmark ?
                                    <FontAwesome name='star' size={20} color={Colors.blue} /> :
                                    <Text style={{ fontSize: 14, color: 'white' }}>즐겨찾기</Text>}
                            </BaseButton>
                        </LinearGradient>
                    </View>
                </View>
            )}
        </View>
        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.Header} start={[1, 0]} end={[0, 1]} >

                    <View style={styles.HeaderContainer}>
                        <Text style={{ fontSize: 30, fontFamily: 'nanumbarungothic', color: 'white' }}>시험정보</Text>
                        <TouchableOpacity style={{
                        }} onPress={() => this.props.navigation.goBack()}>
                            <ArrowBack />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.WhiteBox}>
                        <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this.props.navigation.navigate('Photo', { image: this.state.timetable })}>
                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.state.timetable }} />
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14 }}>과목정보</Text>
                    </View>
                </LinearGradient>
                <View style={{ alignSelf: 'center', height: 30, justifyContent: 'center' }}>
                    <ArrowDown />
                </View>

                <View style={{ width: SCREENWIDTH, alignItems: 'center' }}>
                    {subjectList}
                </View>

            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        height: 520,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,

    },
    HeaderContainer: {
        paddingLeft: 20,
        paddingRight: 15,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    WhiteBox: {
        width: SCREENWIDTH - 40,
        height: SCREENWIDTH - 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 50,
        borderRadius: 20,
        alignSelf: 'center',
        overflow: 'hidden'
    },
})
