import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
const Signin = ({navigation}) => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  navigation.setOptions({
    header: () => false,
  });

  const handleFormChange = (text, input) => {
    setForm({
      ...form,
      [input]: text,
    });
  };
  return (
    <View style={styles.root}>
      <Text style={styles.header}>Signin</Text>
      <Input
        inputStyle={styles.input}
        name="email"
        onChangeText={text => handleFormChange(text, 'email')}
        placeholder="E-mail"
        leftIcon={<Icon name="user" size={24} color="#700" />}
        placeholderTextColor="#700"
      />
      <Input
        inputStyle={styles.input}
        onChangeText={text => handleFormChange(text, 'password')}
        secureTextEntry={true}
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="#700" />}
        placeholderTextColor="#700"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.text}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  input: {
    borderColor: '#f00',
    borderBottomColor: '#f00',
    color: '#a00',
  },
  header: {
    color: '#a00',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 25,
  },
  text: {
    color: '#a00',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 25,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#a00',
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
export default Signin;
