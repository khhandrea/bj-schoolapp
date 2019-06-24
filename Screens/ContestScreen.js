import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo';
import ArrowBack from '../Icons/arrowBack.svg';

const SCREENWIDTH = Dimensions.get('window').width;

export default class ContestScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            sellectNum: 1, //1==수행 2== 대회
        }
    }

    render() {

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#707070'} translucent={true} />
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.Header} start={[1, 0]} end={[0, 1]} >
                    <View style={styles.HeaderContainer}>
                        <Text style={{ fontSize: 30, fontFamily: 'nanumbarungothic', color: 'white' }}>수행/대회</Text>
                        <TouchableOpacity style={{
                        }} onPress={() => this.props.close()}>
                            <ArrowBack />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.WhiteBox}>
                        <Text style={{ fontSize: 20 }}>수행몰아보기</Text>
                        <ScrollView style={{ marginTop: 5 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                            <Text>안녕</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.Sellection}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ sellectNum: 1 })} activeOpacity={1}>
                            <Text style={{ textAlign: 'center', color: this.state.sellectNum == 1 ? 'white' : '#ffffff80', fontSize: 14 }}>수행</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 10, backgroundColor: 'white' }} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ sellectNum: 2 })} activeOpacity={1}>
                            <Text style={{ textAlign: 'center', color: this.state.sellectNum == 2 ? 'white' : '#ffffff80', fontSize: 14 }}>대회</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        height: 520,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    HeaderContainer: {
        paddingLeft: 20,
        paddingRight: 15,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    WhiteBox: {
        width: SCREENWIDTH - 40,
        height: 225,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 50,
        borderRadius: 20,
        alignSelf: 'center',
        paddingTop: 20,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 20
    },
    Sellection: {
        flexDirection: 'row',
        width: SCREENWIDTH,
        position: 'absolute',
        top: 495,
        alignItems: 'center',

    }

})
