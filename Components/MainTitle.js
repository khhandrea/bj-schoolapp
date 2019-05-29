import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Setting from '../Icons/setting.svg';


export default class MainTitle extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <Text style={styles.SchoolName}>BOJEONG</Text>
                <Text style={styles.SchoolApp}>SCHOOLAPP</Text>
                <TouchableOpacity style={styles.OptionIcon}><Setting /></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {

    },
    SchoolName: {
        position: 'absolute',
        top: 30,
        left: 16,
        fontSize: 30,
        color: 'white',
        fontFamily: 'segoe-ui'

    },
    SchoolApp: {
        position: 'absolute',
        top: Platform.OS == "ios" ? 48 : 50,
        fontSize: 14,
        left: 156,
        color: '#ffffff80',
        fontFamily: 'segoe-ui'

    },
    OptionIcon: {
        position: 'absolute',
        right: 16,
        top: 45,
    }
})
