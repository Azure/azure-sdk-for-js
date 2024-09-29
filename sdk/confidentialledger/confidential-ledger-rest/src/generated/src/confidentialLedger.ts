// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { ConfidentialLedgerClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `ConfidentialLedgerClient`
 * @param ledgerEndpoint - The Confidential Ledger URL, for example https://contoso.confidentialledger.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  ledgerEndpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): ConfidentialLedgerClient {
  const baseUrl = options.baseUrl ?? `${ledgerEndpoint}`;
  options.apiVersion = options.apiVersion ?? "2022-05-13";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://confidential-ledger.azure.com/.default"
      ]
    }
  };

  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.0.1`;
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
