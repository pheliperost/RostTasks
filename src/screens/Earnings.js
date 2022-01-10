import React, {Component} from 'react'
import { 
    View,
    Text,
    ImageBackground, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Platform,
    Alert } from 'react-native'
import moment from 'moment'
import axios from 'axios'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'

import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../commonStyles'
import { server, showError } from '../common'
import AsyncStorage from "@react-native-community/async-storage"


const initialState = { 
    showDatePicker: false,
    date: new Date('2021-05-11'),
    time:'11:05',
    tasks:[]
}

export default class Earnings extends Component{
    state = {
       ...initialState
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <DateTimePicker 
                value={this.state.date}
                onChange={(_,date)=>this.setState({date, showDatePicker: false})}
                mode='date'/>
                <DateTimePicker 
                value={this.state.date}
                onChange={(_,date)=>this.setState({date, showDatePicker: false})}
                mode='time'/>
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
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton:{
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'

    }
});