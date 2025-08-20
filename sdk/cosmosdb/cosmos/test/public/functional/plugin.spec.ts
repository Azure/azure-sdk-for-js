// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CosmosClientOptions,
  DatabaseDefinition,
  Resource,
  RequestContext,
  Plugin,
  Next,
  PluginConfig,
  DiagnosticNodeInternal,
} from "@azure/cosmos";
import { CosmosClient } from "@azure/cosmos";
import { getEmptyCosmosDiagnostics } from "$internal/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

describe("Plugin", () => {
  it("should handle all requests", async () => {
    const successResponse = {
      headers: {},
      code: 200,
      result: {
        message: "yay",
      },
      diagnostics: getEmptyCosmosDiagnostics(),
    };
    let requestCount = 0;
    const FAILCOUNT = 2;
    const sometimesThrow: Plugin<any> = async (
      context: RequestContext,
      diagNode: DiagnosticNodeInternal,
    ) => {
      assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
      requestCount++;
      if (context.path.includes("dbs") && requestCount <= FAILCOUNT) {
        throw {
          code: "ECONNRESET",
        };
      }
      return successResponse;
    };

    const options: CosmosClientOptions = {
      endpoint: "https://faaaaaaaaaaaaake.com",
      key: "THIS IS A FAKE KEY",
    };

    const plugins: PluginConfig[] = [
      {
        on: "request",
        plugin: sometimesThrow,
      },
    ];

    const client = new CosmosClient({ ...options, plugins } as any);
    const response = await client.database("foo").read();
    assert.equal(requestCount, FAILCOUNT + 1); // Get Database Account + FAILED GET Database + Get Database
    assert.notEqual(response, undefined);
    assert.equal(response.statusCode, successResponse.code);
    assert.deepEqual(
      response.resource,
      successResponse.result as any as DatabaseDefinition & Resource,
    );
    client.dispose();
  });

  it("should handle all operations", async () => {
    const successResponse = {
      headers: {},
      code: 200,
      result: {
        message: "yay",
      },
      diagnostics: getEmptyCosmosDiagnostics(),
    };
    let requestCount = 0;
    const alwaysSucceed: Plugin<any> = async () => {
      requestCount++;
      return successResponse;
    };
    const alwaysThrow: Plugin<any> = async () => {
      throw new Error("I always throw!");
    };

    const options: CosmosClientOptions = {
      endpoint: "https://faaaaaaaaaaaaake.com",
      key: "THIS IS A FAKE KEY",
    };

    const plugins: PluginConfig[] = [
      {
        on: "request",
        plugin: alwaysThrow, // I'll never be called since operation will always succeed.
      },
      {
        on: "operation",
        plugin: alwaysSucceed,
      },
    ];

    const client = new CosmosClient({ ...options, plugins } as any);
    const response = await client.database("foo").read();
    assert.equal(requestCount, 2); // Get Database Account + Get Database
    assert.notEqual(response, undefined);
    assert.equal(response.statusCode, successResponse.code);
    assert.deepEqual(
      response.resource,
      successResponse.result as any as DatabaseDefinition & Resource,
    );
    client.dispose();
  });

  it("should allow next to be called", async () => {
    const successResponse = {
      headers: {},
      code: 200,
      result: {
        message: "yay",
      },
      diagnostics: getEmptyCosmosDiagnostics(),
    };
    let innerRequestCount = 0;
    const alwaysSucceed: Plugin<any> = async () => {
      innerRequestCount++;
      return successResponse;
    };

    let requestCount = 0;
    let responseCount = 0;
    const counts: Plugin<any> = async (context: RequestContext, diagNode, next: Next<any>) => {
      assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
      requestCount++;
      const response = await next(context);
      responseCount++;
      return response;
    };

    const options: CosmosClientOptions = {
      endpoint: "https://faaaaaaaaaaaaake.com",
      key: "THIS IS A FAKE KEY",
    };

    const plugins: PluginConfig[] = [
      {
        on: "operation",
        plugin: counts, // I'll never be called since operation will always succeed.
      },
      {
        on: "operation",
        plugin: alwaysSucceed,
      },
    ];

    const client = new CosmosClient({ ...options, plugins } as any);
    const response = await client.database("foo").read();
    assert.equal(requestCount, 2); // Get Database Account + Get Database
    assert.equal(responseCount, 2); // Get Database Account + Get Database
    assert.equal(innerRequestCount, 2); // Get Database Account + Get Database
    assert.notEqual(response, undefined);
    assert.equal(response.statusCode, successResponse.code);
    assert.deepEqual(
      response.resource,
      successResponse.result as any as DatabaseDefinition & Resource,
    );
    client.dispose();
  });
});
