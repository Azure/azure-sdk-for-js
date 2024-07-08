// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { SchemaContentTypeValues } from "./models.js";

export type ListSchemaGroupsParameters = RequestParameters;
export type ListSchemaVersionsParameters = RequestParameters;
export type GetSchemaByIdParameters = RequestParameters;
export type GetSchemaByVersionParameters = RequestParameters;

export interface GetSchemaPropertiesByContentBodyParam {
  /** String representation (UTF-8) of the schema. */
  body: string;
}

export interface GetSchemaPropertiesByContentMediaTypesParam {
  /** The content type for given schema. */
  contentType: SchemaContentTypeValues;
}

export type GetSchemaPropertiesByContentParameters =
  GetSchemaPropertiesByContentMediaTypesParam &
    GetSchemaPropertiesByContentBodyParam &
    RequestParameters;

export interface RegisterSchemaBodyParam {
  /** String representation (UTF-8) of the schema. */
  body: string;
}

export interface RegisterSchemaMediaTypesParam {
  /** The content type for given schema. */
  contentType: SchemaContentTypeValues;
}

export type RegisterSchemaParameters = RegisterSchemaMediaTypesParam &
  RegisterSchemaBodyParam &
  RequestParameters;
