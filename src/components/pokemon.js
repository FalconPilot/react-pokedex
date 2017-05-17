import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Pokemon extends Component {

  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      id: this.getId(this.props.src),
      name: this.formatName(this.props.name)
    };
  }

  /* Format name */
  formatName(rawName) {
    return (
      rawName.toLowerCase()
        .replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        })
    )
  }

  /* Get ID from SRC */
  getId(url) {
    return (
      url.split("/").slice(-2)[0]
    );
  }

  /* On press button */
  _onPressButton() {
    console.log("Bip !");
  }

  /* Render */
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._onPressButton}>
          <View style={styles.pokeContainer}>
            <Image
              style={styles.pokeImage}
              source={require('../images.js')["img_" + this.state.id]}
            />
            <Text>{this.state.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

Pokemon.defaultProps = {
  name: "",
  src: ""
}

Pokemon.propsType = {
  name: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired
}

const pokeHeight = "2em";
const styles = StyleSheet.create({
  line: {
    height: 20
  },
  pokeContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  pokeImage: {
    marginHorizontal: 5,
    height: 20,
    width: 20
  }
});

export default Pokemon
