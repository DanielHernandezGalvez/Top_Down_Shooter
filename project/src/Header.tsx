// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Modal,
//   Button,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import CustomModal from './CustomModal';

// function Header() {
//   const [show, setShow] = useState(false);
//   const openHandler = () => {
//     setShow(!show);
//   };
//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://cdn.pixabay.com/photo/2014/05/21/15/47/piano-349928_1280.jpg',
//       }}
//       style={styles.body}>
//       <View style={styles.section}>
//         <Image
//           style={styles.image2}
//           source={require('../assets/img1.png')}
//           // resizeMode="stretch"
//           // blurRadius={3}
//         />
//         <CustomModal openHandler={openHandler} show={show} />
//         <Text>Hola mundo</Text>

//         <Button title="abrir" onPress={openHandler}></Button>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bodyModal: {
//     backgroundColor: '#ddd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 30,
//     borderRadius: 10,
//   },
//   image: {
//     width: '100%',
//     height: '30%',
//     marginBottom: 10,
//   },
//   section: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image2: {
//     width: 200,
//     height: 100,
//   },
// });

// export default App;
