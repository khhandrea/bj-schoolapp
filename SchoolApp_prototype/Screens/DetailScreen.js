import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '../Components/Asset';
import { BaseButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import BookmarkFill from '../Icons/bookmarkFill.svg';
import BookmarkEmpty from '../Icons/bookmarkEmpty.svg';
import HeartFill from '../Icons/heartFill.svg';
import HeartEmpty from '../Icons/heartEmpty.svg';
import Dots from '../Icons/threeDots.svg';
import MyActionSheet from '../Components/MyActionSheet';

const WIDTH = Dimensions.get('window').width;
const maxRatio = 1.5;

const DetailData = {
    data: {
        name: '김종현',
        image: [
            'https://bloximages.chicago2.vip.townnews.com/tribdem.com/content/tncms/assets/v3/editorial/3/83/38384be2-3ba5-11e8-adec-bf48bc62810f/5acadc92f3c7d.image.jpg?resize=400%2C357',
            'https://media.gettyimages.com/photos/american-goldfinchmale-picture-id155066963?s=612x612',
        ],
        ratio: 400 / 357,
        date: '2분전',
        likeNum: 5,
        commentNum: 5,
        isLiked: false,
        isBookmarked: true,
        tag: [
            "1학년",
            "수학",
            "이과",
            "질문",
            "HELP!"
        ],
        content: '🎶안녕하세요 보정고 밴드부 BHSB입니다🎶\n💜저희 밴드부는 학교 축제 때 찬조 공연과 버스킹 등 밴드부 정기 공연을 합니다!💜\n🍇음악을 좋아하고 음악에 자신감이 있다!! 다른 사람에게 음악을 들려주고 싶다!! 이런 마음을 갖고 계신 분은 바로 밴드부에 지원해주시면 됩니다! 음악에 열정을 갖고 있다면 누구나 지원가능하니 망설이지 말고 지원해주세요🍇\n🗒지원서는 3월 12일 점심시간까지 2 - 6 정성은 또 2 - 7 김세연에게 제출해주시면 됩니다!🗒',
        key: 16
    }

}


export default class DetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '김종현',
            headerRight: (
                <BaseButton onPress={navigation.getParam('openModal')} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} >
                    <AntDesign accessible name='ellipsis1' size={24} />
                </BaseButton>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: DetailData.data,
            page: 1,
            visible: false,
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ openModal: this._openModal });
    }
    _openModal = () => {
        this.setState({ visible: true });
    }
    _likeHandle = () => {
        let d = this.state.data;
        d.isLiked ? d.likeNum-- : d.likeNum++;
        d.isLiked = !d.isLiked;
        this.setState({
            data: d,
        })
    }
    _bookmarkHandle = () => {
        let d = this.state.data;
        d.isBookmarked = !d.isBookmarked;
        this.setState({
            data: d,
        })
    }
    _commentHandle = () => {
        this.props.navigation.navigate('Comment');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView overScrollMode='never'>
                    <View>
                        <ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='never' style={{ width: '100%' }} scrollEventThrottle={16} onScroll={(event) => {
                            const page = Math.round(event.nativeEvent.contentOffset.x / WIDTH) + 1;
                            this.setState({
                                page: page,
                            })
                        }}>
                            {this.state.data.image.map((img, index2) =>
                                <TouchableOpacity key={index2} activeOpacity={1} onPress={() => this.props.navigation.navigate('Photo', { image: this.state.data.image, index: index2 })}>
                                    <Image source={{ uri: img }} style={{ width: WIDTH, height: WIDTH / (this.state.data.ratio > maxRatio ? maxRatio : this.state.data.ratio < 1 / maxRatio ? 1 / maxRatio : this.state.data.ratio) }} />
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                        {this.state.data.image.length > 1 &&
                            <View style={{ height: 20, width: 40, borderRadius: 20, backgroundColor: '#4b4b4b80', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: 10, }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{this.state.page}/{this.state.data.image.length}</Text>
                            </View>
                        }
                    </View>

                    <View style={{ width: WIDTH, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {this.state.data.tag.map(
                                (text, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                                        <View style={{
                                            width: 4, height: 4, borderRadius: 2, marginRight: 4,
                                            backgroundColor: (index % 2 == 0 ? Colors.blue : Colors.red)
                                        }} />
                                        <Text style={{ fontSize: 14 }}>{text}</Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 20, marginBottom: 60 }}>
                        <Text style={{ fontSize: 14, lineHeight: 20 }}>{this.state.data.content}</Text>
                        <Text style={{ fontSize: 12, color: Colors.lightGray, fontWeight: 'bold' }}>
                            좋아요{this.state.data.likeNum} · 댓글{this.state.data.commentNum}
                        </Text>
                    </View>
                </ScrollView>
                <LinearGradient colors={[Colors.lightBlue, Colors.lightRed]} style={{ height: 44, width: WIDTH, flexDirection: 'row', alignItems: 'center' }} start={[0, 0]} end={[1, 1]} >

                    <BaseButton style={styles.BottomBarContent} onPress={this._likeHandle}>
                        {this.state.data.isLiked ? <HeartFill /> : <HeartEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>좋아요</Text>
                    </BaseButton>
                    <BaseButton onPress={this._commentHandle} style={{ height: '100%', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14 }} >댓글</Text>
                    </BaseButton>
                    <BaseButton style={styles.BottomBarContent} onPress={this._bookmarkHandle}>
                        {this.state.data.isBookmarked ? <BookmarkFill /> : <BookmarkEmpty />}
                        <Text style={{ color: 'white', marginLeft: 8, fontSize: 14 }}>북마크</Text>
                    </BaseButton>
                </LinearGradient>

                <MyActionSheet
                    visible={this.state.visible}
                    contents={['신고하기', '삭제하기']}
                    onClicked={(data) => {

                    }}
                    closeHandle={() => this.setState({ visible: false })} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    BottomBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1
    }
})