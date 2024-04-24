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
import { CertificateParts } from "../types";
import { IdentityClient } from "../../client/identityClient";
import { MsalNodeOptions } from "./msalNodeCommon";
import { calculateRegionalAuthority } from "../../regionalAuthority";
import { getLogLevel } from "@azure/logger";
import { resolveTenantId } from "../../util/tenantIdUtils";

/**
 * The logger for all MsalClient instances.
 */
const msalLogger = credentialLogger("MsalClient");

/**
 * Represents a client for interacting with the Microsoft Authentication Library (MSAL).
 */
export interface MsalClient {
  /**
   * Retrieves an access token by using a client certificate.
   *
   * @param arrayScopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
   * @param certificate - The client certificate used for authentication.
   * @param options - Additional options that may be provided to the method.
   * @returns An access token.
   */
  getTokenByClientCertificate(
    arrayScopes: string[],
    certificate: CertificateParts,
    options?: GetTokenOptions,
  ): Promise<AccessToken>;

  /**
   * Retrieves an access token by using a client assertion.
   *
   * @param arrayScopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
   * @param clientAssertion - The client assertion used for authentication.
   * @param options - Additional options that may be provided to the method.
   * @returns An access token.
   */
  getTokenByClientAssertion(
    arrayScopes: string[],
    clientAssertion: string,
    options?: GetTokenOptions,
  ): Promise<AccessToken>;

  /**
   * Retrieves an access token by using a client secret.
   *
   * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
   * @param clientSecret - The client secret of the application. This is a credential that the application can use to authenticate itself.
   * @param options - Additional options that may be provided to the method.
   * @returns An access token.
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
      msalLogger.getToken.info(
        "Existing ConfidentialClientApplication found in cache, returning it.",
      );
      return confidentialClientApp;
    }

    // Initialize a new app and cache it
    msalLogger.getToken.info(
      `Creating new ConfidentialClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`,
    );

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
      msalLogger.getToken.info(
        "No cached account found in local state, attempting to load it from MSAL cache.",
      );
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

    const silentRequest: msal.SilentFlowRequest = {
      account: state.cachedAccount,
      scopes,
      claims: state.cachedClaims,
    };

    if (state.pluginConfiguration.broker.isEnabled) {
      silentRequest.tokenQueryParameters ||= {};
      if (state.pluginConfiguration.broker.enableMsaPassthrough) {
        silentRequest.tokenQueryParameters["msal_request_type"] = "consumer_passthrough";
      }
    }

    msalLogger.getToken.info("Attempting to acquire token silently");
    return app.acquireTokenSilent(silentRequest);
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

  async function getTokenByClientSecret(
    scopes: string[],
    clientSecret: string,
    options: GetTokenOptions = {},
  ): Promise<AccessToken> {
    msalLogger.getToken.info(`Attempting to acquire token using client secret`);

    state.msalConfig.auth.clientSecret = clientSecret;

    const msalApp = await getConfidentialApp(options);

    return withSilentAuthentication(msalApp, scopes, options, () =>
      msalApp.acquireTokenByClientCredential({
        scopes,
        authority: state.msalConfig.auth.authority,
        azureRegion: calculateRegionalAuthority(),
        claims: options?.claims,
      }),
    );
  }

  async function getTokenByClientAssertion(
    scopes: string[],
    clientAssertion: string,
    options: GetTokenOptions = {},
  ): Promise<AccessToken> {
    msalLogger.getToken.info(`Attempting to acquire token using client assertion`);

    state.msalConfig.auth.clientAssertion = clientAssertion;

    const msalApp = await getConfidentialApp(options);

    return withSilentAuthentication(msalApp, scopes, options, () =>
      msalApp.acquireTokenByClientCredential({
        scopes,
        authority: state.msalConfig.auth.authority,
        azureRegion: calculateRegionalAuthority(),
        claims: options?.claims,
        clientAssertion,
      }),
    );
  }

  async function getTokenByClientCertificate(
    scopes: string[],
    certificate: CertificateParts,
    options: GetTokenOptions = {},
  ): Promise<AccessToken> {
    msalLogger.getToken.info(`Attempting to acquire token using client certificate`);

    state.msalConfig.auth.clientCertificate = certificate;

    const msalApp = await getConfidentialApp(options);

    return withSilentAuthentication(msalApp, scopes, options, () =>
      msalApp.acquireTokenByClientCredential({
        scopes,
        azureRegion: calculateRegionalAuthority(),
        authority: state.msalConfig.auth.authority,
        claims: options?.claims,
      }),
    );
  }

  return {
    getTokenByClientSecret,
    getTokenByClientAssertion,
    getTokenByClientCertificate,
  };
}
