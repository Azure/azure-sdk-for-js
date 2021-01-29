// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msal from "msal";
import { AuthenticationRecord } from "../../client/msalClient";
import { credentialLogger } from "../../util/logging";
import {
  BrowserLoginStyle,
  InteractiveBrowserAuthenticateOptions
} from "../interactiveBrowserCredentialOptions";
import { IMSALBrowserFlow, IMSALToken, MSALOptions } from "./msalCommon";

const logger = credentialLogger("MSAL Browser v1 - Implicit Grant Flow");

/**
 * Uses MSAL directly for browser authentication,
 * which uses the [Implicit Grant Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
 */
export class MSALImplicit implements IMSALBrowserFlow {
  private config: msal.Configuration;
  private app: msal.UserAgentApplication;
  private loginStyle: BrowserLoginStyle;
  private correlationId?: string;
  private tenantId: string;
  private account: AuthenticationRecord | undefined;

  /**
   * Sets up an MSAL object based on the given parameters.
   * MSAL with Implicit Grant is not compatible with the account workflow we use from the MSAL Auth Code flow.
   * In this case, any `authenticationRecord` received will be ignored.
   * @param options - Parameters necessary and otherwise used to create the MSAL object.
   */
  constructor(options: MSALOptions) {
    this.loginStyle = options.loginStyle;
    this.correlationId = options.correlationId;
    this.tenantId = options.tenantId!;
    this.config = {
      auth: {
        clientId: options.clientId!, // we just initialized it above
        authority: `${options.authorityHost}/${options.tenantId}`,
        knownAuthorities: options.knownAuthorities,
        // If the users picked redirect as their login style,
        // but they didn't provide a redirectUri,
        // we can try to use the current page we're in as a default value.
        redirectUri: options.redirectUri || window.location.origin,
        postLogoutRedirectUri: options.postLogoutRedirectUri
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true // Set to true to improve the experience on IE11 and Edge.
      }
    };

    this.app = new msal.UserAgentApplication(this.config);
  }

  /**
   * Formats an MSAL 1 account into an `AuthenticationRecord`.
   * @param account - The account in the shape defined by MSAL.
   */
  private handleAccount(account: msal.Account): AuthenticationRecord {
    return {
      homeAccountId: account.homeAccountIdentifier,
      environment: account.environment,
      tenantId: this.tenantId,
      localAccountId: account.accountIdentifier,
      username: account.environment
    };
  }

  /**
   * Loads the account based on the result of the authentication.
   * If no result was received, tries to load the account from the cache.
   * @param result - Result object received from MSAL.
   */
  private handleResult(result?: msal.AuthResponse): AuthenticationRecord | undefined {
    if (result?.account) {
      logger.info(`Authentication successful.`);
      this.account = this.handleAccount(result?.account);
      return this.account;
    }
    this.getActiveAccount();
    if (this.account) {
      return this.account;
    }
    return;
  }

  private redirectPromise: Promise<AuthenticationRecord | undefined> | undefined;

  /**
   * Attempts to handle a redirection request the least amount of times possible.
   */
  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    if (this.account) {
      return this.account;
    }
    if (this.redirectPromise) {
      return this.redirectPromise;
    }
    if (!window.location.hash) {
      return;
    }
    this.redirectPromise = new Promise((resolve, reject) => {
      this.app.handleRedirectCallback((result) => {
        if (!result?.account) {
          const errorMessage = `Authentication failed. No redirect result.`;
          logger.info(errorMessage);
          reject(new Error(errorMessage));
        }
        this.handleResult(result!);
        resolve(this.account);
      }, reject);
    });
    return this.redirectPromise;
  }

  /**
   * Uses MSAL to trigger a redirect or a popup login.
   */
  public async login(): Promise<AuthenticationRecord | undefined> {
    switch (this.loginStyle) {
      case "redirect": {
        this.handleRedirect();
        this.app.loginRedirect();
        return this.redirectPromise;
      }
      case "popup":
        return this.handleResult(await this.app.loginPopup());
    }
  }

  /**
   * Returns the existing account, attempts to load the account from MSAL.
   */
  public getActiveAccount(): AuthenticationRecord | undefined {
    if (this.account) {
      return this.account;
    }
    const account = this.app.getAccount();
    if (!account) {
      return;
    }
    this.account = this.handleAccount(account);
    return this.account;
  }

  /**
   * Allows users to manually authenticate and retrieve the AuthenticationRecord.
   * @param options - Optional parameters to authenticate with, like the scope.
   */
  public async authenticate(): Promise<AuthenticationRecord | undefined> {
    // We ensure that redirection is handled at this point.
    await this.handleRedirect();

    // If we've been able to retrieve the account, we return it.
    if (this.account) {
      return this.account;
    }

    // Otherwise we try to login.
    return this.login();
  }

  /**
   * Attempts to retrieve an authenticated token from MSAL.
   * @param options - Properties useful to retrieve the token, like the scopes and the abortSignal.
   */
  public async acquireToken(
    options: InteractiveBrowserAuthenticateOptions
  ): Promise<IMSALToken | undefined> {
    await this.authenticate();

    const scopes = options.scopes;
    if (!scopes) {
      throw new Error(
        `Invalid scopes in the acquireToken function of the MSAL Auth Code flow. Received: ${scopes}`
      );
    }

    const silentRequest: msal.AuthenticationParameters = {
      authority: this.config.auth.authority!,
      correlationId: this.correlationId, // If undefined, MSAL will automatically generate one.
      scopes: Array.isArray(scopes) ? scopes : scopes.split(",")
    };

    let authResponse: msal.AuthResponse | undefined;

    try {
      logger.info("Attempting to acquire token silently");
      authResponse = await this.app.acquireTokenSilent(silentRequest);
    } catch (err) {
      if (err instanceof msal.AuthError) {
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
          this.app.acquireTokenRedirect(silentRequest);
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
