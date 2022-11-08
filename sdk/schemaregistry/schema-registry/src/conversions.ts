// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Schema, SchemaProperties } from "./models";

import {
  SchemaGetByIdResponse,
  SchemaQueryIdByContentResponse as SchemaQueryIdByDefinitionResponse,
  SchemaRegisterResponse,
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
      format: mapContentTypeToFormat(response.contentType!),
      groupName: response.schemaGroupName!,
      name: response.schemaName!,
      version: response.schemaVersion!,
    },
  };
}

const customContentType = "text/plain; charset=utf-8";
const customFormat = "Custom";

/**
 * @internal
 * @param format - schema format
 * @returns corresponding content-type value
 */
export function buildContentType(format: string): string {
  const lowercaseFormat = format.toLowerCase();
  return lowercaseFormat === customFormat.toLowerCase()
    ? customContentType
    : `application/json; serialization=${lowercaseFormat}`;
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
      format: schemaFormat,
      groupName: response.schemaGroupName!,
      name: response.schemaName!,
      version: response.schemaVersion!,
    };
  };
}

function mapContentTypeToFormat(contentType: string): string {
  if (contentType === customContentType) return customFormat;
  const parts = /.*serialization=(.*)$/.exec(contentType);
  const schemaFormat = parts?.[1];
  if (schemaFormat) {
    return schemaFormat;
  } else {
    throw new Error(`Unrecognized response's content-type: ${contentType}`);
  }
}
