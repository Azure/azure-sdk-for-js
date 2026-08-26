// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { HttpMethods } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { WebResourceLike } from "@azure/core-http-compat";
import type { SessionOptions } from "../../src/Pipeline.js";
import { getCoreClientOptions, newPipeline } from "../../src/Pipeline.js";
import type { FakeResponse, SeenRequest } from "./sessionTestUtils.js";
import {
  ACCOUNT,
  createSessionBody,
  fakeHttpClient,
  fakeTokenCredential,
} from "./sessionTestUtils.js";

const BLOB_URL = `${ACCOUNT}/mycontainer/blob.txt`;

function isCreateSession(request: { url: string }): boolean {
  return request.url.includes("comp=session");
}

/**
 * Drives the real core pipeline, so these assertions cover the wiring in `getCoreClientOptions`
 * rather than the policy in isolation. The fake transport sees Create Session and data-plane
 * requests alike, with signing already applied.
 */
function createClient(sessionOptions?: SessionOptions): {
  send: (url?: string, method?: HttpMethods) => Promise<unknown>;
  seen: SeenRequest[];
  createSessionCount: () => number;
  dataRequests: () => SeenRequest[];
} {
  let issued = 0;
  const { httpClient, seen } = fakeHttpClient((request: WebResourceLike): FakeResponse => {
    if (isCreateSession(request)) {
      return {
        status: 201,
        body: createSessionBody(new Date(Date.now() + 5 * 60 * 1000), `session-token-${++issued}`),
      };
    }
    return { status: 200 };
  });

  const pipeline = newPipeline(fakeTokenCredential, {
    httpClient,
    retryOptions: { maxTries: 1 },
    sessionOptions,
  });
  const coreOptions = getCoreClientOptions(pipeline);
  // Both are declared optional on ExtendedServiceClientOptions but are always populated here.
  const corePipeline = coreOptions.pipeline!;
  const coreHttpClient = coreOptions.httpClient!;

  return {
    send: (url = BLOB_URL, method: HttpMethods = "GET") =>
      corePipeline.sendRequest(
        coreHttpClient,
        createPipelineRequest({ url, method, headers: createHttpHeaders() }),
      ),
    seen,
    createSessionCount: () => seen.filter(isCreateSession).length,
    dataRequests: () => seen.filter((request) => !isCreateSession(request)),
  };
}

describe("session wiring in getCoreClientOptions", () => {
  describe("is off unless explicitly enabled", () => {
    const offCases: { name: string; sessionOptions?: SessionOptions }[] = [
      { name: "no session options", sessionOptions: undefined },
      { name: 'mode "auto"', sessionOptions: { mode: "auto" } },
      { name: 'mode "disabled"', sessionOptions: { mode: "disabled" } },
    ];

    for (const { name, sessionOptions } of offCases) {
      it(`uses bearer with ${name}`, async () => {
        const client = createClient(sessionOptions);

        await client.send();

        assert.strictEqual(client.createSessionCount(), 0, "no session may be minted");
        assert.strictEqual(client.dataRequests()[0].authorization, "Bearer fake-bearer-token");
      });
    }
  });

  describe('with mode "enabled"', () => {
    it("mints a session and signs the blob download with it", async () => {
      const client = createClient({ mode: "enabled" });

      await client.send();

      assert.strictEqual(client.createSessionCount(), 1);
      const [dataRequest] = client.dataRequests();
      assert.isTrue(
        dataRequest.authorization?.startsWith("Session session-token-1:"),
        `expected a Session header, got: ${dataRequest.authorization}`,
      );
    });

    it("authenticates the Create Session request itself with bearer", async () => {
      const client = createClient({ mode: "enabled" });

      await client.send();

      const createSession = client.seen.find(isCreateSession)!;
      assert.strictEqual(createSession.method, "POST");
      assert.strictEqual(
        createSession.authorization,
        "Bearer fake-bearer-token",
        "Create Session must never be session-authenticated",
      );
    });

    const bearerOnlyCases: { name: string; url: string; method?: HttpMethods }[] = [
      { name: "a sub-resource request", url: `${BLOB_URL}?comp=blocklist` },
      { name: "a container-level request", url: `${ACCOUNT}/mycontainer?restype=container` },
      { name: "a service-level request", url: `${ACCOUNT}/?comp=list` },
      { name: "an upload", url: BLOB_URL, method: "PUT" },
      { name: "a get-properties call", url: BLOB_URL, method: "HEAD" },
    ];

    for (const { name, url, method } of bearerOnlyCases) {
      it(`leaves ${name} on bearer`, async () => {
        const client = createClient({ mode: "enabled" });

        await client.send(url, method);

        assert.strictEqual(client.createSessionCount(), 0);
        assert.strictEqual(client.dataRequests()[0].authorization, "Bearer fake-bearer-token");
      });
    }

    it("honors a configured account name", async () => {
      const derived = createClient({ mode: "enabled" });
      await derived.send();

      const configured = createClient({ mode: "enabled", accountName: "otheraccount" });
      await configured.send();

      const a = derived.dataRequests()[0].authorization!;
      const b = configured.dataRequests()[0].authorization!;
      assert.isTrue(a.startsWith("Session session-token-1:"));
      assert.isTrue(b.startsWith("Session session-token-1:"));
      assert.notStrictEqual(b, a, "the account name is part of the string to sign");
    });
  });
});
