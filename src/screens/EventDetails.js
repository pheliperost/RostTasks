import React, {Component} from 'react'
import { 
    View,
    Text,
    Button,
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

import { server, showError } from '../common'
import AsyncStorage from "@react-native-community/async-storage"
import AddEvent from './AddTask'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'
import Event from '../components/Event'




export default class EventDetails extends Component{
   

    componentDidMount = async () =>{
      /*   const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)
 */
        //this.loadTasks()
    }

   getDetails = () =>{
        const eventData =  this.props.navigation.getParam('eventData')
        const profissao =  this.props.navigation.getParam('profissao', 'nothing sent')
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        const eventData =  this.props.navigation.getParam('eventData')
        const profissao =  this.props.navigation.getParam('profissao', 'nothing sent')
        return(
            <View style={styles.container}>               
                <ImageBackground source={this.getImage()}
                style={styles.background}>
                    <View style={styles.iconBar}>
                      
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                        <Text style={styles.subtitle}>event id {JSON.stringify(eventData)}</Text>

                        <Button title="Go to About" 
                        onPress={() => this.props.navigation.navigate('Today')}
                        />
                    </View>

                </ImageBackground>
                <View style={styles.container}>
                    <Text > teste
                     </Text>
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