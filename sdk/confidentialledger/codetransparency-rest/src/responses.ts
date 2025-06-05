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

export interface CreateEntry201Headers {
  /** Location of the receipt */
  location?: string;
  /** The MIME content type a Cose body is application/cose, containing a CoseSign1 signature. */
  "content-type": "application/cose";
}

/** Response of entry submission if the response can be served immediately, mandatory in IETF SCITT draft */
export interface CreateEntry201Response extends HttpResponse {
  status: "201";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry201Headers;
}

export interface CreateEntry202Headers {
  /** Location of the operation */
  location?: string;
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** Response content is in CBOR format */
  "content-type": "application/cbor";
}

/** Response of entry submission containing the operation id, mandatory in IETF SCITT draft */
export interface CreateEntry202Response extends HttpResponse {
  status: "202";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry202Headers;
}

export interface CreateEntry400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface CreateEntry400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry400Headers;
}

export interface CreateEntry404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface CreateEntry404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry404Headers;
}

export interface CreateEntry429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface CreateEntry429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry429Headers;
}

export interface CreateEntry500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface CreateEntry500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry500Headers;
}

export interface CreateEntry503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface CreateEntry503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & CreateEntry503Headers;
}

export interface GetOperation200Headers {
  /** Location of the entry */
  location?: string;
  /** Response content is in CBOR format */
  "content-type": "application/cbor";
}

/** Provides status details for long running operation, mandatory in IETF SCITT draft */
export interface GetOperation200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation200Headers;
}

export interface GetOperation202Headers {
  /** Location of the operation */
  location?: string;
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
}

/** Pending response if the operation was not complete, mandatory in IETF SCITT draft */
export interface GetOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & GetOperation202Headers;
}

export interface GetOperation400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetOperation400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation400Headers;
}

export interface GetOperation404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetOperation404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation404Headers;
}

export interface GetOperation429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetOperation429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation429Headers;
}

export interface GetOperation500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetOperation500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation500Headers;
}

export interface GetOperation503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetOperation503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetOperation503Headers;
}

export interface GetEntry200Headers {
  /** Location of the receipt */
  location?: string;
  /** The MIME content type for receipt is application/cose. */
  "content-type": "application/cose";
}

/** A ledger receipt, see IETF SCITT draft */
export interface GetEntry200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry200Headers;
}

export interface GetEntry400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetEntry400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry400Headers;
}

export interface GetEntry404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntry404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry404Headers;
}

export interface GetEntry429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntry429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry429Headers;
}

export interface GetEntry500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetEntry500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry500Headers;
}

export interface GetEntry503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetEntry503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntry503Headers;
}

export interface GetEntryStatement200Headers {
  /** The MIME content type a Cose body is application/cose, containing a CoseSign1 signature, see IETF SCITT draft */
  "content-type": "application/cose";
}

/** Transparent statement */
export interface GetEntryStatement200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement200Headers;
}

export interface GetEntryStatement400Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Validation error response */
export interface GetEntryStatement400Response extends HttpResponse {
  status: "400";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement400Headers;
}

export interface GetEntryStatement404Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryStatement404Response extends HttpResponse {
  status: "404";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement404Headers;
}

export interface GetEntryStatement429Headers {
  /** Retry-After seconds value to help with polling */
  "retry-after"?: number;
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Not found error response */
export interface GetEntryStatement429Response extends HttpResponse {
  status: "429";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement429Headers;
}

export interface GetEntryStatement500Headers {
  /** The MIME content type for error is application/concise-problem-details+cbor, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Server error response */
export interface GetEntryStatement500Response extends HttpResponse {
  status: "500";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement500Headers;
}

export interface GetEntryStatement503Headers {
  /** Retry the same request after a suggested number of seconds */
  "retry-after"?: number;
  /** The MIME content type for error, see RFC9290 */
  "content-type": "application/concise-problem-details+cbor";
}

/** Service unavailable error response */
export interface GetEntryStatement503Response extends HttpResponse {
  status: "503";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetEntryStatement503Headers;
}
