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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles";
import Constants from '../../constants';
import Toolbar from '../../elements/Toolbar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0.0,
      latitude: 0.0,

    }
  }

  componentDidMount() {
    this.getLocation();
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      });
    }, (error) => {
      console.log(error.message)
    }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }
  moveToLocation = () => {
    const region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
    if (this.maps) this.maps.animateToRegion(region, 1000);
  }

  render() {
    return (
      <Container>
        <Toolbar
          navigation={this.props.navigation}
          iconLeft={Constants.iconProfile}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
          logo={Constants.navLogo}
        />
        <MapView
          ref={maps => this.maps = maps}
          showsMyLocationButton={false}
          showsUserLocation={true}
          followsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={this.moveToLocation}
            style={styles.location}>
            <Image
              style={styles.location}
              source={Constants.iconLocation} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('QRCode')}
            style={styles.scan}>
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
