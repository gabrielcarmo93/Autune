import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
//import Ionicons from 'react-native-vector-icons/Ionicons'

class Home extends Component {

	componentDidMount() {
		// StatusBar.setHidden(true);
	}

	doTheMagic = () => {
		this.props.navigation.navigate('Magic')
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.magicButton} onPress={() => this.doTheMagic()}>
					<Icon style={styles.magicText} name='md-microphone' />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	magicButton: {
		borderWidth: 1,
		borderColor:'#7647a2',
		alignItems:'center',
		justifyContent:'center',
		width:100,
		height:100,
		backgroundColor:'#885ead',
		borderRadius:50,
	},
	magicText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: '400',
		color: '#eee',
		fontSize: 50
	},
})


export default Home