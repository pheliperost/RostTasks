import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import moment from 'moment'
import axios from 'axios'
import { server, showError } from '../common'

const initialState = {
  items:{
    '2021-11-22': [{name: 'item 1 - any js object'}],
    '2021-11-23': [{name: 'item 2 - any js object', height: 80}],
    '2021-11-24': [],
    '2021-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  },
  RawEvents: [],
  formatEvent: {}
}


  

export default class TesteCalendar extends Component{
  state = {
    ...initialState
  }

  componentDidMount = async () =>{
 
   // this.startingup()
    this.loadEvents()
   
  }

 

startingup = () =>{
  const newitem = {'2021-09-29':[{name: 'item 4 - any js object'}]};//{'2021-09-29': {name:'meu aniversario'}};
  this.setState({items: {...this.state.items, 
    '2021-09-29': [{name: 'item 4 - any js object'},{name: 'item 5 - agora foi carai'}]
  }}, //() => console.log({...this.state.items})
  )    
}

callback = (acumulador, valor) => {
  const formattedDate = moment.utc(valor.date).format("YYYY-MM-DD");
  acumulador[formattedDate] = this.state.RawEvents.filter((item) => moment.utc(item.date).format("YYYY-MM-DD") === formattedDate )
  return acumulador
};


formatItems = () => {

  const EventsFormated = this.state.RawEvents.reduce(this.callback, {});
  this.setState({formatEvent: EventsFormated})
 
}

loadEvents =  async () => {
  try{         
      const res = await axios.get(`${server}/events`)
      this.setState({RawEvents: res.data}, this.formatItems)
  }catch(e){
      showError(e)
  }
}

        renderItem = (item) => {
         

          return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>{item.name}</Text>
                    <Avatar.Text label="J" />
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        }
        
        render(){
            return(
            <View style={{flex: 1}}>
                <Agenda
                    items={this.state.formatEvent}
                    //loadItemsForMonth={loadItems}
                    selected={'2021-11-16'}
                    renderItem={this.renderItem}
                    />            
            </View>
            )
          }
    
}

