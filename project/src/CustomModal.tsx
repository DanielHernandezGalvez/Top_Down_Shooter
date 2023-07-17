import React from 'react';
import {View, Modal, Image, Text, Button, StyleSheet} from 'react-native';

const CustomModal = props => {
  return (
    <View>
      <Modal transparent visible={props.show}>
        <View style={styles.bodyModal}>
          <Image
            style={styles.image}
            source={require('../assets/img1.png')}
            // resizeMode="stretch"
          />
          <Text>Conteniudo modal</Text>
          <Button title="Cerrar" onPress={props.openHandler}></Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyModal: {
    backgroundColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '30%',
    marginBottom: 10,
  },
});

export default CustomModal;
