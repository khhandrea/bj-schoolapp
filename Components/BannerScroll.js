import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Meal } from './BannerScrollCards';
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

export default class BannerScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xOffset: SCROLLUNIT * 2,
        };
    }
    componentDidMount() {
        this.refs._scrollView.scrollTo({ x: SCROLLUNIT * 2, animated: false });
    }

    _scrollCtrl(_x) {
        this.refs._scrollView.scrollTo({ x: _x, animated: true });
    }
    _handleScroll(_xOffset) {
        // console.log(_xOffset);
        this.setState({
            xOffset: _xOffset,
        });
    }
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.ScrollViewHolder}>
                    <ScrollView horizontal={true}
                        style={styles.ScrollView}
                        showsHorizontalScrollIndicator={false}
                        overScrollMode={"never"}
                        ref='_scrollView'
                        onScroll={event => this._handleScroll(event.nativeEvent.contentOffset.x)}
                        scrollEventThrottle={16}
                        nestedScrollEnabled={true}
                    // pagingEnabled={true}
                    >
                        <Meal mealData={MealData} />
                        <Meal mealData={MealData} />
                        <Meal mealData={MealData} />
                        <Meal mealData={MealData} />
                    </ScrollView>
                </View>
                <View style={styles.GenreContainer}>
                    {this.state.xOffset < SCROLLUNIT ? <TimetableIcon /> : <TimetableIconLight />}
                    {this.state.xOffset < SCROLLUNIT * 3 ? <MealIcon /> : <MealIconLight />}
                    {this.state.xOffset > SCROLLUNIT * 1 ? <BusIcon /> : <BusIconLight />}
                    {this.state.xOffset > SCROLLUNIT * 3 ? <StarIcon /> : <StarIconLight />}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center'
    },
    ScrollViewHolder: {
        marginTop: 35,
        height: 250,
    },
    ScrollView: {
        flex: 1,
    },
    GenreContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        marginTop: 50,
    },


})
