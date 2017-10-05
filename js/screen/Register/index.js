import React, {Component} from "react";
import {AsyncStorage, TouchableOpacity, Platform, Image, View, StatusBar} from "react-native";
import {
    Spinner,
    Container,
    Toast,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    CheckBox,
    ListItem,
    Right,
    Body,
    Item,
    Input
} from "native-base";
import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";

const launchscreenBg = require("../../../assets/images/bg_login.jpg");
const launchscreenLogo = require("../../../assets/images/logo2.png");

class Register extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            tabNam: true,
            tabNu: false,
            isLoading: true,
            error: false,
            errorInfo: null,
            fullname: "",
            username: "",
            sdt: "",
            email: "",
            password: "",
            cpassword: "",
            gender: 1
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        console.log("sex=", this.state.gender);
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
        axios.post("/member/register",
            qs.stringify({
                fullname: parent.state.fullname,
                username: parent.state.username,
                sdt: parent.state.sdt,
                email: parent.state.email,
                password: parent.state.password,
                cpassword: parent.state.cpassword,
                gender: parent.state.gender
            })
        )
            .then(function (response) {
                if (response.data.status == 200) {
                    Toast.show({text: response.data.msg, position: 'top', duration: 2000})
                    parent.setState({
                        isLoading: false
                    });
                    parent._onPressLogin();
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

    _onPressLogin() {
        this.props.navigation.navigate("Login");
    }

    _onPressNam() {
        this.setState({
            tabNam: true,
            tabNu: false,
            gender: 1
        });
    }

    _onPressNu() {
        this.setState({
            tabNam: false,
            tabNu: true,
            gender: 0
        });
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content"/>
                <Image source={launchscreenBg} style={styles.imageContainer}>
                    <View style={styles.content}>
                        <View style={styles.messageBox}>
                            <Image source={launchscreenLogo} style={styles.logo}/>
                        </View>
                    </View>

                    <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', margin: (Platform.OS === 'ios') ? 30 : 0}}>
                        <Content>
                            <Item>
                                <Input style={{color: "#FFF"}} placeholder="Họ và tên" placeholderTextColor="#FFFFFF"
                                       textColor="#FFFFFF"
                                       value={this.state.fullname}
                                       onChangeText={text => this.setState({fullname: text})}/>
                            </Item>
                            <Item>
                                <Input style={{color: "#FFF"}} placeholder="Tài khoản" placeholderTextColor="#FFFFFF"
                                       textColor="#FFFFFF"
                                       value={this.state.username}
                                       onChangeText={text => this.setState({username: text})}/>
                            </Item>
                            <Item>
                                <Input style={{color: "#FFF"}} placeholder="Email" placeholderTextColor="#FFFFFF"
                                       textColor="#FFFFFF"
                                       value={this.state.email}
                                       onChangeText={text => this.setState({email: text})}/>
                            </Item>
                            <Item>
                                <Input style={{color: "#FFF"}} placeholder="Điện thoại" placeholderTextColor="#FFFFFF"
                                       textColor="#FFFFFF"
                                       value={this.state.sdt}
                                       onChangeText={text => this.setState({sdt: text})}/>
                            </Item>
                            <Item>
                                <Input secureTextEntry={true} style={{color: "#FFF"}} placeholder="Mật khẩu"
                                       placeholderTextColor="#FFFFFF" textColor="#FFFFFF"
                                       value={this.state.password}
                                       onChangeText={text => this.setState({password: text})}/>
                            </Item>
                            <Item>
                                <Input secureTextEntry={true} style={{color: "#FFF"}} placeholder="Xác nhận mật khẩu"
                                       placeholderTextColor="#FFFFFF" textColor="#FFFFFF"
                                       value={this.state.cpassword}
                                       onChangeText={text => this.setState({cpassword: text})}/>
                            </Item>
                            <View style={styles.card}>
                                <View style={styles.textSex}>
                                    <Body>
                                    <Text style={{color: "#FFFFFF"}}>Nam</Text>
                                    </Body>
                                    <CheckBox checked={this.state.tabNam}
                                              onPress={() => this._onPressNam()}/>
                                </View>
                                <View style={styles.textSex}>
                                    <Body>
                                    <Text style={{color: "#FFFFFF"}}>Nữ</Text>
                                    </Body>
                                    <CheckBox checked={this.state.tabNu}
                                              onPress={() => this._onPressNu()}/>
                                </View>
                            </View>
                            <Button style={{
                                backgroundColor: "#4e699e", width: '100%', marginTop: 10, justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                    onPress={() => this.onSubmit()}>
                                <Text>Đăng ký</Text>
                            </Button>
                            <Text style={{
                                backgroundColor: "transparent",
                                color: "#FFFFFF",
                                marginLeft: 240,
                                fontSize: 14,
                                marginTop: 10
                            }}
                                  onPress={() => this._onPressLogin()}>Đăng nhập</Text>
                        </Content>
                    </View>
                </Image>
            </Container>
        );
    }
}

export default Register;
