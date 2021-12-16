// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
import { testAvroType, testGroup, testSchema, testSchemaIds, testValue } from "./utils/dummies";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer, registerTestSchema } from "./utils/mockedSerializer";

chaiUse(chaiPromises);

describe("SchemaRegistryAvroSerializer", function() {
  it("rejects invalid format", async () => {
    const serializer = await createTestSerializer();
    await assert.isRejected(
      serializer.decodeMessageData({
        data: Buffer.alloc(1),
        contentType: "application/json+1234"
      }),
      /application\/json.*avro\/binary/
    );
  });

  it("rejects schema with no name", async () => {
    const serializer = await createTestSerializer();
    const schema = JSON.stringify({ type: "record", fields: [] });
    await assert.isRejected(serializer.encodeMessageData({}, schema), /name/);
  });

  it("rejects a schema with different format", async () => {
    const registry = createTestRegistry(true); // true means never live, we can't register non-avro schema in live service
    const serializer = await createTestSerializer(false, registry);
    const schema = await registry.registerSchema({
      name: "_",
      definition: "_",
      format: "NotAvro",
      groupName: testGroup
    });

    await assert.isRejected(
      serializer.decodeMessageData({
        data: Buffer.alloc(1),
        contentType: `avro/binary+${schema.id}`
      }),
      new RegExp(`${schema.id}.*NotAvro.*avro`)
    );
  });

  it("rejects serialization when schema is not found", async () => {
    const serializer = await createTestSerializer(false);
    const schema = JSON.stringify({
      type: "record",
      name: "NeverRegistered",
      namespace: "my.example",
      fields: [{ name: "count", type: "int" }]
    });
    await assert.isRejected(serializer.encodeMessageData({ count: 42 }, schema), /not found/);
  });

  it("rejects deserialization when schema is not found", async () => {
    const serializer = await createTestSerializer(false);
    const payload = testAvroType.toBuffer(testValue);
    await assert.isRejected(
      serializer.decodeMessageData({
        data: payload,
        contentType: `avro/binary+${testSchemaIds[1]}`
      }),
      /not found/
    );
  });

  it("serializes to the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer(false, registry);
    const message = await serializer.encodeMessageData(testValue, testSchema);
    assert.isUndefined((message.data as Buffer).readBigInt64BE);
    const buffer = Buffer.from(message.data);
    assert.strictEqual(`avro/binary+${schemaId}`, message.contentType);
    assert.deepStrictEqual(testAvroType.fromBuffer(buffer), testValue);
  });

  it("deserializes from the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer(false, registry);
    const payload = testAvroType.toBuffer(testValue);
    assert.deepStrictEqual(
      await serializer.decodeMessageData({
        data: payload,
        contentType: `avro/binary+${schemaId}`
      }),
      testValue
    );
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer();
    let message = await serializer.encodeMessageData(testValue, testSchema);
    assert.deepStrictEqual(await serializer.decodeMessageData(message), testValue);

    // again for cache hit coverage on serialize
    message = await serializer.encodeMessageData(testValue, testSchema);
    assert.deepStrictEqual(await serializer.decodeMessageData(message), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer(false);
    assert.deepStrictEqual(await serializer.decodeMessageData(message), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer(false);
    assert.deepStrictEqual(await serializer.encodeMessageData(testValue, testSchema), message);
  });

  it("works with trivial example in README", async () => {
    const serializer = await createTestSerializer();

    // Example Avro schema
    const schema = JSON.stringify({
      type: "record",
      name: "Rating",
      namespace: "my.example",
      fields: [{ name: "score", type: "int" }]
    });

    // Example value that matches the Avro schema above
    const value = { score: 42 };

    // Serialize value to buffer
    const message = await serializer.encodeMessageData(value, schema);

    // Deserialize buffer to value
    const deserializedValue = await serializer.decodeMessageData(message);

    assert.deepStrictEqual(deserializedValue, value);
  });
});
