import React, { Component } from 'react'
import Routes from './routes'
import api from './services/api'

export default class index extends Component {
	componentWillMount() {
		api.get('/')
	}
	render() {
		return (
			<Routes />
		)
	}
}