import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../ulti/auth";
function LoginScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function SignInHandle({ email, password }) {
    setAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Please try again");
    }
    
    setAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Log in user ..." />;
  }

  return <AuthContent isLogin onAuthenticate={SignInHandle} />;
}

export default LoginScreen;
