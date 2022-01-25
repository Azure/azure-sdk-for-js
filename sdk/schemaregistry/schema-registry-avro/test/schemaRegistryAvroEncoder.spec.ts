// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { createTestEncoder, registerTestSchema } from "./utils/mockedEncoder";
import { testAvroType, testGroup, testSchema, testSchemaIds, testValue } from "./utils/dummies";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";

chaiUse(chaiPromises);

describe("SchemaRegistryAvroEncoder", function () {
  it("rejects invalid format", async () => {
    const encoder = await createTestEncoder();
    await assert.isRejected(
      encoder.decodeMessageData({
        body: Buffer.alloc(1),
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
        body: Buffer.alloc(1),
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
        body: payload,
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
    assert.isUndefined((message.body as Buffer).readBigInt64BE);
    const buffer = Buffer.from(message.body);
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
        body: payload,
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

  it("decodes from a compatible reader schema", async () => {
    const encoder = await createTestEncoder();
    const message = await encoder.encodeMessageData(testValue, testSchema);
    const decodedValue: any = await encoder.decodeMessageData(message, {
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
    assert.isUndefined(decodedValue.favoriteNumber);
    assert.equal(decodedValue.name, testValue.name);
    assert.equal(decodedValue.age, 30);
  });

  it("fails to decode from an incompatible reader schema", async () => {
    const encoder = await createTestEncoder();
    const message = await encoder.encodeMessageData(testValue, testSchema);
    assert.isRejected(
      encoder.decodeMessageData(message, {
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
});
