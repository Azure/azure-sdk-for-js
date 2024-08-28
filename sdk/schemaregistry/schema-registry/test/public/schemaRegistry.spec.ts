// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import {
  KnownSchemaFormats,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistryClient,
} from "../../src";
import { assert, matrix } from "@azure-tools/test-utils";
import { createRecordedClient, Format, recorderOptions } from "./utils/recordedClient";
import { ClientSecretCredential } from "@azure/identity";
import { Context } from "mocha";
import { HttpHeaders } from "@azure/core-rest-pipeline";

const options = {
  onResponse: (rawResponse: { status: number; bodyAsText?: string | null }) => {
    assert.equal(rawResponse.status, 204, `Response body: ${rawResponse.bodyAsText}`);
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
  expectedSerializationType: Format,
): asserts schemaProperties {
  assert.isNotEmpty(schemaProperties.id);
  assert.equal(schemaProperties.format, expectedSerializationType);
  assert.isNotEmpty(schemaProperties.groupName);
  assert.isNotEmpty(schemaProperties.name);
  assert.isAtLeast(schemaProperties.version, 1);
}

function assertIsValidSchema(schema: Schema, expectedSerializationType: Format): asserts schema {
  assert.isNotEmpty(schema.definition);
  assertIsValidSchemaProperties(schema.properties, expectedSerializationType);
}

async function isRejected<T>(
  promise: Promise<T>,
  expectations: {
    messagePattern?: RegExp;
    statusCode?: number;
    errorCode?: string;
  },
): Promise<void> {
  try {
    await promise;
  } catch (e: any) {
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

function getDefinition(format: Format): string {
  switch (format) {
    case "Avro":
      return JSON.stringify({
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
      });
    case "Json":
      // The service supports JSON Schema Draft 3, https://datatracker.ietf.org/doc/html/draft-zyp-json-schema-03
      return JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "https://example.com/product.schema.json",
        title: "Product",
        description: "A product from Acme's catalog",
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          favoriteNumber: {
            type: "integer",
            required: true,
          },
        },
      });
    case "Custom":
      // Parquet
      return `ID: int64
CODE_GENDER: string
FLAG_OWN_CAR: string
FLAG_OWN_REALTY: string
CNT_CHILDREN: int64
AMT_INCOME_TOTAL: double
NAME_INCOME_TYPE: string
NAME_EDUCATION_TYPE: string
NAME_FAMILY_STATUS: string
NAME_HOUSING_TYPE: string
DAYS_BIRTH: int64
DAYS_EMPLOYED: int64
FLAG_MOBIL: int64
FLAG_WORK_PHONE: int64
FLAG_PHONE: int64
FLAG_EMAIL: int64
OCCUPATION_TYPE: string
CNT_FAM_MEMBERS: double`;
  }
}

function getWhitespaceDefinition(format: Format): string {
  switch (format) {
    case "Avro":
      return (
        "{\n" +
        '  "type": "record",\n' +
        '  "name": "Test",\n' +
        '  "fields": [{ "name": "X", "type": { "type": "string" } }]\n' +
        "}\n"
      );
    case "Json":
      return (
        "{\n" +
        '  "$schema": "https://json-schema.org/draft/2020-12/schema",\n' +
        '  "$id": "https://example.com/product.schema.json",\n' +
        '  "title": "Product"\n' +
        '  "type": "object"\n' +
        '  "properties": [{ "X": { "type": "string" } }]\n' +
        "}\n"
      );
    case "Custom":
      throw Error("Custom doesn't support normalization");
  }
}

function getSchema(inputs: { format: Format; groupName: string }): SchemaDescription {
  const { format, groupName } = inputs;
  return {
    name: "azsdk_js_test",
    groupName,
    format,
    definition: getDefinition(format),
  };
}

describe("SchemaRegistryClient", function () {
  matrix(
    [[KnownSchemaFormats.Avro, KnownSchemaFormats.Json, KnownSchemaFormats.Custom]] as const,
    async function (format: Format) {
      describe(`Format: ${format}`, function () {
        let recorder: Recorder;
        let client: SchemaRegistryClient;
        let groupName: string;
        let schema: SchemaDescription;

        beforeEach(async function (this: Context) {
          recorder = new Recorder(this.currentTest);
          await recorder.start(recorderOptions);
          client = createRecordedClient({ recorder, format });
          groupName = assertEnvironmentVariable("SCHEMA_REGISTRY_GROUP");
          schema = getSchema({
            format,
            groupName,
          });
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
          await isRejected(
            client.registerSchema({ ...schema, format: "not-valid" }, errorOptions),
            {
              statusCode: 415,
              messagePattern: /not-valid/,
              errorCode: "InvalidSchemaType",
            },
          );
        });

        it("registers schema", async () => {
          const registered = await client.registerSchema(schema, options);
          assertIsValidSchemaProperties(registered, format);
        });

        it("fails to get schema ID when given invalid args", async () => {
          await isRejected(
            client.getSchemaProperties({ ...schema, format: "not-valid" }, errorOptions),
            {
              statusCode: 415,
              messagePattern: /not-valid/,
              errorCode: "InvalidSchemaType",
            },
          );
        });

        it("fails to get schema ID when no matching schema exists", async () => {
          await isRejected(
            client.getSchemaProperties({ ...schema, name: "never-registered" }, errorOptions),
            {
              statusCode: 404,
              messagePattern: /does not exist/,
              errorCode: "ItemNotFound",
            },
          );
        });

        it("gets schema ID", async () => {
          const registered = await client.registerSchema(schema, options);
          assertIsValidSchemaProperties(registered, format);

          const found = await client.getSchemaProperties(schema, options);
          assertIsValidSchemaProperties(found, format);

          // NOTE: IDs may differ here as we could get a different version with same definition.
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
          assertIsValidSchemaProperties(registered, format);
          const found = await client.getSchema(registered.id, {
            onResponse: (rawResponse: { status: number }) => {
              assert.equal(rawResponse.status, 200);
            },
          });
          assertIsValidSchema(found, format);
          assert.equal(found.definition, schema.definition);
        });

        it("gets schema by version", async () => {
          const registered = await client.registerSchema(schema, options);
          assertIsValidSchemaProperties(registered, format);
          const found = await client.getSchema(
            registered.name,
            registered.groupName,
            registered.version,
            {
              onResponse: (rawResponse: { status: number }) => {
                assert.equal(rawResponse.status, 200);
              },
            },
          );
          assertIsValidSchema(found, format);
          assert.equal(found.definition, schema.definition);
        });

        it("schema with whitespace", async function (this: Context) {
          /**
           * Custom: The service doesn't validate/modify the schema.
           * Json: The service currently validates the input schema to have no
           * new lines.
           */
          if (format !== KnownSchemaFormats.Avro) this.skip();

          const schema2 = {
            name: "azsdk_js_test2",
            groupName,
            format,
            definition: getWhitespaceDefinition(format),
          };
          // definition that is going to the service has whitespaces
          const registered = await client.registerSchema(schema2, options);
          assertIsValidSchemaProperties(registered, format);

          const foundSchema = await client.getSchema(registered.id);
          assertIsValidSchema(foundSchema, format);
          // the schema comes from the service normalized
          assert.equal(foundSchema.definition, schema2.definition.replace(/\s/g, ""));

          const foundId = await client.getSchemaProperties({
            // definition that comes from the service does not have whitespaces
            definition: foundSchema.definition,
            groupName: schema2.groupName,
            name: schema2.name,
            format: foundSchema.properties.format,
          });
          assertIsValidSchemaProperties(foundId, format);
        });

        it("Allows schema names with dots in them", async () => {
          const schemaProperties = await client.registerSchema({
            ...schema,
            name: "com.azure.schemaregistry.samples.User",
          });
          assertIsValidSchemaProperties(schemaProperties, format);
        });
      });
    },
  );
});
