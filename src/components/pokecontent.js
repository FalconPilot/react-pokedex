/* React imports */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

/* Helper imports */
import {
  FormatName
} from '../helpers.js';

class Pokecontent extends Component {
  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      loading: false
    };
  }

  /* Render */
  render() {
    if (this.state.pokemon !== null && this.state.pokemon !== undefined) {
      return (
        <View style={styles.container}>
          <View style={styles.block}>
            <Image source={this.props.lookup['default'][`img_${this.props.id}`]}/>
            <Text style={styles.pokeName}>{FormatName(this.state.pokemon.name)}</Text>
          </View>
        </View>
      );
    } else if (this.state.loading === true) {
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      );
    } else {
      return (
        <View style={styles.blankContainer}/>
      );
    }
  }

  /* On receive props */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemon !== null && nextProps.pokemon !== undefined) {
      this.setState({
        pokemon: null,
        loading: true
      })
      fetch(nextProps.pokemon)
        .then(response => response.json())
        .then(data => {
          this.setState({
            pokemon: data,
            loading: false
          });
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#333",
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blankContainer: {
    flex: 0
  },
  pokeName: {
    color: '#FFF',
    textAlign: 'center'
  }
});

export default Pokecontent
