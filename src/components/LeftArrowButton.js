import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class LeftArrowButton extends Component {
	render() {
		return (
			<TouchableOpacity

			>
				<Ionicons
					name='ios-arrow-forward'
					style={styles.arrow}
				/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	arrow: {
		color: '#777',
		fontSize: 30,
	}
})


export default LeftArrowButton