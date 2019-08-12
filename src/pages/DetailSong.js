import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Picker, FlatList, TextInput, Keyboard, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import api from '../services/api'

class DetailSong extends Component {
	state = {
		id: this.props.navigation.state.params.item._id,
		name: this.props.navigation.state.params.item.name,
		artist: this.props.navigation.state.params.item.artist,
		key: this.props.navigation.state.params.item.key,
		theme: this.props.navigation.state.params.item.theme,
	}

	async componentDidMount() {
		// this.registerToSocket()
	}

	componentWillUnmount() {
		this.props.navigation.state.params.callHome();
	}

	formSubmitUpdate = async (id) => {
		await api.put(`music/${this.state.id}`, {music: this.state})
		this.props.navigation.state.params.callHome();
		this.props.navigation.navigate('Songs')
	}

	formSubmitDelete = async (id) => {
		await api.delete(`music/${this.state.id}`)
		this.props.navigation.state.params.callHome();
		this.props.navigation.navigate('Songs')
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.outView}>
				<ScrollView style={styles.container}>

					<Text style={styles.labels}>Nome</Text>
					<TextInput
						placeholder='Ex: Nunca foi sobre Nós'
						style={styles.inputs}
						value={this.state.name}
						onChangeText={(value) => this.setState({name: value}) }
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
						selectedValue={this.state.momento}
						onValueChange={(value) => this.setState({theme: value})}
						selectedValue={this.state.theme}
					>
						<Picker.Item label='Escolha um momento...' value='' />
						<Picker.Item label='Abertura' value='1' />
						<Picker.Item label='Abertura / Louvor' value='2' />
						<Picker.Item label='Louvor' value='3' />
						<Picker.Item label='Louvor / Pós Mensagem' value='4' />
						<Picker.Item label='Pós Mensagem' value='5' />
						<Picker.Item label='Louvor / Ofertório' value='6' />
						<Picker.Item label='Ofertório' value='7' />
					</Picker>

					<TouchableOpacity style={styles.submitButton} onPress={() => this.formSubmitUpdate(this.state.id)}>
						<Text style={styles.submitText}>Editar Música</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.deleteButton} onPress={() => this.formSubmitDelete(this.state.id)}>
						<Text style={styles.submitText}>Excluir Música</Text>
					</TouchableOpacity>
				</ScrollView>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 25,
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
		backgroundColor: '#428bca',
		marginVertical: 5,
		paddingVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	deleteButton: {
		alignItems: 'stretch',
		backgroundColor: '#d9534f',
		marginTop: 5,
		marginBottom: 25,
		paddingVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	submitText: {
		color: '#eee',
		fontSize: 20
	},
})

export default DetailSong