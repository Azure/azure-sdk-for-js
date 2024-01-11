import { Client } from "@azure-rest/core-client";
import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
} from "../../models/models";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "./conversions";
import { isUnexpected } from "../../isUnexpected";
import { RestError } from "@azure/core-rest-pipeline";

export async function registerSchema(
  context: Client,
  schema: SchemaDescription,
  options: RegisterSchemaOptions = {}
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{name}", groupName, schemaName)
    .put({
      contentType: buildContentType(format),
      body: schemaContent,
      ...options,
    });

  if (isUnexpected(response)) {
    throw new RestError(response.body.error.message, {
      code: response.body.error.code,
      statusCode: Number(response.status),
    });
  }

  return convertSchemaIdResponse(response, format);
}

export async function getSchemaProperties(
  context: Client,
  schema: SchemaDescription,
  options: GetSchemaPropertiesOptions = {}
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{name}:get-id", groupName, schemaName)
    .post({
      contentType: buildContentType(format),
      body: schemaContent,
      ...options,
    });

  if (isUnexpected(response)) {
    throw new RestError(response.body.error.message, {
      code: response.body.error.code,
      statusCode: Number(response.status),
    });
  }

  return convertSchemaIdResponse(response, format);
}

export async function getSchemaById(
  context: Client,
  schemaId: string,
  options?: GetSchemaOptions
): Promise<Schema> {
  const response = await context.path("/$schemaGroups/$schemas/{id}", schemaId).get({ ...options });

  if (isUnexpected(response)) {
    throw new RestError(response.body.error.message, {
      code: response.body.error.code,
      statusCode: Number(response.status),
    });
  }

  return convertSchemaResponse(response);
}

export async function getSchemaByVersion(
  context: Client,
  groupName: string,
  name: string,
  version: number,
  options?: GetSchemaOptions
): Promise<Schema> {
  const response = await context
    .path(
      "/$schemaGroups/{groupName}/schemas/{name}/versions/{schemaVersion}",
      groupName,
      name,
      version
    )
    .get({ ...options });
  if (isUnexpected(response)) {
    throw new RestError(response.body.error.message, {
      code: response.body.error.code,
      statusCode: Number(response.status),
    });
  }

  return convertSchemaResponse(response);
}
