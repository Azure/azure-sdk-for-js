// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { LedgerEntry, LedgerUser } from "./models";

export type GetConstitutionParameters = RequestParameters;
export type GetConsortiumMembersParameters = RequestParameters;
export type GetEnclaveQuotesParameters = RequestParameters;
export type ListCollectionsParameters = RequestParameters;

export interface ListLedgerEntriesQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
  /** Specify the first transaction ID in a range. */
  fromTransactionId?: string;
  /** Specify the last transaction ID in a range. */
  toTransactionId?: string;
}

export interface ListLedgerEntriesQueryParam {
  queryParameters?: ListLedgerEntriesQueryParamProperties;
}

export type ListLedgerEntriesParameters = ListLedgerEntriesQueryParam &
  RequestParameters;

export interface PostLedgerEntryBodyParam {
  /** Ledger entry. */
  body: LedgerEntry;
}

export interface PostLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface PostLedgerEntryQueryParam {
  queryParameters?: PostLedgerEntryQueryParamProperties;
}

export interface PostLedgerEntryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PostLedgerEntryParameters = PostLedgerEntryQueryParam &
  PostLedgerEntryMediaTypesParam &
  PostLedgerEntryBodyParam &
  RequestParameters;

export interface GetLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetLedgerEntryQueryParam {
  queryParameters?: GetLedgerEntryQueryParamProperties;
}

export type GetLedgerEntryParameters = GetLedgerEntryQueryParam &
  RequestParameters;
export type GetReceiptParameters = RequestParameters;
export type GetTransactionStatusParameters = RequestParameters;

export interface GetCurrentLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface GetCurrentLedgerEntryQueryParam {
  queryParameters?: GetCurrentLedgerEntryQueryParamProperties;
}

export type GetCurrentLedgerEntryParameters = GetCurrentLedgerEntryQueryParam &
  RequestParameters;
export type DeleteUserParameters = RequestParameters;
export type GetUserParameters = RequestParameters;

export interface CreateOrUpdateUserBodyParam {
  /** Details about a Confidential Ledger user. */
  body: LedgerUser;
}

export interface CreateOrUpdateUserMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CreateOrUpdateUserParameters = CreateOrUpdateUserMediaTypesParam &
  CreateOrUpdateUserBodyParam &
  RequestParameters;
