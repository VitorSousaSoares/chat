import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App(props) {
    return(
        <View style={styles.container}>
            <Text style={styles.TXT}>{props.Pagina}</Text>
            <StatusBar hidden/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height:45,
      width:"50%",
      justifyContent:'center',
    },
    TXT:{
        color:"#fff",
        fontSize:20,
        marginLeft:15
    }
  });