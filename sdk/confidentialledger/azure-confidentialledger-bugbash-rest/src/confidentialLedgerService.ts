// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ConfidentialLedgerServiceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class ConfidentialLedgerServiceClient class.
 * @param ledgerUri type: string
 * @param credentials type: TokenCredential
 */
export default function createClient(
  ledgerUri: string,
  credentials: TokenCredential,
  clientOptions: ClientOptions = {}
): ConfidentialLedgerServiceClient {
  const baseUrl = clientOptions.baseUrl ?? `${ledgerUri}`;
  clientOptions.apiVersion = clientOptions.apiVersion ?? "2022-08-13";
  clientOptions = {
    ...clientOptions,
    credentials: {
      scopes: ["https://confidential-ledger.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-confidentialledger-bugbash-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    clientOptions.userAgentOptions && clientOptions.userAgentOptions.userAgentPrefix
      ? `${clientOptions.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  clientOptions = {
    ...clientOptions,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, credentials, clientOptions) as ConfidentialLedgerServiceClient;

  return {
    ...client,
    confidentialLedger: {
      listCollections: (options) => {
        return client.path("/app/collections").get(options);
      },
      getEnclaveQuotes: (options) => {
        return client.path("/app/enclaveQuotes").get(options);
      },
      getConstitution: (options) => {
        return client.path("/app/governance/constitution").get(options);
      },
      getConsortiumMembers: (options) => {
        return client.path("/app/governance/members").get(options);
      },
      listLedgerEntries: (options) => {
        return client.path("/app/transactions").get(options);
      },
      createLedgerEntry: (options) => {
        return client.path("/app/transactions").post(options);
      },
      getLedgerEntry: (transactionId, options) => {
        return client.path("/app/transactions/{transactionId}", transactionId).get(options);
      },
      getReceipt: (transactionId, options) => {
        return client.path("/app/transactions/{transactionId}/receipt", transactionId).get(options);
      },
      getTransactionStatus: (transactionId, options) => {
        return client.path("/app/transactions/{transactionId}/status", transactionId).get(options);
      },
      getCurrentLedgerEntry: (options) => {
        return client.path("/app/transactions:getCurrentLedgerEntry").get(options);
      },
      deleteUser: (userId, options) => {
        return client.path("/app/users/{userId}", userId).delete(options);
      },
      getUser: (userId, options) => {
        return client.path("/app/users/{userId}", userId).get(options);
      },
      createOrUpdateUser: (userId, options) => {
        return client.path("/app/users/{userId}", userId).patch(options);
      },
    },
  };
}
