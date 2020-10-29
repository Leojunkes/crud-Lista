import * as React from 'react';
import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import database from './database';

export default function AppForm({props,route,navigation}) {
  const id = route.params ? route.params.id : undefined;
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(()=>{
    if(!route.params) return;
    setDescricao(route.params.descricao);
    setQuantidade(route.params.quantidade.toString());
  }, [route])

  function alterarDescricao(descricao){setDescricao(descricao);}
  function alterarQuantidade(quantidade){setQuantidade(quantidade);}
  
  async function buttonPress(){
    const listItem = {descricao, quantidade:parseInt(quantidade)};
    database.saveItem(listItem)
    .then(response => navigation.navigate("AppList", listItem));
    
   
  }

    return (
      <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          onChangeText={alterarDescricao}
          placeholder="O que está faltando em casa?"
          clearButtonMode="always" 
          value={descricao} /> 
         
        <TextInput 
          style={styles.input}  
          onChangeText={alterarQuantidade}
          placeholder="Digite a quantidade" 
          keyboardType={'numeric'}
          clearButtonMode="always" value={quantidade.toString()}/> 
        <TouchableOpacity style={styles.button} onPress={buttonPress}> 
          <Text style={styles.buttonText}>Salvar</Text> 
        </TouchableOpacity> 
      </View>
      <StatusBar style="light" />
    </View>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D93600',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: 'blue',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
  });

  