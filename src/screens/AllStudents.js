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

import { server, showError } from '../common'
import AsyncStorage from "@react-native-community/async-storage"
import AddTask from './AddTask'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import StudentItemList from '../components/StudentItemList'


const initialState = { 
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks:[]
}

export default class AllStudents extends Component{
    state = {
       ...initialState
    }

    componentDidMount = async () =>{
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadStudents()
    }

    loadStudents = async () => {
        try{
            
            const res = await axios.get(`${server}/students`)
            this.setState({students: res.data}, this.filterTasks)
        }catch(e){
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending) 
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async taskId => {
        try{
            await axios.put(`${server}/task/${taskId}/toggle`)
            this.loadStudents()
        }catch(e){
            showError(e)
        }
    }

    addTask = async newTask =>{
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos','Descrição não informada!')
            return
        }

        try{
           
            await axios.post(`${server}/tasks`,{
                desc: newTask.desc,
                date: newTask.date
            })           

            this.setState({ showAddTask: false}, this.loadStudents)

        }catch(e){
            showError(e)
        }
        
       
    }

    deleteTask = async taskId => {

        try{           
            await axios.delete(`${server}/tasks/${taskId}`)           
            this.loadStudents()
        }catch(e){
            showError(e)
        }
        
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
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({showAddTask: false})}
                    onSave={this.addTask}/>
                <ImageBackground source={this.getImage()}
                style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                            <Icon name='bars' 
                            size={20} color={commonStyles.colors.secundary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                            size={20} color={commonStyles.colors.secundary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>

                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.students}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item})=> <StudentItemList {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                        />
                </View>
                <TouchableOpacity style={
                    [styles.addButton, 
                    {backgroundColor: this.getColor()}]}
                    onPress={()=> this.setState({showAddTask: true})}
                    activeOpacity={0.7}>
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secundary}/>
                </TouchableOpacity>
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