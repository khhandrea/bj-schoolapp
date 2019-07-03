import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native'
import { LinearGradient } from 'expo';
import ArrowBack from '../Icons/arrowBack.svg';
import { Colors } from '../Components/Asset';
import { BaseButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';



const SCREENWIDTH = Dimensions.get('window').width;

const Data = {
    homework: [
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
            ],
            commentNum: 5,
            date: '07.05',
            image: [
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
        {
            subject: '수학',
            title: '친구들이 정해준 형용사로 영어 자기소개하기',
            executionDate: '2월 첫쨋주~둘쨋주',
            totalGrade: 10,
            others: [
                '외워서 할 것, 읽으면 감점 3점',
                '그림과 연관 지을 것',
                '친구들 발표내용 평가하여 적어낼 것'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            ready: false, //로컬의 저장
        },
    ],
    contest: [
        {
            title: '보정 이그나이트',
            explanation: '자유로운 주제를 PPT로 프레젠테이션 하는 대회',
            others: [
                '7월 14일 방과후 컴퓨터실',
                '7월 7일 까지 3층과학실에 신청 할 것',
                '전체인원의 10% 수상'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
        {
            title: '보정 이그나이트',
            explanation: '자유로운 주제를 PPT로 프레젠테이션 하는 대회',
            others: [
            ],
            commentNum: 5,
            date: '07.05',
            image: [
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
        {
            title: '보정 이그나이트',
            explanation: '자유로운 주제를 PPT로 프레젠테이션 하는 대회',
            others: [
                '7월 14일 방과후 컴퓨터실',
                '7월 7일 까지 3층과학실에 신청 할 것',
                '전체인원의 10% 수상'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
        {
            title: '보정 이그나이트',
            explanation: '자유로운 주제를 PPT로 프레젠테이션 하는 대회',
            others: [
                '7월 14일 방과후 컴퓨터실',
                '7월 7일 까지 3층과학실에 신청 할 것',
                '전체인원의 10% 수상'
            ],
            commentNum: 5,
            date: '07.05',
            image: [
                'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/100F8/production/_104348756_stephencheatley-electricblackpool.jpg'
            ],
            key: 10,
            bookmark: false, //로컬의 저장
        },
    ],
    oldHomework: '',
    oldContest: ''
}

export default class ContestScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            sellectNum: 1, //1==수행 2== 대회
            homeworkData: Data.homework,
            contestData: Data.contest,
        }
    }

    render() {
        const homework = <View style={{ width: SCREENWIDTH, alignItems: 'center', marginTop: 40 }}>
            {this.state.homeworkData.map((data, index) =>
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
                            <Text style={{ fontSize: 14, lineHeight: 20 }}>{data.title}</Text>
                        </View>

                        <View style={{ height: 1, width: 100, marginVertical: 4, backgroundColor: '#dbdbdb' }} />

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.blue, marginRight: 4 }} />
                                <Text style={{ fontSize: 14, lineHeight: 20 }}>{data.executionDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.red, marginRight: 4 }} />
                                <Text style={{ fontSize: 14, lineHeight: 20 }}>총 점수 {data.totalGrade}점</Text>
                            </View>
                        </View>

                        {data.others.length > 0 && <View style={{ height: 1, width: 100, marginTop: 4, backgroundColor: '#dbdbdb' }} />}

                        <View>
                            {data.others.map((info, index2) =>
                                <View key={index2}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: index2 % 2 === 0 ? Colors.blue : Colors.red, marginRight: 4 }} />
                                        <Text style={{ fontSize: 14, lineHeight: 20 }}>{info}</Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <Text style={{ fontSize: 10, color: Colors.lightGray, fontWeight: 'bold', textAlign: 'right' }}>{data.date} · 댓글 {data.commentNum}</Text>
                        </View>
                    </View>

                    <View style={{ height: 40, width: '100%', borderRadius: 20, overflow: 'hidden' }}>
                        <LinearGradient colors={[Colors.lightBlue, Colors.lightRed]} style={{ width: '100%', height: '100%', flexDirection: 'row' }} start={[1, 0]} end={[0, 1]} >
                            {data.image.length !== 0 && <BaseButton onPress={() => {
                                if (data.image.length !== 0) {
                                    this.props.navigation.navigate('Photo', { image: data.image, index: 0 })
                                } else {
                                    Alert.alert('사진이 없습니다');
                                }
                            }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>사진보기</Text>
                            </BaseButton>}
                            <BaseButton onPress={() => this.props.navigation.navigate('Comment', { key: data.key })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>댓글</Text>
                            </BaseButton>
                            <BaseButton onPress={() => {
                                let d = this.state.homeworkData;
                                d[index].ready = !d[index].ready;
                                this.setState({ homeworkData: d });
                            }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>준비완료</Text>
                                <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    {data.ready && <Feather name='check' size={40} color={Colors.red} />}
                                </View>
                            </BaseButton>
                        </LinearGradient>
                    </View>
                </View>
            )}
        </View>

        const contest = <View style={{ width: SCREENWIDTH, alignItems: 'center', marginTop: 40 }}>
            {this.state.contestData.map((data, index) =>
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
                        <Text style={{ fontSize: 14 }}>{data.title}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.red, marginRight: 4 }} />
                            <Text style={{ fontSize: 14, lineHeight: 20 }}>{data.explanation}</Text>
                        </View>

                        {data.others.length > 0 && <View style={{ height: 1, width: 100, marginTop: 4, backgroundColor: '#dbdbdb' }} />}

                        <View>
                            {data.others.map((info, index2) =>
                                <View key={index2}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: index2 % 2 === 0 ? Colors.blue : Colors.red, marginRight: 4 }} />
                                        <Text style={{ fontSize: 14, lineHeight: 20 }}>{info}</Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <Text style={{ fontSize: 10, color: Colors.lightGray, fontWeight: 'bold', textAlign: 'right' }}>{data.date} · 댓글 {data.commentNum}</Text>
                        </View>
                    </View>

                    <View style={{ height: 40, width: '100%', borderRadius: 20, overflow: 'hidden' }}>
                        <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ width: '100%', height: '100%', flexDirection: 'row' }} start={[1, 0]} end={[0, 1]} >
                            {data.image.length !== 0 && <BaseButton onPress={() => {
                                if (data.image.length !== 0) {
                                    this.props.navigation.navigate('Photo', { image: data.image, index: 0 })
                                } else {
                                    Alert.alert('사진이 없습니다');
                                }
                            }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>사진보기</Text>
                            </BaseButton>}
                            <BaseButton onPress={() => this.props.navigation.navigate('Comment', { key: data.key })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>댓글</Text>
                            </BaseButton>
                            <BaseButton onPress={() => {
                                let d = this.state.contestData;
                                d[index].bookmark = !d[index].bookmark;
                                this.setState({ contestData: d });
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.Header} start={[1, 0]} end={[0, 1]} >
                    <View style={{ paddingHorizontal: 20, height: 40, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'nanumbarungothic', color: 'white' }}>수행/대회</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 16, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.jumpTo('second')}>
                            <ArrowBack />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.WhiteBox}>
                        <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <View style={{ width: '100%', height: 50, borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>수행몰아보기</Text>
                                </View>
                                {this.state.homeworkData.map((data, index) =>
                                    <View key={index} style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                                        <Text style={{ fontSize: 16 }}>{data.subject}</Text>
                                        <Text style={{ fontSize: 12, marginTop: 3 }}>{data.executionDate}</Text>
                                        {data.ready && <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center' }}>
                                            <Feather name='check' size={40} color={Colors.red} />
                                        </View>}
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.Sellection}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ sellectNum: 1 })} activeOpacity={1}>
                            <Text style={{ textAlign: 'center', color: this.state.sellectNum == 1 ? 'white' : '#ffffff80', fontSize: 14 }}>수행</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 10, backgroundColor: 'white' }} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ sellectNum: 2 })} activeOpacity={1}>
                            <Text style={{ textAlign: 'center', color: this.state.sellectNum == 2 ? 'white' : '#ffffff80', fontSize: 14 }}>대회</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={{ width: SCREENWIDTH }}>
                    {this.state.sellectNum === 1 ? homework : contest}

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
        overflow: 'hidden',
    },
    Sellection: {
        flexDirection: 'row',
        width: SCREENWIDTH,
        position: 'absolute',
        top: 495,
        alignItems: 'center',

    }

})
