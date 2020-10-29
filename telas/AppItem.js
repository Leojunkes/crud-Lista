import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import database from './database';

export default function AppItem(props,route, navigation){
    
    async function deleteButton(){
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => {
                        database.deleteItem(props.id)
                         .then(response => props.navigation.navigate("AppForm", {id: props.id}));
                         
                         
                    }
                }
            ],
            { cancelable: false }
            );
    }


    async function EditPress(){
        const item = await database.getItem(props.id);
        props.navigation.navigate("AppForm", item);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.textItem}>{props.item}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={deleteButton}  style={styles.deleteButton}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={EditPress} style={styles.editButton}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
  });
