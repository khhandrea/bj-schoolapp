import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Dimensions } from 'react-native';
import MainScreen from './MainScreen';
import ExamScreen from './ExamScreen';
import ContestScreen from './ContestScreen';


export default class ScreenGroup extends Component {


    render() {
        let screenWidth = Dimensions.get('window').width;
        return (
            // <ScrollView
            //     horizontal={true}
            //     pagingEnabled={true}
            //     showsHorizontalScrollIndicator={false}
            //     scrollEnabled={false}
            //     style={{ flex: 1 }}
            // >
            <View>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
                <ExamScreen screenWidth={screenWidth} />
                <MainScreen screenWidth={screenWidth} />
                <ContestScreen screenWidth={screenWidth} />
            </View>

            // </ScrollView>
        )
    }
}

const styles = StyleSheet.create({})
