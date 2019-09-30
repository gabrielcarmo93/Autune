import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, List, RefreshControl, Alert, ActivityIndicator } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import api from '../services/api'

let _this = null

class Songs extends Component {
	static navigationOptions = {
		title: 'Músicas',
		headerRight: (
			<TouchableOpacity onPress={() => _this.addSong()}>
				<Ionicons
					name='md-add-circle'
					style={{fontSize: 30, color: '#777', marginHorizontal: 15, color: '#5cb85c'}}
				/>
			</TouchableOpacity>
		)
	}
	state = {
		musicas: [],
		refreshing: false,
		loading: true,
	}

	componentDidMount() {
		_this = this
		this.loadData()
	}

	componentWillUnmount() {
		this.setState({ musicas: [] })
	}

	loadData = async () => {
		this.setState({ loading: true })
		const response = await api.get('musics')
		this.setState({ musicas: response.data, refreshing: false, loading: false })
	}

	handleRefresh = () => {
		this.setState({ refreshing: true, loading: true }, () => {
			this.loadData()
		})
	}

	detailsSong = async (item) => {
		this.props.navigation.navigate('DetailSong', {item: item, callHome:this.loadData.bind(this)} )
	}

	addSong () {
		this.props.navigation.navigate('AddSong', {callHome:this.loadData.bind(this)} )
	}

	deleteSong = async (id) => {
		await api.delete(`music/${id}`)
		this.loadData()
	}

	grita = () => {
		alert('AAAAAAAAAH')
	}

	longPressDelete = async (id, name) => {
		Alert.alert(
			'Excluir Música?',
			name,
			[
				{
					text: 'Confirmar',
					onPress: () => this.deleteSong(id),
					style: 'cancel',
				},
			],
			{cancelable: true},
		)
	}

	render() {
		return (
			<>
				<View style={this.state.loading ? {} : {display:'none'} }>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>

				<View style={styles.container, this.state.loading ? {display:'none'} : {} }>
					<FlatList
						data={this.state.musicas}
						keyExtractor={musicas => musicas._id}
						renderItem=	{({ item }) => (
							<TouchableOpacity style={styles.musicList} onPress={() => this.detailsSong( item ) } onLongPress={() => this.longPressDelete(item._id, item.name)}>
								<View style={styles.innerView}>
									<Text style={styles.h1}>{item.name}</Text>
									<Text style={styles.h2}>{item.artist}</Text>
									<View style={styles.spcbtw}>
										<Text style={styles.h2}>{(() => {
		                					switch(item.theme) {
		                						case '1':
		                							return 'Início'
		                							break
		                						case '2':
		                							return 'Início / Louvor'
		                							break
		                						case '3':
		                							return 'Louvor'
		                							break
		                						case '4':
		                							return 'Louvor / Pós Mensagem'
		                							break
		                						case '5':
		                							return 'Pós Mensagem'
		                							break
		                						case '6':
		                							return 'Louvor / Ofertório'
		                							break
		                						case '7':
		                							return 'Ofertório'
		                							break
		            							default:
		            								return 'Sem tema'
		                					}
		            					})()}
		        						</Text>
										<Text style={styles.h2}>{item.key}</Text>
									</View>
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
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
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
	musicList: {
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
		fontSize: 30
	},
	h2: {
		fontSize: 13,
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


export default Songs