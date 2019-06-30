import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert, Modal, TouchableWithoutFeedback } from 'react-native'
import { Colors } from '../Components/Asset';
import { BaseButton } from 'react-native-gesture-handler';


let myPassword = '123'; //서버에서 불러오기
let myName = '김종현';
let myNumber = '20702';
const myWidth = 230;
const gradList = [1, 2, 3];
const classlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

export default class ProfileScreen extends Component {
    static navigationOptions = { title: '내 정보' };

    constructor(props) {
        super(props);
        this.state = {
            name: '김종현',
            grade: Math.floor(myNumber / 10000),
            class: Math.floor(myNumber % 10000 / 100),
            number: Math.floor(myNumber % 100),
            schoolNumber: myNumber,
            rank: 2,
            password: null,
            gradVisible: false,
            classVisible: false,
            numberVisible: false,
        }
    }
    _onPress = () => { //비동기화로
        this.setState({ schoolNumber: (this.state.grade * 10000) + (this.state.class * 100) + this.state.number });

        if (myPassword != this.state.password) {
            Alert.alert('비밀번호가 틀렸습니다');
        }
        else if (myName == this.state.name && myNumber == this.state.schoolNumber) {
            this.props.navigation.goBack();
            return null;
        }
        else if (this._checkName()) {
            Alert.alert(`${this.state.name}은 이미 사용중입니다`);
        }


        this._changeLocalData();
        this._upLoadData();
    }
    _changeLocalData = () => {

        this.props.navigation.state.params.changeProfile(this.state.name, this.state.schoolNumber)
    }
    _upLoadData = () => {
        //this.props.navigation.goBack();
    }
    _checkName = () => {
        return true;
    }
    _modalClose = () => {
        this.setState({
            gradVisible: false,
            classVisible: false,
            numberVisible: false
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.Container}>
                        <Text style={styles.Tag}>닉네임</Text>
                        <View style={styles.Line} />
                        <TextInput maxLength={5} ref={nameInput => this.nameInput = nameInput} value={this.state.name} style={styles.Input} onChangeText={(text) => this.setState({ name: text })} />
                    </View>
                    <View style={styles.Container}>
                        <Text style={styles.Tag}>학번</Text>
                        <View style={styles.Line} />
                        <BaseButton onPress={() => this.setState({ gradVisible: true })} style={{ alignItems: 'center', flexDirection: 'row', height: '100%', paddingHorizontal: 10, marginLeft: 20 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.grade}
                                <Text style={{ fontSize: 14 }}> 학년</Text>
                            </Text>
                        </BaseButton>
                        <BaseButton onPress={() => this.setState({ classVisible: true })} style={{ alignItems: 'center', flexDirection: 'row', height: '100%', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.class}
                                <Text style={{ fontSize: 14 }}> 반</Text>
                            </Text>
                        </BaseButton>
                        <BaseButton onPress={() => this.setState({ numberVisible: true })} style={{ alignItems: 'center', flexDirection: 'row', height: '100%', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14 }}>{this.state.number}
                                <Text style={{ fontSize: 14 }}> 번</Text>
                            </Text>
                        </BaseButton>
                    </View>
                    <View style={styles.Container}>
                        <Text style={styles.Tag}>등급</Text>
                        <View style={styles.Line} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            {this._rank2Icon(this.state.rank)}
                            {this._rank2Text(this.state.rank)}
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <Text style={styles.Tag}>비밀번호</Text>
                        <View style={styles.Line} />
                        <TextInput ref={passwordInput => this.passwordInput = passwordInput} secureTextEntry={true} value={this.state.password} style={styles.Input} onChangeText={(text) => this.setState({ password: text })} />
                    </View>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={this._onPress}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#065FD4', paddingVertical: 10 }}>수정하기</Text>
                    </TouchableOpacity>
                </ScrollView>
                {this.numberModal(gradList,
                    this.state.gradVisible,
                    (index) => {
                        this.setState({ grade: index + 1 });
                        this._modalClose();
                    }
                )}
                {this.numberModal(classlist,
                    this.state.classVisible,
                    (index) => {
                        this.setState({ class: index + 1 });
                        this._modalClose();
                    }
                )}
                {this.numberModal(numberList,
                    this.state.numberVisible,
                    (index) => {
                        this.setState({ number: index + 1 });
                        this._modalClose();
                    }
                )}
            </View>
        )
    }

    numberModal(data, visible, callBack) {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
                onRequestClose={this._modalClose}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#80808080' }}>
                    <View style={{ width: myWidth, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                        <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false}>
                            {data.map((info, index) =>
                                <View key={index}>
                                    <TouchableWithoutFeedback onPress={() => callBack(index)}>
                                        <View style={{ borderBottomColor: '#dbdbdb', borderBottomWidth: 0.5, height: 50, width: myWidth, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16 }}>{info}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }

    _rank2Text(rank) {
        return <Text style={{ fontSize: 14, lineHeight: 20 }}>새싹</Text>;
    }
    _rank2Icon(rank) {
        return null;
    }
}

const styles = StyleSheet.create({
    Container: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 0.5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Tag: {
        paddingHorizontal: 20,
        fontSize: 14,
        lineHeight: 20
    },
    Line: {
        width: 1,
        height: 14,
        backgroundColor: '#dbdbdb'
    },
    Input: {
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal: 20,
        width: '70%'
    }
})
