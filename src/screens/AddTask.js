import React, {Component} from 'react'
import { Modal,View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity,TextInput, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';
import {styles} from '../screens/AddTask/styles';
import commonStyles from '../screens/AddTask/commonStyles';

import { server, showError } from '../common'
import axios from 'axios'

const initialState = { 
        desc: '', 
        date: new Date(), 
        showDatePicker: false, 
        eventtype: '', 
        studentsDropDown: '',
        startedAt:'',
        endedAt:'',
        Obs: 'teste',
        eventType: '',
        student: '',
        evtSelected: '',
        studentselected: ''

    }

const today = moment();
const datetimeNow = today.format('YYYY-MM-DD HH:MM:SS')

export default class AddEvent extends Component{

    state = {
        ...initialState

    }

    componentDidMount = async () =>{
        
    }

    save = () =>{
        const newEvent = {
            date: this.state.date,
            startedAt: this.state.date,
            endedAt: this.state.date,
            eventType: this.state.evtSelected,
            Obs: 'teste',            
            student: this.state.studentselected

        }
      
        if(this.state.evtSelected == "" || this.state.evtSelected == 0){
            alert("You need to select an event type first")
        }else{
            if(this.state.studentselected == "" || this.state.studentselected == 0){
                alert("You need to select an student first")
            }else{                
                  this.props.onSave && this.props.onSave(newEvent)
                  
            }
        }

    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
            value={this.state.date}
            onChange={(_,date)=>this.setState({date, showDatePicker: false})}
            mode='date'/>
            
            const dateString =  moment(this.state.date).format('dddd. D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() =>  this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

            return datePicker
    }


    render(){
        return(
            

            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={commonStyles.today}>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

}
