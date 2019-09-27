import React from 'react'
import { StatusBar } from 'react-native'
import App from './src/'

export default function Main() {
	return (
		<>
			<StatusBar
				hidden={true}
			/>
			<App />
		</>
	)
}