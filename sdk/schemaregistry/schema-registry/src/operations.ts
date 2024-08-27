// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isUnexpected } from "./isUnexpected";
import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
} from "./models";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "./conversions";
import { SchemaRegistryClient } from "./clientDefinitions";
import { createRestError } from "@azure-rest/core-client";

export async function registerSchema(
  context: SchemaRegistryClient,
  schema: SchemaDescription,
  options: RegisterSchemaOptions = {},
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
    .put({
      contentType: buildContentType(format),
      body: prepareSchemaContent(schemaContent),
      ...options,
    });
  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  return convertSchemaIdResponse(response, format);
}

export function prepareSchemaContent(schemaContent: string): Uint8Array {
  return new TextEncoder().encode(schemaContent);
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
      contentType: buildContentType(format),
      body: schemaContent,
      ...options,
    });
  if (isUnexpected(response)) {
    throw createRestError(response);
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
    throw createRestError(response);
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
    throw createRestError(response);
  }

  return convertSchemaResponse(response);
}
