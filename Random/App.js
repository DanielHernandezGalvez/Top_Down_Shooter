import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';

const App = () => {
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
      <TextInput
        placeholder="Ingrese las opciones separadas por comas"
        value={opciones}
        onChangeText={(texto) => setOpciones(texto)}
        style={styles.input}
        numberOfLines={5}
        multiline={true}
        scrollEnabled={true}
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
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '88%',
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  button: {
    width: 200,
    height: 'auto',
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 'auto',
    fontSize: 19,
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
