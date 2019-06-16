import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert, Platform } from 'react-native'
import { Colors } from '../Asset';

let myPassword; //서버에서 불러오기
let myName = '김종현';
let myNumber = '20702';

export default class ProfileScreen extends Component {
    static navigationOptions = { title: '내 정보' };

    constructor(props) {
        super(props);
        this.state = {
            name: '김종현',
            number: '20702',
            rank: 2,
            password: null,
        }
    }
    _onPress = () => { //비동기화로
        if (this._checkName()) {
            Alert.alert(
                '닉네임 중복',
                `${this.state.name}은 이미 사용중입니다`,
                [

                    {
                        text: '알겠습니다', onPress: () => {
                            this.nameInput.focus();
                            return null;
                        }
                    },
                ],
                { cancelable: false },
            );
        }
        else if (myPassword != this.state.password) {
            Alert.alert(
                '비밀번호가 틀렸습니다',
                '비밀번호를 확인해주세요',
                [

                    {
                        text: '알겠습니다', onPress: () => {
                            if (Platform.OS == 'android') this.passwordInput.focus();
                            return null;
                        }
                    },
                ],
                { cancelable: false },
            );
        }
        if (myName == this.state.name && myNumber == this.state.number) {
            this.props.navigation.goBack();
            return null;
        }
        this._changeLocalData();
        this._upLoadData();
    }
    _changeLocalData = () => {

        this.props.navigation.state.params.changeProfile(this.state.name, this.state.number)
    }
    _upLoadData = () => {

        this.props.navigation.goBack();
    }
    _checkName = () => {
        return false;
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.Container}>
                    <Text style={styles.Tag}>닉네임</Text>
                    <View style={styles.Line} />
                    <TextInput maxLength={5} ref={nameInput => this.nameInput = nameInput} value={this.state.name} style={styles.Input} onChangeText={(text) => this.setState({ name: text })} />
                </View>
                <View style={styles.Container}>
                    <Text style={styles.Tag}>학번</Text>
                    <View style={styles.Line} />
                    <TextInput maxLength={5} keyboardType='number-pad' value={this.state.number} style={styles.Input} onChangeText={(text) => this.setState({ number: text })} />
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
        )
    }
    _rank2Text(rank) {
        return <Text style={{ fontSize: 20, lineHeight: 24, color: Colors.fontBlack }}>새싹</Text>;
    }
    _rank2Icon(rank) {
        return null;
    }
}

const styles = StyleSheet.create({
    Container: {
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Tag: {
        paddingHorizontal: 20,
        fontSize: 20,
        color: Colors.fontBlack,
        lineHeight: 24
    },
    Line: {
        width: 1,
        height: 14,
        backgroundColor: Colors.gray,
    },
    Input: {
        fontSize: 20,
        color: Colors.fontBlack,
        lineHeight: 24,
        paddingHorizontal: 20,
        width: '70%'
    }
})
