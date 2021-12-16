import React, { Component } from 'react';
import { StyleSheet, View ,Text,Button, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { StyledContainer, 
  InnerContainer, 
  PageLogo, 
  PageTitle, 
  SubTitle, 
  StyledFormArea, 
  StyledTextInput, 
  StyledInputLabel, 
  LeftIcon, 
  RightIcon, 
  StyledButtom, 
  ButtomText, 
  MsgBox
} from '../components/styles';

class StockAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Ville', 'A', 'B', 'AB', 'O','Total'],
      tableHead2: ['Marseille','PLUS', 'Moins', 'PLUS', 'Moins','PLUS', 'Moins','PLUS', 'Moins',''],
      tableData: [["Paris", "Dijon", "Nice", "Lille"]],
      tableTotal:[0, 0, 0, 0],
      isLoading: true
    }
  }
  handleTransfer = (props) => {
    this.props.navigation.navigate('Transfer');
  }
  async getStockAdmin() {
    try {
      const response = await fetch('http://192.168.100.165:3000/api/v1/bank/all');
      const json = await response.json();
      const TableDataCol1 = [];
      const TableDataCol2  = []
      const TableDataCol3  = []
      const TableDataCol4  = []
      const TableDataCol5  = []
      const TableDataCol6  = []
      const TableDataCol7  = []
      const TableDataCol8  = []
      for(var i =0 ; i<json.length; i++){
        if(json[i].category == "A" && json[i].subCategory == "PLUS")
        {
           TableDataCol1.push(json[i].quantity);
        }
        if(json[i].category == "A" && json[i].subCategory == "MOINS")
        {
           TableDataCol2.push(json[i].quantity);
        }
        if(json[i].category == "B" && json[i].subCategory == "PLUS")
        {
           TableDataCol3.push(json[i].quantity);
        }
        if(json[i].category == "B" && json[i].subCategory == "MOINS")
        {
           TableDataCol4.push(json[i].quantity);
        }
        if(json[i].category == "AB" && json[i].subCategory == "PLUS")
        {
           TableDataCol5.push(json[i].quantity);
        }
        if(json[i].category == "AB" && json[i].subCategory == "MOINS")
        {
           TableDataCol6.push(json[i].quantity);
        }
        if(json[i].category == "O" && json[i].subCategory == "PLUS")
        {
           TableDataCol7.push(json[i].quantity);
        }
        if(json[i].category == "O" && json[i].subCategory == "MOINS")
        {
           TableDataCol8.push(json[i].quantity);
        }
        
      }
    
      
      this.setState({ tableData : [...this.state.tableData, TableDataCol1, TableDataCol2, TableDataCol3, TableDataCol4, TableDataCol5, TableDataCol6, TableDataCol7, TableDataCol8]});
      var TableTotal = [0, 0, 0, 0];
      for (var i = 0; i < 4; i++){
        for(var j = 1; j< 9; j++){
              TableTotal[i] += this.state.tableData[j][i];
        }
      }
      this.setState({ tableTotal : TableTotal })
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getStockAdmin();
  }



 
  render() {
    const state = this.state;
    return (
      <ScrollView style={styles.container}>
        <ScrollView>
        <Text style={styles.title}>Stock</Text>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.textHead}/>
          <Row data={state.tableHead2} flexArr={[1,0.5, 0.5, 0.5, 0.5, 0.5, 0.5,0.5,0.5,1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableData[0]}  style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[1]}  style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[2]}  style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[3]}  style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[4]} style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[5]} style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[6]} style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[7]}  style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableData[8]} style={styles.col} textStyle={styles.text}/>
            <Col data={state.tableTotal} style={styles.col} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
        <StyledButtom>
          <Button  onPress={this.handleTransfer} title="Transfer" color="tomato"/>
        </StyledButtom>
      </ScrollView>
      </ScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  table : {marginTop : 50},
  textHead: {fontSize : 13, textAlign : 'center'},
  head: {  height: 75,  backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row', width: 327},
  title: { flex: 1, backgroundColor: '#f6f8fa'   },
  col : { height: 300},
  text: { textAlign: 'center' , fontSize: 9},
  title: {textAlign: 'center' , fontSize: 30, color:'#FA8072'}
});
export default StockAdmin;