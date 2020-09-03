// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaRegistryAvroSerializer } from "../src";
import { assert, use as chaiUse } from "chai";
import * as avro from "avsc/";
import chaiPromises from "chai-as-promised";

import {
  GetSchemaByIdOptions,
  GetSchemaIdOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaId,
  SchemaRegistry
} from "@azure/schema-registry";

chaiUse(chaiPromises);

const testSchemaObject = {
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

const testSchemaIds = [
  "{773E17BE-793E-40B0-98F1-0A6EA3C11895}",
  "{DC7EF290-CDB1-4245-8EE8-3DD52965866E}"
].map((x) => x.replace(/[\{\-\}]/g, ""));

const testSchema = JSON.stringify(testSchemaObject);
const testValue = { name: "Nick", favoriteNumber: 42 };
const testAvroType = avro.Type.forSchema(<any>testSchemaObject);

describe("SchemaRegistryAvroSerializer", function() {
  it("rejects buffers that are too small", async () => {
    await assert.isRejected(createTestSerializer().deserialize(Buffer.alloc(3)), /small/);
  });

  it("rejects invalid format", async () => {
    const buffer = Buffer.alloc(42);
    buffer.writeUInt32BE(0x1234, 0);
    await assert.isRejected(createTestSerializer().deserialize(buffer), /format.*0x1234/);
  });

  it("rejects schema with no name", async () => {
    const schema = JSON.stringify({ type: "record", fields: [] });
    await assert.isRejected(createTestSerializer().serialize({}, schema), /name/);
  });

  it("rejects a schema with different serialization type", async () => {
    const registry = createTestRegistry();
    const serializer = createTestSerializer(false, registry);
    const schema = await registry.registerSchema({
      name: "_",
      content: "_",
      serializationType: "NotAvro",
      group: "TestGroup"
    });

    const buffer = Buffer.alloc(36);
    buffer.write(schema.id, 4, 32, "utf-8");
    await assert.isRejected(
      serializer.deserialize(buffer),
      new RegExp(`${schema.id}.*NotAvro.*avro`)
    );
  });

  it("serializes to the expected format", async () => {
    const buffer = await createTestSerializer().serialize(testValue, testSchema);
    assert.equal(0x0, buffer.readUInt32BE(0));
    assert.equal(testSchemaIds[0], buffer.toString("utf-8", 4, 36));

    const payload = buffer.slice(36);
    assertSameJsonRepresentation(testAvroType.fromBuffer(payload), testValue);
  });

  it("deserializes from the expected format", async () => {
    const serializer = createTestSerializer(false);
    const payload = testAvroType.toBuffer(testValue);
    const buffer = Buffer.alloc(36 + payload.length);

    buffer.write(testSchemaIds[0], 4, 32, "utf-8");
    payload.copy(buffer, 36);
    assertSameJsonRepresentation(await serializer.deserialize(buffer), testValue);
  });

  it("serializes and deserializes in round trip", async () => {
    let serializer = createTestSerializer();
    let buffer = await serializer.serialize(testValue, testSchema);
    assertSameJsonRepresentation(await serializer.deserialize(buffer), testValue);

    // again for cache hit coverage on serialize
    buffer = await serializer.serialize(testValue, testSchema);
    assertSameJsonRepresentation(await serializer.deserialize(buffer), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = createTestSerializer(false);
    assertSameJsonRepresentation(await serializer.deserialize(buffer), testValue);

    // thow away serializer again and cover getSchemaId instead of registerSchema
    serializer = createTestSerializer(false);
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), buffer);
  });

  it("works with trivial example in README", async () => {
    const serializer = createTestSerializer();

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

    assertSameJsonRepresentation(deserializedValue, value);
  });
});

function assertSameJsonRepresentation(actual: any, expected: any) {
  // avsc returns objects with different prototype than our plain object literal
  // so assert.deepEqual fails.
  //
  // REVIEW: Is it a problem that this avsc detail leaks?
  assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected));
}

function createTestSerializer(
  autoRegisterSchemas = true,
  registry = createTestRegistry()
): SchemaRegistryAvroSerializer {
  if (!autoRegisterSchemas) {
    registry.registerSchema({
      name: `${testSchemaObject.namespace}.${testSchemaObject.name}`,
      group: "TestGroup",
      content: testSchema,
      serializationType: "avro"
    });
  }

  return new SchemaRegistryAvroSerializer(registry, "TestGroup", { autoRegisterSchemas });
}

function createTestRegistry(): SchemaRegistry {
  const mapById = new Map<string, Schema>();
  const mapByContent = new Map<string, Schema>();
  let idCounter = 0;

  return { registerSchema, getSchemaId, getSchemaById };

  async function registerSchema(
    schema: SchemaDescription,
    _options?: RegisterSchemaOptions
  ): Promise<SchemaId> {
    let result = mapByContent.get(schema.content);
    if (!result) {
      result = {
        id: newId(),
        content: schema.content,
        version: 1,
        location: "",
        locationById: "",
        serializationType: schema.serializationType
      };
      mapByContent.set(result.content, result);
      mapById.set(result.id, result);
    }
    return result;

    function newId(): string {
      if (idCounter == testSchemaIds.length) {
        throw new Error("Out of IDs. Generate more GUIDs and paste them above.");
      }
      const id = testSchemaIds[idCounter];
      idCounter++;
      return id;
    }
  }

  async function getSchemaId(
    schema: SchemaDescription,
    _options?: GetSchemaIdOptions
  ): Promise<SchemaId> {
    const result = mapByContent.get(schema.content);
    if (!result) {
      throw new Error("No such schema is registered.");
    }
    return result;
  }

  async function getSchemaById(id: string, _options?: GetSchemaByIdOptions): Promise<Schema> {
    const result = mapById.get(id);
    if (!result) {
      throw new Error("No such schema is registered.");
    }
    return result;
  }
}
