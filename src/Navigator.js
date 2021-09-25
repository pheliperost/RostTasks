import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import {createDrawerNavigator} from 'react-navigation-drawer'
import Auth from './screens/Auth'
//import TaskList from './screens/TaskList'
import EventList from './screens/EventList'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'
import Students from './screens/Students'
import AllStudents from './screens/AllStudents'

const menuConfig ={
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions:{
        labelStyle:{
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle:{
            color: '#080',
            fontWeight: 'bold',

        }
    }
}

const menuRoutes = {
    Today:{
        name: 'Today',
        screen: props => <EventList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions:{
            title: 'Hoje'
        }
        
    },
    Tomorrow:{
        name: 'Tomorrow',
        screen: props => <EventList title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions:{
            title: 'Amanhã'
        }
        
    },
    Week:{
        name: 'Week',
        screen: props => <EventList title='Semana' daysAhead={7} {...props} />,
        navigationOptions:{
            title: 'Semana'
        }
        
    },
    Month:{
        name: 'Month',
        screen: props => <EventList title='Mês' daysAhead={30} {...props} />,
        navigationOptions:{
            title: 'Mês'
        }
        
    },
    Students:{
        name: 'Students',
        screen: props => <Students title='STu' {...props} />,
        navigationOptions:{
            title: 'Alunos'
        }
        
    },
    AllStudents:{
        name: 'Students',
        screen: props => <AllStudents title='Todos Alunos' {...props} />,
        navigationOptions:{
            title: 'Todos Alunos'
        }
        
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const MainRoutes = {
    Auth:{
        name: 'Auth',
        screen: Auth
    },
    Home:{
        name: 'Home',
        screen: menuNavigator
    }

}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'
})
export default createAppContainer(MainNavigator)