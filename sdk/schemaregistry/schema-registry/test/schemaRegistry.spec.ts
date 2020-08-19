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

function assertIsValidSchemaId(schemaId: SchemaId) {
  assertIsNotNullUndefinedOrEmpty(schemaId.id);
  assertIsNotNullUndefinedOrEmpty(schemaId.location);
  assertIsNotNullUndefinedOrEmpty(schemaId.locationById);
  assert.isNotNull(schemaId.version);
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
    await assert.isRejected(client.registerSchema({ ...schema, name: null! }));
    await assert.isRejected(client.registerSchema({ ...schema, group: null! }));
    await assert.isRejected(client.registerSchema({ ...schema, content: null! }));
    await assert.isRejected(client.registerSchema({ ...schema, serializationType: null! }));
    await assert.isRejected(client.registerSchema({ ...schema, serializationType: "not-valid" }));
  });

  it("registers schema", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assert.equal(registered._response.status, 200);
    assert.isNotNull(registered.id);
    assert.isNotNull(registered.version);
    assert.isNotNull(registered.location);
    assert.isNotNull(registered.locationById);

    // changing schema content bumps version, generates new id/locations
    const changed = await client.registerSchema({
      ...schema,
      content: schema.content.replace("name", "fullName")
    });
    assert.equal(changed._response.status, 200);
    assert.notEqual(changed.version, registered.version);
    assert.notEqual(changed.id, registered.id);
    assert.notEqual(changed.location, registered.location);
    assert.notEqual(changed.locationById, registered.locationById);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await assert.isRejected(client.getSchemaId({ ...schema, name: null! }));
    await assert.isRejected(client.getSchemaId({ ...schema, group: null! }));
    await assert.isRejected(client.getSchemaId({ ...schema, content: null! }));
    await assert.isRejected(client.getSchemaId({ ...schema, serializationType: null! }));
    await assert.isRejected(client.getSchemaId({ ...schema, serializationType: "not-valid" }));
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    await assert.isRejected(client.getSchemaId({ ...schema, name: "never-registered" }));
  });

  it("gets schema ID", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assert.equal(registered._response.status, 200);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaId(schema);
    assert.equal(found._response.status, 200);
    assertIsValidSchemaId(found);

    // NOTE: IDs may differ here as we could get a different version with same content.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await assert.isRejected(client.getSchemaById(undefined!));
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    await assert.isRejected(client.getSchemaById("ffffffffffffffffffffffffffffffff"));
  });

  it("gets schema by ID", async () => {
    recorder.skip("node", "https://github.com/Azure/azure-sdk-for-js/issues/10659");

    const registered = await client.registerSchema(schema);
    assert.equal(registered._response.status, 200);
    assertIsValidSchemaId(registered);

    const found = await client.getSchemaById(registered.id);
    assert.equal(found._response.status, 200);
    assertIsValidSchemaId(found);

    assert.equal(found.content, schema.content);
  });
});
