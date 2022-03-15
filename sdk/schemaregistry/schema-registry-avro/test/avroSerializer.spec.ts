// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateTestSerializerOptions,
  createTestSerializer,
  registerTestSchema,
} from "./utils/mockedSerializer";
import { assert, use as chaiUse } from "chai";
import { testAvroType, testGroup, testSchema, testSchemaIds, testValue } from "./utils/dummies";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";

chaiUse(chaiPromises);

const noAutoRegisterOptions: CreateTestSerializerOptions<any> = {
  serializerOptions: { autoRegisterSchemas: false, groupName: testGroup },
};

describe("AvroSerializer", function () {
  it("rejects invalid format", async () => {
    const serializer = await createTestSerializer();
    await assert.isRejected(
      serializer.deserialize({
        body: Buffer.alloc(1),
        contentType: "application/json+1234",
      }),
      /application\/json.*avro\/binary/
    );
  });

  it("rejects schema with no name", async () => {
    const serializer = await createTestSerializer();
    const schema = JSON.stringify({ type: "record", fields: [] });
    await assert.isRejected(serializer.serialize({}, schema), /name/);
  });

  it("rejects a schema with different format", async () => {
    const registry = createTestRegistry(true); // true means never live, we can't register non-avro schema in live service
    const serializer = await createTestSerializer({
      ...noAutoRegisterOptions,
      registry,
    });
    const schema = await registry.registerSchema({
      name: "_",
      definition: "_",
      format: "NotAvro",
      groupName: testGroup,
    });

    await assert.isRejected(
      serializer.deserialize({
        body: Buffer.alloc(1),
        contentType: `avro/binary+${schema.id}`,
      }),
      new RegExp(`${schema.id}.*NotAvro.*avro`)
    );
  });

  it("rejects serializing when schema is not found", async () => {
    const serializer = await createTestSerializer(noAutoRegisterOptions);
    const schema = JSON.stringify({
      type: "record",
      name: "NeverRegistered",
      namespace: "my.example",
      fields: [{ name: "count", type: "int" }],
    });
    await assert.isRejected(serializer.serialize({ count: 42 }, schema), /not found/);
  });

  it("rejects deserializing when schema is not found", async () => {
    const serializer = await createTestSerializer(noAutoRegisterOptions);
    const payload = testAvroType.toBuffer(testValue);
    await assert.isRejected(
      serializer.deserialize({
        body: payload,
        contentType: `avro/binary+${testSchemaIds[1]}`,
      }),
      /does not exist/
    );
  });

  it("serializes to the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer({ ...noAutoRegisterOptions, registry });
    const message = await serializer.serialize(testValue, testSchema);
    assert.isUndefined((message.body as Buffer).readBigInt64BE);
    const buffer = Buffer.from(message.body);
    assert.strictEqual(`avro/binary+${schemaId}`, message.contentType);
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
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer({ ...noAutoRegisterOptions, registry });
    const payload = testAvroType.toBuffer(testValue);
    assert.deepStrictEqual(
      await serializer.deserialize({
        body: payload,
        contentType: `avro/binary+${schemaId}`,
      }),
      testValue
    );
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer();
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
    const serializer = await createTestSerializer();

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
    const serializer = await createTestSerializer();
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

  it("fails to deserialize from an incompatible reader schema", async () => {
    const serializer = await createTestSerializer();
    const message = await serializer.serialize(testValue, testSchema);
    assert.isRejected(
      serializer.deserialize(message, {
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
            },
          ],
        }),
      }),
      /no matching field for default-less com.azure.schemaregistry.samples.AvroUser.age/
    );
  });

  it("deserializes from the old format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer({ ...noAutoRegisterOptions, registry });
    const payload = testAvroType.toBuffer(testValue);
    const buffer = Buffer.alloc(36 + payload.length);

    buffer.write(schemaId, 4, 32, "utf-8");
    payload.copy(buffer, 36);
    assert.deepStrictEqual(
      await serializer.deserialize({
        body: buffer,
        contentType: "avro/binary+000",
      }),
      testValue
    );
  });

  it("cache size growth is bounded", async () => {
    function makeRndStr(length: number): string {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }

    const registry = createTestRegistry();
    const serializer = await createTestSerializer({ registry });
    /**
     * The standard tier resource supports registering up to 25 schemas per a schema group.
     */
    const maxSchemaCount = 25;
    const maxCacheEntriesCount = Math.floor(maxSchemaCount / 2 - 1);
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
