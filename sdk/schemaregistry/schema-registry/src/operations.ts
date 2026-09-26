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
import type { OperationRequestOptions, RequestParameters } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

function toRequestParameters(options: GetSchemaOptions = {}): RequestParameters {
  const requestOptions: OperationRequestOptions & NonNullable<GetSchemaOptions["requestOptions"]> =
    options.requestOptions ?? {};
  const headers = createHttpHeaders(requestOptions.customHeaders);
  for (const [name, value] of Object.entries(requestOptions.headers ?? {})) {
    headers.set(name, String(value));
  }
  return operationOptionsToRequestParameters({
    ...options,
    requestOptions: { ...requestOptions, headers: headers.toJSON() },
  });
}

export async function registerSchema(
  context: SchemaRegistryClient,
  schema: SchemaDescription,
  options: RegisterSchemaOptions = {},
): Promise<SchemaProperties> {
  const { groupName, name: schemaName, definition: schemaContent, format } = schema;
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}", groupName, schemaName)
    .put({
      ...toRequestParameters(options),
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
  const response = await context
    .path("/$schemaGroups/{groupName}/schemas/{schemaName}:get-id", groupName, schemaName)
    .post({
      ...toRequestParameters(options),
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
    .get(toRequestParameters(options));

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
    .get(toRequestParameters(options));

  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  return convertSchemaResponse(response);
}
