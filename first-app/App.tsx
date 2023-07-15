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
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Registro {
  tipo: string;
  cantidad: string;
  descripcion: string;
}

const App: React.FC = () => {
  const [gastos, setGastos] = useState<number>(0);
  const [ingresos, setIngresos] = useState<number>(0);
  const [modalGasto, setModalGasto] = useState<boolean>(false);
  const [modalIngreso, setModalIngreso] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [registros, setRegistros] = useState<Registro[]>([]);

  const handleGastos = () => {
    const newGastos = gastos + parseFloat(cantidad);
    setGastos(newGastos);
    setModalGasto(false);
    saveRegistro({tipo: 'Gasto', cantidad, descripcion});
  };

  const handleIngresos = () => {
    const newIngresos = ingresos + parseFloat(cantidad);
    setIngresos(newIngresos);
    setModalIngreso(false);
    saveRegistro({tipo: 'Ingreso', cantidad, descripcion});
  };

  const handleResta = (): number => {
    return ingresos - gastos;
  };

  const saveRegistro = async (registro: Registro) => {
    try {
      const registrosStorage = await AsyncStorage.getItem('registros');
      let parsedRegistros: Registro[] = [];
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

  const saveTotales = async (gastos: number, ingresos: number) => {
    try {
      await AsyncStorage.setItem('gastos', gastos.toString());
      await AsyncStorage.setItem('ingresos', ingresos.toString());
    } catch (error) {
      console.error('Error al guardar los totales:', error);
    }
  };

  const deleteRegistro = async (index: number) => {
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
        const parsedRegistros: Registro[] = JSON.parse(registrosStorage);
        setRegistros(parsedRegistros);
      }
    } catch (error) {
      console.error('Error al cargar los registros:', error);
    }
  };

  const resetInputs = () => {
    setCantidad('');
    setDescripcion('');
  };

  const getRegistroBackgroundColor = (tipo: string): string => {
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
        {registros.length === 0 ? (
          <Text style={styles.SinRegistros}>Sin registros</Text>
        ) : (
          <>
            {registros.map((registro, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{width: '70%'}}>
                  <Text style={{alignItems: 'center'}}>
                    {registro.tipo === 'Ingreso' ? (
                      <Text style={styles.Mas}>+</Text>
                    ) : (
                      <Text style={styles.Menos}>-</Text>
                    )}
                    <Text style={styles.Dinero}> ${registro.cantidad}</Text>{' '}
                    <Text style={styles.description}>
                      - {registro.descripcion}
                    </Text>
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={() => deleteRegistro(index)}>
                    <Text style={styles.textBtn}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
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
        <View style={styles.modal}>
          <View style={{backgroundColor: 'white', padding: 50}}>
            <TextInput
              placeholder="Cantidad"
              onChangeText={num => setCantidad(num)}
              value={cantidad}
              keyboardType="numeric"
              style={styles.inputModal}
            />
            <TextInput
              placeholder="Descripción"
              onChangeText={text => setDescripcion(text)}
              value={descripcion}
              keyboardType="default"
              style={styles.inputModal}
            />
            <View
              style={{
                marginTop: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={handleIngresos}
                disabled={cantidad === ''}
                style={styles.btnModal}>
                <Text style={styles.textBtn}>AGREGAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalIngreso(false)}>
                <Text style={styles.textBtn}>CERRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalGasto}
        animationType="slide"
        transparent={true}
        onShow={resetInputs}>
        <View style={styles.modal}>
          <View style={{backgroundColor: 'white', padding: 50}}>
            <TextInput
              placeholder="Cantidad"
              onChangeText={num => setCantidad(num)}
              value={cantidad}
              keyboardType="numeric"
              style={styles.inputModal}
            />
            <TextInput
              placeholder="Descripción"
              onChangeText={text => setDescripcion(text)}
              value={descripcion}
              keyboardType="default"
              style={styles.inputModal}
            />
            <View
              style={{
                marginTop: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={handleGastos}
                disabled={cantidad === ''}
                style={styles.btnModal}>
                <Text style={styles.textBtn}>AGREGAR </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalGasto(false)}>
                <Text style={styles.textBtn}>CERRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#102A33',
  },
  capital: {
    backgroundColor: '#FFAC57',
    margin: 20,
    width: '90%',
    height: 70,
    borderRadius: 5,
  },
  section: {
    width: '90%',
    maxHeight: '63%',
    backgroundColor: '#ffffff37',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 20,
  },
  h1: {
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: '2%',
    marginEnd: '10%',
  },
  p: {
    margin: 5,
    marginTop: -2,
    position: 'absolute',
  },
  operaciones: {
    flexDirection: 'row',
    gap: 30,
    paddingVertical: 0,
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
    backgroundColor: '#0089BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  SinRegistros: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 20,
    color: '#fff',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputModal: {
    width: 200,
    marginBottom: '4%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
  },
  btnModal: {
    alignSelf: 'center',
    width: 90,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#0089BA',
    marginVertical: 15,
  },
  textBtn: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  btnCancel: {
    alignSelf: 'center',
    width: 90,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#CD5D5C',
    marginVertical: 15,
  },
  Mas: {
    fontSize: 30,
    color: '#009466',
  },
  Menos: {
    fontSize: 30,
    color: '#CD5D5C',
  },
  Dinero: {
    fontSize: 25,
    color: '#fff',
  },
  btnDelete: {
    alignSelf: 'center',
    width: 90,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#CD5D5C',
  },
  description: {
    color: '#fff',
  },
});

export default App;
