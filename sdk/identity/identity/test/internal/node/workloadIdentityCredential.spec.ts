// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { AccessToken, WorkloadIdentityCredentialOptions } from "@azure/identity";
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
  WorkloadIdentityCredential,
} from "@azure/identity";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";

import type { AuthenticationResult } from "@azure/msal-node";
import { env } from "@azure-tools/test-recorder";
import path from "node:path";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";

describe("WorkloadIdentityCredential", function () {
  let cleanup: MsalTestCleanup;

  const scope = "https://vault.azure.net/.default";
  const tenantId = env.AZURE_TENANT_ID ?? "tenantId";
  const clientId = env.AZURE_CLIENT_ID ?? "clientId";
  const tokenFilePath =
    env.AZURE_FEDERATED_TOKEN_FILE || path.join("assets", "fake-federated-token-file.txt");
  const authorityHost = `https://login.microsoftonline.com/${tenantId}`;

  const hourInMs = 1000 * 60 * 60;
  const stubbedToken: AuthenticationResult = {
    authority: authorityHost,
    uniqueId: "uniqueId",
    tenantId: tenantId || "common",
    scopes: [scope],
    account: null,
    idToken: "idToken",
    idTokenClaims: {},
    accessToken: "accessToken",
    fromCache: false,
    expiresOn: new Date(Date.now() + 2 * hourInMs),
    tokenType: "tokenType",
    correlationId: "correlationId",
  };

  beforeEach(async function () {
    const setup = await msalNodeTestSetup(stubbedToken);
    cleanup = setup.cleanup;
  });

  afterEach(async function () {
    await cleanup();
  });

  it("authenticates with WorkloadIdentityCredential", async function () {
    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId,
      tokenFilePath,
    } as WorkloadIdentityCredentialOptions);
    const token = await credential.getToken(scope);
    assert.isNotNull(token);
    validateWorkloadIdentityCredential(credential, token!, {
      clientId,
      tenantId,
      tokenFilePath,
      expectCustomHttpClient: false,
    });
  });

  it("authenticates with ManagedIdentityCredential", async function () {
    vi.stubEnv("AZURE_FEDERATED_TOKEN_FILE", tokenFilePath);
    vi.stubEnv("AZURE_CLIENT_ID", clientId);
    vi.stubEnv("AZURE_TENANT_ID", tenantId);
    const credential = new ManagedIdentityCredential("dummy-clientId");
    const token = await credential.getToken(scope);
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with DefaultAzureCredential", async function () {
    const credential = new DefaultAzureCredential();
    try {
      const { token, successfulCredential } = await credential["getTokenInternal"](scope);
      assert.isDefined(successfulCredential);
      assert.equal(successfulCredential.constructor.name, "WorkloadIdentityCredential");
      validateWorkloadIdentityCredential(
        successfulCredential as WorkloadIdentityCredential,
        token,
        {
          clientId,
          tenantId,
          tokenFilePath,
        },
      );
    } catch (e) {
      console.log(e);
    } finally {
      vi.restoreAllMocks();
    }
  });

  it("authenticates with DefaultAzureCredential and client ID", async function () {
    const credential = new DefaultAzureCredential({
      managedIdentityClientId: "managedIdentityClientId",
      workloadIdentityClientId: "workloadIdentityClientId",
    });
    try {
      const { token, successfulCredential } = await credential["getTokenInternal"](scope);
      assert.isDefined(successfulCredential);
      assert.equal(successfulCredential.constructor.name, "WorkloadIdentityCredential");
      validateWorkloadIdentityCredential(
        successfulCredential as WorkloadIdentityCredential,
        token,
        {
          clientId: "workloadIdentityClientId",
          tenantId,
          tokenFilePath,
        },
      );
    } catch (e) {
      console.log(e);
    } finally {
      vi.restoreAllMocks();
    }
  });

  it("creates WorkloadIdentityCredential with enableAzureProxy=false", async function () {
    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId,
      tokenFilePath,
      enableAzureProxy: false,
    });

    const token = await credential.getToken(scope);
    assert.isNotNull(token);

    validateWorkloadIdentityCredential(credential, token!, {
      clientId,
      tenantId,
      tokenFilePath,
      expectCustomHttpClient: false,
    });
  });

  it("creates WorkloadIdentityCredential with enableAzureProxy=true but no env vars", async function () {
    delete process.env.AZURE_KUBERNETES_TOKEN_PROXY;
    delete process.env.AZURE_KUBERNETES_CA_DATA;
    delete process.env.AZURE_KUBERNETES_CA_FILE;
    delete process.env.AZURE_KUBERNETES_SNI_NAME;

    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId,
      tokenFilePath,
      enableAzureProxy: true,
    });

    const token = await credential.getToken(scope);
    assert.isNotNull(token);

    // No AKS env vars are set, the credential should behave like the default case
    validateWorkloadIdentityCredential(credential, token!, {
      clientId,
      tenantId,
      tokenFilePath,
      expectCustomHttpClient: false,
    });
  });

  it("creates WorkloadIdentityCredential with enableAzureProxy=true with env vars", async function () {
    vi.stubEnv("AZURE_KUBERNETES_TOKEN_PROXY", "https://test-proxy.example.com");

    const TEST_CERT_PATH = path.resolve(__dirname, "..", "..", "..", "assets", "fake-cert.pem");
    vi.stubEnv("AZURE_KUBERNETES_CA_DATA", readFileSync(TEST_CERT_PATH, "utf8"));

    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId,
      tokenFilePath,
      enableAzureProxy: true,
    });

    const token = await credential.getToken(scope);
    assert.isNotNull(token);

    validateWorkloadIdentityCredential(credential, token!, {
      clientId,
      tenantId,
      tokenFilePath,
      expectCustomHttpClient: true,
    });
  });
});

function validateWorkloadIdentityCredential(
  credential: WorkloadIdentityCredential,
  token: AccessToken,
  options: {
    clientId: string;
    tenantId: string;
    tokenFilePath: string;
    expectCustomHttpClient?: boolean;
  },
): void {
  const {
    tenantId: expectedTenantId,
    tokenFilePath: expectedFederatedTokenFilePath,
    expectCustomHttpClient = false,
  } = options;
  const actualFederatedTokenFilePath = credential["federatedTokenFilePath"];
  const clientAssertionCredential = credential["client"];
  const actualTenantId = clientAssertionCredential
    ? clientAssertionCredential["tenantId"]
    : undefined;

  assert.equal(actualFederatedTokenFilePath, expectedFederatedTokenFilePath);
  assert.equal(actualTenantId, expectedTenantId);
  assert.isDefined(token?.token);
  assert.isTrue(token?.expiresOnTimestamp! > Date.now());
  const clientOptions = (clientAssertionCredential as any).options;
  const hasCustomHttpClient = clientOptions && clientOptions.httpClient !== undefined;

  if (expectCustomHttpClient) {
    assert.isTrue(
      hasCustomHttpClient,
      "Expected identity binding feature used with custom httpClient",
    );
  } else {
    assert.isFalse(hasCustomHttpClient, "Expected no custom httpClient");
  }
}
