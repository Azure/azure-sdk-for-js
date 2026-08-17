// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isUnexpected } from "./isUnexpected.js";
import type {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
} from "./models.js";
import { buildContentType, convertSchemaIdResponse, convertSchemaResponse } from "./conversions.js";
import type { SchemaRegistryClient } from "./clientDefinitions.js";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export async function registerSchema(
  context: SchemaRegistryClient,
  schema: SchemaDescription,
  options: RegisterSchemaOptions = {},
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const requestParameters = operationOptionsToRequestParameters(options);
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
    .put({
      ...requestParameters,
      contentType: buildContentType(format),
      body: prepareSchemaContent(schemaContent),
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
  const requestParameters = operationOptionsToRequestParameters(options);
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}:get-id", groupName, schemaName)
    .post({
      ...requestParameters,
      contentType: buildContentType(format),
      body: schemaContent,
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
  const response = await context
    .path("/$schemaGroups/$schemas/{id}", schemaId)
    .get(operationOptionsToRequestParameters(options ?? {}));

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
    .get(operationOptionsToRequestParameters(options ?? {}));

  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  return convertSchemaResponse(response);
}
