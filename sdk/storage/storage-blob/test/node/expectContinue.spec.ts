// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomBytes } from "node:crypto";
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import type { HttpMethods, Pipeline, RequestBodyType } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest, RestError } from "@azure/core-rest-pipeline";
import type { Recorder } from "@azure-tools/test-recorder";
import type { ExpectContinueOptions } from "../../src/index.js";
import {
  AnonymousCredential,
  BlockBlobClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "../../src/index.js";
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
  expectContinueOptions?: ExpectContinueOptions,
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
      expectContinueOptions,
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

  describe("minBodySizeInBytes", () => {
    it("does not send the header on a body smaller than the threshold", async () => {
      const pipeline = createTestPipeline({ mode: "always", minBodySizeInBytes: 5 });

      assert.deepStrictEqual(await pipeline.send(withBody("hell")), [undefined]);
    });

    it("sends the header on a body as large as the threshold", async () => {
      const pipeline = createTestPipeline({ mode: "always", minBodySizeInBytes: 5 });

      assert.deepStrictEqual(await pipeline.send(withBody("hello")), [EXPECT_CONTINUE]);
    });

    it("sends the header on a stream body of unknown length", async () => {
      const pipeline = createTestPipeline({ mode: "always", minBodySizeInBytes: 1024 });

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
    it("applies expectContinueOptions passed to a client constructor", async () => {
      const seen: Array<{ method: string; expect: string | undefined }> = [];
      const { httpClient } = fakeHttpClient((request) => {
        seen.push({ method: request.method, expect: request.headers.get("expect") });
        return { status: 201 };
      });
      const client = new BlockBlobClient(BLOB_URL, fakeCredential(), {
        httpClient,
        expectContinueOptions: { mode: "always" },
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
        expectContinueOptions: { mode: "auto" },
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
    const blobServiceClient = getBSU(recorder, { expectContinueOptions: { mode: "always" } });
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

/**
 * How the local server answers one attempt:
 * - `"reject"`: 503 at once, without `100 Continue`;
 * - `"continue"`: `100 Continue` after a pause, then 201 once it has gone out and the body has arrived;
 * - `"noContinue"`: never `100 Continue`, 201 once the body has arrived;
 * - `"readThenReject"`: 503 once the body has arrived, for an attempt without the header;
 * - `"hang"`: no answer.
 */
type ServerAnswer = "reject" | "continue" | "noContinue" | "readThenReject" | "hang";

/** What the local server saw of one attempt. */
interface ServerAttempt {
  expect: string | undefined;
  /** Body bytes that had arrived when the server sent `100 Continue`. */
  bytesBeforeContinue?: number;
  /** Every body byte that arrived, set once the request has ended or its connection has closed. */
  body?: Buffer;
}

/** How long the server waits before `100 Continue`, so a body sent too early would arrive first. */
const CONTINUE_DELAY_IN_MS = 100;

/** Fails fast, instead of at the suite timeout, if a request never finishes. */
async function within<T>(promise: Promise<T>, what: string, ms: number = 10_000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error(`${what} didn't finish in ${ms} ms.`)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * A local blob endpoint that answers each attempt with the next of `answers` and records what
 * arrived. Attempts with `Expect: 100-continue` reach it through `checkContinue`, so it sends
 * `100 Continue` only when the answer does.
 */
async function startUploadServer(
  answers: ServerAnswer[],
  onAttempt?: () => void,
): Promise<{
  blobUrl: string;
  attempts: ServerAttempt[];
  /** Resolves once every attempt so far has ended or lost its connection, so its body is complete. */
  allDone: () => Promise<void>;
  close: () => Promise<void>;
}> {
  const attempts: ServerAttempt[] = [];
  const done: Array<Promise<void>> = [];
  const timers: Array<ReturnType<typeof setTimeout>> = [];
  const handle = (req: http.IncomingMessage, res: http.ServerResponse): void => {
    const attempt: ServerAttempt = { expect: req.headers.expect };
    attempts.push(attempt);
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    done.push(
      new Promise<void>((resolve) => {
        const finish = (): void => {
          attempt.body = Buffer.concat(chunks);
          resolve();
        };
        req.once("end", finish);
        req.once("close", finish);
        // A request answered before its body never ends; its connection closing is the end.
        req.socket.once("close", finish);
      }),
    );
    const reply = (status: number): void => {
      res.writeHead(
        status,
        status === 201 ? { etag: '"0x1"' } : { "x-ms-error-code": "ServerBusy" },
      );
      res.end();
    };
    switch (answers.shift() ?? "continue") {
      case "reject":
        reply(503);
        break;
      case "continue": {
        let continued = false;
        let ended = false;
        timers.push(
          setTimeout(() => {
            attempt.bytesBeforeContinue = Buffer.concat(chunks).length;
            continued = true;
            res.writeContinue();
            if (ended) {
              reply(201);
            }
          }, CONTINUE_DELAY_IN_MS),
        );
        req.once("end", () => {
          ended = true;
          if (continued) {
            reply(201);
          }
        });
        break;
      }
      case "noContinue":
        req.once("end", () => reply(201));
        break;
      case "readThenReject":
        req.once("end", () => reply(503));
        break;
      case "hang":
        break;
    }
    onAttempt?.();
  };
  const server = http.createServer(handle);
  server.on("checkContinue", handle);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    blobUrl: `http://127.0.0.1:${port}/devstoreaccount1/container/blob`,
    attempts,
    allDone: async () => {
      await Promise.all(done);
    },
    close: async () => {
      timers.forEach(clearTimeout);
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    },
  };
}

describe("Expect: 100-continue with the default HTTP client", () => {
  const content = randomBytes(64 * 1024);
  // The retry of a 503 starts right away.
  const retryOptions = { maxTries: 2, retryDelayInMs: 1, maxRetryDelayInMs: 1 };

  it("sends no body when the service rejects the request first, then all of it after 100 Continue", async () => {
    const server = await startUploadServer(["reject", "continue"]);
    try {
      const client = new BlockBlobClient(server.blobUrl, new AnonymousCredential(), {
        expectContinueOptions: { mode: "always" },
        retryOptions,
      });

      const response = await within(client.upload(content, content.length), "The upload");
      await within(server.allDone(), "The server's requests");

      assert.strictEqual(response._response.status, 201);
      assert.deepStrictEqual(
        server.attempts.map((attempt) => attempt.expect),
        [EXPECT_CONTINUE, EXPECT_CONTINUE],
      );
      assert.strictEqual(server.attempts[0].body?.length, 0, "the rejected attempt sent its body");
      assert.strictEqual(server.attempts[1].bytesBeforeContinue, 0, "the body didn't wait");
      assert.isTrue(server.attempts[1].body?.equals(content), "the retry didn't send the body");
    } finally {
      await server.close();
    }
  });

  it('holds back the body of the retry after a 503 in mode "auto" (the default)', async () => {
    const server = await startUploadServer(["readThenReject", "continue"]);
    try {
      const client = new BlockBlobClient(server.blobUrl, new AnonymousCredential(), {
        retryOptions,
      });

      const response = await within(client.upload(content, content.length), "The upload");
      await within(server.allDone(), "The server's requests");

      assert.strictEqual(response._response.status, 201);
      assert.deepStrictEqual(
        server.attempts.map((attempt) => attempt.expect),
        [undefined, EXPECT_CONTINUE],
      );
      assert.isTrue(server.attempts[0].body?.equals(content), "the first attempt sent no body");
      assert.strictEqual(server.attempts[1].bytesBeforeContinue, 0, "the body didn't wait");
      assert.isTrue(server.attempts[1].body?.equals(content), "the retry didn't send the body");
    } finally {
      await server.close();
    }
  });

  it("sends the body when the service never answers 100 Continue", async () => {
    const server = await startUploadServer(["noContinue"]);
    try {
      const client = new BlockBlobClient(server.blobUrl, new AnonymousCredential(), {
        expectContinueOptions: { mode: "always" },
        retryOptions: { maxTries: 1 },
      });

      const response = await within(client.upload(content, content.length), "The upload");
      await within(server.allDone(), "The server's requests");

      assert.strictEqual(response._response.status, 201);
      assert.deepStrictEqual(
        server.attempts.map((attempt) => attempt.expect),
        [EXPECT_CONTINUE],
      );
      assert.isTrue(server.attempts[0].body?.equals(content), "the body wasn't sent");
    } finally {
      await server.close();
    }
  });

  it("sends no body when the upload is aborted while it waits for 100 Continue", async () => {
    const controller = new AbortController();
    const server = await startUploadServer(["hang"], () => controller.abort());
    try {
      const client = new BlockBlobClient(server.blobUrl, new AnonymousCredential(), {
        expectContinueOptions: { mode: "always" },
        retryOptions: { maxTries: 1 },
      });

      const error = await within(
        client.upload(content, content.length, { abortSignal: controller.signal }).then(
          () => undefined,
          (e: unknown) => e,
        ),
        "The upload",
      );
      await within(server.allDone(), "The server's requests");

      assert.strictEqual((error as Error | undefined)?.name, "AbortError");
      assert.strictEqual(server.attempts[0].body?.length, 0, "the aborted attempt sent its body");
    } finally {
      await server.close();
    }
  });
});
