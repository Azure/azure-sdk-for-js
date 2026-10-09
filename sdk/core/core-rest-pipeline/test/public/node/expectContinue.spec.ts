// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import http from "node:http";
import https from "node:https";
import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { Readable } from "node:stream";
import type { Socket } from "node:net";
import type { PipelineRequestOptions } from "../../../src/pipelineRequest.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import {
  bearerTokenAuthenticationPolicy,
  createDefaultHttpClient,
  createFileFromStream,
  createHttpHeaders,
  createPipelineFromOptions,
  createPipelineRequest,
} from "../../../src/index.js";
import { wrapAbortSignalLikePolicy } from "../../../src/policies/wrapAbortSignalLikePolicy.js";

describe("Node Expect negotiation through core-rest-pipeline", () => {
  const cleanups: (() => Promise<void>)[] = [];
  afterEach(async () => {
    for (const close of cleanups.splice(0).reverse()) await close();
  });
  const setup = async (
    secure = false,
  ): Promise<{
    server: http.Server;
    request: (
      options?: Partial<PipelineRequestOptions>,
    ) => ReturnType<typeof createPipelineRequest>;
  }> => {
    const fixture = resolvePath("..", "..", "..", "eng", "common", "testproxy");
    const server = secure
      ? https.createServer({
          pfx: readFileSync(resolvePath(fixture, "dotnet-devcert.pfx")),
          passphrase: "password",
        })
      : http.createServer();
    const sockets = new Set<Socket>();
    server.on("connection", (socket: Socket) => {
      sockets.add(socket);
      socket.once("close", () => sockets.delete(socket));
    });
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        server.removeListener("error", reject);
        resolve();
      });
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Expected a loopback address");
    const agent = secure
      ? new https.Agent({
          keepAlive: true,
          ca: readFileSync(resolvePath(fixture, "dotnet-devcert.crt")),
        })
      : new http.Agent({ keepAlive: true });
    cleanups.push(async () => {
      agent.destroy();
      for (const socket of sockets) socket.destroy();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    });
    return {
      server,
      request: (options = {}) => {
        const request = createPipelineRequest({
          url: `${secure ? "https" : "http"}://localhost:${address.port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders({ Expect: "100-continue" }),
          ...options,
        });
        request.agent = agent;
        return request;
      },
    };
  };

  it.each(["early", "continue", "retry"])(
    "preserves lazy file factories and size through FormData (%s)",
    async (kind) => {
      const fixture = await setup();
      let attempts = 0;
      let expectedSize = 0;
      let actualSize = 0;
      fixture.server.on("checkContinue", (incoming, response) => {
        attempts++;
        if (kind === "early") {
          response.writeHead(417);
          response.end("rejected");
        } else {
          expectedSize = Number(incoming.headers["content-length"]);
          expect(incoming.headers["transfer-encoding"]).toBeUndefined();
          response.writeContinue();
          incoming.on("data", (chunk: Buffer) => {
            actualSize += chunk.length;
          });
          incoming.once("end", () => {
            response.writeHead(kind === "retry" && attempts === 1 ? 503 : 200);
            response.end("complete");
          });
        }
      });
      const factory = vi.fn(() => Readable.from("file body"));
      const request = fixture.request({
        formData: { file: createFileFromStream(factory, "body.txt", { size: 9 }) },
      });
      const response = await createPipelineFromOptions({
        retryOptions: { maxRetries: 1, retryDelayInMs: 1 },
      }).sendRequest(createDefaultHttpClient(), request);
      expect(response.status).toBe(kind === "early" ? 417 : 200);
      expect(factory).toHaveBeenCalledTimes(kind === "early" ? 0 : kind === "retry" ? 2 : 1);
      if (kind !== "early") expect(actualSize).toBe(expectedSize * attempts);
    },
  );

  it("uses fresh gate state for a real authentication challenge", async () => {
    const fixture = await setup(true);
    let attempts = 0;
    const factory = vi.fn(() => Readable.from("authenticated"));
    fixture.server.on("checkContinue", (incoming, response) => {
      attempts++;
      if (attempts === 1) {
        expect(factory).not.toHaveBeenCalled();
        response.writeHead(401, { "WWW-Authenticate": "Bearer" });
        response.end("challenge");
      } else {
        response.writeContinue();
        incoming.resume();
        incoming.once("end", () => response.end("authorized"));
      }
    });
    const policy = bearerTokenAuthenticationPolicy({
      scopes: "test-scope",
      challengeCallbacks: {
        authorizeRequest: async () => {},
        authorizeRequestOnChallenge: async () => true,
      },
    });
    const response = await policy.sendRequest(fixture.request({ body: factory }), (request) =>
      createDefaultHttpClient().sendRequest(request),
    );
    expect(response.bodyAsText).toBe("authorized");
    expect(attempts).toBe(2);
    expect(factory).toHaveBeenCalledOnce();
  });

  it.each(["client", "policy"])(
    "keeps legacy cancellation alive after streamed headers (%s)",
    async (boundary) => {
      const fixture = await setup();
      fixture.server.on("checkContinue", (_incoming, response) => {
        response.writeHead(417);
        response.write("waiting");
      });
      const controller = new AbortController();
      const legacy: AbortSignalLike = {
        get aborted() {
          return controller.signal.aborted;
        },
        addEventListener: vi.fn(controller.signal.addEventListener.bind(controller.signal)),
        removeEventListener: vi.fn(controller.signal.removeEventListener.bind(controller.signal)),
      };
      const source = new Readable({
        read() {
          throw new Error("Untouched upload");
        },
      });
      const request = fixture.request({
        body: source,
        abortSignal: legacy,
        streamResponseStatusCodes: new Set([417]),
      });
      const client = createDefaultHttpClient();
      const response =
        boundary === "client"
          ? await client.sendRequest(request)
          : await wrapAbortSignalLikePolicy().sendRequest(request, (r) => client.sendRequest(r));
      expect(legacy.removeEventListener).not.toHaveBeenCalled();
      const reading = (async () => {
        for await (const chunk of response.readableStreamBody!) expect(chunk).toBeDefined();
      })();
      controller.abort();
      await expect(reading).rejects.toMatchObject({ name: "AbortError" });
      expect(legacy.removeEventListener).toHaveBeenCalledOnce();
      expect(source.destroyed).toBe(false);
      source.destroy();
    },
  );
});
