// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
import { testAvroType, testGroup, testSchema, testSchemaIds, testValue } from "./utils/dummies";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer, registerTestSchema } from "./utils/mockedSerializer";

chaiUse(chaiPromises);

describe("SchemaRegistryAvroSerializer", function() {
  it("rejects buffers that are too small", async () => {
    const serializer = await createTestSerializer();
    await assert.isRejected(serializer.deserialize(Buffer.alloc(3)), /small/);
  });

  it("rejects invalid format", async () => {
    const serializer = await createTestSerializer();
    const buffer = Buffer.alloc(42);
    buffer.writeUInt32BE(0x1234, 0);
    await assert.isRejected(serializer.deserialize(buffer), /format.*0x1234/);
  });

  it("rejects schema with no name", async () => {
    const serializer = await createTestSerializer();
    const schema = JSON.stringify({ type: "record", fields: [] });
    await assert.isRejected(serializer.serialize({}, schema), /name/);
  });

  it("rejects a schema with different serialization type", async () => {
    const registry = createTestRegistry(true); // true means never live, we can't register non-avro schema in live service
    const serializer = await createTestSerializer(false, registry);
    const schema = await registry.registerSchema({
      name: "_",
      content: "_",
      serializationType: "NotAvro",
      groupName: testGroup
    });

    const buffer = Buffer.alloc(36);
    buffer.write(schema.id, 4, 32, "utf-8");
    await assert.isRejected(
      serializer.deserialize(buffer),
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
    await assert.isRejected(serializer.serialize({ count: 42 }, schema), /not found/);
  });

  it("rejects deserialization when schema is not found", async () => {
    const serializer = await createTestSerializer(false);
    const payload = testAvroType.toBuffer(testValue);
    const buffer = Buffer.alloc(36 + payload.length);
    buffer.write(testSchemaIds[1], 4, 32, "utf-8");
    payload.copy(buffer, 36);
    await assert.isRejected(serializer.deserialize(buffer), /not found/);
  });

  it("serializes to the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer(false, registry);
    const arr = await serializer.serialize(testValue, testSchema);
    assert.isUndefined((arr as Buffer).readBigInt64BE);
    const buffer = Buffer.from(arr);
    assert.strictEqual(0x0, buffer.readUInt32BE(0));
    assert.strictEqual(schemaId, buffer.toString("utf-8", 4, 36));
    const payload = buffer.slice(36);
    assert.deepStrictEqual(testAvroType.fromBuffer(payload), testValue);
  });

  it("deserializes from the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer(false, registry);
    const payload = testAvroType.toBuffer(testValue);
    const buffer = Buffer.alloc(36 + payload.length);

    buffer.write(schemaId, 4, 32, "utf-8");
    payload.copy(buffer, 36);
    assert.deepStrictEqual(await serializer.deserialize(buffer), testValue);
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer();
    let buffer = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(buffer), testValue);

    // again for cache hit coverage on serialize
    buffer = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(buffer), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer(false);
    assert.deepStrictEqual(await serializer.deserialize(buffer), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer(false);
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), buffer);
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
    const buffer = await serializer.serialize(value, schema);

    // Deserialize buffer to value
    const deserializedValue = await serializer.deserialize(buffer);

    assert.deepStrictEqual(deserializedValue, value);
  });
});
