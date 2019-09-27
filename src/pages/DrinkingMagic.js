import React, { Component } from 'react'
import { Modal, StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import api from '../services/api'
// import { Swiper, Slide, MyPrevButton, MyNextButton } from 'react-dynamic-swiper'
/*import 'react-dynamic-swiper/lib/styles.css'
import LeftArrowButton from '../components/LeftArrowButton'
import RightArrowButton from '../components/RightArrowButton'*/

let _this = null

class Magic extends Component {
	static navigationOptions = {
		title: 'Lista de Músicas',
		headerRight: (
			<TouchableOpacity onPress={() => _this.makeList()}>
				<Ionicons
					name='md-arrow-forward'
					style={{fontSize: 30, color: '#777', marginHorizontal: 20}}
				/>
			</TouchableOpacity>
		)
	}


	state = {
		inicio: '',
		louvor: '',
		louvor0: '',
		louvor1: '',
		louvor2: '',
		posMensagem: '',
		ceia: '',
		ofertorio: '',
		imageURI: null,
		_ids: '',
		slides: []
	}

	loadData = async () => {
		this.inicio()
		this.louvor0()
		this.louvor1()
		this.louvor2()
		this.posMensagem()
		this.ceia()
		this.ofertorio()
		this.louvor()
	}

	inicio = async () => {
		const response = await api.get('inicio', { params: {id:this.getIds()} })
		this.setState({ inicio: response.data })
	}

	louvor = async () => {
		const response = await api.get('louvor', { params: {id:this.getIds()} })
		this.setState({ slides: response.data })
	}

	louvor0 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor0: response.data })
	}

	louvor1 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor1: response.data })
	}

	louvor2 = async () => {
		const response = await api.get('umLouvor', { params: {id:this.getIds()} })
		this.setState({ louvor2: response.data })
	}

	posMensagem = async () => {
		const response = await api.get('posMensagem', { params: {id:this.getIds()} })
		this.setState({ posMensagem: response.data })
	}

	ceia = async () => {
		const response = await api.get('posMensagem', { params: {id:this.getIds()} })
		this.setState({ ceia: response.data })
	}

	ofertorio = async () => {
		const response = await api.get('ofertorio', { params: {id:this.getIds()} })
		this.setState({ ofertorio: response.data })
	}

	makeList () {
		this.props.navigation.navigate('MakeList', {
			inicio: this.state.inicio,
			louvor0: this.state.louvor0,
			louvor1: this.state.louvor1,
			louvor2: this.state.louvor2,
			posMensagem: this.state.posMensagem,
			ceia: this.state.ceia,
			ofertorio: this.state.ofertorio,
		})
		this.getIds()
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

	getView = async () => {
		this.refs.viewShot.capture().then(uri => {
			console.log("do something with ", uri);
			_this.setState({ imageURI: 'bonita' })
			Share.share({
				message: 'React Native | A framework for building native apps using React',
			});
		});
	}

	componentWillMount() {
		this.loadData()
	}

	componentDidMount() {
		_this = this
	}
	render() {
		const { slides } = this.state

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
				<TouchableOpacity style={styles.musicContainer} onPress={() => this.ceia()}>
					<Text style={styles.h1}>{this.state.ceia.name}</Text>
					<Text style={styles.h2}>{this.state.ceia.artist} - {this.state.ceia.key}</Text>
				</TouchableOpacity>
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
		fontSize: 22.5,
		fontWeight: '400',
	},
	h2: {
		fontSize: 10.8,
		color: '#777',
		marginBottom: 9,
	},
	musicContainer: {
		marginVertical: 13.3,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	innerButtonMusic: {
		alignItems: 'center'
	}
});

export default Magic