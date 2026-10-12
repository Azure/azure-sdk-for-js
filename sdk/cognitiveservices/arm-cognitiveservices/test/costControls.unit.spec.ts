/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { CognitiveServicesManagementClient } from "../src/cognitiveServicesManagementClient.js";
import type { CostControl, CostControlRule } from "../src/models/index.js";
import { describe, expect, it } from "vitest";

interface MockResponse {
  status?: number;
  body?: unknown;
  bodyFactory?: (request: PipelineRequest) => unknown;
}

const subscriptionId = "00000000-0000-0000-0000-000000000000";
const resourceGroupName = "test-resource-group";
const accountName = "test-account";
const costControlName = "test-cost-control";
const resourceId = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/${accountName}/costControls/${costControlName}`;

function createClient(...responses: MockResponse[]): {
  client: CognitiveServicesManagementClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) {
        throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      }
      const body = response.bodyFactory ? response.bodyFactory(request) : response.body;
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: body === undefined ? undefined : JSON.stringify(body),
      };
    },
  };

  return {
    client: new CognitiveServicesManagementClient(
      { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
      subscriptionId,
      {
        endpoint: "https://management.azure.com",
        httpClient,
        retryOptions: { maxRetries: 0 },
      },
    ),
    requests,
  };
}

function createRule(amount: number): CostControlRule {
  return {
    name: "account-budget",
    counterKey: [{ type: "account" }],
    unit: "usd",
    amount,
    period: "month",
    recurring: true,
    thresholds: [{ type: "percentage", value: 0, action: "audit" }],
  };
}

function response(displayName: string, amount: number, etag: string): CostControl {
  return {
    id: resourceId,
    name: costControlName,
    type: "Microsoft.CognitiveServices/accounts/costControls",
    etag,
    properties: { displayName, rules: [createRule(amount)] },
  };
}

function requestBody(request: PipelineRequest): unknown {
  if (typeof request.body !== "string") {
    throw new Error("Expected a string request body.");
  }
  return JSON.parse(request.body);
}

describe("Cost Controls wire operations", () => {
  it("sends CRUD, ETag, threshold, and paging details", async () => {
    const created = response("Cost Control", 25, '"etag-1"');
    const updated = response("Cost Control updated", 50, '"etag-2"');
    const { client, requests } = createClient(
      { status: 201, body: created },
      { body: created },
      {
        bodyFactory: (request) => ({
          value: [created],
          nextLink: `${request.url}&$skiptoken=next`,
        }),
      },
      { body: { value: [updated] } },
      { body: updated },
      { status: 204 },
      {
        status: 404,
        body: { error: { code: "ResourceNotFound", message: "Cost Control not found." } },
      },
    );

    const createResult = await client.costControls.createOrUpdate(
      resourceGroupName,
      accountName,
      costControlName,
      { properties: { displayName: "Cost Control", rules: [createRule(25)] } },
      { ifNoneMatch: "*" },
    );
    expect(createResult.etag).toBe('"etag-1"');
    expect(requests[0].method).toBe("PUT");
    const createUrl = new URL(requests[0].url);
    expect(createUrl.pathname).toBe(resourceId);
    expect(createUrl.searchParams.get("api-version")).toBeTruthy();
    expect(requests[0].headers.get("if-none-match")).toBe("*");
    expect(requestBody(requests[0])).toEqual({
      properties: {
        displayName: "Cost Control",
        rules: [
          {
            name: "account-budget",
            counterKey: [{ type: "account" }],
            unit: "usd",
            amount: 25,
            period: "month",
            recurring: true,
            thresholds: [{ type: "percentage", value: 0, action: "audit" }],
          },
        ],
      },
    });

    const getResult = await client.costControls.get(
      resourceGroupName,
      accountName,
      costControlName,
    );
    expect(getResult.properties?.rules[0].thresholds?.[0]).toEqual({
      type: "percentage",
      value: 0,
      action: "audit",
    });

    const listed: CostControl[] = [];
    for await (const item of client.costControls.list(resourceGroupName, accountName)) {
      listed.push(item);
    }
    expect(listed.map((item) => item.properties?.displayName)).toEqual([
      "Cost Control",
      "Cost Control updated",
    ]);
    expect(requests[3].url).toBe(`${requests[2].url}&$skiptoken=next`);

    const updateResult = await client.costControls.update(
      resourceGroupName,
      accountName,
      costControlName,
      {
        properties: {
          displayName: "Cost Control updated",
          rules: [createRule(50)],
        },
      },
      { ifMatch: '"etag-1"' },
    );
    expect(updateResult.properties?.rules[0].amount).toBe(50);
    expect(requests[4].method).toBe("PATCH");
    expect(requests[4].headers.get("if-match")).toBe('"etag-1"');
    expect(requestBody(requests[4])).toMatchObject({
      properties: { displayName: "Cost Control updated", rules: [{ amount: 50 }] },
    });

    await client.costControls.delete(resourceGroupName, accountName, costControlName, {
      ifMatch: '"etag-2"',
    });
    expect(requests[5].method).toBe("DELETE");
    expect(requests[5].headers.get("if-match")).toBe('"etag-2"');

    await expect(
      client.costControls.get(resourceGroupName, accountName, costControlName),
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(requests[6].method).toBe("GET");
  });
});
