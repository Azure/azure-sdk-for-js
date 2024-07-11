// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msal from "@azure/msal-node";

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { PluginConfiguration, msalPlugins } from "./msalPlugins";
import { credentialLogger, formatSuccess } from "../../util/logging";
import {
  defaultLoggerCallback,
  ensureValidMsalToken,
  getAuthority,
  getKnownAuthorities,
  getMSALLogLevel,
  handleMsalError,
  publicToMsal,
} from "../utils";

import { AuthenticationRequiredError } from "../../errors";
import { IdentityClient } from "../../client/identityClient";
import { MsalNodeOptions } from "./msalNodeCommon";
import { getLogLevel } from "@azure/logger";
import { resolveTenantId } from "../../util/tenantIdUtils";

/**
 * The logger for all MsalClient instances.
 */
const msalLogger = credentialLogger("MsalClient");

/**
 * Interface for the MSAL (Microsoft Authentication Library) client.
 * This client is used to interact with Microsoft's identity platform.
 */
export interface MsalClient {
  /**
   * Retrieves an access token by using a client secret.
   *
   * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
   * @param clientSecret - The client secret of the application. This is a credential that the application can use to authenticate itself.
   * @param options - Additional options that may be provided to the method.
   * @returns An access token
   */
  getTokenByClientSecret(
    scopes: string[],
    clientSecret: string,
    options?: GetTokenOptions,
  ): Promise<AccessToken>;
}

/**
 * Options for creating an instance of the MsalClient.
 */
export type MsalClientOptions = Partial<Omit<MsalNodeOptions, "clientId" | "tenantId">>;

/**
 * Generates the configuration for MSAL (Microsoft Authentication Library).
 *
 * @param clientId - The client ID of the application.
 * @param  tenantId - The tenant ID of the Azure Active Directory.
 * @param  msalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns  The MSAL configuration object.
 */
export function generateMsalConfiguration(
  clientId: string,
  tenantId: string,
  msalClientOptions: MsalClientOptions = {},
): msal.Configuration {
  const resolvedTenant = resolveTenantId(msalLogger, tenantId, clientId);

  // TODO: move and reuse getIdentityClientAuthorityHost
  const authority = getAuthority(
    resolvedTenant,
    msalClientOptions.authorityHost ?? process.env.AZURE_AUTHORITY_HOST,
  );

  const httpClient = new IdentityClient({
    ...msalClientOptions.tokenCredentialOptions,
    authorityHost: authority,
    loggingOptions: msalClientOptions.loggingOptions,
  });

  const msalConfig: msal.Configuration = {
    auth: {
      clientId,
      authority,
      knownAuthorities: getKnownAuthorities(
        resolvedTenant,
        authority,
        msalClientOptions.disableInstanceDiscovery,
      ),
    },
    system: {
      networkClient: httpClient,
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(msalClientOptions.logger ?? msalLogger),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: msalClientOptions.loggingOptions?.enableUnsafeSupportLogging,
      },
    },
  };
  return msalConfig;
}

/**
 * Represents the state necessary for the MSAL (Microsoft Authentication Library) client to operate.
 * This includes the MSAL configuration, cached account information, Azure region, and a flag to disable automatic authentication.
 *
 * @internal
 */
interface MsalClientState {
  /** The configuration for the MSAL client. */
  msalConfig: msal.Configuration;

  /** The cached account information, or null if no account information is cached. */
  cachedAccount: msal.AccountInfo | null;

  /** Configured plugins */
  pluginConfiguration: PluginConfiguration;

  /** Claims received from challenges, cached for the next request */
  cachedClaims?: string;
}

/**
 * Creates an instance of the MSAL (Microsoft Authentication Library) client.
 *
 * @param clientId - The client ID of the application.
 * @param tenantId - The tenant ID of the Azure Active Directory.
 * @param createMsalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns An instance of the MSAL client.
 *
 * @public
 */
export function createMsalClient(
  clientId: string,
  tenantId: string,
  createMsalClientOptions: MsalClientOptions = {},
): MsalClient {
  const state: MsalClientState = {
    msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
    cachedAccount: createMsalClientOptions.authenticationRecord
      ? publicToMsal(createMsalClientOptions.authenticationRecord)
      : null,
    pluginConfiguration: msalPlugins.generatePluginConfiguration(createMsalClientOptions),
  };

  const confidentialApps: Map<string, msal.ConfidentialClientApplication> = new Map();
  async function getConfidentialApp(
    options: GetTokenOptions = {},
  ): Promise<msal.ConfidentialClientApplication> {
    const appKey = options.enableCae ? "CAE" : "default";

    let confidentialClientApp = confidentialApps.get(appKey);
    if (confidentialClientApp) {
      return confidentialClientApp;
    }

    // Initialize a new app and cache it
    const cachePlugin = options.enableCae
      ? state.pluginConfiguration.cache.cachePluginCae
      : state.pluginConfiguration.cache.cachePlugin;

    state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : undefined;

    confidentialClientApp = new msal.ConfidentialClientApplication({
      ...state.msalConfig,
      broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await cachePlugin },
    });

    confidentialApps.set(appKey, confidentialClientApp);

    return confidentialClientApp;
  }

  async function getTokenSilent(
    app: msal.ConfidentialClientApplication | msal.PublicClientApplication,
    scopes: string[],
    options: GetTokenOptions = {},
  ): Promise<msal.AuthenticationResult> {
    if (state.cachedAccount === null) {
      const cache = app.getTokenCache();
      const accounts = await cache.getAllAccounts();

      if (accounts === undefined || accounts.length === 0) {
        throw new AuthenticationRequiredError({ scopes });
      }

      if (accounts.length > 1) {
        msalLogger.info(`More than one account was found authenticated for this Client ID and Tenant ID.
However, no "authenticationRecord" has been provided for this credential,
therefore we're unable to pick between these accounts.
A new login attempt will be requested, to ensure the correct account is picked.
To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing a credential to prevent this from happening.`);
        throw new AuthenticationRequiredError({ scopes });
      }

      state.cachedAccount = accounts[0];
    }

    // Keep track and reuse the claims we received across challenges
    if (options.claims) {
      state.cachedClaims = options.claims;
    }

    // TODO: port over changes for broker
    // https://github.com/Azure/azure-sdk-for-js/blob/727a7208251961b5036d8e1d86edaa944c42e3d6/sdk/identity/identity/src/msal/nodeFlows/msalNodeCommon.ts#L383-L395
    msalLogger.getToken.info("Attempting to acquire token silently");
    return app.acquireTokenSilent({
      account: state.cachedAccount,
      scopes,
      claims: state.cachedClaims,
    });
  }

  /**
   * Performs silent authentication using MSAL to acquire an access token.
   * If silent authentication fails, falls back to interactive authentication.
   *
   * @param msalApp - The MSAL application instance.
   * @param scopes - The scopes for which to acquire the access token.
   * @param options - The options for acquiring the access token.
   * @param onAuthenticationRequired - A callback function to handle interactive authentication when silent authentication fails.
   * @returns A promise that resolves to an AccessToken object containing the access token and its expiration timestamp.
   */
  async function withSilentAuthentication(
    msalApp: msal.ConfidentialClientApplication | msal.PublicClientApplication,
    scopes: Array<string>,
    options: GetTokenOptions,
    onAuthenticationRequired: () => Promise<msal.AuthenticationResult | null>,
  ): Promise<AccessToken> {
    let response: msal.AuthenticationResult | null = null;
    try {
      response = await getTokenSilent(msalApp, scopes, options);
    } catch (e: any) {
      if (e.name !== "AuthenticationRequiredError") {
        throw e;
      }
      if (createMsalClientOptions.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message:
            "Automatic authentication has been disabled. You may call the authentication() method.",
        });
      }
    }

    // Silent authentication failed
    if (response === null) {
      try {
        response = await onAuthenticationRequired();
      } catch (err: any) {
        throw handleMsalError(scopes, err, options);
      }
    }

    // At this point we should have a token, process it
    ensureValidMsalToken(scopes, response, options);
    state.cachedAccount = response?.account ?? null;

    msalLogger.getToken.info(formatSuccess(scopes));

    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
    };
  }

  return {
    async getTokenByClientSecret(scopes, clientSecret, options = {}) {
      msalLogger.getToken.info(`Attempting to acquire token using client secret`);

      // TODO: understand and implement processMultiTenantRequest
      state.msalConfig.auth.clientSecret = clientSecret;

      const msalApp = await getConfidentialApp(options);

      return withSilentAuthentication(msalApp, scopes, options, () =>
        msalApp.acquireTokenByClientCredential({
          scopes,
          authority: state.msalConfig.auth.authority,
          claims: options?.claims,
        }),
      );
    },
  };
}
