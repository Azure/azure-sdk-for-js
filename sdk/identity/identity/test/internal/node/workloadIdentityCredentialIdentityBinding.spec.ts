// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadIdentityCredential } from "@azure/identity";
import { env } from "@azure-tools/test-recorder";
import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import os, { tmpdir } from "node:os";
import path from "node:path";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { parseAndValidateCustomTokenProxy } from "$internal/credentials/workloadIdentityCredential.js";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { execSync } from "node:child_process";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "node:https";
import type { Server } from "node:https";

const TEST_CERT_PATH = path.resolve(__dirname, "..", "..", "..", "assets", "fake-cert.pem");

function getTestCertificateContent(): string {
  return readFileSync(TEST_CERT_PATH, "utf8");
}

describe("WorkloadIdentityCredential - Identity Binding Configuration", function () {
  const tenantId = env.AZURE_TENANT_ID ?? "tenantId";
  const clientId = env.AZURE_CLIENT_ID ?? "clientId";
  const tokenFilePath =
    env.AZURE_FEDERATED_TOKEN_FILE || path.join("assets", "fake-federated-token-file.txt");

  afterEach(async function () {
    vi.unstubAllEnvs();
    delete process.env.AZURE_KUBERNETES_TOKEN_PROXY;
    delete process.env.AZURE_KUBERNETES_CA_DATA;
    delete process.env.AZURE_KUBERNETES_CA_FILE;
    delete process.env.AZURE_KUBERNETES_SNI_NAME;
    vi.restoreAllMocks();
  });

  describe("Certificate Validation & Processing", function () {
    let tempDir: string | undefined;
    let tempCaFile: string | undefined;

    afterEach(async function () {
      if (tempDir) {
        try {
          await fs.rm(tempDir, { recursive: true, force: true });
        } catch (error) {
          // Ignore cleanup errors to prevent test suite failures
        } finally {
          tempDir = undefined;
          tempCaFile = undefined;
        }
      }
    });

    it("should throw error for invalid CA certificate data", async function () {
      vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", "https://test-proxy.example.com");
      vi.stubEnv("AZURE_KUBERNETES_CA_DATA", "invalid-certificate-data");

      assert.throws(() => {
        new WorkloadIdentityCredential({
          tenantId,
          clientId,
          tokenFilePath,
          enableAzureProxy: true,
        });
      }, /no valid PEM certificates found/);
    });
    it("should validate CA file changes and cache invalidation", async function () {
      const invalidCaContent = "invalid-certificate-data";
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cert-test-"));
      tempCaFile = path.join(tempDir, "ca.pem");
      // Copy valid certificate initially
      await fs.copyFile(TEST_CERT_PATH, tempCaFile);

      vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", "https://test-proxy.example.com");
      vi.stubEnv("AZURE_KUBERNETES_CA_FILE", tempCaFile);

      const credential = new WorkloadIdentityCredential({
        tenantId,
        clientId,
        tokenFilePath,
        enableAzureProxy: true,
      });

      // First call should succeed with valid certificate
      const tlsSettings1 = await (credential as any).getTlsSettings();
      assert.isDefined(tlsSettings1);
      assert.equal(tlsSettings1.ca, getTestCertificateContent());

      // Second call should return the same cached settings
      const tlsSettings2 = await (credential as any).getTlsSettings();
      assert.strictEqual(tlsSettings1, tlsSettings2); // Same object reference

      await new Promise((resolve) => setTimeout(resolve, 10));
      await fs.writeFile(tempCaFile, invalidCaContent, "utf8");

      // Third call should detect the change and fail with invalid certificate
      let error: Error | undefined;
      try {
        await (credential as any).getTlsSettings();
      } catch (e) {
        error = e as Error;
      }

      assert.isDefined(error);
      assert.match(error!.message, /no valid PEM certificates found/);

      await fs.copyFile(TEST_CERT_PATH, tempCaFile);
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Fourth call should succeed again with the new valid certificate
      const tlsSettings3 = await (credential as any).getTlsSettings();
      assert.isDefined(tlsSettings3);
      assert.equal(tlsSettings3.ca, getTestCertificateContent());

      // Should be a new object reference since cache was invalidated
      assert.equal(tlsSettings3.ca, getTestCertificateContent());
    });

    it("should handle empty CA file during rotation", async function () {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cert-test-"));
      tempCaFile = path.join(tempDir, "ca.pem");

      await fs.copyFile(TEST_CERT_PATH, tempCaFile);

      vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", "https://test-proxy.example.com");
      vi.stubEnv("AZURE_KUBERNETES_CA_FILE", tempCaFile);

      const credential = new WorkloadIdentityCredential({
        tenantId,
        clientId,
        tokenFilePath,
        enableAzureProxy: true,
      });

      // First call should succeed and cache the TLS settings
      const tlsSettings1 = await (credential as any).getTlsSettings();
      assert.isDefined(tlsSettings1);
      assert.equal(tlsSettings1.ca, getTestCertificateContent());

      // Simulate CA rotation by emptying the file
      await fs.writeFile(tempCaFile, "", "utf8");

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Call with empty file should return cached settings from the same credential instance
      const tlsSettings2 = await (credential as any).getTlsSettings();
      assert.strictEqual(tlsSettings1, tlsSettings2);

      // But creating a new credential with empty CA file should fail
      assert.throws(() => {
        new WorkloadIdentityCredential({
          tenantId,
          clientId,
          tokenFilePath,
          enableAzureProxy: true,
        });
      }, /CA certificate file is empty/);
    });
  });

  describe("URL Rewriting", function () {
    let pipelineModule: any;
    let createDefaultHttpClientSpy: any;

    beforeEach(async function () {
      pipelineModule = await import("@azure/core-rest-pipeline");
      createDefaultHttpClientSpy = vi.spyOn(pipelineModule, "createDefaultHttpClient");
    });

    afterEach(function () {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    });

    const testCases = [
      {
        name: "proxy url with / path; request path has no leading slash",
        proxyUrl: "https://proxy.example.com/",
        requestUrl: "https://orig.example.com/login?a=1&b=2",
        wantHost: "proxy.example.com",
        wantPath: "/login",
        wantQuery: "?a=1&b=2",
      },
      {
        name: "proxy url with / path; request path has no path",
        proxyUrl: "https://proxy.example.com/",
        requestUrl: "https://orig.example.com?a=1&b=2",
        wantHost: "proxy.example.com",
        wantPath: "/",
        wantQuery: "?a=1&b=2",
      },
      {
        name: "no trailing slash on proxy; add slash between",
        proxyUrl: "https://proxy.example.com/base",
        requestUrl: "https://orig.example.com/login?a=1&b=2",
        wantHost: "proxy.example.com",
        wantPath: "/base/login",
        wantQuery: "?a=1&b=2",
      },
      {
        name: "trailing slash on proxy; collapse double slash",
        proxyUrl: "https://proxy.example.com/v1/",
        requestUrl: "https://orig.example.com/oauth2/token?x=1",
        wantHost: "proxy.example.com",
        wantPath: "/v1/oauth2/token",
        wantQuery: "?x=1",
      },
      {
        name: "with encoded path segments; maintain encoding",
        proxyUrl: "https://proxy.example.com/base/",
        requestUrl: "https://orig.example.com/a%20b?q=1",
        wantHost: "proxy.example.com",
        wantPath: "/base/a%20b",
        wantQuery: "?q=1",
      },
      {
        name: "both sides no slashes; insert slash",
        proxyUrl: "https://proxy.example.com/api",
        requestUrl: "https://orig.example.com/v1",
        wantHost: "proxy.example.com",
        wantPath: "/api/v1",
        wantQuery: "",
      },
      {
        name: "preserve query and fragment",
        proxyUrl: "https://proxy.example.com/base",
        requestUrl: "https://orig.example.com/path?query=value#fragment",
        wantHost: "proxy.example.com",
        wantPath: "/base/path",
        wantQuery: "?query=value",
        wantFragment: "#fragment",
      },
      {
        name: "empty request path becomes root",
        proxyUrl: "https://proxy.example.com/api",
        requestUrl: "https://orig.example.com",
        wantHost: "proxy.example.com",
        wantPath: "/api/",
        wantQuery: "",
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.name, async function () {
        vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", testCase.proxyUrl);

        let capturedRequest: any;

        const mockClient = {
          sendRequest: vi.fn().mockImplementation(async (request: any) => {
            capturedRequest = { ...request };
            return {
              status: 200,
              bodyAsText: JSON.stringify({ access_token: "test-token", expires_in: 3600 }),
              headers: new Map([["content-type", "application/json"]]),
            };
          }),
        };

        createDefaultHttpClientSpy.mockReturnValue(mockClient);

        const credential = new WorkloadIdentityCredential({
          tenantId,
          clientId,
          tokenFilePath,
          enableAzureProxy: true,
        });

        const proxyClient = (credential as any).createAksProxyClient(testCase.proxyUrl);

        const mockRequest = {
          url: testCase.requestUrl,
          method: "POST",
          headers: createHttpHeaders(),
          body: "test-body",
        };

        await proxyClient.sendRequest(mockRequest);
        assert.isDefined(capturedRequest, "Request should have been captured");

        const rewrittenUrl = new URL(capturedRequest.url);
        assert.equal(rewrittenUrl.protocol, "https:");
        assert.equal(rewrittenUrl.host, testCase.wantHost);
        assert.equal(rewrittenUrl.pathname, testCase.wantPath);
        assert.equal(rewrittenUrl.search, testCase.wantQuery);

        if (testCase.wantFragment) {
          assert.equal(rewrittenUrl.hash, testCase.wantFragment);
        }
      });
    });

    it("should handle encoded URL components correctly", async function () {
      const proxyUrl = "https://proxy.example.com/p%20a";
      const requestUrl = "https://orig.example.com/b%20c?q=%20space";

      vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", proxyUrl);

      let capturedRequest: any;

      const mockClient = {
        sendRequest: vi.fn().mockImplementation(async (request: any) => {
          capturedRequest = { ...request };
          return {
            status: 200,
            bodyAsText: "{}",
            headers: new Map(),
          };
        }),
      };
      createDefaultHttpClientSpy.mockReturnValue(mockClient as any);

      const credential = new WorkloadIdentityCredential({
        tenantId,
        clientId,
        tokenFilePath,
        enableAzureProxy: true,
      });
      const proxyClient = (credential as any).createAksProxyClient(proxyUrl);

      const mockRequest = {
        url: requestUrl,
        method: "GET",
        headers: createHttpHeaders(),
      };

      await proxyClient.sendRequest(mockRequest);

      assert.isDefined(capturedRequest, "Request should have been captured");
      const rewritten = new URL(capturedRequest.url);

      assert.equal(rewritten.pathname, "/p%20a/b%20c");
      assert.equal(rewritten.search, "?q=%20space");
    });
  });

  describe("parseAndValidateCustomTokenProxy", () => {
    const testCases = [
      {
        name: "valid https endpoint without path",
        endpoint: "https://example.com",
        expectError: false,
        expectedPath: "/",
        expectedHost: "example.com",
      },
      {
        name: "valid https endpoint with path",
        endpoint: "https://example.com/token/path",
        expectError: false,
        expectedPath: "/token/path",
      },
      {
        name: "reject non-https scheme",
        endpoint: "http://example.com",
        expectError: true,
        errorContains: "https scheme",
      },
      {
        name: "reject user info",
        endpoint: "https://user:pass@example.com/token",
        expectError: true,
        errorContains: "must not contain user info",
      },
      {
        name: "reject query params",
        endpoint: "https://example.com/token?foo=bar",
        expectError: true,
        errorContains: "must not contain a query",
      },
      {
        name: "reject fragment",
        endpoint: "https://example.com/token#frag",
        expectError: true,
        errorContains: "must not contain a fragment",
      },
      {
        name: "allow valid percent-encoded URLs",
        endpoint: "https://example.com/token%20path",
        expectError: false,
        expectedPath: "/token%20path",
        expectedHost: "example.com",
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.name, () => {
        if (testCase.expectError) {
          assert.throws(
            () => parseAndValidateCustomTokenProxy(testCase.endpoint),
            testCase.errorContains,
          );
        } else {
          const result = parseAndValidateCustomTokenProxy(testCase.endpoint);
          const url = new URL(result);

          assert.equal(url.protocol, "https:");
          if (testCase.expectedHost) {
            assert.equal(url.host, testCase.expectedHost);
          }
          if (testCase.expectedPath) {
            assert.equal(url.pathname, testCase.expectedPath);
          }

          // Ensure no query or fragment
          assert.equal(url.search, "");
          assert.equal(url.hash, "");
        }
      });
    });
  });

  describe("Configuration validation", function () {
    let tempDir: string;
    let testCAFile: string;

    beforeEach(async function () {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "config-test-"));
      testCAFile = path.join(tempDir, "test-ca.pem");
      await fs.copyFile(TEST_CERT_PATH, testCAFile);
    });

    afterEach(async function () {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
      await fs.rm(tempDir, { recursive: true, force: true });
    });

    const testCases = [
      {
        name: "no custom endpoint",
        envs: {},
        expectError: false,
        expectCustomHttpClient: false,
      },
      {
        name: "custom endpoint enabled with minimal settings",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
        },
        expectError: false,
        expectCustomHttpClient: true,
      },
      {
        name: "custom endpoint enabled with CA file + SNI",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
          AZURE_KUBERNETES_SNI_NAME: "custom-sni.example.com",
        },
        expectError: false,
        expectCustomHttpClient: true,
        useCAFile: true,
      },
      {
        name: "custom endpoint enabled with invalid CA file",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
          AZURE_KUBERNETES_CA_FILE: "/non/existent/path/to/custom-ca-file.pem",
        },
        expectError: true,
        expectErrorMessage: /Failed to read CA certificate file/,
      },
      {
        name: "custom endpoint enabled with CA file contains invalid CA data",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
        },
        expectError: true,
        expectErrorMessage: /no valid PEM certificates found/,
        useInvalidCAFile: true,
      },
      {
        name: "custom endpoint enabled with CA data + SNI",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
          AZURE_KUBERNETES_SNI_NAME: "custom-sni.example.com",
        },
        useCAData: true,
        expectError: false,
        expectCustomHttpClient: true,
      },
      {
        name: "custom endpoint enabled with invalid CA data",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
          AZURE_KUBERNETES_CA_DATA: "invalid-ca-cert",
        },
        expectError: true,
        expectErrorMessage: /no valid PEM certificates found/,
      },
      {
        name: "custom endpoint enabled with SNI",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
          AZURE_KUBERNETES_SNI_NAME: "custom-sni.example.com",
        },
        expectError: false,
        expectCustomHttpClient: true,
      },
      {
        name: "custom endpoint disabled with extra environment variables",
        envs: {
          AZURE_KUBERNETES_SNI_NAME: "custom-sni.example.com",
        },
        expectError: true,
        expectErrorMessage:
          /AZURE_KUBERNETES_TOKEN_PROXY is not set but other custom endpoint-related environment variables are present/,
      },
      {
        name: "custom endpoint enabled with both CAData and CAFile",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "https://custom-endpoint.com",
        },
        useCAData: true,
        useCAFile: true,
        expectError: true,
        expectErrorMessage:
          /AZURE_KUBERNETES_CA_FILE and AZURE_KUBERNETES_CA_DATA are mutually exclusive/,
      },
      {
        name: "custom endpoint enabled with invalid endpoint",
        envs: {
          AZURE_KUBERNETES_TOKEN_PROXY: "http://custom-endpoint.com",
        },
        expectError: true,
        expectErrorMessage: /Custom token endpoint must use https scheme/,
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.name, async function () {
        // Set up environment variables
        for (const [key, value] of Object.entries(testCase.envs)) {
          vi.stubEnv(key, value);
        }

        // Set up CA file/data if needed
        if (testCase.useCAFile) {
          vi.stubEnv("AZURE_KUBERNETES_CA_FILE", testCAFile);
        }

        if (testCase.useCAData) {
          vi.stubEnv("AZURE_KUBERNETES_CA_DATA", getTestCertificateContent());
        }

        if (testCase.useInvalidCAFile) {
          const invalidCAFile = path.join(tempDir, "invalid-ca.pem");
          await fs.writeFile(invalidCAFile, "invalid-ca-cert", "utf8");
          vi.stubEnv("AZURE_KUBERNETES_CA_FILE", invalidCAFile);
        }

        if (testCase.expectError) {
          assert.throws(() => {
            new WorkloadIdentityCredential({
              clientId,
              tenantId,
              tokenFilePath,
              enableAzureProxy: true,
            });
          }, testCase.expectErrorMessage);
          return;
        }
        const credential = new WorkloadIdentityCredential({
          clientId,
          tenantId,
          tokenFilePath,
          enableAzureProxy: true,
        });

        const clientAssertionCredential = credential["client"];
        const clientOptions = (clientAssertionCredential as any)?.options;
        const hasCustomHttpClient = clientOptions && clientOptions.httpClient !== undefined;

        if (testCase.expectCustomHttpClient) {
          assert.isTrue(hasCustomHttpClient, "Expected custom httpClient to be set");
        } else {
          assert.isFalse(hasCustomHttpClient, "Expected no custom httpClient");
        }
      });
    });
  });

  describe("Identity binding feature", function () {
    let tempDir: string;

    let originalTlsReject: string | undefined;

    function createTestTokenEndpointServer(
      subjectName: string,
      tokenHandler: (req: IncomingMessage, res: ServerResponse) => void,
    ): { server: Server; caData: string; cleanup: () => void } {
      const { key, cert, keyFile, certFile } = generateSelfSignedCertificate(subjectName, tempDir);

      const serverOptions = {
        key,
        cert,
      };

      const server = createServer(serverOptions, (req, res) => {
        const url = new URL(req.url!, `https://${req.headers.host}`);
        // OIDC discovery document
        if (url.pathname.includes("/.well-known/openid-configuration")) {
          res.writeHead(200, { "Content-Type": "application/json" });
          const pathTenantId = url.pathname.split("/")[1] || "common";
          const discoveryDoc = {
            token_endpoint: `https://${req.headers.host}/token`,
            authorization_endpoint: `https://login.microsoftonline.com/${pathTenantId}/oauth2/v2.0/authorize`,
            issuer: `https://login.microsoftonline.com/${pathTenantId}/v2.0`,
          };
          res.end(JSON.stringify(discoveryDoc));
        } else if (url.pathname === "/common/discovery/instance") {
          res.writeHead(200, { "Content-Type": "application/json" });
          const instanceDoc = {
            tenant_discovery_endpoint: `https://${req.headers.host}/common/v2.0/.well-known/openid_configuration`,
            metadata: [
              {
                preferred_network: `${req.headers.host}`,
                preferred_cache: `${req.headers.host}`,
                aliases: [`${req.headers.host}`],
              },
            ],
          };
          res.end(JSON.stringify(instanceDoc));
        } else if (url.pathname.includes("/token")) {
          // Token endpoint
          tokenHandler(req, res);
        } else {
          res.writeHead(404);
          res.end("Not Found");
        }
      });

      const serverCleanup = () => {
        fs.unlink(keyFile).catch(() => {});
        fs.unlink(certFile).catch(() => {});
      };

      return {
        server,
        caData: cert,
        cleanup: serverCleanup,
      };
    }

    beforeEach(async function () {
      originalTlsReject = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      tempDir = await fs.mkdtemp(path.join(tmpdir(), "tempDir"));
    });

    afterEach(async function () {
      if (originalTlsReject !== undefined) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalTlsReject;
      } else {
        delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      }

      vi.unstubAllEnvs();
      vi.restoreAllMocks();

      await fs.rm(tempDir, { recursive: true, force: true });
    });

    it("should use custom token endpoint with CA data configuration", async function () {
      const subjectName = "ca-data-test.example.com";
      const {
        server,
        caData,
        cleanup: serverCleanup,
      } = createTestTokenEndpointServer(subjectName, (req: any, res: any) => {
        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const params = new URLSearchParams(body);

          assert.equal(
            params.get("client_assertion_type"),
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          );
          assert.equal(params.get("client_id"), clientId);
          assert.equal(params.get("grant_type"), "client_credentials");
          assert.isDefined(params.get("client_assertion"));

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              access_token: "token",
              token_type: "Bearer",
              expires_in: 3600,
            }),
          );
        });
      });

      return new Promise<void>((resolve) => {
        server.listen(0, async () => {
          const address = server.address();
          const port = typeof address === "object" && address ? address.port : 0;
          const serverUrl = `https://localhost:${port}`;

          vi.stubEnv("AZURE_CLIENT_ID", clientId);
          vi.stubEnv("AZURE_FEDERATED_TOKEN_FILE", tokenFilePath);
          vi.stubEnv("AZURE_TENANT_ID", tenantId);
          vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", `${serverUrl}/token`);
          vi.stubEnv("AZURE_KUBERNETES_CA_DATA", caData);

          const credential = new WorkloadIdentityCredential({
            enableAzureProxy: true,
          });
          const token = await credential.getToken("https://vault.azure.net/.default");

          assert.isDefined(token);
          assert.equal(token!.token, "token");

          server.close();
          serverCleanup();
          resolve();
        });
      });
    });

    it("should use custom token endpoint with CA file configuration", async function () {
      const subjectName = "ca-file-test.example.com";
      const {
        server,
        caData,
        cleanup: serverCleanup,
      } = createTestTokenEndpointServer(subjectName, (req: any, res: any) => {
        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const params = new URLSearchParams(body);

          assert.equal(
            params.get("client_assertion_type"),
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          );
          assert.equal(params.get("client_id"), clientId);
          assert.equal(params.get("grant_type"), "client_credentials");
          assert.isDefined(params.get("client_assertion"));

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              access_token: "token",
              token_type: "Bearer",
              expires_in: 3600,
            }),
          );
        });
      });

      return new Promise<void>((resolve) => {
        server.listen(0, async () => {
          const address = server.address();
          const port = typeof address === "object" && address ? address.port : 0;
          const serverUrl = `https://localhost:${port}`;

          const caFile = path.join(tempDir, "ca-cert.pem");
          await fs.writeFile(caFile, caData, "utf8");

          vi.stubEnv("AZURE_FEDERATED_TOKEN_FILE", tokenFilePath);
          vi.stubEnv("AZURE_CLIENT_ID", clientId);
          vi.stubEnv("AZURE_TENANT_ID", tenantId);
          vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", `${serverUrl}/token`);
          vi.stubEnv("AZURE_KUBERNETES_CA_FILE", caFile);

          const credential = new WorkloadIdentityCredential({
            enableAzureProxy: true,
          });
          const token = await credential.getToken("https://vault.azure.net/.default");

          assert.isDefined(token);
          assert.equal(token!.token, "token");

          server.close();
          serverCleanup();
          resolve();
        });
      });
    });

    it("should use custom token endpoint with SNI configuration", async function () {
      const sniName = "test.ests.aks";
      const {
        server,
        caData,
        cleanup: serverCleanup,
      } = createTestTokenEndpointServer(sniName, (req: any, res: any) => {
        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const params = new URLSearchParams(body);

          // Validate the OAuth2 request parameters
          assert.equal(
            params.get("client_assertion_type"),
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          );
          assert.equal(params.get("client_id"), clientId);
          assert.equal(params.get("grant_type"), "client_credentials");
          assert.isDefined(params.get("client_assertion"));

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              access_token: "tokenTest",
              token_type: "Bearer",
              expires_in: 3600,
            }),
          );
        });
      });

      return new Promise<void>((resolve) => {
        server.listen(0, async () => {
          const address = server.address();
          const port = typeof address === "object" && address ? address.port : 0;
          const serverUrl = `https://localhost:${port}`;

          const caFile = path.join(tempDir, "ca-cert.pem");
          await fs.writeFile(caFile, caData, "utf8");

          vi.stubEnv("AZURE_FEDERATED_TOKEN_FILE", tokenFilePath);
          vi.stubEnv("AZURE_CLIENT_ID", clientId);
          vi.stubEnv("AZURE_TENANT_ID", tenantId);
          vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", `${serverUrl}/token`);
          vi.stubEnv("AZURE_KUBERNETES_CA_FILE", caFile);
          vi.stubEnv("AZURE_KUBERNETES_SNI_NAME", sniName);
          const credential = new WorkloadIdentityCredential({
            enableAzureProxy: true,
          });
          const token = await credential.getToken("https://vault.azure.net/.default");
          assert.isDefined(token);
          assert.equal(token!.token, "tokenTest");

          server.close();
          serverCleanup();
          resolve();
        });
      });
    });
  });
});

function generateSelfSignedCertificate(
  subjectName: string,
  tempDir: string,
): { key: string; cert: string; keyFile: string; certFile: string } {
  const keyFile = path.join(tempDir, `test-key-${Date.now()}.pem`);
  const certFile = path.join(tempDir, `test-cert-${Date.now()}.pem`);

  const subj = "/CN=testName";
  const addext = `subjectAltName=DNS:${subjectName}`;
  execSync(
    `openssl req -x509 -nodes -days 1 -newkey rsa:2048 -keyout "${keyFile}" -out "${certFile}" -subj "${subj}" -addext "${addext}"`,
    { stdio: "pipe" },
  );

  const key = readFileSync(keyFile, "utf8");
  const cert = readFileSync(certFile, "utf8");

  return { key, cert, keyFile, certFile };
}
