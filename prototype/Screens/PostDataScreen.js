import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'

const WIDTH = Dimensions.get('window').width;

const myPostData = {
    data: [
        {
            image: 'https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg',
            content: "뭔 앨범이 자고 일어나면 최애 노래가 바뀜ㅋㅋㅋㅋ 분명 처음에는 하루살이가 최애였는데, 씹OP1 크레바스가 갑자기 꽂히더니, 이제 존버가 제일 좋음... 이쯤되면 그냥 노래가 전부 좋아서 그날 기분따라 듣고 싶은 노래가 바뀌는 것과 같다고 할 수 있을 듯..",
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '3'
        },
        {
            image: '',
            content: "신상문 최근 레이스 컨트롤",
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '3'
        },
        {
            image: 'https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg',
            content: "신상문 최근 레이스 컨트롤\n\n아직도 전성기 레이스컨트롤 죽지않았음 ㄷㄷ;;",
            likeNum: 5,
            commentNum: 10,
            date: '19.06.15',
            key: '4'
        }
    ]
}

const myCommentData = {
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

const myBookmarkData = {
    data: [
        {
            image: '',
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

export class MyPostScreen extends Component {
    static navigationOptions = { title: '작성글' };

    constructor(props) {
        super(props);
        this.state = {
            data: myPostData.data,
        }
    }
    _handle(key) {
        this.props.navigation.navigate('Detail');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                    {this.state.data.map((data, index) =>
                        <TouchableWithoutFeedback key={index} onPress={() => this._handle(data.key)}>
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
                                            {data.date} · 좋아요 {data.likeNum} · 댓글 {data.commentNum}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </ScrollView>
            </View>
        )
    }
}


export class MyCommentScreen extends Component {
    static navigationOptions = { title: '댓글단 글' };

    constructor(props) {
        super(props);
        this.state = {
            data: myCommentData.data,
        }
    }
    _handle(key) {
        this.props.navigation.navigate('Detail');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                    {this.state.data.map((data, index) =>
                        <TouchableWithoutFeedback key={index} onPress={() => this._handle(data.key)}>
                            <View style={{ width: WIDTH, height: 70, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                                {data.image != '' &&
                                    <Image source={{ uri: data.image }} style={{ width: 54, height: 54, marginRight: 10 }} />
                                }

                                <View style={{ height: 60, width: data.image == '' ? WIDTH - 80 : WIDTH - 144, justifyContent: 'center', marginRight: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 14, lineHeight: 20, width: '100%' }} numberOfLines={2} ellipsizeMode='tail'>
                                            {data.content}
                                        </Text>
                                        <Text style={{ fontSize: 10, color: '#444', lineHeight: 14 }} >
                                            {data.name} · {data.date} · 좋아요 {data.likeNum}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
                                    <View>
                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                            {data.commentNum}
                                        </Text>
                                        <Text style={{ fontSize: 10, marginTop: 4, color: '#444', textAlign: 'center' }}>댓글</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </ScrollView>
            </View>
        )
    }
}


export class BookmarkScreen extends Component {
    static navigationOptions = { title: '북마크' };

    constructor(props) {
        super(props);
        this.state = {
            data: myBookmarkData.data,
        }
    }
    _handle(key) {
        this.props.navigation.navigate('Detail');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                    {this.state.data.map((data, index) =>
                        <TouchableWithoutFeedback key={index} onPress={() => this._handle(data.key)}>
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
            </View>
        )
    }
}