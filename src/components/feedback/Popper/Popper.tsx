import React, {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

export interface RIPopper {
  children?: React.ReactNode;
  color?: string;
  showDuration?: number;
  popover?: React.ReactNode;
}

export namespace PIPopper {}

export default function Popper(props: RIPopper) {
  const [show, setShow] = useState(false);

  const {showDuration = 500} = props;

  console.log(show);

  return (
    <TouchableOpacity
      onPress={(e) => {
        console.log('running on press from popper')
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, showDuration);
      }}
      >
      <View className={`position-relative bg-indigo-200`}>
        {props.children}

        {show && (
          <View className="position-absolute" style={{top: '110%', left: 0}}>
            {props.popover}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
