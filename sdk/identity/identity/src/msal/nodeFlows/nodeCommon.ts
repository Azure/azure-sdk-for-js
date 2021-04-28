// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import * as msalCommon from "@azure/msal-common";
import { AccessToken, GetTokenOptions } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { DeveloperSignOnClientId } from "../../constants";
import { IdentityClient, TokenCredentialOptions } from "../../client/identityClient";
import { resolveTenantId } from "../../util/resolveTenantId";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalFlow, MsalFlowOptions } from "../flows";
import { AuthenticationRequiredError } from "../errors";
import { AuthenticationRecord } from "../types";
import {
  defaultLoggerCallback,
  getAuthorityHost,
  getKnownAuthorities,
  MsalBaseUtilities,
  msalToPublic,
  publicToMsal
} from "../utils";

/**
 * Union of the constructor parameters that all MSAL flow types for Node.
 * @internal
 */
export interface MsalNodeOptions extends MsalFlowOptions {
  tokenCredentialOptions: TokenCredentialOptions;
}

/**
 * MSAL partial base client for NodeJS.
 *
 * It completes the input configuration with some default values.
 * It also provides with utility protected methods that can be used from any of the clients,
 * which includes handlers for successful responses and errors.
 *
 * @internal
 */
export abstract class MsalNode extends MsalBaseUtilities implements MsalFlow {
  protected publicApp: msalNode.PublicClientApplication | undefined;
  protected confidentialApp: msalNode.ConfidentialClientApplication | undefined;
  protected msalConfig: msalNode.Configuration;
  protected clientId: string;
  protected identityClient?: IdentityClient;
  protected requiresConfidential: boolean = false;

  constructor(options: MsalNodeOptions) {
    super(options);
    this.msalConfig = this.defaultNodeMsalConfig(options);
    this.clientId = this.msalConfig.auth.clientId;
  }

  /**
   * Generates a MSAL configuration that generally works for NodeJS
   */
  protected defaultNodeMsalConfig(options: MsalNodeOptions): msalNode.Configuration {
    const clientId = options.clientId || DeveloperSignOnClientId;
    const tenantId = resolveTenantId(options.logger, options.tenantId, options.clientId);
    const authorityHost = getAuthorityHost(tenantId, options.authorityHost);
    this.identityClient = new IdentityClient({
      ...options.tokenCredentialOptions,
      authorityHost
    });
    return {
      auth: {
        clientId,
        authority: authorityHost,
        knownAuthorities: getKnownAuthorities(tenantId, authorityHost)
      },
      // Cache is defined in this.prepare();
      system: {
        networkClient: this.identityClient,
        loggerOptions: {
          loggerCallback: defaultLoggerCallback(options.logger)
        }
      }
    };
  }

  /**
   * Prepares the MSAL applications.
   */
  async init(options?: CredentialFlowGetTokenOptions): Promise<void> {
    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", () => {
        // This will abort any pending request in the IdentityClient,
        // based on the received or generated correlationId
        this.identityClient!.abortRequests(options.correlationId);
      });
    }

    if (this.publicApp || this.confidentialApp) {
      return;
    }

    this.publicApp = new msalNode.PublicClientApplication(this.msalConfig);
    // The confidential client requires either a secret, assertion or certificate.
    if (
      this.msalConfig.auth.clientSecret ||
      this.msalConfig.auth.clientAssertion ||
      this.msalConfig.auth.clientCertificate
    ) {
      this.confidentialApp = new msalNode.ConfidentialClientApplication(this.msalConfig);
    } else {
      if (this.requiresConfidential) {
        throw new Error(
          "Unable to generate the MSAL confidential client. Missing either the client's secret, certificate or assertion."
        );
      }
    }
  }

  /**
   * Allows the cancellation of a MSAL request.
   */
  protected withCancellation(
    promise: Promise<msalCommon.AuthenticationResult | null>,
    abortSignal?: AbortSignalLike,
    onCancel?: () => void
  ): Promise<msalCommon.AuthenticationResult | null> {
    return new Promise((resolve, reject) => {
      promise
        .then((msalToken) => {
          return resolve(msalToken!);
        })
        .catch(reject);
      if (abortSignal) {
        abortSignal.addEventListener("abort", () => {
          onCancel?.();
        });
      }
    });
  }

  /**
   * Returns the existing account, attempts to load the account from MSAL.
   */
  async getActiveAccount(): Promise<AuthenticationRecord | undefined> {
    if (this.account) {
      return this.account;
    }
    const cache = this.publicApp?.getTokenCache();
    const accountsByTenant = await cache?.getAllAccounts();

    if (!accountsByTenant) {
      return;
    }

    if (accountsByTenant.length === 1) {
      this.account = msalToPublic(this.clientId, accountsByTenant[0]);
    } else {
      this.logger
        .info(`More than one account was found authenticated for this Client ID and Tenant ID.
However, no "authenticationRecord" has been provided for this credential,
therefore we're unable to pick between these accounts.
A new login attempt will be requested, to ensure the correct account is picked.
To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing a credential to prevent this from happening.`);
      return;
    }

    return this.account;
  }

  /**
   * Clears MSAL's cache.
   */
  async logout(): Promise<void> {
    // Intentionally empty
  }

  /**
   * Attempts to retrieve a token from cache.
   */
  async getTokenSilent(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    await this.getActiveAccount();
    if (!this.account) {
      throw new AuthenticationRequiredError(scopes, options);
    }

    const silentRequest: msalNode.SilentFlowRequest = {
      // To be able to re-use the account, the Token Cache must also have been provided.
      account: publicToMsal(this.account),
      correlationId: options?.correlationId,
      scopes
    };

    try {
      this.logger.info("Attempting to acquire token silently");
      const response = await this.publicApp!.acquireTokenSilent(silentRequest);
      return this.handleResult(scopes, this.clientId, response || undefined);
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }

  /**
   * Attempts to retrieve an authenticated token from MSAL.
   */
  protected abstract doGetToken(scopes: string[], options?: GetTokenOptions): Promise<AccessToken>;

  /**
   * Wrapper around each MSAL flow get token operation: doGetToken.
   * If disableAutomaticAuthentication is sent through the constructor, it will prevent MSAL from requesting the user input.
   */
  public async getToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    options.correlationId = options?.correlationId || this.generateUuid();
    await this.init(options);
    return this.getTokenSilent(scopes, options).catch((err) => {
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
      this.logger.info(`Silent authentication failed, falling back to interactive method.`);
      return this.doGetToken(scopes, options);
    });
  }
}
