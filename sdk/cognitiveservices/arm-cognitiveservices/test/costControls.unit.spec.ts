/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { CognitiveServicesManagementClient } from "../src/cognitiveServicesManagementClient.js";
import type { AccountCostControlsOperations } from "../src/classic/accountCostControls/index.js";
import type { AccountCostControl, CostControlProperties } from "../src/models/index.js";
import {
  KnownCostControlCategory,
  KnownCostControlFilterName,
  KnownCostControlGroupingName,
  KnownCostControlThresholdType,
  KnownCostControlTimeGrain,
} from "../src/models/index.js";
import { describe, expect, it } from "vitest";

interface MockResponse {
  status?: number;
  body?: unknown;
  bodyFactory?: (request: PipelineRequest) => unknown;
}

const subscriptionId = "00000000-0000-0000-0000-000000000000";
const resourceGroupName = "test-resource-group";
const accountName = "test-account";
const projectName = "test-project";
const costControlName = "test-cost-control";
const accountId = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/${accountName}`;
const startDate = new Date("2026-11-01T00:00:00.000Z");
const endDate = new Date("2027-11-01T00:00:00.000Z");

function createProperties(amount: number): CostControlProperties {
  return {
    category: KnownCostControlCategory.Cost,
    amount,
    timeGrain: KnownCostControlTimeGrain.Monthly,
    timePeriod: { startDate, endDate },
  };
}

function createClient(
  scope: "account" | "project",
  ...responses: MockResponse[]
): { operations: AccountCostControlsOperations; requests: PipelineRequest[] } {
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
  const client = new CognitiveServicesManagementClient(
    { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
    subscriptionId,
    {
      endpoint: "https://management.azure.com",
      httpClient,
      retryOptions: { maxRetries: 0 },
    },
  );
  const operations: AccountCostControlsOperations =
    scope === "account"
      ? client.accountCostControls
      : {
          createOrUpdate: (group, account, name, resource, options) =>
            client.projectCostControls.createOrUpdate(
              group,
              account,
              projectName,
              name,
              resource,
              options,
            ),
          get: (group, account, name, options) =>
            client.projectCostControls.get(group, account, projectName, name, options),
          checkExistence: (group, account, name, options) =>
            client.projectCostControls.checkExistence(group, account, projectName, name, options),
          list: (group, account, options) =>
            client.projectCostControls.list(group, account, projectName, options),
          update: (group, account, name, patch, options) =>
            client.projectCostControls.update(group, account, projectName, name, patch, options),
          delete: (group, account, name, options) =>
            client.projectCostControls.delete(group, account, projectName, name, options),
        };
  return { operations, requests };
}

function requestBody(request: PipelineRequest): unknown {
  if (typeof request.body !== "string") {
    throw new Error("Expected a string request body.");
  }
  return JSON.parse(request.body);
}

describe.each(["account", "project"] as const)("Cost Controls %s wire operations", (scope) => {
  const ownerId = scope === "account" ? accountId : `${accountId}/projects/${projectName}`;
  const resourceId = `${ownerId}/costControls/${costControlName}`;

  function response(amount: number, etag: string): AccountCostControl {
    return {
      id: resourceId,
      name: costControlName,
      type: `Microsoft.CognitiveServices/accounts/${scope === "project" ? "projects/" : ""}costControls`,
      etag,
      properties: { ...createProperties(amount), provider: "Microsoft.CognitiveServices" },
    };
  }

  it("sends CRUD, existence, ETag, and paging details", async () => {
    const created = response(25, '"etag-1"');
    const updated = response(50, '"etag-2"');
    const { operations, requests } = createClient(
      scope,
      { status: 201, body: created },
      { body: created },
      { status: 200 },
      {
        bodyFactory: (request) => ({
          value: [created],
          nextLink: `${request.url}&$skiptoken=next`,
        }),
      },
      { body: { value: [updated] } },
      { body: updated },
      { status: 204 },
      { status: 404 },
      {
        status: 404,
        body: { error: { code: "ResourceNotFound", message: "Cost Control not found." } },
      },
    );

    const result = await operations.createOrUpdate(
      resourceGroupName,
      accountName,
      costControlName,
      { properties: createProperties(25) },
      { ifNoneMatch: "*" },
    );
    expect(result).toEqual(created);
    expect(requests[0].method).toBe("PUT");
    const createUrl = new URL(requests[0].url);
    expect(createUrl.pathname).toBe(resourceId);
    expect(createUrl.searchParams.get("api-version")).toBe("2026-11-15-preview");
    expect(requests[0].headers.get("if-none-match")).toBe("*");
    expect(requestBody(requests[0])).toEqual({
      properties: {
        category: "Cost",
        amount: 25,
        timeGrain: "Monthly",
        timePeriod: {
          startDate: "2026-11-01T00:00:00.000Z",
          endDate: "2027-11-01T00:00:00.000Z",
        },
      },
    });

    const fetched = await operations.get(resourceGroupName, accountName, costControlName);
    expect(fetched.properties?.timePeriod).toEqual({ startDate, endDate });
    expect(requests[1].method).toBe("GET");
    await operations.checkExistence(resourceGroupName, accountName, costControlName);
    expect(requests[2].method).toBe("HEAD");

    const listed: AccountCostControl[] = [];
    for await (const item of operations.list(resourceGroupName, accountName)) {
      listed.push(item);
    }
    expect(listed.map((item) => item.properties?.amount)).toEqual([25, 50]);
    expect(new URL(requests[3].url).pathname).toBe(`${ownerId}/costControls`);
    expect(requests[4].url).toBe(`${requests[3].url}&$skiptoken=next`);

    const updateResult = await operations.update(
      resourceGroupName,
      accountName,
      costControlName,
      { properties: { amount: 50 } },
      { ifMatch: '"etag-1"' },
    );
    expect(updateResult.properties?.amount).toBe(50);
    expect(requests[5].method).toBe("PATCH");
    expect(requests[5].headers.get("if-match")).toBe('"etag-1"');
    expect(requestBody(requests[5])).toEqual({ properties: { amount: 50 } });

    await operations.delete(resourceGroupName, accountName, costControlName, {
      ifMatch: '"etag-2"',
    });
    expect(requests[6].method).toBe("DELETE");
    expect(requests[6].headers.get("if-match")).toBe('"etag-2"');
    await expect(
      operations.checkExistence(resourceGroupName, accountName, costControlName),
    ).rejects.toMatchObject({ statusCode: 404 });
    await expect(
      operations.get(resourceGroupName, accountName, costControlName),
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(requests.map((request) => new URL(request.url).pathname)).toEqual([
      resourceId,
      resourceId,
      resourceId,
      `${ownerId}/costControls`,
      `${ownerId}/costControls`,
      resourceId,
      resourceId,
      resourceId,
      resourceId,
    ]);
  });

  it("serializes token budgets with grouping, filters, notifications, and blocking actions", async () => {
    const properties: CostControlProperties = {
      ...createProperties(1000),
      provider: "Microsoft.CognitiveServices",
      category: KnownCostControlCategory.Tokens,
      grouping: [{ name: KnownCostControlGroupingName.SessionId, type: "AdditionalInfoKey" }],
      filter: {
        and: [
          {
            additionalInfo: {
              name: KnownCostControlFilterName.Project,
              operator: "In",
              values: [projectName],
            },
          },
          {
            additionalInfo: {
              name: KnownCostControlFilterName.Agent,
              operator: "In",
              values: ["test-agent"],
            },
          },
          {
            additionalInfo: {
              name: KnownCostControlFilterName.TokenType,
              operator: "In",
              values: ["input", "output"],
            },
          },
        ],
      },
      notifications: {
        budgetAlert: {
          eventGridConnectionId: `${accountId}/connections/test-event-grid`,
          thresholdType: KnownCostControlThresholdType.Percentage,
          threshold: 80,
          enabled: true,
          operator: "GreaterThanOrEqualTo",
        },
      },
      providerProperties: {
        actions: {
          budgetBlock: {
            type: "Block",
            thresholdType: KnownCostControlThresholdType.Absolute,
            threshold: 1000,
            operator: "GreaterThanOrEqualTo",
          },
        },
      },
    };
    const { operations, requests } = createClient(scope, { body: { properties } });
    const result = await operations.createOrUpdate(
      resourceGroupName,
      accountName,
      costControlName,
      { properties },
    );
    expect(requestBody(requests[0])).toEqual({
      properties: {
        provider: "Microsoft.CognitiveServices",
        category: "Tokens",
        amount: 1000,
        timeGrain: "Monthly",
        timePeriod: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        grouping: [{ name: "sessionId", type: "AdditionalInfoKey" }],
        filter: {
          and: [
            { additionalInfo: { name: "project", operator: "In", values: [projectName] } },
            { additionalInfo: { name: "agent", operator: "In", values: ["test-agent"] } },
            { additionalInfo: { name: "tokenType", operator: "In", values: ["input", "output"] } },
          ],
        },
        notifications: {
          budgetAlert: {
            eventGridConnectionId: `${accountId}/connections/test-event-grid`,
            thresholdType: "Percentage",
            threshold: 80,
            enabled: true,
            operator: "GreaterThanOrEqualTo",
          },
        },
        providerProperties: {
          actions: {
            budgetBlock: {
              type: "Block",
              thresholdType: "Absolute",
              threshold: 1000,
              operator: "GreaterThanOrEqualTo",
            },
          },
        },
      },
    });
    expect(result.properties).toEqual(properties);
  });

  it("sends partial dates, named notification/action edits, and empty grouping without defaults", async () => {
    const { operations, requests } = createClient(scope, { body: response(50, '"etag-2"') });
    await operations.update(resourceGroupName, accountName, costControlName, {
      properties: {
        amount: 50,
        grouping: [],
        timePeriod: { endDate },
        notifications: { budgetAlert: { enabled: false } },
        providerProperties: { actions: { budgetBlock: { threshold: 50 } } },
      },
    });
    expect(requestBody(requests[0])).toEqual({
      properties: {
        amount: 50,
        grouping: [],
        timePeriod: { endDate: "2027-11-01T00:00:00.000Z" },
        notifications: { budgetAlert: { enabled: false } },
        providerProperties: { actions: { budgetBlock: { threshold: 50 } } },
      },
    });
  });

  it.each([
    { description: "omitted properties", patch: {} },
    { description: "empty properties", patch: { properties: {} } },
  ])("preserves $description on the wire", async ({ patch }) => {
    const { operations, requests } = createClient(scope, { body: response(25, '"etag-1"') });
    await operations.update(resourceGroupName, accountName, costControlName, patch);
    expect(requestBody(requests[0])).toEqual(patch);
  });

  it("returns an empty list", async () => {
    const { operations } = createClient(scope, { body: { value: [] } });
    const listed: AccountCostControl[] = [];
    for await (const item of operations.list(resourceGroupName, accountName)) {
      listed.push(item);
    }
    expect(listed).toEqual([]);
  });

  it("surfaces conditional-update failures", async () => {
    const { operations, requests } = createClient(scope, {
      status: 412,
      body: { error: { code: "PreconditionFailed", message: "The ETag does not match." } },
    });
    await expect(
      operations.update(
        resourceGroupName,
        accountName,
        costControlName,
        { properties: { amount: 50 } },
        { ifMatch: '"stale-etag"' },
      ),
    ).rejects.toMatchObject({ statusCode: 412 });
    expect(requests[0].headers.get("if-match")).toBe('"stale-etag"');
  });
});
