import React, { Component } from 'react'
import { } from 'react-native'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import { Platform } from "react-native";
import MainScreen from './Screens/MainScreen';
import PhotoScreen from './Screens/PhotoScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CommentScreen from './Screens/CommentScreen';
import CameraScreen from './Screens/CameraScreen'
import BusScreen from './Screens/BusScreen';
import PostScreen, { ContentScreen } from './Screens/PostScreen';
import NotificationScreen from './Screens/NotificationScreen';
import { MyPostScreen, MyCommentScreen, BookmarkScreen } from './Screens/PostDataScreen';
import DetailScreen from './Screens/DetailScreen';
import SearchScreen from './Screens/SearchScreen';
import ContestScreen from './Screens/ContestScreen';
import ExamScreen from './Screens/ExamScreen';

import { BaseButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';



import { Colors } from './Components/Asset';

const FadeTransition = (index, position) => {
    const sceneRange = [index - 1, index];
    const outputOpacity = [0, 1];
    const transition = position.interpolate({
        inputRange: sceneRange,
        outputRange: outputOpacity,
    });

    return {
        opacity: transition
    }
}

const BottomTransition = (index, position, height) => {
    const sceneRange = [index - 1, index, index + 1];
    const outputHeight = [height, 0, 0];
    const transition = position.interpolate({
        inputRange: sceneRange,
        outputRange: outputHeight,
    });

    return {
        transform: [{ translateY: transition }]
    }
}
const RightTransition = (index, position, width) => {
    const sceneRange = [index - 1, index, index + 1];
    const outputWidth = [width, 0, 0];
    const transition = position.interpolate({
        inputRange: sceneRange,
        outputRange: outputWidth,
    });

    return {
        transform: [{ translateX: transition }]
    }
}

const LeftTransition = (index, position, width) => {
    const sceneRange = [index - 1, index, index + 1];
    const outputWidth = [-width, 0, 0];
    const transition = position.interpolate({
        inputRange: sceneRange,
        outputRange: outputWidth,
    });

    return {
        transform: [{ translateX: transition }]
    }
}

const NavigationConfig = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const position = sceneProps.position;
            const scene = sceneProps.scene;
            const index = scene.index;
            const height = sceneProps.layout.initHeight;
            const width = sceneProps.layout.initWidth;
            const routeName = scene.route.routeName;

            if (routeName == 'Contest') {
                return RightTransition(index, position, width);
            } else if (routeName == 'Exam') {
                return LeftTransition(index, position, width);
            }

            if (Platform.OS == 'ios') {
                return RightTransition(index, position, width);
            }
            else if (routeName == "Comment") {
                return RightTransition(index, position, width);
            }
            else if (routeName == "Photo" || routeName == "Bus" || routeName == "Notification") {
                return BottomTransition(index, position, height);
            }


        }
    }
}



const AppNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Photo: PhotoScreen,
        Profile: ProfileScreen,
        Comment: CommentScreen,
        Camera: CameraScreen,
        Bus: BusScreen,
        Post: PostScreen,
        Post_Content: ContentScreen,
        Notification: NotificationScreen,
        MyPost: MyPostScreen,
        MyComment: MyCommentScreen,
        Bookmark: BookmarkScreen,
        Detail: DetailScreen,
        Search: SearchScreen,
        Contest: ContestScreen,
        Exam: ExamScreen
    },
    {
        transitionConfig: NavigationConfig,
        initialRouteName: 'Main',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                height: 50
            },
            headerLeft:
                <BaseButton onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} >
                    <AntDesign name='arrowleft' size={20} style={{ margin: 0 }} />
                </BaseButton>
            ,
            headerTitleStyle: {
                fontWeight: '200',
                color: Colors.fontBlack
            },
        }),

    }
);

export default createAppContainer(AppNavigator);