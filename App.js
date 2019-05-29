import React from 'react';
import { View, Text } from 'react-native';
import AppContainer from './AppContainer';
import { Font } from 'expo';

export default class App extends React.Component {
  state = {
    FontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'nanumbarungothic': require('./assets/fonts/NanumBarunGothic.ttf'),
      'nanumbarungothic-bold': require('./assets/fonts/NanumBarunGothic-bold.ttf'),
      'segoe-ui': require('./assets/fonts/Segoe-Ui.ttf')
    });

    this.setState({ FontLoaded: true });
  }


  render() {
    return (
      this.state.FontLoaded ? (
        <AppContainer />
      ) : null
    );
  }
}

