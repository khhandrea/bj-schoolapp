import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Button, ScrollView, TouchableOpacity, } from 'react-native'
import { LinearGradient } from 'expo';
import ArrowBack from '../Icons/arrowBack2.svg';


let _dday = 24; //constructure 에서 선언

export default class ExamScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.Header} start={[1, 0]} end={[0, 1]} >
                    <Text style={{ fontSize: 30, fontFamily: 'nanumbarungothic', color: 'white', position: 'absolute', left: 26, top: 44 }}>시험정보</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'nanumbarungothic', color: '#ffffff80', position: 'absolute', left: 140, top: 60 }}>D-{_dday}</Text>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 16,
                        top: 46,
                    }} onPress={() => this.props.close()}>
                        <ArrowBack />
                    </TouchableOpacity>

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

    }
})
