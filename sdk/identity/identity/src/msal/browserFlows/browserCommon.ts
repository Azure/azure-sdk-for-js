// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalBrowser from "@azure/msal-browser";
import { AccessToken } from "@azure/core-http";
import { DefaultTenantId } from "../../constants";
import { resolveTenantId } from "../../util/resolveTenantId";
import { BrowserLoginStyle } from "../../credentials/interactiveBrowserCredentialOptions";
import { getAuthorityHost, getKnownAuthorities, MsalBaseUtilities } from "../utils";
import { MsalFlow, MsalFlowOptions } from "../flows";
import { AuthenticationRecord } from "../types";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { AuthenticationRequiredError } from "../errors";
import { CredentialUnavailableError } from "../../client/errors";

/**
 * Union of the constructor parameters that all MSAL flow types take.
 * Some properties might not be used by some flow types.
 */
export interface MsalBrowserFlowOptions extends MsalFlowOptions {
  redirectUri?: string;
  loginStyle: BrowserLoginStyle;
}

/**
 * The common methods we use to work with the MSAL browser flows.
 * @internal
 */
export interface MsalBrowserFlow extends MsalFlow {
  login(scopes?: string[]): Promise<AuthenticationRecord | undefined>;
  handleRedirect(): Promise<AuthenticationRecord | undefined>;
}

/**
 * Generates a MSAL configuration that generally works for browsers
 * @internal
 */
export function defaultBrowserMsalConfig(
  options: MsalBrowserFlowOptions
): msalBrowser.Configuration {
  const tenantId = options.tenantId || DefaultTenantId;
  const authorityHost = getAuthorityHost(tenantId, options.authorityHost);
  return {
    auth: {
      clientId: options.clientId!,
      authority: authorityHost,
      knownAuthorities: getKnownAuthorities(tenantId, authorityHost),
      // If the users picked redirect as their login style,
      // but they didn't provide a redirectUri,
      // we can try to use the current page we're in as a default value.
      redirectUri: options.redirectUri || self.location.origin
    }
  };
}

/**
 * MSAL partial base client for the browsers.
 *
 * It completes the input configuration with some default values.
 * It also provides with utility protected methods that can be used from any of the clients,
 * which includes handlers for successful responses and errors.
 *
 * @internal
 */
export abstract class MsalBrowser extends MsalBaseUtilities implements MsalBrowserFlow {
  protected loginStyle: BrowserLoginStyle;
  protected clientId: string;
  protected tenantId: string;
  protected account: AuthenticationRecord | undefined;
  protected msalConfig: msalBrowser.Configuration;
  protected disableAutomaticAuthentication?: boolean;
  protected app?: msalBrowser.PublicClientApplication;

  constructor(options: MsalBrowserFlowOptions) {
    super(options);
    this.logger = options.logger;
    this.loginStyle = options.loginStyle;
    if (!options.clientId) {
      throw new CredentialUnavailableError("A client ID is required in browsers");
    }
    this.clientId = options.clientId;
    this.tenantId = resolveTenantId(this.logger, options.tenantId, options.clientId);
    this.msalConfig = defaultBrowserMsalConfig(options);
    this.disableAutomaticAuthentication = options.disableAutomaticAuthentication;

    if (options.authenticationRecord) {
      this.account = {
        ...options.authenticationRecord,
        tenantId: this.tenantId
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
   * Attempts to handle a redirection request the least amount of times possible.
   */
  public abstract handleRedirect(): Promise<AuthenticationRecord | undefined>;

  /**
   * Clears MSAL's cache.
   */
  async logout(): Promise<void> {
    this.app?.logout();
  }

  /**
   * Uses MSAL to retrieve the active account.
   */
  public abstract getActiveAccount(): Promise<AuthenticationRecord | undefined>;

  /**
   * Uses MSAL to trigger a redirect or a popup login.
   */
  public abstract login(scopes?: string | string[]): Promise<AuthenticationRecord | undefined>;

  /**
   * Attempts to retrieve a token from cache.
   */
  public abstract getTokenSilent(scopes: string[]): Promise<AccessToken>;

  /**
   * Attempts to retrieve the token in the browser.
   */
  protected abstract doGetToken(scopes: string[]): Promise<AccessToken>;

  /**
   * Attempts to retrieve an authenticated token from MSAL.
   */
  public async getToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
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
        throw new AuthenticationRequiredError(
          scopes,
          options,
          "Automatic authentication has been disabled. You may call the authentication() method."
        );
      }
      this.logger.info(
        `Silent authentication failed, falling back to interactive method ${this.loginStyle}`
      );
      return this.doGetToken(scopes);
    });
  }
}
