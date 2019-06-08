import React, { Component } from 'react'
import { Alert, Text, StyleSheet, View, Button, Animated, TouchableWithoutFeedback, Platform, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo';
import { MyIcon } from '../Asset';
import User from '../Icons/user.svg';
import Bell from '../Icons/bell.svg';
import Plus from '../Icons/plus.svg';
import PlusWhite from '../Icons/plusWhite.svg';
import Search from '../Icons/search.svg';
import BookMark from '../Icons/bookmark.svg'

const DURATION = 0;
let _number = 20802;
let _name = '어둠의다크';
let _rank = 'Zl존';
let _post = '7';
let _commnet = '14';
let _feed = 1;

export default class ProfileGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // profile: new Animated.Value(200),
            // info: new Animated.Value(40),
            // more: new Animated.Value(40),
            clicked: 1
        };

        // // Toggle the state every second
        // setInterval(() => (
        //     this.setState(
        //         { pointedBox: (this.state.pointedBox + 1) % 2 }
        //     )
        // ), 1000);
    }

    componentDidMount() {
    }

    _openProfile() {
        this.setState({ clicked: 1 });
        // Animated.timing(
        //     this.state.info, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.more, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.profile, {
        //         toValue: 200,
        //         duration: DURATION,
        //         delay: DURATION + 50,
        //     }
        // ).start();
    }
    _openInfo() {
        this.setState({ clicked: 2 });
        // Animated.timing(
        //     this.state.profile, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.more, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.info, {
        //         toValue: 200,
        //         duration: DURATION,
        //         delay: DURATION + 50,
        //     }
        // ).start();
    }
    _openMore() {
        this.setState({ clicked: 3 });
        // Animated.timing(
        //     this.state.profile, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.info, {
        //         toValue: 40,
        //         duration: DURATION,
        //     }
        // ).start();
        // Animated.timing(
        //     this.state.more, {
        //         toValue: 200,
        //         duration: DURATION,
        //         delay: DURATION + 50
        //     }
        // ).start();
    }

    render() {
        return (
            <View style={styles.Container}>
                <Animated.View style={{ width: this.state.clicked == 1 ? 200 : 40, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openProfile()}>
                        <LinearGradient style={styles.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <User color="red" />
                            </View>
                            {this.state.clicked == 1 ? <TouchableOpacity style={styles.Content}>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>학번</Text><Text style={styles.ContentValue1}>{_number}</Text></View>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>닉네임</Text><Text style={styles.ContentValue1}>{_name}</Text></View>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>등급</Text><Text style={styles.ContentValue1}>{_rank}</Text></View>
                            </TouchableOpacity> : null}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.clicked == 2 ? 200 : 40, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openInfo()}>
                        <LinearGradient style={styles.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <Bell />
                            </View>
                            {this.state.clicked == 2 ?
                                <View style={styles.Content}>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>게시물</Text><Text style={styles.ContentValue2}>{_post}</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>댓글</Text><Text style={styles.ContentValue2}>{_commnet}</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>새알림</Text><Text style={styles.ContentValue2}>{_feed}</Text></TouchableOpacity>
                                </View> :
                                <Text style={{ color: 'white', fontFamily: 'nanumbarungothic', fontSize: 16, textAlign: 'center', marginTop: 46 }}>{_feed > 0 ? _feed : null}</Text>}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.clicked == 3 ? 200 : 40, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openMore()}>
                        <LinearGradient style={styles.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <Plus />
                            </View>
                            {this.state.clicked == 3 ?
                                <View style={styles.Content}>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>북마크</Text><BookMark style={styles.contentValue3} /></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>검색</Text><Search style={styles.contentValue3} /></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>글쓰기</Text><PlusWhite style={styles.contentValue3} /></TouchableOpacity>
                                </View> : null}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
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
