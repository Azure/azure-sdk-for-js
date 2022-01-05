// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
import { testAvroType, testGroup, testSchema, testSchemaIds, testValue } from "./utils/dummies";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestEncoder, registerTestSchema } from "./utils/mockedEncoder";

chaiUse(chaiPromises);

describe("SchemaRegistryAvroEncoder", function () {
  it("rejects invalid format", async () => {
    const encoder = await createTestEncoder();
    await assert.isRejected(
      encoder.decodeMessageData({
        data: Buffer.alloc(1),
        contentType: "application/json+1234",
      }),
      /application\/json.*avro\/binary/
    );
  });

  it("rejects schema with no name", async () => {
    const encoder = await createTestEncoder();
    const schema = JSON.stringify({ type: "record", fields: [] });
    await assert.isRejected(encoder.encodeMessageData({}, schema), /name/);
  });

  it("rejects a schema with different format", async () => {
    const registry = createTestRegistry(true); // true means never live, we can't register non-avro schema in live service
    const encoder = await createTestEncoder(false, registry);
    const schema = await registry.registerSchema({
      name: "_",
      definition: "_",
      format: "NotAvro",
      groupName: testGroup,
    });

    await assert.isRejected(
      encoder.decodeMessageData({
        data: Buffer.alloc(1),
        contentType: `avro/binary+${schema.id}`,
      }),
      new RegExp(`${schema.id}.*NotAvro.*avro`)
    );
  });

  it("rejects encoding when schema is not found", async () => {
    const encoder = await createTestEncoder(false);
    const schema = JSON.stringify({
      type: "record",
      name: "NeverRegistered",
      namespace: "my.example",
      fields: [{ name: "count", type: "int" }],
    });
    await assert.isRejected(encoder.encodeMessageData({ count: 42 }, schema), /not found/);
  });

  it("rejects decoding when schema is not found", async () => {
    const encoder = await createTestEncoder(false);
    const payload = testAvroType.toBuffer(testValue);
    await assert.isRejected(
      encoder.decodeMessageData({
        data: payload,
        contentType: `avro/binary+${testSchemaIds[1]}`,
      }),
      /not found/
    );
  });

  it("encodes to the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const encoder = await createTestEncoder(false, registry);
    const message = await encoder.encodeMessageData(testValue, testSchema);
    assert.isUndefined((message.data as Buffer).readBigInt64BE);
    const buffer = Buffer.from(message.data);
    assert.strictEqual(`avro/binary+${schemaId}`, message.contentType);
    assert.deepStrictEqual(testAvroType.fromBuffer(buffer), testValue);
  });

  it("decodes from the expected format", async () => {
    const registry = createTestRegistry();
    const schemaId = await registerTestSchema(registry);
    const encoder = await createTestEncoder(false, registry);
    const payload = testAvroType.toBuffer(testValue);
    assert.deepStrictEqual(
      await encoder.decodeMessageData({
        data: payload,
        contentType: `avro/binary+${schemaId}`,
      }),
      testValue
    );
  });

  it("encodes and decodes in round trip", async () => {
    let encoder = await createTestEncoder();
    let message = await encoder.encodeMessageData(testValue, testSchema);
    assert.deepStrictEqual(await encoder.decodeMessageData(message), testValue);

    // again for cache hit coverage on encodeMessageData
    message = await encoder.encodeMessageData(testValue, testSchema);
    assert.deepStrictEqual(await encoder.decodeMessageData(message), testValue);

    // throw away encoder for cache miss coverage on decodeMessageData
    encoder = await createTestEncoder(false);
    assert.deepStrictEqual(await encoder.decodeMessageData(message), testValue);

    // throw away encoder again and cover getSchemaProperties instead of registerSchema
    encoder = await createTestEncoder(false);
    assert.deepStrictEqual(await encoder.encodeMessageData(testValue, testSchema), message);
  });

  it("works with trivial example in README", async () => {
    const encoder = await createTestEncoder();

    // Example Avro schema
    const schema = JSON.stringify({
      type: "record",
      name: "Rating",
      namespace: "my.example",
      fields: [{ name: "score", type: "int" }],
    });

    // Example value that matches the Avro schema above
    const value = { score: 42 };

    // encode value to a message
    const message = await encoder.encodeMessageData(value, schema);

    // Decode message to value
    const decodedValue = await encoder.decodeMessageData(message);

    assert.deepStrictEqual(decodedValue, value);
  });
});
