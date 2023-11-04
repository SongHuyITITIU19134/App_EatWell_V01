import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { CreateUser } from "../ulti/auth";

function SignupScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function SignUpHandle({ email, password }) {
    setAuthenticating(true);
    try {
      const token = await CreateUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed !! ", +error.message);
    }
    setAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user ..." />;
  }

  return <AuthContent onAuthenticate={SignUpHandle} />;
}

export default SignupScreen;
