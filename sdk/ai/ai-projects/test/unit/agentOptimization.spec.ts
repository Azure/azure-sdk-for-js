// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { AbortError } from "@azure/abort-controller";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, expectTypeOf, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  AgentOptimizationJobCreateParameters,
  AgentOptimizationJobResult,
  AgentOptimizationEstimateInputs,
  JobPoller,
} from "../../src/index.js";
import {
  agentOptimizationJobSerializer,
  agentOptimizationCandidateDeserializer,
} from "../../src/models/models.js";

const endpoint = "https://example.com/api/projects/test-project";
const input: AgentOptimizationJobCreateParameters = {
  optimization_model_configuration: { model: "test-model" },
  optimization_configuration: { type: "prompt_optimization" },
};
const candidate = {
  candidate_id: "candidate-1",
  job_id: "job-1",
  name: "candidate",
  status: "completed",
  started_at: 1_789_200_000,
  output: {
    type: "prompt_optimization",
    mutations: [{ type: "instructions", value: "Answer concisely." }],
  },
};

function mockClient(
  ...responses: { status?: number; body?: unknown; headers?: Record<string, string> }[]
): { client: AIProjectClient; requests: PipelineRequest[] } {
  const requests: PipelineRequest[] = [];
  const client = new AIProjectClient(
    endpoint,
    {
      getToken: async () => ({
        token: "unit-test-token",
        expiresOnTimestamp: Date.now() + 3600000,
      }),
    },
    {
      retryOptions: { maxRetries: 0 },
      httpClient: {
        async sendRequest(request) {
          if (request.abortSignal?.aborted) throw new AbortError();
          requests.push(request);
          const response = responses.shift();
          if (!response) throw new Error(`Unexpected request: ${request.url}`);
          return {
            request,
            status: response.status ?? 200,
            headers: createHttpHeaders({ "content-type": "application/json", ...response.headers }),
            bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
          };
        },
      },
    },
  );
  return { client, requests };
}

describe("GA optimization integration", () => {
  it("accepts create inputs without requiring or sending service-generated properties", () => {
    expect(JSON.parse(JSON.stringify(agentOptimizationJobSerializer(input)))).toEqual(input);
    expect(
      agentOptimizationJobSerializer({ ...input, id: "ignored" } as typeof input),
    ).not.toHaveProperty("id");
  });

  it("preserves job identity, request options, and the terminal result on the GA poller", async () => {
    const result: AgentOptimizationJobResult = { token_usage: [], latency_metrics: [] };
    const { client, requests } = mockClient(
      {
        status: 202,
        body: { id: "job-1", status: "queued" },
        headers: { "operation-location": `${endpoint}/agent_optimization_jobs/job-1` },
      },
      { body: { status: "succeeded", result } },
    );
    const poller = client.agents.createOptimizationJob(input, {
      requestOptions: { headers: { "x-test": "preserved" } },
      updateIntervalInMs: 0,
    });
    expectTypeOf(poller).toEqualTypeOf<JobPoller<AgentOptimizationJobResult>>();
    await poller.submitted();
    expect(poller.operationState?.jobId).toBe("job-1");
    expect(await poller.pollUntilDone()).toEqual(result);
    expect(poller.operationState?.jobId).toBe("job-1");
    expect(JSON.parse(String(requests[0].body))).toEqual(input);
    expect(requests[0].headers.get("x-test")).toBe("preserved");
    expect(requests[1].headers.get("x-test")).toBe("preserved");
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(JSON.parse(await poller.serialize()).state.jobId).toBe("job-1");
  });

  it("preserves candidate paging cursors, mutation expansion and headers", async () => {
    const { client, requests } = mockClient(
      { body: { data: [candidate], last_id: "candidate-1", has_more: true } },
      { body: { data: [], has_more: false } },
    );
    const items = [];
    for await (const item of client.agents.listOptimizationCandidates("job /1", {
      expand: ["mutations"],
      requestOptions: { headers: { "x-test": "paging" } },
    })) {
      items.push(item);
    }
    expect(items).toHaveLength(1);
    expect(items[0].output).toEqual(candidate.output);
    expect(items[0].started_at).toEqual(new Date(candidate.started_at * 1000));
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("candidate-1");
    expect(new URL(requests[1].url).searchParams.get("expand")).toBe("mutations");
    expect(new URL(requests[0].url).pathname).toContain("/job%20%2F1/candidates");
    for (const request of requests) {
      expect(request.headers.get("x-test")).toBe("paging");
      expect(request.headers.get("foundry-features")).toBeUndefined();
    }
  });

  it("serializes nested estimate inputs and deserializes estimate timestamps", async () => {
    const estimate: AgentOptimizationEstimateInputs = {
      optimization_model_configuration: { model: "optimizer" },
      optimization_configuration: {
        type: "agent_optimization",
        candidate_search_configuration: { max_candidates: 2 },
        agent_optimization_space: { target_attributes: ["instructions"] },
        evaluation_configuration: {
          evaluation_model: { model: "judge" },
          evaluators: [{ name: "builtin.coherence" }],
          training_set: {
            type: "target_completion",
            source: { type: "inline", test_cases: [{ query: "Hello" }] },
          },
        },
      },
    };
    const { client, requests } = mockClient({ body: { prices_as_of: 1_789_200_000 } });
    const result = await client.agents.estimateOptimizationJob(estimate);
    expect(JSON.parse(String(requests[0].body))).toEqual(estimate);
    expect(new URL(requests[0].url).pathname).toContain("/agent_optimization_jobs:estimate");
    expect(result.prices_as_of).toEqual(new Date(1_789_200_000_000));
  });

  it("gets and promotes candidates, then deletes a job", async () => {
    const { client, requests } = mockClient(
      { body: candidate },
      {
        body: {
          ...candidate,
          promotion: {
            promoted_agent: { type: "agent_reference", name: "agent", version: "2" },
            promoted_at: 1_789_200_000,
          },
        },
      },
      { status: 204 },
    );
    expect((await client.agents.getOptimizationCandidate("job", "candidate")).candidate_id).toBe(
      "candidate-1",
    );
    expect(
      (await client.agents.promoteOptimizationCandidate("job", "candidate")).promotion
        ?.promoted_agent.version,
    ).toBe("2");
    await client.agents.deleteOptimizationJob("job");
    expect(requests.map((request) => request.method)).toEqual(["GET", "POST", "DELETE"]);
    expect(new URL(requests[1].url).pathname).toContain("/candidates/candidate:promote");
  });

  it("keeps ErrorModel details when cancellation returns a service conflict", async () => {
    const error = { code: "conflict", message: "Job is terminal.", param: "jobId" };
    const { client } = mockClient({ status: 409, body: { error } });
    await expect(client.agents.cancelOptimizationJob("job")).rejects.toMatchObject({
      statusCode: 409,
      details: { error },
    });
  });

  it("accepts empty candidate output and unknown mutation discriminators", () => {
    expect(
      agentOptimizationCandidateDeserializer({ ...candidate, output: undefined }).output,
    ).toBeUndefined();
    expect(
      agentOptimizationCandidateDeserializer({
        ...candidate,
        output: { type: "prompt_optimization", mutations: [{ type: "future_attribute" }] },
      }).output,
    ).toMatchObject({ mutations: [{ type: "future_attribute" }] });
  });

  it("aborts a GA request without sending it", async () => {
    const { client, requests } = mockClient();
    const controller = new AbortController();
    controller.abort();
    await expect(
      client.agents.getOptimizationJob("job", { abortSignal: controller.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
    expect(requests).toHaveLength(0);
  });
});
