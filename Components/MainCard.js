import React, { Component } from 'react'
import { Alert, Text, StyleSheet, View, Dimensions, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import { Colors } from './Asset';
import { LinearGradient } from 'expo';
import { BaseButton } from 'react-native-gesture-handler';
import BookmarkFill from '../Icons/bookmarkFill.svg';
import BookmarkEmpty from '../Icons/bookmarkEmpty.svg';
import HeartFill from '../Icons/heartFill.svg';
import HeartEmpty from '../Icons/heartEmpty.svg';
import Dots from '../Icons/threeDots.svg';

const WIDTH = Dimensions.get('window').width;
const MaxRatio = 2;

export default class MainCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myPage: 1,
            isOverflow: false,
            readMoreClicked: false,
            isLiked: this.props.isLiked,
            isBookmarked: this.props.isBookmarked,
            like: this.props.like
        }
    }
    _imageClicked(source) {
        this.props.navigation.navigate('Photo', { image: this.props.image, index: (this.state.myPage - 1) });
    }
    _scrollHandle = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / (WIDTH - 40)) + 1;
        this.setState({
            myPage: page
        })
    }
    _involkedLayout = (event) => {
        if (event.nativeEvent.layout.height > 40) {
            this.setState({
                isOverflow: true,
            });
        }
    }
    _readmoreHandle = () => {
        this.setState({
            readMoreClicked: true,
        })
    }
    _likeHandle = () => {
        this.setState({
            like: !this.state.isLiked ? this.state.like + 1 : this.state.like - 1,
            isLiked: !this.state.isLiked,
        })
    }
    _bookmarkHandle = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked
        })
    }
    _commentHandle = () => {
        this.props.navigation.navigate('Comment');
    }
    render() {
        const { name, date, commentNum, content, image, tag, ratio } = this.props;

        const tagList = tag ? tag.map(
            (text, index) => (
                <View key={index} style={styles.TagList}>
                    <View style={{
                        width: 4, height: 4, borderRadius: 2, marginRight: 4,
                        backgroundColor: (index % 2 == 0 ? Colors.blue : Colors.red)
                    }} />
                    <Text style={{ fontSize: 14 }}>{text}</Text>
                </View>
            )
        ) : null;

        const imageList = image ? image.map(
            (source, index) => (
                <TouchableOpacity activeOpacity={1} key={index} onPress={() => this._imageClicked(source)}><Image source={{ uri: source }} style={{ width: WIDTH - 40, height: (WIDTH - 40) * (ratio > MaxRatio ? MaxRatio : ratio < 1 / MaxRatio ? 1 / MaxRatio : ratio) }} /></TouchableOpacity>
            )
        ) : null;

        return (
            <View style={styles.Conatiner}>
                <View style={styles.HeaderContainer}>
                    <View style={styles.UserContainer}>
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'red' }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                            <Text style={{ fontSize: 14 }}>{name}</Text>
                            <Text style={{ fontSize: 10, color: Colors.gray, marginLeft: 4, marginTop: 4 }}>{date}</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}><Dots /></TouchableWithoutFeedback>
                </View>

                {imageList != null ?
                    <View style={styles.ImageContainer}>
                        <ScrollView overScrollMode={"never"} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this._scrollHandle} scrollEventThrottle={16}>
                            {imageList}

                        </ScrollView>
                        {image.length > 1 ?
                            <View style={styles.ImageNav}><Text style={{ color: 'white', fontSize: 12 }}>{this.state.myPage}/{image.length}</Text></View> : null}
                    </View> : null}

                {tagList != null ? <View style={styles.TagContainer}>
                    {tagList}
                </View> : null}

                <View style={styles.ContentContainer}>
                    <View style={styles.ContentTextContainer}>
                        <Text ref={(ref) => this.contentText = ref} style={styles.ContentText} onLayout={this._involkedLayout} numberOfLines={this.state.isOverflow == true ? (this.state.readMoreClicked == true ? null : 2) : null}>{content}</Text>
                        {this.state.isOverflow && !this.state.readMoreClicked ? <TouchableWithoutFeedback onPress={this._readmoreHandle}><Text style={{ color: Colors.lightGray, fontSize: 14, lineHeight: 20 }} >자세히 보기</Text></TouchableWithoutFeedback> : null}

                        <Text style={styles.ContentData}>
                            좋아요{this.state.like} · 댓글{commentNum}
                        </Text>
                    </View>
                </View>
                <LinearGradient colors={[Colors.lightBlue, Colors.lightRed]} style={styles.BottomBar} start={[0, 0]} end={[1, 1]} >

                    <BaseButton style={styles.BottomBarContent} onPress={this._likeHandle}>
                        {this.state.isLiked == true ? <HeartFill /> : <HeartEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>좋아요</Text>
                    </BaseButton>
                    <BaseButton onPress={this._commentHandle} style={{ height: '100%', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14 }} >댓글</Text>
                    </BaseButton>
                    <BaseButton style={styles.BottomBarContent} onPress={this._bookmarkHandle}>
                        {this.state.isBookmarked == true ? <BookmarkFill /> : <BookmarkEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>북마크</Text>
                    </BaseButton>
                </LinearGradient>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Conatiner: {
        marginBottom: 36,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20,
        width: WIDTH - 40,
    },
    HeaderContainer: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 14,
        paddingRight: 14,
    },
    UserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ImageContainer: {
        width: WIDTH - 40,
        marginBottom: 5,
    },
    ImageNav: {
        height: 20,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#4b4b4b80',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    TagContainer: {
        width: WIDTH - 40,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    TagList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    ContentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    ContentTextContainer: {
        width: '100%',
        marginBottom: 5,
    },
    ContentText: {
        fontSize: 14,
        lineHeight: 20
    },
    ContentData: {
        textAlign: 'right',
        fontSize: 10,
        color: Colors.lightGray,
        fontWeight: 'bold',
    },
    BottomBar: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    BottomBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1
    }
})
