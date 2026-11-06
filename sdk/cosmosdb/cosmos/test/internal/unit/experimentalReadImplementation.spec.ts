// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { CosmosClient } from "../../../src/CosmosClient.js";
import { ItemResponse } from "../../../src/client/Item/ItemResponse.js";

const environmentVariable = "AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION";
const order = { id: "order-17", customerId: "customer-17", status: "submitted" };

describe("experimental item read selection", () => {
  const clients: CosmosClient[] = [];
  const sendRequest = vi.fn<HttpClient["sendRequest"]>();

  function createClient(): CosmosClient {
    const client = new CosmosClient({
      endpoint: "https://localhost:8081",
      key: "dGVzdC1rZXk=",
      httpClient: { sendRequest },
      connectionPolicy: {
        enableEndpointDiscovery: false,
        enableBackgroundEndpointRefreshing: false,
      },
    });
    clients.push(client);
    return client;
  }

  beforeEach(() => {
    vi.stubEnv(environmentVariable, undefined);
    sendRequest.mockReset();
    sendRequest.mockImplementation(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "x-ms-request-charge": "1" }),
      bodyAsText: JSON.stringify(order),
    }));
  });

  afterEach(() => {
    for (const client of clients) {
      client.dispose();
    }
    clients.length = 0;
    vi.unstubAllEnvs();
  });

  it.each([undefined, "javascript"])(
    "uses the existing read when selection is %s",
    async (value) => {
      vi.stubEnv(environmentVariable, value);
      const item = createClient()
        .database("sales")
        .container("orders")
        .item(order.id, order.customerId);

      const response = await item.read();

      expect(response).toBeInstanceOf(ItemResponse);
      expect(response.resource).toEqual(order);
      expect(response.statusCode).toBe(200);
      expect(response.requestCharge).toBe(1);
      expect(response.item).toBe(item);
      expect(sendRequest).toHaveBeenCalledOnce();
      const request = sendRequest.mock.calls[0][0];
      expect(request.method).toBe("GET");
      expect(request.url).toBe("https://localhost:8081/dbs/sales/colls/orders/docs/order-17");
      expect(request.headers.get("x-ms-documentdb-partitionkey")).toBe('["customer-17"]');
    },
  );

  it.each(["", "Rust", " javascript ", "unknown"])("rejects invalid selection %j", (value) => {
    vi.stubEnv(environmentVariable, value);
    expect(createClient).toThrow(
      "AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION must be 'javascript' or 'rust'.",
    );
    expect(sendRequest).not.toHaveBeenCalled();
  });

  it.each(["customer-17", undefined])(
    "rejects Rust before request or missing-key metadata execution (partition key %s)",
    async (partitionKey) => {
      vi.stubEnv(environmentVariable, "rust");
      const item = createClient()
        .database("sales")
        .container("orders")
        .item(order.id, partitionKey);

      await expect(item.read()).rejects.toThrow(
        "Experimental Rust reads do not support client option 'httpClient'.",
      );
      expect(sendRequest).not.toHaveBeenCalled();
    },
  );

  it("retains each client's selection even when the environment changes", async () => {
    const javascriptClient = createClient();
    vi.stubEnv(environmentVariable, "rust");
    const rustClient = createClient();
    vi.stubEnv(environmentVariable, "invalid-after-construction");

    const response = await javascriptClient
      .database("sales")
      .container("orders")
      .item(order.id, order.customerId)
      .read();
    expect(response.resource).toEqual(order);
    await expect(
      rustClient.database("sales").container("orders").item(order.id, order.customerId).read(),
    ).rejects.toThrow("Experimental Rust reads do not support client option 'httpClient'.");
    expect(sendRequest).toHaveBeenCalledOnce();
  });

  it("preserves the existing not-found response with explicit JavaScript selection", async () => {
    vi.stubEnv(environmentVariable, "javascript");
    sendRequest.mockImplementation(async (request) => ({
      request,
      status: 404,
      headers: createHttpHeaders(),
      bodyAsText: JSON.stringify({ message: "Not found" }),
    }));
    const response = await createClient()
      .database("sales")
      .container("orders")
      .item(order.id, order.customerId)
      .read();
    expect(response).toBeInstanceOf(ItemResponse);
    expect(response.statusCode).toBe(404);
    expect(response.resource).toBeUndefined();
    expect(sendRequest).toHaveBeenCalledOnce();
  });

  it("does not redirect other operations when Rust item reads are selected", async () => {
    vi.stubEnv(environmentVariable, "rust");
    await createClient().database("sales").read();
    expect(sendRequest).toHaveBeenCalledOnce();
    expect(sendRequest.mock.calls[0][0].url).toBe("https://localhost:8081/dbs/sales");
  });
});
