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
    let result = mapByContent.get(schema.definition);
    if (!result) {
      result = {
        definition: schema.definition,
        properties: {
          id: newId(),
          format: schema.format
        }
      };
      mapByContent.set(result.definition, result);
      mapById.set(result.properties.id, result);
    }
    return result!.properties;

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
  ): Promise<SchemaProperties> {
    const storedSchema = mapByContent.get(schema.definition);
    if (!storedSchema) {
      throw new Error(`Schema not found: ${JSON.stringify(schema)}`);
    }
    return storedSchema.properties;
  }

  async function getSchema(id: string, _options?: GetSchemaOptions): Promise<Schema> {
    const storedSchema = mapById.get(id);
    if (!storedSchema) {
      throw new Error(`Schema not found: ${JSON.stringify(id)}`);
    }
    return storedSchema;
  }
}
