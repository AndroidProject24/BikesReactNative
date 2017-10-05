const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container:{
    backgroundColor: "#3c5b94",
  },
  body: {
    marginTop:5,
    marginLeft:20,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#FFFF",
    padding:30
  },
  html: {
    fontWeight: '300' // make links coloured pink
  }
};
