/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create an Authentication provider
  which is capable of fetching an authorization token for 
*/
import { BrowserWindow, protocol, session } from "electron";
import qs from "qs";
import { IPC_MESSAGES } from "./Constants";
import Main from "./Main";
import { getEnvironmentVariable } from "./utils";

const tenantId = getEnvironmentVariable("TENANT_ID");
const clientId = getEnvironmentVariable("CLIENT_ID");
export const msalConfig = {
  clientId,
  tenantId,
  redirectUri: "msal://redirect"
};

export default class AuthProvider {
  private loginWindow: BrowserWindow;

  constructor() {
    // Register a custom handler for `msal://` scheme
    // which is needed to get an authentication callback
    // handler (otherwise `file://` is used)
    protocol.registerHttpProtocol("msal", async (req) => {
      const parsedUrl = new URL(req.url);
      const authCode = parsedUrl.searchParams.get("code");
      if (authCode) {
        Main.publish(IPC_MESSAGES.LOGIN_SUCCESS, authCode);
        this.loginWindow?.close();
      }
    });
  }

  getAuthorizeUrl(scopes: string[]): string {
    const queryParams = qs.stringify({
      client_id: msalConfig.clientId,
      response_type: "code",
      redirect_uri: msalConfig.redirectUri,
      scope: scopes.join(" ")
    });

    const authority = `https://login.microsoftonline.com/${tenantId}`;
    let url = `${authority}/oauth2/v2.0/authorize?${queryParams}`;
    return url;
  }

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
