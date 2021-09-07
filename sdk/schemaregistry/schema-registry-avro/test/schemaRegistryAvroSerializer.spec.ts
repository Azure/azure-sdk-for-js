// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaRegistryAvroSerializer } from "../src";
import { assert, use as chaiUse } from "chai";
import * as avro from "avsc/";
import chaiPromises from "chai-as-promised";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry,
  SchemaRegistryClient
} from "@azure/schema-registry";

import * as dotenv from "dotenv";
dotenv.config();

chaiUse(chaiPromises);

const testSchemaObject: avro.schema.RecordType = {
  type: "record",
  name: "AvroUser",
  namespace: "com.azure.schemaregistry.samples",
  fields: [
    {
      name: "name",
      type: "string"
    },
    {
      name: "favoriteNumber",
      type: "int"
    }
  ]
};

const testGroup = "azsdk_js_test_group";

const testSchemaIds = [
  "{773E17BE-793E-40B0-98F1-0A6EA3C11895}",
  "{DC7EF290-CDB1-4245-8EE8-3DD52965866E}"
].map((x) => x.replace(/[{\-}]/g, ""));

const testSchema = JSON.stringify(testSchemaObject);
const testValue = { name: "Nick", favoriteNumber: 42 };
const testAvroType = avro.Type.forSchema(testSchemaObject, { omitRecordMethods: true });

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
    const buffer = await serializer.serialize(testValue, testSchema);
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

async function createTestSerializer(
  autoRegisterSchemas = true,
  registry = createTestRegistry()
): Promise<SchemaRegistryAvroSerializer> {
  if (!autoRegisterSchemas) {
    await registerTestSchema(registry);
  }
  return new SchemaRegistryAvroSerializer(registry, testGroup, { autoRegisterSchemas });
}

async function registerTestSchema(registry: SchemaRegistry): Promise<string> {
  const schema = await registry.registerSchema({
    name: `${testSchemaObject.namespace}.${testSchemaObject.name}`,
    groupName: testGroup,
    content: testSchema,
    serializationType: "avro"
  });
  return schema.id;
}

function createTestRegistry(neverLive = false): SchemaRegistry {
  if (!neverLive && isLiveMode()) {
    // NOTE: These tests don't record, they use a mocked schema registry
    // implemented below, but if we're running live, then use the real
    // service for end-to-end integration testing.
    return new SchemaRegistryClient(
      env.SCHEMA_REGISTRY_ENDPOINT,
      new ClientSecretCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, env.AZURE_CLIENT_SECRET)
    );
  }
  const mapById = new Map<string, Schema>();
  const mapByContent = new Map<string, Schema>();
  let idCounter = 0;

  return { registerSchema, getSchemaProperties, getSchema };

  async function registerSchema(
    schema: SchemaDescription,
    _options?: RegisterSchemaOptions
  ): Promise<SchemaProperties> {
    let result = mapByContent.get(schema.content);
    if (!result) {
      result = {
        id: newId(),
        content: schema.content,
        version: 1,
        serializationType: schema.serializationType
      };
      mapByContent.set(result.content, result);
      mapById.set(result.id, result);
    }
    return result;

    function newId(): string {
      if (idCounter === testSchemaIds.length) {
        throw new Error("Out of IDs. Generate more GUIDs and paste them above.");
      }
      const id = testSchemaIds[idCounter];
      idCounter++;
      return id;
    }
  }

  async function getSchemaProperties(
    schema: SchemaDescription,
    _options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties | undefined> {
    return mapByContent.get(schema.content);
  }

  async function getSchema(id: string, _options?: GetSchemaOptions): Promise<Schema | undefined> {
    return mapById.get(id);
  }
}
