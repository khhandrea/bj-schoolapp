import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Colors from '../Asset';

export default class ProfileScreen extends Component {
    static navigationOptions = { title: '내 정보' };
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
