import React, { Component } from 'react';
import { StyleSheet, View ,Text, ScrollView} from 'react-native';
import { Cols } from 'react-native-table-component';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class Stock extends Component {
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

  async getStock() {
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
    this.getStock();
  }


 
  render() {
    const { tableHead, tableHead2, tableData, tableTotal, isLoading} = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>error</Text> : 
        (
          <ScrollView>
            <Text style={styles.title}>Stock</Text>
            <Table borderStyle={{borderWidth: 1}} style={styles.table}>
              <Row data={tableHead} flexArr={[1, 1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
              <Row data={tableHead2} flexArr={[2,1, 1, 1,1 , 1, 1, 1 , 1]} style={styles.head} textStyle={styles.text2}/>
              <TableWrapper style={styles.wrapper}>
                <Col data={tableData[0]} flexArr={[1, 1, 1, 1]} style={styles.col1} textStyle={styles.text}/>
                <Col data={tableData[2]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[3]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[4]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[5]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[6]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[7]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[8]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableData[9]} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text3}/>
                <Col data={tableTotal} flexArr={[1, 1, 1, 1]} style={styles.col} textStyle={styles.text}/>
              </TableWrapper>
            </Table>
          </ScrollView>
        )}
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  table : {marginTop : 50},
  head: {  height: 75,width:320,  backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  col : { height: 370 ,width:50},
  col1 : {},
  row: {  height: 100, width:300 },
  text: { textAlign: 'center' , fontSize: 20},
  text2:{textAlign: 'center' , fontSize: 7.5},
  text3:{textAlign: 'center' , fontSize: 15},
  title: {textAlign: 'center' , fontSize: 30, color:'#FA8072'}
});
export default Stock;