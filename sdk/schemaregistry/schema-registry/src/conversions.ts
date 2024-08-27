// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetSchemaById200Response,
  GetSchemaByVersion200Response,
  GetSchemaPropertiesByContent204Response,
  RegisterSchema204Response,
} from "./responses";
import { SchemaProperties, Schema, SchemaContentTypeValues } from "./models";

const textPlain = "text/plain";
const charsetutf8 = "charset=utf-8";
const customContentType = `${textPlain}; ${charsetutf8}`;
const customFormat = "Custom";

/**
 * Union of generated client's response that return schema ID
 */
type GeneratedSchemaIdResponse =
  | RegisterSchema204Response
  | GetSchemaPropertiesByContent204Response
  | GetSchemaByVersion200Response;

/**
 * Union of generated client's responses that return schema definition.
 */
type GeneratedSchemaResponse = GetSchemaById200Response | GetSchemaByVersion200Response;

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export async function convertSchemaIdResponse(
  response: GeneratedSchemaIdResponse,
  schemaFormat: string,
): Promise<SchemaProperties> {
  return {
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    id: response.headers["schema-id"]!,
    format: schemaFormat,
    groupName: response.headers["schema-group-name"]!,
    name: response.headers["schema-name"]!,
    version: Number(response.headers["schema-version"]!),
  };
}

/**
 * @internal
 * @param format - schema format
 * @returns corresponding content-type value
 */
export function buildContentType(format: string): SchemaContentTypeValues {
  return format.toLowerCase() === customFormat.toLowerCase()
    ? customContentType
    : (`application/json; serialization=${format}` as any);
}

export async function convertSchemaResponse(response: GeneratedSchemaResponse): Promise<Schema> {
  return {
    definition: typeof response.body === "string" ? response.body : JSON.stringify(response.body),
    properties: {
      id: response.headers["schema-id"]!,
      format: mapContentTypeToFormat(response.headers["content-type"]!),
      groupName: response.headers["schema-group-name"]!,
      name: response.headers["schema-name"]!,
      version: Number(response.headers["schema-version"]!),
    },
  };
}

function mapContentTypeToFormat(contentType: string): string {
  if (contentType.match(new RegExp(`${textPlain};\\s?${charsetutf8}`))) return customFormat;
  const parts = /.*serialization=(.*)$/.exec(contentType);
  const schemaFormat = parts?.[1];
  if (schemaFormat) {
    return schemaFormat;
  } else {
    return contentType;
  }
}
