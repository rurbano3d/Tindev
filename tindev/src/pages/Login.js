import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  // aqui no useEffect toda vez que atualizar a pagina ele executa esta função que se tiver user prenchido ja redireciona para o main
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handlerLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id); // iniciar sessão que a sessão user recebe o id dol login

    navigation.navigate('Main', { user: _id });
  }
  return (
    <KeyboardAvoidingView //função é para o teclado não ficar em cima do input, o android faz automatico mais o IOS não
      behavior="padding" // comportamento de padding
      enabled={Platform.OS == 'ios'} // so habilitar no sistema IOS
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none" //não deixa o texto iniciar com letra maiuscula
        autoCorrect={false} // não corrige mais o texto
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handlerLogin} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
