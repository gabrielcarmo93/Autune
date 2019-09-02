import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//import Ionicons from 'react-native-vector-icons/Ionicons'

class Home extends Component {

	componentDidMount() {
		// StatusBar.setHidden(true);
	}

	doDrinkingTheMagic = () => {

	}

	render() {
		return (
			<View style={styles.container}>
					<TouchableOpacity style={styles.magicButton} onPress={() => this.props.navigation.navigate('Magic')}>
						<Ionicon style={styles.magicText} name='md-microphone' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.secondMagicButton} onPress={() => this.props.navigation.navigate('DrinkingMagic')}>
						<MaterialCommunityIcons style={styles.secondMagicText} name='glass-tulip' />
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
		width: 100,
		height: 100,
		backgroundColor:'#885ead',
		borderRadius: 50,
		marginBottom: 5
	},
	secondMagicButton: {
		borderWidth: 1,
		borderColor:'#7647a2',
		alignItems:'center',
		justifyContent:'center',
		width: 50,
		height: 50,
		backgroundColor:'#885ead',
		borderRadius: 50,
		marginTop: 5
	},
	magicText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: '400',
		color: '#eee',
		fontSize: 50
	},
	secondMagicText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: '400',
		color: '#eee',
		fontSize: 25
	},
	buttonsView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})


export default Home