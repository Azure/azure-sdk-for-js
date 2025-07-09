// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as http from "http";
import * as net from "net";
import { HttpsProxyAgent } from "https-proxy-agent";
import { CosmosClient, type CosmosClientOptions } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { addEntropy } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

const PROXY_PORT = 8989;
const TEST_TIMEOUT_MS = 30000;

interface ProxyServer extends http.Server {
  closeAsync?: () => Promise<void>;
}

if (!isBrowser()) {
  describe("Validate http proxy setting in environment variable", () => {
    let proxyServer: ProxyServer | null = null;
    let testDatabaseId: string;

    beforeAll(async () => {
      // Generate test database ID once
      testDatabaseId = addEntropy("ProxyTest");
    });

    afterAll(async () => {
      if (proxyServer) {
        await proxyServer.closeAsync?.();
        proxyServer = null;
      }
    });

    const createProxyServer = (): ProxyServer => {
      const server = http.createServer((_req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
      }) as ProxyServer;

      // Handle CONNECT method for HTTPS
      server.on("connect", (req: http.IncomingMessage, clientSocket: net.Socket, head: Buffer) => {
        // Parse the host:port from the CONNECT request
        const [host, port] = req.url!.split(":");
        const serverSocket = net.connect(Number(port), host, () => {
          clientSocket.write(
            "HTTP/1.1 200 Connection Established\r\n" + "Proxy-agent: Node.js-Proxy\r\n" + "\r\n",
          );
          if (head && head.length) serverSocket.write(head);
          serverSocket.pipe(clientSocket);
          clientSocket.pipe(serverSocket);
        });

        // Add timeouts and error handling
        serverSocket.setTimeout(10000, () => {
          serverSocket.destroy();
          clientSocket.destroy();
        });
        clientSocket.setTimeout(10000, () => {
          serverSocket.destroy();
          clientSocket.destroy();
        });

        serverSocket.on("error", (err) => {
          console.error("Server socket error:", err);
          clientSocket.destroy();
        });

        clientSocket.on("error", (err) => {
          console.error("Client socket error:", err);
          serverSocket.destroy();
        });
      });

      // Add closeAsync method to properly close the server
      server.closeAsync = () =>
        new Promise<void>((resolve, reject) => {
          server.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });

      return server;
    };

    const createTestClient = (options: Partial<CosmosClientOptions> = {}): CosmosClient => {
      return new CosmosClient({
        endpoint,
        key: masterKey,
        ...options,
        connectionPolicy: {
          enableBackgroundEndpointRefreshing: false,
          ...options.connectionPolicy,
        },
      });
    };

    const startProxyServer = (port: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (proxyServer) {
          proxyServer.listen(port, "127.0.0.1", (err?: Error) => {
            if (err) reject(err);
            else resolve();
          });
        } else {
          reject(new Error("Proxy server not initialized"));
        }
      });
    };

    it(
      "nativeApi Client should successfully execute request",
      async () => {
        // Create a new proxy server for this test
        proxyServer = createProxyServer();

        try {
          // Start the proxy server
          await startProxyServer(PROXY_PORT);

          // Create a client with proxy configuration using HttpsProxyAgent
          const agent = new HttpsProxyAgent(`http://127.0.0.1:${PROXY_PORT}`);
          const client = createTestClient({ agent });

          // Test a simple operation
          const { database } = await client.databases.create({ id: testDatabaseId });
          expect(database.id).toBe(testDatabaseId);

          // Cleanup database
          await client.database(testDatabaseId).delete();
        } finally {
          // Ensure proxy server is stopped
          if (proxyServer) {
            await proxyServer.closeAsync?.();
            proxyServer = null;
          }
        }
      },
      TEST_TIMEOUT_MS,
    );

    it(
      "nativeApi Client should execute request in error while the proxy setting is not correct",
      async () => {
        // Use an invalid proxy port that's definitely not in use
        const invalidPort = 12345;
        const agent = new HttpsProxyAgent(`http://127.0.0.1:${invalidPort}`);
        const client = createTestClient({ agent });

        // The request should fail due to proxy connection error
        // Add a timeout to ensure the test does not hang indefinitely
        await expect(
          Promise.race([
            client.databases.create({ id: testDatabaseId + "_invalid" }),
            new Promise((_resolve, reject) =>
              setTimeout(() => reject(new Error("Proxy connection timeout")), 10000),
            ),
          ]),
        ).rejects.toThrow();
      },
      TEST_TIMEOUT_MS,
    );
  });
}
