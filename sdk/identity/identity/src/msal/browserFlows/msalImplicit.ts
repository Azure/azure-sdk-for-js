// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msal from "msal";
import { MsalBrowserFlowOptions, MsalBrowser } from "./browserCommon";
import { AccessToken } from "@azure/core-http";
import { AuthenticationRecord } from "../types";
import { AuthenticationRequired } from "../errors";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { publicToMsal, serializeAuthenticationRecord } from "../transformations";
import { getAuthorityHost } from "../utils";

/**
 * Uses MSAL directly for browser authentication,
 * which uses the [Implicit Grant Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
 * @internal
 */
export class MSALImplicit extends MsalBrowser {
  protected app: msal.UserAgentApplication;

  /**
   * Sets up an MSAL object based on the given parameters.
   * MSAL with Implicit Grant is not compatible with the account workflow we use from the MSAL Auth Code flow.
   * In this case, any `authenticationRecord` received will be ignored.
   * @param options - Parameters necessary and otherwise used to create the MSAL object.
   */
  constructor(options: MsalBrowserFlowOptions) {
    super(options);

    this.msalConfig.cache = {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true // Set to true to improve the experience on IE11 and Edge.
    };

    // Preparing the MSAL application.
    this.app = new msal.UserAgentApplication(this.msalConfig as msal.Configuration);
  }

  /**
   * Formats an MSAL 1 account into an `AuthenticationRecord`.
   * @param account - The account in the shape defined by MSAL.
   */
  private msalBrowserToPublicAccount(account: msal.Account): AuthenticationRecord {
    const record = {
      homeAccountId: account.homeAccountIdentifier,
      authority: getAuthorityHost(this.tenantId, account.environment),
      tenantId: this.tenantId,
      username: account.environment,
      serialize: () => serializeAuthenticationRecord(record)
    };
    return record;
  }

  /**
   * Loads the account based on the result of the authentication.
   * If no result was received, tries to load the account from the cache.
   * @param result - Result object received from MSAL.
   */
  private async handleBrowserResult(
    result?: msal.AuthResponse
  ): Promise<AuthenticationRecord | undefined> {
    if (result?.account) {
      this.logger.info(`Authentication successful.`);
      this.account = this.msalBrowserToPublicAccount(result?.account);
      return this.account;
    }
    await this.getActiveAccount();
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
    if (!self.location.hash) {
      return;
    }
    this.redirectPromise = new Promise((resolve, reject) => {
      this.app.handleRedirectCallback(async (result) => {
        if (!result?.account) {
          const errorMessage = `Authentication failed. No redirect result.`;
          this.logger.info(errorMessage);
          reject(new Error(errorMessage));
        }
        await this.handleBrowserResult(result!);
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
        return this.handleBrowserResult(await this.app.loginPopup());
    }
  }

  /**
   * Returns the existing account, attempts to load the account from MSAL.
   */
  public async getActiveAccount(): Promise<AuthenticationRecord | undefined> {
    if (this.account) {
      return this.account;
    }
    const account = this.app.getAccount();
    if (!account) {
      return;
    }
    this.account = this.msalBrowserToPublicAccount(account);
    return this.account;
  }

  /**
   * Attempts to retrieve a token from cache.
   */
  public async getTokenSilent(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    const account = await this.getActiveAccount();
    if (!account) {
      throw new AuthenticationRequired();
    }

    const parameters: msal.AuthenticationParameters = {
      authority: this.msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      scopes
    };

    try {
      this.logger.info("Attempting to acquire token silently");
      const response = await this.app.acquireTokenSilent(parameters);
      return this.handleResult(scopes, {
        account: {
          ...this.msalBrowserToPublicAccount(response.account),
          localAccountId: response.account.accountIdentifier
        },
        accessToken: response.accessToken,
        expiresOn: response.expiresOn
      });
    } catch (err) {
      throw this.handleError(scopes, err);
    }
  }

  /**
   * Attempts to retrieve the token in the browser.
   */
  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    const account = await this.getActiveAccount();
    if (!account) {
      throw new AuthenticationRequired();
    }

    const parameters: msal.AuthenticationParameters = {
      authority: this.msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      scopes
    };

    let response: msal.AuthResponse | undefined;

    switch (this.loginStyle) {
      case "redirect":
        // This will go out of the page.
        // Once the InteractiveBrowserCredential is initialized again,
        // we'll load the MSAL account in the constructor.
        this.app.acquireTokenRedirect(parameters);
        throw new Error("Redirecting...");
      case "popup":
        response = await this.app.acquireTokenPopup(parameters);
        return this.handleResult(scopes, {
          account: publicToMsal(this.msalBrowserToPublicAccount(response.account)),
          accessToken: response.accessToken,
          expiresOn: response.expiresOn
        });
    }
  }
}
