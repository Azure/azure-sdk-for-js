// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  InteractiveBrowserCredentialInBrowserOptions,
  InteractiveBrowserCredentialNodeOptions,
} from "./interactiveBrowserCredentialOptions";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { AuthenticationRecord } from "../msal/types";
import { MsalFlow } from "../msal/flows";
import { MsalOpenBrowser } from "../msal/nodeFlows/msalOpenBrowser";
import { credentialLogger } from "../util/logging";
import { ensureScopes } from "../util/scopeUtils";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Microsoft Entra ID inside of the web browser
 * using the interactive login flow.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private tenantId?: string;
  private additionallyAllowedTenantIds: string[];
  private msalFlow: MsalFlow;
  private disableAutomaticAuthentication?: boolean;

  /**
   * Creates an instance of InteractiveBrowserCredential with the details needed.
   *
   * This credential uses the [Authorization Code Flow](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow).
   * On Node.js, it will open a browser window while it listens for a redirect response from the authentication service.
   * On browsers, it authenticates via popups. The `loginStyle` optional parameter can be set to `redirect` to authenticate by redirecting the user to an Azure secure login page, which then will redirect the user back to the web application where the authentication started.
   *
   * For Node.js, if a `clientId` is provided, the Microsoft Entra application will need to be configured to have a "Mobile and desktop applications" redirect endpoint.
   * Follow our guide on [setting up Redirect URIs for Desktop apps that calls to web APIs](https://learn.microsoft.com/azure/active-directory/develop/scenario-desktop-app-registration#redirect-uris).
   *
   * @param options - Options for configuring the client which makes the authentication requests.
   */
  constructor(
    options:
      | InteractiveBrowserCredentialNodeOptions
      | InteractiveBrowserCredentialInBrowserOptions = {}
  ) {
    const redirectUri =
      typeof options.redirectUri === "function"
        ? options.redirectUri()
        : options.redirectUri || "http://localhost";

    this.tenantId = options?.tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );

    this.msalFlow = new MsalOpenBrowser({
      ...options,
      tokenCredentialOptions: options,
      logger,
      redirectUri,
      browserCustomizationOptions: (options as InteractiveBrowserCredentialNodeOptions)
        .browserCustomizationOptions,
    });
    this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
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
    return tracingClient.withSpan(
      `${this.constructor.name}.getToken`,
      options,
      async (newOptions) => {
        newOptions.tenantId = processMultiTenantRequest(
          this.tenantId,
          newOptions,
          this.additionallyAllowedTenantIds,
          logger
        );

        const arrayScopes = ensureScopes(scopes);
        return this.msalFlow.getToken(arrayScopes, {
          ...newOptions,
          disableAutomaticAuthentication: this.disableAutomaticAuthentication,
        });
      }
    );
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * If the token can't be retrieved silently, this method will require user interaction to retrieve the token.
   *
   * On Node.js, this credential has [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) enabled by default.
   * PKCE is a security feature that mitigates authentication code interception attacks.
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
        const arrayScopes = ensureScopes(scopes);
        await this.msalFlow.getToken(arrayScopes, newOptions);
        return this.msalFlow.getActiveAccount();
      }
    );
  }
}
