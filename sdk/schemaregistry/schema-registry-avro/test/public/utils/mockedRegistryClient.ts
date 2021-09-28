// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry,
  SchemaRegistryClient
} from "@azure/schema-registry";
import { ClientSecretCredential } from "@azure/identity";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { testSchemaIds } from "./dummies";

export function createTestRegistry(neverLive = false): SchemaRegistry {
  if (!neverLive && isLiveMode()) {
    // NOTE: These tests don't record, they use a mocked schema registry
    // implemented below, but if we're running live, then use the real
    // service for end-to-end integration testing.
    return new SchemaRegistryClient(
      env.SCHEMA_REGISTRY_ENDPOINT,
      new ClientSecretCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, env.AZURE_CLIENT_SECRET)
    );
  }
  const mapById = new Map<string, Schema>();
  const mapByContent = new Map<string, Schema>();
  let idCounter = 0;

  return { registerSchema, getSchemaProperties, getSchema };

  async function registerSchema(
    schema: SchemaDescription,
    _options?: RegisterSchemaOptions
  ): Promise<SchemaProperties> {
    let result = mapByContent.get(schema.schemaDefinition);
    if (!result) {
      result = {
        id: newId(),
        schemaDefinition: schema.schemaDefinition,
        version: 1,
        format: schema.format
      };
      mapByContent.set(result.schemaDefinition, result);
      mapById.set(result.id, result);
    }
    return result;

    function newId(): string {
      if (idCounter === testSchemaIds.length) {
        throw new Error("Out of IDs. Generate more GUIDs and paste them above.");
      }
      const id = testSchemaIds[idCounter];
      idCounter++;
      return id;
    }
  }

  async function getSchemaProperties(
    schema: SchemaDescription,
    _options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties | undefined> {
    return mapByContent.get(schema.schemaDefinition);
  }

  async function getSchema(id: string, _options?: GetSchemaOptions): Promise<Schema | undefined> {
    return mapById.get(id);
  }
}
