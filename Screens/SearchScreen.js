import React, { Component } from 'react';
import { Text, View, ScrollView, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Platform, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import ActionSheet from '../Components/MyActionSheet';
import { LinearGradient } from 'expo';
import { Colors } from '../Components/Asset';
import { getStatusBarHeight } from 'react-native-status-bar-height';


import { BaseButton } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, Ionicons, EvilIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BARHEIGHT = getStatusBarHeight();

const tagList = [
    ['1학년', '2학년', '3학년'],
    ['질문', '공지'],
    ['이과', '문과', '예체능'],
    ['수학', '영어', '국어', '물리', '화학', '생물', '지구', '일본어', '중국어', '사회', '세계사', '한국사', '세계지리']
]

const searchList = ['김종현', '감자', '수학수행', '감자캐기', '소화기', '물', '동위원소', '아인슈타인', '김종현', '감자', '수학수행', '감자캐기', '소화기', '물', '동위원소', '아인슈타인', '김종현', '감자', '수학수행', '감자캐기', '소화기', '물', '동위원소', '아인슈타인'] //storage push && 중복 삭제

const Data = {
    data: [
        {
            image: 'https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg',
            content: "뭔 앨범이 자고 일어나면 최애 노래가 바뀜ㅋㅋㅋㅋ 분명 처음에는 하루살이가 최애였는데, 씹OP1 크레바스가 갑자기 꽂히더니, 이제 존버가 제일 좋음... 이쯤되면 그냥 노래가 전부 좋아서 그날 기분따라 듣고 싶은 노래가 바뀌는 것과 같다고 할 수 있을 듯..",
            name: '김종현',
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '1'
        },
        {
            image: '',
            content: "신상문 최근 레이스 컨트롤",
            name: '김종현',
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '2'
        },
        {
            image: 'https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg',
            content: "신상문 최근 레이스 컨트롤\n\n아직도 전성기 레이스컨트롤 죽지않았음 ㄷㄷㄷㄷㄷㄷ;;",
            name: '김종현',
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '3'
        }
    ]
}

export default class SearchScreen extends Component {
    static navigationOptions = {
        title: '검색',
        headerStyle: {
            shadowColor: "clear",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            borderBottomWidth: 0,
            borderBOttomColor: 'clear',
            height: 50
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tagVisible: false,
            searchVisible: false,
            searchText: '',
            searchTextBeta: '',
            serachData: Data.data,
            searchList: searchList,
            isSearching: false,
            tag: tagList,
            clickedTag: new Array(tagList.length),

        }
    }
    _search = (text) => {
        this.setState({ isSearching: true });
        //서버 fetch로 isSearching조절
    }
    _detailHandle(key) {
        this.props.navigation.navigate('Detail');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, backgroundColor: '#fff', paddingHorizontal: 20, borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 36, width: WIDTH - 86, borderRadius: 18, marginRight: 10, overflow: 'hidden' }}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ searchVisible: true }) }}>
                            <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ height: 36, width: WIDTH - 86, alignItems: 'center', justifyContent: 'center' }} start={[0, 0]} end={[1, 1]}>
                                <Text numberOfLines={1} style={{ fontSize: 14, color: 'white', width: WIDTH - 158, textAlign: 'center' }}>{this.state.searchText === '' ? '이름, 내용으로 검색하기...' : this.state.searchText}</Text>
                                {this.state.searchText !== '' &&
                                    <View style={{ width: 36, height: 36, position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableWithoutFeedback onPress={() => this.setState({ searchText: '', searchTextBeta: '' })} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                                            <AntDesign name='close' color='white' size={18} style={{ marginRight: 10 }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                }
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ tagVisible: true })}>
                        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }} start={[0, 0]} end={[1, 1]} >
                                {this.state.tagVisible ?
                                    <AntDesign name='close' color='white' size={18} /> :
                                    <FontAwesome name='tag' color='white' size={18} />
                                }

                            </LinearGradient>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <ScrollView style={{ width: WIDTH, height: HEIGHT - 100, marginTop: 50 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                    {this.state.searchText === '' && <Text style={{ fontSize: 12, color: '#777', marginLeft: 20, marginTop: 14 }}>검색어를 입력해주세요 ↑</Text>}
                    {this.state.isSearching ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}><ActivityIndicator size='large' color='#dddddd' /></View>
                        :
                        this.state.serachData.map((data, index) =>
                            <TouchableWithoutFeedback key={index} onPress={() => this._detailHandle(data.key)}>
                                <View style={{ width: WIDTH, height: 70, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    {data.image != '' &&
                                        <Image source={{ uri: data.image }} style={{ width: 54, height: 54, marginRight: 10 }} />
                                    }

                                    <View style={{ height: 60, width: data.image == '' ? WIDTH - 40 : WIDTH - 104, justifyContent: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 14, lineHeight: 20, width: '100%' }} numberOfLines={2} ellipsizeMode='tail'>
                                                {data.content}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: '#444', lineHeight: 14 }} >
                                                {data.name} · {data.date} · 좋아요 {data.likeNum} · 댓글 {data.commentNum}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                </ScrollView>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.tagVisible}
                    onRequestClose={() => {
                        this.setState({ tagVisible: false })
                        this._search();
                    }}>

                    <View style={{ width: WIDTH, height: Platform.OS === 'ios' ? 100 + BARHEIGHT : 100 }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => {
                            this.setState({ tagVisible: false });
                            this._search();
                        }}>

                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', height: HEIGHT - 100 - BARHEIGHT }}>
                        <ScrollView style={{ flex: 1 }} overScrollMode='never'>
                            <View>
                                <View style={{ height: 40, justifyContent: 'center' }}>

                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    {this.state.tag.map((data, index) =>
                                        <View key={index}>
                                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='never'>
                                                <View style={{ paddingHorizontal: 34, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableWithoutFeedback onPress={() => {
                                                        const c = this.state.clickedTag;
                                                        c[index] = undefined;
                                                        this.setState({ clickedTag: c })
                                                    }
                                                    }>
                                                        <View style={{ height: 26, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: this.state.clickedTag[index] == undefined ? '#888' : '#dbdbdb', backgroundColor: this.state.clickedTag[index] == undefined ? '#888' : 'white' }}>
                                                            <Ionicons name='ios-close' size={16} color={this.state.clickedTag[index] == undefined ? 'white' : 'black'} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    {data.map((info, index2) =>
                                                        <TouchableWithoutFeedback key={index2} onPress={() => {
                                                            const c = this.state.clickedTag;
                                                            c[index] = index2;
                                                            this.setState({ clickedTag: c })
                                                        }}>
                                                            <View style={{ height: 26, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: this.state.clickedTag[index] == index2 ? '#888' : '#dbdbdb', marginLeft: 10, backgroundColor: this.state.clickedTag[index] == index2 ? '#888' : 'white' }}>
                                                                <Text style={{ fontSize: 12, color: this.state.clickedTag[index] == index2 ? 'white' : 'black' }}>{info}</Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    )}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </ScrollView>

                    </View>

                </Modal>

                <Modal
                    animationType='none'
                    transparent={false}
                    visible={this.state.searchVisible}
                    onRequestClose={() => this.setState({ searchVisible: false })}
                    onShow={() => this.input.focus()}
                >
                    <View style={{ flex: 1 }}>
                        <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ height: Platform.OS === 'ios' ? 60 + BARHEIGHT : 60, position: 'absolute', left: 0, right: 0, top: 0 }} start={[0, 0]} end={[1, 1]}>

                        </LinearGradient>
                        <View style={{ width: WIDTH, height: Platform.OS === 'ios' ? BARHEIGHT : 0 }} />
                        <View style={{ width: WIDTH, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 44, width: WIDTH - 16, backgroundColor: 'white', alignSelf: 'center', paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput ref={ref => this.input = ref} style={{ fontSize: 16, width: WIDTH - 84, marginRight: 10 }} value={this.state.searchTextBeta} placeholder='검색어입력' onChangeText={(text) => { this.setState({ searchTextBeta: text }) }} />
                                <TouchableWithoutFeedback onPress={() => {
                                    if (this.searchTextBeta !== '' && this.searchTextBeta !== null && this.searchTextBeta !== undefined) {
                                        this.setState({ searchText: this.state.searchTextBeta, searchVisible: false });
                                        this._search(this.state.searchTextBeta);
                                    } else {
                                        Alert.alert('검색어를 입력해주세요');
                                    }
                                }} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                                    <AntDesign name='search1' color='#777' size={24} style={{ margin: 0 }} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' style={{ width: WIDTH, height: HEIGHT - 100 - BARHEIGHT }}>
                            <View style={{ width: WIDTH, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ searchVisible: false })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <AntDesign name='arrowleft' size={16} />
                                    <Text style={{ fontSize: 14, marginLeft: 10 }}>뒤로가기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ searchTextBeta: '' }) }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <AntDesign name='close' size={16} />
                                    <Text style={{ fontSize: 14, marginLeft: 10 }}>검색어삭제</Text>
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', left: WIDTH / 2, width: 1, height: 16, backgroundColor: '#000', borderRadius: 0.5 }} />
                            </View>
                            <Text style={{ fontSize: 12, color: '#777', marginLeft: 30, marginTop: 4, marginBottom: 4 }}>최근 검색어</Text>

                            <View>
                                {this.state.searchList.map((data, index) =>
                                    <View key={index} style={{ paddingLeft: 30, width: WIDTH, height: 50, borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            this.setState({ searchText: data, searchTextBeta: data, searchVisible: false });
                                            this._search(data);
                                        }}>
                                            <View style={{ width: WIDTH - 110, height: 50, justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ fontSize: 14, textAlign: 'left', width: WIDTH - 110 }}>{data}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback>
                                            <View style={{ width: 50, height: 50, alignItems: 'flex-end', justifyContent: 'center' }}>
                                                <AntDesign name='close' size={16} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )}
                            </View>

                        </ScrollView>
                    </View>

                </Modal>
            </View>
        )
    }
}
