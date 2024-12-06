// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential } from "@azure/core-auth";
import { ConfidentialLedgerClient } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `ConfidentialLedgerClient`
 * @param endpoint - The Confidential Ledger URL, for example https://contoso.confidentialledger.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): ConfidentialLedgerClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2024-01-26-preview";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://confidential-ledger.azure.com/.default"
      ]
    }
  };

  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.1.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as ConfidentialLedgerClient;

  return client;
}
