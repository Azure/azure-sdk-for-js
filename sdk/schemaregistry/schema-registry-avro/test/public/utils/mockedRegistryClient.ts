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
  SchemaRegistryClient,
} from "@azure/schema-registry";
import { createTestCredential } from "@azure-tools/test-credential";
import { testSchemaIds } from "./dummies";
import { v4 as uuid } from "uuid";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";

type UpdatedSchemaDescription = Required<Omit<SchemaDescription, "version">>;

function getEnvVar(name: string): string {
  const value = env[name];
  if (!value) {
    throw new Error(`${name} is undefined!`);
  }
  return value;
}

function createLiveTestRegistry(settings: {
  registerSchemaOptions?: RegisterSchemaOptions;
  getSchemaPropertiesOptions?: GetSchemaPropertiesOptions;
  getSchemaOptions?: GetSchemaOptions;
  recorder?: Recorder;
}): SchemaRegistry {
  const { getSchemaOptions, getSchemaPropertiesOptions, registerSchemaOptions, recorder } =
    settings;
  // NOTE: These tests don't record, they use a mocked schema registry
  // implemented below, but if we're running live, then use the real
  // service for end-to-end integration testing.
  const client = new SchemaRegistryClient(
    getEnvVar("SCHEMAREGISTRY_AVRO_FULLY_QUALIFIED_NAMESPACE"),
    createTestCredential(),
    recorder?.configureClientOptions({})
  );
  return {
    getSchema: (id: string) => client.getSchema(id, getSchemaOptions),
    getSchemaProperties: (schema: SchemaDescription) =>
      client.getSchemaProperties(schema, getSchemaPropertiesOptions),
    registerSchema: (schema: SchemaDescription) =>
      client.registerSchema(schema, registerSchemaOptions),
  };
}

function createMockedTestRegistry(): SchemaRegistry {
  const mapById = new Map<string, Schema>();
  const mapByContent = new Map<string, Schema>();
  let idCounter = 0;

  return { registerSchema, getSchemaProperties, getSchema };

  async function registerSchema(
    schema: UpdatedSchemaDescription,
    _options?: RegisterSchemaOptions
  ): Promise<SchemaProperties> {
    let result = mapByContent.get(schema.definition);
    if (!result) {
      const format = schema.format.toLowerCase();
      if (format !== "avro") {
        throw new Error(`Invalid schema type for PUT request. '${format}' is not supported`);
      }
      result = {
        definition: schema.definition,
        properties: {
          id: newId(),
          format: schema.format,
          groupName: schema.groupName,
          name: schema.name,
        } as any,
      };
      mapByContent.set(result.definition, result);
      mapById.set(result.properties.id, result);
    }
    return result.properties;

    function newId(): string {
      if (idCounter >= testSchemaIds.length) {
        return uuid();
      }
      const id = testSchemaIds[idCounter];
      idCounter++;
      return id;
    }
  }

  async function getSchemaProperties(
    schema: UpdatedSchemaDescription,
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
      throw new Error(`Schema id ${id} does not exist`);
    }
    return storedSchema;
  }
}

export function createTestRegistry(
  settings: {
    neverLive?: boolean;
    registerSchemaOptions?: RegisterSchemaOptions;
    getSchemaPropertiesOptions?: GetSchemaPropertiesOptions;
    getSchemaOptions?: GetSchemaOptions;
    recorder?: Recorder;
  } = {}
): SchemaRegistry {
  const {
    neverLive = false,
    getSchemaOptions,
    getSchemaPropertiesOptions,
    registerSchemaOptions,
    recorder,
  } = settings;
  return !neverLive && isLiveMode()
    ? createLiveTestRegistry({
        getSchemaOptions,
        getSchemaPropertiesOptions,
        registerSchemaOptions,
        recorder,
      })
    : createMockedTestRegistry();
}
