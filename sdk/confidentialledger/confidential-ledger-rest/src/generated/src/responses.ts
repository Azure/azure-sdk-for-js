// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constitution,
  ConfidentialLedgerError,
  Consortium,
  ConfidentialLedgerEnclaves,
  PagedLedgerEntries,
  LedgerWriteResult,
  LedgerQueryResult,
  TransactionReceipt,
  TransactionStatus,
  LedgerEntry,
  LedgerUser
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitution200Response extends HttpResponse {
  status: "200";
  body: Constitution;
}

/** The constitution is a script that assesses and applies proposals from consortium members. */
export interface GetConstitutiondefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** Consortium members can manage the Confidential Ledger. */
export interface GetConsortiumMembers200Response extends HttpResponse {
  status: "200";
  body: Consortium;
}

/** Consortium members can manage the Confidential Ledger. */
export interface GetConsortiumMembersdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotes200Response extends HttpResponse {
  status: "200";
  body: ConfidentialLedgerEnclaves;
}

/** A quote is an SGX enclave measurement that can be used to verify the validity of a node and its enclave. */
export interface GetEnclaveQuotesdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** A sub-ledger id may optionally be specified. Only entries in the specified (or default) sub-ledger will be returned. */
export interface GetLedgerEntries200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerEntries;
}

/** A sub-ledger id may optionally be specified. Only entries in the specified (or default) sub-ledger will be returned. */
export interface GetLedgerEntriesdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

export interface PostLedgerEntry200Headers {
  /** The transaction id at which this write will become durable. */
  "x-ms-ccf-transaction-id"?: string;
}

/** A sub-ledger id may optionally be specified. */
export interface PostLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerWriteResult;
  headers: RawHttpHeaders & PostLedgerEntry200Headers;
}

/** A sub-ledger id may optionally be specified. */
export interface PostLedgerEntrydefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerQueryResult;
}

/** To return older ledger entries, the relevant sections of the ledger must be read from disk and validated. To prevent blocking within the enclave, the response will indicate whether the entry is ready and part of the response, or if the loading is still ongoing. */
export interface GetLedgerEntrydefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceipt;
}

/** Gets a receipt certifying ledger contents at a particular transaction id. */
export interface GetReceiptdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatus200Response extends HttpResponse {
  status: "200";
  body: TransactionStatus;
}

/** Gets the status of an entry identified by a transaction id. */
export interface GetTransactionStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** A sub-ledger id may optionally be specified. */
export interface GetCurrentLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntry;
}

/** A sub-ledger id may optionally be specified. */
export interface GetCurrentLedgerEntrydefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUser204Response extends HttpResponse {
  status: "204";
}

/** Deletes a user from the Confidential Ledger. */
export interface DeleteUserdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** Gets a user. */
export interface GetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUser;
}

/** Gets a user. */
export interface GetUserdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}

/** A JSON merge patch is applied for existing users */
export interface PatchUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUser;
}

/** A JSON merge patch is applied for existing users */
export interface PatchUserdefaultResponse extends HttpResponse {
  status: "500";
  body: ConfidentialLedgerError;
}
