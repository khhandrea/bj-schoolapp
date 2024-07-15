import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import MainScreen from './MainScreen';
import ExamScreen from './ExamScreen';
import ContestScreen from './ContestScreen';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';



export default class TabViewScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        index: 1,
        routes: [
            { key: 'first', title: 'Exam' },
            { key: 'second', title: 'Main' },
            { key: 'third', title: 'Contest' }
        ],
    };
    renderTabBar = () => null;
    renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <ExamScreen jumpTo={jumpTo} navigation={this.props.navigation} />;
            case 'second':
                return <MainScreen jumpTo={jumpTo} navigation={this.props.navigation} />;
            case 'third':
                return <ContestScreen jumpTo={jumpTo} navigation={this.props.navigation} />
            default:
                return null;
        }
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderTabBar={this.renderTabBar}
                renderScene={this.renderScene}
                onIndexChange={index => this.setState({ index: index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        )
    }
}

const styles = StyleSheet.create({})
