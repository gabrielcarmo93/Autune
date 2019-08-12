import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, StackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import moment from 'moment'

import HomePage from './pages/Home'
import AddSongPage from './pages/AddSong'
import DetailSongPage from './pages/DetailSong'
import DetailListPage from './pages/DetailList'
import ListPage from './pages/List'
import MakeListPage from './pages/MakeList'
import MagicPage from './pages/Magic'
import SongsPage from './pages/Songs'
import TestPage from './pages/Test'

const HomeGroup = createStackNavigator({
	Home: {
		screen: HomePage,
		navigationOptions: ({ navigation }) => ({
			title: 'Autune',
			header: null
		}),
	},
	Magic: {
		screen: MagicPage,
	},
	MakeList: {
		screen: MakeListPage,
	},
},{
	initalRouteName: 'Home'
})

const ListGroup = createStackNavigator({
	List: {
		screen: ListPage,
		navigationOptions: ({ navigation }) => ({
			title: 'Listas',
			header: null
		}),
	},
	DetailList: {
		screen: DetailListPage,
		navigationOptions: ({ navigation }) => ({
			title: moment(navigation.state.params.list.date).format('DD/MM/YYYY'),
			// header: null
		}),
	},
},{
	initalRouteName: 'List'
})

const SongGroup = createStackNavigator({
	Songs: {
		screen: SongsPage,
	},
	AddSong: {
		screen: AddSongPage,
		navigationOptions: ({ navigation }) => ({
			title: 'Adicionar Música',
		}),
	},
	DetailSong: {
		screen: DetailSongPage,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.item.name,
			// header: null
		}),
	},
	Test: {
		screen: TestPage
	}
},{
	initalRouteName: 'DetailSong'
})

export default createAppContainer(
	createMaterialBottomTabNavigator({
		Home: {
			screen: HomeGroup,
			navigationOptions: {
				labeled: false,
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons style={[{color: tintColor}]} size={25} name={'md-home'}/>
					</View>
				),
			}
		},
		List: {
			screen: ListGroup,
			navigationOptions: {
				labeled: false,
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons style={[{color: tintColor}]} size={25} name={'md-list-box'}/>
					</View>
				),
				activeColor: '#f7f7f7',  
				inactiveColor: '#777',  
				barStyle: { backgroundColor: '#292b2c' },  
			}
		},
		Song: {
			screen: SongGroup,
			navigationOptions: {
				labeled: false,
				tabBarIcon: ({ tintColor }) => (
					<View>
						<Ionicons style={[{color: tintColor}]} size={25} name={'md-musical-notes'}/>
					</View>
				),
				activeColor: '#f7f7f7',  
				inactiveColor: '#333',  
				barStyle: { backgroundColor: '#236b38' },  
			}
		},
	},{
		initialRouteName: 'Home',
		activeColor: '#f0edf6',
		inactiveColor: '#3e2465',
		barStyle: { backgroundColor: '#694fad' },
	})
)