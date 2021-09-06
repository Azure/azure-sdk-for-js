// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry
} from "@azure/schema-registry";
import { testSchemaIds } from "./dummies";

export function createTestRegistry(): SchemaRegistry {
  const mapById = new Map<string, Schema>();
  const mapByContent = new Map<string, Schema>();
  let idCounter = 0;

  return { registerSchema, getSchemaProperties, getSchema };

  async function registerSchema(
    schema: SchemaDescription,
    _options?: RegisterSchemaOptions
  ): Promise<SchemaProperties> {
    let result = mapByContent.get(schema.content);
    if (!result) {
      result = {
        id: newId(),
        content: schema.content,
        version: 1,
        serializationType: schema.serializationType
      };
      mapByContent.set(result.content, result);
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
    return mapByContent.get(schema.content);
  }

  async function getSchema(id: string, _options?: GetSchemaOptions): Promise<Schema | undefined> {
    return mapById.get(id);
  }
}
