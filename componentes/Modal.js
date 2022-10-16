import React, {useState} from "react";
import { View,Modal,StyleSheet, TouchableOpacity,Text, TextInput, Alert } from "react-native";

export default function (props){
    const [modal,setModal] = useState(true);
    const [ModalNome,setModalNome] = useState('')

    function EntrarModal(){
        
        props.setNome(ModalNome)

        if (ModalNome === ""){
            Alert.alert("ERRO","Digite o nome para entrar")
        }else{
            Alert.alert("BEM VINDO", ModalNome)
            setModal(false)
        }
    }

    function sair() {
        props.setNome("");
        setModalNome('');
        props.setPagina("HOME");
    }

    if (props.nome === "") {
        return(
            <View >
                <Modal
                    visible={modal}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <Text>Digite o seu nome para entar</Text>
                        <TextInput
                            placeholder="Nome"
                            autoFocus={true}
                            onChangeText={(text)=>setModalNome(text)}
                            style={styles.TextInput}
                        />
                        <TouchableOpacity 
                            style={styles.BTNtxt}
                            onPress={()=> EntrarModal()}
                        >
                            <Text>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        ) 
    }else {
        return(
            <View style={styles.BTNSair}>
                <TouchableOpacity
                    onPress={()=>sair()}
                    
                >
                    <Text style={styles.BTNtxtSair}>SAIR</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor: "rgba(240,240,240,0.9)",
        width:'90%',
        height:400,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginTop:"30%",
    },
    TextInput:{
        marginTop:15,
        marginBottom:15,
        fontSize:20
    },
    BTNtxt:{
        width:"50%",
        height:45,
        backgroundColor:"#a7a7b0",
        elevation: 2,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    BTNSair:{
        width:"50%",
        justifyContent:'center',
    },
    BTNtxtSair:{
        color:"#fff",
        textAlign:"right",
        marginRight:10,

    }
})