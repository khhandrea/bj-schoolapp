import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import MainScreen from './MainScreen';
//import ExamScreen from './ExamScreen';
import ContestScreen from './ContestScreen';
import PhotoScreen from './Screens/PhotoScreen';
import ProfileScreen from './Screens/ProfileScreen';

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
        Contest: ContestScreen,
        Photo: PhotoScreen,
        Profile: ProfileScreen,
    },
    {
        transitionConfig: NavigationConfig,
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                height: 50
            },
            // headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'light',
            },
        },

    }
);

export default createAppContainer(AppNavigator);