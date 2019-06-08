import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import Setting from '../Icons/setting.svg';


export default class MainTitle extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.TextContainer}>
                    <Text style={styles.SchoolName}>BOJEONG</Text>
                    <Text style={styles.SchoolApp}>SCHOOLAPP</Text>
                </View>
                <TouchableOpacity style={styles.OptionIcon}><Setting /></TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    Container: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
    },
    TextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 44
    },
    SchoolName: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'segoe-ui'

    },
    SchoolApp: {
        marginLeft: 6,
        marginBottom: Platform.OS == "android" ? 6 : 4,
        fontSize: 14,
        color: '#ffffff80',
        fontFamily: 'segoe-ui'
    },
    OptionIcon: {
    }
})
