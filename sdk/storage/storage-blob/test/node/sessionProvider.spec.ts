// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import type { WebResourceLike } from "@azure/core-http-compat";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { AzureLogger, getLogLevel, setLogLevel } from "@azure/logger";
import { ContainerSessionProvider } from "../../src/session/ContainerSessionProvider.js";
import { SESSION_REFRESH_BUFFER_MS } from "../../src/session/models.js";
import type { FakeResponse } from "./sessionTestUtils.js";
import {
  ACCOUNT,
  SESSION_KEY,
  createSessionBody,
  fakeHttpClient,
  fakeTokenCredential,
} from "./sessionTestUtils.js";

const SESSION_TOKEN = "the-session-token";

function successBody(expiration: Date, sessionToken: string = SESSION_TOKEN): string {
  return createSessionBody(expiration, sessionToken);
}

function providerWith(
  respond: (request: WebResourceLike) => FakeResponse,
  url: string = ACCOUNT,
): { provider: ContainerSessionProvider; requests: WebResourceLike[] } {
  const { httpClient, requests } = fakeHttpClient(respond);
  // Without this the 5xx cases are retried with backoff, which makes the suite slow and the
  // request counts depend on retry policy rather than on session behavior.
  const provider = new ContainerSessionProvider(url, fakeTokenCredential, {
    httpClient,
    retryOptions: { maxTries: 1 },
  });
  return { provider, requests };
}

function getRequest(url: string = `${ACCOUNT}/mycontainer/blob.txt`) {
  return createPipelineRequest({ url, method: "GET" });
}

function alwaysSucceed(): FakeResponse {
  return { status: 201, body: successBody(new Date(Date.now() + 5 * 60 * 1000)) };
}

describe("ContainerSessionProvider", () => {
  describe("acquires and caches sessions", () => {
    it("returns an active session with the refresh buffer applied", async () => {
      const expiration = new Date(Date.now() + 5 * 60 * 1000);
      expiration.setMilliseconds(0);
      const { provider } = providerWith(() => ({ status: 201, body: successBody(expiration) }));

      const session = await provider.getSession(getRequest());

      assert.strictEqual(session.kind, "session");
      assert.strictEqual(session.kind === "session" && session.sessionToken, SESSION_TOKEN);
      assert.strictEqual(session.kind === "session" && session.sessionKey, SESSION_KEY);
      assert.strictEqual(session.expiresOnTimestamp, expiration.getTime());
      assert.strictEqual(
        session.refreshAfterTimestamp,
        expiration.getTime() - SESSION_REFRESH_BUFFER_MS,
      );
    });

    it("creates one session per container and reuses it across blobs", async () => {
      const { provider, requests } = providerWith(alwaysSucceed);

      await provider.getSession(getRequest(`${ACCOUNT}/mycontainer/one.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/mycontainer/two.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/mycontainer/nested/three.txt`));

      assert.strictEqual(requests.length, 1);
    });

    it("mints a separate session for each container", async () => {
      const { provider, requests } = providerWith(alwaysSucceed);

      await provider.getSession(getRequest(`${ACCOUNT}/first/blob.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/second/blob.txt`));

      assert.strictEqual(requests.length, 2);
      assert.isTrue(requests[0].url.includes("/first"));
      assert.isTrue(requests[1].url.includes("/second"));
    });

    it("treats container names case-insensitively", async () => {
      const { provider, requests } = providerWith(alwaysSucceed);

      await provider.getSession(getRequest(`${ACCOUNT}/MyContainer/blob.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/mycontainer/blob.txt`));

      assert.strictEqual(requests.length, 1);
    });

    it("issues Create Session against the container, never carrying a SAS", async () => {
      const sasUrl = `${ACCOUNT}/mycontainer/blob.txt?sv=2025-01-01&sig=supersecretsignature`;
      const { provider, requests } = providerWith(alwaysSucceed, sasUrl);

      await provider.getSession(getRequest(sasUrl));

      const [request] = requests;
      assert.isTrue(request.url.startsWith(`${ACCOUNT}/mycontainer`), request.url);
      assert.isTrue(request.url.includes("restype=container"), request.url);
      assert.isTrue(request.url.includes("comp=session"), request.url);
      assert.notInclude(request.url, "sig=");
      assert.notInclude(request.url, "supersecretsignature");
      assert.strictEqual(request.method, "POST");
    });

    it("re-acquires only for the invalidated container", async () => {
      let issued = 0;
      const { provider, requests } = providerWith(() => ({
        status: 201,
        body: successBody(new Date(Date.now() + 5 * 60 * 1000), `token-${++issued}`),
      }));

      const first = await provider.getSession(getRequest(`${ACCOUNT}/first/blob.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/second/blob.txt`));
      assert.strictEqual(requests.length, 2);

      provider.invalidateSession(getRequest(`${ACCOUNT}/first/blob.txt`), first);

      await provider.getSession(getRequest(`${ACCOUNT}/first/blob.txt`));
      await provider.getSession(getRequest(`${ACCOUNT}/second/blob.txt`));

      assert.strictEqual(requests.length, 3, "only the invalidated container re-acquires");
    });
  });

  describe("classifies Create Session failures", () => {
    const fallbackCases: { name: string; response: FakeResponse }[] = [
      {
        name: "400 FeatureNotEnabled",
        response: { status: 400, headers: { "x-ms-error-code": "FeatureNotEnabled" } },
      },
      {
        name: "400 featurenotenabled (case-insensitive)",
        response: { status: 400, headers: { "x-ms-error-code": "featurenotenabled" } },
      },
      {
        name: "403 Forbidden",
        response: { status: 403, headers: { "x-ms-error-code": "AuthorizationFailure" } },
      },
      {
        name: "500 InternalError",
        response: { status: 500, headers: { "x-ms-error-code": "InternalError" } },
      },
      {
        name: "503 ServerBusy",
        response: { status: 503, headers: { "x-ms-error-code": "ServerBusy" } },
      },
    ];

    for (const { name, response } of fallbackCases) {
      it(`falls back to bearer on ${name}`, async () => {
        const { provider } = providerWith(() => response);

        const session = await provider.getSession(getRequest());

        assert.strictEqual(session.kind, "bearerFallback");
      });
    }

    it("warns when it falls back, so a silently session-less account is diagnosable", async () => {
      const messages: string[] = [];
      const originalLog = AzureLogger.log;
      const originalLevel = getLogLevel();
      setLogLevel("warning");
      AzureLogger.log = (...args: unknown[]) => messages.push(args.join(" "));

      try {
        const { provider } = providerWith(() => ({
          status: 403,
          headers: { "x-ms-error-code": "AuthorizationFailure" },
        }));

        await provider.getSession(getRequest(`${ACCOUNT}/mycontainer/blob.txt`));
      } finally {
        AzureLogger.log = originalLog;
        setLogLevel(originalLevel);
      }

      assert.isTrue(
        messages.some(
          (message) => message.includes("mycontainer") && message.includes("AuthorizationFailure"),
        ),
        `expected a warning naming the container and the reason, got: ${JSON.stringify(messages)}`,
      );
    });

    const rethrowCases: { name: string; response: FakeResponse }[] = [
      {
        name: "400 with an unrelated error code",
        response: { status: 400, headers: { "x-ms-error-code": "InvalidQueryParameterValue" } },
      },
      {
        name: "404 ContainerNotFound",
        response: { status: 404, headers: { "x-ms-error-code": "ContainerNotFound" } },
      },
      {
        name: "401 NoAuthenticationInformation",
        response: { status: 401, headers: { "x-ms-error-code": "NoAuthenticationInformation" } },
      },
    ];

    for (const { name, response } of rethrowCases) {
      it(`surfaces ${name} to the caller`, async () => {
        const { provider } = providerWith(() => response);

        await expect(provider.getSession(getRequest())).rejects.toThrow();
      });
    }

    it("caches the fallback so a failing account is only probed once per container", async () => {
      const { provider, requests } = providerWith(() => ({
        status: 400,
        headers: { "x-ms-error-code": "FeatureNotEnabled" },
      }));

      for (let i = 0; i < 5; i++) {
        const session = await provider.getSession(
          getRequest(`${ACCOUNT}/mycontainer/blob${i}.txt`),
        );
        assert.strictEqual(session.kind, "bearerFallback");
      }

      assert.strictEqual(requests.length, 1, "the cooldown must suppress repeat attempts");
    });
  });
});
