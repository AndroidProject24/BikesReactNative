const React = require("react-native");

const {Dimensions, Platform} = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    root: {
        backgroundColor: "#FFF",
        flex: 1,
        width: null,
        height: null
    },
    imageContainer: {
        flex: 0.1,
        height:120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: deviceWidth/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        margin: (Platform.OS === 'ios') ? 30 : 0
    },
    buttonRegister: {
        backgroundColor: "#f26422",
        color: "#FFF",
        width: '100%',
        height:40,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center'
    },
    textLogin: {
        marginLeft: 240,
        color: "#f26422",
        marginTop: 10
    },
    logoTop: {
        marginTop: Platform.OS === "android" ? 10 : 60,
        width: 260,
        resizeMode: 'center'
    },
    logoBottom: {
        width: deviceWidth,
        height:deviceWidth/1.5,
        resizeMode: 'stretch'
    },
    card: {
        backgroundColor: "transparent",
        marginLeft:50,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSex: {
        marginTop: 10,
        width: (Platform.OS === 'ios')?120: deviceWidth/3,
        flexDirection: "row",
    }
};
