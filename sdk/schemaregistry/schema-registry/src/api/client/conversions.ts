import { Schema, SchemaProperties } from "../../models/models";
import {
  GetSchemaById200Response,
  GetSchemaByVersion200Response,
  GetSchemaIdByContent204Response,
  RegisterSchema204Response,
} from "../../responses";

/**
 * Union of generated client's response that return schema ID
 */
type GeneratedSchemaIdResponse =
  | RegisterSchema204Response
  | GetSchemaIdByContent204Response
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
export function convertSchemaIdResponse(
  response: GeneratedSchemaIdResponse,
  schemaFormat: string
): SchemaProperties {
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
export function buildContentType(format: string): string {
  return format.toLowerCase() === customFormat.toLowerCase()
    ? customContentType
    : `application/json; serialization=${format}`;
}

export async function convertSchemaResponse(response: GeneratedSchemaResponse): Promise<Schema> {
  return {
    definition: response.body.toString(),
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
    throw new Error(`Unrecognized response's content-type: ${contentType}`);
  }
}

const textPlain = "text/plain";
const charsetutf8 = "charset=utf-8";
const customContentType = `${textPlain}; ${charsetutf8}`;
const customFormat = "Custom";
