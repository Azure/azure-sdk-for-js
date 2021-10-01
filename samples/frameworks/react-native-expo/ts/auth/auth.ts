import { TokenCredential } from "@azure/core-auth";
import * as AppAuth from "expo-app-auth";

export class ExpoAadTokenCredential implements TokenCredential {
  constructor(private tenant: string, private clientId: string) {}

  async getToken(scopes: string | string[]) {
    if (!Array.isArray(scopes)) {
      scopes = [scopes];
    }

    const issuer = `https://login.microsoftonline.com/${this.tenant}/v2.0`;
    return AppAuth.authAsync({
      issuer,
      scopes,
      clientId: this.clientId,
      redirectUrl: "host.exp.exponent://oauth/redirect",
    }).then((authState) => {
      return {
        token: authState.accessToken!,
        expiresOnTimestamp: new Date(
          authState.accessTokenExpirationDate!
        ).getTime(),
      };
    });
  }
}
