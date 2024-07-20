import React, {useState} from 'react';
import {Text} from 'react-native';
import styles from './styles';

const Title = ({text}) => {
  console.log('text:>> ', text);
  const [stateText, setText] = useState('Default state');

  //when you press the text - it changes
  const onTextPress = () => {
    setText('Updated state');
  };

  return (
    <Text onPress={onTextPress} style={styles.title}>
      {stateText}{' '}
    </Text>
  );
};

Title.defaultProps = {
  test: 'Default Text',
};

export default Title;
