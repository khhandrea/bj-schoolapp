import React, { Component } from 'react'
import { Text, StyleSheet, View, Keyboard, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Platform, ActivityIndicator } from 'react-native'
import { Colors } from '../Components/Asset';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions, LinearGradient } from 'expo';
import MyActionSheet from '../Components/MyActionSheet';




const MaxRatio = 2;
const WIDTH = Dimensions.get('window').width;
const Comments = [
    {
        isParent: true,
        rank: 1,
        name: '김종현',
        content: '안녕하살법',
        image: null,
        time: '5분전',
        like: 10,
        iLiked: false,
    },
    {
        isParent: false,
        rank: 3,
        name: '홍사훈',
        content: '안녕하살법 받아치기',
        image: { source: 'https://img.insight.co.kr/static/2019/05/14/700/255ocxbanba3n956n6w7.jpg', ratio: 7 / 4 },
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
        image: null,
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
        image: null,
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
        image: { source: 'https://t1.daumcdn.net/cfile/tistory/99F2DC355C54E50E27', ratio: 1 },
        time: '5분전',
        like: 0,
        iLiked: false,
    }

]

export default class CommentScreen extends Component {
    static navigationOptions = { title: '댓글' };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            btnLocation: 0,
            image: null,
            ratio: null,
            comments: Comments,
            clickedComment: null,
            visible: false
        }
        setTimeout(() => {
            this.setState({ loading: true });
        }, 700)

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
        this.setState({ visible: true });
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
    _actionSheetHandle(index) {
        if (index == 0) {
            this.setState({ isCameraMode: false });
            this._openGellary();
        } else if (index == 1) {
            this.setState({ isCameraMode: true });
            this._openCamera();
        }
    }

    _commentAddHandle = () => {

    }
    _commentHandle(id) { //클릭
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

                        {data.image ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                this.props.navigation.navigate('Photo', { image: data.image.source });
                            }} style={{ width: data.isParent ? WIDTH - 100 : WIDTH - 150, height: data.isParent ? (WIDTH - 100) / (data.image.ratio > MaxRatio ? MaxRatio : data.image.ratio < 1 / MaxRatio ? 1 / MaxRatio : data.image.ratio) : (WIDTH - 150) / (data.image.ratio > MaxRatio ? MaxRatio : data.image.ratio < 1 / MaxRatio ? 1 / MaxRatio : data.image.ratio), borderRadius: 20, overflow: 'hidden', marginVertical: 5 }}>
                                <Image style={{ width: data.isParent ? WIDTH - 100 : WIDTH - 150, height: data.isParent ? (WIDTH - 100) / (data.image.ratio > MaxRatio ? MaxRatio : data.image.ratio < 1 / MaxRatio ? 1 / MaxRatio : data.image.ratio) : (WIDTH - 150) / (data.image.ratio > MaxRatio ? MaxRatio : data.image.ratio < 1 / MaxRatio ? 1 / MaxRatio : data.image.ratio) }} source={{ uri: data.image.source }} />
                            </TouchableOpacity>
                            : null}

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
                {!this.state.loading ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='#dddddd' /></View>
                    :
                    <ScrollView style={{ flex: 1 }}>
                        {myComment}
                        <View style={{ height: this.state.image ? 100 + this.state.btnLocation : 50 + this.state.btnLocation }} />
                    </ScrollView>}

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: this.state.btnLocation }}>

                    {this.state.image ?
                        <View style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', borderTopColor: '#dbdbdb', borderTopWidth: 1, backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={this._imageHandle} style={{ height: 36, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: 36 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio), overflow: 'hidden', borderRadius: 5 }}><Image source={{ uri: this.state.image }} style={{ height: '100%', width: 36 * (this.state.ratio > MaxRatio ? MaxRatio : this.state.ratio < 1 / MaxRatio ? 1 / MaxRatio : this.state.ratio) }} /></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._imageDeleteHandle} style={{ position: 'absolute', right: 0, width: 50, hegith: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <AntDesign name='close' color={Colors.gray} size={20} />
                            </TouchableOpacity>
                        </View>
                        : null}
                    <LinearGradient colors={[Colors.lightRed, Colors.lightBlue]} style={styles.FooterContainer} start={[0, 0]} end={[1, 1]} >

                        <TouchableOpacity onPress={this._imageAddHandle} style={{ width: 50, height: 36, marginleft: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <Entypo name='attachment' color='white' size={22} style={{ margin: 0 }} />
                        </TouchableOpacity>
                        <View style={styles.TextInputContainer}>
                            <TextInput maxLength={240} multiline={true} ref={myInput => this.myInput = myInput} placeholder={this.state.clickedComment != null ? `${this.state.comments[this.state.clickedComment].name}에게 댓글 달기...` : '댓글 달기...'} style={styles.TextInput} />
                            <TouchableOpacity onPress={this._commentAddHandle} style={{ width: 30, height: 20, alignItems: 'center', flexDirection: 'row', padding: 0 }}>
                                <Text style={{ color: Colors.highlightBlue, textAlign: 'right', lineHeight: 20 }}>게시</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>


                <MyActionSheet
                    visible={this.state.visible}
                    contents={['앨범에서 가져오기', '카메라로 촬영하기']}
                    onClicked={(data) => this._actionSheetHandle(data)}
                    closeHandle={() => this.setState({ visible: false })} />
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
        paddingVertical: 5,
        width: WIDTH - 66,
        borderRadius: 18,
        backgroundColor: 'white',
        paddingHorizontal: 18,
        alignItems: 'center',
        flexDirection: 'row',
    },
    TextInput: {
        width: WIDTH - 136,
        lineHeight: 20,
        margin: 0,
        padding: 0,
    }

})
