import React, { Component } from 'react'
import { Alert, Text, StyleSheet, View, Button, Animated, TouchableWithoutFeedback, Platform, TouchableOpacity, Easing } from 'react-native'
import { LinearGradient } from 'expo';
import { Colors } from '../Asset';
import User from '../Icons/user.svg';
import Bell from '../Icons/bell.svg';
import Plus from '../Icons/plus.svg';
import PlusWhite from '../Icons/plusWhite.svg';
import Search from '../Icons/search.svg';
import BookMark from '../Icons/bookmark.svg'

const DURATION = 200;
let _rank = 'Zl존';
let _post = '7';
let _commnet = '14';
let _feed = 1;

export default class ProfileGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: new Animated.Value(200),
            info: new Animated.Value(40),
            more: new Animated.Value(40),
            clicked: 1,
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
            <View style={styles.Container}>
                <Animated.View style={{ width: this.state.profile, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openProfile()}>
                        <LinearGradient style={styles.BoxContainer} colors={[Colors.lightRed, Colors.lightBlue]} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <User color="red" />
                            </View>
                            {this.state.clicked == 1 && !this.state.delaying ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { changeProfile: this._changeProfileData })} style={styles.Content}>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>학번</Text><Text style={styles.ContentValue1}>{this.state.number}</Text></View>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>닉네임</Text><Text style={styles.ContentValue1}>{this.state.name}</Text></View>
                                <View style={styles.ContentView}><Text style={styles.ContentTitle}>등급</Text><Text style={styles.ContentValue1}>{_rank}</Text></View>
                            </TouchableOpacity> : null}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.info, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openInfo()}>
                        <LinearGradient style={styles.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Bell />
                                    {this.state.feed > 0 ? <View style={{
                                        width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: 'white', backgroundColor: Colors.red, position: 'absolute', bottom: 10,
                                        right: 9
                                    }} /> : null}
                                </View>
                            </View>
                            {this.state.clicked == 2 && !this.state.delaying ?
                                <View style={styles.Content}>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>게시물</Text><Text style={styles.ContentValue2}>{_post}</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView}><Text style={styles.ContentTitle}>댓글</Text><Text style={styles.ContentValue2}>{_commnet}</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.ContentView} onPress={this._feedHandle}><Text style={styles.ContentTitle}>새알림</Text><Text style={styles.ContentValue2}>{this.state.feed}</Text></TouchableOpacity>
                                </View> :
                                <Text style={{ color: 'white', fontFamily: 'nanumbarungothic', fontSize: 16, textAlign: 'center', marginTop: 46 }}>{this.state.feed > 0 && !this.state.delaying ? this.state.feed : null}</Text>}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ width: this.state.more, height: 120, shadowColor: "#000", ...styles.IosShadow }}>
                    <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => this._openMore()}>
                        <LinearGradient style={styles.BoxContainer} colors={['#FCBEC0', '#C2C7FB']} start={[0, 0]} end={[1, 1]}>
                            <View style={styles.BoxTitle}>
                                <Plus />
                            </View>
                            {this.state.clicked == 3 && !this.state.delaying ?
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
