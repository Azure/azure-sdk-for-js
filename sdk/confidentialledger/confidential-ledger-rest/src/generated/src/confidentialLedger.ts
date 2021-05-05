// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetConstitutionParameters,
  GetConsortiumMembersParameters,
  GetEnclaveQuotesParameters,
  GetLedgerEntriesParameters,
  PostLedgerEntryParameters,
  GetLedgerEntryParameters,
  GetReceiptParameters,
  GetTransactionStatusParameters,
  GetCurrentLedgerEntryParameters,
  DeleteUserParameters,
  GetUserParameters,
  PatchUserParameters
} from "./parameters";
import {
  GetConstitution200Response,
  GetConstitutiondefaultResponse,
  GetConsortiumMembers200Response,
  GetConsortiumMembersdefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesdefaultResponse,
  GetLedgerEntries200Response,
  GetLedgerEntriesdefaultResponse,
  PostLedgerEntry200Response,
  PostLedgerEntrydefaultResponse,
  GetLedgerEntry200Response,
  GetLedgerEntrydefaultResponse,
  GetReceipt200Response,
  GetReceiptdefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusdefaultResponse,
  GetCurrentLedgerEntry200Response,
  GetCurrentLedgerEntrydefaultResponse,
  DeleteUser204Response,
  DeleteUserdefaultResponse,
  GetUser200Response,
  GetUserdefaultResponse,
  PatchUser200Response,
  PatchUserdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface GetConstitution {
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  get(
    options?: GetConstitutionParameters
  ): Promise<GetConstitution200Response | GetConstitutiondefaultResponse>;
}

export interface GetConsortiumMembers {
  /** Consortium members can manage the Confidential Ledger. */
  get(
    options?: GetConsortiumMembersParameters
  ): Promise<
    GetConsortiumMembers200Response | GetConsortiumMembersdefaultResponse
  >;
}

export interface GetEnclaveQuotes {
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  get(
    options?: GetEnclaveQuotesParameters
  ): Promise<GetEnclaveQuotes200Response | GetEnclaveQuotesdefaultResponse>;
}

export interface PostLedgerEntry {
  /** A sub-ledger id may optionally be specified. Only entries in the specified (or default) sub-ledger will be returned. */
  get(
    options?: GetLedgerEntriesParameters
  ): Promise<GetLedgerEntries200Response | GetLedgerEntriesdefaultResponse>;
  /** A sub-ledger id may optionally be specified. */
  post(
    options?: PostLedgerEntryParameters
  ): Promise<PostLedgerEntry200Response | PostLedgerEntrydefaultResponse>;
}

export interface GetLedgerEntry {
  /** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
  get(
    options?: GetLedgerEntryParameters
  ): Promise<GetLedgerEntry200Response | GetLedgerEntrydefaultResponse>;
}

export interface GetReceipt {
  /** Gets a receipt certifying ledger contents at a particular transaction id. */
  get(
    options?: GetReceiptParameters
  ): Promise<GetReceipt200Response | GetReceiptdefaultResponse>;
}

export interface GetTransactionStatus {
  /** Gets the status of an entry identified by a transaction id. */
  get(
    options?: GetTransactionStatusParameters
  ): Promise<
    GetTransactionStatus200Response | GetTransactionStatusdefaultResponse
  >;
}

export interface GetCurrentLedgerEntry {
  /** A sub-ledger id may optionally be specified. */
  get(
    options?: GetCurrentLedgerEntryParameters
  ): Promise<
    GetCurrentLedgerEntry200Response | GetCurrentLedgerEntrydefaultResponse
  >;
}

export interface PatchUser {
  /** Deletes a user from the Confidential Ledger. */
  delete(
    options?: DeleteUserParameters
  ): Promise<DeleteUser204Response | DeleteUserdefaultResponse>;
  /** Gets a user. */
  get(
    options?: GetUserParameters
  ): Promise<GetUser200Response | GetUserdefaultResponse>;
  /** A JSON merge patch is applied for existing users */
  patch(
    options: PatchUserParameters
  ): Promise<PatchUser200Response | PatchUserdefaultResponse>;
}

export interface Routes {
  /** Resource for '/app/governance/constitution' has methods for the following verbs: get */
  (path: "/app/governance/constitution"): GetConstitution;
  /** Resource for '/app/governance/members' has methods for the following verbs: get */
  (path: "/app/governance/members"): GetConsortiumMembers;
  /** Resource for '/app/enclaveQuotes' has methods for the following verbs: get */
  (path: "/app/enclaveQuotes"): GetEnclaveQuotes;
  /** Resource for '/app/transactions' has methods for the following verbs: get, post */
  (path: "/app/transactions"): PostLedgerEntry;
  /** Resource for '/app/transactions/\{transactionId\}' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}",
    transactionId: string
  ): GetLedgerEntry;
  /** Resource for '/app/transactions/\{transactionId\}/receipt' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/receipt",
    transactionId: string
  ): GetReceipt;
  /** Resource for '/app/transactions/\{transactionId\}/status' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/status",
    transactionId: string
  ): GetTransactionStatus;
  /** Resource for '/app/transactions/current' has methods for the following verbs: get */
  (path: "/app/transactions/current"): GetCurrentLedgerEntry;
  /** Resource for '/app/users/\{userId\}' has methods for the following verbs: delete, get, patch */
  (path: "/app/users/{userId}", userId: string): PatchUser;
}

export type ConfidentialLedgerClient = Client & {
  path: Routes;
};

export interface ConfidentialLedgerFactory {
  (
    ledgerBaseUrl: string,
    credentials: TokenCredential | KeyCredential,
    options?: ClientOptions
  ): void;
}

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): ConfidentialLedgerClient {
  const baseUrl = options.baseUrl ?? `${ledgerBaseUrl}`;
  options.apiVersion = options.apiVersion ?? "0.1-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://confidential-ledger.azure.com/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as ConfidentialLedgerClient;
}
