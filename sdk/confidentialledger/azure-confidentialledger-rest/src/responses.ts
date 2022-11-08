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
export interface ConfidentialLedgerListCollections200Response
  extends HttpResponse {
  status: "200";
  body: Array<CollectionModelOutput>;
}

export interface ConfidentialLedgerListCollectionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetEnclaveQuotes200Response
  extends HttpResponse {
  status: "200";
}

export interface ConfidentialLedgerGetEnclaveQuotesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetConstitution200Response
  extends HttpResponse {
  status: "200";
}

export interface ConfidentialLedgerGetConstitutionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetConsortiumMembers200Response
  extends HttpResponse {
  status: "200";
}

export interface ConfidentialLedgerGetConsortiumMembersDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerListLedgerEntries200Response
  extends HttpResponse {
  status: "200";
  body: PagedLedgerEntriesOutput;
}

export interface ConfidentialLedgerListLedgerEntriesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ConfidentialLedgerCreateLedgerEntry201Headers {
  location: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ConfidentialLedgerCreateLedgerEntry201Response
  extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & ConfidentialLedgerCreateLedgerEntry201Headers;
}

export interface ConfidentialLedgerCreateLedgerEntryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetLedgerEntry200Response
  extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

export interface ConfidentialLedgerGetLedgerEntryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetReceipt200Response extends HttpResponse {
  status: "200";
  body: TransactionReceiptOutput;
}

export interface ConfidentialLedgerGetReceiptDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetTransactionStatus200Response
  extends HttpResponse {
  status: "200";
  body: TransactionStatusOutput;
}

export interface ConfidentialLedgerGetTransactionStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetCurrentLedgerEntry200Response
  extends HttpResponse {
  status: "200";
  body: LedgerEntryOutput;
}

export interface ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ConfidentialLedgerDeleteUser204Response extends HttpResponse {
  status: "204";
}

export interface ConfidentialLedgerDeleteUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerGetUser200Response extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

export interface ConfidentialLedgerGetUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ConfidentialLedgerCreateOrUpdateUser200Response
  extends HttpResponse {
  status: "200";
  body: LedgerUserOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ConfidentialLedgerCreateOrUpdateUser201Response
  extends HttpResponse {
  status: "201";
  body: LedgerUserOutput;
}

export interface ConfidentialLedgerCreateOrUpdateUserDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
