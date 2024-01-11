// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { SchemaContentTypeValuesOutput } from "./responses";

export type ListSchemaGroupsParameters = RequestParameters;
export type GetSchemaByIdParameters = RequestParameters;
export type ListSchemaVersionsParameters = RequestParameters;
export type GetSchemaByVersionParameters = RequestParameters;

export interface GetSchemaIdByContentBodyParam {
  /**
   * String representation (UTF-8) of the registered schema.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface GetSchemaIdByContentMediaTypesParam {
  /** The content type for given schema. */
  contentType: SchemaContentTypeValuesOutput;
}

export type GetSchemaIdByContentParameters = GetSchemaIdByContentMediaTypesParam &
  GetSchemaIdByContentBodyParam &
  RequestParameters;

export interface RegisterSchemaBodyParam {
  /**
   * String representation (UTF-8) of the schema.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface RegisterSchemaMediaTypesParam {
  /** The content type for given schema. */
  contentType: SchemaContentTypeValuesOutput;
}

export type RegisterSchemaParameters = RegisterSchemaMediaTypesParam &
  RegisterSchemaBodyParam &
  RequestParameters;
