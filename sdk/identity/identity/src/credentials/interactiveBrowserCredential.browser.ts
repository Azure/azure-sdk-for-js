// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { IdentityClient } from "../client/identityClient";
import {
  BrowserLoginStyle,
  InteractiveBrowserCredentialOptions
} from "./interactiveBrowserCredentialOptions";
import { createSpan } from "../util/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { DefaultTenantId, DeveloperSignOnClientId } from "../constants";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { MSALAuthCode } from "./msalBrowser/msalAuthCode";
import { MSALImplicit } from "./msalBrowser/msalImplicit";
import { IMSALBrowserFlow, MSALOptions } from "./msalBrowser/msalCommon";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  private tenantId: string;
  private clientId: string;
  private loginStyle: BrowserLoginStyle;
  private msal: IMSALBrowserFlow;

  /**
   * Creates an instance of the InteractiveBrowserCredential with the
   * details needed to authenticate against Azure Active Directory with
   * a user identity.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options?: InteractiveBrowserCredentialOptions) {
    this.tenantId = (options && options.tenantId) || DefaultTenantId;

    // TODO: temporary - this is the Azure CLI clientID - we'll replace it when
    // Developer Sign On application is available
    // https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/identity/Azure.Identity/src/Constants.cs#L9
    this.clientId = (options && options.clientId) || DeveloperSignOnClientId;

    options = {
      ...IdentityClient.getDefaultOptions(),
      ...options,
      tenantId: this.tenantId,
      clientId: this.clientId
    };

    this.loginStyle = options.loginStyle || "popup";
    const loginStyles = ["redirect", "popup"];
    if (loginStyles.indexOf(this.loginStyle) === -1) {
      const error = new Error(
        `Invalid loginStyle: ${
          options.loginStyle
        }. Should be any of the following: ${loginStyles.join(", ")}.`
      );
      logger.info(formatError("", error));
      throw error;
    }

    const {
      clientId,
      tenantId,
      authorityHost,
      correlationId,
      redirectUri,
      postLogoutRedirectUri,
      authenticationRecord
    } = options;

    const msalOptions: MSALOptions = {
      clientId,
      tenantId,
      authorityHost,
      correlationId,
      authenticationRecord,
      loginStyle: this.loginStyle,
      knownAuthorities: tenantId === "adfs" ? (authorityHost ? [authorityHost] : []) : [],
      redirectUri: typeof redirectUri === "function" ? redirectUri() : redirectUri,
      postLogoutRedirectUri:
        typeof postLogoutRedirectUri === "function"
          ? postLogoutRedirectUri()
          : postLogoutRedirectUri
    };

    if (options.flow === "implicit-grant") {
      this.msal = new MSALImplicit(msalOptions);
    } else {
      this.msal = new MSALAuthCode(msalOptions);
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("InteractiveBrowserCredential-getToken", options);
    try {
      const authResponse = await this.msal.acquireToken({
        scopes,
        ...options
      });

      if (!authResponse) {
        logger.getToken.info("No response");
        return null;
      }

      if (!authResponse.expiresOn) {
        logger.getToken.info(`Response had no "expiresOn" property.`);
        return null;
      }

      if (!authResponse.accessToken) {
        logger.getToken.info(`Response had no "accessToken" property.`);
        return null;
      }

      if (authResponse) {
        const expiresOnTimestamp = authResponse.expiresOn.getTime();
        logger.getToken.info(formatSuccess(scopes));
        return {
          token: authResponse.accessToken,
          expiresOnTimestamp
        };
      } else {
        logger.getToken.info("No response");
        return null;
      }
    } catch (err) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: err.message
      });
      logger.getToken.info(formatError(scopes, err));
      throw err;
    } finally {
      span.end();
    }
  }
}
