import React, { Component } from 'react';
import { StyleSheet, View, Modal, Dimensions, Text, Image, ScrollView, StatusBar } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';



const WIDTH = Dimensions.get("screen").width;

export default class PhotoScreen extends Component {
    static navigationOptions = {
        title: '사진',
        headerStyle: {
            backgroundColor: '#333',
            height: 50,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white'
        },
    };

    render() {
        const image = this.props.navigation.state.params.image;
        return (
            <View style={styles.Container}>
                <StatusBar barStyle="light-content" backgroundColor='#00000080' translucent={true} />
                <View style={{ flex: 1, overflow: 'hidden', backgroundColor: 'black' }}>
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