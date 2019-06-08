import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors } from '../Asset';
import MealIcon from '../Icons/cardTimetable.svg';
import EnterIcon from '../Icons/cardEnter.svg';
import MoreIcon from '../Icons/cardMore.svg';
import RefrashIcon from '../Icons/cardRefresh.svg';
import Yellowbus from '../Icons/yellowBus.svg';
import BlueBus from '../Icons/blueBus.svg';
import RedBus from '../Icons/redBus.svg';
import GreenBus from '../Icons/greenBus.svg';
import Plus from '../Icons/plusLightGray.svg';


class MyItem extends Component {
    render() {
        const { data, index, title } = this.props;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: title == 'Meal' ? 2 : title == 'Notification' ? 10 : 1 }}>
                <View style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: (index % 2 == 0 ? Colors.red : Colors.blue),
                }}
                />
                <Text style={{ fontSize: 14, color: Colors.fontBlack, marginLeft: 6 }}>{data}</Text>
            </View>
        )
    }
}

export class Meal extends Component {
    render() {
        const { mealData } = this.props;
        const mealList = mealData.map(
            (info, index) => (
                <MyItem data={info} index={index} key={index} title='Meal' />
            )
        );
        return (
            <View style={styles.Container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>급식</Text>
                </View>

                <View style={styles.ContentConainer}>
                    {mealList}
                </View>

                <View style={styles.ButtonConainer}>
                    <TouchableOpacity style={styles.Button}><MealIcon /></TouchableOpacity>
                </View>
            </View>
        )
    }
}
export class Timetable extends Component {
    render() {
        const { schedule } = this.props;
        const am =
            <View>
                <MyItem data={schedule[0]} key={0} index={0} />
                <MyItem data={schedule[1]} key={1} index={1} />
                <MyItem data={schedule[2]} key={2} index={2} />
                <MyItem data={schedule[3]} key={3} index={3} />
            </View>;
        const pm =
            <View>
                <MyItem data={schedule[4]} key={4} index={4} />
                <MyItem data={schedule[5]} key={5} index={5} />
                {schedule.length >= 7 ? <MyItem data={schedule[6]} key={6} index={6} /> : null}
            </View>

        return (
            <View style={styles.Container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>시간표</Text>
                </View>

                <View style={styles.ContentConainer}>
                    {am}
                    <View style={{ width: 50, marginLeft: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginBottom: 2, marginTop: 2 }} />
                    {pm}
                </View>

                <View style={styles.ButtonConainer}>
                    <TouchableOpacity style={styles.Button}><MoreIcon /></TouchableOpacity>
                </View>
            </View>
        )
    }
}
export class Notification extends Component {
    render() {
        const { notification } = this.props;
        const notiList = notification.map(
            (info, index) => (
                <MyItem data={info} index={index} key={index} title='Notification' />
            )
        );
        return (
            <View style={styles.Container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>공지</Text>
                </View>

                <View style={styles.ContentConainer}>
                    {notiList}
                </View>

                <View style={styles.ButtonConainer}>
                    <TouchableOpacity style={styles.Button}><EnterIcon /></TouchableOpacity>
                </View>
            </View>
        )
    }
}
export class Traffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subway: {
                gusung: '5분',
                Jukjeon: '2분'
            },
            bus: [
                '2분',
                '7분',
                '3분',
                '15분'
            ]

        }
    }
    render() {
        const { bus } = this.props;
        return (
            <View style={styles.Container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>교통</Text>
                </View>

                <View style={styles.ContentConainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6 }}><Text>구성방면</Text><Text>{this.state.subway.gusung}</Text></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6 }}><Text>죽전방면</Text><Text>{this.state.subway.Jukjeon}</Text></View>
                    <View style={{ width: 100, alignSelf: 'center', borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginBottom: 6, marginTop: 6 }} />
                    <TouchableWithoutFeedback>
                        <View>
                            {bus.map(
                                (info, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6, marginBottom: 3 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <BusIcon bus={info} />
                                            <Text style={{ marginLeft: 5 }}>{info}</Text>
                                        </View>
                                        <Text>{this.state.bus[index]}</Text>
                                    </View>
                                )
                            )}
                            {bus.length < 4 ? <Plus style={{ alignSelf: 'center', marginTop: 5 }} /> : null}
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.ButtonConainer}>
                    <TouchableOpacity style={styles.Button}><RefrashIcon /></TouchableOpacity>
                </View>
            </View>
        )
    }
}

BusIcon = (bus) => {
    switch (bus.bus) {
        case '35': return <Yellowbus />
        case '36': return <Yellowbus />
        case '80': return <Yellowbus />
        case '690': return <GreenBus />
        case '720': return <BlueBus />
        case '5500': return <RedBus />
        default: return <Yellowbus />
    }
}

const styles = StyleSheet.create({
    Container: {
        width: 139,
        height: 224,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    TitleContainer: {
        width: 100,
        height: 30,
        backgroundColor: '#8293FF',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    ContentConainer: {
        padding: 12,
        height: 170,
        width: 139
    },

    ButtonConainer: {
        width: '100%',
        height: 24,
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }

})
