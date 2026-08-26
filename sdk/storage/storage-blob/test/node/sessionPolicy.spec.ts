// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import type { WebResourceLike } from "@azure/core-http-compat";
import type {
  HttpMethods,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { storageSessionAuthenticationPolicy } from "../../src/policies/StorageSessionAuthenticationPolicy.js";
import { SESSION_REFRESH_BUFFER_MS } from "../../src/session/models.js";
import type { FakeResponse } from "./sessionTestUtils.js";
import { ACCOUNT, fakeHttpClient, fakeTokenCredential, sessionIssuer } from "./sessionTestUtils.js";

const BLOB_URL = `${ACCOUNT}/mycontainer/blob.txt`;

interface SentRequest {
  url: string;
  authorization?: string;
  xMsDate?: string;
}

interface Harness {
  send(
    url?: string,
    options?: { method?: HttpMethods; headers?: Record<string, string> },
  ): Promise<PipelineResponse>;
  /** What the transport saw, captured before any later mutation of the same request object. */
  sent: SentRequest[];
  /** What the bearer policy saw on entry, i.e. after the session policy gave up on a request. */
  bearerSeen: SentRequest[];
  createSessionRequests: WebResourceLike[];
}

function createHarness(
  options: {
    createSessionResponse?: (request: WebResourceLike) => FakeResponse;
    statuses?: number[];
    accountName?: string;
  } = {},
): Harness {
  const statuses = [...(options.statuses ?? [])];
  const sent: SentRequest[] = [];
  const bearerSeen: SentRequest[] = [];

  const snapshot = (request: PipelineRequest): SentRequest => ({
    url: request.url,
    authorization: request.headers.get("authorization"),
    xMsDate: request.headers.get("x-ms-date"),
  });

  const next: SendRequest = async (request) => {
    sent.push(snapshot(request));
    return {
      status: statuses.shift() ?? 200,
      headers: createHttpHeaders(),
      request,
    } as PipelineResponse;
  };

  const bearerPolicy: PipelinePolicy = {
    name: "fakeBearerPolicy",
    async sendRequest(request, innerNext) {
      bearerSeen.push(snapshot(request));
      request.headers.set("authorization", "Bearer fake-token");
      return innerNext(request);
    },
  };

  const { httpClient, requests: createSessionRequests } = fakeHttpClient(
    options.createSessionResponse ?? sessionIssuer(),
  );

  const policy = storageSessionAuthenticationPolicy({
    bearerPolicy,
    credential: fakeTokenCredential,
    clientOptions: {
      httpClient,
      retryOptions: { maxTries: 1 },
      sessionOptions: { mode: "enabled", accountName: options.accountName },
    },
  });

  return {
    send: (url = BLOB_URL, { method = "GET", headers = {} } = {}) =>
      policy.sendRequest(
        createPipelineRequest({ url, method, headers: createHttpHeaders(headers) }),
        next,
      ),
    sent,
    bearerSeen,
    createSessionRequests,
  };
}

function parseSessionAuth(header: string | undefined): { token: string; signature: string } {
  assert.isDefined(header, "expected an Authorization header");
  const match = /^Session (?<token>[^:]+):(?<signature>.+)$/.exec(header!);
  assert.isNotNull(match, `expected a Session Authorization header but got: ${header}`);
  return { token: match!.groups!.token, signature: match!.groups!.signature };
}

/** Lets the background refresh finish its round trip; only Date is faked, so timers are real. */
async function settle(): Promise<void> {
  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

describe("storageSessionAuthenticationPolicy", () => {
  it("signs an eligible request with the session token and key", async () => {
    const harness = createHarness();

    const response = await harness.send();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(harness.createSessionRequests.length, 1);
    assert.lengthOf(harness.bearerSeen, 0, "bearer must not be used for a session request");

    const { token, signature } = parseSessionAuth(harness.sent[0].authorization);
    assert.strictEqual(token, "session-token-1");
    assert.isNotEmpty(signature);
    assert.isDefined(harness.sent[0].xMsDate, "x-ms-date is part of the string to sign");
  });

  it("uses bearer for an ineligible request and never mints a session", async () => {
    const harness = createHarness();

    await harness.send(BLOB_URL, { method: "PUT" });

    assert.strictEqual(harness.createSessionRequests.length, 0);
    assert.lengthOf(harness.bearerSeen, 1);
    assert.strictEqual(harness.sent[0].authorization, "Bearer fake-token");
  });

  it("uses bearer when the account has sessions disabled", async () => {
    const harness = createHarness({
      createSessionResponse: () => ({
        status: 400,
        headers: { "x-ms-error-code": "FeatureNotEnabled" },
      }),
    });

    await harness.send();

    assert.lengthOf(harness.bearerSeen, 1);
    assert.strictEqual(harness.sent[0].authorization, "Bearer fake-token");
  });

  it("returns non-401 responses without falling back", async () => {
    for (const status of [200, 206, 304, 404, 412, 500]) {
      const harness = createHarness({ statuses: [status] });

      const response = await harness.send();

      assert.strictEqual(response.status, status);
      assert.lengthOf(harness.bearerSeen, 0, `status ${status} must not fall back`);
      assert.lengthOf(harness.sent, 1, `status ${status} must not be retried`);
    }
  });

  it("falls back to bearer exactly once on 401, stripping the session headers first", async () => {
    const harness = createHarness({ statuses: [401, 200] });

    const response = await harness.send();

    assert.strictEqual(response.status, 200);
    assert.lengthOf(harness.sent, 2);
    assert.lengthOf(harness.bearerSeen, 1);
    assert.isUndefined(
      harness.bearerSeen[0].authorization,
      "the session Authorization header must be removed before bearer runs",
    );
    assert.isUndefined(harness.bearerSeen[0].xMsDate, "x-ms-date must be removed too");
    assert.strictEqual(harness.sent[1].authorization, "Bearer fake-token");
  });

  it("does not retry again when the bearer fallback also gets a 401", async () => {
    const harness = createHarness({ statuses: [401, 401] });

    const response = await harness.send();

    assert.strictEqual(response.status, 401);
    assert.lengthOf(harness.sent, 2, "no infinite retry loop");
    assert.lengthOf(harness.bearerSeen, 1);
  });

  it("refreshes the token after an invalidation and the next request succeeds", async () => {
    // First request is rejected, so its session is dropped; the next one must mint a new token.
    const harness = createHarness({ statuses: [401, 200, 200] });

    const first = await harness.send();
    const second = await harness.send();

    assert.strictEqual(first.status, 200, "the 401 is recovered via bearer");
    assert.strictEqual(second.status, 200);

    const before = parseSessionAuth(harness.sent[0].authorization);
    const after = parseSessionAuth(harness.sent[2].authorization);

    assert.strictEqual(before.token, "session-token-1");
    assert.strictEqual(after.token, "session-token-2");
    assert.notStrictEqual(after.token, before.token, "the invalidated token must not be reused");
    assert.strictEqual(harness.createSessionRequests.length, 2);
  });

  it("reuses one session across requests when nothing invalidates it", async () => {
    const harness = createHarness({ statuses: [200, 200, 200] });

    await harness.send(`${ACCOUNT}/mycontainer/one.txt`);
    await harness.send(`${ACCOUNT}/mycontainer/two.txt`);
    await harness.send(`${ACCOUNT}/mycontainer/three.txt`);

    assert.strictEqual(harness.createSessionRequests.length, 1);
    const tokens = harness.sent.map((request) => parseSessionAuth(request.authorization).token);
    assert.deepStrictEqual(tokens, ["session-token-1", "session-token-1", "session-token-1"]);
  });

  it("produces a stable signature for identical requests", async () => {
    const harness = createHarness({ statuses: [200, 200] });

    await harness.send();
    await harness.send();

    const first = parseSessionAuth(harness.sent[0].authorization);
    const second = parseSessionAuth(harness.sent[1].authorization);
    if (harness.sent[0].xMsDate === harness.sent[1].xMsDate) {
      assert.strictEqual(second.signature, first.signature);
    }
  });

  it("rotates to a new session inside the refresh window without failing a request", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      vi.setSystemTime(Date.UTC(2026, 0, 1));
      const harness = createHarness({ statuses: [200, 200, 200] });

      await harness.send();
      assert.strictEqual(parseSessionAuth(harness.sent[0].authorization).token, "session-token-1");

      // Inside the refresh buffer the still-valid token is used, so no caller ever blocks.
      vi.setSystemTime(Date.now() + 5 * 60 * 1000 - SESSION_REFRESH_BUFFER_MS + 1);
      const duringRefresh = await harness.send();
      assert.strictEqual(duringRefresh.status, 200);
      assert.strictEqual(parseSessionAuth(harness.sent[1].authorization).token, "session-token-1");

      await settle();

      const afterRefresh = await harness.send();
      assert.strictEqual(afterRefresh.status, 200);
      assert.strictEqual(parseSessionAuth(harness.sent[2].authorization).token, "session-token-2");
      assert.strictEqual(harness.createSessionRequests.length, 2);
    } finally {
      vi.useRealTimers();
    }
  });

  it("signs with the configured account name when one is supplied", async () => {
    const derived = createHarness({ statuses: [200] });
    await derived.send();

    const configured = createHarness({ statuses: [200], accountName: "otheraccount" });
    await configured.send();

    const a = parseSessionAuth(derived.sent[0].authorization);
    const b = parseSessionAuth(configured.sent[0].authorization);
    assert.strictEqual(a.token, b.token);
    assert.notStrictEqual(
      b.signature,
      a.signature,
      "the account name is part of the string to sign",
    );
  });

  it("reports an actionable error when the account name cannot be determined", async () => {
    const harness = createHarness();

    await expect(harness.send("https://customdomain.example/mycontainer/blob.txt")).rejects.toThrow(
      /account name/i,
    );
  });
});
