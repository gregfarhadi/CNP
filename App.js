import {initializeApp} from 'firebase/app'
import firebaseConfig from './firebase.js'
import React , {useState} from 'react';
import { StyleSheet, Text, View , Button, TextInput,SafeAreaView, ScrollView ,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set } from "firebase/database";


export default function App() {
  // const app = initializeApp(firebaseConfig);

const [setindex , setsi] = useState(0);
// const [getindex , setgi] = useState(1);  
const [data , setdata] = useState([]);
const [alert, setalert] = React.useState(false);
const [fn, onChangefn] = React.useState(null);
const [ln, onChangeln] = React.useState(null);
const [em, onChangeem] = React.useState(null);
const [pn, onChangepn] = React.useState(null);
const [cm, onChangecm] = React.useState(null);
const clean = ()=>{
onChangecm(null);
onChangeem(null);
onChangeln(null);
onChangefn(null);
onChangepn(null);
} 
const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}
const add = async ()=>{
	try {
    
    if(fn!==null &&ln!==null &&em!==null &&pn!==null ){
      var information = fn+"|"+ln+"|"+em+"|"+pn+"|"+cm+"|"
	    await AsyncStorage.setItem(setindex.toString(), information);
      setsi(setindex+1);
      clean();
      setalert(false);
    }
    else{
      setalert(true);
    }
    console.log("working"+setindex);
	}
	catch (e){
	console.error(e);
	}
}

const save  = () =>{
  
  get();
  const db = getDatabase();
  for(let i=0; i<data.length;i++){
    let info = data[i][1]
    console.log(info," ",i);
    let randomkey = (Math.random() + 1).toString(36).substring(2);
    set(ref(db, randomkey), {
      info
      
    })
    .then(()=>{
      console.log("uploaded successfully:"+data+"!")
    })
    .catch((error)=>{
      console.log("uplead failed")
    });
  }
}
const get = async () => {
	try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
		setdata(result);
	
	} catch (e){
	console.error(e);
	}
}


return (
	<SafeAreaView style={styles.container}>
  <ScrollView style={styles.scrollView}>
    <View style={styles.logosContainer}>
    <Image
      style={styles.logo}
      source={require('./cnLogo.png')}
    />
    <Image
      style={styles.logo}
      source={require('./xpLogo.png')}
    />
    </View>
    <View>
    <Text style={styles.largeText}>
    Register for more information and to be entered in a drawing for one of 25 prizes!
    </Text>
    <Text style={styles.regularText}>
    All prizes are good for services at Code Ninjas Irvine or XP League Irvine and South Orange County
    </Text>
    <Text style={styles.regularText}>
    First Prize (1 Prize): $500 gift certificate
    </Text>
    <Text style={styles.regularText}>
    Second Prize (5 Prizes): $100 gift certificate
    </Text>
    <Text style={styles.regularText}>
    Third Prize (20 Prizes): $50 gift certificate
    </Text>
    </View>
    <TextInput
        style={styles.input}
        onChangeText={onChangefn}
        value={fn}
        placeholder="first name"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeln}
        value={ln}
        placeholder="last name"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeem}
        value={em}
        placeholder="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangepn}
        value={pn}
        placeholder="phone #"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangecm}
        value={cm}
        placeholder="comments(optional)"
      />
    
    {alert ?(
      <View >
      <Text style = {styles.text}>
      {"warning all inputs except for the comments are required"}
      </Text>
      </View>
		  
    ): null}
    <View style={styles.button} >
		<Button onPress={clearAsyncStorage}
    title={"clear on device data"}
    />
    
    
		<Button
			title={"save"}
			onPress={add}
		/>
		
		<Button
			title={"export"}
			onPress={save}
		/>
    </View>
  
    </ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
},
text : {
	fontSize : 20,
  color: "red",
	marginBottom : 30
},
logosContainer : {
	alignItems: 'center',
	padding:10
},
button : {
	margin:20,
	width:250,
},
input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
},
scrollView: {
    marginHorizontal: 20,
},
largeText: {
  fontSize : 30,
  color: "black",
	marginBottom : 10
},
regularText: {
  fontSize : 15,
  color: "black",
	marginBottom : 10
},
logo: {
    width: 235,
    height: 110,
},
});
