/**
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ListView,
   TextInput,
   TouchableOpacity,
 } from 'react-native';

 const FlatList = require('react-native/Libraries/CustomComponents/Lists/FlatList');

 const listItems = [];

 while (listItems.length < 10000) {
   listItems.push({ number: listItems.length });
 }

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const listSource = ds.cloneWithRows(listItems);

const renderItem = ({ item }) => {
 return (
   <View style={styles.listItem}>
    <Text>{item.number}</Text>
   </View>
 );
}

type ScrollTestState = {
 inputText: string,
 listType: number,
};

export default class ScrollTest extends Component {
  state: ScrollTestState = {
    inputText: '',
    listType: 0,
  };

  render() {
    let list = null;
    if (this.state.listType === 0) {
      list = (
        <FlatList
          ref={l => this.flatList = l}
          data={listItems}
          keyExtractor={l => l.number}
          renderItem={renderItem}
          shouldItemUpdate={() => false}
          style={{ paddingHorizontal: 5 }}
        />
      );
    } else if (this.state.listType === 1) {
      list = (
        <ListView
          dataSource={listSource}
          renderRow={item => renderItem({ item })}
          style={{ paddingHorizontal: 5 }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TextInput style={styles.input}
            spellCheck={false}
            autoCorrect={false}
            value={this.state.inputText}
            onChangeText={inputText => this.setState({ inputText })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ inputText: '' })}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {list}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ listType: 0 })}
          >
            <Text style={styles.buttonText}>FlatList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ listType: 1 })}
          >
            <Text style={styles.buttonText}>ListView</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ listType: 2 })}
          >
            <Text style={styles.buttonText}>Nothing</Text>
          </TouchableOpacity>
          {this.state.listType === 0 && (<TouchableOpacity
            style={styles.button}
            onPress={() => this.flatList.scrollToOffset({ animated: true, offset: 50000})}
          >
            <Text style={styles.buttonText}>Scroll</Text>
          </TouchableOpacity>)}
        </View>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    height: 55,
  },
  input: {
    height: 55,
    width: 200,
    marginHorizontal: 5,
    backgroundColor: '#ccffff',
  },
  button: {
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  listItem:{
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#eeccee',
    marginVertical: 3,
  },
});
