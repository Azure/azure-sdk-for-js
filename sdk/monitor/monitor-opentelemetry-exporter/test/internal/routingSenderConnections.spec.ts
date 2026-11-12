// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import http from "node:http";
import type { RequestListener } from "node:http";
import https from "node:https";
import { connect } from "node:net";
import type { Socket } from "node:net";
import tls from "node:tls";
import { createDefaultHttpClient } from "@azure/core-rest-pipeline";
import { ExportResultCode } from "@opentelemetry/core";
import "../../src/platform/nodejs/index.js";
import type { AzureMonitorExporterOptions } from "../../src/config.js";
import { HttpSender } from "../../src/platform/nodejs/httpSender.js";
import { RoutingSender } from "../../src/platform/nodejs/routingSender.js";
import type { RoutingGroups } from "../../src/utils/routing.js";
import { addToRoutingGroups, getTelemetryRoute } from "../../src/utils/routing.js";
import { successfulBreezeResponse } from "../utils/breezeTestUtils.js";

const certificate = readFileSync(
  new URL("../../../../../eng/common/testproxy/dotnet-devcert.crt", import.meta.url),
);
const pfx = readFileSync(
  new URL("../../../../../eng/common/testproxy/dotnet-devcert.pfx", import.meta.url),
);

function groups(endpoint: string): RoutingGroups {
  const result: RoutingGroups = new Map();
  const route = getTelemetryRoute({
    "microsoft.instrumentation_key": "tenant-key",
    "microsoft.ingestion_endpoint": endpoint,
  })!;
  addToRoutingGroups(result, route, [{ name: "test", time: new Date(0) }]);
  return result;
}

describe("routed sender connections", () => {
  let routers: RoutingSender[];
  let servers: http.Server[];
  let sockets: Set<Socket>;

  beforeEach(() => {
    routers = [];
    servers = [];
    sockets = new Set();
    for (const name of ["HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "NO_PROXY"]) {
      vi.stubEnv(name, "");
      vi.stubEnv(name.toLowerCase(), "");
    }
    // Trust the shared localhost fixture, including inside CONNECT tunnels. Keep
    // certificate verification and the real HTTP transport/socket lifecycle intact.
    const createSecureContext = tls.createSecureContext;
    vi.spyOn(tls, "createSecureContext").mockImplementation((options) =>
      createSecureContext({ ...options, ca: options?.ca ?? certificate }),
    );
  });

  afterEach(async () => {
    await Promise.all(routers.map((sender) => sender.shutdown()));
    for (const socket of sockets) {
      socket.destroy();
    }
    await Promise.all(
      servers.map(
        (server) =>
          new Promise<void>((resolve, reject) =>
            server.close((error) => (error ? reject(error) : resolve())),
          ),
      ),
    );
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  async function listen(server: http.Server): Promise<{ port: number; connections: Set<Socket> }> {
    servers.push(server);
    const connections = new Set<Socket>();
    server.on("connection", (socket) => {
      sockets.add(socket);
      connections.add(socket);
      socket.on("close", () => connections.delete(socket));
    });
    server.keepAliveTimeout = 60_000;
    server.listen(0, "localhost");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected a TCP listener");
    }
    return { port: address.port, connections };
  }

  async function ingestion(handler?: RequestListener): Promise<{
    port: number;
    connections: Set<Socket>;
    endpoint: string;
    requests: http.IncomingMessage[];
  }> {
    const requests: http.IncomingMessage[] = [];
    const server = https.createServer({ pfx, passphrase: "password" }, (request, response) => {
      requests.push(request);
      request.resume();
      if (handler) {
        handler(request, response);
      } else {
        response.end(JSON.stringify(successfulBreezeResponse(1)));
      }
    });
    const listener = await listen(server);
    return { ...listener, endpoint: `https://localhost:${listener.port}`, requests };
  }

  function router(options: AzureMonitorExporterOptions = {}): RoutingSender {
    const sender = new RoutingSender(
      { disableOfflineStorage: true, retryOptions: { maxRetries: 0 }, ...options },
      "",
    );
    routers.push(sender);
    return sender;
  }

  async function fillCache(sender: RoutingSender): Promise<void> {
    const send = vi.spyOn(HttpSender.prototype, "send").mockResolvedValue({
      statusCode: 200,
      result: JSON.stringify(successfulBreezeResponse(1)),
    });
    try {
      for (let index = sender["senders"].size; index < 64; index++) {
        await sender.export(groups(`https://unused-${index}.test`));
      }
    } finally {
      send.mockRestore();
    }
  }

  it.each(["default", "TLS settings", "proxy"])(
    "closes repeated overflow connections using %s, including failures and redirects",
    async (transport) => {
      let status = 200;
      let redirect = false;
      let reset = false;
      const target = await ingestion((request, response) => {
        if (reset) {
          request.socket.destroy();
          return;
        }
        response.statusCode = redirect ? 200 : status;
        if (status === 307 || status === 308) {
          response.setHeader("Location", `${target.endpoint}/v2.1/track`);
          redirect = !redirect;
        }
        response.end(JSON.stringify(successfulBreezeResponse(1)));
      });
      const options: AzureMonitorExporterOptions = {};
      let proxyConnections: Set<Socket> | undefined;
      if (transport === "TLS settings") {
        options.tlsOptions = { ca: certificate };
      } else if (transport === "proxy") {
        const proxy = http.createServer();
        proxy.on("connect", (_request, client, head) => {
          const upstream = connect(target.port, "localhost");
          sockets.add(upstream);
          client.on("error", () => upstream.destroy());
          upstream.on("error", () => client.destroy());
          client.on("close", () => upstream.destroy());
          upstream.on("close", () => client.destroy());
          upstream.once("connect", () => {
            client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
            upstream.write(head);
            upstream.pipe(client);
            client.pipe(upstream);
          });
        });
        const listener = await listen(proxy);
        proxyConnections = listener.connections;
        options.proxyOptions = { host: "http://localhost", port: listener.port };
      }
      const sender = router(options);
      await fillCache(sender);

      for (status of [200, 200, 400, 503, 307, 308, 200]) {
        const firstRequest = target.requests.length;
        const result = await sender.export(groups(target.endpoint));
        expect(result.code, result.error?.message).toBe(
          status === 400 || status === 503 ? ExportResultCode.FAILED : ExportResultCode.SUCCESS,
        );
        expect(target.requests.length - firstRequest).toBe(
          status === 307 || status === 308 ? 2 : 1,
        );
        await vi.waitFor(() => {
          expect(target.connections.size).toBe(0);
          if (proxyConnections) {
            expect(proxyConnections.size).toBe(0);
          }
        });
        expect(
          target.requests.slice(firstRequest).every((r) => r.headers.connection === "close"),
        ).toBe(true);
      }
      reset = true;
      expect((await sender.export(groups(target.endpoint))).code).toBe(ExportResultCode.FAILED);
      await vi.waitFor(() => expect(target.connections.size).toBe(0));
      reset = false;
      expect((await sender.export(groups(target.endpoint))).code).toBe(ExportResultCode.SUCCESS);
      await vi.waitFor(() => expect(target.connections.size).toBe(0));
    },
  );

  it("preserves cached connection reuse while closing overflow connections", async () => {
    const cached = await ingestion();
    const overflow = await ingestion();
    const sender = router();
    expect((await sender.export(groups(cached.endpoint))).code).toBe(ExportResultCode.SUCCESS);
    await fillCache(sender);
    for (let index = 0; index < 3; index++) {
      expect((await sender.export(groups(overflow.endpoint))).code).toBe(ExportResultCode.SUCCESS);
      await vi.waitFor(() => expect(overflow.connections.size).toBe(0));
      expect((await sender.export(groups(cached.endpoint))).code).toBe(ExportResultCode.SUCCESS);
    }
    expect(cached.connections.size).toBe(1);
    expect(new Set(cached.requests.map((request) => request.socket)).size).toBe(1);
    expect(cached.requests.every((request) => request.headers.connection === "keep-alive")).toBe(
      true,
    );
  });

  it.each(["HTTP client", "agent"])("does not close a caller-owned %s", async (transport) => {
    const target = await ingestion();
    const agent = new https.Agent({ keepAlive: true, ca: certificate });
    const destroy = vi.spyOn(agent, "destroy");
    const options: AzureMonitorExporterOptions =
      transport === "agent" ? { agent } : { httpClient: createDefaultHttpClient() };
    try {
      const sender = router(options);
      await fillCache(sender);
      for (let index = 0; index < 3; index++) {
        expect((await sender.export(groups(target.endpoint))).code).toBe(ExportResultCode.SUCCESS);
      }
      await sender.shutdown();
      expect((await router(options).export(groups(target.endpoint))).code).toBe(
        ExportResultCode.SUCCESS,
      );
      expect(destroy).not.toHaveBeenCalled();
      expect(target.connections.size).toBe(1);
      expect(new Set(target.requests.map((request) => request.socket)).size).toBe(1);
      expect(target.requests.every((request) => request.headers.connection === "keep-alive")).toBe(
        true,
      );
    } finally {
      agent.destroy();
    }
  });
});
