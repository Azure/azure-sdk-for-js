// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isPlaybackMode, type Recorder } from "@azure-tools/test-recorder";
import type { EkmConnection } from "../../src/models/index.js";
import type { KeyVaultEkmClient } from "#platform/ekmClient";
import { randomUUID, stringToUint8Array } from "@azure/core-util";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { getEnvironmentVariable } from "./utils/common.js";

describe("EKM connection operations", () => {
  let client: KeyVaultEkmClient;
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

    await recorder.addSanitizers(
      {
        bodyKeySanitizers: [
          { jsonPath: "$..privateLinkServiceId", value: "fake-private-link-service-id" },
        ],
      },
      ["record", "playback"],
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("manages the full EKM connection lifecycle", async () => {
    let connectionCreated = false;
    try {
      const created = await client.createEkmConnection(buildEkmConnection());
      connectionCreated = true;
      expect(created.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
      expect(created.serverCaCertificates.length).toBeGreaterThan(0);

      const connection = await client.getEkmConnection();
      expect(connection.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
      expect(connection.serverCaCertificates.length).toBeGreaterThan(0);

      const ekmConnection = buildEkmConnection();
      const updated = await client.updateEkmConnection(ekmConnection);
      expect(updated.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
      expect(updated.serverSubjectCommonName).toEqual(ekmConnection.serverSubjectCommonName);

      const info = await client.checkEkmConnection();
      expect(info.apiVersion).toBeDefined();
      expect(info.proxyVendor).toBeDefined();
      expect(info.proxyName).toBeDefined();
      expect(info.ekmVendor).toBeDefined();
      expect(info.ekmProduct).toBeDefined();

      const certificate = await client.getEkmCertificate();
      expect(certificate.caCertificates.length).toBeGreaterThan(0);
      expect(certificate.subjectCommonName).toBeDefined();

      const deleted = await client.deleteEkmConnection();
      connectionCreated = false;
      expect(deleted.host).toEqual(getEnvironmentVariable("EKM_PROXY_HOST"));
    } finally {
      if (connectionCreated) {
        await client.deleteEkmConnection().catch(() => {
          // best-effort cleanup
        });
      }
    }
  });

  it("manages the full EKM private endpoint lifecycle", async () => {
    // EKM private endpoint names are limited to 24 characters.
    const peName = recorder.variable(
      "ekm-private-endpoint-name",
      `ekm-${randomUUID().replace(/-/g, "").slice(0, 20)}`,
    );
    const updateIntervalInMs = isPlaybackMode() ? 0 : 5000;
    let privateEndpointCreated = false;

    try {
      const existingEndpoints = await client.listEkmPrivateEndpoints();
      expect(existingEndpoints.value).toBeDefined();

      const createParameters = {
        privateLinkServiceId: getEnvironmentVariable("EKM_PRIVATE_LINK_SERVICE_ID"),
      };
      const createPoller = client.createEkmPrivateEndpoint(peName, createParameters, {
        updateIntervalInMs,
      });
      privateEndpointCreated = true;
      await createPoller.poll();
      const serializedCreatePoller = await createPoller.serialize();
      const resumedCreatePoller = client.createEkmPrivateEndpoint(peName, createParameters, {
        resumeFrom: serializedCreatePoller,
        updateIntervalInMs,
      });
      const createdOperation = await resumedCreatePoller.pollUntilDone();

      expect(createdOperation.privateEndpointName).toEqual(peName);
      expect(createdOperation.operationType).toEqual("Create");
      expect(createdOperation.status).toEqual("Succeeded");
      expect(createdOperation.jobId).toBeDefined();

      const operationStatus = await client.getEkmPrivateEndpointOperationStatus(
        createdOperation.jobId!,
      );
      expect(operationStatus.jobId).toEqual(createdOperation.jobId);
      expect(operationStatus.status).toEqual("Succeeded");

      const endpoint = await client.getEkmPrivateEndpoint(peName);
      expect(endpoint.name).toEqual(peName);
      expect(endpoint.properties?.privateLinkServiceId).toEqual(
        getEnvironmentVariable("EKM_PRIVATE_LINK_SERVICE_ID"),
      );

      const endpoints = await client.listEkmPrivateEndpoints();
      expect(endpoints.value?.some((item) => item.name === peName)).toBe(true);

      const deletePoller = client.deleteEkmPrivateEndpoint(peName, { updateIntervalInMs });
      const deletedOperation = await deletePoller.pollUntilDone();
      privateEndpointCreated = false;
      expect(deletedOperation.privateEndpointName).toEqual(peName);
      expect(deletedOperation.operationType).toEqual("Delete");
      expect(deletedOperation.status).toEqual("Succeeded");
    } finally {
      if (privateEndpointCreated) {
        await client
          .deleteEkmPrivateEndpoint(peName, { updateIntervalInMs })
          .pollUntilDone()
          .catch(() => {
            // best-effort cleanup
          });
      }
    }
  });
});
