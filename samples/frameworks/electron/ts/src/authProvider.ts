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

  Finally, you may visit https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
  to learn more about the OAuth 2.0 authorization code flow.
*/
import { BrowserWindow, protocol, session } from "electron";
import qs from "qs";
import { IPC_MESSAGES, MSAL_CONFIG } from "./constants";
import Main from "./main";

export default class AuthProvider {
  private loginWindow?: BrowserWindow;

  constructor() {
    // Register a custom handler for `msal://` scheme
    // which is needed to get an authentication callback
    // By default Electron will serve and handle files, and
    // file:// is not a valid scheme for OAuth callback URIs.
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

  /**
   * Initiate the login flow to fetch an authorization token.
   *
   * @remarks
   * Login in this scenario means creating a new browser window and navigating
   * to the Authorization URL, allowing the user to provide their credentials
   * and allow the application access to the necessary scopes.
   */
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

  /**
   * Logout a user and reload the main application.
   *
   * @remarks
   * For this example it's sufficient to clear all storage data
   * as a way to logout a user.
   */
  logout(): void {
    session.defaultSession.clearStorageData();
    Main.main();
  }

  private getAuthorizeUrl(scopes: string[]): string {
    // Construct the proper authorization URI for the authorization code flow.
    const queryParams = qs.stringify({
      client_id: MSAL_CONFIG.clientId,
      response_type: "code",
      redirect_uri: MSAL_CONFIG.redirectUri,
      scope: scopes.join(" ")
    });

    const authority = `https://login.microsoftonline.com/${MSAL_CONFIG.tenantId}`;
    return `${authority}/oauth2/v2.0/authorize?${queryParams}`;
  }
}
