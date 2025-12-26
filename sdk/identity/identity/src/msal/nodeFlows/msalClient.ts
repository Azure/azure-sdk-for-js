// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialClientApplication, PublicClientApplication } from "@azure/msal-node";
import type {
  AccountInfo,
  AuthenticationResult,
  Configuration,
  DeviceCodeRequest,
  InteractiveRequest,
  SilentFlowRequest,
  UsernamePasswordRequest,
} from "@azure/msal-node";

import type { AccessToken, GetTokenOptions } from "@azure/core-auth";
import type { AuthenticationRecord, CertificateParts } from "../types.js";
import type { CredentialLogger } from "../../util/logging.js";
import { credentialLogger, formatSuccess } from "../../util/logging.js";
import type { PluginConfiguration } from "./msalPlugins.js";
import { msalPlugins } from "./msalPlugins.js";
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

import { AuthenticationRequiredError } from "../../errors.js";
import type { BrokerOptions } from "./brokerOptions.js";
import type { DeviceCodePromptCallback } from "../../credentials/deviceCodeCredentialOptions.js";
import { IdentityClient } from "../../client/identityClient.js";
import type { InteractiveBrowserCredentialNodeOptions } from "../../credentials/interactiveBrowserCredentialOptions.js";
import type { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions.js";
import { calculateRegionalAuthority } from "../../regionalAuthority.js";
import { getLogLevel } from "@azure/logger";
import { resolveTenantId } from "../../util/tenantIdUtils.js";
import type { CommonClientOptions } from "@azure/core-client";
import type { LogPolicyOptions } from "@azure/core-rest-pipeline";
import { getAuthorityHost } from "../../util/authorityHost.js";

/**
 * The default logger used if no logger was passed in by the credential.
 */
const msalLogger = credentialLogger("MsalClient");

/**
 * Represents the options for acquiring a token using flows that support silent authentication.
 */
export interface GetTokenWithSilentAuthOptions extends GetTokenOptions {
  /**
   * Disables automatic authentication. If set to true, the method will throw an error if the user needs to authenticate.
   *
   * @remarks
   *
   * This option will be set to `false` when the user calls `authenticate` directly on a credential that supports it.
   */
  disableAutomaticAuthentication?: boolean;
}

/**
 * Represents the options for acquiring a token interactively.
 */
export interface GetTokenInteractiveOptions extends GetTokenWithSilentAuthOptions {
  /**
   * Window handle for parent window, required for WAM authentication.
   */
  parentWindowHandle?: Buffer;
  /**
   * Shared configuration options for browser customization
   */
  browserCustomizationOptions?: InteractiveBrowserCredentialNodeOptions["browserCustomizationOptions"];
  /**
   * loginHint allows a user name to be pre-selected for interactive logins.
   * Setting this option skips the account selection prompt and immediately attempts to login with the specified account.
   */
  loginHint?: string;
}

/**
 * Represents the options for configuring the MsalClient.
 */
export interface MsalClientOptions extends CommonClientOptions {
  /**
   * Parameters that enable WAM broker authentication in the InteractiveBrowserCredential.
   */
  brokerOptions?: BrokerOptions;

  /**
   * Parameters that enable token cache persistence in the Identity credentials.
   */
  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;

  /**
   * Indicates if this is being used by VSCode credential.
   */
  isVSCodeCredential?: boolean;

  /**
   * A custom authority host.
   */
  authorityHost?: string;

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

  /**
   * Determines whether instance discovery is disabled.
   */
  disableInstanceDiscovery?: boolean;

  /**
   * The logger for the MsalClient.
   */
  logger?: CredentialLogger;

  /**
   * The authentication record for the MsalClient.
   */
  authenticationRecord?: AuthenticationRecord;
}

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
): Configuration {
  const resolvedTenant = resolveTenantId(
    msalClientOptions.logger ?? msalLogger,
    tenantId,
    clientId,
  );

  const authority = getAuthority(resolvedTenant, getAuthorityHost(msalClientOptions));

  const httpClient = new IdentityClient({
    ...msalClientOptions,
    authorityHost: authority,
    loggingOptions: msalClientOptions.loggingOptions,
  });

  const msalConfig: Configuration = {
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
 */
interface MsalClientState {
  /** The configuration for the MSAL client. */
  msalConfig: Configuration;

  /** The cached account information, or null if no account information is cached. */
  cachedAccount: AccountInfo | null;

  /** Configured plugins */
  pluginConfiguration: PluginConfiguration;

  /** Claims received from challenges, cached for the next request */
  cachedClaims?: string;

  /** The logger instance */
  logger: CredentialLogger;
}

export interface MsalClientContext {
  clientId: string;
  state: MsalClientState;
  getPublicApp(options?: GetTokenOptions): Promise<PublicClientApplication>;
  getTokenSilent(
    context: MsalClientContext,
    app: ConfidentialClientApplication | PublicClientApplication,
    scopes: string[],
    options?: GetTokenOptions,
  ): Promise<AuthenticationResult>;
  getConfidentialApp(options?: GetTokenOptions): Promise<ConfidentialClientApplication>;
  calculateRequestAuthority(options?: GetTokenOptions): string | undefined;
  getActiveAccount(): AuthenticationRecord | undefined;
}

/**
 * Creates an MSAL client context that can be shared across flow helpers.
 */
export function createMsalClientContext(
  clientId: string,
  tenantId: string,
  createMsalClientOptions: MsalClientOptions = {},
): MsalClientContext {
  const state: MsalClientState = {
    msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
    cachedAccount: createMsalClientOptions.authenticationRecord
      ? publicToMsal(createMsalClientOptions.authenticationRecord)
      : null,
    pluginConfiguration: msalPlugins.generatePluginConfiguration(createMsalClientOptions),
    logger: createMsalClientOptions.logger ?? msalLogger,
  };

  const publicApps: Map<string, PublicClientApplication> = new Map();
  async function getPublicApp(options: GetTokenOptions = {}): Promise<PublicClientApplication> {
    const appKey = options.enableCae ? "CAE" : "default";

    let publicClientApp = publicApps.get(appKey);
    if (publicClientApp) {
      state.logger.getToken.info("Existing PublicClientApplication found in cache, returning it.");
      return publicClientApp;
    }

    // Initialize a new app and cache it
    state.logger.getToken.info(
      `Creating new PublicClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`,
    );

    const cachePlugin = options.enableCae
      ? state.pluginConfiguration.cache.cachePluginCae
      : state.pluginConfiguration.cache.cachePlugin;

    state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : undefined;

    publicClientApp = new PublicClientApplication({
      ...state.msalConfig,
      broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await cachePlugin },
    });

    publicApps.set(appKey, publicClientApp);

    return publicClientApp;
  }

  const confidentialApps: Map<string, ConfidentialClientApplication> = new Map();
  async function getConfidentialApp(
    options: GetTokenOptions = {},
  ): Promise<ConfidentialClientApplication> {
    const appKey = options.enableCae ? "CAE" : "default";

    let confidentialClientApp = confidentialApps.get(appKey);
    if (confidentialClientApp) {
      state.logger.getToken.info(
        "Existing ConfidentialClientApplication found in cache, returning it.",
      );
      return confidentialClientApp;
    }

    // Initialize a new app and cache it
    state.logger.getToken.info(
      `Creating new ConfidentialClientApplication with CAE ${
        options.enableCae ? "enabled" : "disabled"
      }.`,
    );

    const cachePlugin = options.enableCae
      ? state.pluginConfiguration.cache.cachePluginCae
      : state.pluginConfiguration.cache.cachePlugin;

    state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : undefined;

    confidentialClientApp = new ConfidentialClientApplication({
      ...state.msalConfig,
      broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await cachePlugin },
    });

    confidentialApps.set(appKey, confidentialClientApp);

    return confidentialClientApp;
  }

  async function getTokenSilent(
    context: MsalClientContext,
    app: ConfidentialClientApplication | PublicClientApplication,
    scopes: string[],
    options: GetTokenOptions = {},
  ): Promise<AuthenticationResult> {
    if (context.state.cachedAccount === null) {
      context.state.logger.getToken.info("No cached account found in local state.");
      throw new AuthenticationRequiredError({ scopes });
    }

    // Keep track and reuse the claims we received across challenges
    if (options.claims) {
      context.state.cachedClaims = options.claims;
    }

    const silentRequest: SilentFlowRequest = {
      account: context.state.cachedAccount,
      scopes,
      claims: context.state.cachedClaims,
    };

    if (context.state.pluginConfiguration.broker.isEnabled) {
      silentRequest.tokenQueryParameters ||= {};
      if (context.state.pluginConfiguration.broker.enableMsaPassthrough) {
        silentRequest.tokenQueryParameters["msal_request_type"] = "consumer_passthrough";
      }
    }

    if (options.proofOfPossessionOptions) {
      silentRequest.shrNonce = options.proofOfPossessionOptions.nonce;
      silentRequest.authenticationScheme = "pop";
      silentRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
      silentRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
    }
    context.state.logger.getToken.info("Attempting to acquire token silently");
    try {
      return await app.acquireTokenSilent(silentRequest);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }

  /**
   * Builds an authority URL for the given request. The authority may be different than the one used when creating the MSAL client
   * if the user is creating cross-tenant requests
   */
  function calculateRequestAuthority(options?: GetTokenOptions): string | undefined {
    if (options?.tenantId) {
      return getAuthority(options.tenantId, getAuthorityHost(createMsalClientOptions));
    }
    return state.msalConfig.auth.authority;
  }

  function getActiveAccount(): AuthenticationRecord | undefined {
    if (!state.cachedAccount) {
      return undefined;
    }
    return msalToPublic(clientId, state.cachedAccount);
  }

  return {
    clientId,
    state,
    getPublicApp,
    getTokenSilent,
    getConfidentialApp,
    calculateRequestAuthority,
    getActiveAccount,
  };
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
  context: MsalClientContext,
  msalApp: ConfidentialClientApplication | PublicClientApplication,
  scopes: Array<string>,
  options: GetTokenWithSilentAuthOptions,
  onAuthenticationRequired: () => Promise<AuthenticationResult | null>,
): Promise<AccessToken> {
  let response: AuthenticationResult | null = null;
  try {
    response = await context.getTokenSilent(context, msalApp, scopes, options);
  } catch (e: any) {
    if (e.name !== "AuthenticationRequiredError") {
      throw e;
    }
    if (options.disableAutomaticAuthentication) {
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
  context.state.cachedAccount = response?.account ?? null;

  context.state.logger.getToken.info(formatSuccess(scopes));
  return {
    token: response.accessToken,
    expiresOnTimestamp: response.expiresOn.getTime(),
    refreshAfterTimestamp: response.refreshOn?.getTime(),
    tokenType: response.tokenType,
  } as AccessToken;
}

/**
 * Retrieves an access token by using a client secret.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param clientSecret - The client secret of the application. This is a credential that the application can use to authenticate itself.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByClientSecret(
  context: MsalClientContext,

  scopes: string[],
  clientSecret: string,
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using client secret`);

  context.state.msalConfig.auth.clientSecret = clientSecret;

  const msalApp = await context.getConfidentialApp(options);

  try {
    const response = await msalApp.acquireTokenByClientCredential({
      scopes,
      authority: context.calculateRequestAuthority(options),
      azureRegion: calculateRegionalAuthority(),
      claims: options?.claims,
    });
    ensureValidMsalToken(scopes, response, options);
    context.state.cachedAccount = response?.account ?? null;

    context.state.logger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType,
    } as AccessToken;
  } catch (err: any) {
    throw handleMsalError(scopes, err, options);
  }
}

/**
 * Retrieves an access token by using a client assertion.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param clientAssertion - The client `getAssertion` callback used for authentication.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByClientAssertion(
  context: MsalClientContext,

  scopes: string[],
  clientAssertion: () => Promise<string>,
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using client assertion`);

  context.state.msalConfig.auth.clientAssertion = clientAssertion;

  const msalApp = await context.getConfidentialApp(options);

  try {
    const response = await msalApp.acquireTokenByClientCredential({
      scopes,
      authority: context.calculateRequestAuthority(options),
      azureRegion: calculateRegionalAuthority(),
      claims: options?.claims,
      clientAssertion,
    });
    ensureValidMsalToken(scopes, response, options);
    context.state.cachedAccount = response?.account ?? null;

    context.state.logger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType,
    } as AccessToken;
  } catch (err: any) {
    throw handleMsalError(scopes, err, options);
  }
}

/**
 * Retrieves an access token by using a client certificate.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param certificate - The client certificate used for authentication.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByClientCertificate(
  context: MsalClientContext,
  scopes: string[],
  certificate: CertificateParts,
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using client certificate`);

  context.state.msalConfig.auth.clientCertificate = certificate;

  const msalApp = await context.getConfidentialApp(options);
  try {
    const response = await msalApp.acquireTokenByClientCredential({
      scopes,
      authority: context.calculateRequestAuthority(options),
      azureRegion: calculateRegionalAuthority(),
      claims: options?.claims,
    });
    ensureValidMsalToken(scopes, response, options);
    context.state.cachedAccount = response?.account ?? null;

    context.state.logger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType,
    } as AccessToken;
  } catch (err: any) {
    throw handleMsalError(scopes, err, options);
  }
}

/**
 * Retrieves an access token by prompting the user to authenticate using a device code.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param userPromptCallback - The callback function that allows developers to customize the prompt message.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByDeviceCode(
  context: MsalClientContext,

  scopes: string[],
  deviceCodeCallback: DeviceCodePromptCallback,
  options: GetTokenWithSilentAuthOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using device code`);

  const msalApp = await context.getPublicApp(options);

  return withSilentAuthentication(context, msalApp, scopes, options, () => {
    const requestOptions: DeviceCodeRequest = {
      scopes,
      cancel: options?.abortSignal?.aborted ?? false,
      deviceCodeCallback,
      authority: context.calculateRequestAuthority(options),
      claims: options?.claims,
    };
    const deviceCodeRequest = msalApp.acquireTokenByDeviceCode(requestOptions);
    if (options.abortSignal) {
      options.abortSignal.addEventListener("abort", () => {
        requestOptions.cancel = true;
      });
    }

    return deviceCodeRequest;
  });
}

/**
 * Retrieves an access token by using a user's username and password.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param username - The username provided by the developer.
 * @param password - The user's password provided by the developer.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByUsernamePassword(
  context: MsalClientContext,

  scopes: string[],
  username: string,
  password: string,
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using username and password`);

  const msalApp = await context.getPublicApp(options);

  return withSilentAuthentication(context, msalApp, scopes, options, () => {
    const requestOptions: UsernamePasswordRequest = {
      scopes,
      username,
      password,
      authority: context.calculateRequestAuthority(options),
      claims: options?.claims,
    };

    return msalApp.acquireTokenByUsernamePassword(requestOptions);
  });
}

/**
   * Retrieves an access token by using an authorization code flow.
   *
   * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
   * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
   * @param authorizationCode - An authorization code that was received from following the
                              authorization code flow.  This authorization code must not
                              have already been used to obtain an access token.
   * @param redirectUri - The redirect URI that was used to request the authorization code.
                        Must be the same URI that is configured for the App Registration.
   * @param clientSecret - An optional client secret that was generated for the App Registration.
   * @param options - Additional options that may be provided to the method.
   */
export async function getTokenByAuthorizationCode(
  context: MsalClientContext,

  scopes: string[],
  redirectUri: string,
  authorizationCode: string,
  clientSecret?: string,
  options: GetTokenWithSilentAuthOptions = {},
): Promise<AccessToken> {
  context.state.logger.getToken.info(`Attempting to acquire token using authorization code`);

  let msalApp: ConfidentialClientApplication | PublicClientApplication;
  if (clientSecret) {
    // If a client secret is provided, we need to use a confidential client application
    // See https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow#request-an-access-token-with-a-client_secret
    context.state.msalConfig.auth.clientSecret = clientSecret;
    msalApp = await context.getConfidentialApp(options);
  } else {
    msalApp = await context.getPublicApp(options);
  }

  return withSilentAuthentication(context, msalApp, scopes, options, () => {
    return msalApp.acquireTokenByCode({
      scopes,
      redirectUri,
      code: authorizationCode,
      authority: context.calculateRequestAuthority(options),
      claims: options?.claims,
    });
  });
}

/**
 *
 * Retrieves an access token by using the on-behalf-of flow and a client assertion callback of the calling service.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param userAssertionToken - The access token that was sent to the middle-tier API. This token must have an audience of the app making this OBO request.
 * @param clientCredentials - The client secret OR client certificate OR client `getAssertion` callback.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenOnBehalfOf(
  context: MsalClientContext,

  scopes: string[],
  userAssertionToken: string,
  clientCredentials: string | CertificateParts | (() => Promise<string>),
  options: GetTokenOptions = {},
): Promise<AccessToken> {
  msalLogger.getToken.info(`Attempting to acquire token on behalf of another user`);

  if (typeof clientCredentials === "string") {
    // Client secret
    msalLogger.getToken.info(`Using client secret for on behalf of flow`);
    context.state.msalConfig.auth.clientSecret = clientCredentials;
  } else if (typeof clientCredentials === "function") {
    // Client Assertion
    msalLogger.getToken.info(`Using client assertion callback for on behalf of flow`);
    context.state.msalConfig.auth.clientAssertion = clientCredentials;
  } else {
    // Client certificate
    msalLogger.getToken.info(`Using client certificate for on behalf of flow`);
    context.state.msalConfig.auth.clientCertificate = clientCredentials;
  }

  const msalApp = await context.getConfidentialApp(options);
  try {
    const response = await msalApp.acquireTokenOnBehalfOf({
      scopes,
      authority: context.calculateRequestAuthority(options),
      claims: options.claims,
      oboAssertion: userAssertionToken,
    });
    ensureValidMsalToken(scopes, response, options);
    context.state.cachedAccount = response?.account ?? null;

    msalLogger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType,
    } as AccessToken;
  } catch (err: any) {
    throw handleMsalError(scopes, err, options);
  }
}

/**
 * Creates a base interactive request configuration for MSAL interactive authentication.
 * This is shared between interactive and brokered authentication flows.
 */
function createBaseInteractiveRequest(
  context: MsalClientContext,
  scopes: string[],
  options: GetTokenInteractiveOptions,
): InteractiveRequest {
  return {
    openBrowser: async (url) => {
      const open = await import("open");
      await open.default(url, { newInstance: true });
    },
    scopes,
    authority: context.calculateRequestAuthority(options),
    claims: options?.claims,
    loginHint: options?.loginHint,
    errorTemplate: options?.browserCustomizationOptions?.errorMessage,
    successTemplate: options?.browserCustomizationOptions?.successMessage,
    prompt: options?.loginHint ? "login" : "select_account",
  };
}

/**
 * @internal
 */
async function getBrokeredTokenInternal(
  context: MsalClientContext,

  scopes: string[],
  useDefaultBrokerAccount: boolean,
  options: GetTokenInteractiveOptions = {},
): Promise<AuthenticationResult> {
  msalLogger.verbose("Authentication will resume through the broker");

  const app = await context.getPublicApp(options);

  const interactiveRequest = createBaseInteractiveRequest(context, scopes, options);
  if (context.state.pluginConfiguration.broker.parentWindowHandle) {
    interactiveRequest.windowHandle = Buffer.from(
      context.state.pluginConfiguration.broker.parentWindowHandle,
    );
  } else {
    // this is a bug, as the pluginConfiguration handler should validate this case.
    msalLogger.warning(
      "Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.",
    );
  }

  if (context.state.pluginConfiguration.broker.enableMsaPassthrough) {
    (interactiveRequest.tokenQueryParameters ??= {})["msal_request_type"] = "consumer_passthrough";
  }
  if (useDefaultBrokerAccount) {
    interactiveRequest.prompt = "none";
    msalLogger.verbose("Attempting broker authentication using the default broker account");
  } else {
    msalLogger.verbose("Attempting broker authentication without the default broker account");
  }

  if (options.proofOfPossessionOptions) {
    interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
    interactiveRequest.authenticationScheme = "pop";
    interactiveRequest.resourceRequestMethod =
      options.proofOfPossessionOptions.resourceRequestMethod;
    interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
  }
  try {
    return await app.acquireTokenInteractive(interactiveRequest);
  } catch (e: any) {
    msalLogger.verbose(`Failed to authenticate through the broker: ${e.message}`);
    if (options.disableAutomaticAuthentication) {
      throw new AuthenticationRequiredError({
        scopes,
        getTokenOptions: options,
        message: "Cannot silently authenticate with default broker account.",
      });
    }
    // If we tried to use the default broker account and failed, fall back to interactive authentication
    if (useDefaultBrokerAccount) {
      return getBrokeredTokenInternal(context, scopes, false, options);
    } else {
      throw e;
    }
  }
}

/**
 * A helper function that supports brokered authentication through the MSAL's public application.
 *
 * When useDefaultBrokerAccount is true, the method will attempt to authenticate using the default broker account.
 * If the default broker account is not available, the method will fall back to interactive authentication.
 *
 * Retrieves an access token using brokered authentication.
 *
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param useDefaultBrokerAccount - Whether to use the default broker account for authentication.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getBrokeredToken(
  context: MsalClientContext,

  scopes: string[],
  useDefaultBrokerAccount: boolean,
  options: GetTokenInteractiveOptions = {},
): Promise<AccessToken> {
  msalLogger.getToken.info(
    `Attempting to acquire token using brokered authentication with useDefaultBrokerAccount: ${useDefaultBrokerAccount}`,
  );
  const response = await getBrokeredTokenInternal(
    context,
    scopes,
    useDefaultBrokerAccount,
    options,
  );
  ensureValidMsalToken(scopes, response, options);
  context.state.cachedAccount = response?.account ?? null;

  context.state.logger.getToken.info(formatSuccess(scopes));
  return {
    token: response.accessToken,
    expiresOnTimestamp: response.expiresOn.getTime(),
    refreshAfterTimestamp: response.refreshOn?.getTime(),
    tokenType: response.tokenType,
  } as AccessToken;
}

/**
 * Retrieves an access token by using an interactive prompt (InteractiveBrowserCredential).
 * @param context - Shared MSAL state (config, app cache, authority resolution) reused across flows.
 * @param scopes - The scopes for which the access token is requested. These represent the resources that the application wants to access.
 * @param options - Additional options that may be provided to the method.
 * @returns An access token.
 */
export async function getTokenByInteractiveRequest(
  context: MsalClientContext,

  scopes: string[],
  options: GetTokenInteractiveOptions = {},
): Promise<AccessToken> {
  msalLogger.getToken.info(`Attempting to acquire token interactively`);

  const app = await context.getPublicApp(options);

  return withSilentAuthentication(context, app, scopes, options, async () => {
    const interactiveRequest = createBaseInteractiveRequest(context, scopes, options);

    if (context.state.pluginConfiguration.broker.isEnabled) {
      return getBrokeredTokenInternal(
        context,
        scopes,
        context.state.pluginConfiguration.broker.useDefaultBrokerAccount ?? false,
        options,
      );
    }
    if (options.proofOfPossessionOptions) {
      interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
      interactiveRequest.authenticationScheme = "pop";
      interactiveRequest.resourceRequestMethod =
        options.proofOfPossessionOptions.resourceRequestMethod;
      interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
    }
    return app.acquireTokenInteractive(interactiveRequest);
  });
}
