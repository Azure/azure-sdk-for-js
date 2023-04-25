// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateTestSerializerOptions,
  createTestSerializer,
  registerTestSchema,
} from "./utils/mockedSerializer";
import { assert, use as chaiUse } from "chai";
import { testAvroType, testGroup, testSchema, testValue } from "./utils/dummies";
import { Context } from "mocha";
import { MessageContent } from "../../src/";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { v4 as uuid } from "uuid";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { SchemaRegistry } from "@azure/schema-registry";

chaiUse(chaiPromises);

describe("AvroSerializer", async function () {
  let noAutoRegisterOptions: CreateTestSerializerOptions<any>;
  let recorder: Recorder;
  let registry: SchemaRegistry;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    registry = createTestRegistry({ recorder });
    noAutoRegisterOptions = {
      serializerOptions: { autoRegisterSchemas: false, groupName: testGroup },
      recorder,
    };
  });

  it("serializes to the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const { contentType, data } = await serializer.serialize(testValue, testSchema);
    assert.isUndefined((data as Buffer).readBigInt64BE);
    const buffer = Buffer.from(data);
    assert.strictEqual(`avro/binary+${schemaId}`, contentType);
    assert.deepStrictEqual(testAvroType.fromBuffer(buffer), testValue);
    assert.equal(serializer["cacheById"].size, 1);
    assert.equal(
      serializer["cacheById"].peek(schemaId)?.name,
      "com.azure.schemaregistry.samples.AvroUser"
    );
    assert.equal(serializer["cacheBySchemaDefinition"].size, 1);
    assert.equal(serializer["cacheBySchemaDefinition"].peek(testSchema)?.id, schemaId);
  });

  it("deserializes from the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const data = testAvroType.toBuffer(testValue);
    assert.deepStrictEqual(
      await serializer.deserialize({
        data,
        contentType: `avro/binary+${schemaId}`,
      }),
      testValue
    );
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer({ recorder });
    let message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // again for cache hit coverage on serialize
    message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), message);
  });

  it("works with trivial example in README", async () => {
    const serializer = await createTestSerializer({ recorder });

    // Example Avro schema
    const schema = JSON.stringify({
      type: "record",
      name: "Rating",
      namespace: "my.example",
      fields: [{ name: "score", type: "int" }],
    });

    // Example value that matches the Avro schema above
    const value = { score: 42 };

    // serialize value to a message
    const message = await serializer.serialize(value, schema);

    // Deserialize message to value
    const deserializedValue = await serializer.deserialize(message);

    assert.deepStrictEqual(deserializedValue, value);
  });

  it("deserializes from a compatible reader schema", async () => {
    const serializer = await createTestSerializer({ recorder });
    const message = await serializer.serialize(testValue, testSchema);
    const deserializedValue: any = await serializer.deserialize(message, {
      /**
       * This schema is missing the favoriteNumber field that exists in the writer schema
       * and adds an "age" field with a default value.
       */
      schema: JSON.stringify({
        type: "record",
        name: "AvroUser",
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "age",
            type: "int",
            default: 30,
          },
        ],
      }),
    });
    assert.isUndefined(deserializedValue.favoriteNumber);
    assert.equal(deserializedValue.name, testValue.name);
    assert.equal(deserializedValue.age, 30);
  });

  it("ignores the old format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const payload = testAvroType.toBuffer(testValue);
    const data = Buffer.alloc(36 + payload.length);

    data.write(schemaId, 4, 32, "utf-8");
    payload.copy(data, 36);
    await assert.isRejected(
      serializer.deserialize({
        data,
        contentType: `avro/binary+${uuid()}`,
      }),
      /Schema id .* does not exist/
    );
  });

  it("cache size growth is bounded", async function (this: Context) {
    /**
     * This test is very expensive to run in live because it registers too many
     * schemas but the standard-tier resource allows for up to 25 schemas only
     */
    if (isLiveMode()) {
      this.skip();
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
    (serializer["cacheBySchemaDefinition"] as any).max = maxCacheEntriesCount;
    const itersCount = 2 * maxCacheEntriesCount;
    assert.isAtLeast(itersCount, maxCacheEntriesCount + 1);
    let i = 0;
    for (; i < itersCount; ++i) {
      const field1 = makeRndStr(10);
      const field2 = makeRndStr(10);
      const valueToBeSerialized = JSON.parse(`{ "${field1}": "Nick", "${field2}": 42 }`);
      const schemaToSerializeWith = JSON.stringify({
        type: "record",
        name: makeRndStr(8),
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          {
            name: field1,
            type: "string",
          },
          {
            name: field2,
            type: "int",
          },
        ],
      });
      await serializer.serialize(valueToBeSerialized, schemaToSerializeWith);
      if (i < maxCacheEntriesCount) {
        assert.equal(serializer["cacheById"].size, i + 1);
        assert.equal(serializer["cacheBySchemaDefinition"].size, i + 1);
      } else {
        assert.equal(serializer["cacheById"].size, maxCacheEntriesCount);
        assert.equal(serializer["cacheBySchemaDefinition"].size, maxCacheEntriesCount);
      }
    }
  });
});
