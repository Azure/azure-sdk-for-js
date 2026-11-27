// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential } from "@azure/core-auth";
import type { HttpClient, PipelineRequest, RawHttpHeaders } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { NoOpCredential } from "@azure-tools/test-credential";
import { describe, expect, expectTypeOf, it } from "vitest";
import pkgJson from "@azure/batch/package.json" with { type: "json" };
import type { BatchNodeDeallocationOption, VirtualMachineConfiguration } from "../src/index.js";
import { BatchClient, KnownVersions } from "../src/index.js";

function createHttpClient(
  responses: { status: number; body?: unknown; headers?: RawHttpHeaders }[],
): { httpClient: HttpClient; requests: PipelineRequest[] } {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      const response = responses[requests.length];
      if (!response) {
        throw new Error("Unexpected HTTP request in unit test");
      }
      requests.push(request);
      return {
        request,
        status: response.status,
        headers: createHttpHeaders({
          "content-type": "application/json",
          ...response.headers,
        }),
        bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
      };
    },
  };
  return { httpClient, requests };
}

function requestBody(request: PipelineRequest): unknown {
  if (typeof request.body !== "string") {
    throw new Error("Expected a JSON request body");
  }
  return JSON.parse(request.body);
}

const virtualMachineConfiguration: VirtualMachineConfiguration = {
  nodeAgentSkuId: "batch.node.ubuntu 22.04",
  imageReference: {
    publisher: "canonical",
    offer: "0001-com-ubuntu-server-jammy",
    sku: "22_04-lts",
    version: "latest",
  },
  placement: { zonePlacementPolicy: "Auto" },
  resiliencyPolicy: { zoneAllocationPolicy: { maxZoneCount: 3 } },
};

const wireVirtualMachineConfiguration = {
  nodeAgentSKUId: virtualMachineConfiguration.nodeAgentSkuId,
  imageReference: virtualMachineConfiguration.imageReference,
  placement: virtualMachineConfiguration.placement,
  resiliencyPolicy: virtualMachineConfiguration.resiliencyPolicy,
};

describe("Batch API version and generated model synchronization", () => {
  it("exposes the new API version", () => {
    expect(KnownVersions.V20261001).toBe("2026-10-01");
  });

  it("uses 2026-10-01 by default and the package version in the user agent", async () => {
    const { httpClient, requests } = createHttpClient([{ status: 200, body: { id: "pool" } }]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });

    await client.getPool("pool");

    expect(new URL(requests[0].url).searchParams.get("api-version")).toBe("2026-10-01");
    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    expect(requests[0].headers.get(userAgentHeader)).toContain(`azsdk-js-batch/${pkgJson.version}`);
  });

  it("preserves an explicit older API version", async () => {
    const { httpClient, requests } = createHttpClient([{ status: 200, body: { id: "pool" } }]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), {
      httpClient,
      apiVersion: KnownVersions.V20250601,
    });

    await client.getPool("pool");

    expect(new URL(requests[0].url).searchParams.get("api-version")).toBe("2025-06-01");
  });

  it("preserves the projection of a selected pool response", async () => {
    const { httpClient, requests } = createHttpClient([
      { status: 200, body: { id: "pool", state: "active" } },
    ]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });

    const pool = await client.getPool("pool", { select: ["id", "state"] });

    expect(new URL(requests[0].url).searchParams.get("$select")).toBe("id,state");
    expect(pool.id).toBe("pool");
    expect(pool.state).toBe("active");
    expect(pool.allocationState).toBeUndefined();
    expect(pool.vmSize).toBeUndefined();
  });

  it("preserves the projection when listing filtered pools", async () => {
    const { httpClient, requests } = createHttpClient([
      { status: 200, body: { value: [{ id: "pool", state: "active" }] } },
    ]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });
    const pools = [];

    for await (const pool of client.listPools({
      filter: "startswith(id,'pool')",
      select: ["id", "state"],
    })) {
      pools.push(pool);
    }

    expect(new URL(requests[0].url).searchParams.get("$select")).toBe("id,state");
    expect(new URL(requests[0].url).searchParams.get("$filter")).toBe("startswith(id,'pool')");
    expect(pools).toHaveLength(1);
    expect(pools[0].id).toBe("pool");
    expect(pools[0].state).toBe("active");
    expect(pools[0].allocationState).toBeUndefined();
    expect(pools[0].vmSize).toBeUndefined();
  });

  it("carries the new default version into pagination requests", async () => {
    const { httpClient, requests } = createHttpClient([
      {
        status: 200,
        body: {
          value: [{ id: "first" }],
          "odata.nextLink": "https://batch.example/pools?cursor=next",
        },
      },
      { status: 200, body: { value: [{ id: "second" }] } },
    ]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });
    const ids: (string | undefined)[] = [];

    for await (const pool of client.listPools()) {
      ids.push(pool.id);
    }

    expect(ids).toEqual(["first", "second"]);
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      expect(new URL(request.url).searchParams.get("api-version")).toBe("2026-10-01");
    }
  });

  it("serializes the new placement and resiliency settings", async () => {
    const { httpClient, requests } = createHttpClient([{ status: 201 }]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });

    await client.createPool({
      id: "pool",
      vmSize: "Standard_D2s_v5",
      virtualMachineConfiguration,
    });

    expect(requestBody(requests[0])).toEqual({
      id: "pool",
      vmSize: "Standard_D2s_v5",
      virtualMachineConfiguration: wireVirtualMachineConfiguration,
    });
  });

  it("deserializes the new placement and resiliency settings", async () => {
    const { httpClient } = createHttpClient([
      {
        status: 200,
        body: { id: "pool", virtualMachineConfiguration: wireVirtualMachineConfiguration },
      },
    ]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });

    const pool = await client.getPool("pool");

    expect(pool.virtualMachineConfiguration?.nodeAgentSkuId).toBe(
      virtualMachineConfiguration.nodeAgentSkuId,
    );
    expect(pool.virtualMachineConfiguration?.placement).toEqual(
      virtualMachineConfiguration.placement,
    );
    expect(pool.virtualMachineConfiguration?.resiliencyPolicy).toEqual(
      virtualMachineConfiguration.resiliencyPolicy,
    );
  });

  it.runIf(isNodeLike)("preserves shared-key authentication in Node.js", async () => {
    const { httpClient, requests } = createHttpClient([{ status: 200, body: { id: "pool" } }]);
    const client = new BatchClient(
      "https://batch.example",
      new AzureNamedKeyCredential("account", "YWJjZA=="),
      { httpClient },
    );

    await client.getPool("pool");

    expect(requests[0].headers.get("authorization")).toMatch(/^SharedKey account:/);
    expect(new URL(requests[0].url).searchParams.get("api-version")).toBe("2026-10-01");
  });

  it("preserves custom file-property conversion", async () => {
    const { httpClient } = createHttpClient([
      {
        status: 200,
        headers: {
          "last-modified": "Wed, 25 Nov 2026 12:00:00 GMT",
          "content-length": "3",
          "ocp-batch-file-url": "https://batch.example/files/example.txt",
        },
      },
    ]);
    const client = new BatchClient("https://batch.example", new NoOpCredential(), { httpClient });

    const file = await client.getNodeFileProperties("pool", "node", "example.txt");

    expect(file.name).toBe("example.txt");
    expect(file.properties?.lastModified).toEqual(new Date("2026-11-25T12:00:00Z"));
    expect(file.properties?.contentLength).toBe("3");
  });

  it("removes the retired pool usage metrics method", () => {
    const client = new BatchClient("https://batch.example", new NoOpCredential());

    expect("listPoolUsageMetrics" in client).toBe(false);
  });

  it("removes the retired node-deallocation value", () => {
    expectTypeOf<BatchNodeDeallocationOption>().toEqualTypeOf<
      "requeue" | "terminate" | "taskcompletion"
    >();
  });
});
