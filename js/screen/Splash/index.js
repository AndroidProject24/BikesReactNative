import React, { Component } from 'react';
import {
  View,
  Image,
  AsyncStorage
} from 'react-native';
import {
  Spinner,
  Container,
  Toast,
  Header,
  Title,
  Button,
  Icon,
  Footer,
  FooterTab,
  Content,
  Text,
  Left,
  Body,
  H3
} from "native-base";
import logo from '../../../assets/images/Logo.png';
import {NavigationActions} from 'react-navigation';
export default class Splash extends Component {

  componentDidMount(){
    setTimeout(()=>this.check(), 1500);
    
    
  }
  check = ()=>{
    let token = AsyncStorage.getItem("Token");
    let firstTime = AsyncStorage.getItem('TheFirst');
    Promise.all([token,firstTime])
    .then(values =>{
      if(values[0]){
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: 'Drawer',
              })
          ]
        }))
      } else if(values[1]){
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: 'Login',
              })
          ]
        }))
      }else{
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: 'Guide',
              })
          ]
        }))
        AsyncStorage.setItem('TheFirst', 'OK');
      }
    });
      
  }

  render() {
    return (
      <Container style={{ justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image source={logo}
          style={{
            width: 200,
            height: 200,
          }}/>
          <Text allowFontScaling
          style={{color : '#EF6530', fontSize: 16, marginTop: 40, textAlign:'center'}}
          >
          HÃY ĐỂ CHÚNG TÔI 
          </Text>
          
          <Text allowFontScaling
          style={{color : '#EF6530', fontSize: 16,textAlign:'center'}}
          >
          ĐỒNG HÀNH CÙNG BẠN
          </Text>
        </View>
        <Text style={{color : '#EF6530', fontSize: 16, textAlign:'center',
         bottom: 10, position: 'absolute', left:0, right: 0}}>Công ty TNHH TM & KT Tân Kỷ Nguyên</Text>
      </Container>
    );
  }
}