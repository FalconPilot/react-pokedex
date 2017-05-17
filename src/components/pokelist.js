import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
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
    if (next !== null) {
      fetch(next)
        .then(response => response.json())
        .then(data => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataSource._dataBlob.s1.concat(data.results))
          });
          this.getPokemons(data.next);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  /* Receive props */
  componentWillReceiveProps(nextProps) {
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
    flex: 0,
    paddingHorizontal: 5
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#E8E8E8'
  }
});

export default Pokelist
