import { AlertType, AlertButton, KeyboardType } from "react-native";

type PromptProps = {
  visible: boolean;
  title: string;
  message?: string;
  callbackOrButtons?: ((text?: string) => void) | AlertButton[];
  type?: AlertType;
  defaultValue?: string;
  keyboardType?: KeyboardType;
  useNatifIosPrompt?: boolean;
};

export default PromptProps;
