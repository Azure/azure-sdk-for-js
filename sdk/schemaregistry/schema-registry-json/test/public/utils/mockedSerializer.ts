// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JsonSchemaSerializerOptions } from "../../../src";
import { JsonSchemaSerializer } from "../../../src";
import { testGroup, testSchema, testSchemaObject } from "./dummies";
import type { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./mockedRegistryClient";
import type { Recorder } from "@azure-tools/test-recorder";

export interface CreateTestSerializerOptions<T> {
  serializerOptions?: JsonSchemaSerializerOptions<T>;
  registry?: SchemaRegistry;
  recorder?: Recorder;
}

export async function createTestSerializer<T>(
  options: CreateTestSerializerOptions<T> = {},
): Promise<JsonSchemaSerializer<T>> {
  const {
    serializerOptions = { groupName: testGroup },
    registry = createTestRegistry({ recorder: options.recorder }),
  } = options;
  return new JsonSchemaSerializer(registry as any, serializerOptions);
}

export async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: `${testSchemaObject.$id}`,
    groupName: testGroup,
    definition: testSchema,
    format: "json",
  });
  return schema.id;
}
