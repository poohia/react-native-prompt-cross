import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Platform,
  Alert,
  Modal,
  TextInput,
  AlertButton,
  Pressable,
} from "react-native";
import PromptProps from "./types";
import styles, { androidStyle, iosStyle } from "./styles";

const defaultButtons: AlertButton[] = [
  {
    text: "Cancel",
    style: "cancel",
  },
  {
    text: "Ok",
    style: "default",
  },
];

const Prompt = (props: PromptProps) => {
  const {
    visible,
    title,
    message,
    callbackOrButtons,
    type,
    defaultValue = "",
    useNatifIosPrompt = true,
    keyboardType,
  } = props;

  const [show, setShow] = useState<boolean>(visible);
  const [value, setValue] = useState<string>(defaultValue);

  const buttons = useMemo(() => {
    if (!callbackOrButtons) {
      return defaultButtons;
    }
    if (typeof callbackOrButtons === "function") {
      return [
        { ...defaultButtons[0], onPress: callbackOrButtons },
        { ...defaultButtons[1], onPress: callbackOrButtons },
      ];
    }
    if (Platform.OS === "ios" && useNatifIosPrompt) {
      return callbackOrButtons;
    }
    // react-native-prompt-cross can have two callbackOrButtons
    return callbackOrButtons.filter((_, i) => i <= 1);
  }, [callbackOrButtons, useNatifIosPrompt]);
  const platformStyle = useMemo(
    () => (Platform.OS === "android" ? androidStyle : iosStyle),
    []
  );

  useEffect(() => {
    setShow(visible);
    setValue("");
  }, [visible]);

  useEffect(() => {
    if (show && useNatifIosPrompt && Platform.OS === "ios") {
      Alert.prompt(title, message, buttons, type, defaultValue, keyboardType);
    }
  }, [show, useNatifIosPrompt]);

  useEffect(() => {
    if (Array.isArray(callbackOrButtons) && callbackOrButtons.length > 2) {
      console.warn("react-native-prompt-cross can have two callbackOrButtons");
    }
  }, []);

  if (useNatifIosPrompt && Platform.OS === "ios") {
    return <React.Fragment />;
  }

  return (
    <Modal
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      visible={show}
      transparent
    >
      <View style={styles.container}>
        <View style={[styles.card, platformStyle.card]}>
          <View style={[styles.cardContainer]}>
            <Text style={[styles.header, platformStyle.header]}>{title}</Text>
            {message && (
              <Text style={[styles.message, platformStyle.message]}>
                {message}
              </Text>
            )}
            <TextInput
              style={[styles.input, platformStyle.input]}
              value={value}
              onChangeText={(text) => setValue(text)}
              keyboardType={keyboardType}
            />
          </View>
          <View style={[styles.footer, platformStyle.footer]}>
            {buttons.map((button, index) => (
              <Pressable
                style={[
                  styles.footerBtn,
                  platformStyle.footerBtn,
                  index + 1 === buttons.length && {
                    ...platformStyle.footerLastBtn,
                  },
                ]}
                onPress={() => {
                  if (button.onPress) {
                    button.onPress(value);
                  }
                  setShow(false);
                }}
                key={button.text}
              >
                <Text
                  style={[
                    platformStyle.footerBtnText,
                    button.style === "cancel" && {
                      ...platformStyle.footerBtnTextCancel,
                    },
                  ]}
                >
                  {button.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Prompt;
