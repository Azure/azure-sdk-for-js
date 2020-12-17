/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create an Authentication provider
  which is capable of fetching an authorization token for the
  AuthorizationCodeCredential.

  Using an AuthorizationCodeCredential allows you to control how your
  application fetches the authorization code, providing flexibility for
  scenarios such as Electron where you need to control how browser windows
  are created and managed.

  For more information on Azure Identity and credential management please
  see https://www.npmjs.com/package/@azure/identity.

  For more information on the Authorization code credential strategy please
  see https://docs.microsoft.com/en-us/javascript/api/@azure/identity/authorizationcodecredential
*/
import { BrowserWindow, protocol, session } from "electron";
import qs from "qs";
import { IPC_MESSAGES, MSAL_CONFIG } from "./Constants";
import Main from "./Main";

export default class AuthProvider {
  private loginWindow: BrowserWindow;

  constructor() {
    // Register a custom handler for `msal://` scheme
    // which is needed to get an authentication callback
    // handler (otherwise `file://` is used as the default in
    // most cases by electron).
    protocol.registerHttpProtocol("msal", async (req) => {
      const parsedUrl = new URL(req.url);
      const authCode = parsedUrl.searchParams.get("code");
      if (authCode) {
        // If we received the authorization code we can now close
        // the popup window and publish the authorization code to the
        // renderer which will create a credential object from it.
        Main.publish(IPC_MESSAGES.LOGIN_SUCCESS, authCode);
        this.loginWindow?.close();
      }
    });
  }

  getAuthorizeUrl(scopes: string[]): string {
    const queryParams = qs.stringify({
      client_id: MSAL_CONFIG.clientId,
      response_type: "code",
      redirect_uri: MSAL_CONFIG.redirectUri,
      scope: scopes.join(" ")
    });

    const authority = `https://login.microsoftonline.com/${tenantId}`;
    let url = `${authority}/oauth2/v2.0/authorize?${queryParams}`;
    return url;
  }

  // Login in this scenario means creating a new browser window and navigating
  // to the Authorization URL, allowing the user to provide their credentials
  // and allow the application access to the necessary scopes.
  login(): void {
    const authCodeUrl = this.getAuthorizeUrl(["openid", "profile", "User.Read"]);
    this.loginWindow = new BrowserWindow({
      width: 800,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.loginWindow.loadURL(authCodeUrl);
  }

  logout(): void {
    session.defaultSession.clearStorageData();
    Main.main();
  }
}
