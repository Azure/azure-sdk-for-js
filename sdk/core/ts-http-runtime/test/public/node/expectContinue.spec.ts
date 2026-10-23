// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import { Readable } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";

const servers: http.Server[] = [];

async function listen(server: http.Server): Promise<number> {
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address");
  }
  return address.port;
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
});

describe("Expect: 100-continue", () => {
  it("waits for 100 Continue before creating and sending the body", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let receivedBody = "";
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      expect(request.headers.expect).toBe("100-continue");
      expect(bodyFactory).not.toHaveBeenCalled();
      request.setEncoding("utf8");
      request.on("data", (chunk) => {
        receivedBody += chunk;
      });
      request.on("end", () => {
        response.end("accepted");
      });
      response.writeContinue();
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(200);
    expect(response.bodyAsText).toBe("accepted");
    expect(receivedBody).toBe("payload");
    expect(bodyFactory).toHaveBeenCalledOnce();
  });

  it("does not create the body when the server sends a final response", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const server = http.createServer();
    server.on("checkContinue", (_request, response) => {
      response.writeHead(417);
      response.end("rejected");
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(417);
    expect(response.bodyAsText).toBe("rejected");
    expect(bodyFactory).not.toHaveBeenCalled();
  });

  it("sends the body after the fixed fallback when no Continue response arrives", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      request.resume();
      request.on("end", () => response.end());
    });
    const port = await listen(server);
    const startedAt = Date.now();

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(200);
    expect(bodyFactory).toHaveBeenCalledOnce();
    expect(Date.now() - startedAt).toBeGreaterThanOrEqual(900);
  });
});
