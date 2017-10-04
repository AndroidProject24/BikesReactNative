import React, {Component} from "react";
import {AsyncStorage, Alert,View,DeviceEventEmitter} from "react-native";
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
    H3
} from "native-base";
import styles from "./styles";
import axios from "axios";
import { QRScannerView } from 'ac-qrcode';
import api from "../../../utilities/Api";
const Permissions = require('react-native-permissions');
//import { RNLocation as Location } from 'NativeModules'

class QRCode extends React.Component {
    state = {
        cameraPermission: null,
        locationPermission:null
    };

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            isLoading: true,
            isCheck: true,
            bikesID: "",
            data: []
        };
        this.state = { location: {
            coords: {
                course:358.28,
                speed:0,
                longitude:-122.02322184,
                latitude:37.33743371,
                accuracy:5,
                altitude:0,
                altitudeAccuracy:-1
            },
            timestamp:0
        }
        }
        this.onChange = this.onChange.bind(this);

    }
    // componentWillMount() {
    //     Location.requestAlwaysAuthorization();
    //     Location.startUpdatingLocation();
    //     Location.setDistanceFilter(5.0);
    //     DeviceEventEmitter.addListener('locationUpdated', (location) => {
    //         this.setState({'location':location})
    //     })
    // }

    componentDidMount() {
        Permissions.checkMultiple(['camera', 'location'])
            .then(response => {
                this.setState({
                    cameraPermission: response.camera,
                    locationPermission: response.location
                })
            });
    }

    async onSubmit() {
        try {
            var accessToken = await AsyncStorage.getItem("Token");
            if (accessToken != null) {
                console.log("onSubmit", "onSubmit");
                axios.defaults.baseURL = "http://demo.easymove.vn/api";
                axios.defaults.headers.common["Authorization"] = api.KEY;
                axios.defaults.headers.common["Authorization2"] = "XeDap " + accessToken;
                axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                this.registerBikes();
            }
        } catch (error) {
            console.log("AsyncStorage error: " + error);
        }
    }

    registerBikes() {
        var parent = this;
        if (parent.state.isLoading) {
            <Container style={styles.container}>
                <Spinner color="blue"/>
            </Container>;
        }
        if (parent.state.isCheck) {
            var qs = require("qs");
            axios.post("/bike/register",
                qs.stringify({
                    lat: parent.state.location.coords.latitude,
                    long: parent.state.location.coords.longitude,
                    qr_code: parent.state.bikesID
                })
                    )
                .then(function (response) {
                    parent.setState({
                        isCheck: false
                    });
                    console.log("response=", response);
                    if (response.data.status == 200) {
                        console.log("msg=", response.data.msg);
                        Alert.alert(
                            'Đăng ký thành công',
                            'Bạn đã đăng ký xe thành công và nhấn vào nút mở khóa trên xe để có thể mở khóa xe'
                        )
                        parent.setState({
                            isLoading: false
                        });
                    } else {
                        Alert.alert('Đăng ký thất bại',
                            response.data.msg,
                            [
                                {
                                    text: 'OK', onPress: () => parent.setState({
                                    isCheck: true
                                })
                                },
                            ],
                            {cancelable: false}
                        )
                    }
                })
                .catch(function (error) {
                    parent.setState({
                        isCheck: false
                    });
                    Alert.alert('Đăng ký thất bại',
                        error,
                        [
                            {
                                text: 'OK', onPress: () => parent.setState({
                                isCheck: true
                            })
                            },
                        ],
                        {cancelable: false}
                    )
                    console.log("Error fetching and parsing data", error);
                });
        }
    }

    onChange = state => {
        this.setState(state);
    };

    _renderTitleBar(){
        return(
            <Text style={{color:'white',textAlignVertical:'center', textAlign:'center',font:25,padding:12}}>Quét QRCode để đăng ký xe</Text>
        );
    }
    _renderMenu() {
        return (
            <View/>
        )
    }
    barcodeReceived(data) {
        Toast.show('Type: ' + data.type + '\nData: ' + data.data);
        var parent = this;
        parent.setState({
            bikesID: data.data
        });
        console.log("_handleBarCodeRead=" + data.data);
        parent.onSubmit();
    }

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <Text>Không có quyền truy cập Camera.</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Container>
                    <QRScannerView
                        rectWidth={280}
                        rectHeight={280}
                        hintText={''}
                        onScanResultReceived={this.barcodeReceived.bind(this)}

                        renderTopBarView={() => this._renderTitleBar()}

                        renderBottomMenuView={() => this._renderMenu()}
                    />
                </Container>
            );
        }
    }

}

export default QRCode;
