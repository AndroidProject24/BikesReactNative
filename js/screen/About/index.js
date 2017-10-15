import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Container,
  Content,
} from "native-base";
import Toolbar from '../../elements/Toolbar';
export default class Home extends Component {
  state = {}
  render() {
    return (
      <Container>
      <Toolbar
      navigation={this.props.navigation}
      iconLeft={Constants.iconProfile}
      actionLeft = {()=>this.props.navigation.navigate('DrawerOpen')}
      title = 'Giới thiệu'
      />
      <Image />
       <Content>
        <Image />
        <Text>ABCD <Text>Bold</Text> xzy</Text>

        <View>
          <Text></Text>
          <Text></Text>
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
       </Content>

      </Container>
    );
  }
}