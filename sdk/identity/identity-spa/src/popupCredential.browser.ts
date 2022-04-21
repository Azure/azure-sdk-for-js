// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AuthenticationRecord } from "@azure/identity";

import { credentialLogger, formatError } from "../../identity/src/util/logging";
import { tracingClient } from "../../identity/src/util/tracing";
import { MsalFlow } from "../../identity/src/msal/flows";
import { MSALAuthCode } from "../../identity/src/msal/browserFlows/msalAuthCode";
import { MsalBrowserFlowOptions } from "../../identity/src/msal/browserFlows/msalBrowserCommon";
import { SPACredentialOptions } from "./options";

const logger = credentialLogger("PopupCredential");

// We keep a copy of the redirect hash.
const redirectHash = self.location.hash;

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow within a browser popup window.
 */
export class PopupCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the PopupCredential with the
   * details needed to authenticate against Azure Active Directory with
   * a user identity.
   *
   * This credential uses the [Authorization Code Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow).
   * On Node.js, it will open a browser window while it listens for a redirect response from the authentication service.
   * On browsers, it authenticates via popups. The `loginStyle` optional parameter can be set to `redirect` to authenticate by redirecting the user to an Azure secure login page, which then will redirect the user back to the web application where the authentication started.
   *
   * Configure your AAD Application to authenticate using a Single Page Application redirect endpoint.
   * More information here: [link](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow).
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options: SPACredentialOptions) {
    if (!options?.clientId) {
      const error = new Error(
        "The parameter `clientId` cannot be left undefined for the `PopupCredential`"
      );
      logger.info(formatError("", error));
      throw error;
    }

    const msalOptions: MsalBrowserFlowOptions = {
      ...options,
      logger,
      loginStyle: "popup",
      redirectUri:
        typeof options.redirectUri === "function" ? options.redirectUri() : options.redirectUri,
    };

    this.msalFlow = new MSALAuthCode(msalOptions);
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return tracingClient.withSpan(
      `${this.constructor.name}.getToken`,
      options,
      async (newOptions) => {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        return this.msalFlow.getToken(arrayScopes, {
          ...newOptions,
          disableAutomaticAuthentication: true,
        });
      }
    );
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
    return tracingClient.withSpan(
      `${this.constructor.name}.authenticate`,
      options,
      async (newOptions) => {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        await this.msalFlow.getToken(arrayScopes, newOptions);
        return this.msalFlow.getActiveAccount();
      }
    );
  }

  /**
   * Retrieves parameters from the URL hash.
   */
  async onPageLoad(): Promise<{ code?: string; state?: string }> {
    const hash = new URLSearchParams(redirectHash);
    return {
      code: hash.get("code") || undefined,
      state: hash.get("state") || undefined,
    };
  }
}
