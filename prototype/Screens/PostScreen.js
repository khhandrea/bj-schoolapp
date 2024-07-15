import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, ScrollView, TextInput, TouchableWithoutFeedback, Dimensions, Platform, Image, ActionSheetIOS, Linking, ToastAndroid } from 'react-native'
import { ImagePicker, Permissions, LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../Components/Asset'
import { BorderlessButton, RectButton, BaseButton } from 'react-native-gesture-handler';
import MyActionSheet from '../Components/MyActionSheet';
import { IntentLauncherAndroid as IntentLauncher } from 'expo';

const WIDTH = Dimensions.get('window').width;
const MaxRatio = 1.5;

const name = '김종현';
const tagList = [
    ['1학년', '2학년', '3학년'],
    ['질문', '공지'],
    ['이과', '문과', '예체능'],
    ['수학', '영어', '국어', '물리', '화학', '생물', '지구', '일본어', '중국어', '사회', '세계사', '한국사', '세계지리']
]


export default class PostScreen extends Component {
    static navigationOptions = {
        title: '새 게시물',
        headerRight: (
            <BaseButton onPress={this._postHandle} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} >
                <Text style={{ color: Colors.highlightBlue, fontSize: 18 }}>게시</Text>
            </BaseButton>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAnonymous: false,
            images: [],
            ratio: 1,
            content: '',
            isPosting: false,
            tag: tagList,
            contentVisible: false,
            btnLocation: 0,
            isCameraMode: null,
            clickedTag: new Array(tagList.length),
            visible: false,
        }
        setTimeout(() => {
            this.setState({ loading: true });
        }, 700)
    }


    _postHandle = () => {
        this.setState({ isPosting: true });
        //올리기
    }
    _changeContent = (text) => {
        this.setState({ content: text })
    }
    _imageAddHandle = () => {
        if (this.state.images.length <= 0) {
            this.setState({ visible: true })
        } else {
            if (this.state.isCameraMode === true) {
                this._openCamera();
            } else if (this.state.isCameraMode === false) {
                this._openGellary();
            }
        }

    }
    _openCamera = () => {
        this.props.navigation.navigate('Camera', { changePhoto: this._changePhoto });

    }
    _changePhoto = (_uri, _ratio) => {
        const c = this.state.images;
        c.push(_uri);
        this.setState({ images: c, ratio: 1 });
    }
    _openGellary = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'denied') {
                if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:')
                } else {
                    ToastAndroid.show('스크랩 > 권한 > 저장공간 활성화', ToastAndroid.LONG);
                    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
                }
            }
        }
        else {
            let result;
            if (this.state.images.length <= 0) {
                result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                });
            }

            if (!result.cancelled) {
                const i = this.state.images.filter(() => true);
                i.push(result.uri);
                if (this.state.images.length === 0) {
                    this.setState({ images: i, ratio: result.width / result.height });
                } else {
                    this.setState({ images: i });
                }
            }
        }
    }
    _actionSheetHandle(index) {
        if (index == 0) {
            this.setState({ isCameraMode: false });
            this._openGellary();
        } else if (index == 1) {
            this.setState({ isCameraMode: true });
            this._openCamera();
        }
    }
    render() {
        return (
            !this.state.loading
                ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='#dddddd' /></View>
                :
                <View style={{ flex: 1 }}>

                    <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={{ flex: 1 }}>
                        <View style={{ borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginLeft: 12 }}>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}><Text style={{ fontSize: 14, marginLeft: 10 }}>사진</Text></View>
                            </View>
                            <ScrollView horizontal={true} overScrollMode='never' showsHorizontalScrollIndicator={false} style={{ height: 150, paddingBottom: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 34 }}>
                                    {this.state.images.map((data, index) =>
                                        <View key={index} style={{ height: 130, width: 130 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio), borderRadius: 10, overflow: 'hidden', marginRight: 10 }}>
                                            <TouchableWithoutFeedback onPress={() => {
                                                let i = this.state.images.filter(() => true);
                                                i.splice(index, 1);
                                                if (i.length === 0) {
                                                    this.setState({ ratio: 1 })
                                                }
                                                this.setState({ images: i });
                                            }}>
                                                <View style={{ height: 130, width: 130 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio) }}>
                                                    <Image accessible source={{ uri: data }} style={{ height: 130, width: 130 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio) }} />
                                                    <Ionicons name='ios-close' color='white' size={30} style={{ position: 'absolute', right: 16, top: 6 }} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    )}
                                    {this.state.images.length < 9 &&
                                        <View style={{ height: 130, width: 130 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio), borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#dbdbdb', overflow: 'hidden' }}>
                                            <RectButton onPress={this._imageAddHandle}>
                                                <View accessible style={{ height: 130, width: 130 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name='ios-add' style={{ margin: 0 }} size={30} color='#888' />
                                                </View>
                                            </RectButton>
                                        </View>}
                                </View>
                            </ScrollView>

                        </View>

                        <View style={{ borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                            <View style={{ height: 40, justifyContent: 'center', marginLeft: 12 }}>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>태그</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                {this.state.tag.map((data, index) =>
                                    <View key={index}>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='never'>
                                            <View style={{ paddingHorizontal: 34, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableWithoutFeedback onPress={() => {
                                                    const c = this.state.clickedTag;
                                                    c[index] = undefined;
                                                    this.setState({ clickedTag: c })
                                                }
                                                }>
                                                    <View style={{ height: 26, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: this.state.clickedTag[index] == undefined ? '#888' : '#dbdbdb', backgroundColor: this.state.clickedTag[index] == undefined ? '#888' : 'white' }}>
                                                        <Ionicons name='ios-close' size={16} color={this.state.clickedTag[index] == undefined ? 'white' : 'black'} />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {data.map((info, index2) =>
                                                    <TouchableWithoutFeedback key={index2} onPress={() => {
                                                        const c = this.state.clickedTag;
                                                        c[index] = index2;
                                                        this.setState({ clickedTag: c })
                                                    }}>
                                                        <View style={{ height: 26, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: this.state.clickedTag[index] == index2 ? '#888' : '#dbdbdb', marginLeft: 10, backgroundColor: this.state.clickedTag[index] == index2 ? '#888' : 'white' }}>
                                                            <Text style={{ fontSize: 12, color: this.state.clickedTag[index] == index2 ? 'white' : 'black' }}>{info}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )}
                                            </View>
                                        </ScrollView>
                                    </View>
                                )}
                            </View>
                        </View>

                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Post_Content', { content: this.state.content, changeHandle: this._changeContent })}>
                            <View style={{ paddingHorizontal: 22, width: WIDTH, minHeight: 300, }}>
                                <Text style={{ fontSize: 14, color: this.state.content == '' ? '#aaa' : 'black', marginVertical: 12 }}>
                                    {this.state.content == '' ? '내용 입력...' : this.state.content}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView >

                    <MyActionSheet
                        visible={this.state.visible}
                        contents={['앨범에서 가져오기', '카메라로 촬영하기']}
                        onClicked={(data) => this._actionSheetHandle(data)}
                        closeHandle={() => this.setState({ visible: false })} />
                </View>

        )
    }
}

export class ContentScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '내용 입력',
        // headerLeft: null,
        headerRight: (
            <BaseButton onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} >
                <Text style={{ color: Colors.highlightBlue, fontSize: 18 }}>완료</Text>
            </BaseButton>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.navigation.state.params.content,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.input.focus();
            setTimeout(() => {
                this.input.focus();
            }, 1)
        }, 1)
    }
    onChange(text) {
        this.setState({ text: text });
        this.props.navigation.state.params.changeHandle(text);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, paddingHorizontal: 22 }}>
                    <View style={{ minHeight: 3000 }}>
                        <TextInput
                            onChangeText={(text) => this.onChange(text)}
                            value={this.state.text}
                            style={{ fontSize: 14, marginTop: 10, lineHeight: 20, textAlignVertical: 'top' }}
                            ref={ref => this.input = ref}
                            multiline={true}
                            numberOfLines={50}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
