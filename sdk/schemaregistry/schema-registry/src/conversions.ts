// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaResponse, SchemaIdResponse } from "./models";

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
export function convertSchemaResponse(response: GeneratedSchemaResponse): SchemaResponse {
  return {
    ...convertResponse(response),
    content: response.body
  };
}

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export function convertSchemaIdResponse(response: GeneratedSchemaIdResponse): SchemaIdResponse {
  return {
    ...convertResponse(response),
    // `!` here because server is required to return this on success, but that
    // is not modeled by the generated client.
    id: response.id!
  };
}

/**
 * Converts common portion of all generated client responses.
 */
function convertResponse(response: GeneratedResponse): SchemaIdResponse {
  return {
    _response: response._response,
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    location: response.location!,
    locationById: response.xSchemaIdLocation!,
    id: response.xSchemaId!,
    version: response.xSchemaVersion!
  };
}
