// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListCollectionsParameters,
  GetEnclaveQuotesParameters,
  GetConstitutionParameters,
  GetConsortiumMembersParameters,
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
  ListCollections200Response,
  ListCollectionsDefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesDefaultResponse,
  GetConstitution200Response,
  GetConstitutionDefaultResponse,
  GetConsortiumMembers200Response,
  GetConsortiumMembersDefaultResponse,
  ListLedgerEntries200Response,
  ListLedgerEntriesDefaultResponse,
  CreateLedgerEntry201Response,
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
  CreateOrUpdateUser201Response,
  CreateOrUpdateUserDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListCollections {
  /** Collection ids are user-created collections of ledger entries */
  get(
    options?: ListCollectionsParameters
  ): StreamableMethod<
    ListCollections200Response | ListCollectionsDefaultResponse
  >;
}

export interface GetEnclaveQuotes {
  /** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
  get(
    options?: GetEnclaveQuotesParameters
  ): StreamableMethod<
    GetEnclaveQuotes200Response | GetEnclaveQuotesDefaultResponse
  >;
}

export interface GetConstitution {
  /** The constitution is a script that assesses and applies proposals from consortium members. */
  get(
    options?: GetConstitutionParameters
  ): StreamableMethod<
    GetConstitution200Response | GetConstitutionDefaultResponse
  >;
}

export interface GetConsortiumMembers {
  /** Consortium members can manage the Confidential Ledger. */
  get(
    options?: GetConsortiumMembersParameters
  ): StreamableMethod<
    GetConsortiumMembers200Response | GetConsortiumMembersDefaultResponse
  >;
}

export interface ListLedgerEntries {
  /** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
  get(
    options?: ListLedgerEntriesParameters
  ): StreamableMethod<
    ListLedgerEntries200Response | ListLedgerEntriesDefaultResponse
  >;
  /** A collection id may optionally be specified. */
  post(
    options?: CreateLedgerEntryParameters
  ): StreamableMethod<
    CreateLedgerEntry201Response | CreateLedgerEntryDefaultResponse
  >;
}

export interface GetLedgerEntry {
  /** Get a LedgerEntry */
  get(
    options?: GetLedgerEntryParameters
  ): StreamableMethod<
    GetLedgerEntry200Response | GetLedgerEntryDefaultResponse
  >;
}

export interface GetReceipt {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: GetReceiptParameters
  ): StreamableMethod<GetReceipt200Response | GetReceiptDefaultResponse>;
}

export interface GetTransactionStatus {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: GetTransactionStatusParameters
  ): StreamableMethod<
    GetTransactionStatus200Response | GetTransactionStatusDefaultResponse
  >;
}

export interface GetCurrentLedgerEntry {
  /** Runs a custom action on LedgerEntry */
  get(
    options?: GetCurrentLedgerEntryParameters
  ): StreamableMethod<
    GetCurrentLedgerEntry200Response | GetCurrentLedgerEntryDefaultResponse
  >;
}

export interface DeleteUser {
  /** Delete a LedgerUser */
  delete(
    options?: DeleteUserParameters
  ): StreamableMethod<DeleteUser204Response | DeleteUserDefaultResponse>;
  /** Get a LedgerUser */
  get(
    options?: GetUserParameters
  ): StreamableMethod<GetUser200Response | GetUserDefaultResponse>;
  /** Creates or updates a LedgerUser */
  patch(
    options: CreateOrUpdateUserParameters
  ): StreamableMethod<
    | CreateOrUpdateUser200Response
    | CreateOrUpdateUser201Response
    | CreateOrUpdateUserDefaultResponse
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
};
