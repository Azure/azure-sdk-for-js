// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";

import { SchemaRegistryClient, SchemaDescription, SchemaProperties } from "../../src";

const options = {
  onResponse: (rawResponse: { status: number }) => {
    assert.equal(rawResponse.status, 200);
  }
};

function assertIsNotNullUndefinedOrEmpty(
  x: SchemaProperties | string | null | undefined
): asserts x {
  assert.isTrue(x !== undefined, "should not be undefined");
  assert.isNotNull(x);
  assert.isNotEmpty(x);
}

function assertIsValidSchemaId(
  schemaId: SchemaProperties | undefined,
  expectedSerializationType = "avro"
): asserts schemaId {
  assertIsNotNullUndefinedOrEmpty(schemaId);
  assertIsNotNullUndefinedOrEmpty(schemaId.id);
  assertIsNotNullUndefinedOrEmpty(schemaId.format);
  assert.isNotNull(schemaId.version);
  assert.equal(schemaId.format.toLowerCase(), expectedSerializationType.toLowerCase());
}

describe("SchemaRegistryClient", function() {
  let recorder: Recorder;
  let client: SchemaRegistryClient;
  let schema: SchemaDescription;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
    schema = {
      name: "azsdk_js_test",
      groupName: env.SCHEMA_REGISTRY_GROUP,
      format: "avro",
      schemaDefinition: JSON.stringify({
        type: "record",
        name: "User",
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
      })
    };
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sets fully qualified name space in constructor", () => {
    const fullyQualifiedNamespace = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    const customClient = new SchemaRegistryClient(fullyQualifiedNamespace, credential);
    assert.equal(customClient.fullyQualifiedNamespace, fullyQualifiedNamespace);
  });

  it("rejects schema registration with invalid args", async () => {
    await assert.isRejected(client.registerSchema({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, schemaDefinition: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, format: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, format: "not-valid" }), /not-valid/);
  });

  it("registers schema", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await assert.isRejected(client.getSchemaProperties({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(
      client.getSchemaProperties({ ...schema, schemaDefinition: null! }),
      /null/
    );
    await assert.isRejected(client.getSchemaProperties({ ...schema, format: null! }), /null/);
    await assert.isRejected(
      client.getSchemaProperties({ ...schema, format: "not-valid" }),
      /not-valid/
    );
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    assert.isUndefined(await client.getSchemaProperties({ ...schema, name: "never-registered" }));
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaProperties(schema, options);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same definition.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchema(null!), /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    assert.isUndefined(await client.getSchema("ffffffffffffffffffffffffffffffff"));
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchema(registered.id, options);
    assertIsValidSchemaId(found);
    assert.equal(found.schemaDefinition, schema.schemaDefinition);
  });

  it("schema with whitespace", async () => {
    const schema2: SchemaDescription = {
      name: "azsdk_js_test2",
      groupName: env.SCHEMA_REGISTRY_GROUP,
      format: "avro",
      schemaDefinition:
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n"
    };
    // definition that is going to the service has whitespaces
    const registered = await client.registerSchema(schema2, options);
    assertIsValidSchemaId(registered);

    const foundSchema = await client.getSchema(registered.id);
    assertIsValidSchemaId(foundSchema);
    // the schema comes from the service normalized
    assert.equal(foundSchema.schemaDefinition, schema2.schemaDefinition.replace(/\s/g, ""));

    const foundId = await client.getSchemaProperties({
      // definition that comes from the service does not have whitespaces
      schemaDefinition: foundSchema.schemaDefinition,
      groupName: schema2.groupName,
      name: schema2.name,
      format: foundSchema.format
    });
    assertIsValidSchemaId(foundId);
  });
});
