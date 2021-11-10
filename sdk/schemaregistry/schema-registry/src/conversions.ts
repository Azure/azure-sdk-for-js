// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaProperties, Schema } from "./models";

import {
  SchemaGetByIdResponse,
  SchemaRegisterResponse,
  SchemaQueryIdByContentResponse as SchemaQueryIdByDefinitionResponse
} from "./generated/models";
import { getSchemaDefinition } from "./getSchemaDefinition";

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
export async function convertSchemaResponse(response: GeneratedSchemaResponse): Promise<Schema> {
  const schemaDefinition = await getSchemaDefinition(response);
  return {
    definition: schemaDefinition,
    properties: {
      id: response.schemaId!,
      format: mapContentTypeToFormat(response.contentType!)
    }
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
      format: schemaFormat
    };
  };
}

function mapContentTypeToFormat(contentType: string): string {
  const parts = /.*serialization=(.*)$/.exec(contentType);
  const schemaFormat = parts?.[1];
  if (schemaFormat) {
    return schemaFormat;
  } else {
    throw new Error(`Unrecognized response's content-type: ${contentType}`);
  }
}

/**
 *
 * @param format - the schema format
 * @param thunks - a dictionary of schema formats and what to do next for each one
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
