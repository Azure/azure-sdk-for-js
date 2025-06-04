// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as http from "http";
import * as net from "net";
import { URL } from "url";
import { ProxyAgent } from "proxy-agent";
import { CosmosClient, CosmosClientOptions } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { addEntropy } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

const PROXY_PORT = 8989;
const TEST_TIMEOUT_MS = 30000;

interface ProxyServer extends http.Server {
  closeAsync?: () => Promise<void>;
}

if (!isBrowser()) {
  describe("HTTP Proxy Integration Tests", () => {
    let proxyServer: ProxyServer;
    let testDatabaseId: string;

    beforeAll(() => {
      // Create proxy server
      proxyServer = http.createServer((_req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
      }) as ProxyServer;

      // Handle CONNECT method for HTTPS
      proxyServer.on(
        "connect",
        (req: http.IncomingMessage, clientSocket: net.Socket, head: Buffer) => {
          try {
            const serverUrl = new URL(`http://${req.url}`);
            const serverSocket = net.connect(
              parseInt(serverUrl.port, 10),
              serverUrl.hostname,
              () => {
                clientSocket.write(
                  "HTTP/1.1 200 Connection Established\r\n" +
                    "Proxy-agent: Node.js-Proxy\r\n" +
                    "\r\n",
                );
                serverSocket.write(head);
                serverSocket.pipe(clientSocket);
                clientSocket.pipe(serverSocket);
              },
            );

            serverSocket.on("error", (err) => {
              console.error("Server socket error:", err);
              clientSocket.destroy();
            });
          } catch (err) {
            console.error("Error in proxy connect handler:", err);
            clientSocket.destroy();
          }
        },
      );

      // Add closeAsync method to properly close the server
      proxyServer.closeAsync = () =>
        new Promise<void>((resolve, reject) => {
          proxyServer.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });

      // Generate test database ID once
      testDatabaseId = addEntropy("ProxyTest");
    });

    afterAll(async () => {
      if (proxyServer) {
        await proxyServer.closeAsync?.();
      }
    });

    const createTestClient = (options: Partial<CosmosClientOptions> = {}) => {
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
      return new Promise((resolve) => {
        proxyServer.listen(port, "localhost", resolve);
      });
    };

    it(
      "nativeApi Client Should successfully execute request",
      async () => {
        // Start the proxy server
        await startProxyServer(PROXY_PORT);

        // Create a client with proxy configuration
        const agent = new ProxyAgent({
          getProxyForUrl: () => `http://localhost:${PROXY_PORT}`,
        });

        const client = createTestClient({ agent });

        try {
          // Test a simple operation
          const { database } = await client.databases.create({ id: testDatabaseId });
          expect(database.id).toBe(testDatabaseId);
        } finally {
          // Cleanup
          try {
            await client.database(testDatabaseId).delete();
          } catch (error) {
            // Ignore cleanup errors
            console.warn("Cleanup failed:", error);
          }
        }
      },
      TEST_TIMEOUT_MS,
    );

    it(
      "nativeApi Client Should execute request in error while the proxy setting is not correct",
      async () => {
        // Don't start the proxy server for this test
        const invalidPort = 12345; // Use a port that's definitely not in use
        const agent = new ProxyAgent({
          getProxyForUrl: () => `http://localhost:${invalidPort}`,
          // Set a lower timeout for the test to fail faster
          timeout: 5000,
        });

        const client = createTestClient({ agent });

        await expect(client.databases.create({ id: testDatabaseId })).rejects.toThrow();
      },
      TEST_TIMEOUT_MS,
    );
  });
}
