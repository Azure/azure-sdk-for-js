// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type { NodeReadableStream } from "#platform/static-helpers/platform-types";

export interface GetTransparencyConfigCborHeaders {
  /** Accept header */
  accept: "application/cbor";
}

export interface GetTransparencyConfigCborHeaderParam {
  headers: RawHttpHeadersInput & GetTransparencyConfigCborHeaders;
}

export type GetTransparencyConfigCborParameters = GetTransparencyConfigCborHeaderParam &
  RequestParameters;
export type GetPublicKeysParameters = RequestParameters;

export interface ListScittKeysHeaders {
  /** Accept header */
  accept: "application/cbor";
}

export interface ListScittKeysHeaderParam {
  headers: RawHttpHeadersInput & ListScittKeysHeaders;
}

export type ListScittKeysParameters = ListScittKeysHeaderParam & RequestParameters;

export interface GetScittKeyHeaders {
  /** Accept header */
  accept: "application/cbor";
}

export interface GetScittKeyHeaderParam {
  headers: RawHttpHeadersInput & GetScittKeyHeaders;
}

export type GetScittKeyParameters = GetScittKeyHeaderParam & RequestParameters;

export interface CreateEntryV09Headers {
  /** Accept header */
  accept: "application/cose; application/cbor";
}

export interface CreateEntryV09BodyParam {
  /**
   * CoseSign1 signature envelope
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeReadableStream;
}

export interface CreateEntryV09QueryParamProperties {
  /** If true, waits for the entry to be committed before returning. Returns 201 with receipt or 503 on rollback. */
  waitForCommit?: boolean;
}

export interface CreateEntryV09QueryParam {
  queryParameters?: CreateEntryV09QueryParamProperties;
}

export interface CreateEntryV09HeaderParam {
  headers: RawHttpHeadersInput & CreateEntryV09Headers;
}

export interface CreateEntryV09MediaTypesParam {
  /** The MIME content type a Cose body is application/cose, containing a CoseSign1 signature, see IETF SCITT draft */
  contentType: "application/cose";
}

export type CreateEntryV09Parameters = CreateEntryV09QueryParam &
  CreateEntryV09HeaderParam &
  CreateEntryV09MediaTypesParam &
  CreateEntryV09BodyParam &
  RequestParameters;

export interface GetOperationV09Headers {
  /** Accept header */
  accept: "application/cbor";
}

export interface GetOperationV09HeaderParam {
  headers: RawHttpHeadersInput & GetOperationV09Headers;
}

export type GetOperationV09Parameters = GetOperationV09HeaderParam & RequestParameters;

export interface GetEntryV09Headers {
  /** Accept header */
  accept: "application/scitt-receipt+cose";
}

export interface GetEntryV09HeaderParam {
  headers: RawHttpHeadersInput & GetEntryV09Headers;
}

export type GetEntryV09Parameters = GetEntryV09HeaderParam & RequestParameters;

export interface GetEntryStatementV09Headers {
  /** Accept header */
  accept: "application/scitt-statement+cose";
}

export interface GetEntryStatementV09HeaderParam {
  headers: RawHttpHeadersInput & GetEntryStatementV09Headers;
}

export type GetEntryStatementV09Parameters = GetEntryStatementV09HeaderParam & RequestParameters;
