// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CreateTestSerializerOptions } from "./utils/mockedSerializer.js";
import { createTestSerializer, registerTestSchema } from "./utils/mockedSerializer.js";
import { createContentType, encoder, testGroup, testSchema, testValue } from "./utils/dummies.js";
import type { MessageContent } from "@azure/schema-registry-json";
import { createTestRegistry } from "./utils/mockedRegistryClient.js";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import type { SchemaRegistry } from "@azure/schema-registry";
import { describe, it, assert, beforeEach } from "vitest";

describe("JsonSchemaSerializer", async () => {
  let serializerOptions: CreateTestSerializerOptions<any>;
  let recorder: Recorder;
  let registry: SchemaRegistry;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    registry = createTestRegistry({ recorder });
    serializerOptions = {
      serializerOptions: { groupName: testGroup },
      recorder,
    };
  });

  it("serializes to the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...serializerOptions,
      registry,
    });
    const { contentType, data } = await serializer.serialize(testValue, testSchema);
    assert.strictEqual(createContentType(schemaId), contentType);
    assert.deepStrictEqual(data, encoder.encode(JSON.stringify(testValue)));
  });

  it("deserializes from the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...serializerOptions,
      registry,
    });
    const data = encoder.encode(JSON.stringify(testValue));
    assert.deepStrictEqual(
      await serializer.deserialize({
        data,
        contentType: createContentType(schemaId),
      }),
      testValue,
    );
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer({ registry, recorder });
    await registerTestSchema(registry);
    let message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);
    // again for cache hit coverage on serialize
    message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer({ registry });
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer({ registry });
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), message);
  });

  it("works with trivial example in README", async () => {
    const serializer = await createTestSerializer({ registry, recorder });

    // Example Json schema
    const schema = JSON.stringify({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "person",
      title: "Student",
      description: "A student in the class",
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the student",
        },
      },
      required: ["name"],
    });

    await registry.registerSchema({
      name: "person",
      definition: schema,
      format: "json",
      groupName: testGroup,
    });

    // Example value that matches the Json schema above
    const value = { name: "Bob" };

    // serialize value to a message
    const message = await serializer.serialize(value, schema);

    // Deserialize message to value
    const deserializedValue = await serializer.deserialize(message);

    assert.deepStrictEqual(deserializedValue, value);
  });

  /** TODO: unskip when we can access internal cache */
  it.skip("cache size growth is bounded", async (ctx) => {
    /**
     * This test is very expensive to run in live because it registers too many
     * schemas but the standard-tier resource allows for up to 25 schemas only
     */
    if (isLiveMode()) {
      ctx.skip();
    }
    function makeRndStr(length: number): string {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }

    const serializer = await createTestSerializer({ registry, recorder });
    /**
     * The standard tier resource supports registering up to 25 schemas per a schema group.
     */
    const maxSchemaCount = 25;
    const maxCacheEntriesCount = Math.floor(maxSchemaCount / 2);
    (serializer["cacheById"] as any).max = maxCacheEntriesCount;
    (serializer["cacheIdByDefinition"] as any).max = maxCacheEntriesCount;
    const itersCount = 2 * maxCacheEntriesCount;
    assert.isAtLeast(itersCount, maxCacheEntriesCount + 1);
    let i = 0;
    for (; i < itersCount; ++i) {
      const field1 = makeRndStr(10);
      const field2 = makeRndStr(10);
      const valueToBeSerialized = JSON.parse(`{ "${field1}": "Nick", "${field2}": 42 }`);
      const schemaToSerializeWith = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "student",
        title: "Student",
        description: "A student in the class",
        type: "object",
        properties: {
          [field1]: {
            type: "string",
            description: "The name of the student",
          },
          [field2]: {
            type: "integer",
            description: "The favorite number of the student",
          },
        },
      });
      await registry.registerSchema({
        name: "test",
        definition: schemaToSerializeWith,
        format: "json",
        groupName: testGroup,
      });
      await serializer.serialize(valueToBeSerialized, schemaToSerializeWith);
      if (i < maxCacheEntriesCount) {
        assert.equal(serializer["cacheById"].size, i + 1);
        assert.equal(serializer["cacheIdByDefinition"].size, i + 1);
      } else {
        assert.equal(serializer["cacheById"].size, maxCacheEntriesCount);
        assert.equal(serializer["cacheIdByDefinition"].size, maxCacheEntriesCount);
      }
    }
  });
});
