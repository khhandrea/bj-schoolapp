import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Colors } from '../Asset'
import { LinearGradient } from 'expo';
import { AntDesign, SimpleLineIcons, Entypo } from '@expo/vector-icons';
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
            },
            {
                name: '80',
                color: 1,
                time: '10분'
            },
            {
                name: '820',
                color: 2,
                time: '5분',
            },
            {
                name: '690',
                color: 3,
                time: '10분'
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
            },
            {
                name: '720',
                color: 3,
                time: '10분'
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
            },
            {
                name: '80',
                color: 1,
                time: '10분'
            },
            {
                name: '820',
                color: 2,
                time: '5분',
            },
            {
                name: '690',
                color: 3,
                time: '10분'
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
            },
            {
                name: '720',
                color: 3,
                time: '10분'
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
            },
            {
                name: '80',
                color: 1,
                time: '10분'
            },
            {
                name: '820',
                color: 2,
                time: '5분',
            },
            {
                name: '690',
                color: 3,
                time: '10분'
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
            },
            {
                name: '720',
                color: 3,
                time: '10분'
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
            },
            {
                name: '80',
                color: 1,
                time: '10분'
            },
            {
                name: '820',
                color: 2,
                time: '5분',
            },
            {
                name: '690',
                color: 3,
                time: '10분'
            },
            {
                name: '5500',
                color: 0,
                time: '5분',
            },
            {
                name: '720',
                color: 3,
                time: '10분'
            }
        ]
    }
]

export default class BusScreen extends Component {
    static navigationOptions = { title: '버스' };

    constructor(props) {
        super(props);
        this.state = {
            opend: [false, false, false, false],
            sellectedBus: [
                {
                    name: '35',
                    color: 0
                },
                {
                    name: '720',
                    color: 2,
                },
                {
                    name: '690',
                    color: 1,
                },
                {
                    name: '5500-1',
                    color: 3
                }
            ],
        }
    }
    _destoryBus(index) {
        const option = this.state.sellectedBus.filter(() => true);
        option.splice(index, 1);
        this.setState({
            sellectedBus: option,
        })
    }

    _refresh = () => {

    }

    render() {
        const station0 = this._buildStation(data[0], 0);
        const station1 = this._buildStation(data[1], 1);
        const station2 = this._buildStation(data[2], 2);
        const station3 = this._buildStation(data[3], 3);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {station0}
                    {station1}
                    {station2}
                    {station3}
                    <TouchableOpacity onPress={this._refresh} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <SimpleLineIcons name='refresh' style={{ margin: 0 }} color='white' size={20} />
                    </TouchableOpacity>
                </View>
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
                                <Text style={{ color: 'white', marginLeft: 14 }}>버스를 선택해주세요(최대 4개)...</Text>
                            }

                            <View style={{ width: 10 }} />
                        </ScrollView>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    _buildStation = (data, num) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50, borderBottomColor: '#dbdbdb', borderBottomWidth: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{}}>{data.stationName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                        <TouchableOpacity><Entypo name='triangle-down' size={20} /></TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.props.navigation.navigate("Photo", { image: data.stationImage })}>
                            <Text style={{}}>사진보기</Text>
                        </TouchableOpacity>
                    </View>
                </View >


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
