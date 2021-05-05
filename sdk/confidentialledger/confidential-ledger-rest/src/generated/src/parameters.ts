// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { LedgerEntry, LedgerUser } from "./models";

export type GetConstitutionParameters = RequestParameters;
export type GetConsortiumMembersParameters = RequestParameters;
export type GetEnclaveQuotesParameters = RequestParameters;

export interface GetLedgerEntriesQueryParamProperties {
  /** The sub-ledger id. */
  subLedgerId?: string;
  /** Specify the first transaction ID in a range. */
  fromTransactionId?: string;
  /** Specify the last transaction ID in a range. */
  toTransactionId?: string;
}

export interface GetLedgerEntriesQueryParam {
  queryParameters?: GetLedgerEntriesQueryParamProperties;
}

export type GetLedgerEntriesParameters = RequestParameters &
  GetLedgerEntriesQueryParam;

export interface PostLedgerEntryQueryParamProperties {
  /** The sub-ledger id. */
  subLedgerId?: string;
}

export interface PostLedgerEntryQueryParam {
  queryParameters?: PostLedgerEntryQueryParamProperties;
}

export interface PostLedgerEntryBodyParam {
  body?: LedgerEntry;
}

export type PostLedgerEntryParameters = RequestParameters &
  PostLedgerEntryQueryParam &
  PostLedgerEntryBodyParam;

export interface GetLedgerEntryQueryParamProperties {
  /** The sub-ledger id. */
  subLedgerId?: string;
}

export interface GetLedgerEntryQueryParam {
  queryParameters?: GetLedgerEntryQueryParamProperties;
}

export type GetLedgerEntryParameters = RequestParameters &
  GetLedgerEntryQueryParam;
export type GetReceiptParameters = RequestParameters;
export type GetTransactionStatusParameters = RequestParameters;

export interface GetCurrentLedgerEntryQueryParamProperties {
  /** The sub-ledger id. */
  subLedgerId?: string;
}

export interface GetCurrentLedgerEntryQueryParam {
  queryParameters?: GetCurrentLedgerEntryQueryParamProperties;
}

export type GetCurrentLedgerEntryParameters = RequestParameters &
  GetCurrentLedgerEntryQueryParam;
export type DeleteUserParameters = RequestParameters;
export type GetUserParameters = RequestParameters;

export interface PatchUserBodyParam {
  body: LedgerUser;
}

export type PatchUserParameters = RequestParameters & PatchUserBodyParam;
