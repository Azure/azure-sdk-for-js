// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as msalBrowser from "@azure/msal-browser";

import type {
  MsalBrowserClient,
  MsalBrowserFlow,
  MsalBrowserFlowOptions,
} from "./msalBrowserCommon.js";
import {
  defaultLoggerCallback,
  ensureValidMsalToken,
  getAuthority,
  getKnownAuthorities,
  getMSALLogLevel,
  handleMsalError,
  msalToPublic,
  publicToMsal,
} from "../utils.js";

import type { AccessToken, GetTokenOptions } from "@azure/core-auth";
import type { AuthenticationRecord, MsalResult } from "../types.js";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../errors.js";
import type { CredentialFlowGetTokenOptions } from "../credentials.js";
import { getLogLevel } from "@azure/logger";
import { BrowserLoginStyle } from "../../credentials/interactiveBrowserCredentialOptions.js";
import { CredentialLogger, formatSuccess } from "../../util/logging.js";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
  resolveTenantId,
} from "../../util/tenantIdUtils.js";
import { DefaultTenantId } from "../../constants.js";

/**
 * Generates a MSAL configuration that generally works for browsers
 * @internal
 */
function generateMsalBrowserConfiguration(
  options: MsalBrowserFlowOptions,
): msalBrowser.Configuration {
  const tenantId = options.tenantId || DefaultTenantId;
  const authority = getAuthority(tenantId, options.authorityHost);
  return {
    auth: {
      clientId: options.clientId!,
      authority,
      knownAuthorities: getKnownAuthorities(tenantId, authority, options.disableInstanceDiscovery),
      // If the users picked redirect as their login style,
      // but they didn't provide a redirectUri,
      // we can try to use the current page we're in as a default value.
      redirectUri: options.redirectUri || self.location.origin,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true, // Set to true to improve the experience on IE11 and Edge.
    },
    system: {
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(options.logger, "Browser"),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
      },
    },
  };
}

// We keep a copy of the redirect hash.
const redirectHash = self.location.hash;

/**
 * Uses MSAL Browser 2.X for browser authentication,
 * which uses the [Auth Code Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow).
 * @internal
 */
export class MSALAuthCode implements MsalBrowserFlow {
  protected loginStyle: BrowserLoginStyle;
  protected clientId: string;
  protected tenantId: string;
  protected additionallyAllowedTenantIds: string[];
  protected authorityHost?: string;
  protected account: AuthenticationRecord | undefined;
  protected msalConfig: msalBrowser.Configuration;
  protected disableAutomaticAuthentication?: boolean;
  protected app?: msalBrowser.IPublicClientApplication;
  protected logger: CredentialLogger;
  private loginHint?: string;

  /**
   * Sets up an MSAL object based on the given parameters.
   * MSAL with Auth Code allows sending a previously obtained `authenticationRecord` through the optional parameters,
   * which is set to be the active account.
   * @param options - Parameters necessary and otherwise used to create the MSAL object.
   */
  constructor(options: MsalBrowserFlowOptions) {
    this.logger = options.logger;
    this.loginStyle = options.loginStyle;
    if (!options.clientId) {
      throw new CredentialUnavailableError("A client ID is required in browsers");
    }
    this.clientId = options.clientId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.tokenCredentialOptions?.additionallyAllowedTenants,
    );
    this.tenantId = resolveTenantId(this.logger, options.tenantId, options.clientId);
    this.authorityHost = options.authorityHost;
    this.msalConfig = generateMsalBrowserConfiguration(options);
    this.disableAutomaticAuthentication = options.disableAutomaticAuthentication;

    if (options.authenticationRecord) {
      this.account = {
        ...options.authenticationRecord,
        tenantId: this.tenantId,
      };
    }
    this.loginHint = options.loginHint;

    this.msalConfig.cache = {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true, // Set to true to improve the experience on IE11 and Edge.
    };
    this.msalConfig.system = {
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(this.logger, "Browser"),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
      },
    };
    if (options.authenticationRecord) {
      this.account = {
        ...options.authenticationRecord,
        tenantId: this.tenantId,
      };
    }
  }

  /**
   * In the browsers we don't need to init()
   */
  async init(): Promise<void> {
    // Nothing to do here.
  }

  /**
   * Clears MSAL's cache.
   */
  async logout(): Promise<void> {
    this.app?.logout();
  }
  /**
   * Attempts to retrieve an authenticated token from MSAL.
   */
  public async getToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {},
  ): Promise<AccessToken> {
    const tenantId =
      processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds) ||
      this.tenantId;

    if (!options.authority) {
      options.authority = getAuthority(tenantId, this.authorityHost);
    }

    // We ensure that redirection is handled at this point.
    await this.handleRedirect();

    if (!(await this.getActiveAccount()) && !this.disableAutomaticAuthentication) {
      await this.login(scopes);
    }
    return this.getTokenSilent(scopes).catch((err) => {
      if (err.name !== "AuthenticationRequiredError") {
        throw err;
      }
      if (options?.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message:
            "Automatic authentication has been disabled. You may call the authentication() method.",
        });
      }
      this.logger.info(
        `Silent authentication failed, falling back to interactive method ${this.loginStyle}`,
      );
      return this.doGetToken(scopes);
    });
  }

  /**
   * Handles the MSAL authentication result.
   * If the result has an account, we update the local account reference.
   * If the token received is invalid, an error will be thrown depending on what's missing.
   */
  protected handleResult(
    scopes: string | string[],
    result?: MsalResult,
    getTokenOptions?: GetTokenOptions,
  ): AccessToken {
    if (result?.account) {
      this.account = msalToPublic(this.clientId, result.account);
    }
    ensureValidMsalToken(scopes, result, getTokenOptions);
    this.logger.getToken.info(formatSuccess(scopes));
    return {
      token: result.accessToken,
      expiresOnTimestamp: result.expiresOn.getTime(),
      refreshAfterTimestamp: result.refreshOn?.getTime(),
      tokenType: "Bearer",
    } as AccessToken;
  }
  private async getApp(): Promise<msalBrowser.IPublicClientApplication> {
    if (!this.app) {
      // Prepare the MSAL application
      this.app = await msalBrowser.PublicClientApplication.createPublicClientApplication(
        this.msalConfig as msalBrowser.Configuration,
      );

      // setting the account right after the app is created.
      if (this.account) {
        this.app.setActiveAccount(publicToMsal(this.account));
      }
    }

    return this.app;
  }

  /**
   * Loads the account based on the result of the authentication.
   * If no result was received, tries to load the account from the cache.
   * @param result - Result object received from MSAL.
   */
  private async handleBrowserResult(
    result?: msalBrowser.AuthenticationResult,
  ): Promise<AuthenticationRecord | undefined> {
    try {
      const app = await this.getApp();
      if (result && result.account) {
        this.logger.info(`MSAL Browser V2 authentication successful.`);
        app.setActiveAccount(result.account);
        return msalToPublic(this.clientId, result.account);
      }

      // If by this point we happen to have an active account, we should stop trying to parse this.
      const activeAccount = await this.app!.getActiveAccount();
      if (activeAccount) {
        return msalToPublic(this.clientId, activeAccount);
      }

      // If we don't have an active account, we try to activate it from all the already loaded accounts.
      const accounts = app.getAllAccounts();
      if (accounts.length > 1) {
        // If there's more than one account in memory, we force the user to authenticate again.
        // At this point we can't identify which account should this credential work with,
        // since at this point the user won't have provided enough information.
        // We log a message in case that helps.
        this.logger.info(
          `More than one account was found authenticated for this Client ID and Tenant ID.
However, no "authenticationRecord" has been provided for this credential,
therefore we're unable to pick between these accounts.
A new login attempt will be requested, to ensure the correct account is picked.
To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing "InteractiveBrowserCredential".`,
        );
        // To safely trigger a new login, we're also ensuring the local cache is cleared up for this MSAL object.
        // However, we want to avoid kicking the user out of their authentication on the Azure side.
        // We do this by calling to logout while specifying a `onRedirectNavigate` that returns false.
        await app.logout({
          onRedirectNavigate: () => false,
        });
        return;
      }

      // If there's only one account for this MSAL object, we can safely activate it.
      if (accounts.length === 1) {
        const account = accounts[0];
        app.setActiveAccount(account);
        return msalToPublic(this.clientId, account);
      }

      this.logger.info(`No accounts were found through MSAL.`);
    } catch (e: any) {
      this.logger.info(`Failed to acquire token through MSAL. ${e.message}`);
    }
    return;
  }

  /**
   * Uses MSAL to handle the redirect.
   */
  public async handleRedirect(): Promise<AuthenticationRecord | undefined> {
    const app = await this.getApp();
    return this.handleBrowserResult((await app.handleRedirectPromise(redirectHash)) || undefined);
  }

  /**
   * Uses MSAL to trigger a redirect or a popup login.
   */
  public async login(scopes: string | string[] = []): Promise<AuthenticationRecord | undefined> {
    const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    const loginRequest: msalBrowser.RedirectRequest = {
      scopes: arrayScopes,
      loginHint: this.loginHint,
    };
    const app = await this.getApp();
    switch (this.loginStyle) {
      case "redirect": {
        await app.loginRedirect(loginRequest);
        return;
      }
      case "popup":
        return this.handleBrowserResult(await app.loginPopup(loginRequest));
    }
  }

  /**
   * Uses MSAL to retrieve the active account.
   */
  public async getActiveAccount(): Promise<AuthenticationRecord | undefined> {
    const app = await this.getApp();
    const account = app.getActiveAccount();
    if (!account) {
      return;
    }
    return msalToPublic(this.clientId, account);
  }

  /**
   * Attempts to retrieve a token from cache.
   */
  public async getTokenSilent(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    const account = await this.getActiveAccount();
    if (!account) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message:
          "Silent authentication failed. We couldn't retrieve an active account from the cache.",
      });
    }

    const parameters: msalBrowser.SilentRequest = {
      authority: options?.authority || this.msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      claims: options?.claims,
      account: publicToMsal(account),
      forceRefresh: false,
      scopes,
    };

    try {
      this.logger.info("Attempting to acquire token silently");
      const app = await this.getApp();
      const response = await app.acquireTokenSilent(parameters);
      return this.handleResult(scopes, response);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }

  /**
   * Attempts to retrieve the token in the browser.
   */
  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    const account = await this.getActiveAccount();
    if (!account) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message:
          "Silent authentication failed. We couldn't retrieve an active account from the cache.",
      });
    }

    const parameters: msalBrowser.RedirectRequest = {
      authority: options?.authority || this.msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      claims: options?.claims,
      account: publicToMsal(account),
      loginHint: this.loginHint,
      scopes,
    };
    const app = await this.getApp();
    switch (this.loginStyle) {
      case "redirect":
        // This will go out of the page.
        // Once the InteractiveBrowserCredential is initialized again,
        // we'll load the MSAL account in the constructor.

        await app.acquireTokenRedirect(parameters);
        return { token: "", expiresOnTimestamp: 0, tokenType: "Bearer" };
      case "popup":
        return this.handleResult(scopes, await app.acquireTokenPopup(parameters));
    }
  }
}

export function createMsalBrowserClient(options: MsalBrowserFlowOptions): MsalBrowserClient {
  let loginStyle = options.loginStyle;
  if (!options.clientId) {
    throw new CredentialUnavailableError("A client ID is required in browsers");
  }
  let clientId = options.clientId;
  let logger = options.logger;
  let tenantId = resolveTenantId(logger, options.tenantId, options.clientId);
  let additionallyAllowedTenantIds: string[] = resolveAdditionallyAllowedTenantIds(
    options?.tokenCredentialOptions?.additionallyAllowedTenants,
  );
  let authorityHost = options.authorityHost;
  let msalConfig = generateMsalBrowserConfiguration(options);
  let disableAutomaticAuthentication = options.disableAutomaticAuthentication;
  let app: msalBrowser.IPublicClientApplication;
  let loginHint = options.loginHint;

  let account: AuthenticationRecord | undefined;
  if (options.authenticationRecord) {
    account = {
      ...options.authenticationRecord,
      tenantId,
    };
  }

  /**
   * Return the MSAL account if not set yet
   * @returns MSAL application
   */
  async function getApp(): Promise<msalBrowser.IPublicClientApplication> {
    if (!app) {
      // Prepare the MSAL application
      app = await msalBrowser.PublicClientApplication.createPublicClientApplication(
        msalConfig as msalBrowser.Configuration,
      );

      // setting the account right after the app is created.
      if (account) {
        app.setActiveAccount(publicToMsal(account));
      }
    }

    return app;
  }

  /**
 * Loads the account based on the result of the authentication.
 * If no result was received, tries to load the account from the cache.
 * @param result - Result object received from MSAL.
 */
  async function handleBrowserResult(
    result?: msalBrowser.AuthenticationResult,
  ): Promise<AuthenticationRecord | undefined> {
    try {
      const msalApp = await getApp();
      if (result && result.account) {
        logger.info(`MSAL Browser V2 authentication successful.`);
        msalApp.setActiveAccount(result.account);
        return msalToPublic(clientId, result.account);
      }

      // If by this point we happen to have an active account, we should stop trying to parse this.
      const activeAccount = msalApp!.getActiveAccount();
      if (activeAccount) {
        return msalToPublic(clientId, activeAccount);
      }

      // If we don't have an active account, we try to activate it from all the already loaded accounts.
      const accounts = app.getAllAccounts();
      if (accounts.length > 1) {
        // If there's more than one account in memory, we force the user to authenticate again.
        // At this point we can't identify which account should this credential work with,
        // since at this point the user won't have provided enough information.
        // We log a message in case that helps.
        logger.info(
          `More than one account was found authenticated for this Client ID and Tenant ID.
  However, no "authenticationRecord" has been provided for this credential,
  therefore we're unable to pick between these accounts.
  A new login attempt will be requested, to ensure the correct account is picked.
  To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing "InteractiveBrowserCredential".`,
        );
        // To safely trigger a new login, we're also ensuring the local cache is cleared up for this MSAL object.
        // However, we want to avoid kicking the user out of their authentication on the Azure side.
        // We do this by calling to logout while specifying a `onRedirectNavigate` that returns false.
        await msalApp.logout({
          onRedirectNavigate: () => false,
        });
        return;
      }

      // If there's only one account for this MSAL object, we can safely activate it.
      if (accounts.length === 1) {
        const account = accounts[0];
        msalApp.setActiveAccount(account);
        return msalToPublic(clientId, account);
      }

      logger.info(`No accounts were found through MSAL.`);
    } catch (e: any) {
      logger.info(`Failed to acquire token through MSAL. ${e.message}`);
    }
    return;
  }

  /**
   * Handles the MSAL authentication result.
   * If the result has an account, we update the local account reference.
   * If the token received is invalid, an error will be thrown depending on what's missing.
   */
  function handleResult(
    scopes: string | string[],
    result?: MsalResult,
    getTokenOptions?: GetTokenOptions,
  ): AccessToken {
    if (result?.account) {
      account = msalToPublic(clientId, result.account);
    }
    ensureValidMsalToken(scopes, result, getTokenOptions);
    logger.getToken.info(formatSuccess(scopes));
    return {
      token: result.accessToken,
      expiresOnTimestamp: result.expiresOn.getTime(),
      refreshAfterTimestamp: result.refreshOn?.getTime(),
      tokenType: "Bearer",
    } as AccessToken;
  }

  /**
 * Uses MSAL to handle the redirect.
 */
  async function handleRedirect(): Promise<AuthenticationRecord | undefined> {
    const msalApp = await getApp();
    return handleBrowserResult((await msalApp.handleRedirectPromise(redirectHash)) || undefined);
  }

  /**
   * Uses MSAL to retrieve the active account.
   */
  async function getActiveAccount(): Promise<AuthenticationRecord | undefined> {
    const app = await getApp();
    const account = app.getActiveAccount();
    if (!account) {
      return;
    }
    return msalToPublic(clientId, account);
  }

  /**
 * Uses MSAL to trigger a redirect or a popup login.
 */
  async function login(scopes: string | string[] = []): Promise<AuthenticationRecord | undefined> {
    const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
    const loginRequest: msalBrowser.RedirectRequest = {
      scopes: arrayScopes,
      loginHint: loginHint,
    };
    const msalApp = await getApp();
    switch (loginStyle) {
      case "redirect": {
        await app.loginRedirect(loginRequest);
        return;
      }
      case "popup":
        return handleBrowserResult(await msalApp.loginPopup(loginRequest));
    }
  }

  /**
   * Attempts to retrieve a token from cache.
   */
  async function getTokenSilent(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    const account = await getActiveAccount();
    if (!account) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message:
          "Silent authentication failed. We couldn't retrieve an active account from the cache.",
      });
    }

    const parameters: msalBrowser.SilentRequest = {
      authority: options?.authority || msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      claims: options?.claims,
      account: publicToMsal(account),
      forceRefresh: false,
      scopes,
    };

    try {
      logger.info("Attempting to acquire token silently");
      const app = await getApp();
      const response = await app.acquireTokenSilent(parameters);
      return handleResult(scopes, response);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }
  /**
   * Attempts to retrieve the token in the browser.
   */
  async function doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    const account = await getActiveAccount();
    if (!account) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message:
          "Silent authentication failed. We couldn't retrieve an active account from the cache.",
      });
    }

    const parameters: msalBrowser.RedirectRequest = {
      authority: options?.authority || msalConfig.auth.authority!,
      correlationId: options?.correlationId,
      claims: options?.claims,
      account: publicToMsal(account),
      loginHint: loginHint,
      scopes,
    };
    const app = await getApp();
    switch (loginStyle) {
      case "redirect":
        // This will go out of the page.
        // Once the InteractiveBrowserCredential is initialized again,
        // we'll load the MSAL account in the constructor.

        await app.acquireTokenRedirect(parameters);
        return { token: "", expiresOnTimestamp: 0, tokenType: "Bearer" };
      case "popup":
        return handleResult(scopes, await app.acquireTokenPopup(parameters));
    }
  }
  async function getToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {},
  ): Promise<AccessToken> {
    const getTokenTenantId =
      processMultiTenantRequest(tenantId, options, additionallyAllowedTenantIds) || tenantId;

    if (!options.authority) {
      options.authority = getAuthority(getTokenTenantId, authorityHost);
    }

    // We ensure that redirection is handled at this point.
    await handleRedirect();

    if (!(await getActiveAccount()) && !disableAutomaticAuthentication) {
      await login(scopes);
    }
    return getTokenSilent(scopes).catch((err) => {
      if (err.name !== "AuthenticationRequiredError") {
        throw err;
      }
      if (options?.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message:
            "Automatic authentication has been disabled. You may call the authentication() method.",
        });
      }
      logger.info(`Silent authentication failed, falling back to interactive method ${loginStyle}`);
      return doGetToken(scopes);
    });
  }
  return {
    getActiveAccount,
    getToken,
  };
}
