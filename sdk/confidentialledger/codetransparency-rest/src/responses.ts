// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type { JwksDocumentOutput } from "./outputModels.js";

export interface GetTransparencyConfigCbor200Headers {
  /** Default content type is application/cbor. */
  "content-type": "application/cbor";
}

/** Transparency configuration, see IETF SCITT draft. */
export interface GetTransparencyConfigCbor200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetTransparencyConfigCbor200Headers;
}

export interface GetTransparencyConfigCbor500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetTransparencyConfigCbor500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetTransparencyConfigCbor500Headers;
}

export interface GetTransparencyConfigCbor503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetTransparencyConfigCbor503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetTransparencyConfigCbor503Headers;
}

export interface GetPublicKeys200Headers {
  /** Content type header */
  "content-type": "application/json";
}

/** The request has succeeded. */
export interface GetPublicKeys200Response extends HttpResponse {
  status: "200";
  body: JwksDocumentOutput;
  headers: RawHttpHeaders & GetPublicKeys200Headers;
}

export interface GetPublicKeys400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetPublicKeys400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetPublicKeys400Headers;
}

export interface GetPublicKeys404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetPublicKeys404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetPublicKeys404Headers;
}

export interface GetPublicKeys429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetPublicKeys429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetPublicKeys429Headers;
}

export interface GetPublicKeys500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetPublicKeys500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetPublicKeys500Headers;
}

export interface GetPublicKeys503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetPublicKeys503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetPublicKeys503Headers;
}

export interface ListScittKeys200Headers {
  /** Content type is application/cbor */
  "content-type": "application/cbor";
}

/** Response containing COSE_Key_Set (array of COSE_Key maps) in CBOR format */
export interface ListScittKeys200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys200Headers;
}

export interface ListScittKeys400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface ListScittKeys400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys400Headers;
}

export interface ListScittKeys401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface ListScittKeys401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys401Headers;
}

export interface ListScittKeys404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface ListScittKeys404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys404Headers;
}

export interface ListScittKeys429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface ListScittKeys429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys429Headers;
}

export interface ListScittKeys500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface ListScittKeys500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys500Headers;
}

export interface ListScittKeys503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface ListScittKeys503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ListScittKeys503Headers;
}

export interface GetScittKey200Headers {
  /** Content type is application/cbor */
  "content-type": "application/cbor";
}

/** Response containing a single COSE_Key (map, not array) in CBOR format */
export interface GetScittKey200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey200Headers;
}

export interface GetScittKey400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetScittKey400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey400Headers;
}

export interface GetScittKey401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface GetScittKey401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey401Headers;
}

export interface GetScittKey404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetScittKey404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey404Headers;
}

export interface GetScittKey429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetScittKey429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey429Headers;
}

export interface GetScittKey500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetScittKey500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey500Headers;
}

export interface GetScittKey503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetScittKey503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetScittKey503Headers;
}

export interface CreateEntryV09201Headers {
  /** Location of the receipt */
  location?: string;
  /** Transaction ID for the committed entry, returned when waitForCommit=true */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for SCRAPI v09 receipts is application/scitt-receipt+cose. */
  "content-type": "application/scitt-receipt+cose";
}

/** Response of entry submission if the response can be served immediately, mandatory in IETF SCITT draft */
export interface CreateEntryV09201Response extends HttpResponse {
  status: "201";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09201Headers;
}

export interface CreateEntryV09303Headers {
  /** Location of the entry to poll */
  location: string;
  /** Transaction ID for the entry */
  "x-ms-ccf-transaction-id": string;
}

/** Response for async entry submission in SCRAPI v09, returns 303 See Other with empty body */
export interface CreateEntryV09303Response extends HttpResponse {
  status: "303";
  headers: RawHttpHeaders & CreateEntryV09303Headers;
}

export interface CreateEntryV09400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface CreateEntryV09400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09400Headers;
}

export interface CreateEntryV09401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface CreateEntryV09401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09401Headers;
}

export interface CreateEntryV09404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface CreateEntryV09404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09404Headers;
}

export interface CreateEntryV09429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface CreateEntryV09429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09429Headers;
}

export interface CreateEntryV09500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface CreateEntryV09500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09500Headers;
}

export interface CreateEntryV09503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface CreateEntryV09503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntryV09503Headers;
}

export interface GetOperationV09200Headers {
  /** Location of the entry */
  location?: string;
  /** Response content is in CBOR format */
  "content-type": "application/cbor";
}

/** Provides status details for long running operation, mandatory in IETF SCITT draft */
export interface GetOperationV09200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09200Headers;
}

export interface GetOperationV09202Headers {
  /** Location of the operation */
  location?: string;
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
}

/** Pending response if the operation was not complete, mandatory in IETF SCITT draft */
export interface GetOperationV09202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & GetOperationV09202Headers;
}

export interface GetOperationV09400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetOperationV09400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09400Headers;
}

export interface GetOperationV09401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface GetOperationV09401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09401Headers;
}

export interface GetOperationV09404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetOperationV09404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09404Headers;
}

export interface GetOperationV09429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetOperationV09429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09429Headers;
}

export interface GetOperationV09500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetOperationV09500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09500Headers;
}

export interface GetOperationV09503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetOperationV09503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperationV09503Headers;
}

export interface GetEntryV09200Headers {
  /** Location of the receipt */
  location?: string;
  /** The MIME content type for SCRAPI v09 receipts is application/scitt-receipt+cose. */
  "content-type": "application/scitt-receipt+cose";
}

/** A ledger receipt, see IETF SCITT draft */
export interface GetEntryV09200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09200Headers;
}

export interface GetEntryV09302Headers {
  /** Location of the entry to poll */
  location: string;
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
}

/** Pending response for entry query in SCRAPI v09, returns 302 Found */
export interface GetEntryV09302Response extends HttpResponse {
  status: "302";
  headers: RawHttpHeaders & GetEntryV09302Headers;
}

export interface GetEntryV09400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetEntryV09400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09400Headers;
}

export interface GetEntryV09401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface GetEntryV09401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09401Headers;
}

export interface GetEntryV09404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryV09404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09404Headers;
}

export interface GetEntryV09429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryV09429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09429Headers;
}

export interface GetEntryV09500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetEntryV09500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09500Headers;
}

export interface GetEntryV09503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetEntryV09503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryV09503Headers;
}

export interface GetEntryStatementV09200Headers {
  /** The MIME content type is application/scitt-statement+cose in SCRAPI v09 */
  "content-type": "application/scitt-statement+cose";
}

/** Transparent statement */
export interface GetEntryStatementV09200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09200Headers;
}

export interface GetEntryStatementV09400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetEntryStatementV09400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09400Headers;
}

export interface GetEntryStatementV09401Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Unauthorized error response, returned when JWT authentication is required and the request fails authentication. */
export interface GetEntryStatementV09401Response extends HttpResponse {
  status: "401";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09401Headers;
}

export interface GetEntryStatementV09404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryStatementV09404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09404Headers;
}

export interface GetEntryStatementV09429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryStatementV09429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09429Headers;
}

export interface GetEntryStatementV09500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetEntryStatementV09500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09500Headers;
}

export interface GetEntryStatementV09503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** Transaction ID associated with the failed request, when available */
  "x-ms-ccf-transaction-id"?: string;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetEntryStatementV09503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatementV09503Headers;
}
