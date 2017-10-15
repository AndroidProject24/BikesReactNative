import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image, Text,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
} from "native-base";
import Constants from '../../constants';
import { primary } from '../../themes/colors';
import Toolbar from '../../elements/Toolbar';
export default class ReportOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
    }
    this.text = {
      position: TextInput,
    }
  }
  render() {
    return (
      <Container>
        <Toolbar
          navigation={this.props.navigation}
          iconLeft={Constants.iconProfile}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
          title='Báo xe đậu ngoài trạm'
        />
        <Content>

          <View style={styles.inputLayout}>
            <TextInput
              ref={position => this.text.position = position}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => {
                this.text.address.focus();
              }}
              placeholderTextColor={'black'}
              placeholder="Mã số xe"
              onChangeText={position => {
                this.setState({ position });
              }}
              style={styles.textInput} />
            <Image
              tintColor='black'
              style={{ width: 30, height: 30 }}
              source={Constants.iconCode} />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              marginLeft: 40,
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={Constants.iconCamera} />
          </TouchableOpacity>

        </Content>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 30,
            right: 30,
            bottom: 30,
            borderRadius: 20,
            backgroundColor: primary,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  inputLayout: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    height: 40,
    padding: 5,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
  },
})