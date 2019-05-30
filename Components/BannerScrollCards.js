import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

const myBlue = "#8293FF";
const myRed = "#FF8282";


export class Meal extends Component {
    render() {
        const { mealData } = this.props;
        const mealList = mealData.map(
            (info, index) => (
                <MyItem data={info} index={index} key={index} />
            )
        );
        return (
            <View style={styles.Container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>급식</Text>
                </View>
                {mealList}
            </View>
        )
    }
}

class MyItem extends Component {
    render() {
        const { data, index } = this.props;
        return (
            <View style={styles.ItemContainer}>
                <View style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: (index % 2 == 0 ? myRed : myBlue),
                    left: 12
                }}
                />
                <Text style={styles.ItemText}>{data}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        width: 139,
        height: 224,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'nanumbarungothic',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    TitleContainer: {
        width: 100,
        height: 30,
        backgroundColor: '#8293FF',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    Dot1: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#8293FF',
        left: 12
    },
    Dot2: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FF8282',
        left: 12
    },
    ItemText: {
        fontSize: 14,
        color: '#494D54',
        left: 20,
    },
    ItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
    }

})
