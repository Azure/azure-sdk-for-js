// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type { AgentOptimizationJob } from "../../src/index.js";

const endpoint = "https://example.com/api/projects/test-project";
const configuration = { type: "prompt_optimization" as const };
const job: AgentOptimizationJob = {
  id: "job-1",
  status: "queued",
  created_at: new Date(1000),
  updated_at: new Date(1000),
  run_duration_ms: 0,
  optimization_configuration: configuration,
  optimization_model_configuration: { model: "optimization-model" },
};
const wireJob = { ...job, created_at: 1, updated_at: 1 };
const candidate = {
  candidate_id: "candidate-1",
  job_id: job.id,
  name: "Candidate",
  status: "completed",
  started_at: 1,
  output: {
    type: "prompt_optimization",
    mutations: [{ type: "instructions", value: "Answer concisely." }],
  },
};

function createClient(
  ...responses: { status?: number; body?: unknown; headers?: Record<string, string> }[]
): { client: AIProjectClient; requests: PipelineRequest[] } {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({ "content-type": "application/json", ...response.headers }),
        bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
      };
    },
  };
  return {
    client: new AIProjectClient(
      endpoint,
      {
        getToken: async () => ({
          token: "unit-test-token",
          expiresOnTimestamp: Date.now() + 60000,
        }),
      },
      { httpClient, retryOptions: { maxRetries: 0 } },
    ),
    requests,
  };
}

describe("agent optimization integration", () => {
  it("preserves the job id and custom poll headers without the retired preview gate", async () => {
    const result = { token_usage: [], latency_metrics: [] };
    const { client, requests } = createClient(
      {
        status: 202,
        body: wireJob,
        headers: { "operation-location": `${endpoint}/operations/operation-1` },
      },
      { body: { status: "succeeded", result } },
    );
    const poller = client.agents.createOptimizationJob(job, {
      operationId: "operation-1",
      updateIntervalInMs: 0,
      requestOptions: { headers: { "x-custom": "preserved", "x-count": 2 } },
    });
    await poller.submitted();
    expect(poller.operationState?.jobId).toBe(job.id);
    expect(await poller.pollUntilDone()).toEqual(result);
    expect(JSON.parse(requests[0].body as string)).toEqual({
      optimization_configuration: configuration,
      optimization_model_configuration: { model: "optimization-model" },
    });
    expect(requests[0].headers.get("operation-id")).toBe("operation-1");
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("preserved");
      expect(request.headers.get("x-count")).toBe("2");
    }
  });

  it("paginates full job resources and forwards continuation headers", async () => {
    const { client, requests } = createClient(
      { body: { data: [wireJob], last_id: job.id, has_more: true } },
      { body: { data: [{ ...wireJob, id: "job-2" }], has_more: false } },
    );
    const jobs = [];
    for await (const item of client.agents.listOptimizationJobs({
      agentName: "agent",
      requestOptions: { headers: { "x-custom": "preserved" } },
    })) {
      jobs.push(item);
    }
    expect(jobs.map((item) => item.id)).toEqual([job.id, "job-2"]);
    expect(jobs[0].created_at).toEqual(new Date(1000));
    expect(new URL(requests[1].url).searchParams.get("after")).toBe(job.id);
    expect(new URL(requests[1].url).searchParams.get("agent_name")).toBe("agent");
    expect(requests[1].headers.get("x-custom")).toBe("preserved");
  });

  it("paginates candidates and deserializes expanded mutations", async () => {
    const { client, requests } = createClient(
      { body: { data: [candidate], last_id: candidate.candidate_id, has_more: true } },
      { body: { data: [], has_more: false } },
    );
    const candidates = [];
    for await (const item of client.agents.listOptimizationCandidates("job/1", {
      expand: ["mutations"],
      requestOptions: { headers: { "x-custom": "preserved" } },
    })) {
      candidates.push(item);
    }
    expect(candidates[0].output).toEqual(candidate.output);
    expect(candidates[0].started_at).toEqual(new Date(1000));
    expect(new URL(requests[0].url).pathname).toContain("/agent_optimization_jobs/job%2F1/");
    expect(new URL(requests[1].url).searchParams.get("after")).toBe(candidate.candidate_id);
    expect(new URL(requests[1].url).searchParams.get("expand")).toBe("mutations");
    expect(requests[1].headers.get("x-custom")).toBe("preserved");
  });

  it("gets and promotes candidates through the GA routes", async () => {
    const { client, requests } = createClient({ body: candidate }, { body: candidate });
    expect((await client.agents.getOptimizationCandidate(job.id, "candidate/1")).candidate_id).toBe(
      candidate.candidate_id,
    );
    await client.agents.promoteOptimizationCandidate(job.id, "candidate/1");
    expect(new URL(requests[0].url).pathname).toContain("/candidates/candidate%2F1");
    expect(new URL(requests[1].url).pathname).toContain("/candidates/candidate%2F1:promote");
    expect(requests[1].method).toBe("POST");
    expect(requests[1].headers.get("foundry-features")).toBeUndefined();
  });

  it("gets, cancels and deletes a job", async () => {
    const { client, requests } = createClient(
      { body: wireJob },
      { body: { ...wireJob, status: "cancelled" } },
      { status: 204 },
    );
    expect((await client.agents.getOptimizationJob(job.id)).id).toBe(job.id);
    expect((await client.agents.cancelOptimizationJob(job.id)).status).toBe("cancelled");
    await client.agents.deleteOptimizationJob(job.id);
    expect(requests.map((request) => request.method)).toEqual(["GET", "POST", "DELETE"]);
    expect(new URL(requests[1].url).pathname).toContain(`${job.id}:cancel`);
  });

  it("preserves service error details", async () => {
    const { client } = createClient({
      status: 404,
      body: {
        error: { code: "not_found", message: "Candidate not found.", param: "candidate_id" },
      },
    });
    await expect(client.agents.getOptimizationCandidate(job.id, "missing")).rejects.toMatchObject({
      statusCode: 404,
      details: { error: { code: "not_found", param: "candidate_id" } },
    });
  });

  it("forwards cancellation to the HTTP transport", async () => {
    const { client, requests } = createClient({ body: candidate });
    const controller = new AbortController();
    await client.agents.getOptimizationCandidate(job.id, candidate.candidate_id, {
      abortSignal: controller.signal,
    });
    expect(requests[0].abortSignal).toBe(controller.signal);
    controller.abort();
    expect(requests[0].abortSignal?.aborted).toBe(true);
  });

  it("serializes estimate inputs and deserializes an epoch-zero pricing timestamp", async () => {
    const { client, requests } = createClient({
      body: {
        prices_as_of: 0,
        cost: { currency: "USD", total: { low: 1, typical: 2, ceiling: 3 } },
      },
    });
    const inputs = {
      optimization_model_configuration: { model: "optimization-model" },
      optimization_configuration: {
        type: "agent_optimization" as const,
        agent_optimization_space: { target_attributes: ["instructions" as const] },
        candidate_search_configuration: { max_candidates: 3 },
        evaluation_configuration: {
          evaluation_model: { model: "evaluation-model" },
          evaluators: [{ name: "builtin.fluency" }],
          training_set: {
            type: "target_completion" as const,
            source: {
              type: "inline" as const,
              test_cases: [{ query: "Question?", ground_truth: "Answer." }],
            },
          },
        },
      },
    };
    const estimate = await client.agents.estimateOptimizationJob(inputs);
    expect(estimate.prices_as_of).toEqual(new Date(0));
    expect(estimate.cost?.total?.typical).toBe(2);
    expect(JSON.parse(requests[0].body as string)).toEqual(inputs);
    expect(new URL(requests[0].url).pathname).toContain("/agent_optimization_jobs:estimate");
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
  });
});
