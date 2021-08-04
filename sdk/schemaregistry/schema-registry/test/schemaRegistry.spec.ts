// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient, testEnv } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure/test-utils-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";

import { SchemaRegistryClient, SchemaDescription, SchemaId } from "../src/index";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

const options: OperationOptions = {
  onResponse: (rawResponse: FullOperationResponse) => {
    assert.equal(rawResponse.status, 200);
  }
};

const schema: SchemaDescription = {
  name: "azsdk_js_test",
  group: testEnv.SCHEMA_REGISTRY_GROUP,
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

function assertIsNotNullUndefinedOrEmpty(x: SchemaId | string | null | undefined): asserts x {
  assert.isTrue(x !== undefined, "should not be undefined");
  assert.isNotNull(x);
  assert.isNotEmpty(x);
}

function assertIsValidSchemaId(
  schemaId: SchemaId | undefined,
  expectedSerializationType = "avro"
): asserts schemaId {
  assertIsNotNullUndefinedOrEmpty(schemaId);
  assertIsNotNullUndefinedOrEmpty(schemaId.id);
  assertIsNotNullUndefinedOrEmpty(schemaId.location);
  assertIsNotNullUndefinedOrEmpty(schemaId.locationById);
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
    await assert.isRejected(client.registerSchema({ ...schema, group: null! }), /null/);
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
    await assert.isRejected(client.getSchemaId({ ...schema, name: null! }), /null/);
    await assert.isRejected(client.getSchemaId({ ...schema, group: null! }), /null/);
    await assert.isRejected(client.getSchemaId({ ...schema, content: null! }), /null/);
    await assert.isRejected(client.getSchemaId({ ...schema, serializationType: null! }), /null/);
    await assert.isRejected(
      client.getSchemaId({ ...schema, serializationType: "not-valid" }),
      /not-valid/
    );
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    assert.isUndefined(await client.getSchemaId({ ...schema, name: "never-registered" }));
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaId(schema, options);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same content.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchemaById(null!), /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    assert.isUndefined(await client.getSchemaById("ffffffffffffffffffffffffffffffff"));
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaById(registered.id, options);
    assertIsValidSchemaId(found);
    assert.equal(found.content, schema.content);
  });
});
