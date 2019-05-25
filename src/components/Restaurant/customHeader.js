import React from "react";
import { Header } from "react-native-elements";

import HamburgerMenu from "./HamburgerMenu";

const MyHeader = props => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: "#fff", fontWeight: "bold" }
      }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      containerStyle={{
        backgroundColor: '#3D6DCC',
        justifyContent: 'space-around',
      }}
      statusBarProps={{ barStyle: "dark-content" }}/>
  );
};

export default MyHeader;