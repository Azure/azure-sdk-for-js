// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msal from "@azure/msal-node";

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { defaultLoggerCallback, getAuthority, getKnownAuthorities, getMSALLogLevel } from "./utils";

import { IdentityClient } from "../client/identityClient";
import { MsalNodeOptions } from "./nodeFlows/msalNodeCommon";
import { credentialLogger } from "../util/logging";
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

export function createMsalClient(
  clientId: string,
  tenantId: string,
  createMsalClientOptions: CreateMsalClientOptions = {},
): MsalClient {
  console.log({ options: createMsalClientOptions });
  // additionallyAllowedTenantIds

  const msalConfig = generateMsalConfiguration(clientId, tenantId, createMsalClientOptions);

  // configure assertion
  // configure persistence
  // configure broker

  // azure region should come from credentials if they care about it

  let confidentialApp: msal.ConfidentialClientApplication | undefined = undefined;
  async function getConfidentialApp(
    _options: GetTokenOptions = {},
  ): Promise<msal.ConfidentialClientApplication> {
    // abort requests
    // Not doing: passing through logger

    if (confidentialApp === undefined) {
      // CAE / non-CAE
      // hook up cache plugin
      // hook up native broker
      // wait for assertion
      if (msalConfig.auth.clientSecret === undefined /* TODO: add cert and assertion checks */) {
        throw new Error(
          "Unable to generate the MSAL confidential client. Missing either the client's secret, certificate or assertion.",
        );
      }
      confidentialApp = new msal.ConfidentialClientApplication(msalConfig);
    }

    return confidentialApp;
  }

  return {
    async getTokenByClientSecret(
      scopes: string[],
      clientSecret: string,
      options?: GetTokenOptions,
    ): Promise<AccessToken> {
      msalConfig.auth.clientSecret = clientSecret;
      const msalApp = await getConfidentialApp(options);
      const token = await msalApp.acquireTokenByClientCredential({
        scopes: scopes,
      });
      return {
        token: token!.accessToken,
        expiresOnTimestamp: token!.expiresOn!.getTime(),
      };
    },
  };
}
