import React, {Component} from 'react'
import { 
        View, 
        TextInput,
        StyleSheet,
        SafeAreaView,
        TouchableOpacity,
        Text,
        Alert
     } from 'react-native';
import axios from 'axios'
import { server, showError } from '../common'

import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../commonStyles';
import moment from 'moment'

export default class Students extends Component{
    state = {
        name: 'Aluno1',
        date: new Date()
       
    }

    save = async()=>{
       /* if(!this.state.name || !this.state.name.trim()){
            Alert.alert('Dados Inválidos','Nome não informado!')
            return
        }
        */

        try{
           // Alert.alert(this.state.date.toString())
          
            await axios.post(`${server}/students`,{
                name: this.state.name,
                registryDate: this.state.date,
                active: false
            })           

          
            this.setState({ showAddTask: false}, this.loadTasks)

        }catch(e){
           // showError(e)
           console.error(e)
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
        return (
            <SafeAreaView>
                <TextInput style={styles.input}
                    placeholder="Nome do estudante"
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}/>

                    {this.getDatePicker()}

                    <TouchableOpacity onPress={this.save}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                            {'Salvar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
            </SafeAreaView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1 
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    button:{
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})