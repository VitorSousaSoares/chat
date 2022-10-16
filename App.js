import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import db from './firebase.js';
import  React,{useEffect, useState,useRef} from 'react';
import { Entypo } from '@expo/vector-icons';
import MenuButton from "./componentes/MenuButton";
import Titulo from "./componentes/Titulo";
import Modal from './componentes/Modal.js';

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pagina,setPagina] = useState("HOME");
  const [chat,setChat] = useState('');
  const [sala,setSala] = useState('Sala 1');
  const [nome,setNome] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const scrollViewRef = useRef();
  
  

  useEffect(()=>{
    const unsub = db.collection("rooms").onSnapshot(function(snapshot){
      setRooms(snapshot.docs.map(val=>{
          return {
            id: val.id,
            data: val.data()
          }
      }))
    })
    return () => {
      unsub();
    }
  },[]);



  function enviar()
  {
    let message = {
      autor:nome,
      mensagem:currentMessage,
      time: new Date().getTime(),
    }
    db.collection("rooms").doc(sala).collection("messages").add(message);
    setCurrentMessage("");
  }



  function EntarSala(val) {
    setSala(val)
    setPagina("SALA")
  }


  useEffect(()=>{
    db.collection('rooms').doc(sala).collection('messages').orderBy("time")
    .onSnapshot(function(snapshot){
      setMessages(snapshot.docs.map(l=>{
        return{
          id: l.id,
          data:l.data()
        }
      }))
    })
  },[sala]);


  if (pagina === "HOME") {
    if (nome === '') {
      return(
        <View>
          <Modal nome={nome} setNome={setNome} setPagina={setPagina}/>
        </View>
      )
      
    }else{
      return (
        <View style={styles.container}>

          <View style={styles.titulo}>
            <Titulo Pagina={pagina}/>
            <Modal nome={nome} setNome={setNome} setPagina={setPagina}/>
          </View>
        
          <ScrollView>
            {
            rooms.map(function(val){
              return (
                <View >
                  <TouchableOpacity 
                    style={styles.BTNpaginaHome}
                    onPress={()=>EntarSala(val.id)}  
                  >
                    <Entypo name="chat" size={30} color="#000" />
                    <Text style={styles.TXTpaginaHOME}>{val.id}</Text>
                  </TouchableOpacity>
                </View>
                );
              })
            }
          </ScrollView>

          <MenuButton Pagina={pagina} setPagina={setPagina}/>

        </View>
      );
    }
  }else if( pagina === "SALA"){
    return (
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Titulo Pagina={sala}/>
          <Modal nome={nome} setNome={setNome} setPagina={setPagina}/>
        </View>
        
        <ScrollView >
          {
            messages.map(function(val){
              if (nome === val.data.autor) {
                return(
                  <View style={styles.mensagemDOautor}>
                    <Text style={styles.txtDOautor}>
                      {val.data.autor}:
                    </Text> 
                    <Text style={styles.txtMensagem}>
                      {val.data.mensagem}
                    </Text>
                  </View>
                )
              }else{
                return(
                  <View style={styles.mensagem}>
                  <Text style={styles.txtNautor}>
                    {val.data.autor}:
                  </Text> 
                  <Text style={styles.txtMensagem}>
                    {val.data.mensagem}
                  </Text>
                </View>
                )}
            })
          }
            
        </ScrollView>
        
        <View style={styles.BOXenviar}>
          <TextInput
            placeholder='Mensagem'
            multiline={true}
            style={styles.TXTbox}
            value={currentMessage}
            onChangeText={(text)=>setCurrentMessage(text)}
          />
          <TouchableOpacity 
            style={styles.BTNbox}
            onPress={()=> enviar()}  
          >
            <Entypo name="paper-plane" size={30} color="black" style={styles.ICObox}/>
          </TouchableOpacity>
          
        </View>

        <MenuButton Pagina={pagina} setPagina={setPagina} setSala={setSala}/>

      </View>
    );
  }else if( pagina != "HOME" || pagina != "SALA"){
    return(
      <View style={styles.PaginaErro}>
        <Text>ERRO</Text>
        <TouchableOpacity
          onPress={()=> setPagina("HOME")}
          style={styles.BTNerro}
        >
          <Text style={styles.txtBTNerro}>HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  PaginaErro:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BTNerro:{
    marginTop:10,
    backgroundColor:"#1993f7",
    width:"40%",
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    elevation:5,
  },
  txtBTNerro:{
    color:"#fff"
  },
  BTNpaginaHome:{
    flexDirection:"row",
    marginLeft:12,
    marginTop:15,
  },
  TXTpaginaHOME:{
    marginLeft:12,
    fontSize:22
  },
  titulo:{
    flexDirection:"row",
    backgroundColor:"#000"
  },
  mensagemDOautor:{
    width:"80%",
    backgroundColor:"red",
    alignSelf:'flex-end',
    marginRight:8,
    marginTop:12,
    borderRadius:15,
    paddingBottom:"2%",
    paddingTop:"2%"
  },
  mensagem:{
    width:"80%",
    backgroundColor:"green",
    alignSelf:'flex-start',
    marginLeft:8,
    marginTop:12,
    borderRadius:15,
    paddingBottom:"2%",
    paddingTop:"2%"
  },
  txtDOautor:{
    fontSize:15,
    textAlignVertical:"center",
    marginLeft:12,
    color:"#cdcccf"
  },
  txtNautor:{
    fontSize:15,
    textAlignVertical:"center",
    marginLeft:12,
    color:"#cdcccf"
  },
  txtMensagem:{
    fontSize:20,
    textAlignVertical:"center",
    marginLeft:8,
  },
  BOXenviar:{
    flexDirection:'row',
    backgroundColor:"#e5e3e8",
    width:"90%",
    alignSelf:'center',
    marginBottom:5,
    borderRadius:10,
    marginTop:5
  },
  TXTbox:{
    width:"80%",
    fontSize:20,
    marginLeft:8,
    marginBottom:6,
    marginTop:6,
  },
  BTNbox:{
    justifyContent:"center",
    alignItems:'center',
  },
  ICObox:{
    backgroundColor:"#cfcdd1",
    width:44,
    height:44,
    paddingLeft:5,
    textAlignVertical:"center",
    borderRadius:22
  },
});
