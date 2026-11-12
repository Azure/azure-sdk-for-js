// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "@azure/ai-projects";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it, vi } from "vitest";

const storage = vi.hoisted(() => ({
  construct: vi.fn<(url: string) => void>(),
  upload: vi.fn<(name: string, data: Uint8Array, length: number) => Promise<void>>(),
}));

vi.mock("@azure/storage-blob", () => ({
  BlobServiceClient: class {
    constructor(url: string) {
      storage.construct(url);
    }

    getContainerClient(): {
      getBlockBlobClient: (name: string) => {
        upload: (data: Uint8Array, length: number) => Promise<void>;
      };
    } {
      return {
        getBlockBlobClient: (name: string) => ({
          upload: (data: Uint8Array, length: number) => storage.upload(name, data, length),
        }),
      };
    }
  },
}));

const fixtureFolder = new URL("./datasets/data/sample_folder/", import.meta.url);
const blobUri = "https://storage.example.test/model";
const sasUri = `${blobUri}?sig=OFFLINE_FAKE_SIGNATURE`;

function createClient(): { client: AIProjectClient; requests: PipelineRequest[] } {
  const requests: PipelineRequest[] = [];
  let polls = 0;
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const pathname = new URL(request.url).pathname;
      let status = 200;
      let body: object;
      if (request.method === "POST" && pathname.endsWith("/startPendingUpload")) {
        body = {
          pendingUploadId: "pending-model",
          pendingUploadType: "TemporaryBlobReference",
          version: "1",
          blobReference: { blobUri, credential: { credentialType: "SAS", sasUri } },
        };
      } else if (request.method === "POST" && pathname.endsWith("/createAsync")) {
        status = 202;
        body = {};
      } else if (request.method === "GET" && pathname.endsWith("/models/model/versions/1")) {
        polls++;
        status = polls === 1 ? 404 : 200;
        body =
          status === 404
            ? { error: { code: "NotFound", message: "Model is not ready." } }
            : { name: "model", version: "1", blobUri };
      } else {
        throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      }
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify(body),
      };
    },
  };

  return {
    client: new AIProjectClient(
      "https://example.test/api/projects/test-project",
      { getToken: async () => ({ token: "offline-token", expiresOnTimestamp: Infinity }) },
      { httpClient, retryOptions: { maxRetries: 0 } },
    ),
    requests,
  };
}

describe("Node.js model uploads", () => {
  beforeEach(() => {
    storage.construct.mockClear();
    storage.upload.mockReset().mockResolvedValue(undefined);
  });

  it("uploads local files and polls for the model version", async () => {
    const { client, requests } = createClient();
    const result = await client.beta.models.create("model", "1", fileURLToPath(fixtureFolder), {
      pollingInterval: 0,
      weightType: "FullWeight",
      description: "Offline model",
    });

    expect(result).toMatchObject({ name: "model", version: "1", blobUri });
    expect(storage.construct).toHaveBeenCalledExactlyOnceWith(sasUri);
    expect(storage.upload).toHaveBeenCalledTimes(2);
    for (const name of ["sample_file1.txt", "sample_file2.txt"]) {
      const data = readFileSync(new URL(name, fixtureFolder));
      expect(storage.upload).toHaveBeenCalledWith(name, data, data.length);
    }
    expect(requests.map((request) => request.method)).toEqual(["POST", "POST", "GET", "GET"]);
    expect(JSON.parse(String(requests[1].body))).toMatchObject({
      blobUri,
      weightType: "FullWeight",
      description: "Offline model",
    });
  });

  it("propagates upload failures without registering a model version", async () => {
    const { client, requests } = createClient();
    const failure = new Error("Model upload failed.");
    storage.upload.mockRejectedValueOnce(failure);

    await expect(
      client.beta.models.create("model", "1", fileURLToPath(fixtureFolder)),
    ).rejects.toBe(failure);
    expect(requests.map((request) => request.method)).toEqual(["POST"]);
  });
});
