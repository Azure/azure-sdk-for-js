// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ConstitutionOutput,
  ConfidentialLedgerErrorOutput,
  ConsortiumOutput,
  ConfidentialLedgerEnclavesOutput,
  PagedCollectionsOutput,
  PagedLedgerEntriesOutput,
  LedgerWriteResultOutput,
  LedgerQueryResultOutput,
  TransactionReceiptOutput,
  TransactionStatusOutput,
  LedgerEntryOutput,
  LedgerUserOutput,
} from "./outputModels";

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitution200Response extends HttpResponse {
  status: "200";
  body: ConstitutionOutput;
}

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitutionDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Consortium members can manage the Confidential Ledger. */
export interface ListConsortiumMembers200Response extends HttpResponse {
  status: "200";
  body: ConsortiumOutput;
}

/** Consortium members can manage the Confidential Ledger. */
export interface ListConsortiumMembersDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotes200Response extends HttpResponse {
  status: "200";
  body: ConfidentialLedgerEnclavesOutput;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Collection ids are user-created collections of ledger entries */
export interface ListCollections200Response extends HttpResponse {
  status: "200";
  body: PagedCollectionsOutput;
}

/** Collection ids are user-created collections of ledger entries */
export interface ListCollectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
export interface ListLedgerEntries200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerEntriesOutput;
}

/** A collection id may optionally be specified. Only entries in the specified (or default) collection will be returned. */
export interface ListLedgerEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

export interface CreateLedgerEntry200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id"?: string;
}

/** A collection id may optionally be specified. */
export interface CreateLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerWriteResultOutput;
  headers: RawHttpHeaders & CreateLedgerEntry200Headers;
}

/** A collection id may optionally be specified. */
export interface CreateLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerQueryResultOutput;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceiptOutput;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceiptDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatus200Response extends HttpResponse {
  status: "200";
  body: TransactionStatusOutput;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A collection id may optionally be specified. */
export interface GetCurrentLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

/** A collection id may optionally be specified. */
export interface GetCurrentLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUser204Response extends HttpResponse {
  status: "204";
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** Gets a user. */
export interface GetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** Gets a user. */
export interface GetUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** A JSON merge patch is applied for existing users */
export interface CreateOrUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ConfidentialLedgerErrorOutput;
}
