// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaProperties, Schema } from "./models";

import {
  SchemaGetByIdResponse,
  SchemaRegisterResponse,
  SchemaQueryIdByContentResponse as SchemaQueryIdByDefinitionResponse
} from "./generated/models";
import { FullOperationResponse } from "@azure/core-client";

/**
 * Union of generated client's responses that return schema definition.
 */
type GeneratedSchemaResponse = SchemaGetByIdResponse;

/**
 * Union of generated client's responses that return schema ID.
 */
type GeneratedSchemaIdResponse = SchemaRegisterResponse | SchemaQueryIdByDefinitionResponse;

/**
 * Union of all generated client's responses.
 */
type GeneratedResponse = GeneratedSchemaResponse | GeneratedSchemaIdResponse;

/**
 * Converts generated client's response to IdentifiedSchemaResponse.
 *
 * @internal
 */
export function convertSchemaResponse(
  response: GeneratedSchemaResponse,
  rawResponse: FullOperationResponse
): Schema {
  // https://github.com/Azure/azure-sdk-for-js/issues/11649
  // Although response.body is typed as string, it is a parsed JSON object,
  // so we use _response.bodyAsText instead as a workaround.
  return convertResponse(response, { definition: rawResponse.bodyAsText! });
}

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export function convertSchemaIdResponse(response: GeneratedSchemaIdResponse): SchemaProperties {
  // `!` here because server is required to return this on success, but that
  // is not modeled by the generated client.
  return convertResponse(response, { id: response.id! });
}

function convertResponse<T>(
  response: GeneratedResponse,
  additionalProperties: T
): SchemaProperties & T {
  return {
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    id: response.schemaId!,
    version: response.schemaVersion!,
    format: response.serializationType!,
    ...additionalProperties
  };
}
