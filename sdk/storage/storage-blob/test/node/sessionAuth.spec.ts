// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { BlobServiceClient, ContainerClient, SessionMode } from "../../src/index.js";
import { BlobServiceClient as BlobServiceClientImpl, newPipeline } from "../../src/index.js";
import { createContainerSession } from "../../src/session/createSession.js";
import {
  bodyToString,
  createAndStartRecorder,
  getTokenBSUWithDefaultCredential,
  getUniqueName,
} from "../utils/index.js";

interface AuthCounts {
  createSession: number;
  sessionAuth: number;
  bearerAuth: number;
  createSessionUrls: string[];
}

/**
 * Counts how each request was authenticated. Registered at `perRetry`, which sits outside the
 * Sign phase, so the Authorization header is only final after `next` returns.
 */
function createCountingPolicy(): { policy: PipelinePolicy; counts: AuthCounts } {
  const counts: AuthCounts = {
    createSession: 0,
    sessionAuth: 0,
    bearerAuth: 0,
    createSessionUrls: [],
  };
  const policy: PipelinePolicy = {
    name: "sessionAuthCountingPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      const authorization = request.headers.get("authorization") ?? "";
      if (request.url.includes("comp=session")) {
        counts.createSessionUrls.push(`${response.status} ${request.method} ${request.url}`);
        // A 401 here is the OAuth tenant-discovery challenge, not a distinct attempt: the bearer
        // policy re-sends the very same request once it has resolved the tenant.
        if (response.status !== 401) {
          counts.createSession++;
        }
      } else if (authorization.startsWith("Session ")) {
        counts.sessionAuth++;
      } else if (authorization.startsWith("Bearer ")) {
        counts.bearerAuth++;
      }
      return response;
    },
  };
  return { policy, counts };
}

describe("Session authentication Node.js only", () => {
  let recorder: Recorder;
  let containerName: string;
  let blobName: string;
  let setupContainer: ContainerClient;
  const content = "Hello session authentication!";

  /**
   * The recorder's policies have to travel in the pipeline options rather than be patched onto
   * the finished client: the session provider builds its own client for Create Session, and
   * only options reach it. Without this, Create Session bypasses the test proxy in playback.
   */
  function sessionService(mode?: SessionMode): {
    service: BlobServiceClient;
    counts: AuthCounts;
  } {
    const { policy, counts } = createCountingPolicy();
    const recorderPolicies = recorder.configureClientOptions({}).additionalPolicies ?? [];
    const pipeline = newPipeline(createTestCredential(), {
      ...(mode ? { sessionOptions: { mode } } : {}),
      additionalPolicies: [...recorderPolicies, { policy, position: "perRetry" }],
    } as any);
    const service = new BlobServiceClientImpl(
      `https://${env.ACCOUNT_NAME}.blob.core.windows.net/`,
      pipeline,
    );
    return { service, counts };
  }

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    containerName = recorder.variable("container", getUniqueName("sessioncontainer"));
    blobName = recorder.variable("blob", getUniqueName("sessionblob"));

    const setupService = getTokenBSUWithDefaultCredential(recorder);
    setupContainer = setupService.getContainerClient(containerName);
    await setupContainer.create();
    await setupContainer.getBlockBlobClient(blobName).upload(content, content.length);
  });

  afterEach(async () => {
    await setupContainer.delete();
    await recorder.stop();
  });

  it("creates a session that carries a token, a key, and a future expiry", async () => {
    const { service } = sessionService("enabled");

    const session = await createContainerSession(service.getContainerClient(containerName));

    assert.strictEqual(session.kind, "session");
    assert.isNotEmpty(session.sessionToken);
    assert.isNotEmpty(session.sessionKey);
    assert.isAbove(session.expiresOnTimestamp, Date.now());
    assert.strictEqual(
      session.refreshAfterTimestamp,
      session.expiresOnTimestamp - 30 * 1000,
      "the refresh must be scheduled 30s before expiry",
    );
  });

  it("reports a missing container from Create Session", async () => {
    const { service } = sessionService("enabled");
    const missing = service.getContainerClient(`${containerName}-does-not-exist`);

    try {
      await createContainerSession(missing);
      assert.fail("expected Create Session to fail for a missing container");
    } catch (error: any) {
      assert.strictEqual(error.statusCode, 404);
      assert.strictEqual(error.code, "ContainerNotFound");
    }
  });

  it("downloads a blob using session authentication", async () => {
    const { service, counts } = sessionService("enabled");

    const response = await service
      .getContainerClient(containerName)
      .getBlockBlobClient(blobName)
      .download();

    assert.strictEqual(await bodyToString(response, content.length), content);
    assert.strictEqual(
      counts.createSession,
      1,
      `expected exactly one session, saw: ${JSON.stringify(counts.createSessionUrls, null, 2)}`,
    );
    assert.isAtLeast(counts.sessionAuth, 1, "the download must be session-authenticated");
  });

  it("reuses one session across several downloads", async () => {
    const { service, counts } = sessionService("enabled");
    const blobClient = service.getContainerClient(containerName).getBlockBlobClient(blobName);

    await blobClient.download();
    await blobClient.download();
    await blobClient.download();

    assert.strictEqual(counts.createSession, 1);
    assert.strictEqual(counts.sessionAuth, 3);
  });

  it("falls back to bearer for a sub-resource request", async () => {
    const { service, counts } = sessionService("enabled");

    await service
      .getContainerClient(containerName)
      .getBlockBlobClient(blobName)
      .getBlockList("all");

    assert.strictEqual(counts.createSession, 0, "comp=blocklist must not mint a session");
    assert.strictEqual(counts.sessionAuth, 0);
    assert.isAtLeast(counts.bearerAuth, 1);
  });

  it("never mints a session when the feature is left at its default", async () => {
    const { service, counts } = sessionService();

    const response = await service
      .getContainerClient(containerName)
      .getBlockBlobClient(blobName)
      .download();

    assert.strictEqual(await bodyToString(response, content.length), content);
    assert.strictEqual(counts.createSession, 0, "sessions are opt-in");
    assert.strictEqual(counts.sessionAuth, 0);
    assert.isAtLeast(counts.bearerAuth, 1);
  });
});
