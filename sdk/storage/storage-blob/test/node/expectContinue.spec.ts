// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import type { HttpMethods, Pipeline, RequestBodyType } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest, RestError } from "@azure/core-rest-pipeline";
import type { Recorder } from "@azure-tools/test-recorder";
import type { Request100ContinueOptions } from "../../src/index.js";
import { BlockBlobClient, ContainerClient, StorageSharedKeyCredential } from "../../src/index.js";
import { getCoreClientOptions, newPipeline } from "../../src/Pipeline.js";
import {
  createAndStartRecorder,
  customizeRequestPolicy,
  getBSU,
  getUniqueName,
} from "../utils/index.js";
import { ACCOUNT, fakeHttpClient } from "./sessionTestUtils.js";

const BLOB_URL = `${ACCOUNT}/mycontainer/blob`;
const EXPECT_CONTINUE = "100-continue";
const DISABLE_VARIABLE = "AZURE_STORAGE_DISABLE_EXPECT_CONTINUE_HEADER";

interface TestRequest {
  method?: HttpMethods;
  body?: RequestBodyType;
  headers?: Record<string, string>;
}

/** A status for one attempt, or a function that runs in place of the transport (e.g. to throw). */
type Answer = number | (() => number);

/** A PUT with a body of known length, like an upload. */
function withBody(content: string = "hello"): TestRequest {
  return { method: "PUT", body: content, headers: { "Content-Length": `${content.length}` } };
}

const WITHOUT_BODY: TestRequest = { method: "PUT" };

function fakeCredential(): StorageSharedKeyCredential {
  return new StorageSharedKeyCredential("myaccount", "a2V5");
}

/**
 * Drives the core pipeline that `getCoreClientOptions` builds for the blob clients, so the policy
 * runs where the clients run it: after the retry policy, before signing. By default the client
 * options set no `httpClient` and a policy after signing answers in place of the default HTTP
 * client; with `withHttpClient` the answers come from a caller-supplied fake `httpClient`.
 */
function createTestPipeline(
  request100ContinueOptions?: Request100ContinueOptions,
  maxTries: number = 1,
  { withHttpClient = false }: { withHttpClient?: boolean } = {},
): {
  /**
   * Sends one request. Each attempt gets the next of `answers` (201 once they run out). Returns
   * the `Expect` header of each attempt as it was sent.
   */
  send: (request: TestRequest, ...answers: Answer[]) => Promise<Array<string | undefined>>;
} {
  let answers: Answer[] = [];
  let sent: Array<string | undefined> = [];
  function answer(expect: string | undefined): number {
    // Copied at send time: the policy removes the header again after each attempt.
    sent.push(expect);
    const next = answers.shift() ?? 201;
    return typeof next === "function" ? next() : next;
  }

  const { httpClient } = fakeHttpClient((request) => ({
    status: answer(request.headers.get("expect")),
  }));
  const coreOptions = getCoreClientOptions(
    newPipeline(fakeCredential(), {
      httpClient: withHttpClient ? httpClient : undefined,
      retryOptions: { maxTries },
      request100ContinueOptions,
    }),
  );
  // Both are declared optional on ExtendedServiceClientOptions but are always populated here.
  const corePipeline = coreOptions.pipeline!;
  const coreHttpClient = coreOptions.httpClient!;
  if (!withHttpClient) {
    corePipeline.addPolicy(
      {
        name: "fakeTransportPolicy",
        sendRequest: async (request) => ({
          request,
          status: answer(request.headers.get("expect")),
          headers: createHttpHeaders(),
        }),
      },
      { afterPhase: "Sign" },
    );
  }

  return {
    send: async ({ method = "PUT", body, headers = {} }, ...nextAnswers) => {
      answers = nextAnswers;
      sent = [];
      await corePipeline.sendRequest(
        coreHttpClient,
        createPipelineRequest({ url: BLOB_URL, method, body, headers: createHttpHeaders(headers) }),
      );
      return sent;
    },
  };
}

// A value in the developer's environment must not decide these tests.
beforeEach(() => {
  vi.stubEnv(DISABLE_VARIABLE, undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Expect: 100-continue in the blob pipeline", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('mode "auto" (the default)', () => {
    it("does not send the header before any throttling response", async () => {
      const pipeline = createTestPipeline();

      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });

    for (const status of [429, 500, 503]) {
      it(`sends the header on requests with a body after a ${status} response`, async () => {
        const pipeline = createTestPipeline();

        assert.deepStrictEqual(await pipeline.send(withBody(), status), [undefined]);
        assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
        assert.deepStrictEqual(await pipeline.send(WITHOUT_BODY), [undefined]);
      });
    }

    it("is turned on by a 503 response to a request without a body", async () => {
      const pipeline = createTestPipeline();

      await pipeline.send({ method: "GET" }, 503);

      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
    });

    for (const status of [200, 408, 502, 504]) {
      it(`does not send the header after a ${status} response`, async () => {
        const pipeline = createTestPipeline();

        await pipeline.send(withBody(), status);

        assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
      });
    }

    it("sends the header on the retry of a throttled attempt", async () => {
      const pipeline = createTestPipeline(undefined, 2);

      assert.deepStrictEqual(await pipeline.send(withBody(), 503, 201), [
        undefined,
        EXPECT_CONTINUE,
      ]);
    });

    it("stops sending the header once autoIntervalInMs has passed", async () => {
      vi.useFakeTimers({ toFake: ["performance"] });
      const pipeline = createTestPipeline({ autoIntervalInMs: 1000 });
      await pipeline.send(withBody(), 503);

      vi.advanceTimersByTime(999);
      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);

      vi.advanceTimersByTime(1);
      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });

    it("keeps the header for a minute after the latest throttling response", async () => {
      vi.useFakeTimers({ toFake: ["performance"] });
      const pipeline = createTestPipeline();
      await pipeline.send({ method: "GET" }, 503);
      vi.advanceTimersByTime(59_000);
      await pipeline.send({ method: "GET" }, 429);

      vi.advanceTimersByTime(59_999);
      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);

      vi.advanceTimersByTime(1);
      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });

    it("decides again on a retry, without the header from the previous attempt", async () => {
      vi.useFakeTimers({ toFake: ["performance"] });
      const pipeline = createTestPipeline({ autoIntervalInMs: 1000 }, 2);
      await pipeline.send({ method: "GET" }, 503);

      const closeWindowAndReset = (): number => {
        vi.advanceTimersByTime(1000);
        throw new RestError("socket hang up", { code: "ECONNRESET" });
      };

      assert.deepStrictEqual(await pipeline.send(withBody(), closeWindowAndReset, 201), [
        EXPECT_CONTINUE,
        undefined,
      ]);
    });

    it("treats an unknown mode like the default", async () => {
      const pipeline = createTestPipeline({ mode: "disabled" as any });

      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
      await pipeline.send({ method: "GET" }, 503);
      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
    });
  });

  describe("with an httpClient in the client options", () => {
    it('defaults to mode "never"', async () => {
      const pipeline = createTestPipeline(undefined, 1, { withHttpClient: true });

      await pipeline.send({ method: "GET" }, 503);

      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });

    it("sends the header when a mode is set", async () => {
      const pipeline = createTestPipeline({ mode: "auto" }, 1, { withHttpClient: true });

      await pipeline.send({ method: "GET" }, 503);

      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
    });

    it('treats an unknown mode like the default, "never"', async () => {
      const pipeline = createTestPipeline({ mode: "disabled" as any }, 1, {
        withHttpClient: true,
      });

      await pipeline.send({ method: "GET" }, 503);

      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });
  });

  describe('mode "never"', () => {
    it("does not send the header, even right after a 503 response", async () => {
      const pipeline = createTestPipeline({ mode: "never" });

      await pipeline.send(withBody(), 503);

      assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
    });
  });

  describe('mode "always"', () => {
    it("sends the header on a request with a body", async () => {
      const pipeline = createTestPipeline({ mode: "always" });

      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
    });

    it("does not send the header on a request without a body", async () => {
      const pipeline = createTestPipeline({ mode: "always" });

      assert.deepStrictEqual(await pipeline.send(WITHOUT_BODY), [undefined]);
    });

    it("does not send the header when Content-Length is 0", async () => {
      const pipeline = createTestPipeline({ mode: "always" });

      assert.deepStrictEqual(await pipeline.send(withBody("")), [undefined]);
    });

    it("sends the header on a stream body of unknown length", async () => {
      const pipeline = createTestPipeline({ mode: "always" });

      assert.deepStrictEqual(
        await pipeline.send({ method: "PUT", body: Readable.from([Buffer.from("hello")]) }),
        [EXPECT_CONTINUE],
      );
    });

    it("leaves an Expect header set by the caller alone, on every attempt", async () => {
      const pipeline = createTestPipeline({ mode: "always" }, 2);
      const request = withBody();
      request.headers = { ...request.headers, Expect: "custom" };

      assert.deepStrictEqual(await pipeline.send(request, 503, 201), ["custom", "custom"]);
    });
  });

  describe("contentLengthThreshold", () => {
    it("does not send the header on a body smaller than the threshold", async () => {
      const pipeline = createTestPipeline({ mode: "always", contentLengthThreshold: 5 });

      assert.deepStrictEqual(await pipeline.send(withBody("hell")), [undefined]);
    });

    it("sends the header on a body as large as the threshold", async () => {
      const pipeline = createTestPipeline({ mode: "always", contentLengthThreshold: 5 });

      assert.deepStrictEqual(await pipeline.send(withBody("hello")), [EXPECT_CONTINUE]);
    });

    it("sends the header on a stream body of unknown length", async () => {
      const pipeline = createTestPipeline({ mode: "always", contentLengthThreshold: 1024 });

      assert.deepStrictEqual(
        await pipeline.send({ method: "PUT", body: Readable.from([Buffer.from("hello")]) }),
        [EXPECT_CONTINUE],
      );
    });
  });

  describe(DISABLE_VARIABLE, () => {
    for (const value of ["true", "TRUE", "1"]) {
      it(`turns the header off when set to "${value}", even in mode "always"`, async () => {
        vi.stubEnv(DISABLE_VARIABLE, value);
        const pipeline = createTestPipeline({ mode: "always" });

        assert.deepStrictEqual(await pipeline.send(withBody()), [undefined]);
      });
    }

    it('leaves the header on when set to "false"', async () => {
      vi.stubEnv(DISABLE_VARIABLE, "false");
      const pipeline = createTestPipeline({ mode: "always" });

      assert.deepStrictEqual(await pipeline.send(withBody()), [EXPECT_CONTINUE]);
    });
  });

  describe("client options", () => {
    it("applies request100ContinueOptions passed to a client constructor", async () => {
      const seen: Array<{ method: string; expect: string | undefined }> = [];
      const { httpClient } = fakeHttpClient((request) => {
        seen.push({ method: request.method, expect: request.headers.get("expect") });
        return { status: 201 };
      });
      const client = new BlockBlobClient(BLOB_URL, fakeCredential(), {
        httpClient,
        request100ContinueOptions: { mode: "always" },
      });

      await client.upload("hello", 5);

      assert.deepStrictEqual(seen, [{ method: "PUT", expect: EXPECT_CONTINUE }]);
    });

    it("shares the throttling window between clients created from one another", async () => {
      const seen: Array<string | undefined> = [];
      const answers = [429];
      const { httpClient } = fakeHttpClient((request) => {
        seen.push(request.headers.get("expect"));
        return { status: answers.shift() ?? 201 };
      });
      const containerClient = new ContainerClient(`${ACCOUNT}/mycontainer`, fakeCredential(), {
        httpClient,
        request100ContinueOptions: { mode: "auto" },
      });

      const throttled = await containerClient
        .getBlockBlobClient("a")
        .upload("hello", 5)
        .catch((e: unknown) => e);
      await containerClient.getBlockBlobClient("b").upload("hello", 5);

      assert.strictEqual((throttled as RestError).statusCode, 429);
      assert.deepStrictEqual(seen, [undefined, EXPECT_CONTINUE]);
    });
  });
});

describe("Expect: 100-continue against the service", () => {
  let recorder: Recorder;
  let containerClient: ContainerClient;

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const blobServiceClient = getBSU(recorder, { request100ContinueOptions: { mode: "always" } });
    containerClient = blobServiceClient.getContainerClient(
      recorder.variable("container", getUniqueName("container")),
    );
    await containerClient.create();
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it('uploads a block blob with mode "always"', async () => {
    const blockBlobClient = containerClient.getBlockBlobClient(
      recorder.variable("blob", getUniqueName("blob")),
    );
    const sent: Array<string | undefined> = [];
    const pipeline: Pipeline = (blockBlobClient as any).storageClientContext.client.pipeline;
    pipeline.addPolicy(
      customizeRequestPolicy((request) => {
        sent.push(request.headers.get("expect"));
      }),
      { afterPhase: "Sign" },
    );

    const content = "Hello, world";
    const response = await blockBlobClient.upload(content, content.length);

    // Every attempt carries the header; a live run may retry a transient failure.
    assert.isNotEmpty(sent);
    for (const value of sent) {
      assert.strictEqual(value, EXPECT_CONTINUE);
    }
    assert.strictEqual(response._response.status, 201);
    assert.isDefined(response.etag);
    assert.isDefined(response.lastModified);
  });
});
