// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type { EvaluatorGenerationInputs, EvaluatorVersion } from "../../src/index.js";

const endpoint = "https://example.com/api/projects/test-project";
const evaluator: EvaluatorVersion = {
  name: "rubric",
  evaluator_type: "custom",
  categories: ["quality"],
  definition: { type: "rubric", dimensions: [] },
};
const job: EvaluatorGenerationInputs = {
  sources: [{ type: "prompt", prompt: "Evaluate answer quality." }],
  model: "test-model",
  evaluator_name: "rubric",
};

interface MockResponse {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function createClient(...responses: MockResponse[]): {
  client: AIProjectClient;
  requests: PipelineRequest[];
  scopes: string[];
} {
  const requests: PipelineRequest[] = [];
  const scopes: string[] = [];
  const credential: TokenCredential = {
    getToken: async (requestedScopes) => {
      scopes.push(...(Array.isArray(requestedScopes) ? requestedScopes : [requestedScopes]));
      return { token: "unit-test-token", expiresOnTimestamp: Date.now() + 3_600_000 };
    },
  };
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
    client: new AIProjectClient(endpoint, credential, {
      httpClient,
      retryOptions: { maxRetries: 0 },
    }),
    requests,
    scopes,
  };
}

describe("evaluator GA post-emitter integration", () => {
  it("wires root evaluators while keeping only uploads in beta and retaining custom clients", async () => {
    const { client, requests, scopes } = createClient({ body: evaluator });
    expect(Object.keys(client.beta.evaluators).sort()).toEqual(["getCredentials", "pendingUpload"]);
    expect(client.evaluators).not.toHaveProperty("listLatestVersions");
    expect(client.datasets.uploadFile).toBeTypeOf("function");
    expect(client.telemetry.getApplicationInsightsConnectionString).toBeTypeOf("function");
    expect(client.getOpenAIClient).toBeTypeOf("function");
    await client.evaluators.getVersion("rubric", "1");
    expect(scopes).toContain("https://ai.azure.com/.default");
    const userAgent = requests[0].headers.get(isNodeLike ? "user-agent" : "x-ms-useragent");
    expect(userAgent).toContain("azsdk-js-client");
    expect(userAgent).toContain("azsdk-js-api");
  });

  it("preserves generation body serialization, job identity and custom poll headers", async () => {
    const { client, requests } = createClient(
      {
        status: 202,
        body: { id: "job-1", status: "queued" },
        headers: { "operation-location": `${endpoint}/operations/operation-1` },
      },
      { body: { status: "succeeded", result: evaluator } },
    );
    const poller = client.evaluators.createGenerationJob(job, {
      operationId: "operation-1",
      requestOptions: { headers: { "x-custom": "retained", "x-number": 42, "x-boolean": true } },
    });
    await poller.submitted();
    expect(poller.operationState?.jobId).toBe("job-1");
    const progressJobIds: (string | undefined)[] = [];
    poller.onProgress((state) => progressJobIds.push(state.jobId));
    expect((await poller.poll()).jobId).toBe("job-1");
    expect(poller.operationState?.jobId).toBe("job-1");
    expect(progressJobIds).toEqual(["job-1"]);
    expect(await poller.pollUntilDone()).toMatchObject(evaluator);
    expect(poller.operationState?.jobId).toBe("job-1");
    expect(poller.result).toMatchObject(evaluator);
    expect(requests).toHaveLength(2);
    expect(JSON.parse(requests[0].body as string)).toEqual(job);
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
      { body: { ...job, id: "job-1", status: "queued" } },
      { body: { ...job, id: "job-1", status: "canceled" } },
      { status: 204 },
    );
    const options = { requestOptions: { headers: { "x-custom": "retained" } } };
    expect(await client.evaluators.getGenerationJob("job-1", options)).toMatchObject({
      id: "job-1",
    });
    await client.evaluators.cancelGenerationJob("job-1", options);
    await client.evaluators.deleteGenerationJob("job-1", options);
    expect(requests.map((request) => request.method)).toEqual(["GET", "POST", "DELETE"]);
    for (const request of requests) {
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
    }
  });

  it("preserves generation job ErrorModel details", async () => {
    const error = { code: "invalid_job", message: "Invalid job.", param: "jobId" };
    const { client } = createClient({ status: 400, body: { error } });
    await expect(client.evaluators.getGenerationJob("job-1")).rejects.toMatchObject({
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
    await client.evaluators.createVersion("rubric", evaluator, options);
    await client.evaluators.updateVersion("rubric", "1", evaluator, options);
    await client.evaluators.getVersion("rubric", "1", options);
    await client.evaluators.deleteVersion("rubric", "1", options);
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
        evaluatorType: "custom" as const,
        abortSignal: abortController.signal,
        requestOptions: { headers: { "x-custom": "retained" }, timeout: 1234 },
      };
      const pages =
        method === "list"
          ? client.evaluators.list(options).byPage()
          : client.evaluators.listVersions("rubric", options).byPage();
      expect((await pages.next()).value).toHaveLength(1);
      expect((await pages.next()).value).toHaveLength(1);
      expect(requests).toHaveLength(2);
      expect(new URL(requests[0].url).searchParams.get("type")).toBe("custom");
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
      { body: { data: [{ ...job, id: "job-1" }], last_id: "job-1", has_more: true } },
      { body: { data: [{ ...job, id: "job-2" }], last_id: "job-2", has_more: false } },
    );
    const jobs = [];
    const abortController = new AbortController();
    for await (const item of client.evaluators.listGenerationJobs({
      limit: 1,
      order: "asc",
      abortSignal: abortController.signal,
      requestOptions: { headers: { "x-custom": "retained" }, timeout: 1234 },
    })) {
      jobs.push(item.id);
    }
    expect(jobs).toEqual(["job-1", "job-2"]);
    expect(requests).toHaveLength(2);
    expect(new URL(requests[0].url).searchParams.get("limit")).toBe("1");
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("job-1");
    for (const request of requests) {
      expect(new URL(request.url).searchParams.get("limit")).toBe("1");
      expect(new URL(request.url).searchParams.get("order")).toBe("asc");
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-custom")).toBe("retained");
      expect(request.abortSignal).toBe(abortController.signal);
      expect(request.timeout).toBe(1234);
    }
  });

  it.each([undefined, "Evaluations=V1Preview"])(
    "preserves credentials and pending-upload bodies with preview header %s",
    async (previewHeader) => {
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
      const headers: Record<string, string> = { "x-custom": "retained" };
      if (previewHeader) {
        headers["foundry-features"] = previewHeader;
      }
      const options = { requestOptions: { headers } };
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
      expect(JSON.parse(requests[1].body as string)).toEqual({
        pendingUploadType: "BlobReference",
      });
      for (const request of requests) {
        expect(request.headers.get("foundry-features")).toBe(previewHeader);
        expect(request.headers.get("x-custom")).toBe("retained");
      }
    },
  );

  it("still allows explicit caller opt-in through request headers", async () => {
    const { client, requests } = createClient({ body: evaluator });
    await client.evaluators.getVersion("rubric", "1", {
      requestOptions: { headers: { "foundry-features": "Evaluations=V1Preview" } },
    });
    expect(requests[0].headers.get("foundry-features")).toBe("Evaluations=V1Preview");
  });
});
