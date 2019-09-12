import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Routes from './routes'
import api from './services/api'

class index extends Component {
	componentWillMount() {
		api.get('/')
	}
	render() {
		return (
			<Routes/>
		)
	}
}

export default index