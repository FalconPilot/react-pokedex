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
      dataSource: ds.cloneWithRows(this.props.pokemons)
    };
  }

  /* Receive props */
  componentWillReceiveProps(nextProps) {
    let newDS = this.state.dataSource.cloneWithRows(nextProps.pokemons);
    this.setState({
      dataSource : newDS
    });
  }

  /* Render */
  render() {
    return (
      <ListView
        enableEmptySections={true}
        style={styles.container}
        dataSource={this.state.dataSource}
        scrollRenderAheadDistance={40}
        renderRow={(rowData) =>
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
    paddingHorizontal: 5
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#E8E8E8'
  }
});

export default Pokelist
