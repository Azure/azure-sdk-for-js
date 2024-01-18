import { StreamableMethod } from "@azure-rest/core-client";
import { Schema, SchemaProperties } from "../../models/models";
import {
  GetSchemaById200Response,
  GetSchemaByVersion200Response,
  GetSchemaIdByContent204Response,
  RegisterSchema204Response,
} from "../../responses";
import { getSchemaDefinition } from "./getSchemaDefinition";

/**
 * Union of generated client's response that return schema ID
 */
type GeneratedSchemaIdResponse =
  | StreamableMethod<RegisterSchema204Response>
  | StreamableMethod<GetSchemaIdByContent204Response>
  | StreamableMethod<GetSchemaByVersion200Response>;
/**
 * Union of generated client's responses that return schema definition.
 */
type GeneratedSchemaResponse =
  | StreamableMethod<GetSchemaById200Response>
  | StreamableMethod<GetSchemaByVersion200Response>;

/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export async function convertSchemaIdResponse(
  response: GeneratedSchemaIdResponse,
  schemaFormat: string,
): Promise<SchemaProperties> {
  const headers = (await response).headers;
  return {
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    id: headers["schema-id"]!,
    format: schemaFormat,
    groupName: headers["schema-group-name"]!,
    name: headers["schema-name"]!,
    version: Number(headers["schema-version"]!),
  };
}

/**
 * @internal
 * @param format - schema format
 * @returns corresponding content-type value
 */
export function buildContentType(format: string): string {
  return format.toLowerCase() === customFormat.toLowerCase()
    ? customContentType
    : `application/json; serialization=${format}`;
}

export async function convertSchemaResponse(response: GeneratedSchemaResponse): Promise<Schema> {
  const schemaDefinition = await getSchemaDefinition(response);
  const headers = (await response).headers;
  return {
    definition: schemaDefinition,
    properties: {
      id: headers["schema-id"]!,
      format: mapContentTypeToFormat(headers["content-type"]!),
      groupName: headers["schema-group-name"]!,
      name: headers["schema-name"]!,
      version: Number(headers["schema-version"]!),
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
    throw new Error(`Unrecognized response's content-type: ${contentType}`);
  }
}

const textPlain = "text/plain";
const charsetutf8 = "charset=utf-8";
const customContentType = `${textPlain}; ${charsetutf8}`;
const customFormat = "Custom";
