import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';

const Requests = () => {
  const [text, setText] = useState('');

  // Function to send text to the server and get a summary
  const handleSendText = async () => {
    try {
      const response = await fetch('http://192.168.1.129:5000/summarize', {
        // Use your server's URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text}),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Summary', result.summary);
      } else {
        Alert.alert('Error', 'Failed to get summary');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Paste your text here"
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />
      <Button title="Get Summary" onPress={handleSendText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    height: 200, // Adjust as needed
    marginBottom: 20,
  },
});

export default Requests;
