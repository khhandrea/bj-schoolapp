import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Dimensions, InteractionManager, Platform } from 'react-native'
import { Meal, Timetable, Notification, Traffic } from './BannerScrollCards';
import TimetableIcon from '../Icons/timetable.svg';
import MealIcon from '../Icons/meal.svg';
import StarIcon from '../Icons/star.svg';
import BusIcon from '../Icons/bus.svg';
import TimetableIconLight from '../Icons/timetablelight.svg';
import MealIconLight from '../Icons/meallight.svg';
import StarIconLight from '../Icons/starlight.svg';
import BusIconLight from '../Icons/buslight.svg';


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

export default class BannerScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xOffset: SCROLLUNIT * 2 + ((WIDTH - 318) / 2),
        };

    }
    componentDidMount() {
        if (Platform.OS == 'android') {
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                    this.myScroll.scrollTo({ x: SCROLLUNIT * 2 + ((WIDTH - 318) / 2), y: 0, animated: false });
                }, 1)
            })
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
