// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { AzureLogger, getLogLevel, setLogLevel } from "@azure/logger";
import type * as StorageBlob from "@azure/storage-blob";
import type { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { format } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AIProjectClient } from "../../../../src/index.js";

const storage = vi.hoisted(() => ({
  construct: vi.fn<(url: string) => void>(),
  uploadStream: vi.fn<(stream: Readable) => Promise<void>>(),
  addPolicy: vi.fn(),
}));

vi.mock("@azure/storage-blob", async (importOriginal) => {
  const original = await importOriginal<typeof StorageBlob>();
  return {
    ...original,
    ContainerClient: class {
      readonly url: string;
      readonly storageClientContext = { pipeline: { addPolicy: storage.addPolicy } };

      constructor(url: string) {
        this.url = url;
        storage.construct(url);
      }

      getBlockBlobClient(name: string): {
        url: string;
        uploadStream: typeof storage.uploadStream;
      } {
        const url = new URL(this.url);
        url.pathname += `/${name}`;
        return { url: url.toString(), uploadStream: storage.uploadStream };
      }
    },
  };
});

const datasetName = "offline-dataset";
const datasetVersion = "1";
const pendingUploadId = "offline-pending-upload-id";
const unsignedContainerUrl = "https://storage.example.test/container";
const signature = "OFFLINE_FAKE_SIGNATURE";
const fixtureFile = fileURLToPath(
  new URL("./data/sample_folder/sample_file1.txt", import.meta.url),
);
const fixtureFolder = fileURLToPath(new URL("./data/sample_folder/", import.meta.url));

const credentialCases = [
  {
    name: "standard blob reference",
    sasUri: `${unsignedContainerUrl}?sv=2025-01-05&sp=rwl&se=2030-01-01T00%3A00%3A00Z&sig=${signature}`,
    signedBlobUri: false,
  },
  {
    name: "signed blob reference and encoded signature",
    sasUri: `${unsignedContainerUrl}?sig=${signature}%2B%2F%3D&spr=https&se=2030-01-01T00%3A00%3A00Z&sp=rwl`,
    signedBlobUri: true,
  },
];

const uploadCases = [
  {
    name: "file",
    type: "uri_file",
    fileCount: 1,
    run: (client: AIProjectClient) =>
      client.datasets.uploadFile(datasetName, datasetVersion, fixtureFile),
  },
  {
    name: "folder",
    type: "uri_folder",
    fileCount: 2,
    run: (client: AIProjectClient) =>
      client.datasets.uploadFolder(datasetName, datasetVersion, fixtureFolder),
  },
];

function createClient(
  sasUri: string,
  signedBlobUri: boolean,
  datasetType: string,
): { client: AIProjectClient; requests: PipelineRequest[] } {
  const requests: PipelineRequest[] = [];
  const datasetPath = `/api/projects/test-project/datasets/${datasetName}/versions/${datasetVersion}`;
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const pathname = new URL(request.url).pathname;
      let body: Record<string, unknown>;
      if (request.method === "POST" && pathname === `${datasetPath}/startPendingUpload`) {
        body = {
          pendingUploadId,
          pendingUploadType: "BlobReference",
          blobReference: {
            blobUri: signedBlobUri ? sasUri : unsignedContainerUrl,
            storageAccountArmId:
              "/subscriptions/test/resourceGroups/test/providers/Microsoft.Storage/storageAccounts/test",
            credential: { credentialType: "SAS", sasUri },
          },
        };
      } else if (request.method === "PATCH" && pathname === datasetPath) {
        body = {
          name: datasetName,
          version: datasetVersion,
          type: datasetType,
          dataUri: unsignedContainerUrl,
          isReference: false,
        };
      } else {
        throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      }
      return {
        request,
        status: 200,
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

describe("dataset upload diagnostics", () => {
  let originalLog: typeof AzureLogger.log;
  let originalLevel: ReturnType<typeof getLogLevel>;
  let messages: string[];

  beforeEach(() => {
    originalLog = AzureLogger.log;
    originalLevel = getLogLevel();
    messages = [];
    AzureLogger.log = (...args) => {
      messages.push(format(...args));
    };
    setLogLevel("verbose");
    storage.construct.mockClear();
    storage.addPolicy.mockClear();
    storage.uploadStream.mockReset();
    storage.uploadStream.mockImplementation(async (stream) => {
      stream.resume();
      await finished(stream);
    });
  });

  afterEach(() => {
    AzureLogger.log = originalLog;
    setLogLevel(originalLevel);
  });

  for (const upload of uploadCases) {
    it.each(credentialCases)(
      `keeps credentials out of verbose ${upload.name} upload logs for $name`,
      async ({ sasUri, signedBlobUri }) => {
        const { client, requests } = createClient(sasUri, signedBlobUri, upload.type);
        const result = await upload.run(client);

        expect(result).toMatchObject({
          name: datasetName,
          version: datasetVersion,
          type: upload.type,
        });
        expect(storage.construct).toHaveBeenCalledExactlyOnceWith(sasUri);
        expect(storage.uploadStream).toHaveBeenCalledTimes(upload.fileCount);
        expect(requests.map((request) => request.method)).toEqual(["POST", "PATCH"]);
        const output = messages.join("\n");
        expect(output).toContain(pendingUploadId);
        expect(output).not.toContain(sasUri);
        expect(output).not.toContain(signature);
        expect(output).not.toContain("sp=rwl");
      },
    );

    it.each(credentialCases)(
      `does not log credentials when a ${upload.name} upload fails for $name`,
      async ({ sasUri, signedBlobUri }) => {
        const { client, requests } = createClient(sasUri, signedBlobUri, upload.type);
        const failure = new Error(`OFFLINE_UPLOAD_FAILURE ${sasUri}`);
        storage.uploadStream.mockImplementationOnce(async (stream) => {
          stream.resume();
          await finished(stream);
          throw failure;
        });

        await expect(upload.run(client)).rejects.toBe(failure);
        expect(storage.construct).toHaveBeenCalledExactlyOnceWith(sasUri);
        expect(storage.uploadStream).toHaveBeenCalledOnce();
        expect(requests.map((request) => request.method)).toEqual(["POST"]);
        const output = messages.join("\n");
        expect(output).toContain(pendingUploadId);
        expect(output).not.toContain(sasUri);
        expect(output).not.toContain(signature);
        expect(output).not.toContain("OFFLINE_UPLOAD_FAILURE");
      },
    );
  }
});
