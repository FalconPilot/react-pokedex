import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Pokelist from './components/pokelist.js';
import Pokecontent from './components/pokecontent.js';

export default class App extends Component {
  /* Constructor */
  constructor(props) {
    super(props);
    global.baseURL = "http://pokeapi.co/api/v2";
    this.state = {
      pokemons: [],
      previous: null,
      next: null
    };
  }

  /* Render */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pokédex</Text>
        <View style={styles.mainContent}>
          <Pokelist pokemons={this.state.pokemons} next={this.state.next} lookup={require('./images.js')}/>
          <Pokecontent/>
        </View>
      </View>
    );
  }

  /* Will mount ? */
  componentWillMount() {
    let url = `${global.baseURL}/pokemon`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokemons: data.results,
          previous: data.previous,
          next: data.next
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

}

const pokedexColor = '#db5353';
const bgColor = '#F5FCFF';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: bgColor
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    borderColor: pokedexColor,
    borderWidth: 2
  },
  header: {
    padding: 5,
    alignSelf: "stretch",
    backgroundColor: pokedexColor,
    color: bgColor,
    textAlign: 'center',
    fontSize: 20
  }
});
