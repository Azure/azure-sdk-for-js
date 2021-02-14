// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaId, Schema } from "./models";

import {
  SchemaGetByIdResponse,
  SchemaRegisterResponse,
  SchemaQueryIdByContentResponse
} from "./generated/models";

/**
 * Union of generated client's responses that return schema content.
 */
type GeneratedSchemaResponse = SchemaGetByIdResponse;

/**
 * Union of generated client's responses that return schema ID.
 */
type GeneratedSchemaIdResponse = SchemaRegisterResponse | SchemaQueryIdByContentResponse;

/**
 * Union of all generated client's responses.
 */
type GeneratedResponse = GeneratedSchemaResponse | GeneratedSchemaIdResponse;

/**
 * Converts generated client's reponse to IdentifiedSchemaResponse.
 *
 * @internal
 */
export function convertSchemaResponse(response: GeneratedSchemaResponse): Schema {
  // https://github.com/Azure/azure-sdk-for-js/issues/11649
  // Although response.body is typed as string, it is a parsed JSON object,
  // so we use _response.bodyAsText instead as a workaround.
  return convertResponse(response, { content: response._response.bodyAsText });
}

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export function convertSchemaIdResponse(response: GeneratedSchemaIdResponse): SchemaId {
  // `!` here because server is required to return this on success, but that
  // is not modeled by the generated client.
  return convertResponse(response, { id: response.id! });
}

function convertResponse<T>(response: GeneratedResponse, additionalProperties: T): SchemaId & T {
  const converted = {
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    location: response.location!,
    locationById: response.schemaIdLocation!,
    id: response.schemaId!,
    version: response.schemaVersion!,
    serializationType: response.serializationType!,
    ...additionalProperties
  };

  Object.defineProperty(converted, "_response", { value: response._response, enumerable: false });
  return converted;
}
