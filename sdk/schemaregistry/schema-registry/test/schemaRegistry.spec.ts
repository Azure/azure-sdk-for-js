// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient } from "./utils/recordedClient";
import { Recorder } from "@azure/test-utils-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
import { LIB_INFO } from "../src/constants";
import { ClientSecretCredential } from "@azure/identity";

import {
  SchemaRegistryClient,
  SchemaDescription,
  SchemaId,
  SchemaRegistryClientOptions
} from "../src/index";

chaiUse(chaiPromises);

const schema: SchemaDescription = {
  name: "azsdk_js_test_000022",
  group: "azsdk_js_test_group",
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

function assertIsNotNullUndefinedOrEmpty(x: string | null | undefined) {
  assert.isTrue(x !== undefined, "should not be undefined");
  assert.isNotNull(x);
  assert.isNotEmpty(x);
}

function assertIsValidSchemaId(schemaId: SchemaId, expectedSerializationType = "avro") {
  assertIsNotNullUndefinedOrEmpty(schemaId.id);
  assertIsNotNullUndefinedOrEmpty(schemaId.location);
  assertIsNotNullUndefinedOrEmpty(schemaId.locationById);
  assertIsNotNullUndefinedOrEmpty(schemaId.serializationType);
  assert.isNotNull(schemaId.version);
  assert.equal(schemaId.serializationType.toLowerCase(), expectedSerializationType.toLowerCase());
}

// `any` because _response is deliberately withheld from the typing
function assertStatus(response: any, status: number) {
  assert.equal(response._response.status, status);
}

describe("SchemaRegistryClient", function() {
  let recorder: Recorder;
  let client: SchemaRegistryClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("sets endpoint and adjusts user agent prefix in constructor", () => {
    let options: SchemaRegistryClientOptions = {
      userAgentOptions: {
        userAgentPrefix: "CustomPrefix"
      }
    };

    const endpoint = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    let client = new SchemaRegistryClient(endpoint, credential, options);
    assert.equal(client.endpoint, endpoint);
    assert.equal(options.userAgentOptions?.userAgentPrefix, `CustomPrefix ${LIB_INFO}`);

    options = {};
    client = new SchemaRegistryClient(endpoint, credential, options);
    assert.equal(client.endpoint, endpoint);
    assert.equal(options.userAgentOptions?.userAgentPrefix, LIB_INFO);
  });

  it("rejects schema registration with invalid args", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

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
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assertStatus(registered, 200);
    assertIsValidSchemaId(registered);

    // changing schema content bumps version, generates new id/locations
    const changed = await client.registerSchema({
      ...schema,
      content: schema.content.replace("name", "fullName")
    });
    assertStatus(changed, 200);
    assertIsValidSchemaId(changed);
  });

  it("fails to get schema ID when given invalid args", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

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
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");
    await assert.isRejected(
      client.getSchemaId({ ...schema, name: "never-registered" }),
      /never-registered/
    );
  });

  it("gets schema ID", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assertStatus(registered, 200);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaId(schema);
    assertStatus(found, 200);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same content.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchemaById(null!), /null/);
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    await assert.isRejected(
      client.getSchemaById("ffffffffffffffffffffffffffffffff"),
      /ffffffffffffffffffffffffffffffff/
    );
  });

  it("gets schema by ID", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assertStatus(registered, 200);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaById(registered.id);
    assertStatus(found, 200);
    assertIsValidSchemaId(found);

    assert.equal(found.content, schema.content);
  });
});
