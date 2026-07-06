// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Recorder } from "@azure-tools/test-recorder";
import { stringToUint8Array } from "@azure/core-util";
import type { EkmConnection } from "../../src/models/index.js";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { getEnvironmentVariable } from "./utils/common.js";
import { KeyVaultEkmClient } from "#platform/ekmClient";

describe("EKM connection operations", () => {
  let client: KeyVaultEkmClientlient;
  let recorder: Recorder;

  function buildEkmConnection(): EkmConnection {
    return {
      host: getEnvironmentVariable("EKM_PROXY_HOST"),
      pathPrefix: "/api/v1",
      serverCaCertificates: [
        stringToUint8Array(getEnvironmentVariable("EKM_SERVER_CA_CERTIFICATE"), "base64"),
      ],
    };
  }

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.ekmClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("creates an EKM connection", async () => {
    const created = await client.createEkmConnection(buildEkmConnection());

    expect(created.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
    expect(created.serverCaCertificates.length).toBeGreaterThan(0);
  });

  it("gets the EKM connection", async () => {
    const connection = await client.getEkmConnection();

    expect(connection.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
    expect(connection.serverCaCertificates.length).toBeGreaterThan(0);
  });

  it("updates the EKM connection", async () => {
    const connection = buildEkmConnection();

    const updated = await client.updateEkmConnection(connection);

    expect(updated.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
    expect(updated.serverSubjectCommonName).toEqual(connection.serverSubjectCommonName);
  });

  it("checks the EKM connection", async () => {
    const info = await client.checkEkmConnection();

    expect(info.apiVersion).toBeDefined();
    expect(info.proxyVendor).toBeDefined();
    expect(info.proxyName).toBeDefined();
    expect(info.ekmVendor).toBeDefined();
    expect(info.ekmProduct).toBeDefined();
  });

  it("gets the EKM certificate", async () => {
    const certificate = await client.getEkmCertificate();

    expect(certificate.caCertificates.length).toBeGreaterThan(0);
    expect(certificate.subjectCommonName).toBeDefined();
  });

  it("deletes the EKM connection", async () => {
    const deleted = await client.deleteEkmConnection();

    expect(deleted.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
  });
});
