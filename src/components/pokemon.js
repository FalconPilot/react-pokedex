import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Pokemon extends Component {

  /* Constructor */
  constructor(props) {
    super(props);
  }

  /* Render */
  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    );
  }

}

export default Pokemon
