import {
  ConfidentialLedgerListCollectionsParameters,
  ConfidentialLedgerGetEnclaveQuotesParameters,
  ConfidentialLedgerGetConstitutionParameters,
  ConfidentialLedgerGetConsortiumMembersParameters,
  ConfidentialLedgerListLedgerEntriesParameters,
  ConfidentialLedgerCreateLedgerEntryParameters,
  ConfidentialLedgerGetLedgerEntryParameters,
  ConfidentialLedgerGetReceiptParameters,
  ConfidentialLedgerGetTransactionStatusParameters,
  ConfidentialLedgerGetCurrentLedgerEntryParameters,
  ConfidentialLedgerDeleteUserParameters,
  ConfidentialLedgerGetUserParameters,
  ConfidentialLedgerCreateOrUpdateUserParameters,
} from "./parameters";
import {
  ConfidentialLedgerListCollections200Response,
  ConfidentialLedgerListCollectionsDefaultResponse,
  ConfidentialLedgerGetEnclaveQuotes200Response,
  ConfidentialLedgerGetEnclaveQuotesDefaultResponse,
  ConfidentialLedgerGetConstitution200Response,
  ConfidentialLedgerGetConstitutionDefaultResponse,
  ConfidentialLedgerGetConsortiumMembers200Response,
  ConfidentialLedgerGetConsortiumMembersDefaultResponse,
  ConfidentialLedgerListLedgerEntries200Response,
  ConfidentialLedgerListLedgerEntriesDefaultResponse,
  ConfidentialLedgerCreateLedgerEntry201Response,
  ConfidentialLedgerCreateLedgerEntryDefaultResponse,
  ConfidentialLedgerGetLedgerEntry200Response,
  ConfidentialLedgerGetLedgerEntryDefaultResponse,
  ConfidentialLedgerGetReceipt200Response,
  ConfidentialLedgerGetReceiptDefaultResponse,
  ConfidentialLedgerGetTransactionStatus200Response,
  ConfidentialLedgerGetTransactionStatusDefaultResponse,
  ConfidentialLedgerGetCurrentLedgerEntry200Response,
  ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse,
  ConfidentialLedgerDeleteUser204Response,
  ConfidentialLedgerDeleteUserDefaultResponse,
  ConfidentialLedgerGetUser200Response,
  ConfidentialLedgerGetUserDefaultResponse,
  ConfidentialLedgerCreateOrUpdateUser200Response,
  ConfidentialLedgerCreateOrUpdateUser201Response,
  ConfidentialLedgerCreateOrUpdateUserDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

/** Contains operations for ConfidentialLedger operations */
export interface ConfidentialLedgerOperations {
  /** Collection ids are user-created collections of ledger entries */
  listCollections(
    options?: ConfidentialLedgerListCollectionsParameters
  ): StreamableMethod<
    | ConfidentialLedgerListCollections200Response
    | ConfidentialLedgerListCollectionsDefaultResponse
  >;
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  getEnclaveQuotes(
    options?: ConfidentialLedgerGetEnclaveQuotesParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetEnclaveQuotes200Response
    | ConfidentialLedgerGetEnclaveQuotesDefaultResponse
  >;
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  getConstitution(
    options?: ConfidentialLedgerGetConstitutionParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetConstitution200Response
    | ConfidentialLedgerGetConstitutionDefaultResponse
  >;
  /** Consortium members can manage the Confidential Ledger. */
  getConsortiumMembers(
    options?: ConfidentialLedgerGetConsortiumMembersParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetConsortiumMembers200Response
    | ConfidentialLedgerGetConsortiumMembersDefaultResponse
  >;
  /** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
  listLedgerEntries(
    options?: ConfidentialLedgerListLedgerEntriesParameters
  ): StreamableMethod<
    | ConfidentialLedgerListLedgerEntries200Response
    | ConfidentialLedgerListLedgerEntriesDefaultResponse
  >;
  /** A collection id may optionally be specified. */
  createLedgerEntry(
    options?: ConfidentialLedgerCreateLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerCreateLedgerEntry201Response
    | ConfidentialLedgerCreateLedgerEntryDefaultResponse
  >;
  /** Get a LedgerEntry */
  getLedgerEntry(
    transactionId: string,
    options?: ConfidentialLedgerGetLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetLedgerEntry200Response
    | ConfidentialLedgerGetLedgerEntryDefaultResponse
  >;
  /** Runs a custom action on LedgerEntry */
  getReceipt(
    transactionId: string,
    options?: ConfidentialLedgerGetReceiptParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetReceipt200Response
    | ConfidentialLedgerGetReceiptDefaultResponse
  >;
  /** Runs a custom action on LedgerEntry */
  getTransactionStatus(
    transactionId: string,
    options?: ConfidentialLedgerGetTransactionStatusParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetTransactionStatus200Response
    | ConfidentialLedgerGetTransactionStatusDefaultResponse
  >;
  /** Runs a custom action on LedgerEntry */
  getCurrentLedgerEntry(
    options?: ConfidentialLedgerGetCurrentLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetCurrentLedgerEntry200Response
    | ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
  >;
  /** Delete a LedgerUser */
  deleteUser(
    userId: string,
    options?: ConfidentialLedgerDeleteUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerDeleteUser204Response
    | ConfidentialLedgerDeleteUserDefaultResponse
  >;
  /** Get a LedgerUser */
  getUser(
    userId: string,
    options?: ConfidentialLedgerGetUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetUser200Response
    | ConfidentialLedgerGetUserDefaultResponse
  >;
  /** Creates or updates a LedgerUser */
  createOrUpdateUser(
    userId: string,
    options: ConfidentialLedgerCreateOrUpdateUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerCreateOrUpdateUser200Response
    | ConfidentialLedgerCreateOrUpdateUser201Response
    | ConfidentialLedgerCreateOrUpdateUserDefaultResponse
  >;
}

export interface ListCollections {
  /** Collection ids are user-created collections of ledger entries */
  get(
    options?: ConfidentialLedgerListCollectionsParameters
  ): StreamableMethod<
    | ConfidentialLedgerListCollections200Response
    | ConfidentialLedgerListCollectionsDefaultResponse
  >;
}

export interface GetEnclaveQuotes {
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  get(
    options?: ConfidentialLedgerGetEnclaveQuotesParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetEnclaveQuotes200Response
    | ConfidentialLedgerGetEnclaveQuotesDefaultResponse
  >;
}

export interface GetConstitution {
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  get(
    options?: ConfidentialLedgerGetConstitutionParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetConstitution200Response
    | ConfidentialLedgerGetConstitutionDefaultResponse
  >;
}

export interface GetConsortiumMembers {
  /** Consortium members can manage the Confidential Ledger. */
  get(
    options?: ConfidentialLedgerGetConsortiumMembersParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetConsortiumMembers200Response
    | ConfidentialLedgerGetConsortiumMembersDefaultResponse
  >;
}

export interface ListLedgerEntries {
  /** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
  get(
    options?: ConfidentialLedgerListLedgerEntriesParameters
  ): StreamableMethod<
    | ConfidentialLedgerListLedgerEntries200Response
    | ConfidentialLedgerListLedgerEntriesDefaultResponse
  >;
  /** A collection id may optionally be specified. */
  post(
    options?: ConfidentialLedgerCreateLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerCreateLedgerEntry201Response
    | ConfidentialLedgerCreateLedgerEntryDefaultResponse
  >;
}

export interface GetLedgerEntry {
  /** Get a LedgerEntry */
  get(
    options?: ConfidentialLedgerGetLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetLedgerEntry200Response
    | ConfidentialLedgerGetLedgerEntryDefaultResponse
  >;
}

export interface GetReceipt {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: ConfidentialLedgerGetReceiptParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetReceipt200Response
    | ConfidentialLedgerGetReceiptDefaultResponse
  >;
}

export interface GetTransactionStatus {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: ConfidentialLedgerGetTransactionStatusParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetTransactionStatus200Response
    | ConfidentialLedgerGetTransactionStatusDefaultResponse
  >;
}

export interface GetCurrentLedgerEntry {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: ConfidentialLedgerGetCurrentLedgerEntryParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetCurrentLedgerEntry200Response
    | ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
  >;
}

export interface DeleteUser {
  /** Delete a LedgerUser */
  delete(
    options?: ConfidentialLedgerDeleteUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerDeleteUser204Response
    | ConfidentialLedgerDeleteUserDefaultResponse
  >;
  /** Get a LedgerUser */
  get(
    options?: ConfidentialLedgerGetUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerGetUser200Response
    | ConfidentialLedgerGetUserDefaultResponse
  >;
  /** Creates or updates a LedgerUser */
  patch(
    options: ConfidentialLedgerCreateOrUpdateUserParameters
  ): StreamableMethod<
    | ConfidentialLedgerCreateOrUpdateUser200Response
    | ConfidentialLedgerCreateOrUpdateUser201Response
    | ConfidentialLedgerCreateOrUpdateUserDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/app/collections' has methods for the following verbs: get */
  (path: "/app/collections"): ListCollections;
  /** Resource for '/app/enclaveQuotes' has methods for the following verbs: get */
  (path: "/app/enclaveQuotes"): GetEnclaveQuotes;
  /** Resource for '/app/governance/constitution' has methods for the following verbs: get */
  (path: "/app/governance/constitution"): GetConstitution;
  /** Resource for '/app/governance/members' has methods for the following verbs: get */
  (path: "/app/governance/members"): GetConsortiumMembers;
  /** Resource for '/app/transactions' has methods for the following verbs: get, post */
  (path: "/app/transactions"): ListLedgerEntries;
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
  /** Resource for '/app/transactions:getCurrentLedgerEntry' has methods for the following verbs: get */
  (path: "/app/transactions:getCurrentLedgerEntry"): GetCurrentLedgerEntry;
  /** Resource for '/app/users/\{userId\}' has methods for the following verbs: delete, get, patch */
  (path: "/app/users/{userId}", userId: string): DeleteUser;
}

export type ConfidentialLedgerServiceClient = Client & {
  path: Routes;
  confidentialLedger: ConfidentialLedgerOperations;
};
