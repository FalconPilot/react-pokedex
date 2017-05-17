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
      pokemons: []
    };
  }

  /* Render */
  render() {
    return (
      <View style={styles.container}>
        <Pokelist pokemons={this.state.pokemons}/>
        <Pokecontent/>
      </View>
    );
  }

  /* Will mount ? */
  componentWillMount() {
    let url = `${global.baseURL}/pokemon`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({pokemons: data.results});
      })
      .catch(error => {
        console.error(error);
      })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});
