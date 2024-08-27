// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetConstitutionParameters,
  ListConsortiumMembersParameters,
  GetEnclaveQuotesParameters,
  ListCollectionsParameters,
  ListLedgerEntriesParameters,
  CreateLedgerEntryParameters,
  GetLedgerEntryParameters,
  GetReceiptParameters,
  GetTransactionStatusParameters,
  GetCurrentLedgerEntryParameters,
  DeleteUserParameters,
  GetUserParameters,
  CreateOrUpdateUserParameters,
} from "./parameters";
import {
  GetConstitution200Response,
  GetConstitutionDefaultResponse,
  ListConsortiumMembers200Response,
  ListConsortiumMembersDefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesDefaultResponse,
  ListCollections200Response,
  ListCollectionsDefaultResponse,
  ListLedgerEntries200Response,
  ListLedgerEntriesDefaultResponse,
  CreateLedgerEntry200Response,
  CreateLedgerEntryDefaultResponse,
  GetLedgerEntry200Response,
  GetLedgerEntryDefaultResponse,
  GetReceipt200Response,
  GetReceiptDefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
  GetCurrentLedgerEntry200Response,
  GetCurrentLedgerEntryDefaultResponse,
  DeleteUser204Response,
  DeleteUserDefaultResponse,
  GetUser200Response,
  GetUserDefaultResponse,
  CreateOrUpdateUser200Response,
  CreateOrUpdateUserDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetConstitution {
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  get(
    options?: GetConstitutionParameters,
  ): StreamableMethod<
    GetConstitution200Response | GetConstitutionDefaultResponse
  >;
}

export interface ListConsortiumMembers {
  /** Consortium members can manage the Confidential Ledger. */
  get(
    options?: ListConsortiumMembersParameters,
  ): StreamableMethod<
    ListConsortiumMembers200Response | ListConsortiumMembersDefaultResponse
  >;
}

export interface GetEnclaveQuotes {
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  get(
    options?: GetEnclaveQuotesParameters,
  ): StreamableMethod<
    GetEnclaveQuotes200Response | GetEnclaveQuotesDefaultResponse
  >;
}

export interface ListCollections {
  /** Collection ids are user-created collections of ledger entries */
  get(
    options?: ListCollectionsParameters,
  ): StreamableMethod<
    ListCollections200Response | ListCollectionsDefaultResponse
  >;
}

export interface ListLedgerEntries {
  /** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
  get(
    options?: ListLedgerEntriesParameters,
  ): StreamableMethod<
    ListLedgerEntries200Response | ListLedgerEntriesDefaultResponse
  >;
  /** A collection id may optionally be specified. */
  post(
    options: CreateLedgerEntryParameters,
  ): StreamableMethod<
    CreateLedgerEntry200Response | CreateLedgerEntryDefaultResponse
  >;
}

export interface GetLedgerEntry {
  /** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
  get(
    options?: GetLedgerEntryParameters,
  ): StreamableMethod<
    GetLedgerEntry200Response | GetLedgerEntryDefaultResponse
  >;
}

export interface GetReceipt {
  /** Gets a receipt certifying ledger contents at a particular transaction id. */
  get(
    options?: GetReceiptParameters,
  ): StreamableMethod<GetReceipt200Response | GetReceiptDefaultResponse>;
}

export interface GetTransactionStatus {
  /** Gets the status of an entry identified by a transaction id. */
  get(
    options?: GetTransactionStatusParameters,
  ): StreamableMethod<
    GetTransactionStatus200Response | GetTransactionStatusDefaultResponse
  >;
}

export interface GetCurrentLedgerEntry {
  /** A collection id may optionally be specified. */
  get(
    options?: GetCurrentLedgerEntryParameters,
  ): StreamableMethod<
    GetCurrentLedgerEntry200Response | GetCurrentLedgerEntryDefaultResponse
  >;
}

export interface DeleteUser {
  /** Deletes a user from the Confidential Ledger. */
  delete(
    options?: DeleteUserParameters,
  ): StreamableMethod<DeleteUser204Response | DeleteUserDefaultResponse>;
  /** Gets a user. */
  get(
    options?: GetUserParameters,
  ): StreamableMethod<GetUser200Response | GetUserDefaultResponse>;
  /** A JSON merge patch is applied for existing users */
  patch(
    options: CreateOrUpdateUserParameters,
  ): StreamableMethod<
    CreateOrUpdateUser200Response | CreateOrUpdateUserDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/app/governance/constitution' has methods for the following verbs: get */
  (path: "/app/governance/constitution"): GetConstitution;
  /** Resource for '/app/governance/members' has methods for the following verbs: get */
  (path: "/app/governance/members"): ListConsortiumMembers;
  /** Resource for '/app/enclaveQuotes' has methods for the following verbs: get */
  (path: "/app/enclaveQuotes"): GetEnclaveQuotes;
  /** Resource for '/app/collections' has methods for the following verbs: get */
  (path: "/app/collections"): ListCollections;
  /** Resource for '/app/transactions' has methods for the following verbs: get, post */
  (path: "/app/transactions"): ListLedgerEntries;
  /** Resource for '/app/transactions/\{transactionId\}' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}",
    transactionId: string,
  ): GetLedgerEntry;
  /** Resource for '/app/transactions/\{transactionId\}/receipt' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/receipt",
    transactionId: string,
  ): GetReceipt;
  /** Resource for '/app/transactions/\{transactionId\}/status' has methods for the following verbs: get */
  (
    path: "/app/transactions/{transactionId}/status",
    transactionId: string,
  ): GetTransactionStatus;
  /** Resource for '/app/transactions/current' has methods for the following verbs: get */
  (path: "/app/transactions/current"): GetCurrentLedgerEntry;
  /** Resource for '/app/users/\{userId\}' has methods for the following verbs: delete, get, patch */
  (path: "/app/users/{userId}", userId: string): DeleteUser;
}

export type ConfidentialLedgerClient = Client & {
  path: Routes;
};
