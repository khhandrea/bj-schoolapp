import React, { Component } from 'react'
import { Text, StyleSheet, View, Keyboard, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, ActionSheetIOS, Platform } from 'react-native'
import { Colors } from '../Asset';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions, LinearGradient } from 'expo';
import ModalPicker from 'react-native-modal-picker-v2'





const WIDTH = Dimensions.get('window').width;
const Comments = [
    {
        isParent: true,
        rank: 1,
        name: '김종현',
        content: '안녕하살법',
        time: '5분전',
        like: 10,
        iLiked: false,
    },
    {
        isParent: false,
        rank: 3,
        name: '홍사훈',
        content: '안녕하살법 받아치기',
        time: '4분전',
        like: 2,
        iLiked: true,
        to: '',
    },
    {
        isParent: false,
        rank: 5,
        name: '김환희',
        content: '네다씹',
        time: '2분전',
        like: 20,
        iLiked: true,
        to: '홍사훈',
    },
    {
        isParent: false,
        rank: 5,
        name: '게시자',
        content: '자제좀;;',
        time: '1분전',
        like: 55,
        iLiked: true,
        to: '김종현',
    },
    {
        isParent: true,
        rank: 5,
        name: '김세준',
        content: 'ㅂㅇㄹ',
        time: '5분전',
        like: 0,
        iLiked: false,
    }

]
const Sellection = [
    { key: 0, label: '엘범에서 가져오기' },
    { key: 1, label: '카메라로 촬영하기' },
];

export default class CommentScreen extends Component {
    static navigationOptions = { title: '댓글' };

    constructor(props) {
        super(props);
        this.state = {
            btnLocation: 0,
            image: null,
            ratio: null,
            comments: Comments,
            clickedComment: null,
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _keyboardDidShow(e) {
        this.setState({ btnLocation: e.endCoordinates.height });
    }

    _keyboardDidHide() {
        this.setState({ btnLocation: 0 });
    }
    _imageHandle = () => {
        if (this.state.image != null) {
            this.props.navigation.navigate('Photo', { image: this.state.image });
        }
    }
    _imageDeleteHandle = () => {
        this.setState({ image: null });
    }
    _imageAddHandle = () => {
        if (Platform.OS == 'ios') {
            this._iosSelector();
        }
    }
    _iosSelector = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['취소', '앨범에서 가져오기', '카메라로 촬영하기'],
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    this._openGellary();
                } else if (buttonIndex === 2) {
                    this._openCamera();
                }
            },
        );
    }
    _openCamera = () => {
        this.props.navigation.navigate('Camera', { changePhoto: this._changePhoto });

    }
    _openGellary = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                //its granted.
            }
        }
        else {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri, ratio: result.width / result.height });
            }
        }
    }
    _changePhoto = (_uri, _ratio) => {
        this.setState({ image: _uri, ratio: _ratio })
    }


    _commentAddHandle = () => {

    }
    _commentHandle(id) {
        if (this.state.clickedComment == id) {
            this.setState({ clickedComment: null });
        } else {
            this.setState({ clickedComment: id });
            // this.myInput.focus();
        }
    }
    _longPressHandle = () => {

    }
    _heartHandle(index) {
        const c = this.state.comments;
        c[index].iLiked ? c[index].like-- : c[index].like++;
        c[index].iLiked = !c[index].iLiked;

        this.setState({
            comments: c,
        })
        //서버업데이트
    }

    render() {



        const myComment = this.state.comments.map((data, index) =>
            <TouchableWithoutFeedback key={index} onLongPress={this._parentLongHandle} onPress={() => this._commentHandle(index)}>
                <View style={{ backgroundColor: this.state.clickedComment == index ? '#eee' : '#fff', flexDirection: 'row', paddingLeft: data.isParent ? 0 : 50, paddingVertical: 5 }}>
                    <View style={{ width: 50, height: 50 }}></View>

                    <View style={{ width: data.isParent ? WIDTH - 100 : WIDTH - 150 }}>
                        <Text style={{ fontWeight: 'bold', lineHeight: 20, marginTop: 4 }}>{data.name}{'  '}
                            <Text style={{ fontWeight: 'normal', color: Colors.highlightBlue }}>{data.to && data.to.length > 0 ? '@' + data.to + '  ' : null}
                                <Text style={{ fontWeight: 'normal', color: '#000' }}>{data.content}</Text>
                            </Text>
                        </Text>
                        <View>
                            <Text style={{ fontSize: 12, lineHeight: 20, marginBottom: 5, color: Colors.lightGray }}>{data.time}{'    '}
                                <Text>
                                    {data.like > 0 ? `좋아요${data.like}개    ` : null}
                                    <Text>
                                        답글달기
                                    </Text>
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={() => this._heartHandle(index)} >
                        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            {data.iLiked ? <Ionicons color={Colors.red} size={14} name='md-heart' style={{ margin: 0 }} /> : <Ionicons name='md-heart-empty' size={14} style={{ margin: 0 }} />}
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        )


        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {myComment}
                </ScrollView>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: this.state.btnLocation }}>

                    {this.state.image ?
                        <View style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', borderTopColor: '#dbdbdb', borderTopWidth: 1, backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={this._imageHandle} style={{ height: 36, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: 36 * this.state.ratio, overflow: 'hidden', borderRadius: 5 }}><Image source={{ uri: this.state.image }} style={{ height: '100%', width: 36 * this.state.ratio }} /></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._imageDeleteHandle} style={{ position: 'absolute', right: 0, width: 50, hegith: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <AntDesign name='close' color={Colors.gray} size={20} />
                            </TouchableOpacity>
                        </View>
                        : null}
                    <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={styles.FooterContainer} start={[0, 0]} end={[1, 1]} >
                        {Platform.OS === 'ios' ?
                            (<TouchableOpacity onPress={this._imageAddHandle} style={{ width: 50, height: 36, marginleft: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name='attachment' color='white' size={22} style={{ margin: 0 }} />
                            </TouchableOpacity>) :
                            <ModalPicker style={{ width: 50, height: 36, marginleft: 8, alignItems: 'center', justifyContent: 'center' }}
                                data={Sellection}
                                onChange={(option) => {
                                    if(option.key === 0) {
                                        this._openGellary();
                                    } else if(option.key === 1) {
                                        this._openCamera();
                                    }
                                    
                                }}
                                cancelText='취소'
                            >
                                <Entypo name='attachment' color='white' size={22} style={{ margin: 0 }} />
                            </ModalPicker>
                        }
                        <View style={styles.TextInputContainer}>
                            <TextInput ref={myInput => this.myInput = myInput} placeholder={this.state.clickedComment != null ? `${this.state.comments[this.state.clickedComment].name}에게 댓글 달기...` : '댓글 달기...'} style={styles.TextInput} />
                            <TouchableOpacity onPress={this._commentAddHandle} style={{ width: 30, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: Colors.highlightBlue, textAlign: 'right' }}>게시</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {

    },
    FooterContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7
    },
    TextInputContainer: {
        height: 36,

        width: WIDTH - 66,
        borderRadius: 18,
        backgroundColor: 'white',
        paddingHorizontal: 18,
        alignItems: 'center',
        flexDirection: 'row',
    },
    TextInput: {
        width: WIDTH - 136,

    }

})
