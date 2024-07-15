import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, StatusBar, Platform, TouchableWithoutFeedback } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Colors } from '../Components/Asset'
import { Ionicons, Feather } from '@expo/vector-icons';
import { FileSystem } from 'expo-file-system';



/* 그냥 string을 보네도 되고
 * string[]형으로 보네도 분석해서 list로 만들어줌
 */

const WIDTH = Dimensions.get("screen").width;

export default class PhotoScreen extends Component {
    static navigationOptions = {
        title: '사진',
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.navigation.state.params.index,
        }
    }

    _downloadHandle = () => {
        const u = this.state.index === undefined ? this.props.navigation.state.params.image : this.props.navigation.state.params.image[this.state.index];
        console.log(u);
    }

    render() {
        const image = this.props.navigation.state.params.image;
        return (
            <View style={styles.Container}>
                <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} backgroundColor='#00000080' translucent={true} />
                <View style={{ flex: 1, overflow: 'hidden', backgroundColor: '#111' }}>
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
                        <Image resizeMode="contain" source={{ uri: this.state.index !== undefined ? image[this.state.index] : image }} style={{ flex: 1, width: '100%', height: '100%' }} />

                    </ReactNativeZoomableView>
                </View>
                {this.state.index !== undefined ?
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({ index: this.state.index > 0 ? this.state.index - 1 : this.state.index })
                        }}>
                            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name='ios-arrow-back' size={24} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this._downloadHandle}>
                            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Feather name='download' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({ index: this.state.index < image.length - 1 ? this.state.index + 1 : this.state.index })
                        }}>
                            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name='ios-arrow-forward' size={24} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View> :
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <TouchableWithoutFeedback onPress={this._downloadHandle}>
                            <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Feather name='download' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>}
                {this.state.index !== undefined &&
                    <View style={{ height: 50, position: 'absolute', left: 0, right: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>{`${this.state.index + 1}/${image.length}`}</Text>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
});