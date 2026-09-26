// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type { EvaluatorGenerationJob, EvaluatorVersion } from "../../src/index.js";

const endpoint = "https://example.com/api/projects/test-project";
const evaluator: EvaluatorVersion = {
  name: "rubric",
  evaluator_type: "custom",
  categories: ["quality"],
  definition: { type: "rubric", dimensions: [] },
};
const job: EvaluatorGenerationJob = {
  inputs: {
    sources: [{ type: "prompt", prompt: "Evaluate answer quality." }],
    model: "test-model",
    evaluator_name: "rubric",
  },
};

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

describe("evaluator GA post-emitter integration", () => {
  it("preserves generation body serialization, job identity and custom poll headers", async () => {
    const { client, requests } = createClient(
      {
        status: 202,
        body: { id: "job-1", status: "queued" },
        headers: { "operation-location": `${endpoint}/operations/operation-1` },
      },
      { body: { status: "succeeded", result: evaluator } },
    );
    const poller = client.beta.evaluators.createGenerationJob(job, {
      operationId: "operation-1",
      requestOptions: { headers: { "x-custom": "retained", "x-number": 42, "x-boolean": true } },
    });
    await poller.submitted();
    expect(poller.operationState?.jobId).toBe("job-1");
    await poller.poll();
    expect(poller.operationState?.jobId).toBe("job-1");
    expect(poller.result).toMatchObject(evaluator);
    expect(requests).toHaveLength(2);
    expect(JSON.parse(requests[0].body as string)).toEqual(job.inputs);
    expect(requests[0].headers.get("operation-id")).toBe("operation-1");
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
      expect(request.headers.get("x-number")).toBe("42");
      expect(request.headers.get("x-boolean")).toBe("true");
    }
  });

  it("sends generation job get, cancel and delete without preview opt-in", async () => {
    const { client, requests } = createClient(
      { body: { id: "job-1", status: "queued" } },
      { body: { id: "job-1", status: "canceled" } },
      { status: 204 },
    );
    const options = { requestOptions: { headers: { "x-custom": "retained" } } };
    expect(await client.beta.evaluators.getGenerationJob("job-1", options)).toMatchObject({
      id: "job-1",
    });
    await client.beta.evaluators.cancelGenerationJob("job-1", options);
    await client.beta.evaluators.deleteGenerationJob("job-1", options);
    expect(requests.map((request) => request.method)).toEqual(["GET", "POST", "DELETE"]);
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
    }
  });

  it("preserves generation job ErrorModel details", async () => {
    const error = { code: "invalid_job", message: "Invalid job.", param: "jobId" };
    const { client } = createClient({ status: 400, body: { error } });
    await expect(client.beta.evaluators.getGenerationJob("job-1")).rejects.toMatchObject({
      statusCode: 400,
      details: { error },
    });
  });

  it("sends version CRUD without preview opt-in and retains caller headers", async () => {
    const { client, requests } = createClient(
      { status: 201, body: evaluator },
      { body: evaluator },
      { body: evaluator },
      { status: 204 },
    );
    const options = { requestOptions: { headers: { "x-custom": "retained" } } };
    await client.beta.evaluators.createVersion("rubric", evaluator, options);
    await client.beta.evaluators.updateVersion("rubric", "1", evaluator, options);
    await client.beta.evaluators.getVersion("rubric", "1", options);
    await client.beta.evaluators.deleteVersion("rubric", "1", options);
    expect(requests.map((request) => request.method)).toEqual(["POST", "PATCH", "GET", "DELETE"]);
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
    }
    expect(JSON.parse(requests[0].body as string).definition).toEqual(evaluator.definition);
    expect(JSON.parse(requests[1].body as string).definition).toEqual(evaluator.definition);
  });

  for (const method of ["list", "listVersions"] as const) {
    it(`keeps ${method} paging and forwards caller options without injecting a preview header`, async () => {
      const { client, requests } = createClient(
        { body: { value: [evaluator], nextLink: `${endpoint}/evaluators?cursor=next` } },
        { body: { value: [evaluator] } },
      );
      const abortController = new AbortController();
      const options = {
        abortSignal: abortController.signal,
        requestOptions: { headers: { "x-custom": "retained" }, timeout: 1234 },
      };
      const pages =
        method === "list"
          ? client.beta.evaluators.list(options).byPage()
          : client.beta.evaluators.listVersions("rubric", options).byPage();
      expect((await pages.next()).value).toHaveLength(1);
      expect((await pages.next()).value).toHaveLength(1);
      expect(requests).toHaveLength(2);
      expect(new URL(requests[1].url).searchParams.get("cursor")).toBe("next");
      for (const request of requests) {
        expect(request.headers.get("foundry-features")).toBeUndefined();
        expect(request.headers.get("x-custom")).toBe("retained");
        expect(request.abortSignal).toBe(abortController.signal);
        expect(request.timeout).toBe(1234);
      }
    });
  }

  it("lists generation jobs with cursor paging and no preview header", async () => {
    const { client, requests } = createClient(
      { body: { data: [{ id: "job-1" }], last_id: "job-1", has_more: true } },
      { body: { data: [{ id: "job-2" }], last_id: "job-2", has_more: false } },
    );
    const jobs = [];
    for await (const item of client.beta.evaluators.listGenerationJobs({
      requestOptions: { headers: { "x-custom": "retained" } },
    })) {
      jobs.push(item.id);
    }
    expect(jobs).toEqual(["job-1", "job-2"]);
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("job-1");
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
    }
  });

  it("sends credentials and pending-upload bodies without preview opt-in", async () => {
    const { client, requests } = createClient(
      {
        body: {
          blobReference: {
            blobUri: "https://example.com/blob",
            storageAccountArmId: "storage",
            credential: {},
          },
        },
      },
      {
        body: {
          pendingUploadId: "upload-1",
          pendingUploadType: "BlobReference",
          blobReference: {
            blobUri: "https://example.com/blob",
            storageAccountArmId: "storage",
            credential: {},
          },
        },
      },
    );
    const options = { requestOptions: { headers: { "x-custom": "retained" } } };
    await client.beta.evaluators.getCredentials(
      "rubric",
      { blob_uri: "https://example.com/blob" },
      "1",
      options,
    );
    await client.beta.evaluators.pendingUpload(
      "rubric",
      "1",
      { pendingUploadType: "BlobReference" },
      options,
    );
    expect(JSON.parse(requests[0].body as string)).toEqual({
      blob_uri: "https://example.com/blob",
    });
    expect(JSON.parse(requests[1].body as string)).toEqual({ pendingUploadType: "BlobReference" });
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
    }
  });

  it("still allows explicit caller opt-in through request headers", async () => {
    const { client, requests } = createClient({ body: evaluator });
    await client.beta.evaluators.getVersion("rubric", "1", {
      requestOptions: { headers: { "foundry-features": "Evaluations=V1Preview" } },
    });
    expect(requests[0].headers.get("foundry-features")).toBe("Evaluations=V1Preview");
  });
});
