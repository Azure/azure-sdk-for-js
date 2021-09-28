// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaRegistry } from "@azure/schema-registry";
import { SchemaRegistryAvroSerializer } from "../../../src";
import { testGroup, testSchema, testSchemaObject } from "./dummies";
import { createTestRegistry } from "./mockedRegistryClient";

export async function createTestSerializer(
  autoRegisterSchemas = true,
  registry = createTestRegistry()
): Promise<SchemaRegistryAvroSerializer> {
  if (!autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new SchemaRegistryAvroSerializer(registry, testGroup, { autoRegisterSchemas });
}

export async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: `${testSchemaObject.namespace}.${testSchemaObject.name}`,
    groupName: testGroup,
    schemaDefinition: testSchema,
    format: "avro"
  });
  return schema.id;
}
