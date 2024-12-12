// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as msalBrowser from "@azure/msal-browser";

import type { AccessToken, GetTokenOptions } from "@azure/core-auth";
import type { AuthenticationRecord, MsalResult } from "../types.js";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../errors.js";
import type { CredentialLogger } from "../../util/logging.js";
import { formatSuccess } from "../../util/logging.js";
import type { MsalFlow, MsalFlowOptions } from "./flows.js";
import { ensureValidMsalToken, getAuthority, getKnownAuthorities, msalToPublic } from "../utils.js";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
  resolveTenantId,
} from "../../util/tenantIdUtils.js";

import type { BrowserLoginStyle } from "../../credentials/interactiveBrowserCredentialOptions.js";
import type { CredentialFlowGetTokenOptions } from "../credentials.js";
import { DefaultTenantId } from "../../constants.js";
import type { LogPolicyOptions } from "@azure/core-rest-pipeline";
import type { MultiTenantTokenCredentialOptions } from "../../credentials/multiTenantTokenCredentialOptions.js";

/**
 * Union of the constructor parameters that all MSAL flow types take.
 * Some properties might not be used by some flow types.
 */
export interface MsalBrowserFlowOptions extends MsalFlowOptions {
  tokenCredentialOptions: MultiTenantTokenCredentialOptions;
  redirectUri?: string;
  loginStyle: BrowserLoginStyle;
  loginHint?: string;
  /**
   * Allows users to configure settings for logging policy options, allow logging account information and personally identifiable information for customer support.
   */
  loggingOptions?: LogPolicyOptions & {
    /**
     * Allows logging account information once the authentication flow succeeds.
     */
    allowLoggingAccountIdentifiers?: boolean;
    /**
     * Allows logging personally identifiable information for customer support.
     */
    enableUnsafeSupportLogging?: boolean;
  };
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
export abstract class MsalBrowser implements MsalBrowserFlow {
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
    this.msalConfig = defaultBrowserMsalConfig(options);
    this.disableAutomaticAuthentication = options.disableAutomaticAuthentication;

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
}
