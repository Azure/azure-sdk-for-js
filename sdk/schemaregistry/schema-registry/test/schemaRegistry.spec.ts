// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient, testEnv } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";

import { SchemaRegistryClient, SchemaDescription, SchemaProperties } from "../src/index";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

const options: OperationOptions = {
  onResponse: (rawResponse: FullOperationResponse) => {
    assert.equal(rawResponse.status, 200);
  }
};

const schema: SchemaDescription = {
  name: "azsdk_js_test",
  groupName: testEnv.SCHEMA_REGISTRY_GROUP,
  serializationType: "avro",
  content: JSON.stringify({
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
  assertIsNotNullUndefinedOrEmpty(schemaId.serializationType);
  assert.isNotNull(schemaId.version);
  assert.equal(schemaId.serializationType.toLowerCase(), expectedSerializationType.toLowerCase());
}

describe("SchemaRegistryClient", function() {
  let recorder: Recorder;
  let client: SchemaRegistryClient;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sets endpoint in constructor", () => {
    const endpoint = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    const customClient = new SchemaRegistryClient(endpoint, credential);
    assert.equal(customClient.endpoint, endpoint);
  });

  it("rejects schema registration with invalid args", async () => {
    await assert.isRejected(client.registerSchema({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, content: null! }), /null/);
    await assert.isRejected(client.registerSchema({ ...schema, serializationType: null! }), /null/);
    await assert.isRejected(
      client.registerSchema({ ...schema, serializationType: "not-valid" }),
      /not-valid/
    );
  });

  it("registers schema", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await assert.isRejected(client.getSchemaProperties({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, groupName: null! }), /null/);
    await assert.isRejected(client.getSchemaProperties({ ...schema, content: null! }), /null/);
    await assert.isRejected(
      client.getSchemaProperties({ ...schema, serializationType: null! }),
      /null/
    );
    await assert.isRejected(
      client.getSchemaProperties({ ...schema, serializationType: "not-valid" }),
      /not-valid/
    );
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    assert.isRejected(client.getSchemaProperties({ ...schema, name: "never-registered" }));
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaProperties(schema, options);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same content.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchema(null!), /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    assert.isRejected(client.getSchema("ffffffffffffffffffffffffffffffff"));
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchema(registered.id, options);
    assertIsValidSchemaId(found);
    assert.equal(found.content, schema.content);
  });

  it("schema with whitespace", async () => {
    const schema2: SchemaDescription = {
      name: "azsdk_js_test2",
      groupName: testEnv.SCHEMA_REGISTRY_GROUP,
      serializationType: "avro",
      content:
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n"
    };
    // content that is going to the service has whitespaces
    const registered = await client.registerSchema(schema2, options);
    assertIsValidSchemaId(registered);

    const foundSchema = await client.getSchema(registered.id);
    assertIsValidSchemaId(foundSchema);
    // the schema comes from the service normalized
    assert.equal(foundSchema.content, schema2.content.replace(/\s/g, ""));

    const foundId = await client.getSchemaProperties({
      // content that comes from the service does not have whitespaces
      content: foundSchema.content,
      groupName: schema2.groupName,
      name: schema2.name,
      serializationType: foundSchema.serializationType
    });
    assertIsValidSchemaId(foundId);
  });
});
