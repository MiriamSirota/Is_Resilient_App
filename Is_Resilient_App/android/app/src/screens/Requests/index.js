import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import {Configuration, OpenAIApi} from 'openai';
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO} from '@tensorflow/tfjs-react-native';
const qna = require('@tensorflow-models/qna');
//import * as qna from '@tensorflow-models/qna';
import {WebView} from 'react-native-webview';

const Requests = () => {
  let context = 'Hi Miriam, name is Noa, i got your number from my fried moshe yakir.';
  const injectedJavaScript = `document.getElementById('context').value = '${context}; '
  const meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); 
meta.setAttribute('content', 'width=device-width,   initial-scale=1.0'); 
document.getElementsByTagName('head')[0].appendChild(meta);`;

  const MyWebComponent = () => {
    return (
      <WebView
        source={{
          uri: 'https://storage.googleapis.com/tfjs-models/demos/mobilebert-qna/index.html',
        }}
        injectedJavaScript={injectedJavaScript}
        style={{flex: 1}}
      />
    );
  };
  // // const [text, setText] = useState('');
  // const [context, setContext] = useState('');
  // const [question, setQuestion] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [model, setModel] = useState(null);

  // useEffect(() => {
  //   async function loadModel() {
  //     await tf.ready();
  //     console.log(qna);
  //     const loadedModel = await qna.load();
  //     console.log(loadedModel);

  //     setModel(loadedModel);
  //   }
  //   loadModel();
  // }, []);

  // const answerQuestion = async (question, context) => {
  //   console.log(model);
  //   if (!model) return;

  //   const answers = await model.findAnswers(question, context);
  //   return answers;
  // };

  return (
    // <View>
    //   <TextInput
    //     placeholder="Enter context"
    //     value={context}
    //     onChangeText={setContext}
    //     multiline
    //   />
    //   <TextInput
    //     placeholder="Ask a question"
    //     value={question}
    //     onChangeText={setQuestion}
    //   />
    //   <Button
    //     title="Get Answer"
    //     onPress={async () => {
    //       const answers = await answerQuestion(question, context);
    //       if (answers && answers.length > 0) {
    //         setAnswer(answers[0].text);
    //       } else {
    //         setAnswer('No answer found');
    //       }
    //     }}
    //   />
    //   <Text>{answer}</Text>
    // </View>

    <View style={{flex: 1}}>
      <MyWebComponent />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 10,
//     height: 200, // Adjust as needed
//     marginBottom: 20,
//   },
// });

export default Requests;
