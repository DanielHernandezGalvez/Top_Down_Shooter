import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';

const App: React.FC = () => {
  const [opciones, setOpciones] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const seleccionarOpcion = () => {
    const opcionesArray = opciones.split(',');
    const opcionAleatoria =
      opcionesArray[Math.floor(Math.random() * opcionesArray.length)];

    setOpcionSeleccionada(opcionAleatoria);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selector Aleatorio</Text>
      <View style={styles.texTutorial}>
        <Text style={styles.tutorial}>Separa las opciones con una coma</Text>
      </View>
      <TextInput
        placeholder="Ejemplo: pizza, sushi, tacos"
        value={opciones}
        onChangeText={(texto) => setOpciones(texto)}
        style={styles.input}
        numberOfLines={5}
        multiline={true}
        scrollEnabled={true}
        borderColorActive="#f19601"
      />
      <TouchableOpacity style={styles.button} onPress={seleccionarOpcion}>
        <Text style={styles.textButton}> Seleccionar Opcion </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textSelected}>La opción seleccionada es:</Text>
            <Text style={styles.selected}>{opcionSeleccionada}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.modalClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: '10vw',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 30,
    color: '#f19601',
  },
  texTutorial: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingStart:"8%"
  },
  tutorial: {
    color: '#575e55',
    marginBottom: 7,
  },
  input: {
    width: '88%',
    height: 190,
    borderColor: '#e7edea',
    borderWidth: 3,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: '5vw',
    fontWeight: 500,
    color: '#575e55',
    backgroundColor: '#e7edea',
    borderColorActive: '#f19601',
  },
  button: {
    width: 200,
    height: 'auto',
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f19601',
  },
  textButton: {
    color: '#e7edea',
    textAlign: 'center',
    marginVertical: 'auto',
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textSelected: {
    marginVertical: 30,
  },
  modalClose: {
    marginTop: 30,
    bottom: 10,
    color: 'blue',
  },
  selected: {
    marginVertical: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
