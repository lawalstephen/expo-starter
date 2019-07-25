import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
  Header
} from "native-base";
import { View } from "react-native";
import { connect } from "react-redux";

// Components
import Messages from "@common/messages/Messages";
import Spacer from "@common/spacer/Spacer";
import Loading from "@components/loading/Loading";

// Actions
import { FakeLogin, ChangeInputLogin } from "@components/login/LoginActions";

// Styles
import Styles from "@components/login/LoginStyles";

class LoginScreen extends Component {
  static propTypes = {
    FakeLogin: PropTypes.func.isRequired,
    ChangeInputLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  };

  static defaultProps = {
    errorMessage: null,
    email: "",
    password: ""
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }



  handleSubmit = () => {
    const { email, password, FakeLogin: LoginFakeLogin } = this.props;
    LoginFakeLogin(email, password).catch(e => console.log(`Error: ${e}`));
  };

  render = () => {
    const {
      isLoading,
      errorMessage,
      ChangeInputLogin: LoginChangeInputLogin
    } = this.props;
    console.log(this.props);
    if (isLoading) return <Loading />;

    return (
      <Container>
        <Header iosBarStyle="light-content" style={{ borderBottomWidth: 0 }} />
        <Content
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
        >
          <View style={Styles.section_appname}>
            <Text style={Styles.text_tittle}>React Native Expo Starter</Text>
          </View>
          <View style={Styles.section_form}>
            <Form style={Styles.form}>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={Styles.defaultFont}>Email</Label>
                <Input
                  style={{ fontFamily: "Questrial" }}
                  autoCapitalize="none"
                  //value={email}
                  keyboardType="email-address"
                  onChangeText={v => LoginChangeInputLogin("email", v)}
                />
              </Item>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={Styles.defaultFont}>Password</Label>
                <Input
                  //value={password}
                  secureTextEntry
                  onChangeText={v => LoginChangeInputLogin("password", v)}
                />
              </Item>

              <Spacer size={20} />

              <Button
                block
                style={{ margin: 15, marginTop: 40 }}
                onPress={this.handleSubmit}
              >
                <Text>Login</Text>
              </Button>
            </Form>

            {errorMessage && <Messages message={errorMessage} />}
            <Text>{isLoading}</Text>
          </View>
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isLoading: state.messages.loading,
  errorMessage: state.messages.error,
  email: state.user.email,
  password: state.user.password,
  isAuthenticated: state.user.isAuthenticated
});


// const mapStateToProps = (state, ownProps = {
//   isLoading: state.messages.loading,
//   errorMessage: state.messages.error,
//   email: state.user.email,
//   password: state.user.password,
//   isAuthenticated: state.user.isAuthenticated
// }) => {
//   console.log(state) // state
//   console.log(ownProps) // undefined
// }

// const  mapStateToProps = (state, ownProps) => {
//   console.log(ownProps);
//   return {
//       isLoading: state.messages.loading,
//       errorMessage: state.messages.error,
//       email: state.user.email,
//       password: state.user.password,
//       isAuthenticated: state.user.isAuthenticated
//   };
// }

const mapDispatchToProps = {
  FakeLogin,
  ChangeInputLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
