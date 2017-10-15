const React = require("react-native");

const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;

export default {
    root: {
        backgroundColor: "#f6f6f6",
        flex: 1,
        width: null,
        height: null
    },
    imageContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainerBottom: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content1: {
        flex: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        margin:30
    },
    content2: {
        backgroundColor: "#FFF",
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    content3: {
        flex: 0.1,
        flexDirection: 'column',
        alignItems: 'center',
        margin:30
    },
    textBase: {
        fontSize: 12,
        fontFamily: 'Roboto'
    },
    textAbout: {
        fontSize: 14,
        fontFamily: 'Roboto'
    },
    textBold: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    textContact1: {
        fontSize: 17,
        fontFamily: 'Roboto'
    },
    textContact2: {
        color: "#f26422",
        fontSize: 17,
        fontFamily: 'Roboto'
    },
    logoTop: {
        marginTop: Platform.OS === "android" ? 10 : 60,
        width: 260,
        height:deviceWidth/4,
        resizeMode: 'center'
    },
    logoBottom: {
        width: deviceWidth,
        height:deviceWidth/1.5,
        resizeMode: 'stretch'
    }
};
