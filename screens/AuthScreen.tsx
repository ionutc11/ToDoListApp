import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../interfaces/interfaces";
import ScreenLayout from "../layout/ScreenLayout";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AuthContext } from "../context/auth-context";
import LogoTitle from "../components/ui/Logo";

GoogleSignin.configure({
  webClientId:
    "396485389275-g5sedqql234udlpjvqt0as8p5af54i8o.apps.googleusercontent.com",
});

const AuthScreen: React.FC<ScreenProps> = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] =
    useState<FirebaseAuthTypes.UserCredential | null>(null);
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo?.user?.uid) {
      const {
        user: { displayName, email, phoneNumber, uid },
      } = userInfo;
      const { isNewUser, username } = userInfo.additionalUserInfo || {};

      const userPayload = {
        displayName,
        email,
        phoneNumber,
        isNewUser,
        username,
        uid,
      };

      authenticate(userPayload);
    }
  }, [userInfo]);

  const signIn = async () => {
    setLoadingLogin(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      const res: FirebaseAuthTypes.UserCredential =
        await auth().signInWithCredential(googleCredential);

      setUserInfo(res);
    } catch (error: any) {
      setError(true);
      setLoadingLogin(false);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
    setLoadingLogin(false);
  };

  return (
    <ScreenLayout>
      <View style={styles.root}>
        <LogoTitle>Organizator</LogoTitle>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.webp")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.introdTitle}>Bine ai venit!</Text>
          <Text style={styles.introdText}>
            Aplicatia "Organizator" te va ajuta sa iti programezi mai usor
            timpul, si sa nu uiti lucrurile planificate
          </Text>
        </View>
        <View style={styles.btn}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={loadingLogin}
          />
        </View>
        {error && (
          <Text style={styles.error}>
            A avut loc o eroare. Va rugam reincercati.
          </Text>
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    backgroundColor: "transparent",
    width: "50%",
    height: 250,
    marginTop: 50,
  },
  btn: {
    marginTop: 50,
  },
  introdTitle: { fontSize: 18, fontWeight: "bold" },
  introdText: {
    textAlign: "center",
    fontSize: 14,
  },
  textContainer: {
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    paddingHorizontal: 40,
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
});

export default AuthScreen;
