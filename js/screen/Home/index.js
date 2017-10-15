import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  Container,
} from "native-base";
import MapView from 'react-native-maps';
import styles from "./styles";
import Constants from '../../constants';
import Toolbar from '../../elements/Toolbar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Home extends Component {
  state = {}
  render() {
    return (
      <Container>
      <Toolbar
      navigation={this.props.navigation}
      iconLeft={Constants.iconProfile}
      actionLeft = {()=>this.props.navigation.navigate('DrawerOpen')}
      logo={Constants.navLogo}
      />
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.location}>
            <Image 
            style={styles.location}
            source={Constants.iconLocation} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.scan}>
            <Image 
            style={styles.scan}
            source={Constants.iconScan} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.help}>
            <Image 
            style={styles.help}
            source={Constants.iconHelp} />
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
