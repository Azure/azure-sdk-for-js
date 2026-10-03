// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetSchemaOptions, SchemaDescription } from "../../src/index.js";
import { SchemaRegistryClient } from "../../src/index.js";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, it, assert } from "vitest";

const schema: SchemaDescription = {
  groupName: "group",
  name: "schema",
  definition: '{"type":"string"}',
  format: "Avro",
};

const operations: [
  string,
  (client: SchemaRegistryClient, options?: GetSchemaOptions) => Promise<unknown>,
][] = [
  ["registerSchema", (client, options) => client.registerSchema(schema, options)],
  ["getSchemaProperties", (client, options) => client.getSchemaProperties(schema, options)],
  ["getSchemaById", (client, options) => client.getSchema("schema-id", options)],
  [
    "getSchemaByVersion",
    (client, options) => client.getSchema(schema.name, schema.groupName, 1, options),
  ],
];

function createClient(capture: (request: PipelineRequest) => void): SchemaRegistryClient {
  const httpClient: HttpClient = {
    async sendRequest(request) {
      capture(request);
      return {
        request,
        status: request.method === "GET" ? 200 : 204,
        headers: createHttpHeaders({
          "schema-id": "schema-id",
          "schema-group-name": "group",
          "schema-name": "schema",
          "schema-version": "1",
          "content-type": "application/json; serialization=Avro",
        }),
        bodyAsText: schema.definition,
      };
    },
  };
  return new SchemaRegistryClient(
    "https://example.servicebus.windows.net",
    { getToken: async () => ({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }) },
    { httpClient },
  );
}

describe("operation request options", () => {
  for (const [name, operation] of operations) {
    describe(name, () => {
      it("forwards nested transport options and preserves tracing, abort and response callbacks", async () => {
        const abortSignal = new AbortController().signal;
        const onUploadProgress = (): void => {};
        const onDownloadProgress = (): void => {};
        let captured: PipelineRequest | undefined;
        let responseStatus: number | undefined;
        const client = createClient((request) => {
          captured = request;
        });
        await operation(client, {
          abortSignal,
          requestOptions: {
            customHeaders: { "x-custom-header": "custom-value" },
            timeout: 1234,
            onUploadProgress,
            onDownloadProgress,
            allowInsecureConnection: true,
          },
          onResponse: (response) => {
            responseStatus = response.status;
          },
        });
        assert.isDefined(captured);
        assert.equal(captured!.headers.get("x-custom-header"), "custom-value");
        assert.equal(captured!.timeout, 1234);
        assert.strictEqual(captured!.abortSignal, abortSignal);
        assert.isDefined(captured!.tracingOptions?.tracingContext);
        assert.strictEqual(captured!.onUploadProgress, onUploadProgress);
        assert.strictEqual(captured!.onDownloadProgress, onDownloadProgress);
        assert.isTrue(captured!.allowInsecureConnection);
        assert.equal(responseStatus, captured!.method === "GET" ? 200 : 204);
      });

      it("gives canonical headers precedence over legacy aliases ignoring case", async () => {
        let captured: PipelineRequest | undefined;
        const client = createClient((request) => {
          captured = request;
        });
        const requestOptions = {
          customHeaders: { "X-Custom-Header": "legacy", "x-legacy-only": "retained" },
          headers: { "x-custom-header": "canonical" },
          timeout: 0,
        };
        await operation(client, { requestOptions });
        assert.equal(captured!.headers.get("x-custom-header"), "canonical");
        assert.equal(captured!.headers.get("x-legacy-only"), "retained");
        assert.equal(captured!.timeout, 0);
      });

      it("accepts omitted options and preserves operation bodies", async () => {
        let captured: PipelineRequest | undefined;
        const client = createClient((request) => {
          captured = request;
        });
        await operation(client);
        assert.isDefined(captured);
        assert.equal(captured!.timeout, 0);
        if (captured!.method !== "GET") {
          const body = captured!.body;
          assert.equal(
            body instanceof Uint8Array ? new TextDecoder().decode(body) : body,
            captured!.method === "POST" ? JSON.stringify(schema.definition) : schema.definition,
          );
          assert.equal(
            captured!.headers.get("content-type"),
            "application/json; serialization=Avro",
          );
        }
      });
    });
  }
});
