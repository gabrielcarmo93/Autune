import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, List, RefreshControl, Alert } from 'react-native'
import api from '../services/api'
import moment from 'moment'
import Constants from 'expo-constants';
// import { getStatusBarHeight } from 'react-native-status-bar-height'
import { withNavigationFocus } from 'react-navigation'

let _this;

class Lists extends Component {
	static navigationOptions = {
		title: 'Listas',
	}

	state = {
		lists: [],
		refreshing: false,
		loading: false,
	}

	componentDidMount() {
		this.loadData()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused !== this.props.isFocused) {
			this.loadData()
		}	
	}

	loadData = async () => {
		// this.registerToSocket()
		const response = await api.get('lists')
		this.setState({ lists: response.data, refreshing: false })
	}

	handleRefresh = () => {
		this.setState({ refreshing: true }, () => {
			this.loadData()
		})
	}

	detailsList = async (item) => {
		this.props.navigation.navigate('DetailList', {list: item, callHome:this.loadData.bind(this)} )
	}

	deleteList = async (id) => {
		await api.delete(`list/${id}`)
		this.loadData()
	}

	grita = () => {
		alert('AAAAAAAAAH')
	}

	longPressDelete = async (id, name) => {
		Alert.alert(
			'Excluir Lista?',
			moment(name).format('DD/MM/YYYY'),
			[
				{
					text: 'Confirmar',
					onPress: () => this.deleteList(id),
					style: 'cancel',
				},
			],
			{cancelable: true},
		)
	}

	handleDoubleClick = async () => {
		alert('DoubleClickou!')
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.lists}
					keyExtractor={lists => lists._id}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.lists} onPress={() => this.detailsList(item) } onLongPress={() => this.longPressDelete(item._id, item.date)}>
							<View style={styles.innerView}>
								<Text style={styles.h1}>{moment(item.date).format('DD/MM/YYYY')}</Text>
								<Text style={styles.h2} numberOfLines={1} ellipsizeMode='middle'>
									Início: {item.inicio.name} / Louvor: {item.louvor0.name}, {item.louvor1.name}, {item.louvor2.name} / Pós Mensagem: {item.posMensagem.name} / {item.ceia ? `Ceia: ${item.ceia.name}` : false } Ofertório: {item.ofertorio.name}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
						/>
					}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		justifyContent: 'center',
	},
	magicButton: {
		borderWidth: 1,
		borderColor:'#7647a2',
		alignItems:'center',
		justifyContent:'center',
		width:100,
		height:100,
		backgroundColor:'#885ead',
		borderRadius:50,
	},
	lists: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 0.5,
		borderColor: '#ddd',
		paddingHorizontal: 15
,		paddingVertical: 10,
		minHeight: 87.05,
	},
	h1: {
		fontWeight: '100',
		fontSize: 35,
		marginVertical: 5
	},
	h2: {
		fontWeight: '100',
		fontSize: 8,
		color: '#666'
	},
	innerView: {
		flex:1,

	},
	spcbtw: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	}
})


export default Lists