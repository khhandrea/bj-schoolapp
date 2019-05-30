import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Button, AppRegistry, Dimensions, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import Card from './Components/MainCard';
import MainTitle from './Components/MainTitle';
import BannerScroll from './Components/BannerScroll';
import ProfileGroups from './Components/ProfileGroups';
import ArrowLeft from './Icons/arrowLeft.svg';
import ArrowRight from './Icons/arrowRight.svg';
import ArrowDown from './Icons/arrowDown.svg';

let _dday = 24;
const Tag = [
    "1학년",
    "수학",
    "이과",
    "질문",
    "HELP!"
];
const Image = [
    "https://i.ytimg.com/vi/X8jcnDCMVN4/maxresdefault.jpg",
    "https://i.ytimg.com/vi/mCprd08bjiA/maxresdefault.jpg"
]
const Content = "🔥6월 6일까지 출시최저가 할인 🔥 Vue.js는 더 이상 최신 트렌드가 아닙니다.프론트엔드 개발자라면 가져야 하는 생존기술이 됐습니다.프레임워크를 처음 배우는 분들도 실무에 바로 쓸 수 있도록, ES5부터 ES6·Vuex까지 정복하고 Vue.js를 내 것으로 만들 수 있습니다";

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (

            <ScrollView style={{ height: 3000 }} showsVerticalScrollIndicator={false} ref='_scrollView'>
                <StatusBar barStyle="light-content" backgroundColor='#00000080' translucent={true} />
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.TopContainer} start={[0, 0]} end={[1, 1]} >
                    <MainTitle />
                    <BannerScroll />
                </LinearGradient>
                <View style={styles.BottomContainer} />

                <View style={{ width: '100%', position: 'absolute', top: 510, flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                            <ArrowLeft />
                            <Text style={{ marginLeft: 6, fontSize: 14, fontFamily: 'nanumbarungothic' }}>시험 D-{_dday}</Text>
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 14, textAlign: 'center', fontFamily: 'nanumbarungothic' }}>질문/정보</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contest')} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                            <Text style={{ marginRight: 6, fontSize: 14, textAlign: 'right', fontFamily: 'nanumbarungothic' }}>수행/대회</Text>
                            <ArrowRight />
                        </TouchableOpacity>
                    </View>
                    <ArrowDown style={{ flex: 1, marginTop: 6 }} />
                </View>

                <ProfileGroups />

                <View style={styles.Cards}>
                    <Card name='김종현' date='2분전' like='5' commentNum='13' isLiked={true} isBookmarked={true} tag={Tag} image={Image} content={Content} />
                    <Card />
                    <Card />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    TopContainer: {
        left: 0,
        right: 0,
        top: 0,
        height: 500
    },
    BottomContainer: { //radius
        position: 'absolute',
        top: 480,
        left: 0,
        right: 0,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    Cards: {
        width: '100%',
        alignItems: 'center',

    }
});

