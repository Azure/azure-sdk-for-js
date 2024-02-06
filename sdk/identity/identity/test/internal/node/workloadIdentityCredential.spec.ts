// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import path from "path";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "@azure/test-utils";
import {
  AccessToken,
  DefaultAzureCredential,
  ManagedIdentityCredential,
  WorkloadIdentityCredential,
  WorkloadIdentityCredentialOptions,
} from "../../../src";
import { AuthenticationResult } from "@azure/msal-node";
import sinon from "sinon";

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

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(stubbedToken);
    cleanup = setup.cleanup;
  });

  afterEach(async function () {
    await cleanup();
  });

  it("authenticates with WorkloadIdentity Credential", async function (this: Context) {
    const credential = new WorkloadIdentityCredential({
      tenantId,
      clientId,
      tokenFilePath,
    } as WorkloadIdentityCredentialOptions);
    const token = await credential.getToken(scope);
    assert.isNotNull(token);
    await validateWorkloadIdentityCredential(credential, token!, {
      clientId,
      tenantId,
      tokenFilePath,
    });
  });

  it("authenticates with ManagedIdentity Credential", async function (this: Context) {
    const credential = new ManagedIdentityCredential("dummy-clientId");
    assert.equal(credential["clientId"], "dummy-clientId");
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with DefaultAzure Credential", async function (this: Context) {
    const credential = new DefaultAzureCredential();
    const sandbox = sinon.createSandbox();
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
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      sandbox.restore();
    }
  });
  it("authenticates with DefaultAzure Credential and client ID", async function (this: Context) {
    const credential = new DefaultAzureCredential({
      managedIdentityClientId: "managedIdentityClientId",
      workloadIdentityClientId: "workloadIdentityClientId",
    });
    const sandbox = sinon.createSandbox();
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
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      sandbox.restore();
    }
  });
});

async function validateWorkloadIdentityCredential(
  credential: WorkloadIdentityCredential,
  token: AccessToken,
  options: { clientId: string; tenantId: string; tokenFilePath: string }
) {
  const {
    clientId: expectedClientId,
    tenantId: expectedTenantId,
    tokenFilePath: expectedFederatedTokenFilePath,
  } = options;
  const actualFederatedTokenFilePath = credential["federatedTokenFilePath"];
  const clientAssertionCredential = credential["client"];
  const actualClientId = clientAssertionCredential
    ? clientAssertionCredential["clientId"]
    : undefined;
  const actualTenantId = clientAssertionCredential
    ? clientAssertionCredential["tenantId"]
    : undefined;
  assert.equal(actualFederatedTokenFilePath, expectedFederatedTokenFilePath);
  assert.equal(actualClientId, expectedClientId);
  assert.equal(actualTenantId, expectedTenantId);
  assert.ok(token?.token);
  assert.ok(token?.expiresOnTimestamp! > Date.now());
}
