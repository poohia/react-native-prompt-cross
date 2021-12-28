var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Platform, Alert, Modal, TextInput, Pressable, } from "react-native";
import styles, { androidStyle, iosStyle } from "./styles";
var defaultButtons = [
    {
        text: "Cancel",
        style: "cancel"
    },
    {
        text: "Ok",
        style: "default"
    },
];
var Prompt = function (props) {
    var visible = props.visible, title = props.title, message = props.message, callbackOrButtons = props.callbackOrButtons, type = props.type, _a = props.defaultValue, defaultValue = _a === void 0 ? "" : _a, _b = props.useNatifIosPrompt, useNatifIosPrompt = _b === void 0 ? true : _b, keyboardType = props.keyboardType;
    var _c = useState(visible), show = _c[0], setShow = _c[1];
    var _d = useState(defaultValue), value = _d[0], setValue = _d[1];
    var buttons = useMemo(function () {
        if (!callbackOrButtons) {
            return defaultButtons;
        }
        if (typeof callbackOrButtons === "function") {
            return [
                __assign(__assign({}, defaultButtons[0]), { onPress: callbackOrButtons }),
                __assign(__assign({}, defaultButtons[1]), { onPress: callbackOrButtons }),
            ];
        }
        if (Platform.OS === "ios" && useNatifIosPrompt) {
            return callbackOrButtons;
        }
        return callbackOrButtons.filter(function (_, i) { return i <= 1; });
    }, [callbackOrButtons, useNatifIosPrompt]);
    var platformStyle = useMemo(function () { return (Platform.OS === "android" ? androidStyle : iosStyle); }, []);
    useEffect(function () {
        setShow(visible);
        setValue("");
    }, [visible]);
    useEffect(function () {
        if (show && useNatifIosPrompt && Platform.OS === "ios") {
            Alert.prompt(title, message, buttons, type, defaultValue, keyboardType);
        }
    }, [show, useNatifIosPrompt]);
    useEffect(function () {
        if (Array.isArray(callbackOrButtons) && callbackOrButtons.length > 2) {
            console.warn("react-native-prompt-cross can have two callbackOrButtons");
        }
    }, []);
    if (useNatifIosPrompt && Platform.OS === "ios") {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(Modal, { presentationStyle: "overFullScreen", statusBarTranslucent: true, visible: show, transparent: true },
        React.createElement(View, { style: styles.container },
            React.createElement(View, { style: [styles.card, platformStyle.card] },
                React.createElement(View, { style: [styles.cardContainer] },
                    React.createElement(Text, { style: [styles.header, platformStyle.header] }, title),
                    message && (React.createElement(Text, { style: [styles.message, platformStyle.message] }, message)),
                    React.createElement(TextInput, { style: [styles.input, platformStyle.input], value: value, onChangeText: function (text) { return setValue(text); }, keyboardType: keyboardType })),
                React.createElement(View, { style: [styles.footer, platformStyle.footer] }, buttons.map(function (button, index) { return (React.createElement(Pressable, { style: [
                        styles.footerBtn,
                        platformStyle.footerBtn,
                        index + 1 === buttons.length && __assign({}, platformStyle.footerLastBtn),
                    ], onPress: function () {
                        if (button.onPress) {
                            button.onPress(value);
                        }
                        setShow(false);
                    }, key: button.text },
                    React.createElement(Text, { style: [
                            platformStyle.footerBtnText,
                            button.style === "cancel" && __assign({}, platformStyle.footerBtnTextCancel),
                        ] }, button.text))); }))))));
};
export default Prompt;
