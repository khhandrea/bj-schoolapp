import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { Colors } from '../Components/Asset'
import { LinearGradient } from 'expo';
import { AntDesign, SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { BorderlessButton, BaseButton } from 'react-native-gesture-handler';
import Yellowbus from '../Icons/yellowBus.svg';
import GreenBus from '../Icons/greenBus.svg';
import BlueBus from '../Icons/blueBus.svg';
import RedBus from '../Icons/redBus.svg';


const WIDTH = Dimensions.get('window').width;
const data = [
    {
        stationName: '교문앞',
        stationImage: 'http://www.inews365.com/data/photos/201507/pp_403306_1_1435724940.jpg',
        bus: [
            {
                name: '35',
                color: 0,
                time: '5분',
                time2: '30분',
                picked: false
            },
            {
                name: '80',
                color: 1,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '820',
                color: 2,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '690',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '720',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            }
        ]
    },
    {
        stationName: '길건너 교문앞',
        stationImage: 'http://www.inews365.com/data/photos/201507/pp_403306_1_1435724940.jpg',
        bus: [
            {
                name: '35',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '80',
                color: 1,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '820',
                color: 2,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '690',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '720',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            }
        ]
    },
    {
        stationName: '보정역 앞',
        stationImage: 'http://www.inews365.com/data/photos/201507/pp_403306_1_1435724940.jpg',
        bus: [
            {
                name: '35',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '80',
                color: 1,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '820',
                color: 2,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '690',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '720',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            }
        ]
    },
    {
        stationName: '길건너 보정역 앞',
        stationImage: 'http://www.inews365.com/data/photos/201507/pp_403306_1_1435724940.jpg',
        bus: [
            {
                name: '35',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '80',
                color: 1,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '820',
                color: 2,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '690',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
                time2: '20분',
                picked: false
            },
            {
                name: '720',
                color: 3,
                time: '10분',
                time2: '20분',
                picked: false
            }
        ]
    }
]

export default class BusScreen extends Component {
    static navigationOptions = {
        title: '버스',
        headerRight: (
            <BaseButton onPress={this._refresh} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} >
                <SimpleLineIcons accessible name='refresh' size={16} />
            </BaseButton>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            opend: [false, false, false, false],
            data: data,
            sellectedBus: [
                {
                    name: '35',
                    color: 0,
                    parentIndex: 1,
                    childIndex: 0
                }
            ],
        }


        setTimeout(() => {
            this.setState({ loading: true });
        }, 700)
    }

    componentDidMount() {
        this.state.sellectedBus.forEach((data) => {
            const d = this.state.data;
            d[data.parentIndex].bus[data.childIndex].picked = true;
            this.setState({ data: d });
        });
    }
    _destoryBus(index) {
        const d = this.state.data;
        d[this.state.sellectedBus[index].parentIndex].bus[this.state.sellectedBus[index].childIndex].picked = false;
        const option = this.state.sellectedBus.filter(() => true);
        option.splice(index, 1);
        this.setState({
            sellectedBus: option,
            data: d,
        })
    }

    _refresh = () => {

    }

    _openDetail(index) {
        const c = this.state.opend;
        c[index] = !c[index];
        this.setState({ opend: c });
    }

    render() {
        const station0 = this._buildStation(this.state.data[0], 0);
        const station1 = this._buildStation(this.state.data[1], 1);
        const station2 = this._buildStation(this.state.data[2], 2);
        const station3 = this._buildStation(this.state.data[3], 3);
        return (
            this.state.loading ?
                <View style={{ flex: 1 }}>
                    <ScrollView overScrollMode={"never"} style={{ flex: 1 }}>
                        {station0}
                        {station1}
                        {station2}
                        {station3}
                        <View style={{ height: 50 }} />
                    </ScrollView>
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50 }}>
                        <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }} start={[0, 0]} end={[1, 1]} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode={"never"} style={{ width: '100%' }}>
                                {this.state.sellectedBus.length > 0 ?
                                    this.state.sellectedBus.map((data, index) =>
                                        <TouchableOpacity key={index} style={{ height: 30, paddingHorizontal: 14, borderRadius: 15, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', flexDirection: 'row' }} onPress={() => this._destoryBus(index)}>
                                            {this._num2Bus(data.color)}
                                            <Text style={{ fontSize: 14, marginRight: 4, marginLeft: 8 }}>{data.name}</Text>
                                            <AntDesign name='close' style={{ margin: 0 }} color={Colors.gray} size={10} />
                                        </TouchableOpacity>) :
                                    <Text style={{ color: 'white', marginLeft: 14, fontSize: 14 }}>버스를 선택해주세요(최대 4개)...</Text>
                                }

                                <View style={{ width: 10 }} />
                            </ScrollView>
                        </LinearGradient>
                    </View>
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='#dddddd' /></View>
        )
    }

    _buildStation = (data, num) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50, borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14 }}>{data.stationName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}><BorderlessButton onPress={() => this._openDetail(num)}><Entypo accessible name={this.state.opend[num] ? 'triangle-up' : 'triangle-down'} size={20} /></BorderlessButton></View>
                        <TouchableOpacity style={{ marginRight: 60, height: 50, alignItems: 'center', width: 60, justifyContent: 'flex-end', flexDirection: 'row' }} onPress={() => this.props.navigation.navigate("Photo", { image: data.stationImage })}>
                            <Text style={{ fontSize: 14, textAlign: 'right' }}>사진보기</Text>
                        </TouchableOpacity>
                    </View>
                </View >
                {this.state.opend[num] &&
                    <View style={{ borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, }}>
                        {data.bus.map((info, index) =>
                            <View key={index} style={{ height: 40, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    {this._num2Bus(info.color)}
                                    <Text style={{ fontSize: 14, marginLeft: 10 }}>{info.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                    <BorderlessButton style={{ width: 30, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                                        if (!info.picked && this.state.sellectedBus.length < 4) {
                                            const c = this.state.sellectedBus;
                                            c.push({ name: info.name, color: info.color, parentIndex: num, childIndex: index })
                                            const d = this.state.data;
                                            d[num].bus[index].picked = true;
                                            this.setState({
                                                sellectedBus: c,
                                                data: d
                                            });
                                        } else {
                                            const c = this.state.sellectedBus.filter((data) =>
                                                data.parentIndex != num || data.childIndex != index
                                            )
                                            const d = this.state.data;
                                            d[num].bus[index].picked = false;
                                            this.setState({
                                                sellectedBus: c,
                                                data: d
                                            });
                                        }
                                    }}>
                                        <Ionicons accessible name={info.picked ? 'ios-radio-button-on' : 'ios-radio-button-off'} size={14} style={{ margin: 0 }} />
                                    </BorderlessButton>
                                    <View style={{ marginRight: 60, height: 40, alignItems: 'center', width: 50, justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, textAlign: 'right' }}>{info.time2}</Text>
                                    </View>
                                    <View style={{ marginRight: 4, height: 40, alignItems: 'center', width: 40, justifyContent: 'flex-end', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, textAlign: 'right' }}>{info.time}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                }

            </View >
        )
    }

    _num2Bus = (index) => {
        if (index == 0) {
            return <Yellowbus style={styles.BottomBusIcon} />
        } else if (index == 1) {
            return <GreenBus style={styles.BottomBusIcon} />
        } else if (index == 2) {
            return <BlueBus style={styles.BottomBusIcon} />
        } else if (index == 3) {
            return <RedBus style={styles.BottomBusIcon} />
        }
    }
}

const styles = StyleSheet.create({
    BottomBusIcon: {

    }
})
