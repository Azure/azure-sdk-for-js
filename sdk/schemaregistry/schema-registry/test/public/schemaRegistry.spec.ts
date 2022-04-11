// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedClient, recorderOptions } from "./utils/recordedClient";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);
import { ClientSecretCredential } from "@azure/identity";
import { HttpHeaders } from "@azure/core-rest-pipeline";

import { Schema, SchemaDescription, SchemaProperties, SchemaRegistryClient } from "../../src";
import { Context } from "mocha";

const options = {
  onResponse: (rawResponse: { status: number }) => {
    assert.equal(rawResponse.status, 204);
  },
};

let xMsErrorCodeHeader: string | undefined = undefined;
const errorOptions = {
  onResponse: (rawResponse: { headers: HttpHeaders }) => {
    const curr = rawResponse.headers.get("x-ms-error-code");
    if (curr === undefined) {
      assert.fail(`Expected header x-ms-error-code to be part of the respond but it is not found`);
    }
    xMsErrorCodeHeader = curr;
  },
};

function assertIsValidSchemaProperties(
  schemaProperties: SchemaProperties,
  expectedSerializationType = "Avro"
): asserts schemaProperties {
  assert.isNotEmpty(schemaProperties.id);
  assert.equal(schemaProperties.format, expectedSerializationType);
  assert.isNotEmpty(schemaProperties.groupName);
  assert.isNotEmpty(schemaProperties.name);
}

function assertIsValidSchema(schema: Schema, expectedSerializationType = "Avro"): asserts schema {
  assert.isNotEmpty(schema.definition);
  assertIsValidSchemaProperties(schema.properties, expectedSerializationType);
}

async function isRejected<T>(
  promise: Promise<T>,
  expectations: {
    messagePattern?: RegExp;
    statusCode?: number;
    errorCode?: string;
  }
): Promise<void> {
  try {
    await promise;
  } catch (e) {
    const { messagePattern, errorCode, statusCode } = expectations;
    if (messagePattern !== undefined) {
      assert.match(e.message, messagePattern);
    } else {
      // should not happen ever
      assert.isUndefined(e.message);
    }
    if (statusCode !== undefined) {
      assert.equal(e.statusCode, statusCode);
    } else {
      assert.isUndefined(e.statusCode);
    }
    if (errorCode !== undefined) {
      assert.equal(e.code, errorCode);
      assert.equal(xMsErrorCodeHeader, errorCode);
    } else {
      assert.isUndefined(e.code);
    }
  }
}

describe("SchemaRegistryClient", function () {
  let recorder: Recorder;
  let client: SchemaRegistryClient;
  let schema: SchemaDescription;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    client = createRecordedClient(recorder);
    schema = {
      name: "azsdk_js_test",
      groupName: assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP"),
      format: "Avro",
      definition: JSON.stringify({
        type: "record",
        name: "User",
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "favoriteNumber",
            type: "int",
          },
        ],
      }),
    };
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("sets fully qualified name space in constructor", () => {
    const fullyQualifiedNamespace = "https://example.com/schemaregistry/";
    const credential = new ClientSecretCredential("x", "y", "z");

    const customClient = new SchemaRegistryClient(fullyQualifiedNamespace, credential);
    assert.equal(customClient.fullyQualifiedNamespace, fullyQualifiedNamespace);
  });

  it("rejects schema registration with invalid args", async () => {
    await isRejected(client.registerSchema({ ...schema, name: null! }), { messagePattern: /null/ });
    await isRejected(client.registerSchema({ ...schema, groupName: null! }), {
      messagePattern: /null/,
    });
    await isRejected(client.registerSchema({ ...schema, definition: null! }), {
      messagePattern: /null/,
    });
    await isRejected(client.registerSchema({ ...schema, format: null! }, errorOptions), {
      messagePattern: /null/,
      statusCode: 415,
      errorCode: "InvalidSchemaType",
    });
    await isRejected(client.registerSchema({ ...schema, format: "not-valid" }, errorOptions), {
      statusCode: 415,
      messagePattern: /not-valid/,
      errorCode: "InvalidSchemaType",
    });
  });

  it("registers schema", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);
  });

  it("fails to get schema ID when given invalid args", async () => {
    await isRejected(client.getSchemaProperties({ ...schema, name: null! }), {
      messagePattern: /null/,
    });
    await isRejected(client.getSchemaProperties({ ...schema, groupName: null! }), {
      messagePattern: /null/,
    });
    await isRejected(client.getSchemaProperties({ ...schema, definition: null! }), {
      messagePattern: /null/,
    });
    await isRejected(client.getSchemaProperties({ ...schema, format: null! }, errorOptions), {
      statusCode: 415,
      messagePattern: /null/,
      errorCode: "InvalidSchemaType",
    });
    await isRejected(client.getSchemaProperties({ ...schema, format: "not-valid" }, errorOptions), {
      statusCode: 415,
      messagePattern: /not-valid/,
      errorCode: "InvalidSchemaType",
    });
  });

  it("fails to get schema ID when no matching schema exists", async () => {
    await isRejected(
      client.getSchemaProperties({ ...schema, name: "never-registered" }, errorOptions),
      {
        statusCode: 404,
        messagePattern: /does not exist/,
        errorCode: "ItemNotFound",
      }
    );
  });

  it("gets schema ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);

    const found = await client.getSchemaProperties(schema, options);
    assertIsValidSchemaProperties(found);

    // NOTE: IDs may differ here as we could get a different version with same definition.
  });

  it("fails to get schema by ID when given invalid ID", async () => {
    await isRejected(client.getSchema(null!), { messagePattern: /null/ });
  });

  it("fails to get schema when no schema exists with given ID", async () => {
    await isRejected(client.getSchema("ffffffffffffffffffffffffffffffff", errorOptions), {
      statusCode: 404,
      messagePattern: /does not exist/,
      errorCode: "ItemNotFound",
    });
  });

  it("gets schema by ID", async () => {
    const registered = await client.registerSchema(schema, options);
    assertIsValidSchemaProperties(registered);
    const found = await client.getSchema(registered.id, {
      onResponse: (rawResponse: { status: number }) => {
        assert.equal(rawResponse.status, 200);
      },
    });
    assertIsValidSchema(found);
    assert.equal(found.definition, schema.definition);
  });

  it("schema with whitespace", async () => {
    const schema2: SchemaDescription = {
      name: "azsdk_js_test2",
      groupName: assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP"),
      format: "Avro",
      definition:
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n",
    };
    // definition that is going to the service has whitespaces
    const registered = await client.registerSchema(schema2, options);
    assertIsValidSchemaProperties(registered);

    const foundSchema = await client.getSchema(registered.id);
    assertIsValidSchema(foundSchema);
    // the schema comes from the service normalized
    assert.equal(foundSchema.definition, schema2.definition.replace(/\s/g, ""));

    const foundId = await client.getSchemaProperties({
      // definition that comes from the service does not have whitespaces
      definition: foundSchema.definition,
      groupName: schema2.groupName,
      name: schema2.name,
      format: foundSchema.properties.format,
    });
    assertIsValidSchemaProperties(foundId);
  });

  it("Allows schema names with dots in them", async () => {
    const schemaProperties = await client.registerSchema({
      ...schema,
      name: "com.azure.schemaregistry.samples.User",
    });
    assertIsValidSchemaProperties(schemaProperties);
  });
});
