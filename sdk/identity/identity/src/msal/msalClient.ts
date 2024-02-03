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
  options: CreateMsalClientOptions = {},
): msal.Configuration {
  const resolvedTenant = resolveTenantId(msalLogger, tenantId, clientId);
  const authority = getAuthority(
    resolvedTenant,
    options.authorityHost ?? process.env.AZURE_AUTHORITY_HOST,
  );
  const httpClient = new IdentityClient({
    ...options.tokenCredentialOptions,
    authorityHost: authority,
    loggingOptions: options.loggingOptions,
  });

  const msalConfig: msal.Configuration = {
    // defaultNodeMsalConfig
    auth: {
      clientId,
      authority,
      knownAuthorities: getKnownAuthorities(
        resolvedTenant,
        authority,
        options.disableInstanceDiscovery,
      ),
    },
    system: {
      networkClient: httpClient,
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(msalLogger),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: options.loggingOptions?.enableUnsafeSupportLogging,
      },
    },
  };
  return msalConfig;
}

export function createMsalClient(
  clientId: string,
  tenantId: string,
  options: CreateMsalClientOptions = {},
): MsalClient {
  console.log({ options });
  // logger
  // defaultNodeConfiguration
  // resolveTenantId
  // additionallyAllowedTenantIds

  const msalConfig = generateMsalConfiguration(clientId, tenantId, options);

  // configure assertion
  // configure persistence
  // configure broker

  // azure region should come from credentials if they care about it

  let app: msal.ConfidentialClientApplication | undefined = undefined;
  async function getMsalApplication(): Promise<msal.ConfidentialClientApplication> {
    if (app === undefined) {
      app = new msal.ConfidentialClientApplication(msalConfig);
    }

    return app;
    // enableBroker
  }

  return {
    async getTokenByClientSecret(
      _scopes: string[],
      clientSecret: string,
      _options?: GetTokenOptions,
    ): Promise<AccessToken> {
      msalConfig.auth.clientSecret = clientSecret;
      const pca = await getMsalApplication();
      console.log(pca);
      const token = await pca.acquireTokenByClientCredential({
        scopes: _scopes,
      });
      return {
        token: token!.accessToken,
        expiresOnTimestamp: token!.expiresOn!.getTime(),
      };
      // implementation goes here
    },
  };
}
