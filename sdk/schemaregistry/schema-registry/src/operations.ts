// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { isUnexpected } from "./generated/isUnexpected";
import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
} from "./models";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "./conversions";
import { SchemaRegistryClient } from "./generated/clientDefinitions";

export async function registerSchema(
  context: SchemaRegistryClient,
  schema: SchemaDescription,
  options: RegisterSchemaOptions = {},
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
    .put({
      contentType: buildContentType(format) as any,
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
  context: SchemaRegistryClient,
  schema: SchemaDescription,
  options: GetSchemaPropertiesOptions = {},
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}:get-id", groupName, schemaName)
    .post({
      contentType: buildContentType(format) as any,
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
  context: SchemaRegistryClient,
  schemaId: string,
  options?: GetSchemaOptions,
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
  context: SchemaRegistryClient,
  groupName: string,
  name: string,
  version: number,
  options?: GetSchemaOptions,
): Promise<Schema> {
  const response = await context
    .path(
      "/$schemaGroups/{groupName}/schemas/{schemaName}/versions/{schemaVersion}",
      groupName,
      name,
      version,
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
