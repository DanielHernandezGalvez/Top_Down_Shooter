/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [gastos, setGastos] = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [modalGasto, setModalGasto] = useState(false);
  const [modalIngreso, setModalIngreso] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [registros, setRegistros] = useState([]);

  const handleGastos = () => {
    const newGastos = gastos + parseFloat(cantidad);
    setGastos(newGastos);
    // setMenos(newGastos);
    setModalGasto(false);
    saveRegistro({tipo: 'Gasto', cantidad, descripcion});
  };

  const handleIngresos = () => {
    const newIngresos = ingresos + parseFloat(cantidad);
    setIngresos(newIngresos);
    // setMas(newIngresos);
    setModalIngreso(false);
    saveRegistro({tipo: 'Ingreso', cantidad, descripcion});
  };

  const handleResta = () => {
    return ingresos - gastos;
  };

  const saveRegistro = async registro => {
    try {
      const registrosStorage = await AsyncStorage.getItem('registros');
      let parsedRegistros = [];
      if (registrosStorage) {
        parsedRegistros = JSON.parse(registrosStorage);
      }
      parsedRegistros.push(registro);
      await AsyncStorage.setItem('registros', JSON.stringify(parsedRegistros));
      setRegistros(parsedRegistros);
    } catch (error) {
      console.error('Error al guardar el registro:', error);
    }
  };

  const saveTotales = async (gastos, ingresos) => {
    try {
      await AsyncStorage.setItem('gastos', gastos.toString());
      await AsyncStorage.setItem('ingresos', ingresos.toString());
    } catch (error) {
      console.error('Error al guardar los totales:', error);
    }
  };

  const deleteRegistro = async index => {
    const deletedRegistro = registros[index];
    const updatedRegistros = registros.filter((registro, i) => i !== index);
    setRegistros(updatedRegistros);

    if (deletedRegistro.tipo === 'Gasto') {
      const newGastos = gastos - parseFloat(deletedRegistro.cantidad);
      setGastos(newGastos);
      saveTotales(newGastos, ingresos);
    } else if (deletedRegistro.tipo === 'Ingreso') {
      const newIngresos = ingresos - parseFloat(deletedRegistro.cantidad);
      setIngresos(newIngresos);
      saveTotales(gastos, newIngresos);
    }
    try {
      await AsyncStorage.setItem('registros', JSON.stringify(updatedRegistros));
    } catch (error) {
      console.error('Error al guardar los registros:', error);
    }
  };

  const loadRegistros = async () => {
    try {
      const registrosStorage = await AsyncStorage.getItem('registros');
      if (registrosStorage) {
        const parsedRegistros = JSON.parse(registrosStorage);
        setRegistros(parsedRegistros); // Actualizar el estado utilizando parsedRegistros
      }
    } catch (error) {
      console.error('Error al cargar los registros:', error);
    }
  };

  const resetInputs = () => {
    setCantidad('');
    setDescripcion('');
  };

  const getRegistroBackgroundColor = tipo => {
    return tipo === 'Gasto' ? '#ddd' : '#fff';
  };

  useEffect(() => {
    loadRegistros();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.capital}>
        <Text style={[styles.p, styles.text]}>Capital: </Text>
        <Text style={[styles.h1, styles.text]}> $ {handleResta()}</Text>
      </View>

      <View style={styles.operaciones}>
        <View style={styles.gastos}>
          <Text style={[styles.text, styles.p]}>Gastos: </Text>
          <Text style={[styles.text, styles.numero]}>$ {gastos}</Text>
        </View>
        <View style={styles.ingresos}>
          <Text style={[styles.text, styles.p]}>Ingresos: </Text>
          <Text style={[styles.text, styles.numero]}>$ {ingresos}</Text>
        </View>
      </View>

      <ScrollView style={styles.section}>
        {registros === 0 ? (
          <Text>Sin registos</Text>
        ) : (
          <>
            {registros.map((registro, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: getRegistroBackgroundColor(registro.tipo),
                }}>
                <Text>
                  {registro.tipo}: {registro.cantidad} - {registro.descripcion}
                </Text>
                <Button
                  title="Eliminar"
                  onPress={() => deleteRegistro(index)}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.operaciones}>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => setModalIngreso(true)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => setModalGasto(true)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalIngreso}
        animationType="slide"
        transparent={true}
        onShow={resetInputs}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', padding: 20}}>
            <TextInput
              placeholder="Cantidad"
              onChangeText={num => setCantidad(num)}
              value={cantidad}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Descripción"
              onChangeText={text => setDescripcion(text)}
              value={descripcion}
              keyboardType="text"
            />
            <Button
              title="Agregar Ingresos"
              onPress={handleIngresos}
              disabled={cantidad === 0}
            />
            <Button title="Cerrar" onPress={() => setModalIngreso(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalGasto}
        animationType="slide"
        transparent={true}
        onShow={resetInputs}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', padding: 20}}>
            <TextInput
              placeholder="Cantidad"
              onChangeText={num => setCantidad(num)}
              value={cantidad}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Descripción"
              onChangeText={text => setDescripcion(text)}
              value={descripcion}
              keyboardType="text"
            />
            <Button
              title="Agregar Gastos"
              onPress={handleGastos}
              disabled={cantidad === 0}
            />
            <Button title="Cerrar" onPress={() => setModalGasto(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capital: {
    backgroundColor: '#0089BA',
    margin: 20,
    width: '90%',
    height: 70,
    borderRadius: 5,
  },
  section: {
    width: '90%',
    maxHeight: '55%',
    backgroundColor: '#ddd',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 20,
  },
  h1: {
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: 'auto',
  },
  p: {
    margin: 5,
    position: 'absolute',
  },
  operaciones: {
    flexDirection: 'row',
    gap: 30,
    paddingVertical: 20,
  },
  gastos: {
    backgroundColor: '#CD5D5C',
    height: 50,
    width: '41%',
    borderRadius: 5,
  },
  ingresos: {
    backgroundColor: '#009466',
    height: 50,
    width: '41%',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
  },
  numero: {
    textAlign: 'center',
    fontSize: 20,
    margin: 11,
  },
  circularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default App;
