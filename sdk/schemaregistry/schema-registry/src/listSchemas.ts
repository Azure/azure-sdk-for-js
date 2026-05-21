// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isUnexpected } from "./isUnexpected.js";
import type {
  GetAllSchemasOptions,
  ListSchemasOptions,
  SchemaSummary,
} from "./models.js";
import { SchemaSortOrder } from "./models.js";
import type { SchemaRegistryClient } from "./clientDefinitions.js";
import { createRestError } from "@azure-rest/core-client";
import ms from "ms";

/**
 * Default timeout for individual list-schemas page requests.
 */
const DEFAULT_LIST_TIMEOUT_MS = ms("30s");

/**
 * Lists all schemas registered under the given group.
 *
 * @param context - The underlying REST client context.
 * @param schemaGroup - The schema group to enumerate.
 * @param options - Optional listing parameters.
 * @returns An array of schema summaries.
 */
export async function listSchemas(
  context: SchemaRegistryClient,
  groupName: string,
  options: ListSchemasOptions = {},
): Promise<SchemaSummary[]> {
  const sortOrder = options.sortOrder ?? SchemaSortOrder.Ascending;
  const requestOptions = {
    queryParameters: {
      "api-version": "2023-07-01",
      sort: sortOrder,
      maxPageSize: options.maxPageSize ?? 50,
    },
    requestOptions: {
      timeout: DEFAULT_LIST_TIMEOUT_MS,
      allowInsecureConnection: true,
    },
  };

  const response = await context
    .path("/$schemaGroups/{groupName}/schemas", groupName)
    .get(requestOptions);

  if (isUnexpected(response as any)) {
    throw createRestError(response as any);
  }

  return parseSchemaListResponse(response);
}

/**
 * Returns every schema visible to the caller, across all groups.
 *
 * @param context - The underlying REST client context.
 * @param options - Optional filtering parameters.
 * @returns A flat array of every visible schema summary.
 */
export async function getAllSchemas(
  context: SchemaRegistryClient,
  options: GetAllSchemasOptions = {},
): Promise<SchemaSummary[]> {
  const groups = await listGroups(context);
  const results: SchemaSummary[] = [];
  for (const group of groups) {
    const schemas = await listSchemas(context, group);
    for (const schema of schemas) {
      if (!options.nameFilter || schema.name.includes(options.nameFilter)) {
        results.push(schema);
      }
    }
  }
  return await postProcessAllSchemas(results);
}

async function listGroups(context: SchemaRegistryClient): Promise<string[]> {
  const response = await context.path("/$schemaGroups" as any).get();
  if (isUnexpected(response as any)) {
    throw createRestError(response as any);
  }
  const body = (response as any).body ?? {};
  return body.value?.map((g: { name: string }) => g.name) ?? [];
}

async function postProcessAllSchemas(schemas: SchemaSummary[]): Promise<SchemaSummary[]> {
  return schemas.sort((a, b) => a.name.localeCompare(b.name));
}

function parseSchemaListResponse(response: unknown): SchemaSummary[] {
  const body = (response as { body?: { value?: any[] } }).body ?? {};
  return (body.value ?? []).map((entry) => ({
    name: entry.name,
    groupName: entry.groupName,
    latestVersion: entry.latestVersion ?? 1,
    format: entry.format ?? "Avro",
  }));
}
