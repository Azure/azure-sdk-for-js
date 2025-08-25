// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AvroSerializerOptions } from "@azure/schema-registry-avro";
import { AvroSerializer } from "@azure/schema-registry-avro";
import { testGroup, testSchemaName, testSchema } from "./dummies.js";
import type { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./mockedRegistryClient.js";
import type { Recorder } from "@azure-tools/test-recorder";

export interface CreateTestSerializerOptions<T> {
  serializerOptions?: AvroSerializerOptions<T>;
  registry?: SchemaRegistry;
  recorder?: Recorder;
}

export async function createTestSerializer<T>(
  options: CreateTestSerializerOptions<T> = {},
): Promise<AvroSerializer<T>> {
  const {
    serializerOptions = { autoRegisterSchemas: true, groupName: testGroup },
    registry = createTestRegistry({ recorder: options.recorder }),
  } = options;
  if (!serializerOptions.autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new AvroSerializer(registry as any, serializerOptions);
}

export async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: testSchemaName,
    groupName: testGroup,
    definition: testSchema,
    format: "avro",
  });
  return schema.id;
}
