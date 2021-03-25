// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { AuthenticationRecord } from "../msal/types";
import { MsalOpenBrowser } from "../msal/nodeFlows/msalOpenBrowser";
import { MsalFlow } from "../msal/flows";
import {
  InteractiveBrowserCredentialBrowserOptions,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow.
 *
 * On NodeJS, it will open a browser window while it listens for a redirect response from the authentication service.
 *
 * It's recommended that the AAD Applications used are configured to authenticate using Single Page Applications.
 * More information here: [link](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow).
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private msalFlow: MsalFlow;
  private disableAutomaticAuthentication?: boolean;

  /**
   * Creates an instance of InteractiveBrowserCredential with the details needed.
   *
   * @param options - Options for configuring the client which makes the authentication requests.
   */
  constructor(
    options: InteractiveBrowserCredentialOptions | InteractiveBrowserCredentialBrowserOptions = {}
  ) {
    const redirectUri =
      typeof options.redirectUri === "function"
        ? options.redirectUri()
        : options.redirectUri || "http://localhost";

    this.msalFlow = new MsalOpenBrowser({
      ...options,
      tokenCredentialOptions: options,
      logger,
      redirectUri
    });
    this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * If the user provided the option `disableAutomaticAuthentication`,
   * once the token can't be retrieved silently,
   * this method won't attempt to request user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, {
        ...newOptions,
        disableAutomaticAuthentication: this.disableAutomaticAuthentication
      });
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * If the token can't be retrieved silently, this method will require user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  async authenticate(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AuthenticationRecord | undefined> {
    return trace(`${this.constructor.name}.authenticate`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      await this.msalFlow.getToken(arrayScopes, newOptions);
      return this.msalFlow.getActiveAccount();
    });
  }
}
