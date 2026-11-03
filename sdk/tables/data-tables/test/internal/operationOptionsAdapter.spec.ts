// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { OperationRequestOptions as RestOperationRequestOptions } from "@azure-rest/core-client";
import { TableClient } from "../../src/TableClient.js";
import { describe, it, assert, expect, vi } from "vitest";

type OperationOptionsWithHeaders = OperationOptions & {
  requestOptions?: OperationOptions["requestOptions"] &
    Pick<RestOperationRequestOptions, "headers">;
};

describe("operation options adapter", () => {
  describe("generated entity operations", () => {
    const entity = { partitionKey: "partition", rowKey: "row", value: "test" };
    const operations: Array<{
      name: string;
      run: (client: TableClient, options: OperationOptionsWithHeaders) => Promise<unknown>;
    }> = [
      {
        name: "createEntity",
        run: (client, options) => client.createEntity(entity, options),
      },
      {
        name: "updateEntity Merge",
        run: (client, options) => client.updateEntity(entity, "Merge", options),
      },
      {
        name: "updateEntity Replace",
        run: (client, options) => client.updateEntity(entity, "Replace", options),
      },
    ];
    const headerCases: Array<{
      name: string;
      requestOptions: NonNullable<OperationOptionsWithHeaders["requestOptions"]>;
      expectedUserHeader: string;
      expectedLegacyOnlyHeader?: string;
    }> = [
      {
        name: "legacy customHeaders only",
        requestOptions: { customHeaders: { "X-User": "legacy" } },
        expectedUserHeader: "legacy",
      },
      {
        name: "canonical headers only",
        requestOptions: { headers: { "X-User": "canonical" } },
        expectedUserHeader: "canonical",
      },
      {
        name: "canonical headers override customHeaders case-insensitively",
        requestOptions: {
          customHeaders: { "X-User": "legacy", "X-Legacy-Only": "legacy-only" },
          headers: { "x-user": "canonical" },
        },
        expectedUserHeader: "canonical",
        expectedLegacyOnlyHeader: "legacy-only",
      },
    ];
    const testCases = operations.flatMap((operation) =>
      headerCases.map((headerCase) => ({
        operation,
        headerCase,
      })),
    );

    it.each(testCases)(
      "$operation.name forwards $headerCase.name",
      async ({ operation, headerCase }) => {
        const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => {
          assert.equal(request.headers.get("x-user"), headerCase.expectedUserHeader);
          if (headerCase.expectedLegacyOnlyHeader !== undefined) {
            assert.equal(request.headers.get("x-legacy-only"), headerCase.expectedLegacyOnlyHeader);
          }
          return {
            status: 204,
            headers: createHttpHeaders({ etag: "etag" }),
            request,
          };
        });
        const client = new TableClient("https://example.org", "TestTable", {
          httpClient: { sendRequest },
        });
        const options = { requestOptions: headerCase.requestOptions };
        const originalOptions = JSON.stringify(options);

        await operation.run(client, options);

        assert.equal(JSON.stringify(options), originalOptions);
        expect(sendRequest).toHaveBeenCalledTimes(1);
      },
    );
  });
});
