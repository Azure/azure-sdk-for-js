// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type { WebResourceLike } from "@azure/core-http-compat";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { SessionOptions } from "../../src/index.js";
import { DataLakeFileClient } from "../../src/index.js";

const ACCOUNT = "myaccount";
const FILE_URL = `https://${ACCOUNT}.dfs.core.windows.net/myfilesystem/myfile.txt`;

const credential: TokenCredential = {
  getToken: async (): Promise<AccessToken> => ({
    token: "fake-bearer-token",
    expiresOnTimestamp: Date.now() + 3600 * 1000,
  }),
};

interface SeenRequest {
  url: string;
  method: string;
  authorization?: string;
  host: string;
}

function sessionBody(): string {
  const expiration = new Date(Date.now() + 5 * 60 * 1000);
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<CreateSessionResult>`,
    `<Id>session-id</Id>`,
    `<Expiration>${expiration.toUTCString()}</Expiration>`,
    `<AuthenticationType>HMAC</AuthenticationType>`,
    `<Credentials><SessionToken>session-token-1</SessionToken><SessionKey>a2V5</SessionKey></Credentials>`,
    `</CreateSessionResult>`,
  ].join("");
}

/** DataLake reuses storage-blob's core pipeline, so the fake transport sees both endpoints. */
function createFileClient(sessionOptions?: SessionOptions): {
  fileClient: DataLakeFileClient;
  seen: SeenRequest[];
} {
  const seen: SeenRequest[] = [];
  const httpClient = {
    sendRequest: async (request: WebResourceLike): Promise<any> => {
      seen.push({
        url: request.url,
        method: request.method,
        authorization: request.headers.get("authorization"),
        host: new URL(request.url).hostname,
      });
      const isCreateSession = request.url.includes("comp=session");
      return {
        request,
        status: isCreateSession ? 201 : 200,
        headers: toHttpHeadersLike(createHttpHeaders({ "content-type": "application/xml" })),
        bodyAsText: isCreateSession ? sessionBody() : "",
        parsedBody: isCreateSession ? sessionBody() : "",
      };
    },
  };

  const fileClient = new DataLakeFileClient(FILE_URL, credential, {
    httpClient,
    retryOptions: { maxTries: 1 },
    sessionOptions,
  });
  return { fileClient, seen };
}

const isCreateSession = (r: SeenRequest): boolean => r.url.includes("comp=session");
const isDfs = (r: SeenRequest): boolean => r.host.split(".")[1] === "dfs";
const isSessionSigned = (r: SeenRequest): boolean =>
  r.authorization?.startsWith("Session ") ?? false;

describe("DataLake session authentication Node.js only", () => {
  it("never signs a DFS request with a session token", async () => {
    const { fileClient, seen } = createFileClient({ mode: "enabled" });

    await fileClient.getAccessControl().catch(() => undefined);
    await fileClient.read().catch(() => undefined);

    const dfsRequests = seen.filter(isDfs);
    assert.isAtLeast(dfsRequests.length, 1, "the test must actually reach the DFS endpoint");
    for (const request of dfsRequests) {
      assert.isFalse(
        isSessionSigned(request),
        `DFS request was session-signed: ${request.method} ${request.url}`,
      );
    }
  });

  it("uses a session for read(), which targets the blob endpoint", async () => {
    const { fileClient, seen } = createFileClient({ mode: "enabled" });

    await fileClient.read().catch(() => undefined);

    const created = seen.filter(isCreateSession);
    assert.lengthOf(created, 1, "read() should mint exactly one session");
    assert.isTrue(isDfs(created[0]) === false, "Create Session must target the blob endpoint");

    const blobReads = seen.filter((r) => !isDfs(r) && !isCreateSession(r) && r.method === "GET");
    assert.isAtLeast(blobReads.length, 1, "read() must issue a GET against the blob endpoint");
    for (const request of blobReads) {
      assert.isTrue(
        isSessionSigned(request),
        `expected a session-signed read, got: ${request.authorization}`,
      );
    }
  });

  it("mints no session when the feature is left at its default", async () => {
    const { fileClient, seen } = createFileClient();

    await fileClient.read().catch(() => undefined);
    await fileClient.getAccessControl().catch(() => undefined);

    assert.lengthOf(seen.filter(isCreateSession), 0, "sessions are opt-in");
    for (const request of seen) {
      assert.isFalse(isSessionSigned(request), `unexpected session auth on ${request.url}`);
    }
  });
});
