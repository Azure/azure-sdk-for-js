// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, PathUncheckedResponse } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert, describe, expect, it } from "vitest";
import type { AgentInsightRunResult } from "../../src/index.js";
import { AIProjectClient } from "../../src/index.js";
import type { TelephonyCampaignCreate } from "../../src/index.js";
import { getJobPoller, getRunPoller } from "../../src/static-helpers/pollingHelpers.js";

const runResult: AgentInsightRunResult = {
  traces_in_window: 4,
  traces_analyzed: 4,
  insights_created: 1,
  insights_updated: 0,
  insights_reopened: 0,
  token_usage: {
    input_tokens: 10,
    output_tokens: 5,
    total_tokens: 15,
  },
};

function createResponse(
  status: string,
  body: Record<string, unknown> | undefined,
  headers: Record<string, string> = {},
): PathUncheckedResponse {
  return {
    request: createPipelineRequest({
      url: "https://example.com/agent-insight-monitors/monitor-1/runs",
      method: "POST",
    }),
    headers,
    status,
    body,
  };
}

function createClient(...pollResponses: PathUncheckedResponse[]): Client {
  return getClient("https://example.com", { httpClient: createHttpClient(pollResponses) });
}

function createHttpClient(
  pollResponses: PathUncheckedResponse[],
  requests: PipelineRequest[] = [],
): HttpClient {
  const responses = [...pollResponses];
  return {
    sendRequest: async (request) => {
      requests.push(request);
      const response = responses.shift();
      if (!response) {
        throw new Error("No poll response configured");
      }
      return {
        request,
        status: Number(response.status),
        headers: createHttpHeaders({
          "content-type": "application/json",
          ...response.headers,
        }),
        bodyAsText: JSON.stringify(response.body),
      };
    },
  };
}

describe("identified long-running operation pollers", function () {
  it("exposes the Agent Insights run id through every state channel", async function () {
    const initialResponse = createResponse(
      "202",
      { id: "run-1", status: "queued" },
      { "operation-location": "https://example.com/operations/operation-1" },
    );
    const pollResponse = createResponse("200", {
      status: "succeeded",
      result: runResult,
    });

    const poller = getRunPoller(createClient(pollResponse), async () => runResult, ["200", "202"], {
      getInitialResponse: async () => initialResponse,
      resourceLocationConfig: "operation-location",
    });

    await poller.submitted();
    assert.equal(poller.operationState?.runId, "run-1");
    assert.notProperty(poller.operationState!, "jobId");

    let progressRunId: string | undefined;
    poller.onProgress((state) => {
      progressRunId = state.runId;
    });

    const state = await poller.poll();
    assert.equal(state.runId, "run-1");
    assert.equal(progressRunId, "run-1");

    const serialized = await poller.serialize();
    assert.equal(JSON.parse(serialized).state.runId, "run-1");

    const restoredPoller = getRunPoller(createClient(), async () => runResult, ["200", "202"], {
      restoreFrom: serialized,
    });
    assert.equal(restoredPoller.operationState?.runId, "run-1");
  });

  describe("campaign operation resource handling", () => {
    const endpoint = "https://example.com/api/projects/test-project";
    const resourceUrl = `${endpoint}/agents/agent-1/telephony_campaigns/campaign-1`;
    const campaign: TelephonyCampaignCreate = {
      connection_name: "unit-test-connection",
      source: { type: "phone_number", value: "+12025550100" },
      recipients: [{ destination: { type: "phone_number", value: "+12025550101" } }],
    };
    const resource = {
      ...campaign,
      name: "campaign-1",
      status: "running",
      created_at: 0,
      updated_at: 1,
      etag: '"campaign-etag"',
      operation_id: "a-later-action",
      progress: { pending: 1, active: 0, completed: 0, failed: 0, cancelled: 0, expired: 0 },
    };

    function client(
      requests: PipelineRequest[],
      ...responses: PathUncheckedResponse[]
    ): AIProjectClient {
      return new AIProjectClient(
        endpoint,
        { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
        { httpClient: createHttpClient(responses, requests), retryOptions: { maxRetries: 0 } },
      );
    }

    it("guards the create poller's final GET with the accepted operation id", async () => {
      const requests: PipelineRequest[] = [];
      const project = client(
        requests,
        createResponse("201", resource, {
          "operation-location": `${resourceUrl}/operations/accepted-key?api-version=v1`,
          "operation-id": "accepted-key",
          location: resourceUrl,
        }),
        createResponse("200", {
          id: "accepted-key",
          kind: "validation",
          status: "succeeded",
          created_at: 0,
          finished_at: 1,
        }),
        createResponse("200", resource),
      );
      const poller = project.beta.voiceAgents.campaigns.create("agent-1", "campaign-1", campaign, {
        updateIntervalInMs: 0,
        requestOptions: { headers: { "x-unit-header": "kept" } },
      });
      const result = await poller.pollUntilDone();
      assert.equal(result.name, "campaign-1");
      assert.lengthOf(requests, 3);
      assert.equal(new URL(requests[0].url).searchParams.has("operation_id"), false);
      assert.equal(new URL(requests[2].url).searchParams.get("operation_id"), "accepted-key");
      assert.equal(requests[2].headers.get("foundry-features"), "VoiceAgents=V1Preview");
      assert.equal(requests[2].headers.get("x-unit-header"), "kept");
      const serialized = JSON.parse(await poller.serialize());
      assert.equal(
        new URL(serialized.state.config.resourceLocation).searchParams.get("operation_id"),
        "accepted-key",
      );
    });

    it("retrieves the guarded business resource after a cancellation monitor succeeds", async () => {
      const requests: PipelineRequest[] = [];
      const project = client(
        requests,
        createResponse(
          "202",
          { id: "cancel-key", kind: "cancel", status: "in_progress", created_at: 0 },
          {
            "operation-location": `${resourceUrl}/operations/cancel-key?api-version=v1`,
            "operation-id": "cancel-key",
          },
        ),
        createResponse("200", {
          id: "cancel-key",
          kind: "cancel",
          status: "succeeded",
          created_at: 0,
        }),
        createResponse("200", { ...resource, status: "cancelled" }),
      );
      const result = await project.beta.voiceAgents.campaigns
        .cancel("agent-1", "campaign-1", '"campaign-etag"', { updateIntervalInMs: 0 })
        .pollUntilDone();
      assert.equal(result.status, "cancelled");
      assert.lengthOf(requests, 3);
      assert.equal(new URL(requests[2].url).pathname, new URL(resourceUrl).pathname);
      assert.equal(new URL(requests[2].url).searchParams.get("operation_id"), "cancel-key");
    });

    it("rejects an operation-monitor id that differs from the accepted id", async () => {
      const requests: PipelineRequest[] = [];
      const project = client(
        requests,
        createResponse("201", resource, {
          "operation-location": `${resourceUrl}/operations/accepted-key?api-version=v1`,
          "operation-id": "accepted-key",
        }),
        createResponse("200", {
          id: "another-key",
          kind: "validation",
          status: "succeeded",
          created_at: 0,
        }),
      );
      await expect(
        project.beta.voiceAgents.campaigns
          .create("agent-1", "campaign-1", campaign, { updateIntervalInMs: 0 })
          .pollUntilDone(),
      ).rejects.toThrow(/does not match the initiating Operation-Id/);
      assert.lengthOf(requests, 2);
    });

    it("rejects a missing acceptance id instead of making an unguarded final GET", async () => {
      const requests: PipelineRequest[] = [];
      const project = client(
        requests,
        createResponse("201", resource, {
          "operation-location": `${resourceUrl}/operations/accepted-key?api-version=v1`,
        }),
        createResponse("200", {
          id: "accepted-key",
          kind: "validation",
          status: "succeeded",
          created_at: 0,
        }),
      );
      await expect(
        project.beta.voiceAgents.campaigns
          .create("agent-1", "campaign-1", campaign, { updateIntervalInMs: 0 })
          .pollUntilDone(),
      ).rejects.toThrow(/missing its Operation-Id header/);
      assert.lengthOf(requests, 2);
    });

    it("finishes a bodyless delete LRO without fetching a deleted campaign", async () => {
      const requests: PipelineRequest[] = [];
      const project = client(
        requests,
        createResponse("202", undefined, {
          "operation-location": `${resourceUrl}/operations/delete-key?api-version=v1`,
          "operation-id": "delete-key",
        }),
        createResponse("200", {
          id: "delete-key",
          kind: "delete",
          status: "succeeded",
          created_at: 0,
        }),
      );
      await project.beta.voiceAgents.campaigns
        .deleteCampaign("agent-1", "campaign-1", '"campaign-etag"', { updateIntervalInMs: 0 })
        .pollUntilDone();
      assert.lengthOf(requests, 2);
    });
  });
  it("extracts the run id from the resource location when the response body omits it", async function () {
    const initialResponse = createResponse(
      "202",
      { status: "queued" },
      {
        location: "https://example.com/agent-insight-monitors/monitor-1/runs/run%2042",
        "operation-location": "https://example.com/operations/operation-1",
      },
    );
    const poller = getRunPoller(createClient(), async () => runResult, ["202"], {
      getInitialResponse: async () => initialResponse,
      resourceLocationConfig: "operation-location",
    });

    await poller.submitted();
    assert.equal(poller.operationState?.runId, "run 42");
  });

  it("does not treat the polling operation id as the run id", async function () {
    const initialResponse = createResponse(
      "202",
      { status: "queued" },
      { "operation-location": "https://example.com/operations/operation-1" },
    );
    const poller = getRunPoller(createClient(), async () => runResult, ["202"], {
      getInitialResponse: async () => initialResponse,
      resourceLocationConfig: "operation-location",
    });

    await poller.submitted();
    assert.isUndefined(poller.operationState?.runId);
  });

  it("keeps job identifiers on the existing JobPoller shape", async function () {
    const initialResponse = createResponse(
      "202",
      { id: "job-1", status: "queued" },
      { "operation-location": "https://example.com/operations/operation-1" },
    );
    const poller = getJobPoller(createClient(), async () => "done", ["202"], {
      getInitialResponse: async () => initialResponse,
      resourceLocationConfig: "operation-location",
    });

    await poller.submitted();
    assert.equal(poller.operationState?.jobId, "job-1");
    assert.notProperty(poller.operationState!, "runId");
  });
});
