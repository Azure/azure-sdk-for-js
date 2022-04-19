// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError, TableClient, TableServiceClient } from "../../src";

import { TableServiceErrorResponse } from "../../src/utils/errorHelpers";
import { assert } from "chai";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

describe("TableClient CreationHandling", () => {
  let unrecordedClient: TableClient;
  beforeEach(async function () {
    unrecordedClient = new TableClient("https://foo.table.core.windows.net", "testTable");
  });

  it("should not thorw if table already exists", async function () {
    // Mock core-client throwing on error to verify consistenty that don't throw the error
    unrecordedClient.pipeline.addPolicy({
      name: "TableAlreadyExists",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableAlreadyExists",
            },
          },
        };
        throw new RestError("TableAlreadyExists", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });

    await unrecordedClient.createTable({
      onResponse: (response) => {
        assert.equal(response.status, 409);
      },
    });
  });

  it("should throw when 409 and not TableAlreadyExists", async function () {
    // Mock core-client throwing on error to verify consistenty that we surface the error
    unrecordedClient.pipeline.addPolicy({
      name: "Other409Error",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: { odataError: { code: "TableBeingDeleted" } },
        };
        throw new RestError("TableBeingDeleted", { statusCode: 409, response: mockedResponse });
      },
    });

    try {
      await unrecordedClient.createTable();
      assert.fail("Expected error");
    } catch (error: any) {
      assert.equal((error as RestError).statusCode, 409);
    }
  });
});

describe("TableServiceClient CreationHandling", () => {
  let unrecordedClient: TableServiceClient;

  beforeEach(async function () {
    unrecordedClient = new TableServiceClient("https://foo.table.core.windows.net");
  });

  it("should not thorw if table already exists", async function () {
    const tableName = `tableExists`;
    // Mock core-client throwing on error to verify consistenty that don't throw the error
    unrecordedClient.pipeline.addPolicy({
      name: "TableAlreadyExists",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableAlreadyExists",
            },
          },
        };
        throw new RestError("TableAlreadyExists", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });

    await unrecordedClient.createTable(tableName, {
      onResponse: (response) => {
        assert.equal(response.status, 409);
      },
    });
  });

  it("should throw when 409 and not TableAlreadyExists", async function () {
    const tableName = `throwError`;
    // Mock core-client throwing on error to verify consistenty that we surface the error
    unrecordedClient.pipeline.addPolicy({
      name: "Other409Error",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableBeingDeleted",
            },
          },
        };
        throw new RestError("TableBeingDeleted", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });
    try {
      await unrecordedClient.createTable(tableName);
      assert.fail("Expected error");
    } catch (error: any) {
      assert.equal((error as RestError).statusCode, 409);
    }
  });
});
