// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { testGroup, testSchema, testSchemaObject } from "./dummies";
import { AvroSerializer } from "../../src/avroSerializer";
import { AvroSerializerOptions } from "../../src/models";
import { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./mockedRegistryClient";

export interface CreateTestSerializerOptions<T> {
  serializerOptions?: AvroSerializerOptions<T>;
  registry?: SchemaRegistry;
}

export async function createTestSerializer<T>(
  options: CreateTestSerializerOptions<T> = {}
): Promise<AvroSerializer<T>> {
  const {
    serializerOptions = { autoRegisterSchemas: true, groupName: testGroup },
    registry = createTestRegistry(),
  } = options;
  if (!serializerOptions.autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new AvroSerializer(registry, serializerOptions);
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
