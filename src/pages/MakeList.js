import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import api from '../services/api'

let _this = null
 
class MakeList extends Component {
	static navigationOptions = {
		title: 'Escolha a Data',
		headerRight: (
			<TouchableOpacity onPress={() => _this.makeList()}>
				<Ionicons
					name='md-checkmark'
					style={{fontSize: 30, color: '#777', marginHorizontal: 10}}
				/>
			</TouchableOpacity>
		)
	}

	state: {
		date: '',
		inicio: '',
		louvor0: '',
		louvor1: '',
		louvor2: '',
		posMensagem: '',
		ofertorio: '',
	}

	changeDate = (date) => {
		this.setState({ date: date });
	}

	makeList = async () => {
		if(this.state.date !== undefined){
			const data = this.state
			await api.post('list', {data})
			this.props.navigation.navigate('List')
		} else {
			alert('Escolha uma data')
		}
	}

	getParams = () => {
		const list = this.props.navigation.state.params
		this.setState({
			inicio: list.inicio,
			louvor0: list.louvor0,
			louvor1: list.louvor1,
			louvor2: list.louvor2,
			posMensagem: list.posMensagem,
			ofertorio: list.ofertorio,
		})
	}
 
	componentDidMount() {
		this.getParams()
		_this = this;
	}

	render() {
		let minDate = new Date();
		return (
			<View style={styles.container}>
				<CalendarPicker
					startFromMonday={false}
					allowRangeSelection={false}
					minDate={minDate}
					weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
					months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
					previousTitle="Anterior"
					nextTitle="Próximo"
					todayBackgroundColor="#ddd"
					selectedDayColor="#694fad"
					selectedDayTextColor="#fff"
					scaleFactor={375}
					textStyle={{
						color: '#000000',
					}}
					onDateChange={function(date){
						_this.changeDate(date)
					}}
				/>

			</View>
		);
	}
}
 
const styles = StyleSheet.create({
	container: {

	},
});

export default MakeList