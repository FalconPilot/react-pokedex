import React, { Component } from 'react';
import {
  AsyncStorage,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Pokemon from './pokemon.js';

class Pokelist extends Component {

  /* Constructor */
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      next: null
    };
  }

  getPokemons(next) {
    console.log(next);
    if (next !== null && next !== undefined) {
      fetch(next)
        .then(response => response.json())
        .then(data => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataSource._dataBlob.s1.concat(data.results))
          });
          // AsyncStorage.setItem('pokelist', JSON.stringify(this.state));
          this.getPokemons(data.next);
        })
        .catch(error => {
          console.warn(error);
        });
    }
  }

  /* Receive props */
  componentWillReceiveProps(nextProps) {
    console.log(Object.keys(nextProps));
    let newDS = this.state.dataSource.cloneWithRows(nextProps.pokemons);
    this.setState({
      dataSource: newDS
    });
    this.getPokemons(nextProps.next);
  }

  /* Render */
  render() {
    return (
      <ListView
        enableEmptySections={true}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={rowData =>
          /* Pokemon component */
          <Pokemon
            name={rowData.name}
            src={rowData.url}
            lookup={this.props.lookup}
            onChange={this.props.onChange}
          />
        }
        renderSeparator={(sectionId, rowId) =>
          <View key={rowId} style={styles.separator}/>
        }
      />
    );
  }

}

Pokelist.defaultProps = {
  pokemons: []
}

Pokelist.propTypes = {
  pokemons: React.PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#E8E8E8'
  }
});

export default Pokelist
