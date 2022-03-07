import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import {Card, Avatar, Divider} from 'react-native-paper';
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
  }}, 
  )    
}

callback = (acumulador, valor) => {
  const formattedDate = moment.utc(valor.start).format("YYYY-MM-DD");
  acumulador[formattedDate] = this.state.RawEvents.filter((item) => moment.utc(item.start).format("YYYY-MM-DD") === formattedDate )
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
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}
            onPress={() => this.props.navigation.navigate('EventDetails',
            {
                eventData: item
            })}  
            >
              <Card>
                <Card.Title 
                  title={item.summary}
                  subtitle={item.hour}
                  />
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                     {/* <Avatar.Image label="J" /> */}
                     
                  <Divider />
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        }
        
        render(){
          console.log("this.state.formatEvent")
          console.log(this.state.formatEvent)
            return(
                           
            <View style={{flex: 1}}>
                <Agenda
                    items={this.state.formatEvent}
                    //loadItemsForMonth={loadItems}
                    selected={'2022-03-07'}
                    renderItem={this.renderItem}
                    />            
            </View>
            )
          }
    
}

