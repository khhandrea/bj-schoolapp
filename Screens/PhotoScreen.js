import React, { Component } from 'react';
import { StyleSheet, View, Modal, Dimensions, Text, Image, ScrollView, StatusBar, Platform } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Colors } from '../Asset'



const WIDTH = Dimensions.get("screen").width;

export default class PhotoScreen extends Component {
    static navigationOptions = {
        title: '사진',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#333' : '#fff',
            height: 50,
            borderBottomWidth: 0,
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.fontBlack : 'white',
        headerTitleStyle: {
            color: Platform.OS === 'ios' ? Colors.fontBlack : 'white'
        },
    };

    render() {
        const image = this.props.navigation.state.params.image;
        return (
            <View style={styles.Container}>
                <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} backgroundColor='#00000080' translucent={true} />
                <View style={{ flex: 1, overflow: 'hidden', backgroundColor: Platform.OS === 'android' ? 'black' : '#eeeeee' }}>
                    <ReactNativeZoomableView
                        maxZoom={3}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        onZoomBefore={this._OnZoomBefore}
                        onZoomEnd={this._OnZoomEnd}
                        style={{
                        }}
                    >
                        <Image resizeMode="contain" source={{ uri: image }} style={{ flex: 1, width: '100%', height: '100%' }} />

                    </ReactNativeZoomableView>
                </View>
                <View></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
});