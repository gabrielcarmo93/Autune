import React, { Component } from 'react'
import { Modal, StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api'
import moment from 'moment'
import Share from 'react-native-share';
 
let _this


class DetailList extends Component {
	static navigationOptions = {
		title: 'Lista',
		headerRight: (
			<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
				<TouchableOpacity onPress={() => _this.saveList()}>
					<MaterialIcons
						name='save'
						style={{fontSize: 30, color: '#777', marginHorizontal: 10}}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => _this.shareList()}>
					<Ionicons
						name='md-share'
						style={{fontSize: 30, color: '#777', marginHorizontal: 10}}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	state = {
		_id: this.props.navigation.state.params.list._id,
		list: this.props.navigation.state.params.list.date,
		inicio: this.props.navigation.state.params.list.inicio,
		louvor0: this.props.navigation.state.params.list.louvor0,
		louvor1: this.props.navigation.state.params.list.louvor1,
		louvor2: this.props.navigation.state.params.list.louvor2,
		posMensagem: this.props.navigation.state.params.list.posMensagem,
		ceia: this.props.navigation.state.params.list.ceia,
		ofertorio: this.props.navigation.state.params.list.ofertorio,
		_ids: '',
		save: false,
		date: moment(this.props.navigation.state.params.list.date).format('DD/MM/YYYY')
	}

	async componentDidMount() {
		// this.registerToSocket()
		_this = this
	}

	componentWillUnmount() {
		this.props.navigation.state.params.callHome();
	}

	formSubmitDelete = async (id) => {
		await api.delete(`list/${id}`)
		this.props.navigation.navigate('List')
	}

	saveList = async () => {
		if(this.state.save){
			params = this.state
			await api.put(`list/${params._id}`, {list: params})
			this.props.navigation.navigate('List')
		} else {
			ToastAndroid.showWithGravityAndOffset(
				'Nenhuma alteração feita',
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
				25,
				150,
			);
		}
	}

	shareList = async () => {
		// Linking.openURL('whatsapp://send?text=hello');
		/*const shareOptions = {
			title: 'Share via',
			message: 'some message',
			url: 'some share url',
		};
		Share.shareSingle(shareOptions);*/
	}

	getIds (){
		let IDs = [
			this.state.inicio._id,
			this.state.louvor0._id,
			this.state.louvor1._id,
			this.state.louvor2._id,
			this.state.posMensagem._id,
			this.state.ceia._id,
			this.state.ofertorio._id,
		];
		this.setState({ _ids: IDs})
		return IDs
	}

	inicio = async () => {
		const response = await api.get('inicio', { params: {id:this.getIds()} })
		this.setState({ inicio: response.data, save: true })
	}

	louvor = async () => {
		const response = await api.get('louvor', { params: {id:this.getIds()} })
		this.setState({ louvor: response.data, save: true })
	}

	louvor0 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor0: response.data, save: true })
	}

	louvor1 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor1: response.data, save: true })
	}

	louvor2 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor2: response.data, save: true })
	}

	posMensagem = async () => {
		const response = await api.get('posMensagem', { params: {id:this.getIds()} })
		this.setState({ posMensagem: response.data, save: true })
	}

	ceia = async () => {
		const response = await api.get('posMensagem', { params: {id:this.getIds()} })
		this.setState({ ceia: response.data, save: true })
	}

	ofertorio = async () => {
		const response = await api.get('ofertorio', { params: {id:this.getIds()} })
		this.setState({ ofertorio: response.data, save: true })
	}

	component = (
		<View style={styles.container}>
			<TouchableOpacity style={styles.musicContainer}>
				<Text style={styles.h1}>{this.state.inicio.name}</Text>
				<Text style={styles.h2}>{this.state.inicio.artist} - {this.state.inicio.key}</Text>
			</TouchableOpacity>
			<View style={styles.musicContainer,{marginVertical: 19}}>
				<TouchableOpacity style={styles.innerButtonMusic}>
					<Text style={styles.h1}>{this.state.louvor0.name}</Text>
					<Text style={styles.h2}>{this.state.louvor0.artist} - {this.state.louvor0.key}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.innerButtonMusic}>
					<Text style={styles.h1}>{this.state.louvor1.name}</Text>
					<Text style={styles.h2}>{this.state.louvor1.artist} - {this.state.louvor1.key}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.innerButtonMusic}>
					<Text style={styles.h1}>{this.state.louvor2.name}</Text>
					<Text style={styles.h2}>{this.state.louvor2.artist} - {this.state.louvor2.key}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.musicContainer}>
				<Text style={styles.h1}>{this.state.posMensagem.name}</Text>
				<Text style={styles.h2}>{this.state.posMensagem.artist} - {this.state.posMensagem.key}</Text>
			</TouchableOpacity>
			{
				this.state.ceia ?
					<TouchableOpacity style={styles.musicContainer}>
						<Text style={styles.h1}>{this.state.ceia.name}</Text>
						<Text style={styles.h2}>{this.state.ceia.artist} - {this.state.ceia.key}</Text>
					</TouchableOpacity>
				:
					false
			}
			<TouchableOpacity style={styles.musicContainer}>
				<Text style={styles.h1}>{this.state.ofertorio.name}</Text>
				<Text style={styles.h2}>{this.state.ofertorio.artist} - {this.state.ofertorio.key}</Text>
			</TouchableOpacity>
		</View>
	)
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.musicContainer} onPress={() => this.inicio()}>
					<Text style={styles.h1}>{this.state.inicio.name}</Text>
					<Text style={styles.h2}>{this.state.inicio.artist} - {this.state.inicio.key}</Text>
				</TouchableOpacity>
				<View style={styles.musicContainer,{marginVertical: 19}}>
					<TouchableOpacity style={styles.innerButtonMusic} onPress={() => this.louvor0() }>
						<Text style={styles.h1}>{this.state.louvor0.name}</Text>
						<Text style={styles.h2}>{this.state.louvor0.artist} - {this.state.louvor0.key}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.innerButtonMusic} onPress={() => this.louvor1() }>
						<Text style={styles.h1}>{this.state.louvor1.name}</Text>
						<Text style={styles.h2}>{this.state.louvor1.artist} - {this.state.louvor1.key}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.innerButtonMusic} onPress={() => this.louvor2() }>
						<Text style={styles.h1}>{this.state.louvor2.name}</Text>
						<Text style={styles.h2}>{this.state.louvor2.artist} - {this.state.louvor2.key}</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.musicContainer} onPress={() => this.posMensagem()}>
					<Text style={styles.h1}>{this.state.posMensagem.name}</Text>
					<Text style={styles.h2}>{this.state.posMensagem.artist} - {this.state.posMensagem.key}</Text>
				</TouchableOpacity>
				{
					this.state.ceia ?
						<TouchableOpacity style={styles.musicContainer} onPress={() => this.ceia()}>
							<Text style={styles.h1}>{this.state.ceia.name}</Text>
							<Text style={styles.h2}>{this.state.ceia.artist} - {this.state.ceia.key}</Text>
						</TouchableOpacity>
					:
						false
				}
				<TouchableOpacity style={styles.musicContainer} onPress={() => this.ofertorio()}>
					<Text style={styles.h1}>{this.state.ofertorio.name}</Text>
					<Text style={styles.h2}>{this.state.ofertorio.artist} - {this.state.ofertorio.key}</Text>
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
	h1: {
		fontSize: 25,
		fontWeight: '400',
	},
	h2: {
		fontSize: 12,
		color: '#777',
		marginBottom: 10,
	},
	musicContainer: {
		marginVertical: 19,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	innerButtonMusic: {
		alignItems: 'center'
	}
})

export default DetailList