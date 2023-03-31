// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonSerializer, JsonSerializerOptions } from "../../../src";
import { testGroup, testSchema, testSchemaObject } from "./dummies";
import { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./mockedRegistryClient";
import { Recorder } from "@azure-tools/test-recorder";

export interface CreateTestSerializerOptions<T> {
  serializerOptions?: JsonSerializerOptions<T>;
  registry?: SchemaRegistry;
  recorder?: Recorder;
}

export async function createTestSerializer<T>(
  options: CreateTestSerializerOptions<T> = {}
): Promise<JsonSerializer<T>> {
  const {
    serializerOptions = { autoRegisterSchemas: true, groupName: testGroup },
    registry = createTestRegistry({ recorder: options.recorder }),
  } = options;
  if (!serializerOptions.autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new JsonSerializer(registry as any, serializerOptions);
}

export async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: `${testSchemaObject.namespace}.${testSchemaObject.name}`,
    groupName: testGroup,
    definition: testSchema,
    format: "json",
  });
  return schema.id;
}
