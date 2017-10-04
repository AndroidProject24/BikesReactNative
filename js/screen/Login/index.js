import React, {Component} from "react";
import {AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar} from "react-native";
import {Spinner, Container, Button, H3, Toast, Text, Item, Input} from "native-base";
import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import {connect} from 'react-redux';
import * as ducks from '../../../js/utils/ducks';
import {getNavigationOptions} from '../../../js/utils/navigation';
import * as Colors from '../../themes/colors';

const launchscreenBg = require("../../../assets/images/bg_login.jpg");
const launchscreenLogo = require("../../../assets/images/logo2.png");

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: "",
            password: "",
            error: false,
            errorInfo: null
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        axios.defaults.baseURL = "http://demo.easymove.vn/api";
        axios.defaults.headers.common["Authorization"] = api.KEY;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        this.login();
    }

    login() {
        var parent = this;
        if (parent.state.isLoading && !parent.state.error) {
            <View style={styles.container}>
                <Spinner color="blue"/>
            </View>;
        } else if (parent.state.error) {
            Toast.show({text: parent.state.errorInfo, position: 'top', duration: 2000})
        }
        var qs = require("qs");
        axios.post("/member/login",
            qs.stringify({
                username: parent.state.username,
                password: parent.state.password
            })
        )
            .then(function (response) {
                console.log("response=",response.data);
                if (response.data.status == 200 && response.data.token != null) {
                    console.log("msg=", response.data.token);
                    parent.setState({
                        isLoading: false
                    });
                    AsyncStorage.setItem("Token", response.data.token);
                    parent._onPressHome();
                } else {
                    console.log("renderErrorView", response.data.msg);
                    Toast.show({text: response.data.msg, position: 'top', duration: 2000})
                }
            })
            .catch(function (error) {
                parent.setState({
                    error: true,
                    errorInfo: error
                });
                Toast.show({text: error, position: 'top', duration: 2000})
                console.log("Error fetching and parsing data", error);
            });
    }

    onChange = state => {
        this.setState(state);
    }

    _onPressSignUp() {
        this.props.navigation.navigate("Register");
    }

    _onPressForgetPass() {
        this.props.navigation.navigate("ForgetPass");
    }

    _onPressHome() {
        const {updateCurrentUser} = this.props;
        updateCurrentUser({name: 'toan '});
        //this.props.navigation.navigate("News");
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content"/>
                <View style={styles.imageContainer}>
                    <View style={styles.content}>
                        <View style={styles.messageBox}>
                            <Image source={launchscreenLogo} style={styles.logo}/>
                        </View>
                    </View>

                    <View style={{
                        flex: 1.8,
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: 30
                    }}>

                        <Item>
                            <Input style={{color: "#FFF"}} placeholder="Tài khoản" placeholderTextColor="#FFFFFF"
                                   textColor="#FFFFFF"
                                   value={this.state.username}
                                   onChangeText={text => this.setState({username: text})}/>
                        </Item>
                        <Item>
                            <Input secureTextEntry={true} style={{color: "#FFF"}} placeholder="Mật khẩu"
                                   placeholderTextColor="#FFFFFF"
                                   value={this.state.password}
                                   onChangeText={text => this.setState({password: text})}/>
                        </Item>

                        <Button style={{
                            backgroundColor: "#4e699e", width: '100%', marginTop: 30, justifyContent: 'center',
                            alignItems: 'center'
                        }}
                                onPress={() => this.onSubmit()}>
                            <Text>Đăng nhập</Text>
                        </Button>
                        <Text style={{backgroundColor: "transparent", color: "#FFFFFF", marginTop: 10}}
                              onPress={() => this._onPressForgetPass()}>Quên mật khẩu?</Text>
                        <Button bordered
                                style={{
                                    backgroundColor: "transparent",
                                    width: '100%',
                                    marginTop: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => this._onPressSignUp()}>
                            <Text style={{color: "#FFFFFF"}}>Đăng ký </Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

Login.navigationOptions = ({navigation}) => getNavigationOptions('Login', Colors.primary, 'white');

const mapStateToProps = store => ({
    currentUser: store.currentUser,
});

const mapDispatchToProps = {
    updateCurrentUser: ducks.updateCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
