// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalBrowser from "@azure/msal-browser";
import { AuthenticationRecord } from "../../client/msalClient";
import { credentialLogger } from "../../util/logging";
import {
  BrowserLoginStyle,
  InteractiveBrowserAuthenticateOptions
} from "../interactiveBrowserCredentialOptions";
import { IMSALBrowserFlow, IMSALToken, MSALOptions } from "./msalCommon";

const logger = credentialLogger("MSAL Browser v2 - Auth Code Flow");

// We keep a copy of the redirect hash.
const redirectHash = window.location.hash;

/**
 * Uses MSAL Browser 2.X for browser authentication,
 * which uses the [Auth Code Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow).
 */
export class MSALAuthCode implements IMSALBrowserFlow {
  private config: msalBrowser.Configuration;
  private app: msalBrowser.PublicClientApplication;
  private loginStyle: BrowserLoginStyle;
  private correlationId?: string;

  /**
   * Sets up an MSAL object based on the given parameters.
   * MSAL with Auth Code allows sending a previously obtained `authenticationRecord` through the optional parameters,
   * which is set to be the active account.
   * @param options - Parameters necessary and otherwise used to create the MSAL object.
   */
  constructor(options: MSALOptions) {
    this.loginStyle = options.loginStyle;
    this.correlationId = options.correlationId;
    this.config = {
      auth: {
        clientId: options.clientId!, // we just initialized it above
        authority: `${options.authorityHost}/${options.tenantId}`,
        knownAuthorities: options.knownAuthorities,
        redirectUri: options.redirectUri,
        postLogoutRedirectUri: options.postLogoutRedirectUri
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

    this.app = new msalBrowser.PublicClientApplication(this.config);

    if (options.authenticationRecord) {
      this.app.setActiveAccount(options.authenticationRecord);
    }
  }

  /**
   * Loads the account based on the result of the authentication.
   * If no result was received, tries to load the account from the cache.
   * @param result - Result object received from MSAL.
   */
  private async handleResult(
    result?: msalBrowser.AuthenticationResult
  ): Promise<AuthenticationRecord | undefined> {
    try {
      if (result && result.account) {
        logger.info(`MSAL Browser V2 authentication successful.`);
        this.app.setActiveAccount(result.account);
        return result.account;
      }

      // If by this point we happen to have an active account, we should stop trying to parse this.
      const activeAccount = this.app.getActiveAccount();
      if (activeAccount) {
        return activeAccount;
      }

      // If we don't have an active account, we try to activate it from all the already loaded accounts.
      const accounts = this.app.getAllAccounts();
      if (accounts.length > 1) {
        // If there's more than one account in memory, we force the user to authenticate again.
        // At this point we can't identify which account should this credential work with,
        // since at this point the user won't have provided enough information.
        // We log a message in case that helps.
        logger.info(
          [
            "More than one account was found authenticated for this Client ID and Tenant ID.",
            "However, no `authenticationRecord` has been provided for this credential,",
            "therefore we're unable to pick between these accounts.",
            "A new login attempt will be requested, to ensure the correct account is picked.",
            "To work with multiple accounts for the same Client ID and Tenant ID, please provide an `authenticationRecord` when initializing `InteractiveBrowserCredential`."
          ].join("\n")
        );
        // To safely trigger a new login, we're also ensuring the local cache is cleared up for this MSAL object.
        // However, we want to avoid kicking the user out of their authentication on the Azure side.
        // We do this by calling to logout while specifying a `onRedirectNavigate` that returns false.
        await this.app.logout({
          onRedirectNavigate: () => false
        });
        return;
      }

      // If there's only one account for this MSAL object, we can safely activate it.
      if (accounts.length === 1) {
        this.app.setActiveAccount(accounts[0]);
        return accounts[0];
      }

      logger.info(`No accounts were found through MSAL.`);
    } catch (e) {
      logger.info(`Failed to acquire token through MSAL. ${e.message}`);
    }
    return;
  }

  /**
   * Uses MSAL to handle the redirect.
   */
  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    return this.handleResult((await this.app.handleRedirectPromise(redirectHash)) || undefined);
  }

  /**
   * Uses MSAL to trigger a redirect or a popup login.
   */
  public async login(scopes: string | string[] = []): Promise<AuthenticationRecord | undefined> {
    const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    const loginRequest = {
      scopes: arrayScopes
    };
    switch (this.loginStyle) {
      case "redirect": {
        await this.app.loginRedirect(loginRequest);
        return;
      }
      case "popup":
        return this.handleResult(await this.app.loginPopup(loginRequest));
    }
  }

  /**
   * Uses MSAL to retrieve the active account.
   */
  public getActiveAccount(): AuthenticationRecord | undefined {
    return this.app.getActiveAccount() || undefined;
  }

  /**
   * Allows users to manually authenticate and retrieve the AuthenticationRecord.
   * @param options - Optional parameters to authenticate with, like the scope.
   */
  public async authenticate(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<AuthenticationRecord | undefined> {
    // We ensure that redirection is handled at this point.
    await this.handleRedirect();

    // If we have an active account, we return that.
    const account = this.getActiveAccount();
    if (account) {
      return account;
    }

    const scopes = options.scopes;
    if (!scopes) {
      throw new Error(
        `Invalid scopes in the authenticate function of the MSAL Auth Code flow. Received: ${scopes}`
      );
    }

    // Otherwise we try to login.
    return this.login(scopes);
  }

  /**
   * Attempts to retrieve an authenticated token from MSAL.
   * @param options - Properties useful to retrieve the token, like the scopes and the abortSignal.
   */
  public async acquireToken(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<IMSALToken | undefined> {
    const account = await this.authenticate(options);

    const scopes = options.scopes;
    if (!scopes) {
      throw new Error(
        `Invalid scopes in the acquireToken function of the MSAL Auth Code flow. Received: ${scopes}`
      );
    }

    const silentRequest: msalBrowser.SilentRequest = {
      authority: this.config.auth.authority!,
      correlationId: this.correlationId, // If undefined, MSAL will automatically generate one.
      account,
      forceRefresh: false,
      scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
    };

    let authResponse: msalBrowser.AuthenticationResult | undefined;

    try {
      logger.info("Attempting to acquire token silently");
      authResponse = await this.app.acquireTokenSilent(silentRequest);
    } catch (err) {
      if (err instanceof msalBrowser.AuthError) {
        switch (err.errorCode) {
          case "consent_required":
          case "interaction_required":
          case "login_required":
            logger.info(`Authentication returned errorCode ${err.errorCode}`);
            break;
          default:
            logger.info(`Failed to acquire token: ${err.message}`);
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
          await this.app.acquireTokenRedirect(silentRequest);
          return undefined;
        case "popup":
          authResponse = await this.app.acquireTokenPopup(silentRequest);
          break;
      }
    }

    return {
      accessToken: authResponse.accessToken,
      expiresOn: authResponse.expiresOn
    };
  }
}
