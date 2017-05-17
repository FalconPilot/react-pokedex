import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView
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
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <Pokemon name={rowData.name} src={rowData.url}/>
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
    marginHorizontal: 5
  }
});

export default Pokelist
