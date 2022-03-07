// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { testGroup, testSchema, testSchemaObject } from "./dummies";
import { AvroEncoder } from "../../src/schemaRegistryAvroEncoder";
import { AvroEncoderOptions } from "../../src/models";
import { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./mockedRegistryClient";

export interface CreateTestEncoderOptions<T> {
  encoderOptions?: AvroEncoderOptions<T>;
  registry?: SchemaRegistry;
}

export async function createTestEncoder<T>(
  options: CreateTestEncoderOptions<T> = {}
): Promise<AvroEncoder<T>> {
  const {
    encoderOptions = { autoRegisterSchemas: true, groupName: testGroup },
    registry = createTestRegistry(),
  } = options;
  if (!encoderOptions.autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new AvroEncoder(registry, encoderOptions);
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
