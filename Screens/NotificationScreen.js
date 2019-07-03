import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler';
import { Colors } from '../Components/Asset'

const WIDTH = Dimensions.get('window').width;
const maxRatio = 1.3;

const data = {
    //callMore
    //refresh
    card: [
        {
            title: '보정 축제 오디션',
            image: [
                'http://www.otr.co.kr/image/post/orginal/MUGX-S1LL16100600000083',
                'http://www.otr.co.kr/image/post/orginal/MUGX-S1LL16100600000083',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6YX1tDO6FWM8OXVx9r4n85xkUPjTn43FRcossnJRBZlPdWin'
            ],
            ratio: 897 / 1563,
            page: 1,
            likeNum: 10,
            commentNum: 5,
            date: '5/14',
            content: '🎶안녕하세요 보정고 밴드부 BHSB입니다🎶\n💜저희 밴드부는 학교 축제 때 찬조 공연과 버스킹 등 밴드부 정기 공연을 합니다!💜\n🍇음악을 좋아하고 음악에 자신감이 있다!! 다른 사람에게 음악을 들려주고 싶다!! 이런 마음을 갖고 계신 분은 바로 밴드부에 지원해주시면 됩니다! 음악에 열정을 갖고 있다면 누구나 지원가능하니 망설이지 말고 지원해주세요🍇\n🗒지원서는 3월 12일 점심시간까지 2 - 6 정성은 또 2 - 7 김세연에게 제출해주시면 됩니다!🗒',
            isLiked: false,
            callComment: null,
            imageView: false
            //callLikeChange()
        },
        {
            title: '보정 축제 오디션',
            image: [
                'https://i2.wp.com/thenewsrep.com/wp-content/uploads/2019/05/Pic.jpg?fit=750%2C500&ssl=1',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6YX1tDO6FWM8OXVx9r4n85xkUPjTn43FRcossnJRBZlPdWin'
            ],
            ratio: 750 / 500,
            page: 1,
            likeNum: 10,
            commentNum: 5,
            date: '5/14',
            content: '보정 축제 오디션 있습니다. 확인하세요',
            isLiked: true,
            callComment: null,
            imageView: false
        },
        {
            title: '보정 축제 오디션',
            image: [
            ],
            ratio: 897 / 1563,
            page: 1,
            likeNum: 10,
            commentNum: 5,
            date: '5/14',
            content: '보정 축제 오디션 있습니다. 확인하세요',
            isLiked: false,
            callComment: null,
            imageView: false
        }
    ]
}

export default class NotificationScreen extends Component {
    static navigationOptions = { title: '공지' };

    constructor(props) {
        super(props);
        this.state = {
            cardData: data.card,
            loading: false,
            lowDataMode: true,
        }
    }

    async componentDidMount() {
        let lowData = await AsyncStorage.getItem('ISLOWDATA');
        lowData = lowData === null ? false : lowData === 'true' ? true : false;
        this.setState({ lowDataMode: lowData, loading: true });
    }

    render() {
        return (
            !this.state.loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='#dddddd' /></View>
                :
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' style={{ flex: 1 }}>
                        {this.state.cardData.map((info, index) =>
                            <View key={index} style={{ width: WIDTH }}>
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, borderTopColor: '#dbdbdb', borderTopWidth: 0.5, }}>
                                    <Text style={{ marginLeft: 20, fontSize: 14 }} numberOfLines={1}>{info.title}</Text>
                                    <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}> {info.date}</Text>
                                </View>

                                {!this.state.lowDataMode || info.imageView ? <View>
                                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='never' style={{ width: '100%' }} scrollEventThrottle={16} onScroll={(event) => {
                                        const page = Math.round(event.nativeEvent.contentOffset.x / WIDTH) + 1;
                                        const d = this.state.cardData;
                                        d[index].page = page;
                                        this.setState({
                                            cardData: d,
                                        })
                                    }}>
                                        {info.image.map((img, index2) =>
                                            <TouchableOpacity key={index2} activeOpacity={1} onPress={() => this.props.navigation.navigate('Photo', { image: info.image, index: index2 })}>
                                                <Image key={index2} source={{ uri: img }} style={{ width: WIDTH, height: WIDTH / (info.ratio > maxRatio ? maxRatio : info.ratio < 1 / maxRatio ? 1 / maxRatio : info.ratio) }} />
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                    {info.image.length > 1 &&
                                        <View style={{ height: 20, width: 40, borderRadius: 20, backgroundColor: '#4b4b4b80', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: 10, }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>{info.page}/{info.image.length}</Text>
                                        </View>
                                    }
                                </View>
                                    : info.image.length !== 0 && <View style={{ height: 40, width: '100%', borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                                        <BaseButton onPress={() => {
                                            let d = this.state.cardData;
                                            d[index].imageView = true;
                                            this.setState({ cardData: d });
                                        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14, color: Colors.highlightBlue }}>사진보기(데이터 절약모드)</Text>
                                        </BaseButton>
                                    </View>}

                                <View style={{ width: '100%', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 14 }}>좋아요{info.likeNum} · 댓글{info.commentNum}</Text>
                                </View>

                                <View style={{ paddingHorizontal: 20, paddingBottom: 10, borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5 }}>
                                    <Text style={{ fontSize: 14, lineHeight: 20 }}>
                                        {info.content}
                                    </Text>
                                </View>

                                <View style={{ height: 40, flexDirection: 'row' }}>
                                    <BaseButton style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: info.isLiked ? Colors.lightRed : 'white' }} onPress={() => {
                                        //liked바꾸기, likeNum likeChange함수호출
                                        let d = this.state.cardData;
                                        if (info.isLiked) {
                                            d[index].likeNum--;
                                        } else {
                                            d[index].likeNum++;
                                        }
                                        d[index].isLiked = !info.isLiked;

                                        this.setState({ cardData: d })
                                    }}>
                                        <Text style={{ fontSize: 14, color: info.isLiked ? 'white' : 'black' }}>좋아요</Text>
                                    </BaseButton>
                                    <BaseButton style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('Comment')}>
                                        <Text style={{ fontSize: 14 }}>댓글</Text>
                                    </BaseButton>
                                    <View style={{ position: 'absolute', left: WIDTH / 2, height: 40, width: 0.5, backgroundColor: '#dbdbdb' }} />
                                </View>
                                <View style={{ width: '100%', height: 15, backgroundColor: '#bbb' }} />
                            </View>
                        )}
                    </ScrollView>
                </View>
        )
    }

}

const styles = StyleSheet.create({})
