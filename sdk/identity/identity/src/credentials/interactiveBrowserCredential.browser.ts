// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { credentialLogger, formatError } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { AuthenticationRecord } from "../msal/types";
import { MSALAuthCode } from "../msal/browserFlows/msalAuthCode";
import { MsalBrowserFlowOptions } from "../msal/browserFlows/browserCommon";
import {
  InteractiveBrowserCredentialBrowserOptions,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private msalFlow: MsalFlow;
  private disableAutomaticAuthentication?: boolean;

  /**
   * Creates an instance of the InteractiveBrowserCredential with the
   * details needed to authenticate against Azure Active Directory with
   * a user identity.
   *
   * This credential uses the [Authorization Code Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow).
   * On Node.js, it will open a browser window while it listens for a redirect response from the authentication service.
   * On browsers, it authenticates via popups. The `loginStyle` optional parameter can be set to `redirect` to authenticate by redirecting the user to an Azure secure login page, which then will redirect the user back to the web application where the authentication started.
   *
   * It's recommended that the AAD Applications used are configured to authenticate using Single Page Applications.
   * More information here: [link](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow).
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    options: InteractiveBrowserCredentialBrowserOptions | InteractiveBrowserCredentialOptions
  ) {
    if (!options?.clientId) {
      const error = new Error(
        "The parameter `clientId` cannot be left undefined for the `InteractiveBrowserCredential`"
      );
      logger.info(formatError("", error));
      throw error;
    }

    const browserOptions = options as InteractiveBrowserCredentialBrowserOptions;
    const loginStyle = browserOptions.loginStyle || "popup";
    const loginStyles = ["redirect", "popup"];

    if (loginStyles.indexOf(loginStyle) === -1) {
      const error = new Error(
        `Invalid loginStyle: ${
          browserOptions.loginStyle
        }. Should be any of the following: ${loginStyles.join(", ")}.`
      );
      logger.info(formatError("", error));
      throw error;
    }

    const msalOptions: MsalBrowserFlowOptions = {
      ...options,
      logger,
      loginStyle: loginStyle,
      redirectUri:
        typeof options.redirectUri === "function" ? options.redirectUri() : options.redirectUri
    };

    this.msalFlow = new MSALAuthCode(msalOptions);
    this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
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
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
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
