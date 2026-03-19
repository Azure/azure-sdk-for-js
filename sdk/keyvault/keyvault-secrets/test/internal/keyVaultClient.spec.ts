// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { KeyVaultClient } from "../../src/keyVaultClient.js";

const ENDPOINT = "https://myvault.vault.azure.net";
const DEFAULT_API_VERSION = "7.6";

/** A minimal TokenCredential that always returns a static token. */
const mockCredential = {
  getToken: () =>
    Promise.resolve({ token: "test-token", expiresOnTimestamp: Date.now() + 3_600_000 }),
};

/** Build a PipelineResponse stub for use in sendRequest mocks. */
function makeResponse(status: number, body: unknown, request?: PipelineRequest): PipelineResponse {
  return {
    status,
    headers: createHttpHeaders(),
    request: request ?? ({} as PipelineRequest),
    bodyAsText: typeof body === "string" ? body : JSON.stringify(body),
  };
}

/** Create a mock HttpClient whose sendRequest can be configured per test. */
function createMockHttpClient(defaultBody: unknown = {}, defaultStatus = 200): HttpClient {
  return {
    sendRequest: vi
      .fn()
      .mockImplementation((req: PipelineRequest) =>
        Promise.resolve(makeResponse(defaultStatus, defaultBody, req)),
      ),
  };
}

describe("KeyVaultClient", () => {
  // -----------------------------------------------------------------------
  // Constructor / pipeline
  // -----------------------------------------------------------------------
  describe("constructor", () => {
    it("exposes a pipeline property after construction", () => {
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, {
        httpClient: createMockHttpClient(),
      });
      expect(client.pipeline).toBeDefined();
    });

    it("uses API version 7.6 by default", async () => {
      const httpClient = createMockHttpClient({ id: `${ENDPOINT}/secrets/s/v`, attributes: {} });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getSecret("s", "v");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining(`api%2Dversion=${DEFAULT_API_VERSION}`),
        }),
      );
    });

    it("applies a custom apiVersion when provided", async () => {
      const httpClient = createMockHttpClient({ id: `${ENDPOINT}/secrets/s/v`, attributes: {} });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, {
        httpClient,
        apiVersion: "7.5",
      });

      await client.getSecret("s", "v");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining("api%2Dversion=7.5"),
        }),
      );
    });

    it("includes 'azsdk-js-client' in the user-agent header", async () => {
      const httpClient = createMockHttpClient({ id: `${ENDPOINT}/secrets/s/v`, attributes: {} });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getSecret("s", "v");

      const req = (httpClient.sendRequest as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as PipelineRequest;
      const ua = req.headers.get("user-agent") ?? req.headers.get("x-ms-useragent") ?? "";
      expect(ua).toContain("azsdk-js-client");
    });

    it("prepends a custom userAgentPrefix before 'azsdk-js-client'", async () => {
      const httpClient = createMockHttpClient({ id: `${ENDPOINT}/secrets/s/v`, attributes: {} });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, {
        httpClient,
        userAgentOptions: { userAgentPrefix: "my-app/1.0" },
      });

      await client.getSecret("s", "v");

      const req = (httpClient.sendRequest as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as PipelineRequest;
      const ua = req.headers.get("user-agent") ?? req.headers.get("x-ms-useragent") ?? "";
      expect(ua).toMatch(/my-app\/1\.0.*azsdk-js-client/);
    });
  });

  // -----------------------------------------------------------------------
  // getSecret – GET /secrets/{secret-name}/{secret-version}
  // -----------------------------------------------------------------------
  describe("getSecret", () => {
    let httpClient: HttpClient;

    beforeEach(() => {
      httpClient = createMockHttpClient({
        value: "secretValue",
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        contentType: "text/plain",
        attributes: { enabled: true },
      });
    });

    afterEach(() => vi.restoreAllMocks());

    it("sends a GET request to the correct path", async () => {
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });
      await client.getSecret("mySecret", "v1");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/secrets/mySecret/v1"),
        }),
      );
    });

    it("returns the deserialized SecretBundle", async () => {
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });
      const result = await client.getSecret("mySecret", "v1");

      expect(result.value).toBe("secretValue");
      expect(result.id).toBe(`${ENDPOINT}/secrets/mySecret/v1`);
      expect(result.contentType).toBe("text/plain");
    });

    it("throws when the server responds with 404", async () => {
      (httpClient.sendRequest as ReturnType<typeof vi.fn>).mockResolvedValue(
        makeResponse(404, { error: { code: "SecretNotFound", message: "not found" } }),
      );
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await expect(client.getSecret("missing", "v1")).rejects.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // setSecret – PUT /secrets/{secret-name}
  // -----------------------------------------------------------------------
  describe("setSecret", () => {
    it("sends a PUT request to the correct path", async () => {
      const httpClient = createMockHttpClient({
        value: "val",
        id: `${ENDPOINT}/secrets/mySecret`,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.setSecret("mySecret", { value: "val" });

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PUT",
          url: expect.stringContaining("/secrets/mySecret"),
        }),
      );
    });

    it("returns the deserialized SecretBundle", async () => {
      const httpClient = createMockHttpClient({
        value: "myValue",
        id: `${ENDPOINT}/secrets/mySecret`,
        contentType: "application/json",
        attributes: { enabled: true },
        tags: { env: "test" },
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const result = await client.setSecret("mySecret", { value: "myValue" });

      expect(result.value).toBe("myValue");
      expect(result.contentType).toBe("application/json");
    });

    it("throws on a 4xx response", async () => {
      const httpClient = createMockHttpClient({ error: { code: "Forbidden" } }, 403);
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await expect(client.setSecret("s", { value: "v" })).rejects.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // deleteSecret – DELETE /secrets/{secret-name}
  // -----------------------------------------------------------------------
  describe("deleteSecret", () => {
    it("sends a DELETE request to the correct path", async () => {
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret`,
        recoveryId: "https://myvault.vault.azure.net/deletedsecrets/mySecret",
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.deleteSecret("mySecret");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: expect.stringContaining("/secrets/mySecret"),
        }),
      );
    });

    it("returns a DeletedSecretBundle with recoveryId", async () => {
      const recoveryId = "https://myvault.vault.azure.net/deletedsecrets/mySecret";
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret`,
        recoveryId,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const result = await client.deleteSecret("mySecret");

      expect(result.recoveryId).toBe(recoveryId);
    });
  });

  // -----------------------------------------------------------------------
  // updateSecret – PATCH /secrets/{secret-name}/{secret-version}
  // -----------------------------------------------------------------------
  describe("updateSecret", () => {
    it("sends a PATCH request to the correct path", async () => {
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        attributes: { enabled: false },
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.updateSecret("mySecret", "v1", { secretAttributes: { enabled: false } });

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PATCH",
          url: expect.stringContaining("/secrets/mySecret/v1"),
        }),
      );
    });
  });

  // -----------------------------------------------------------------------
  // backupSecret – POST /secrets/{secret-name}/backup
  // -----------------------------------------------------------------------
  describe("backupSecret", () => {
    it("sends a POST request to the backup endpoint", async () => {
      const httpClient = createMockHttpClient({ value: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.backupSecret("mySecret");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: expect.stringContaining("/secrets/mySecret/backup"),
        }),
      );
    });
  });

  // -----------------------------------------------------------------------
  // restoreSecret – POST /secrets/restore
  // -----------------------------------------------------------------------
  describe("restoreSecret", () => {
    it("sends a POST request to the restore endpoint", async () => {
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.restoreSecret({ secretBundleBackup: new Uint8Array([1, 2, 3]) });

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: expect.stringContaining("/secrets/restore"),
        }),
      );
    });
  });

  // -----------------------------------------------------------------------
  // getDeletedSecret – GET /deletedsecrets/{secret-name}
  // -----------------------------------------------------------------------
  describe("getDeletedSecret", () => {
    it("sends a GET request to the deletedsecrets path", async () => {
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        recoveryId: `${ENDPOINT}/deletedsecrets/mySecret`,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getDeletedSecret("mySecret");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/deletedsecrets/mySecret"),
        }),
      );
    });

    it("returns a DeletedSecretBundle with recoveryId", async () => {
      const recoveryId = `${ENDPOINT}/deletedsecrets/mySecret`;
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        recoveryId,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const result = await client.getDeletedSecret("mySecret");

      expect(result.recoveryId).toBe(recoveryId);
    });
  });

  // -----------------------------------------------------------------------
  // purgeDeletedSecret – DELETE /deletedsecrets/{secret-name}  (204)
  // -----------------------------------------------------------------------
  describe("purgeDeletedSecret", () => {
    it("sends a DELETE request to the deletedsecrets path", async () => {
      const httpClient = createMockHttpClient("", 204);
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.purgeDeletedSecret("mySecret");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: expect.stringContaining("/deletedsecrets/mySecret"),
        }),
      );
    });

    it("does not hit the /recover sub-path", async () => {
      const httpClient = createMockHttpClient("", 204);
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.purgeDeletedSecret("mySecret");

      const req = (httpClient.sendRequest as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as PipelineRequest;
      expect(req.url).not.toContain("/recover");
    });
  });

  // -----------------------------------------------------------------------
  // recoverDeletedSecret – POST /deletedsecrets/{secret-name}/recover
  // -----------------------------------------------------------------------
  describe("recoverDeletedSecret", () => {
    it("sends a POST request to the recover path", async () => {
      const httpClient = createMockHttpClient({
        id: `${ENDPOINT}/secrets/mySecret/v1`,
        attributes: {},
      });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.recoverDeletedSecret("mySecret");

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: expect.stringContaining("/deletedsecrets/mySecret/recover"),
        }),
      );
    });
  });

  // -----------------------------------------------------------------------
  // Paged operations – getSecrets, getDeletedSecrets, getSecretVersions
  // -----------------------------------------------------------------------
  describe("paged operations", () => {
    it("getSecrets returns a PagedAsyncIterableIterator", () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const iter = client.getSecrets();

      expect(iter).toBeDefined();
      expect(typeof iter[Symbol.asyncIterator]).toBe("function");
    });

    it("getDeletedSecrets returns a PagedAsyncIterableIterator", () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const iter = client.getDeletedSecrets();

      expect(iter).toBeDefined();
      expect(typeof iter[Symbol.asyncIterator]).toBe("function");
    });

    it("getSecretVersions returns a PagedAsyncIterableIterator", () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      const iter = client.getSecretVersions("mySecret");

      expect(iter).toBeDefined();
      expect(typeof iter[Symbol.asyncIterator]).toBe("function");
    });

    it("getSecrets sends a GET request to /secrets", async () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      // Consuming the first page triggers the HTTP call
      await client.getSecrets().next();

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/secrets"),
        }),
      );
    });

    it("getDeletedSecrets sends a GET request to /deletedsecrets", async () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getDeletedSecrets().next();

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/deletedsecrets"),
        }),
      );
    });

    it("getSecretVersions sends a GET request including the secret name", async () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getSecretVersions("mySecret").next();

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/secrets/mySecret/versions"),
        }),
      );
    });

    it("passes maxresults to getSecrets URL when specified", async () => {
      const httpClient = createMockHttpClient({ value: [], nextLink: undefined });
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await client.getSecrets({ maxresults: 5 }).next();

      expect(httpClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining("maxresults=5"),
        }),
      );
    });
  });

  // -----------------------------------------------------------------------
  // Error handling
  // -----------------------------------------------------------------------
  describe("error handling", () => {
    it("throws a RestError for a 401 response", async () => {
      const httpClient = createMockHttpClient(
        { error: { code: "Unauthorized", message: "auth required" } },
        401,
      );
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await expect(client.getSecret("s", "v")).rejects.toThrow();
    });

    it("throws a RestError for a 500 response", async () => {
      const httpClient = createMockHttpClient(
        { error: { code: "InternalError", message: "server error" } },
        500,
      );
      const client = new KeyVaultClient(ENDPOINT, mockCredential as any, { httpClient });

      await expect(client.setSecret("s", { value: "v" })).rejects.toThrow();
    });
  });
});
