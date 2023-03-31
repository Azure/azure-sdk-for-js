// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import path from "path";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "@azure/test-utils";
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
  TokenCredential,
  WorkloadIdentityCredential,
  WorkloadIdentityCredentialOptions,
} from "../../../src";
import { AuthenticationResult } from "@azure/msal-common";
import sinon from "sinon";

describe("WorkloadIdentityCredential", function () {
  let cleanup: MsalTestCleanup;

  const scope = "https://vault.azure.net/.default";
  const tenantId = env.AZURE_TENANT_ID ?? "tenantId";
  const clientId = env.AZURE_CLIENT_ID ?? "clientId";
  const federatedTokenFilePath =
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
      federatedTokenFilePath,
    } as WorkloadIdentityCredentialOptions);
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with ManagedIdentity Credential", async function (this: Context) {
    console.log("process env IN MS", process.env.AZURE_FEDERATED_TOKEN_FILE);
    const credential = new ManagedIdentityCredential("dummy-clientId");
    assert.equal(credential["clientId"], "dummy-clientId");
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with DefaultAzure Credential", async function (this: Context) {
    console.log("process env IN dac", process.env.AZURE_FEDERATED_TOKEN_FILE);
    const credential = new DefaultAzureCredential();
    try {
      const token = await credential.getToken(scope);
      assert.ok(token?.token);
      assert.ok(token?.expiresOnTimestamp! > Date.now());
    } catch (e) {
      console.log(e);
    }
  });
  it("authenticates with DefaultAzure Credential and client ID", async function (this: Context) {
    console.log("process env IN dac client id", process.env.AZURE_FEDERATED_TOKEN_FILE);
    const credential = new DefaultAzureCredential({
      managedIdentityClientId: "managedIdentityClientId",
      workloadIdentityClientId: "workloadIdentityClientId",
    });
    const sandbox = sinon.createSandbox();
    let successfulSource: TokenCredential | undefined;
    credential["_sources"].forEach((source) => {
      const stub = sandbox.stub(source, "getToken").callsFake((scopes, options) => {
        successfulSource = source;
        return stub.wrappedMethod(scopes, options);
      });
    });
    try {
      const token = await credential.getToken(scope);
      assert.equal(successfulSource?.constructor.name, "WorkloadIdentityCredential");
      const actualFederatedTokenFilePath = (successfulSource as WorkloadIdentityCredential)[
        "federatedTokenFilePath"
      ];
      const clientAssertionCredential = (successfulSource as WorkloadIdentityCredential)["client"];
      const actualClientId = clientAssertionCredential
        ? clientAssertionCredential["clientId"]
        : undefined;
      const actualTenantId = clientAssertionCredential
        ? clientAssertionCredential["tenantId"]
        : undefined;
      assert.equal(actualFederatedTokenFilePath, federatedTokenFilePath);
      assert.equal(actualClientId, clientId);
      assert.equal(actualTenantId, tenantId);
      assert.ok(token?.token);
      assert.ok(token?.expiresOnTimestamp! > Date.now());
    } finally {
      sandbox.restore();
    }
  });
});
