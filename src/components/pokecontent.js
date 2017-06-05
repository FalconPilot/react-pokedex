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
          <Image
            style={styles.pokeImage}
            source={this.props.lookup['default'][`img_${this.props.id}`]}
          />
          <Text style={styles.pokeName}>{FormatName(this.state.pokemon.name)}</Text>
          <View style={styles.block}>
            {this.state.pokemon.stats.map((item, index) => {
              return (
                <View key={index} style={styles.statBlock}>
                  <Text style={styles.pokeStat}>{FormatName(item.stat.name)}</Text>
                  <Text style={styles.pokeStat}>{item.base_stat}</Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    } else if (this.state.loading === true) {
      return (
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
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

const bgColor = "#333";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: bgColor,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexWrap: 'wrap'
  },
  blankContainer: {
    flex: 0
  },
  pokeImage: {
    padding: 2,
    backgroundColor: '#555',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 5
  },
  pokeName: {
    color: '#FFF',
    textAlign: 'center'
  },
  statBlock: {
    flexGrow: 1,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5
  },
  pokeStat: {
    color: '#FFF',
    textAlign: 'center'
  }
});

export default Pokecontent
