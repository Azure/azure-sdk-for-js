// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  CollectionModelOutput,
  ErrorResponseOutput,
  PagedLedgerEntriesOutput,
  LedgerEntryOutput,
  TransactionReceiptOutput,
  TransactionStatusOutput,
  LedgerUserOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface ListCollections200Response extends HttpResponse {
  status: "200";
  body: Array<CollectionModelOutput>;
}

export interface ListCollectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetEnclaveQuotes200Response extends HttpResponse {
  status: "200";
}

export interface GetEnclaveQuotesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetConstitution200Response extends HttpResponse {
  status: "200";
}

export interface GetConstitutionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetConsortiumMembers200Response extends HttpResponse {
  status: "200";
}

export interface GetConsortiumMembersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ListLedgerEntries200Response extends HttpResponse {
  status: "200";
  body: PagedLedgerEntriesOutput;
}

export interface ListLedgerEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CreateLedgerEntry201Headers {
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateLedgerEntry201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreateLedgerEntry201Headers;
}

export interface CreateLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

export interface GetLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceiptOutput;
}

export interface GetReceiptDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetTransactionStatus200Response extends HttpResponse {
  status: "200";
  body: TransactionStatusOutput;
}

export interface GetTransactionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetCurrentLedgerEntry200Response extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

export interface GetCurrentLedgerEntryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteUser204Response extends HttpResponse {
  status: "204";
}

export interface DeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

export interface GetUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface CreateOrUpdateUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateUser201Response extends HttpResponse {
  status: "201";
  body: LedgerUserOutput;
}

export interface CreateOrUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
