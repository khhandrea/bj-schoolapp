import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Button, AppRegistry, Dimensions, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { LinearGradient } from 'expo';
import Card from './Components/MainCard';
import MainTitle from './Components/MainTitle';
import BannerScroll from './Components/BannerScroll';
import ProfileGroups from './Components/ProfileGroups';
import ArrowLeft from './Icons/arrowLeft.svg';
import ArrowRight from './Icons/arrowRight.svg';
import ArrowDown from './Icons/arrowDown.svg';
import GoupArrow from './Icons/goUpArrow.svg';



const STATUSBARHEIGHT = getStatusBarHeight();

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
];
const Image2 = [
    "https://t1.daumcdn.net/cfile/tistory/22144F3A58443EF92E"
]
const Content = "마리가 도망친게 이해가 될듯 말듯.... 어쩌면 마리가 정말 사랑한건 루벤보다도 루벤에게 사랑받고 아름답게 보여지는 자신의 모습 아닐까....";

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    _scrollUpClicked = () => {
        this.refs._scrollView.scrollTo({ x: 0, animated: true })
    }



    render() {
        const goUpButton = (
            <TouchableOpacity style={{ alignSelf: 'center', width: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 36 }} onPress={this._scrollUpClicked}>
                <GoupArrow />
            </TouchableOpacity>
        )
        return (

            <ScrollView showsVerticalScrollIndicator={false} ref='_scrollView' overScrollMode={"never"} >
                <StatusBar barStyle={Platform.OS == "android" ? "light-content" : "dark-content"} backgroundColor='#00000080' translucent={true} />

                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.TopContainer} start={[0, 0]} end={[1, 1]} >
                    <MainTitle />
                    <BannerScroll />
                    <View style={styles.BottomContainer} />
                </LinearGradient>


                <View style={{ width: '100%', marginTop: 10, flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                            <ArrowLeft />
                            <Text style={{ marginLeft: 6, fontSize: 14, }}>시험 D-{_dday}</Text>
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 14, textAlign: 'center' }}>질문/정보</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contest')} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                            <Text style={{ marginRight: 6, fontSize: 14, textAlign: 'right' }}>수행/대회</Text>
                            <ArrowRight />
                        </TouchableOpacity>
                    </View>
                    <ArrowDown style={{ flex: 1, marginTop: 6 }} />
                </View>

                <ProfileGroups />

                <View style={styles.Cards}>
                    <Card navigation={this.props.navigation} name='김종현' date='2분전' like='5' commentNum='13' isLiked={true} isBookmarked={true} tag={Tag} image={Image} ratio={9 / 16} content={Content} />
                    <Card navigation={this.props.navigation} name='김종현' date='2분전' like='5' commentNum='13' isLiked={true} isBookmarked={true} tag={Tag} image={Image2} ratio={51 / 68} content={Content} />
                    {goUpButton}
                </View>


            </ScrollView >
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
        height: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white'
    },
    Cards: {
        width: '100%',
        alignItems: 'center',

    }
});

