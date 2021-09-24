import React, {Component} from 'react'
import { Modal,View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity,TextInput, Platform } from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';


import { server, showError } from '../common'
import axios from 'axios'

const initialState = { 
        desc: '', 
        date: new Date(), 
        showDatePicker: false, 
        eventtype: '', 
        studentsDropDown: '',
        StartedAtSch:'',
        endedAtSch:'',
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
        
       this.loadEventTypeItems()
       this.loadStudentsItems()
    }

    save = () =>{
        const newEvent = {
            date: this.state.date,
            StartedAtSch: datetimeNow,
            startedAt: datetimeNow,
            endedAt: datetimeNow,
            endedAtSch: datetimeNow,
            eventType: this.state.evtSelected,
            Obs: 'teste',            
            student: this.state.studentselected

        }
      

        this.props.onSave && this.props.onSave(newEvent)
        this.setState({...initialState})
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


    loadEventTypeItems = async () => {
        try{
            const res = await axios.get(`${server}/eventtype`)          
            this.setState({eventtype: res.data})            
        }catch(e){
            showError(e)
        }
    }

    loadStudentsItems = async () => {
        try{
            
            const res = await axios.get(`${server}/students`)
            this.setState({studentsDropDown: res.data})            
        }catch(e){
            showError(e)
        }        
    }

    render(){
        return(
            

            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Novo Evento</Text>

                    {this.getDatePicker()}

                        <Picker
                            style={{ width: "100%" }}
                            mode="dropdown"
                            selectedValue={this.state.evtSelected}                        
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    evtSelected: itemValue
                                })    
                            }
                        >
                            {this.state.eventtype !== "" ? (
                                this.state.eventtype.map(evt => {
                                    return <Picker.Item label={evt.type} value={evt.id} key={evt.id} />;
                                })
                            ) : (
                                <Picker.Item label="Loading..." value="0" />
                            )}
                        </Picker>
                        

                        <Picker
                            style={{ width: "100%" }}
                            mode="dropdown"
                            selectedValue={this.state.studentselected}                        
                            onValueChange={(itemValue1, itemIndex1) =>
                                this.setState({
                                    studentselected: itemValue1
                                })
                            }
                        >
                            {this.state.studentsDropDown !== "" ? (
                                this.state.studentsDropDown.map(std => {
                                    return <Picker.Item label={std.name} value={std.id} key={std.id} />;
                                })
                            ) : (
                                <Picker.Item label="Loading..." value="0" />
                            )}
                        </Picker>                       
                
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0,0.7)'
    },
    container:{
        backgroundColor: '#FFF'
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    input:{
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})