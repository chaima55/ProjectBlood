import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Transfer = () => {
  const[category, setCategory] = useState("A");
  const[subCategory, setSubCategory] = useState("PLUS");
  const[city, setCity] = useState("Paris");
  const[inputFrom, setInputFrom] = useState(0);
  
  
  const [cityTo, setCityTo] = useState("ville");
  const[inputTo, setInputTo] = useState(0);

  
  const getQuantityP = async (pourcentage) => {
      try{
       const response = await fetch(`http://192.168.100.165:3000/api/v1/bank/${category}/${subCategory}/${city}/${pourcentage}`)
       .then((res) => res.json())
       .then((json) => {
         setInputFrom(json.quantity);
       });
      }catch(error){
        console.log("error");
      }
  }
  const getQuantityTo = async () => {
    try{
     const response = await fetch(`http://192.168.100.165:3000/api/v1/bank/${category}/${subCategory}/${cityTo}`)
     .then((res) => res.json())
     .then((json) => {
       setInputTo(json.quantity);
     });
    }catch(error){
      console.log("error");
    }
}
  
  return (
    <View style={styles.container}>
      <View  style={styles.header_container}>
        <Picker
          selectedValue={category}
          style={{  width: 150,flex: 1,flexWrap: 'wrap',paddingRight: 5}}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="AB" value="AB" />
          <Picker.Item label="O" value="O" />
        </Picker>
        <Picker
          selectedValue={subCategory}
          style={{  width: 150, flex: 1,flexWrap: 'wrap',paddingRight: 5}}
          onValueChange={(itemValue, itemIndex) => setSubCategory(itemValue)}
        >
          <Picker.Item label="PLUS" value="PLUS" />
          <Picker.Item label="MOINS" value="MOINS" />
        </Picker>
      </View>
      <View>
        <Text style={{marginRight:286,height: 70, paddingTop: 40}}>FROM</Text>
        <View style={styles.header_container}>
          <Picker
            selectedValue={city}
            style={{ height: 10, width: 150, flex: 1,flexWrap: 'wrap'}}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
          >
            <Picker.Item label="Paris" value="Paris" />
            <Picker.Item label="Dijon" value="Dijon" />
            <Picker.Item label="Nice" value="Nice" />
            <Picker.Item label="Lille" value="Lille" />
          </Picker>
          <Text style= {{flex: 0,paddingRight: 10, marginLeft:170, marginTop:15}}>{inputFrom}</Text>
        </View>
        <View>
          <View style={{height:50,flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Button  onPress={() => getQuantityP(25)} title="25%" color="#FA8072" style={{width: 350, paddingTop: 0}}/>
          <Button  onPress={() => getQuantityP(50)} title="50%" color="#FA8072" style={{width: 150}}/>
          <Button  onPress={() => getQuantityP(75)} title="75%" color="#FA8072" style={{width: 150}}/>
          <Button  onPress={() => getQuantityP(100)} title="100%" color="#FA8072" style={{width: 150}}/>
          </View>
      </View>
      <View>
        <Text style={{marginRight:286,height: 50}}>TO</Text> 
        <View style={styles.header_container}>
          <Picker
            selectedValue={cityTo}
            style={{ height: 50, width: 150, flex: 1,flexWrap: 'wrap',paddingRight: 5 }}
            onValueChange={(itemValue, itemIndex) => setCityTo(itemValue)}
          >
            <Picker.Item label="Ville" />
            <Picker.Item label="Paris" value="Paris" />
            <Picker.Item label="Dijon" value="Dijon" />
            <Picker.Item label="Nice" value="Nice" />
            <Picker.Item label="Lille" value="Lille" />
          </Picker>
          <Text style= {{flex: 0,paddingRight: 10, marginLeft:170, marginTop:15}}>{inputTo}</Text>
          </View>
        </View>
      </View>
      <Button  onPress={() => getQuantityTo()} title="Transférer" color="#FA8072"/>
    </View>
  );

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center", flex: 1,
    margin:5
  },
  header_container: {
    flex: 0.40,
    flexDirection: 'row'
  }
});

export default Transfer;