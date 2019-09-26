// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as msal from "msal";
import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { IdentityClient } from "../client/identityClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private loginStyle: BrowserLoginStyle;
  private msalConfig: msal.Configuration;
  private msalObject: msal.UserAgentApplication;

  /**
   * Creates an instance of the InteractiveBrowserCredential with the
   * details needed to authenticate against Azure Active Directory with
   * a user identity.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(tenantId: string, clientId: string, options?: InteractiveBrowserCredentialOptions) {
    options = { ...IdentityClient.getDefaultOptions(), ...options };

    this.loginStyle = options.loginStyle || "popup";
    if (["redirect", "popup"].indexOf(this.loginStyle) === -1) {
      throw new Error(`Invalid loginStyle: ${options.loginStyle}`);
    }

    this.msalConfig = {
      auth: {
        clientId: clientId,
        authority: `${options.authorityHost}/${tenantId}`,
        ...(options.redirectUri && { redirectUri: options.redirectUri }),
        ...(options.postLogoutRedirectUri && { redirectUri: options.postLogoutRedirectUri })
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };

    this.msalObject = new msal.UserAgentApplication(this.msalConfig);
  }

  private login(): Promise<msal.AuthResponse> {
    switch (this.loginStyle) {
      case "redirect": {
        const loginPromise = new Promise<msal.AuthResponse>((resolve, reject) => {
          this.msalObject.handleRedirectCallback(resolve, reject);
        });
        this.msalObject.loginRedirect();
        return loginPromise;
      }
      case "popup":
        return this.msalObject.loginPopup();
    }
  }

  private async acquireToken(
    authParams: msal.AuthenticationParameters
  ): Promise<msal.AuthResponse | undefined> {
    let authResponse: msal.AuthResponse | undefined;
    try {
      authResponse = await this.msalObject.acquireTokenSilent(authParams);
    } catch (err) {
      if (err instanceof msal.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            break;
          default:
            throw err;
        }
      }
    }

    let authPromise: Promise<msal.AuthResponse> | undefined;
    if (authResponse === undefined) {
      switch (this.loginStyle) {
        case "redirect":
          authPromise = new Promise((resolve, reject) => {
            this.msalObject.handleRedirectCallback(resolve, reject);
          });
          this.msalObject.acquireTokenRedirect(authParams);
          break;
        case "popup":
          authPromise = this.msalObject.acquireTokenPopup(authParams);
          break;
      }

      authResponse = authPromise && (await authPromise);
    }

    return authResponse;
  }

  /**
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<AccessToken | null> {
    if (!this.msalObject.getAccount()) {
      await this.login();
    }

    const authResponse = await this.acquireToken({
      scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
    });

    if (authResponse) {
      return {
        token: authResponse.accessToken,
        expiresOnTimestamp: authResponse.expiresOn.getTime()
      };
    } else {
      return null;
    }
  }
}
