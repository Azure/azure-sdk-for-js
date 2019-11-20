// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as msal from "msal";
import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { IdentityClient } from "../client/identityClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";
import { createSpan } from "../util/tracing";
import { CanonicalCode } from "@opentelemetry/types";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { logger } from "../util/logging";

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
  constructor(options?: InteractiveBrowserCredentialOptions) {
    options = {
      ...IdentityClient.getDefaultOptions(),
      ...options,
      tenantId: (options && options.tenantId) || DefaultTenantId,
      // TODO: temporary - this is the Azure CLI clientID - we'll replace it when
      // Developer Sign On application is available
      // https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/src/Constants.cs#L9
      clientId: (options && options.clientId) || DeveloperSignOnClientId
    };

    this.loginStyle = options.loginStyle || "popup";
    if (["redirect", "popup"].indexOf(this.loginStyle) === -1) {
      throw new Error(`Invalid loginStyle: ${options.loginStyle}`);
    }

    this.msalConfig = {
      auth: {
        clientId: options.clientId!, // we just initialized it above
        authority: `${options.authorityHost}/${options.tenantId}`,
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
      logger.info("InteractiveBrowserCredential: attempting to acquire token silently");
      authResponse = await this.msalObject.acquireTokenSilent(authParams);
    } catch (err) {
      if (err instanceof msal.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            logger.warning(
              `InteractiveBrowserCredential: authentication returned errorCode ${err.errorCode}`
            );
            break;
          default:
            logger.warning(`InteractiveBrowserCredential: failed to acquire token: ${err}`);
            throw err;
        }
      }
    }

    let authPromise: Promise<msal.AuthResponse> | undefined;
    if (authResponse === undefined) {
      logger.warning(
        `InteractiveBrowserCredential: silent authentication failed, falling back to interactive method ${this.loginStyle}`
      );
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
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("InteractiveBrowserCredential-getToken", options);
    try {
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
    } catch (err) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }
}
