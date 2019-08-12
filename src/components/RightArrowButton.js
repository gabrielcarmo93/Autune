import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class RightArrowButton extends Component {
	render() {
		return (
			<TouchableOpacity

			>
				<Ionicons
					name='ios-arrow-back'
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


export default RightArrowButton