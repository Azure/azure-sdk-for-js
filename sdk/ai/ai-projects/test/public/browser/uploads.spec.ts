// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient, VoiceAgentRealtimeClient } from "@azure/ai-projects";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";

describe("browser uploads", () => {
  const credential = {
    getToken: async () => ({ token: "offline-token", expiresOnTimestamp: Infinity }),
  };
  const endpoint = "https://example.test/api/projects/test-project";

  it("exports the realtime client from the package root", () => {
    expect(new VoiceAgentRealtimeClient(endpoint, credential)).toBeInstanceOf(
      VoiceAgentRealtimeClient,
    );
  });

  it("rejects local uploads before making an HTTP request", async () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>();
    const client = new AIProjectClient(endpoint, credential, { httpClient: { sendRequest } });

    await expect(client.datasets.uploadFile("data", "1", "data.jsonl")).rejects.toThrow(
      "Dataset file uploads are only supported in Node.js.",
    );
    await expect(client.datasets.uploadFolder("data", "1", "data")).rejects.toThrow(
      "Dataset folder uploads are only supported in Node.js.",
    );
    await expect(client.beta.models.create("model", "1", "model")).rejects.toThrow(
      "Model uploads from local files are only supported in Node.js.",
    );
    expect(sendRequest).not.toHaveBeenCalled();
  });

  it("keeps dataset and model REST operations available", async () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>().mockImplementation(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: JSON.stringify({ value: [] }),
    }));
    const client = new AIProjectClient(endpoint, credential, { httpClient: { sendRequest } });

    expect(await client.datasets.list().next()).toMatchObject({ done: true });
    expect(await client.beta.models.list().next()).toMatchObject({ done: true });
    expect(sendRequest).toHaveBeenCalledTimes(2);
  });
});
