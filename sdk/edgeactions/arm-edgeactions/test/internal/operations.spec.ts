// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { inspect } from "node:util";
import { NoOpCredential } from "@azure-tools/test-credential";
import { AbortError } from "@azure/abort-controller";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type { OperationState, PollerLike } from "@azure/core-lro";
import { EdgeActionsManagementClient, restorePoller } from "../../src/index.js";
import { createEdgeActionsManagement } from "../../src/api/index.js";
import { completeLro, responsePolicy, urlKey } from "../utils/responseSpec.js";
import type { CapturedResponse } from "../utils/responseSpec.js";

const subscription = "00000000-0000-0000-0000-000000000000";
const root = `https://management.azure.com/subscriptions/${subscription}`;
const resource = `${root}/resourceGroups/test/providers/Microsoft.Cdn/edgeActions/action`;
const version = `${resource}/versions/v1`;
const filter = `${resource}/executionFilters/filter`;
const apiVersion = "2026-10-01";
const statusUrl = `${root}/providers/Microsoft.Cdn/locations/global/operationStatuses/operation?api-version=${apiVersion}`;
const locationUrl = `${root}/providers/Microsoft.Cdn/locations/global/operationResults/operation?api-version=${apiVersion}`;
const polling = { updateIntervalInMs: 0 };
const edgeAction = {
  id: resource,
  name: "action",
  type: "Microsoft.Cdn/edgeActions",
  location: "global",
  sku: { name: "Standard", tier: "Standard" },
  properties: { provisioningState: "Succeeded", attachments: [] },
};
const edgeVersion = {
  id: version,
  name: "v1",
  type: "Microsoft.Cdn/edgeActions/versions",
  location: "global",
  properties: {
    provisioningState: "Succeeded",
    deploymentType: "file",
    isDefaultVersion: "True",
    validationStatus: "Succeeded",
  },
};
const executionFilter = {
  id: filter,
  name: "filter",
  type: "Microsoft.Cdn/edgeActions/executionFilters",
  location: "global",
  properties: {
    provisioningState: "Succeeded",
    versionId: version,
    executionFilterIdentifierHeaderName: "x-sdk-test",
    executionFilterIdentifierHeaderValue: "test",
  },
};

interface Reply {
  method: string;
  url: string;
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function setup(replies: Reply[]) {
  const responses: CapturedResponse[] = [];
  const requests: PipelineRequest[] = [];
  let index = 0;
  const httpClient: HttpClient = {
    async sendRequest(request) {
      if (request.abortSignal?.aborted) throw new AbortError();
      const reply = replies[index++];
      expect(reply, "Unexpected HTTP request").toBeDefined();
      expect(request.method).toBe(reply.method);
      const expected = new URL(reply.url);
      if (!expected.searchParams.has("api-version"))
        expected.searchParams.set("api-version", apiVersion);
      expect(
        new URL(request.url).searchParams.getAll("api-version"),
        "Transport requests must include exactly one expected API version.",
      ).toEqual([apiVersion]);
      expect(urlKey(request.url)).toBe(urlKey(expected.href));
      requests.push(request);
      return {
        request,
        status: reply.status,
        headers: createHttpHeaders({ "content-type": "application/json", ...reply.headers }),
        bodyAsText: reply.body === undefined ? undefined : JSON.stringify(reply.body),
      };
    },
  };
  const credential = new NoOpCredential();
  const options = {
    httpClient,
    retryOptions: { maxRetries: 0 },
    additionalPolicies: [{ policy: responsePolicy(responses), position: "perCall" as const }],
  };
  return {
    client: new EdgeActionsManagementClient(credential, subscription, options),
    context: createEdgeActionsManagement(credential, subscription, options),
    httpClient,
    responses,
    requests,
    assertConsumed() {
      expect(index).toBe(replies.length);
    },
  };
}

interface Scenario {
  name: string;
  method: string;
  url: string;
  result?: Record<string, unknown> & { properties?: Record<string, unknown> };
  start(client: EdgeActionsManagementClient): PollerLike<OperationState<unknown>, unknown>;
}

const scenarios: Scenario[] = [
  {
    name: "create action",
    method: "PUT",
    url: resource,
    result: edgeAction,
    start: (c) => c.edgeActions.create("test", "action", edgeAction, polling),
  },
  {
    name: "create version",
    method: "PUT",
    url: version,
    result: edgeVersion,
    start: (c) => c.edgeActionVersions.create("test", "action", "v1", edgeVersion, polling),
  },
  {
    name: "create filter",
    method: "PUT",
    url: filter,
    result: executionFilter,
    start: (c) =>
      c.edgeActionExecutionFilters.create("test", "action", "filter", executionFilter, polling),
  },
  {
    name: "update action",
    method: "PATCH",
    url: resource,
    result: edgeAction,
    start: (c) => c.edgeActions.update("test", "action", { tags: {} }, polling),
  },
  {
    name: "update version",
    method: "PATCH",
    url: version,
    result: edgeVersion,
    start: (c) => c.edgeActionVersions.update("test", "action", "v1", { tags: {} }, polling),
  },
  {
    name: "update filter",
    method: "PATCH",
    url: filter,
    result: executionFilter,
    start: (c) =>
      c.edgeActionExecutionFilters.update("test", "action", "filter", { tags: {} }, polling),
  },
  {
    name: "delete action",
    method: "DELETE",
    url: resource,
    start: (c) => c.edgeActions.delete("test", "action", polling),
  },
  {
    name: "delete version",
    method: "DELETE",
    url: version,
    start: (c) => c.edgeActionVersions.delete("test", "action", "v1", polling),
  },
  {
    name: "delete filter",
    method: "DELETE",
    url: filter,
    start: (c) => c.edgeActionExecutionFilters.delete("test", "action", "filter", polling),
  },
  {
    name: "deploy code",
    method: "POST",
    url: `${version}/deployVersionCode`,
    result: edgeVersion,
    start: (c) =>
      c.edgeActionVersions.deployVersionCode(
        "test",
        "action",
        "v1",
        { name: "handler", content: "YQ==" },
        polling,
      ),
  },
  {
    name: "get code",
    method: "POST",
    url: `${version}/getVersionCode`,
    result: { name: "handler", content: "YQ==" },
    start: (c) => c.edgeActionVersions.getVersionCode("test", "action", "v1", polling),
  },
  {
    name: "swap default",
    method: "POST",
    url: `${version}/swapDefault`,
    start: (c) => c.edgeActionVersions.swapDefault("test", "action", "v1", polling),
  },
];

describe("Edge Actions SDK HTTP contracts (no network)", () => {
  it.each([
    "",
    "?api-version=2025-12-01-preview",
    `?api-version=${apiVersion}&api-version=${apiVersion}`,
  ])("rejects missing, incorrect, or duplicate transport API versions %#", async (query) => {
    const test = setup([{ method: "GET", url: resource, status: 200, body: edgeAction }]);
    await expect(
      test.httpClient.sendRequest(createPipelineRequest({ url: `${resource}${query}` })),
    ).rejects.toThrow("Transport requests must include exactly one expected API version.");
    test.assertConsumed();
  });

  it.each(scenarios)("handles synchronous completion of $name", async (scenario) => {
    const test = setup([
      {
        method: scenario.method,
        url: scenario.url,
        status: scenario.result ? 200 : 204,
        body: scenario.result,
      },
    ]);
    const result = await completeLro(test.context, test.responses, () =>
      scenario.start(test.client),
    );
    if (scenario.result) expect(result).toMatchObject(scenario.result);
    else expect(result).toBeUndefined();
    test.assertConsumed();
  });

  it("handles Location-only polling without an operation-status header", async () => {
    const test = setup([
      {
        method: "POST",
        url: `${version}/getVersionCode`,
        status: 202,
        headers: { location: locationUrl },
      },
      { method: "GET", url: locationUrl, status: 202 },
      { method: "GET", url: locationUrl, status: 200, body: { name: "handler", content: "YQ==" } },
    ]);
    expect(
      await completeLro(test.context, test.responses, () =>
        test.client.edgeActionVersions.getVersionCode("test", "action", "v1", polling),
      ),
    ).toEqual({ name: "handler", content: "YQ==" });
    test.assertConsumed();
  });

  it("retains the API version when polling headers omit it", async () => {
    const test = setup([
      {
        method: "DELETE",
        url: resource,
        status: 202,
        headers: {
          "azure-asyncoperation": statusUrl.split("?")[0],
          location: locationUrl.split("?")[0],
        },
      },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Succeeded" } },
      { method: "GET", url: locationUrl, status: 204 },
    ]);
    expect(
      await completeLro(test.context, test.responses, () =>
        test.client.edgeActions.delete("test", "action", polling),
      ),
    ).toBeUndefined();
    test.assertConsumed();
  });

  it("serializes and restores a poller without repeating the initial request", async () => {
    const test = setup([
      {
        method: "POST",
        url: `${version}/getVersionCode`,
        status: 202,
        headers: { "azure-asyncoperation": statusUrl, location: locationUrl },
      },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Succeeded" } },
      { method: "GET", url: locationUrl, status: 200, body: { name: "handler", content: "YQ==" } },
    ]);
    const original = test.client.edgeActionVersions.getVersionCode("test", "action", "v1", polling);
    await original.submitted();
    const resumed = restorePoller(
      test.client,
      await original.serialize(),
      test.client.edgeActionVersions.getVersionCode,
      polling,
    );
    expect(await resumed.pollUntilDone()).toEqual({ name: "handler", content: "YQ==" });
    expect(resumed.isDone).toBe(true);
    test.assertConsumed();
  });

  it("does not expose signed URLs when polling headers identify the same URL", async () => {
    const secret = "signed-query-do-not-log";
    const signedUrl = `${statusUrl}&sig=${secret}`;
    const test = setup([
      {
        method: "POST",
        url: `${version}/getVersionCode`,
        status: 202,
        headers: { "azure-asyncoperation": signedUrl, location: signedUrl },
      },
      { method: "GET", url: signedUrl, status: 200, body: { status: "Succeeded" } },
      { method: "GET", url: signedUrl, status: 200, body: { name: "handler", content: "YQ==" } },
    ]);
    const failure = await completeLro(test.context, test.responses, () =>
      test.client.edgeActionVersions.getVersionCode("test", "action", "v1", polling),
    ).catch((error: unknown) => error);
    expect(failure).toMatchObject({
      message: "Azure-AsyncOperation and Location must identify different URLs.",
      actual: false,
      expected: true,
    });
    expect(inspect(failure)).not.toContain(secret);
    test.assertConsumed();
  });

  it.each(scenarios)("polls $name and returns its declared result", async (scenario) => {
    const put = scenario.method === "PUT";
    const finalUrl = put ? scenario.url : locationUrl;
    const replies: Reply[] = [
      {
        method: scenario.method,
        url: scenario.url,
        status: put ? 201 : 202,
        body: put
          ? {
              ...scenario.result,
              properties: {
                ...scenario.result?.properties,
                provisioningState: "Provisioning",
              },
            }
          : undefined,
        headers: {
          "azure-asyncoperation": statusUrl,
          "retry-after": "0",
          ...(!put ? { location: locationUrl } : {}),
        },
      },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Running" } },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Succeeded" } },
    ];
    if (scenario.method !== "DELETE") {
      replies.push({
        method: "GET",
        url: finalUrl,
        status: scenario.result ? 200 : 204,
        body: scenario.result,
      });
    }
    if (scenario.method === "DELETE") {
      replies.push({
        method: "GET",
        url: locationUrl,
        status: scenario.result ? 200 : 204,
        body: scenario.result,
      });
    }
    const test = setup(replies);
    const result = await completeLro(test.context, test.responses, () =>
      scenario.start(test.client),
    );
    if (scenario.result) expect(result).toMatchObject(scenario.result);
    else expect(result).toBeUndefined();
    test.assertConsumed();
  });

  it("keeps swapDefault working without depending on its known incorrect Location body", async () => {
    const test = setup([
      {
        method: "POST",
        url: `${version}/swapDefault`,
        status: 202,
        headers: { "azure-asyncoperation": statusUrl, location: locationUrl },
      },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Succeeded" } },
      {
        method: "GET",
        url: locationUrl,
        status: 200,
        body: { properties: { arbitrary: "not the operation result" } },
      },
    ]);
    expect(
      await completeLro(test.context, test.responses, () =>
        test.client.edgeActionVersions.swapDefault("test", "action", "v1", polling),
      ),
    ).toBeUndefined();
    test.assertConsumed();
  });

  it("surfaces an asynchronous failure instead of returning a successful model", async () => {
    const test = setup([
      {
        method: "POST",
        url: `${version}/deployVersionCode`,
        status: 202,
        headers: { "azure-asyncoperation": statusUrl, location: locationUrl },
      },
      {
        method: "GET",
        url: statusUrl,
        status: 200,
        body: { status: "Failed", error: { code: "InvalidCode", message: "Invalid handler" } },
      },
    ]);
    await expect(
      test.client.edgeActionVersions
        .deployVersionCode("test", "action", "v1", { name: "handler", content: "YQ==" }, polling)
        .pollUntilDone(),
    ).rejects.toThrow(/Invalid/);
    test.assertConsumed();
  });

  it("supports aborting after the initial response", async () => {
    const test = setup([
      {
        method: "POST",
        url: `${version}/getVersionCode`,
        status: 202,
        headers: { "azure-asyncoperation": statusUrl, location: locationUrl },
      },
      { method: "GET", url: statusUrl, status: 200, body: { status: "Running" } },
    ]);
    const poller = test.client.edgeActionVersions.getVersionCode("test", "action", "v1", polling);
    await poller.poll();
    const controller = new AbortController();
    controller.abort();
    await expect(poller.pollUntilDone({ abortSignal: controller.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
    test.assertConsumed();
  });

  it.each([400, 404, 500])("preserves HTTP %i service errors", async (status) => {
    const test = setup([
      {
        method: "GET",
        url: resource,
        status,
        body: { error: { code: "TestError", message: "Test failure" } },
      },
    ]);
    await expect(test.client.edgeActions.get("test", "action")).rejects.toMatchObject({
      statusCode: status,
      code: "TestError",
    });
    test.assertConsumed();
  });

  it.each([
    {
      name: "subscription",
      url: `${root}/providers/Microsoft.Cdn/edgeActions`,
      item: edgeAction,
      list: (c: EdgeActionsManagementClient) => c.edgeActions.listBySubscription(),
    },
    {
      name: "resource group",
      url: resource.slice(0, resource.lastIndexOf("/")),
      item: edgeAction,
      list: (c: EdgeActionsManagementClient) => c.edgeActions.listByResourceGroup("test"),
    },
    {
      name: "versions",
      url: `${resource}/versions`,
      item: edgeVersion,
      list: (c: EdgeActionsManagementClient) =>
        c.edgeActionVersions.listByEdgeAction("test", "action"),
    },
    {
      name: "filters",
      url: `${resource}/executionFilters`,
      item: executionFilter,
      list: (c: EdgeActionsManagementClient) =>
        c.edgeActionExecutionFilters.listByEdgeAction("test", "action"),
    },
  ])("paginates $name including an empty final page", async (scenario) => {
    const nextLink = `${scenario.url}?api-version=${apiVersion}&$skiptoken=next`;
    const test = setup([
      { method: "GET", url: scenario.url, status: 200, body: { value: [scenario.item], nextLink } },
      { method: "GET", url: nextLink, status: 200, body: { value: [] } },
      { method: "GET", url: nextLink, status: 200, body: { value: [] } },
    ]);
    const pages = scenario.list(test.client).byPage();
    const first = await pages.next();
    expect(first.value).toHaveLength(1);
    const second = await pages.next();
    expect(second.value).toHaveLength(0);
    expect((await pages.next()).done).toBe(true);
    const resumed = scenario.list(test.client).byPage({ continuationToken: nextLink });
    expect((await resumed.next()).value).toHaveLength(0);
    expect((await resumed.next()).done).toBe(true);
    test.assertConsumed();
  });
});
