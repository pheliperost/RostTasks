import React, {Component} from 'react'
import { View,Text,ImageBackground, StyleSheet } from 'react-native'
import ImageToday from '../../assets/imgs/today.jpg'

export default class TaskList extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={ImageToday}
                style={styles.background}>

                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>Tasklist</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 
    },
    background: {
        flex: 3
    },
    taskList:{
        flex: 7
    }
});