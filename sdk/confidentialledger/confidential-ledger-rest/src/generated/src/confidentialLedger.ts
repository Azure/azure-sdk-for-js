// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ConfidentialLedgerClient } from "./clientDefinitions";

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
      scopes: ["https://confidential-ledger.azure.com/.default"]
    }
  };

  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.0.0`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as ConfidentialLedgerClient;

  return client;
}
