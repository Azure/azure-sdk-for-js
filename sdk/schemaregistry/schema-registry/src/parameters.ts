// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { SchemaContentTypeValues } from "./models";

export type ListSchemaGroupsParameters = RequestParameters;
export type ListSchemaVersionsParameters = RequestParameters;
export type GetSchemaByIdParameters = RequestParameters;
export type GetSchemaByVersionParameters = RequestParameters;

export interface GetSchemaPropertiesByContentBodyParam {
  /**
   * String representation (UTF-8) of the schema.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface GetSchemaPropertiesByContentMediaTypesParam {
  /** The content type for given schema. */
  contentType: SchemaContentTypeValues;
}

export type GetSchemaPropertiesByContentParameters = GetSchemaPropertiesByContentMediaTypesParam &
  GetSchemaPropertiesByContentBodyParam &
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
  contentType: SchemaContentTypeValues;
}

export type RegisterSchemaParameters = RegisterSchemaMediaTypesParam &
  RegisterSchemaBodyParam &
  RequestParameters;
