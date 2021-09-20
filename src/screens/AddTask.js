import React, {Component} from 'react'
import { Modal,View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity,TextInput, Platform } from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import ModalSelector from 'react-native-modal-selector'

import { server, showError } from '../common'
import axios from 'axios'

const initialState = { desc: '', date: new Date(), showDatePicker: false, eventtype: ''}

const contries = ['Deustchland', 'England']

export default class AddTask extends Component{

    state = {
        ...initialState

    }

    save = () =>{
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
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

    render(){
       this.loadEventTypeItems()
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
                    <Text style={styles.header}>Nova Tarefa</Text>


                    <TextInput style={styles.input}
                        placeholder='informe a descrição...' 
                        onChangeText={desc => this.setState({desc})}
                        value={this.state.desc}/>

                        <ModalSelector
                            data={this.state.eventtype}                            
                            keyExtractor= {item => item.id}
                            labelExtractor= {item => item.type}
                            initValue="Selecione o tipo de evento!">
                        </ModalSelector>

                        {this.getDatePicker()}
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