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
  return {
    id: response.schemaId!,
    version: response.schemaVersion!,
    format: mapContentTypeToFormat(response.contentType!),
    schemaDefinition: rawResponse.bodyAsText!
  };
}

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export function convertSchemaIdResponse(
  schemaFormat: string
): (response: GeneratedSchemaIdResponse) => SchemaProperties {
  return (response: GeneratedSchemaIdResponse): SchemaProperties => {
    return {
      // `!`s here because server is required to return these on success, but that
      // is not modeled by the generated client.
      id: response.schemaId!,
      version: response.schemaVersion!,
      format: schemaFormat
    };
  };
}

function mapContentTypeToFormat(contentType: string): string {
  switch (contentType.toLocaleLowerCase().replace(/\s/g, "")) {
    case "application/json;serialization=avro": {
      return "Avro";
    }
    default:
      throw new Error(`Unrecognized content-type in the response: ${contentType}`);
  }
}

/**
 *
 * @param format the schema format
 * @param thunks a dictionary of schema formats and what to do next for each one
 * @returns the computed result of the corresponding thunk
 * 
 * @internal
 */
export function dispatchOnFormat<T>(format: string, thunks: { avro: () => T }): T {
  switch (format.toLocaleLowerCase()) {
    case "avro": {
      return thunks.avro();
    }
    default:
      throw new Error(`Unrecognized schema format: ${format}`);
  }
}
