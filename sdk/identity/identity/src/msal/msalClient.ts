// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msal from "@azure/msal-node";

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { credentialLogger, formatSuccess } from "../util/logging";
import {
  defaultLoggerCallback,
  ensureValidMsalToken,
  getAuthority,
  getKnownAuthorities,
  getMSALLogLevel,
  handleMsalError,
  publicToMsal,
} from "./utils";

import { AuthenticationRequiredError } from "../errors";
import { IdentityClient } from "../client/identityClient";
import { MsalNodeOptions } from "./nodeFlows/msalNodeCommon";
import { RegionalAuthority } from "../regionalAuthority";
import { getLogLevel } from "@azure/logger";
import { resolveTenantId } from "../util/tenantIdUtils";

const msalLogger = credentialLogger("MsalClient");

export interface MsalClient {
  getTokenByClientSecret(
    scopes: string[],
    clientSecret: string,
    options?: GetTokenOptions,
  ): Promise<AccessToken>;
}

// TODO: define a new type for this
type CreateMsalClientOptions = Partial<MsalNodeOptions>;

export function generateMsalConfiguration(
  clientId: string,
  tenantId: string,
  createMsalClientOptions: CreateMsalClientOptions = {},
): msal.Configuration {
  const resolvedTenant = resolveTenantId(msalLogger, tenantId, clientId);

  const authority = getAuthority(
    resolvedTenant,
    createMsalClientOptions.authorityHost ?? process.env.AZURE_AUTHORITY_HOST,
  );

  const httpClient = new IdentityClient({
    ...createMsalClientOptions.tokenCredentialOptions,
    authorityHost: authority,
    loggingOptions: createMsalClientOptions.loggingOptions,
  });

  const msalConfig: msal.Configuration = {
    auth: {
      clientId,
      authority,
      knownAuthorities: getKnownAuthorities(
        resolvedTenant,
        authority,
        createMsalClientOptions.disableInstanceDiscovery,
      ),
    },
    system: {
      networkClient: httpClient,
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(createMsalClientOptions.logger ?? msalLogger),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: createMsalClientOptions.loggingOptions?.enableUnsafeSupportLogging,
      },
    },
  };
  return msalConfig;
}

interface MsalClientState {
  msalConfig: msal.Configuration;
  cachedAccount: msal.AccountInfo | null;
  azureRegion?: string;
  disableAutomaticAuthentication?: boolean;
}

export function createMsalClient(
  clientId: string,
  tenantId: string,
  createMsalClientOptions: CreateMsalClientOptions = {},
): MsalClient {
  const state: MsalClientState = {
    msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
    disableAutomaticAuthentication: createMsalClientOptions.disableAutomaticAuthentication,
    cachedAccount: createMsalClientOptions.authenticationRecord
      ? publicToMsal(createMsalClientOptions.authenticationRecord)
      : null,
  };
  state.azureRegion =
    createMsalClientOptions.regionalAuthority ?? process.env.AZURE_REGIONAL_AUTHORITY;
  if (state.azureRegion === RegionalAuthority.AutoDiscoverRegion) {
    state.azureRegion = "AUTO_DISCOVER";
  }
  // additionallyAllowedTenantIds

  // configure persistence
  // configure broker

  let confidentialApp: msal.ConfidentialClientApplication | undefined = undefined;
  async function getConfidentialApp(
    _options: GetTokenOptions = {},
  ): Promise<msal.ConfidentialClientApplication> {
    // abort requests
    // Not doing: passing through logger

    if (confidentialApp === undefined) {
      // TODOs:
      // CAE / non-CAE
      // hook up cache plugin
      // hook up native broker
      // clientAssertion (todo: push getAssertion call to getTokenByClientAssertion)
      if (
        state.msalConfig.auth.clientSecret === undefined /* TODO: add cert and assertion checks */
      ) {
        throw new Error(
          "Unable to generate the MSAL confidential client. Missing either the client's secret, certificate or assertion.",
        );
      }
      confidentialApp = new msal.ConfidentialClientApplication(state.msalConfig);
    }

    return confidentialApp;
  }

  async function getTokenSilent(
    app: msal.ConfidentialClientApplication | msal.PublicClientApplication,
    scopes: string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    if (state.cachedAccount === null) {
      const cache = app.getTokenCache();
      const accounts = await cache?.getAllAccounts();

      if (accounts === undefined) {
        throw new AuthenticationRequiredError({ scopes });
      }

      if (accounts.length !== 1) {
        msalLogger.info(`More than one account was found authenticated for this Client ID and Tenant ID.
However, no "authenticationRecord" has been provided for this credential,
therefore we're unable to pick between these accounts.
A new login attempt will be requested, to ensure the correct account is picked.
To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing a credential to prevent this from happening.`);
        throw new AuthenticationRequiredError({ scopes });
      }

      state.cachedAccount = accounts[0];
    }

    const silentRequest: msal.SilentFlowRequest = {
      account: state.cachedAccount,
      scopes,
      // TODO: is this needed?
      authority: state.msalConfig.auth.authority,
      claims: options?.claims,
    };

    // TODO: broker

    try {
      msalLogger.getToken.info("Attempting to acquire token silently");
      const response = await app.acquireTokenSilent(silentRequest);
      ensureValidMsalToken(scopes, response, options);

      if (response?.account) {
        state.cachedAccount = response.account;
      }

      msalLogger.getToken.info(formatSuccess(scopes));

      return {
        token: response.accessToken!,
        expiresOnTimestamp: response.expiresOn!.getTime(),
      };
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }

  async function getTokenByClientSecret(
    scopes: string[],
    clientSecret: string,
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    state.msalConfig.auth.clientSecret = clientSecret;

    const msalApp = await getConfidentialApp(options);

    try {
      return await getTokenSilent(msalApp, scopes, options);
    } catch (e: any) {
      if (e.name !== "AuthenticationRequiredError") {
        throw e;
      }
      if (state.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message:
            "Automatic authentication has been disabled. You may call the authentication() method.",
        });
      }
      msalLogger.getToken.info(`Silent authentication failed, falling back to interactive method.`);
      const token = await msalApp.acquireTokenByClientCredential({
        scopes: scopes,
        // TODO: correlationId
        azureRegion: state.azureRegion,
        authority: state.msalConfig.auth.authority,
        claims: options?.claims,
      });
      state.cachedAccount = token?.account ?? null;

      return {
        token: token!.accessToken,
        expiresOnTimestamp: token!.expiresOn!.getTime(),
      };
    }
  }

  return {
    getTokenByClientSecret,
  };
}
