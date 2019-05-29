import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Button, AppRegistry, Dimensions, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import MainTitle from './Components/MainTitle';
import BannerScroll from './Components/BannerScroll';
import ProfileGroups from './Components/ProfileGroups';
import ArrowLeft from './Icons/arrowLeft.svg';
import ArrowRight from './Icons/arrowRight.svg';
import ArrowDown from './Icons/arrowDown.svg';

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (

            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor='#00000080' translucent={true} />
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.TopContainer} start={[0, 0]} end={[1, 1]} >
                    <MainTitle />
                    <BannerScroll />
                </LinearGradient>
                <View style={styles.BottomContainer} />
                <View style={{ width: '100%', position: 'absolute', top: 510, flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
                            <ArrowLeft />
                            <Text style={{ marginLeft: 6, fontSize: 14 }}>시험</Text>
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 14, textAlign: 'center' }}>질문/정보</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contest')} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                            <Text style={{ marginRight: 6, fontSize: 14, textAlign: 'right' }}>수행/대회</Text>
                            <ArrowRight />
                        </TouchableOpacity>
                    </View>
                    <ArrowDown style={{ flex: 1, marginTop: 6 }} />
                </View>
                <ProfileGroups />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    TopContainer: {
        left: 0,
        right: 0,
        top: 0,
        height: 500
    },
    BottomContainer: {
        position: 'absolute',
        top: 480,
        left: 0,
        right: 0,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white'
    },
});

