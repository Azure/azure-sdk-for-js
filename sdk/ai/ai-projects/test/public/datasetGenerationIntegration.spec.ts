// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type { DataGenerationJobInputsUnion } from "../../src/index.js";

const endpoint = "https://example.com/api/projects/test-project";
const evaluationInputs: DataGenerationJobInputsUnion = {
  name: "test-generation",
  scenario: "evaluation",
  sources: [{ type: "prompt", prompt: "Generate question-and-answer pairs." }],
  generation_configuration: {
    type: "simple_qna",
    max_samples: 2,
    model_options: { model: "test-model" },
  },
  output_configuration: { name: "test-dataset", write_mode: "overwrite" },
};

function createFineTuningInputs(
  scenario: "supervised_finetuning_preview" | "reinforcement_finetuning_preview",
): DataGenerationJobInputsUnion {
  return {
    name: "test-generation",
    scenario,
    sources: [{ type: "file", id: "file-1" }],
    generation_configuration: {
      type: "simple_qna",
      max_samples: 2,
      model_options: { model: "test-model" },
      question_types: ["short_answer"],
    },
    output_configuration: { name: "test.jsonl", write_mode: "overwrite" },
  };
}

interface MockResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function createClient(...responses: MockResponse[]): {
  client: AIProjectClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({
          "content-type": "application/json",
          ...response.headers,
        }),
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
          expiresOnTimestamp: Date.now() + 3_600_000,
        }),
      },
      { httpClient, retryOptions: { maxRetries: 0 } },
    ),
    requests,
  };
}

describe("dataset generation promotion", () => {
  it("retains dataset upload helpers and removes the empty beta group", () => {
    const { client } = createClient();
    expect(client.datasets.uploadFile).toBeTypeOf("function");
    expect(client.datasets.uploadFolder).toBeTypeOf("function");
    expect(client.beta).not.toHaveProperty("datasets");
  });

  it.each([
    ["evaluation", evaluationInputs],
    ["supervised_finetuning_preview", createFineTuningInputs("supervised_finetuning_preview")],
    [
      "reinforcement_finetuning_preview",
      createFineTuningInputs("reinforcement_finetuning_preview"),
    ],
  ] as const)(
    "preserves %s body serialization, job identity and polling headers",
    async (_, scenarioInputs) => {
      const result = { generated_samples: 2 };
      const { client, requests } = createClient(
        {
          status: 202,
          body: { id: "job-1", status: "queued" },
          headers: { "operation-location": `${endpoint}/operations/operation-1` },
        },
        { body: { status: "succeeded", result } },
      );
      const poller = client.datasets.createGenerationJob(scenarioInputs, {
        operationId: "operation-1",
        requestOptions: { headers: { "x-custom": "retained" } },
      });
      await poller.submitted();
      expect(poller.operationState?.jobId).toBe("job-1");
      await poller.poll();
      expect(poller.operationState?.jobId).toBe("job-1");
      expect(poller.result).toMatchObject(result);
      expect(requests).toHaveLength(2);
      expect(JSON.parse(requests[0].body as string)).toEqual(scenarioInputs);
      expect(new URL(requests[0].url).pathname).toBe(
        "/api/projects/test-project/data_generation_jobs",
      );
      expect(requests[0].headers.get("operation-id")).toBe("operation-1");
      for (const request of requests) {
        expect(request.headers.get("foundry-features")).toBe("DataGenerationJobs=V1Preview");
        expect(request.headers.get("x-custom")).toBe("retained");
      }
    },
  );

  it.each([
    "evaluation",
    "supervised_finetuning_preview",
    "reinforcement_finetuning_preview",
  ] as const)(
    "routes %s get, cancel and delete through datasets with the existing preview header",
    async (scenario) => {
      const scenarioInputs =
        scenario === "evaluation" ? evaluationInputs : createFineTuningInputs(scenario);
      const { client, requests } = createClient(
        { body: { ...scenarioInputs, id: "job-1", type: "data_generation", status: "queued" } },
        { body: { ...scenarioInputs, id: "job-1", type: "data_generation", status: "cancelled" } },
        { status: 204 },
      );
      const options = { requestOptions: { headers: { "x-custom": "retained" } } };
      expect(await client.datasets.getGenerationJob("job-1", options)).toMatchObject({
        id: "job-1",
        scenario,
        output_configuration: scenarioInputs.output_configuration,
      });
      expect(await client.datasets.cancelGenerationJob("job-1", options)).toMatchObject({
        status: "cancelled",
        scenario,
        output_configuration: scenarioInputs.output_configuration,
      });
      await client.datasets.deleteGenerationJob("job-1", options);
      expect(requests.map((request) => request.method)).toEqual(["GET", "POST", "DELETE"]);
      expect(requests.map((request) => new URL(request.url).pathname)).toEqual([
        "/api/projects/test-project/data_generation_jobs/job-1",
        "/api/projects/test-project/data_generation_jobs/job-1:cancel",
        "/api/projects/test-project/data_generation_jobs/job-1",
      ]);
      for (const request of requests) {
        expect(new URL(request.url).searchParams.get("api-version")).toBe("v1");
        expect(request.headers.get("foundry-features")).toBe("DataGenerationJobs=V1Preview");
        expect(request.headers.get("x-custom")).toBe("retained");
      }
    },
  );

  it("preserves ErrorModel details", async () => {
    const error = { code: "invalid_job", message: "Invalid job.", param: "jobId" };
    const { client } = createClient({ status: 400, body: { error } });
    await expect(client.datasets.getGenerationJob("job-1")).rejects.toMatchObject({
      statusCode: 400,
      details: { error },
    });
  });

  it("follows cursor pages and forwards caller options and preview headers", async () => {
    const { client, requests } = createClient(
      {
        body: {
          data: [{ ...evaluationInputs, id: "job-1" }],
          last_id: "job-1",
          has_more: true,
        },
      },
      {
        body: {
          data: [{ ...evaluationInputs, id: "job-2" }],
          last_id: "job-2",
          has_more: false,
        },
      },
    );
    const abortController = new AbortController();
    const jobs = [];
    for await (const item of client.datasets.listGenerationJobs({
      limit: 1,
      order: "asc",
      abortSignal: abortController.signal,
      requestOptions: { headers: { "x-custom": "retained" }, timeout: 1234 },
    })) {
      jobs.push(item.id);
    }
    expect(jobs).toEqual(["job-1", "job-2"]);
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("job-1");
    for (const request of requests) {
      const url = new URL(request.url);
      expect(url.searchParams.get("limit")).toBe("1");
      expect(url.searchParams.get("order")).toBe("asc");
      expect(url.searchParams.get("api-version")).toBe("v1");
      expect(request.headers.get("foundry-features")).toBe("DataGenerationJobs=V1Preview");
      expect(request.headers.get("x-custom")).toBe("retained");
      expect(request.abortSignal).toBe(abortController.signal);
      expect(request.timeout).toBe(1234);
    }
  });

  it("preserves converted legacy and modern headers on every generation job page", async () => {
    const { client, requests } = createClient(
      {
        body: {
          data: [{ ...evaluationInputs, id: "job-1" }],
          last_id: "job-1",
          has_more: true,
        },
      },
      {
        body: {
          data: [{ ...evaluationInputs, id: "job-2" }],
          last_id: "job-2",
          has_more: false,
        },
      },
    );
    // core-client retains customHeaders for compatibility even though it is not in the public type.
    const options = {
      requestOptions: {
        customHeaders: { "X-Legacy": "legacy", "X-Shared": "legacy" },
        headers: { "x-modern": "modern", "x-shared": "modern" },
      },
    };
    const jobs = [];
    for await (const item of client.datasets.listGenerationJobs(options)) {
      jobs.push(item.id);
    }
    expect(jobs).toEqual(["job-1", "job-2"]);
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      expect(request.headers.get("x-legacy")).toBe("legacy");
      expect(request.headers.get("x-modern")).toBe("modern");
      expect(request.headers.get("x-shared")).toBe("modern");
      expect(request.headers.get("foundry-features")).toBe("DataGenerationJobs=V1Preview");
      expect(request.headers.get("accept")).toBe("application/json");
    }
  });
});
