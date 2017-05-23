import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Pokecontent extends Component {
  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null
    };
  }

  /* Render */
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  /* On receive props */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemon !== null && nextProps.pokemon !== undefined) {
      fetch(nextProps.pokemon)
        .then(response => response.json())
        .then(data => {
          this.setState({
            pokemon: data
          });
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  }
});

export default Pokecontent
