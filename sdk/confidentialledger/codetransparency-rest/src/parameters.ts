// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";

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

export interface CreateEntryHeaders {
  /** Accept header */
  accept: "application/cose; application/cbor";
}

export interface CreateEntryBodyParam {
  /**
   * CoseSign1 signature envelope
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface CreateEntryHeaderParam {
  headers: RawHttpHeadersInput & CreateEntryHeaders;
}

export interface CreateEntryMediaTypesParam {
  /** The MIME content type a Cose body is application/cose, containing a CoseSign1 signature, see IETF SCITT draft */
  contentType: "application/cose";
}

export type CreateEntryParameters = CreateEntryHeaderParam &
  CreateEntryMediaTypesParam &
  CreateEntryBodyParam &
  RequestParameters;

export interface GetOperationHeaders {
  /** Accept header */
  accept: "application/cbor";
}

export interface GetOperationHeaderParam {
  headers: RawHttpHeadersInput & GetOperationHeaders;
}

export type GetOperationParameters = GetOperationHeaderParam & RequestParameters;

export interface GetEntryHeaders {
  /** Accept header */
  accept: "application/cose";
}

export interface GetEntryHeaderParam {
  headers: RawHttpHeadersInput & GetEntryHeaders;
}

export type GetEntryParameters = GetEntryHeaderParam & RequestParameters;

export interface GetEntryStatementHeaders {
  /** Accept header */
  accept: "application/cose";
}

export interface GetEntryStatementHeaderParam {
  headers: RawHttpHeadersInput & GetEntryStatementHeaders;
}

export type GetEntryStatementParameters = GetEntryStatementHeaderParam & RequestParameters;
