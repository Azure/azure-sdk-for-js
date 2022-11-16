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
  options: ClientOptions = {}
): ConfidentialLedgerServiceClient {
  const baseUrl = options.baseUrl ?? `${ledgerUri}`;
  options.apiVersion = options.apiVersion ?? "2022-08-13";
  options = {
    ...options,
    credentials: {
      scopes: ["https://confidential-ledger.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-confidentialledger-test-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as ConfidentialLedgerServiceClient;

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
        return client
          .path("/app/transactions/{transactionId}", transactionId)
          .get(options);
      },
      getReceipt: (transactionId, options) => {
        return client
          .path("/app/transactions/{transactionId}/receipt", transactionId)
          .get(options);
      },
      getTransactionStatus: (transactionId, options) => {
        return client
          .path("/app/transactions/{transactionId}/status", transactionId)
          .get(options);
      },
      getCurrentLedgerEntry: (options) => {
        return client
          .path("/app/transactions:getCurrentLedgerEntry")
          .get(options);
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
