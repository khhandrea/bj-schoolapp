import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, Linking, Platform, AsyncStorage, ActivityIndicator, ToastAndroid } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Components/Asset'
import { IntentLauncherAndroid as IntentLauncher } from 'expo';



const facebookUrl = 'http://www.facebook.com/'

export default class SettingScreen extends Component {
    static navigationOptions = { title: '설정' };

    constructor(props) {
        super(props);
        this.state = {
            isDdayOn: false,
            isLowDataOn: false,
            isAlertOn: false,
            loading: false,
        }
    }

    componentDidMount() {
        this._settingInitalize();
    }

    _settingInitalize = async () => {
        try {
            let dday = await AsyncStorage.getItem('ISDDAY');
            let lowData = await AsyncStorage.getItem('ISLOWDATA');
            let alert = await AsyncStorage.getItem('ISALERT');
            dday = dday === null ? true : dday === 'true' ? true : false;
            lowData = lowData === null ? false : lowData === 'true' ? true : false;
            alert = alert === null ? true : alert === 'true' ? true : false;

            this.setState({ isDdayOn: dday, isLowDataOn: lowData, isAlertOn: alert, loading: true })
        } catch (error) {

        }
    }

    _ddayHandle = async () => {
        const b = this.state.isDdayOn;
        this.setState({ isDdayOn: !this.state.isDdayOn });
        await AsyncStorage.setItem('ISDDAY', !b ? 'true' : 'false');
    }
    _dataHandle = async () => {
        const b = this.state.isLowDataOn;
        this.setState({ isLowDataOn: !this.state.isLowDataOn });
        await AsyncStorage.setItem('ISLOWDATA', !b ? 'true' : 'false');
    }
    _alertHandle = async () => {
        const b = this.state.isAlertOn;
        this.setState({ isAlertOn: !this.state.isAlertOn });
        await AsyncStorage.setItem('ISALERT', !b ? 'true' : 'false');
    }

    render() {
        return (
            !this.state.loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='#dddddd' /></View>
                :
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} >
                        <View style={{ marginTop: 15, paddingLeft: 20, height: 20, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#888', marginBottom: 5 }}>기능</Text>
                        </View>
                        <Toggle title='시험 D-DAY 표시' state={this.state.isDdayOn} onToggle={this._ddayHandle} />
                        <Toggle title='데이터 절약모드' state={this.state.isLowDataOn} onToggle={this._dataHandle} />
                        <Toggle title='급식알림' state={this.state.isAlertOn} onToggle={this._alertHandle} />

                        <View style={{ marginTop: 10, paddingLeft: 20, height: 20, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#888' }}>권한</Text>
                        </View>
                        <Tab title='카메라 권한' onClicked={() => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:')
                            } else {
                                ToastAndroid.show('스크랩 > 권한 > 카메라 활성화', ToastAndroid.LONG);
                                IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
                            }
                        }} />
                        <Tab title='갤러리 권한' onClicked={() => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:')
                            } else {
                                ToastAndroid.show('스크랩 > 권한 > 저장공간 활성화', ToastAndroid.LONG);
                                IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_SETTINGS);
                            }
                        }}
                        />

                        <View style={{ marginTop: 10, paddingLeft: 20, height: 20, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#888' }}>기타</Text>
                        </View>
                        <Tab title='페이스북 페이지로 이동' onClicked={() => Linking.openURL(facebookUrl)} />
                        <Tab title='문의하기' />

                        <View style={{ marginTop: 10, paddingLeft: 20, height: 20, width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#888' }}>약관 및 정책</Text>
                        </View>
                        <Tab title='이용약관' />
                        <Tab title='개인정보처리방침' />
                        <Tab title='운영정책' />
                        <Tab title='오픈소스 라이선스' />
                    </ScrollView>
                </View>
        )
    }
}

class Toggle extends Component {
    render() {
        const { title, state, onToggle } = this.props;
        return (
            <View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 14 }}>{title}</Text>
                    <View style={{ position: 'absolute', right: 20, top: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={onToggle}>
                            <FontAwesome name={state ? 'toggle-on' : 'toggle-off'} size={30} color={state ? Colors.red : Colors.lightGray} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    }
}

class Tab extends Component {
    render() {
        const { title, onClicked } = this.props;
        return (
            <BaseButton onPress={onClicked}>
                <View accessible style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 14 }}>{title}</Text>
                    <View style={{ position: 'absolute', right: 20, top: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center' }}>
                    </View>
                </View>
            </BaseButton>
        )
    }
}

const styles = StyleSheet.create({})
