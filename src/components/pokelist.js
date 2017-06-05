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
      dataSource: ds.cloneWithRows([]),
      loading: true
    };
  }

  /* Recursively get pokemons */
  getPokemons(next) {
    /* Load next pokemons */
    if (next !== null && next !== undefined) {
      fetch(next)
        .then(response => response.json())
        .then(data => {
          /* Toggle main app loading */
          if (this.state.loading === true) {
            this.props.toggleLoading();
          }

          /* Update state */
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataSource._dataBlob.s1.concat(data.results)),
            loading: false
          });

          /* Update AsyncStorage */
          AsyncStorage.multiSet([
            ['next', data.next],
            ['pokelist', JSON.stringify(this.state.dataSource._dataBlob.s1)]
          ]);
          this.getPokemons(data.next);
        })
        .catch(error => {
          this.props.addError("Impossible de se connecter à l'API !");
          console.warn(error);
        });
    /* Remove next if null */
    } else {
      AsyncStorage.removeItem('next');
    }
  }

  /* Initialize pokemon list */
  componentWillMount() {
    AsyncStorage.multiGet(['pokelist', 'next'], (err, stores) => {
      const pokelist = stores['0']['1'];
      const next = stores['1']['1'];
      if (pokelist !== null && pokelist !== undefined) {
        /* Update state */
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(JSON.parse(pokelist)),
          loading: false
        });

        /* Toggle loading */
        this.props.toggleLoading();

        /* Get next pokemons */
        this.getPokemons(next);
      } else {
        this.getPokemons(`${global.baseURL}/pokemon`);
      }
    });
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
