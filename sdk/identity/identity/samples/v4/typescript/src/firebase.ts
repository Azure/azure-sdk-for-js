import { AccessToken, GetTokenOptions, TokenCredential } from "unbranded-lib";
import { initializeApp } from "firebase/app";
import {
  Auth,
  AuthCredential,
  initializeAuth,
  ProviderId,
  SignInMethod,
  signInWithCredential,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // Your web app's Firebase configuration here
  // See https://firebase.google.com/docs/web/setup#add-sdks-initialize
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
const app = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(app);

const authCredential: TokenCredential = {
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    try {
      //custom logic for persistence based on the options of credential used
      // auth.setPersistence = ()
      // {options.tokenCachePersistence.enabled}
      //auth.tenantId, auth.config

      const cred: AuthCredential = {
        providerId: ProviderId.GOOGLE,
        signInMethod: SignInMethod.EMAIL_PASSWORD,
        toJSON: function (): object {
          throw new Error("Function not implemented.");
        },
      };
      const userCredential = await signInWithCredential(auth, cred);
      const idTokenResult = await userCredential.user.getIdTokenResult();
      return {
        ...idTokenResult,
        token: idTokenResult.token,
        expiresOnTimestamp: convertToExpiresOn(idTokenResult.expirationTime),
      };
    } catch (error) {
      console.error("Failed to retrieve token from firebase/auth", error);
      return null;
    }
  },
};
