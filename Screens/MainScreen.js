import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Dimensions, Text, TouchableOpacity, Platform, Animated, AsyncStorage, Image, TouchableWithoutFeedback, Easing, InteractionManager } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { LinearGradient } from 'expo';
import { Colors } from '../Components/Asset';
import { BaseButton } from 'react-native-gesture-handler';
import { Meal, Timetable, Notification, Traffic } from '../Components/BannerScrollCards';
import TimetableIcon from '../Icons/timetable.svg';
import MealIcon from '../Icons/meal.svg';
import StarIcon from '../Icons/star.svg';
import BusIcon from '../Icons/bus.svg';
import TimetableIconLight from '../Icons/timetablelight.svg';
import MealIconLight from '../Icons/meallight.svg';
import StarIconLight from '../Icons/starlight.svg';
import BusIconLight from '../Icons/buslight.svg';
import ArrowLeft from '../Icons/arrowLeft.svg';
import ArrowRight from '../Icons/arrowRight.svg';
import ArrowDown from '../Icons/arrowDown.svg';
import GoupArrow from '../Icons/goUpArrow.svg';
import Setting from '../Icons/setting.svg';
import BookmarkFill from '../Icons/bookmarkFill.svg';
import BookmarkEmpty from '../Icons/bookmarkEmpty.svg';
import HeartFill from '../Icons/heartFill.svg';
import HeartEmpty from '../Icons/heartEmpty.svg';
import Dots from '../Icons/threeDots.svg';
import User from '../Icons/user.svg';
import Bell from '../Icons/bell.svg';
import Plus from '../Icons/plus.svg';
import PlusWhite from '../Icons/plusWhite.svg';
import Search from '../Icons/search.svg';
import BookMark from '../Icons/bookmark.svg'


const MaxRatio = 2;
const STATUSBARHEIGHT = getStatusBarHeight();
const WIDTH = Dimensions.get('window').width;

const SCROLLUNIT = (636 - WIDTH) / 4;

const MealData = [
    "흑미밥",
    "쇠고기우거지국",
    "연어알날치구이",
    "비엔나떡볶음",
    "배추김치",
    "청포도"
];
const Schedule = [
    "문학1",
    "수학1",
    "영어B",
    "윤리와사상",
    "체육",
    "미술",
    "기하백터"
];
const Notifications = [
    "음악대회\n음악실\n01:20~02:00",
    "이그나이트보정\n05:50~ 07:00"
];
const Bus = [
    '35',
    '690',
    '720'
];

const DURATION = 200;
let _rank = 'Zl존';
let _post = '7';
let _commnet = '14';
let _feed = 1;

let _dday = 24;
const Tag = [
    "1학년",
    "수학",
    "이과",
    "질문",
    "HELP!"
];
const Image1 = [
    "https://i.ytimg.com/vi/X8jcnDCMVN4/maxresdefault.jpg",
    "https://i.ytimg.com/vi/mCprd08bjiA/maxresdefault.jpg",
    "https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA="
];
const Image2 = [
    "https://t1.daumcdn.net/cfile/tistory/22144F3A58443EF92E",
    "https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA="
]
const Content = "마리가 도망친게 이해가 될듯 말듯.... 어쩌면 마리가 정말 사랑한건 루벤보다도 루벤에게 사랑받고 아름답게 보여지는 자신의 모습 아닐까....\nhttps://t1.daumcdn.net/cfile/tistory/22144F3A58443EF92E";



export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            portiereOpacity: new Animated.Value(0),
            isPortiereOn: false,
            lowDataMode: true,
            isdday: true,
        }
    }

    async componentDidMount() {
        let lowData = await AsyncStorage.getItem('ISLOWDATA');
        let dday = await AsyncStorage.getItem('ISDDAY');

        lowData = lowData === null ? false : lowData === 'true' ? true : false;
        dday = dday === null ? true : dday === 'true' ? true : false;

        this.setState({ lowDataMode: lowData, isdday: dday });
    }
    _scrollUpClicked = () => {
        this.refs._scrollView.scrollTo({ x: 0, animated: true })
    }

    _examHandle = () => {
        // this._activePortiere();
        this.props.jumpTo('first');

    }
    _contestHandle = () => {
        // this._activePortiere();
        this.props.jumpTo('third');
    }
    _activePortiere = () => {
        this.setState({ isPortiereOn: true })
        Animated.timing(this.state.portiereOpacity, { toValue: 1, duration: 1000 }).start();

        setTimeout(() => {
            this.setState({ isPortiereOn: false })
            Animated.timing(this.state.portiereOpacity, { toValue: 0, duration: 0 }).start();
        }, 1000)

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
        const goUpButton = (
            <TouchableOpacity style={{ alignSelf: 'center', width: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 36 }} onPress={this._scrollUpClicked}>
                <GoupArrow />
            </TouchableOpacity>
        );
        return (
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}
                onResponderStart={this._touchDown}>

                <ScrollView showsVerticalScrollIndicator={false} ref='_scrollView' overScrollMode={"never"} >

                    <StatusBar barStyle={Platform.OS == "android" ? "light-content" : "dark-content"} backgroundColor='#00000080' translucent={true} />

                    <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.TopContainer} start={[0, 0]} end={[1, 1]} >
                        <View style={styles.TitleContainer}>
                            <Text style={{ fontSize: 30, color: 'white', fontFamily: 'segoe-ui' }}>BOJEONG</Text>
                            <Text style={{ marginLeft: 6, marginTop: 12, fontSize: 14, color: '#ffffff80', fontFamily: 'segoe-ui' }}>SCHOOLAPP</Text>
                            <TouchableOpacity style={{ position: 'absolute', right: 20, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Setting')}>
                                <Setting />
                            </TouchableOpacity>
                        </View>
                        <BannerScroll navigation={this.props.navigation} />
                        <View style={styles.BottomContainer} />
                    </LinearGradient>


                    <View style={{ width: '100%', marginTop: 10, flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <TouchableOpacity onPress={this._examHandle} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                                <ArrowLeft />
                                <Text style={{ marginLeft: 6, fontSize: 14, }}>시험{this.state.isdday ? ` D-${_dday}` : null}</Text>
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
                        <Card navigation={this.props.navigation} name='김종현' date='2분전' like={5} commentNum={12} isLiked={false} isBookmarked={true} tag={Tag} image={Image1} ratio={9 / 16} content={Content} lowDataMode={this.state.lowDataMode} />
                        <Card navigation={this.props.navigation} name='김종현' date='2분전' like={12} commentNum={2} isLiked={true} isBookmarked={false} tag={Tag} image={Image2} ratio={51 / 68} content={Content} lowDataMode={this.state.lowDataMode} />
                        <Card navigation={this.props.navigation} name='김종현' date='2분전' like={12} commentNum={2} isLiked={true} isBookmarked={false} tag={Tag} content={Content} lowDataMode={this.state.lowDataMode} />
                        {goUpButton}
                    </View>



                </ScrollView >
                {this.state.isPortiereOn && <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: '#000000aa', opacity: this.state.portiereOpacity }} />}
            </View>
        )
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myPage: 1,
            isOverflow: false,
            readMoreClicked: false,
            isLiked: this.props.isLiked,
            isBookmarked: this.props.isBookmarked,
            like: this.props.like,
            view: false,
        }
    }
    _imageClicked(source) {
        this.props.navigation.navigate('Photo', { image: this.props.image, index: (this.state.myPage - 1) });
    }
    _scrollHandle = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / (WIDTH - 40)) + 1;
        this.setState({
            myPage: page
        })
    }
    _involkedLayout = (event) => {
        if (event.nativeEvent.layout.height > 40) {
            this.setState({
                isOverflow: true,
            });
        }
    }
    _readmoreHandle = () => {
        this.setState({
            readMoreClicked: true,
        })
    }
    _likeHandle = () => {
        this.setState({
            like: !this.state.isLiked ? this.state.like + 1 : this.state.like - 1,
            isLiked: !this.state.isLiked,
        })
    }
    _bookmarkHandle = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked
        })
    }
    _commentHandle = () => {
        this.props.navigation.navigate('Comment');
    }
    render() {
        const { name, date, commentNum, content, image, tag, ratio, lowDataMode } = this.props;

        const tagList = tag ? tag.map(
            (text, index) => (
                <View key={index} style={styles.TagList}>
                    <View style={{
                        width: 4, height: 4, borderRadius: 2, marginRight: 4,
                        backgroundColor: (index % 2 == 0 ? Colors.blue : Colors.red)
                    }} />
                    <Text style={{ fontSize: 14 }}>{text}</Text>
                </View>
            )
        ) : null;

        const imageList = image ? image.map(
            (source, index) => (
                <TouchableOpacity activeOpacity={1} key={index} onPress={() => this._imageClicked(source)}><Image source={{ uri: source }} style={{ width: WIDTH - 40, height: (WIDTH - 40) * (ratio > MaxRatio ? MaxRatio : ratio < 1 / MaxRatio ? 1 / MaxRatio : ratio) }} /></TouchableOpacity>
            )
        ) : null;

        return (
            <View style={styles.Conatiner}>
                <View style={styles.HeaderContainer}>
                    <View style={styles.UserContainer}>
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'red' }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                            <Text style={{ fontSize: 14 }}>{name}</Text>
                            <Text style={{ fontSize: 10, color: Colors.gray, marginLeft: 4, marginTop: 4 }}>{date}</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}><Dots /></TouchableWithoutFeedback>
                </View>

                {imageList != null ? !lowDataMode || this.state.view ?
                    <View style={styles.ImageContainer}>
                        <ScrollView overScrollMode={"never"} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this._scrollHandle} scrollEventThrottle={16}>
                            {imageList}
                        </ScrollView>
                        {image.length > 1 ?
                            <View style={styles.ImageNav}><Text style={{ color: 'white', fontSize: 12 }}>{this.state.myPage}/{image.length}</Text></View> : null}
                    </View>
                    :
                    <BaseButton onPress={() => {
                        this.setState({ view: true });
                    }} style={{ width: '100%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: Colors.highlightBlue }}>사진보기(데이터 절약모드)</Text>
                    </BaseButton>
                    : null}

                {tagList != null ? <View style={styles.TagContainer}>
                    {tagList}
                </View> : null}

                <View style={styles.ContentContainer}>
                    <View style={styles.ContentTextContainer}>
                        <Text ref={(ref) => this.contentText = ref} style={styles.ContentText} onLayout={this._involkedLayout} numberOfLines={this.state.isOverflow == true ? (this.state.readMoreClicked == true ? null : 2) : null}>{content}</Text>
                        {this.state.isOverflow && !this.state.readMoreClicked ? <TouchableWithoutFeedback onPress={this._readmoreHandle}><Text style={{ color: Colors.lightGray, fontSize: 14, lineHeight: 20 }} >자세히 보기</Text></TouchableWithoutFeedback> : null}

                        <Text style={styles.ContentData}>
                            좋아요{this.state.like} · 댓글{commentNum}
                        </Text>
                    </View>
                </View>
                <LinearGradient colors={[Colors.lightBlue, Colors.lightRed]} style={styles.BottomBar} start={[0, 0]} end={[1, 1]} >

                    <BaseButton style={styles.BottomBarContent} onPress={this._likeHandle}>
                        {this.state.isLiked == true ? <HeartFill /> : <HeartEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>좋아요</Text>
                    </BaseButton>
                    <BaseButton onPress={this._commentHandle} style={{ height: '100%', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14 }} >댓글</Text>
                    </BaseButton>
                    <BaseButton style={styles.BottomBarContent} onPress={this._bookmarkHandle}>
                        {this.state.isBookmarked == true ? <BookmarkFill /> : <BookmarkEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>북마크</Text>
                    </BaseButton>
                </LinearGradient>
            </View>
        )
    }

}
class BannerScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xOffset: SCROLLUNIT * 2 + ((WIDTH - 318) / 2),
        };

    }
    componentDidMount() {
        if (Platform.OS == 'android') {
            setTimeout(() => {
                this.myScroll.scrollTo({ x: SCROLLUNIT * 2 + ((WIDTH - 318) / 2), y: 0, animated: false });
            }, 1)

        } else {
            this.myScroll.scrollTo({ x: SCROLLUNIT * 2 + ((WIDTH - 318) / 2), y: 0, animated: false });
        }
    }

    _scrollCtrl(_x) {
        this.myScroll.scrollTo({ x: _x, animated: true });
    }
    _handleScroll(_xOffset) {
        this.setState({
            xOffset: _xOffset,
        });
    }
    render() {
        return (
            <View style={styles2.Container}>
                <View style={styles2.ScrollViewHolder}>
                    <ScrollView horizontal={true} style={styles2.ScrollView} showsHorizontalScrollIndicator={false} overScrollMode={"never"} ref={(ref) => this.myScroll = ref}
                        onScroll={event => this._handleScroll(event.nativeEvent.contentOffset.x)} scrollEventThrottle={16} nestedScrollEnabled={true}>
                        <View style={{ width: (WIDTH - 318) / 2 }} />
                        <Timetable navigation={this.props.navigation} schedule={Schedule} />
                        <Meal navigation={this.props.navigation} mealData={MealData} />
                        <Traffic navigation={this.props.navigation} bus={Bus} />
                        <Notification navigation={this.props.navigation} notification={Notifications} />
                        <View style={{ width: (WIDTH - 318) / 2 }} />
                    </ScrollView>
                </View>

                <View style={styles2.GenreContainer}>
                    <TouchableWithoutFeedback onPress={() => this._scrollCtrl(0)}>{this.state.xOffset < SCROLLUNIT ? <TimetableIcon /> : <TimetableIconLight />}</TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this._scrollCtrl(SCROLLUNIT * 2 + ((WIDTH - 318) / 2))}>{this.state.xOffset < SCROLLUNIT * 3 ? <MealIcon /> : <MealIconLight />}</TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this._scrollCtrl(SCROLLUNIT * 2 + ((WIDTH - 318) / 2))}>{this.state.xOffset > SCROLLUNIT * 1 ? <BusIcon /> : <BusIconLight />}</TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this._scrollCtrl(SCROLLUNIT * 4 + WIDTH - 318)}>{this.state.xOffset > SCROLLUNIT * 3 ? <StarIcon /> : <StarIconLight />}</TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles2 = StyleSheet.create({
    Container: {
        alignItems: 'center',
    },
    ScrollViewHolder: {
        marginTop: 35,
        height: 250,
        width: WIDTH
    },
    ScrollView: {
        width: '100%',
    },
    GenreContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        marginTop: 50,
    },


})


class ProfileGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: new Animated.Value(40),
            info: new Animated.Value(40),
            more: new Animated.Value(200),
            clicked: 3,
            feed: 1,
            delaying: false,
            name: '어둠의 다크',
            number: '20702'
        };
    }

    componentDidMount() {
    }
    _feedHandle = () => {
        setTimeout(() => {
            this.setState({
                feed: 0
            })
        }, 1000)
    }

    _openProfile() {
        if (this.state.clicked != 1) {
            this.setState({ clicked: 1, delaying: true });
            Animated.parallel([
                Animated.timing(this.state.info, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.more, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.profile, { ease: Easing.linear, toValue: 200, duration: DURATION })
            ]).start(() => this._delayEnd());
        }
    }
    _openInfo() {
        if (this.state.clicked != 2) {
            this.setState({ clicked: 2, delaying: true });
            Animated.parallel([
                Animated.timing(this.state.profile, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.more, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.info, { ease: Easing.linear, toValue: 200, duration: DURATION })
            ]).start(() => this._delayEnd());
        }

    }
    _openMore() {
        if (this.state.clicked != 3) {
            this.setState({ clicked: 3, delaying: true });
            Animated.parallel([
                Animated.timing(this.state.info, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.profile, { ease: Easing.linear, toValue: 40, duration: DURATION }),
                Animated.timing(this.state.more, { ease: Easing.linear, toValue: 200, duration: DURATION })
            ]).start(() => this._delayEnd());
        }
    }
    _delayEnd() {
        this.setState({ delaying: false });
    }
    _changeProfileData = (name, number) => {
        this.setState({
            number: number,
            name: name,
        })
    }

    render() {
        return (
            <View style={styles1.Container}>
                <Animated.View style={{ width: this.state.profile, height: 120, shadowColor: "#000", ...styles1.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openProfile()}>
                        <LinearGradient style={styles1.BoxContainer} colors={[Colors.lightRed, Colors.lightBlue]} start={[0, 0]} end={[1, 1]}>
                            <View style={styles1.BoxTitle}>
                                <User color="red" />
                            </View>
                            {this.state.clicked == 1 && !this.state.delaying ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { changeProfile: this._changeProfileData })} style={styles1.Content}>
                                <View style={styles1.ContentView}><Text style={styles1.ContentTitle}>학번</Text><Text style={styles1.ContentValue1}>{this.state.number}</Text></View>
                                <View style={styles1.ContentView}><Text style={styles1.ContentTitle}>닉네임</Text><Text style={styles1.ContentValue1}>{this.state.name}</Text></View>
                                <View style={styles1.ContentView}><Text style={styles1.ContentTitle}>등급</Text><Text style={styles1.ContentValue1}>{_rank}</Text></View>
                            </TouchableOpacity> : null}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.info, height: 120, shadowColor: "#000", ...styles1.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openInfo()}>
                        <LinearGradient style={styles1.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles1.BoxTitle}>
                                <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Bell />
                                    {this.state.feed > 0 ? <View style={{
                                        width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: 'white', backgroundColor: Colors.red, position: 'absolute', bottom: 10,
                                        right: 9
                                    }} /> : null}
                                </View>
                            </View>
                            {this.state.clicked == 2 && !this.state.delaying ?
                                <View style={styles1.Content}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyPost')} style={styles1.ContentView}><Text style={styles1.ContentTitle}>게시물</Text><Text style={styles1.ContentValue2}>{_post}</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyComment')} style={styles1.ContentView}><Text style={styles1.ContentTitle}>댓글</Text><Text style={styles1.ContentValue2}>{_commnet}</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles1.ContentView} onPress={this._feedHandle}><Text style={styles1.ContentTitle}>새알림</Text><Text style={styles1.ContentValue2}>{this.state.feed}</Text></TouchableOpacity>
                                </View> :
                                <Text style={{ color: 'white', fontFamily: 'nanumbarungothic', fontSize: 16, textAlign: 'center', marginTop: 46 }}>{this.state.feed > 0 && !this.state.delaying ? this.state.feed : null}</Text>}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.more, height: 120, shadowColor: "#000", ...styles1.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openMore()}>
                        <LinearGradient style={styles1.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles1.BoxTitle}>
                                <Plus />
                            </View>
                            {this.state.clicked == 3 && !this.state.delaying ?
                                <View style={styles1.Content}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Bookmark')} style={styles1.ContentView}><Text style={styles1.ContentTitle}>북마크</Text><BookMark style={styles1.contentValue3} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} style={styles1.ContentView}><Text style={styles1.ContentTitle}>검색</Text><Search style={styles1.contentValue3} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Post')} style={styles1.ContentView}><Text style={styles1.ContentTitle}>글쓰기</Text><PlusWhite style={styles1.contentValue3} /></TouchableOpacity>
                                </View> : null}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        )
    }
}


const styles1 = StyleSheet.create({
    Container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 100,
        paddingLeft: 20,
        paddingRight: 20,
    },
    Content: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 24,
    },
    ContentView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContentTitle: {
        fontFamily: 'nanumbarungothic',
        fontSize: 14,
        color: 'white',
    },
    ContentValue1: {
        fontFamily: 'nanumbarungothic',
        fontSize: 10,
        color: 'white',
        paddingBottom: 8,
        marginTop: 12,
    },
    ContentValue2: {
        fontFamily: 'nanumbarungothic',
        fontSize: 14,
        color: 'white',
        paddingBottom: 7,
        marginTop: 10,
    },
    contentValue3: {
        marginBottom: 8,
        marginTop: 10,
    },
    BoxContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 20,

        ...Platform.select({
            android: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }
        }),
    },
    BoxTitle: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    IosShadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }
        }),
    }
})

const styles = StyleSheet.create({
    Conatiner: {
        marginBottom: 36,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
        width: WIDTH - 40,
    },
    HeaderContainer: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 14,
        paddingRight: 14,
    },
    UserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ImageContainer: {
        width: WIDTH - 40,
        marginBottom: 5,
    },
    ImageNav: {
        height: 20,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#4b4b4b80',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    TagContainer: {
        width: WIDTH - 40,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    TagList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    ContentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    ContentTextContainer: {
        width: '100%',
        marginBottom: 5,
    },
    ContentText: {
        fontSize: 14,
        lineHeight: 20
    },
    ContentData: {
        textAlign: 'right',
        fontSize: 10,
        color: Colors.lightGray,
        fontWeight: 'bold',
    },
    BottomBar: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    BottomBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1
    },
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

    },
    TitleContainer: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 40,
        width: '100%'
    },
})
