import { StyleSheet, StatusBar } from "react-native";
import iosVariables from "./iosVariables";
import androidVariables from "./androidVariables";

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    width: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
  },
  cardContainer: {
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 5,
  },
  message: {
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    padding: 5,
    height: 35,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  footerBtn: {
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
});

export const androidStyle = StyleSheet.create({
  card: {
    borderRadius: 3,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: androidVariables.blue,
  },
  header: { alignSelf: "flex-start" },
  message: { textAlign: "left" },
  footer: {
    marginBottom: 10,
    marginRight: 10,
  },
  footerBtn: {
    marginRight: 0,
  },
  footerBtnText: {
    color: androidVariables.blue,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  footerLastBtn: {},
  footerBtnTextCancel: {},
});
export const iosStyle = StyleSheet.create({
  card: {
    borderRadius: 3,
    backgroundColor: iosVariables.backgroundColor,
  },
  header: {},
  message: {},
  input: {
    backgroundColor: iosVariables.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: iosVariables.borderColor,
  },
  footer: {
    borderTopColor: iosVariables.borderColor,
    borderTopWidth: 1,
    justifyContent: "flex-start",
  },

  footerBtn: {
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  footerLastBtn: {
    borderLeftColor: iosVariables.borderColor,
    borderLeftWidth: 1,
  },
  footerBtnText: {
    color: iosVariables.blue,
    fontSize: 18,
  },
  footerBtnTextCancel: {
    fontWeight: "bold",
  },
});

export default styles;
