import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import { Platform } from "react-native";
import MainScreen from './MainScreen';
import PhotoScreen from './Screens/PhotoScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CommentScreen from './Screens/CommentScreen';
import CameraScreen from './Screens/CameraScreen'

import { Colors } from './Asset';

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

            if (Platform.OS == 'ios') {
                return RightTransition(index, position, width);
            }
            if (routeName == "Exam") {
                return LeftTransition(index, position, width);
            }
            else if (routeName == "Contest") {
                return RightTransition(index, position, width);
            }
            else if (routeName == "Photo") {
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
        Camera: CameraScreen
    },
    {
        transitionConfig: NavigationConfig,
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                height: 50
            },
            // headerTintColor: Colors.fontBlack,
            headerTitleStyle: {
                fontWeight: '200',
                color: Colors.fontBlack
            },
        },

    }
);

export default createAppContainer(AppNavigator);