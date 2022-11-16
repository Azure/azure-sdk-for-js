import { RequestParameters } from "@azure-rest/core-client";
import { LedgerEntry, LedgerUser } from "./models";

export type ConfidentialLedgerListCollectionsParameters = RequestParameters;
export type ConfidentialLedgerGetEnclaveQuotesParameters = RequestParameters;
export type ConfidentialLedgerGetConstitutionParameters = RequestParameters;
export type ConfidentialLedgerGetConsortiumMembersParameters =
  RequestParameters;
export type ConfidentialLedgerListLedgerEntriesParameters = RequestParameters;

export interface ConfidentialLedgerCreateLedgerEntryBodyParam {
  body?: LedgerEntry;
}

export interface ConfidentialLedgerCreateLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface ConfidentialLedgerCreateLedgerEntryQueryParam {
  queryParameters?: ConfidentialLedgerCreateLedgerEntryQueryParamProperties;
}

export type ConfidentialLedgerCreateLedgerEntryParameters =
  ConfidentialLedgerCreateLedgerEntryQueryParam &
    ConfidentialLedgerCreateLedgerEntryBodyParam &
    RequestParameters;

export interface ConfidentialLedgerGetLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface ConfidentialLedgerGetLedgerEntryQueryParam {
  queryParameters?: ConfidentialLedgerGetLedgerEntryQueryParamProperties;
}

export type ConfidentialLedgerGetLedgerEntryParameters =
  ConfidentialLedgerGetLedgerEntryQueryParam & RequestParameters;
export type ConfidentialLedgerGetReceiptParameters = RequestParameters;
export type ConfidentialLedgerGetTransactionStatusParameters =
  RequestParameters;

export interface ConfidentialLedgerGetCurrentLedgerEntryQueryParamProperties {
  /** The collection id. */
  collectionId?: string;
}

export interface ConfidentialLedgerGetCurrentLedgerEntryQueryParam {
  queryParameters?: ConfidentialLedgerGetCurrentLedgerEntryQueryParamProperties;
}

export type ConfidentialLedgerGetCurrentLedgerEntryParameters =
  ConfidentialLedgerGetCurrentLedgerEntryQueryParam & RequestParameters;
export type ConfidentialLedgerDeleteUserParameters = RequestParameters;
export type ConfidentialLedgerGetUserParameters = RequestParameters;

export interface ConfidentialLedgerCreateOrUpdateUserBodyParam {
  body?: LedgerUser;
}

export interface ConfidentialLedgerCreateOrUpdateUserMediaTypesParam {
  contentType: "application/merge-patch+json";
}

export type ConfidentialLedgerCreateOrUpdateUserParameters =
  ConfidentialLedgerCreateOrUpdateUserMediaTypesParam &
    ConfidentialLedgerCreateOrUpdateUserBodyParam &
    RequestParameters;
