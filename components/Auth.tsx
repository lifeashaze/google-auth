import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
  
  import { View } from "react-native";
  import { useEffect} from "react";
  
  export default function Auth() {
  
    useEffect(() => {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        iosClientId: "367305300571-mb1pjmnrlel3oh65eush1sshi4k39m4b.apps.googleusercontent.com",
      });
    }, []);
  
    const signIn = async () => {
      try {
        const response = await GoogleSignin.signIn();
        
        if (isSuccessResponse(response)) {
          console.log(JSON.stringify(response.data, null, 2));
        } else {
          console.log("No saved credentials found.");
        }
      } catch (error) {
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              console.log("User cancelled the sign-in.");
              break;
            case statusCodes.IN_PROGRESS:
              console.log("Sign-in is already in progress.");
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              console.log("Play services not available or outdated.");
              break;
            default:
              console.log("Unexpected error:", error);
          }
        } else {
          console.log("Non-Google sign-in error:", error);
        }
      }
    };
  
    return (
      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
    );
  }
  