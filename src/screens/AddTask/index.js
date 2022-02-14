import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {getAllEvents} from 'services/EventsService/index';
import {getAllStudents} from 'services/StudentsService/index';

import {styles} from './styles';

const AddTask = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState('');
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const isAndroid = Platform.OS === 'android';

  // Ai cria pros outros tb, etc
  // eventtype: '',
  // studentsDropDown: '',
  // startedAt:'',
  // endedAt:'',
  // Obs: 'teste',
  // eventType: '',
  // student: '',
  // evtSelected: '',
  // studentselected: ''

  useEffect(() => {
    getEvents();
    getStudents();
  }, []);

  const getEvents = async () => {
    getAllEvents()
      .then(result => setStudents(result.data))
      .catch(() => {
        // alert('deu banana na sua request paizao')
      });
  };

  const getStudents = async () => {
    getAllStudents()
      .then(result => setStudents(result.data))
      .catch(() => {
        // alert('deu banana na sua request paizao')
      });
  };

  const onDateChange = (_, date) => {
    setDate(date);
    setShowDatePicker(false);
  };

  const onPressSave = () => {
    // vai chamar a funcao q cria o objeto
    // vai chamar o serviço e pedir pra fazer o post
    // vai mostrar o resultado pro boneco
    // questão de validação fica tudo pelo form, vc pode usar o useForm por exemplo, é bem simples, mas eu não tenho exemplo fácil agora
  };

  const DatePicker = () => {
    const dateString = moment(date).format('dddd. D [de] MMMM [de] YYYY');

    if (isAndroid) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    <DateTimePicker value={date} onChange={onDateChange} mode="date" />;
  };

  const StudentsPicker = () => {
    return (
      <Autocomplete
        data={data}
        value={query}
        onChangeText={text => this.setState({query: text})}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({item}) => <Text>{item}</Text>,
        }}
      />
    );
  };

  const EventsPicker = () => {
    // repara que esse autocomplete poderia ser reciclado, um componente separado que recebe as coisas e é usado por 500 lugares diferentes
    return (
      <Autocomplete
        data={data}
        value={query}
        onChangeText={text => this.setState({query: text})}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({item}) => <Text>{item}</Text>,
        }}
      />
    );
  };

  return (
    <Modal
      transparent={true}
      visible={this.props.isVisible}
      onRequestClose={this.props.onCancel}
      animationType="slide">
      <TouchableWithoutFeedback onPress={this.props.onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Novo Evento</Text>

        <DatePicker />
        <EventsPicker />
        <StudentsPicker />

        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.props.onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSave}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={this.props.onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;
