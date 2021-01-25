// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalBrowser from "@azure/msal-browser";
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
  private msalConfig: msalBrowser.Configuration;
  private msalObject: msalBrowser.PublicClientApplication;
  private correlationId: string | undefined;

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
    if (["redirect", "popup"].indexOf(this.loginStyle) === -1) {
      const error = new Error(`Invalid loginStyle: ${options.loginStyle}`);
      logger.info(formatError("", error));
      throw error;
    }

    const knownAuthorities =
      options.tenantId === "adfs" ? (options.authorityHost ? [options.authorityHost] : []) : [];

    this.correlationId = options.correlationId;

    this.msalConfig = {
      auth: {
        clientId: options.clientId!, // we just initialized it above
        authority: `${options.authorityHost}/${options.tenantId}`,
        knownAuthorities
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true // Set to true to improve the experience on IE11 and Edge.
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case msalBrowser.LogLevel.Error:
                logger.info(`MSAL Browser V2 error: ${message}`);
                return;
              case msalBrowser.LogLevel.Info:
                logger.info(`MSAL Browser V2 info message: ${message}`);
                return;
              case msalBrowser.LogLevel.Verbose:
                logger.info(`MSAL Browser V2 verbose message: ${message}`);
                return;
              case msalBrowser.LogLevel.Warning:
                logger.info(`MSAL Browser V2 warning: ${message}`);
                return;
            }
          }
        }
      }
    };

    this.msalConfig.auth.redirectUri =
      typeof options.redirectUri === "function" ? options.redirectUri() : options.redirectUri;

    this.msalConfig.auth.postLogoutRedirectUri =
      typeof options.postLogoutRedirectUri === "function"
        ? options.postLogoutRedirectUri()
        : options.postLogoutRedirectUri;

    this.msalObject = new msalBrowser.PublicClientApplication(this.msalConfig);

    this.handleRedirectResponse();
  }

  /**
   * Handles the redirect response based on the credentials available at page load.
   */
  private async handleRedirectResponse(): Promise<void> {
    try {
      const result = await this.msalObject.handleRedirectPromise();
      if (result && result.account) {
        logger.info(`MSAL Browser V2 redirect authentication successful.`);
        this.msalObject.setActiveAccount(result.account);
      } else {
        const accounts = this.msalObject.getAllAccounts();
        if (accounts.length > 1) {
          throw new Error(
            [
              "More than one account was found authenticated for this Client ID and Tenant ID.",
              "This scenario is not yet supported by @azure/identity.",
              "For now, you can bypass this error by cleaning up your browser cache."
            ].join("\n")
          );
        } else if (accounts.length === 1) {
          this.msalObject.setActiveAccount(accounts[0]);
        } else {
          logger.info(`No accounts were found through MSAL.`);
        }
      }
    } catch (e) {
      logger.info(`Failed to acquire token through the MSAL redirect login method. ${e.message}`);
    }
  }

  private async login(scopes: string | string[]): Promise<msalBrowser.AuthenticationResult | null> {
    const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    const loginRequest = {
      scopes: arrayScopes
    };
    switch (this.loginStyle) {
      case "redirect": {
        await this.msalObject.loginRedirect(loginRequest);
        return null;
      }
      case "popup":
        return this.msalObject.loginPopup(loginRequest);
    }
  }

  private async acquireToken(
    authParams: msalBrowser.SilentRequest
  ): Promise<msalBrowser.AuthenticationResult | undefined> {
    let authResponse: msalBrowser.AuthenticationResult | undefined;
    try {
      logger.info("Attempting to acquire token silently");
      authResponse = await this.msalObject.acquireTokenSilent(authParams);
    } catch (err) {
      if (err instanceof msalBrowser.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            logger.info(`Authentication returned errorCode ${err.errorCode}`);
            break;
          default:
            logger.info(formatError(authParams.scopes, `Failed to acquire token: ${err.message}`));
            throw err;
        }
      }
    }

    if (authResponse === undefined) {
      logger.info(
        `Silent authentication failed, falling back to interactive method ${this.loginStyle}`
      );
      switch (this.loginStyle) {
        case "redirect":
          // This will go out of the page.
          // Once the InteractiveBrowserCredential is initialized again,
          // we'll load the MSAL account in the constructor.
          await this.msalObject.acquireTokenRedirect(authParams);
          return undefined;
        case "popup":
          authResponse = await this.msalObject.acquireTokenPopup(authParams);
          break;
      }
    }

    return authResponse;
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
      let account = this.msalObject.getActiveAccount();
      if (!account) {
        const result = await this.login(scopes);
        if (result && result.account) {
          account = result.account;
          this.msalObject.setActiveAccount(account);
        } else {
          logger.getToken.info("No login response");
          return null;
        }
      }

      const authResponse = await this.acquireToken({
        authority: this.msalConfig.auth.authority!,
        correlationId: this.correlationId, // If undefined, MSAL will automatically generate one.
        account,
        forceRefresh: false,
        scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
      });

      if (!authResponse) {
        logger.getToken.info("No response");
        return null;
      }

      if (!authResponse.expiresOn) {
        logger.getToken.info(`Response had no "expiresOn" property.`);
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
