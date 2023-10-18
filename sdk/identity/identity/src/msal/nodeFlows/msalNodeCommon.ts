// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { getLogLevel } from "@azure/logger";
import {
  MsalBaseUtilities,
  defaultLoggerCallback,
  getAuthority,
  getKnownAuthorities,
  msalToPublic,
  publicToMsal,
  getMSALLogLevel,
} from "../utils";
import { MsalFlow, MsalFlowOptions } from "../flows";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
  resolveTenantId,
} from "../../util/tenantIdUtils";
import { AbortSignalLike } from "@azure/abort-controller";
import { AppType, AuthenticationRecord } from "../types";
import { AuthenticationRequiredError } from "../../errors";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { CACHE_CAE_SUFFIX, CACHE_NON_CAE_SUFFIX, DeveloperSignOnClientId } from "../../constants";
import { IdentityClient } from "../../client/identityClient";
import { LogPolicyOptions } from "@azure/core-rest-pipeline";
import { MultiTenantTokenCredentialOptions } from "../../credentials/multiTenantTokenCredentialOptions";
import { RegionalAuthority } from "../../regionalAuthority";
import { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions";

/**
 * Union of the constructor parameters that all MSAL flow types for Node.
 * @internal
 */
export interface MsalNodeOptions extends MsalFlowOptions {
  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
  tokenCredentialOptions: MultiTenantTokenCredentialOptions;
  /**
   * Specifies a regional authority. Please refer to the {@link RegionalAuthority} type for the accepted values.
   * If {@link RegionalAuthority.AutoDiscoverRegion} is specified, we will try to discover the regional authority endpoint.
   * If the property is not specified, uses a non-regional authority endpoint.
   */
  regionalAuthority?: string;
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
 * The current persistence provider, undefined by default.
 * @internal
 */
let persistenceProvider:
  | ((options?: TokenCachePersistenceOptions) => Promise<msalNode.ICachePlugin>)
  | undefined = undefined;

/**
 * An object that allows setting the persistence provider.
 * @internal
 */
export const msalNodeFlowCacheControl = {
  setPersistence(pluginProvider: Exclude<typeof persistenceProvider, undefined>): void {
    persistenceProvider = pluginProvider;
  },
};

/**
 * MSAL partial base client for Node.js.
 *
 * It completes the input configuration with some default values.
 * It also provides with utility protected methods that can be used from any of the clients,
 * which includes handlers for successful responses and errors.
 *
 * @internal
 */
export abstract class MsalNode extends MsalBaseUtilities implements MsalFlow {
  // protected publicApp: msalNode.PublicClientApplication | undefined;
  // protected publicAppCae: msalNode.PublicClientApplication | undefined;
  // protected confidentialApp: msalNode.ConfidentialClientApplication | undefined;
  // protected confidentialAppCae: msalNode.ConfidentialClientApplication | undefined;
  private app: {
    public?: msalNode.PublicClientApplication;
    confidential?: msalNode.ConfidentialClientApplication;
  } = {};
  private caeApp: {
    public?: msalNode.PublicClientApplication;
    confidential?: msalNode.ConfidentialClientApplication;
  } = {};
  protected msalConfig: msalNode.Configuration;
  protected clientId: string;
  protected tenantId: string;
  protected additionallyAllowedTenantIds: string[];
  protected authorityHost?: string;
  protected identityClient?: IdentityClient;
  protected requiresConfidential: boolean = false;
  protected azureRegion?: string;
  protected createCachePlugin: (() => Promise<msalNode.ICachePlugin>) | undefined;
  protected createCachePluginCae: (() => Promise<msalNode.ICachePlugin>) | undefined;

  /**
   * MSAL currently caches the tokens depending on the claims used to retrieve them.
   * In cases like CAE, in which we use claims to update the tokens, trying to retrieve the token without the claims will yield the original token.
   * To ensure we always get the latest token, we have to keep track of the claims.
   */
  private cachedClaims: string | undefined;

  protected getAssertion: (() => Promise<string>) | undefined;
  constructor(options: MsalNodeOptions) {
    super(options);
    this.msalConfig = this.defaultNodeMsalConfig(options);
    this.tenantId = resolveTenantId(options.logger, options.tenantId, options.clientId);
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.tokenCredentialOptions?.additionallyAllowedTenants
    );
    this.clientId = this.msalConfig.auth.clientId;
    if (options?.getAssertion) {
      this.getAssertion = options.getAssertion;
    }

    // If persistence has been configured
    if (persistenceProvider !== undefined && options.tokenCachePersistenceOptions?.enabled) {
      const nonCaeOptions = {
        name: `${options.tokenCachePersistenceOptions.name}.${CACHE_NON_CAE_SUFFIX}`,
        ...options.tokenCachePersistenceOptions,
      };
      const caeOptions = {
        name: `${options.tokenCachePersistenceOptions.name}.${CACHE_CAE_SUFFIX}`,
        ...options.tokenCachePersistenceOptions,
      };
      this.createCachePlugin = () => persistenceProvider!(nonCaeOptions);
      this.createCachePluginCae = () => persistenceProvider!(caeOptions);
    } else if (options.tokenCachePersistenceOptions?.enabled) {
      throw new Error(
        [
          "Persistent token caching was requested, but no persistence provider was configured.",
          "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
          "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
          "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`.",
        ].join(" ")
      );
    }

    this.azureRegion = options.regionalAuthority ?? process.env.AZURE_REGIONAL_AUTHORITY_NAME;
    if (this.azureRegion === RegionalAuthority.AutoDiscoverRegion) {
      this.azureRegion = "AUTO_DISCOVER";
    }
  }

  /**
   * Generates a MSAL configuration that generally works for Node.js
   */
  protected defaultNodeMsalConfig(options: MsalNodeOptions): msalNode.Configuration {
    const clientId = options.clientId || DeveloperSignOnClientId;
    const tenantId = resolveTenantId(options.logger, options.tenantId, options.clientId);

    this.authorityHost = options.authorityHost || process.env.AZURE_AUTHORITY_HOST;
    const authority = getAuthority(tenantId, this.authorityHost);

    this.identityClient = new IdentityClient({
      ...options.tokenCredentialOptions,
      authorityHost: authority,
      loggingOptions: options.loggingOptions,
    });

    const clientCapabilities: string[] = [];

    return {
      auth: {
        clientId,
        authority,
        knownAuthorities: getKnownAuthorities(
          tenantId,
          authority,
          options.disableInstanceDiscovery
        ),
        clientCapabilities,
      },
      // Cache is defined in this.prepare();
      system: {
        networkClient: this.identityClient,
        loggerOptions: {
          loggerCallback: defaultLoggerCallback(options.logger),
          logLevel: getMSALLogLevel(getLogLevel()),
          piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
        },
      },
    };
  }
  protected getApp(
    appType: "publicFirst" | "confidentialFirst",
    enableCae?: boolean
  ): msalNode.ConfidentialClientApplication | msalNode.PublicClientApplication;
  protected getApp(appType: "public", enableCae?: boolean): msalNode.PublicClientApplication;

  protected getApp(
    appType: "confidential",
    enableCae?: boolean
  ): msalNode.ConfidentialClientApplication;

  protected getApp(
    appType: AppType,
    enableCae?: boolean
  ): msalNode.ConfidentialClientApplication | msalNode.PublicClientApplication {
    const app = enableCae ? this.caeApp : this.app;
    if (appType === "publicFirst") {
      return (app.public || app.confidential)!;
    } else if (appType === "confidentialFirst") {
      return (app.confidential || app.public)!;
    } else if (appType === "confidential") {
      return app.confidential!;
    } else {
      return app.public!;
    }
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

    const app = options?.enableCae ? this.caeApp : this.app;
    if (options?.enableCae) {
      this.msalConfig.auth.clientCapabilities = ["cp1"];
    }
    if (app.public || app.confidential) {
      return;
    }
    if (options?.enableCae && this.createCachePluginCae !== undefined) {
      this.msalConfig.cache = {
        cachePlugin: await this.createCachePluginCae(),
      };
    }
    if (this.createCachePlugin !== undefined) {
      this.msalConfig.cache = {
        cachePlugin: await this.createCachePlugin(),
      };
    }

    if (options?.enableCae) {
      this.caeApp.public = new msalNode.PublicClientApplication(this.msalConfig);
    } else {
      this.app.public = new msalNode.PublicClientApplication(this.msalConfig);
    }

    if (this.getAssertion) {
      this.msalConfig.auth.clientAssertion = await this.getAssertion();
    }
    // The confidential client requires either a secret, assertion or certificate.
    if (
      this.msalConfig.auth.clientSecret ||
      this.msalConfig.auth.clientAssertion ||
      this.msalConfig.auth.clientCertificate
    ) {
      if (options?.enableCae) {
        this.caeApp.confidential = new msalNode.ConfidentialClientApplication(this.msalConfig);
      } else {
        this.app.confidential = new msalNode.ConfidentialClientApplication(this.msalConfig);
      }
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
    promise: Promise<msalNode.AuthenticationResult | null>,
    abortSignal?: AbortSignalLike,
    onCancel?: () => void
  ): Promise<msalNode.AuthenticationResult | null> {
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
  async getActiveAccount(enableCae = false): Promise<AuthenticationRecord | undefined> {
    if (this.account) {
      return this.account;
    }
    const cache = this.getApp("confidentialFirst", enableCae).getTokenCache();
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
   * Attempts to retrieve a token from cache.
   */
  async getTokenSilent(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    await this.getActiveAccount(options?.enableCae);
    if (!this.account) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message:
          "Silent authentication failed. We couldn't retrieve an active account from the cache.",
      });
    }

    const silentRequest: msalNode.SilentFlowRequest = {
      // To be able to re-use the account, the Token Cache must also have been provided.
      account: publicToMsal(this.account),
      correlationId: options?.correlationId,
      scopes,
      authority: options?.authority,
      claims: options?.claims,
    };

    try {
      this.logger.info("Attempting to acquire token silently");
      /**
       * The following code to retrieve all accounts is done as a workaround in an attempt to force the
       * refresh of the token cache with the token and the account passed in through the
       * `authenticationRecord` parameter. See issue - https://github.com/Azure/azure-sdk-for-js/issues/24349#issuecomment-1496715651
       * This workaround serves as a workaround for silent authentication not happening when authenticationRecord is passed.
       */
      await this.getApp("publicFirst", options?.enableCae)?.getTokenCache().getAllAccounts();
      const response =
        (await this.getApp("confidential", options?.enableCae)?.acquireTokenSilent(
          silentRequest
        )) ?? (await this.getApp("public", options?.enableCae).acquireTokenSilent(silentRequest));
      return this.handleResult(scopes, this.clientId, response || undefined);
    } catch (err: any) {
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
    const tenantId =
      processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds) ||
      this.tenantId;

    options.authority = getAuthority(tenantId, this.authorityHost);

    options.correlationId = options?.correlationId || this.generateUuid();
    await this.init(options);

    try {
      // MSAL now caches tokens based on their claims,
      // so now one has to keep track fo claims in order to retrieve the newer tokens from acquireTokenSilent
      // This update happened on PR: https://github.com/AzureAD/microsoft-authentication-library-for-js/pull/4533
      const optionsClaims = (options as any).claims;
      if (optionsClaims) {
        this.cachedClaims = optionsClaims;
      }
      if (this.cachedClaims && !optionsClaims) {
        (options as any).claims = this.cachedClaims;
      }
      // We don't return the promise since we want to catch errors right here.
      return await this.getTokenSilent(scopes, options);
    } catch (err: any) {
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
      this.logger.info(`Silent authentication failed, falling back to interactive method.`);
      return this.doGetToken(scopes, options);
    }
  }
}
