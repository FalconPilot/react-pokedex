/* React imports */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

/* Components imports */
import Pokelist from './components/pokelist.js';
import Pokecontent from './components/pokecontent.js';

/* Helper imports */
import {
  GetId
} from './helpers.js';

export default class App extends Component {
  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      next: null,
      displayed: null,
      loading: false
    };
    /* Globals setting */
    global.baseURL = "http://pokeapi.co/api/v2";
    global.pokeCacheLength = 3;
  }

  /* Render */
  render() {
      const lookup = require('./images.js');

      /* Loading activity indicator */
      let indicator = this.state.loading === true
        ? <View style={styles.centeredView}>
            <ActivityIndicator/>
          </View>
        : null;

      /* Error display */
      let error = this.state.error !== undefined
        ? <View style={styles.centeredView}>
            <Text>{this.state.error}</Text>
          </View>
        : null

      /* Middle styles */
      let middleStyle = this.state.error !== undefined || this.state.loading === true
        ? styles.hidden
        : styles.middle

      /* Rendering */
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Pokédex</Text>
          <View style={styles.mainContent}>
            {indicator}
            {error}
            <View style={middleStyle}>
              <Pokelist
                lookup={lookup}
                next={this.state.next}
                onChange={this.onChange}
                pokemons={this.state.pokemons}
                style={styles.pokelist}
                storedState={this.state.storedState}
              />
              <Pokecontent
                id={GetId(this.state.displayed)}
                lookup={lookup}
                pokemon={this.state.displayed}
              />
            </View>
          </View>
        </View>
      );
  }

  /* Will mount ? */
  componentWillMount() {
    this.setState({
      loading: true
    });
    let url = `${global.baseURL}/pokemon`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.detail !== undefined && data.detail !== null) {
          this.setState({
            loading: false,
            error: "API indisponible !"
          });
        } else {
          this.setState({
            pokemons: data.results,
            next: data.next,
            loading: false
          });
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  /* Onchange */
  onChange = (data) => {
    this.setState({
      displayed: data
    });
  }

}

const pokedexColor = '#db5353';
const bgColor = '#F5FCFF';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: bgColor
  },
  mainContent: {
    flex: 1,
    borderColor: pokedexColor,
    borderWidth: 2
  },
  header: {
    padding: 5,
    backgroundColor: pokedexColor,
    color: bgColor,
    textAlign: 'center',
    fontSize: 20
  },
  middle: {
    flex: 1,
    flexDirection: 'row'
  },
  hidden: {
    flex: 0
  },
  centeredView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
