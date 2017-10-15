import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import {
  Container,
  Content,
} from "native-base";
import Toolbar from '../../elements/Toolbar';
import Constants from '../../constants';
import { primary } from '../../themes/colors';
export default class ReportFailure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      address: '',
      more: '',
    }
    this.text = {
      code: TextInput,
      address: TextInput,
      more: TextInput,
    }
  }
  render() {
    return (
      <Container>
        <Toolbar
          navigation={this.props.navigation}
          iconLeft={Constants.iconProfile}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
          title='Báo hỏng xe'
        />
        <Content>

          <View>

            <View style={styles.inputLayout}>
              <TextInput
                ref={code => this.text.code = code}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => {
                  this.text.address.focus();
                }}
                placeholderTextColor={'black'}
                placeholder="Mã số xe"
                onChangeText={code => {
                  this.setState({ code });
                }}
                style={styles.textInput} />
              <Image
                tintColor='black'
                style={{ width: 30, height: 30 }}
                source={Constants.iconCode} />
            </View>

            <View style={styles.inputLayout}>
              <TextInput
                ref={address => this.text.address = address}
                underlineColorAndroid='transparent'
                placeholderTextColor={'black'}
                placeholder="Đia điểm"
                onChangeText={address => {
                  this.setState({ address });
                }}
                style={styles.textInput} />
              <Image
                tintColor='black'
                style={{ width: 30, height: 30 }}
                source={Constants.iconCamera} />
            </View>

          </View>
          <View style={{ marginTop: 50 }}>
            <TextInput
              multiline={true}
              ref={more => this.text.more = more}
              underlineColorAndroid='transparent'
              placeholderTextColor={'black'}
              placeholder="Bộ phận bị hỏng"
              textAlignVertical={'top'}
              onChangeText={more => {
                this.setState({ more });
              }}
              style={[styles.textInput, {
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                marginLeft: 30, marginRight: 30,
                borderRadius: 10,
                backgroundColor: 'gray',
                height: 150, alignItems: 'flex-start'
              }]} />
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
          </View>

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