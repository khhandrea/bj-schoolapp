import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Dimensions, Text, TouchableOpacity, Platform, BackHandler } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { LinearGradient } from 'expo';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Card from './Components/MainCard';
import MainTitle from './Components/MainTitle';
import BannerScroll from './Components/BannerScroll';
import ProfileGroups from './Components/ProfileGroups';
import ArrowLeft from './Icons/arrowLeft.svg';
import ArrowRight from './Icons/arrowRight.svg';
import ArrowDown from './Icons/arrowDown.svg';
import GoupArrow from './Icons/goUpArrow.svg';
import ArrowBack from './Icons/arrowBack2.svg';

import ExamScreen from './ExamScreen';
import ContestScreen from './ContestScreen';


const STATUSBARHEIGHT = getStatusBarHeight();
const WIDTH = Dimensions.get('window').width;

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
    constructor(props) {
        super(props);
        this.state = {
            isExam: true,
        }
    }
    _scrollUpClicked = () => {
        this.refs._scrollView.scrollTo({ x: 0, animated: true })
    }

    _examHandle = () => {
        this.setState({ isExam: true });

        setTimeout(() => {
            setTimeout(() => {
                this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
                this.drawer.openDrawer();
            }, 1)
        }, 1)

    }
    _contestHandle = () => {
        this.setState({ isExam: false });
        setTimeout(() => {
            setTimeout(() => {
                this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
                this.drawer.openDrawer();
            }, 1)
        }, 1)


    }
    _drawerClose = () => {
        this.backHandler.remove();
    }
    handleBackPress = () => {
        this.goBack();
        return true;
    }
    goBack = () => {
        this.drawer.closeDrawer();
    }



    render() {
        const renderExam = () => {
            return (
                <View style={{ flex: 1 }}>
                    <ExamScreen close={() => this.drawer.closeDrawer()} />
                </View>)
        };
        const renderContest = () => {
            return (
                <View style={{ flex: 1 }}>
                    <ContestScreen close={() => this.drawer.closeDrawer()} />
                </View>)
        };
        const goUpButton = (
            <TouchableOpacity style={{ alignSelf: 'center', width: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 36 }} onPress={this._scrollUpClicked}>
                <GoupArrow />
            </TouchableOpacity>
        );
        return (
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}
                onResponderStart={this._touchDown}>
                <DrawerLayout
                    ref={drawer => {
                        this.drawer = drawer;
                    }}
                    drawerWidth={WIDTH}
                    drawerPosition={this.state.isExam ? DrawerLayout.positions.Left : DrawerLayout.positions.Right}
                    drawerType='slide'
                    drawerBackgroundColor="#fff"
                    drawerLockMode='locked-open'
                    onDrawerClose={this._drawerClose}
                    renderNavigationView={this.state.isExam ? renderExam : renderContest}>
                    <ScrollView showsVerticalScrollIndicator={false} ref='_scrollView' overScrollMode={"never"} >

                        <StatusBar barStyle={Platform.OS == "android" ? "light-content" : "dark-content"} backgroundColor='#00000080' translucent={true} />

                        <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.TopContainer} start={[0, 0]} end={[1, 1]} >
                            <MainTitle />
                            <BannerScroll navigation={this.props.navigation} />
                            <View style={styles.BottomContainer} />
                        </LinearGradient>


                        <View style={{ width: '100%', marginTop: 10, flex: 1, alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <TouchableOpacity onPress={this._examHandle} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                                    <ArrowLeft />
                                    <Text style={{ marginLeft: 6, fontSize: 14, }}>시험 D-{_dday}</Text>
                                </TouchableOpacity>
                                <Text style={{ flex: 1, fontSize: 14, textAlign: 'center' }}>질문/정보</Text>
                                <TouchableOpacity onPress={this._contestHandle} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                                    <Text style={{ marginRight: 6, fontSize: 14, textAlign: 'right' }}>수행/대회</Text>
                                    <ArrowRight />
                                </TouchableOpacity>
                            </View>
                            <ArrowDown style={{ flex: 1, marginTop: 6 }} />
                        </View>

                        <ProfileGroups navigation={this.props.navigation} />

                        <View style={styles.Cards}>
                            <Card navigation={this.props.navigation} name='김종현' date='2분전' like={5} commentNum={12} isLiked={false} isBookmarked={true} tag={Tag} image={Image} ratio={9 / 16} content={Content} />
                            <Card navigation={this.props.navigation} name='김종현' date='2분전' like={12} commentNum={2} isLiked={true} isBookmarked={false} tag={Tag} image={Image2} ratio={51 / 68} content={Content} />
                            {goUpButton}
                        </View>



                    </ScrollView >
                </DrawerLayout>
            </View>
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

