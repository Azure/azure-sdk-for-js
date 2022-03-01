// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { testGroup, testSchema, testSchemaObject } from "./dummies";
import { SchemaRegistry } from "@azure/schema-registry";
import { AvroEncoder } from "../../src/schemaRegistryAvroEncoder";
import { createTestRegistry } from "./mockedRegistryClient";

export async function createTestEncoder(
  autoRegisterSchemas = true,
  registry = createTestRegistry()
): Promise<AvroEncoder> {
  if (!autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new AvroEncoder(registry, { autoRegisterSchemas, groupName: testGroup });
}

export async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: `${testSchemaObject.namespace}.${testSchemaObject.name}`,
    groupName: testGroup,
    definition: testSchema,
    format: "avro",
  });
  return schema.id;
}
