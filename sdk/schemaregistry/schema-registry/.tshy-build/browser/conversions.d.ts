import type { GetSchemaById200Response, GetSchemaByVersion200Response, GetSchemaPropertiesByContent204Response, RegisterSchema204Response } from "./responses.js";
import type { SchemaProperties, Schema, SchemaContentTypeValues } from "./models.js";
/**
 * Union of generated client's response that return schema ID
 */
type GeneratedSchemaIdResponse = RegisterSchema204Response | GetSchemaPropertiesByContent204Response | GetSchemaByVersion200Response;
/**
 * Union of generated client's responses that return schema definition.
 */
type GeneratedSchemaResponse = GetSchemaById200Response | GetSchemaByVersion200Response;
/**
 * Converts generated client's response to SchemaIdentityResponse.
 *
 * @internal
 */
export declare function convertSchemaIdResponse(response: GeneratedSchemaIdResponse, schemaFormat: string): Promise<SchemaProperties>;
/**
 * @internal
 * @param format - schema format
 * @returns corresponding content-type value
 */
export declare function buildContentType(format: string): SchemaContentTypeValues;
export declare function convertSchemaResponse(response: GeneratedSchemaResponse): Promise<Schema>;
export {};
//# sourceMappingURL=conversions.d.ts.map