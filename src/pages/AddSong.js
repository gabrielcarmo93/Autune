import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Picker, ToastAndroid, Keyboard, TouchableWithoutFeedback } from 'react-native'
import api from '../services/api'

class AddSong extends Component {
	state = {
		name: '',
		artist: '',
		key: '',
		theme: '',
	}

	formSubmit = async () => {
		data = this.state;
		api.post('music', {data})
		this.setState({ name: '', artist: '', key: '', theme: ''})
		this.props.navigation.state.params.callHome();
		this.props.navigation.navigate('Songs')
	}

	componentWillUnmount() {
		this.props.navigation.state.params.callHome();
	}
  render() {
    return (
    	<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>

				<Text style={styles.labels}>Nome</Text>
				<TextInput
					placeholder='Ex: Nunca foi sobre Nós'
					style={styles.inputs}
					onChangeText={(value) => this.setState({name: value}) }
					value={this.state.name}
				/>

				<Text style={styles.labels}>Artista</Text>
				<TextInput
					placeholder='Ex: Ministério Zoe'
					style={styles.inputs}
					onChangeText={(value) => this.setState({artist: value}) }
					value={this.state.artist}
				/>

				<Text style={styles.labels}>Tom</Text>
				<TextInput
					placeholder='Ex: F#m'
					style={styles.inputs}
					onChangeText={(value) => this.setState({key: value}) }
					value={this.state.key}
				/>

				<Text style={styles.labels}>Momento</Text>
				<Picker
					style={styles.inputsPicker}
					selectedValue={this.state.theme}
					onValueChange={(value) => {this.setState({theme: value}),Keyboard.dismiss}}
				>
					<Picker.Item label='' value='' />
					<Picker.Item label='Abertura' value='1' />
					<Picker.Item label='Abertura / Louvor' value='2' />
					<Picker.Item label='Louvor' value='3' />
					<Picker.Item label='Louvor / Pós Mensagem' value='4' />
					<Picker.Item label='Pós Mensagem' value='5' />
					<Picker.Item label='Louvor / Ofertório' value='6' />
					<Picker.Item label='Ofertório' value='7' />
				</Picker>

				<TouchableOpacity style={styles.submitButton} onPress={() => {this.formSubmit()} }>
					<Text style={styles.submitText}>Adicionar Música</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	labels: {
		color: '#666',
		fontStyle: 'italic',
		marginBottom: 5
	},
	inputs: {
		fontSize: 30,
		borderWidth: 0,
		marginBottom: 35,
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	inputsPicker: {
		borderWidth: 0,
		marginBottom: 35,
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	submitButton: {
		alignItems: 'stretch',
		backgroundColor: '#28a745',
		marginVertical: 10,
		paddingVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	submitText: {
		color: '#eee',
		fontSize: 20
	}
})

export default AddSong