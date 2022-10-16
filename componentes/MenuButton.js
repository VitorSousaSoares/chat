import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default function App(props) {

    function voltar() {
        props.setPagina("HOME");
        // props.setSala("");
    }

    if (props.Pagina ==="HOME") {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.BTN}>
                    <Entypo name="home" size={30} color="#fff" />
                </TouchableOpacity >
                <TouchableOpacity 
                    onPress={()=> props.setPagina("SALA")}
                    style={styles.BTN}
                >
                    <Entypo name="chat" size={25} color="#c4c4c4" />
                </TouchableOpacity>
            </View>
        )    
    } else if (props.Pagina ==="SALA") {
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={()=>voltar()}
                    style={styles.BTN}
                >
                    <Entypo name="home" size={25} color="#c4c4c4" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.BTN}>
                    <Entypo name="chat" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        )    
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor:"#000",
        width:"100%",
    },
    BTN:{
        width:"50%",
        height:45,
        alignItems:'center',
        justifyContent:'center'
    }
})