// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import path, { join } from "node:path";
import { tmpdir } from "node:os";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createJWTTokenFromCertificate } from "./utils/utils.js";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import type { WorkloadIdentityCredentialOptions } from "@azure/identity";
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
  WorkloadIdentityCredential,
} from "@azure/identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe.skip("WorkloadIdentityCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
    await recorder.setMatcher("BodilessMatcher");
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";
  const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;
  const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;
  const certificatePath = env.IDENTITY_SP_CERT_PEM || path.join("assets", "fake-cert.pem");
  const authorityHost = `https://login.microsoftonline.com/${tenantId}`;

  async function getAssertion(): Promise<string> {
    const jwtoken = await createJWTTokenFromCertificate(authorityHost, clientId, certificatePath);
    return jwtoken;
  }

  it("authenticates with WorkloadIdentity Credential", async function () {
    const fileDir = await setupFileandEnv("workload-identity");
    const credential = new WorkloadIdentityCredential(
      recorder.configureClientOptions({
        tenantId,
        clientId,
        tokenFilePath: fileDir.tempFile,
      } as WorkloadIdentityCredentialOptions),
    );
    try {
      const token = await credential.getToken(scope);
      assert.isDefined(token?.token);
      assert.isTrue(token?.expiresOnTimestamp! > Date.now());
    } finally {
      unlinkSync(fileDir.tempFile);
      rmdirSync(fileDir.tempDir);
    }
  });

  it("authenticates with ManagedIdentity Credential", async function () {
    const fileDir = await setupFileandEnv("token-exchange-msi");
    const credential = new ManagedIdentityCredential(clientId, recorder.configureClientOptions({}));
    try {
      const token = await credential.getToken(scope);
      assert.isDefined(token?.token);
      assert.isTrue(token?.expiresOnTimestamp! > Date.now());
    } finally {
      unlinkSync(fileDir.tempFile);
      rmdirSync(fileDir.tempDir);
    }
  });

  it("authenticates with DefaultAzure Credential", async function () {
    const fileDir = await setupFileandEnv("token-exchange-msi");
    const credential = new DefaultAzureCredential(recorder.configureClientOptions({}));
    try {
      const token = await credential.getToken(scope);
      assert.isDefined(token?.token);
      assert.isTrue(token?.expiresOnTimestamp! > Date.now());
    } catch (e) {
      console.log(e);
    } finally {
      unlinkSync(fileDir.tempFile);
      rmdirSync(fileDir.tempDir);
    }
  });
  it("authenticates with DefaultAzure Credential and client ID", async function () {
    const fileDir = await setupFileandEnv("token-exchange-msi");
    const credential = new DefaultAzureCredential(
      recorder.configureClientOptions({
        managedIdentityClientId: "f850650c-1fcf-4489-b46f-71af2e30d360",
      }),
    );
    try {
      const token = await credential.getToken(scope);
      assert.isDefined(token?.token);
      assert.isTrue(token?.expiresOnTimestamp! > Date.now());
    } catch (e) {
      console.log(e);
    } finally {
      unlinkSync(fileDir.tempFile);
      rmdirSync(fileDir.tempDir);
    }
  });

  async function setupFileandEnv(testName: string): Promise<FileDirectory> {
    const testTitle = testName + Date.now().toString();
    const tempDir = mkdtempSync(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const expectedAssertion = await getAssertion();
    writeFileSync(tempFile, expectedAssertion, { encoding: "utf8" });
    env.AZURE_FEDERATED_TOKEN_FILE = tempFile;
    env.AZURE_TENANT_ID = tenantId;
    return {
      tempDir: tempDir,
      tempFile: tempFile,
    };
  }
  interface FileDirectory {
    tempDir: string;
    tempFile: string;
  }
});
