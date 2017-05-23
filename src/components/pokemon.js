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
  _onPressButton = () => {
    this.props.onChange(this.props.src);
  }

  /* Render */
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._onPressButton}>
          <View style={styles.pokeContainer}>
            <Text style={styles.pokeId}>#{this.state.id}</Text>
            <Image
              style={styles.pokeImage}
              source={this.props.lookup['default'][`img_${this.state.id}`]}
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

const pokeHeight = 40;
const styles = StyleSheet.create({
  line: {
    height: pokeHeight
  },
  pokeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  pokeImage: {
    paddingHorizontal: 5,
    height: pokeHeight,
    width: pokeHeight
  },
  pokeId: {
    minWidth: 30
  }
});

export default Pokemon
