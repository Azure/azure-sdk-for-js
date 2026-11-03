// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, PathUncheckedResponse } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert, describe, it } from "vitest";
import type { AgentInsightRunResult } from "../../src/index.js";
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
  body: Record<string, unknown>,
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
  const responses = [...pollResponses];
  const httpClient: HttpClient = {
    sendRequest: async (request) => {
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
  return getClient("https://example.com", { httpClient });
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
