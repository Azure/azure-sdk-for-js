// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  InPlaceReceivedShareOutput,
  OperationResponseOutput,
  PurviewSharingClient,
  ReceivedShareListOutput,
} from "../../src/index.js";
import { getLongRunningPoller, isUnexpected } from "@azure-rest/purview-sharing";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Received Shares Operations", () => {
  let recorder: Recorder;
  let client: PurviewSharingClient;

  let receivedShareId = "206016dd-fd49-420c-9545-9663badda4e3";
  const pollingIntervalMs = isPlaybackMode() ? 0 : 30000;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("List all Detached Received Shares", async () => {
    const response = await client.path("/receivedShares/detached").get({
      queryParameters: { filter: "properties/StoreKind eq 'AdlsGen2Account'" },
    });

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const detachedReceivedShares: ReceivedShareListOutput = response.body;
    assert.isNotEmpty(detachedReceivedShares.value);

    const detachedReceivedShare = detachedReceivedShares.value[0];
    assert.isNotEmpty(detachedReceivedShare.id);
    receivedShareId = detachedReceivedShare.id ?? receivedShareId;

    assert.strictEqual(detachedReceivedShare.properties.state, "Succeeded");
    assert.strictEqual(detachedReceivedShare.properties.shareStatus, "Detached");
    assert.strictEqual(detachedReceivedShare.properties.assetStoreKind, "AdlsGen2Account");
  });

  it("Attach Received Share", async () => {
    const displayName = "JS-SDK-Received-Share";
    const initialResponse = await client
      .path("/receivedShares/{receivedShareId}", receivedShareId)
      .put({
        body: {
          shareKind: "InPlace",
          properties: {
            assetStoreKind: "AdlsGen2Account",
            displayName: displayName,
            sink: {
              storeKind: "AdlsGen2Account",
              storeReference: {
                referenceName: env.STORAGE_ACCOUNT_RESOURCE_ID ?? "",
                type: "ArmResourceReference",
              },
              properties: {
                containerName: "targetcontainer",
                folder: "receivedData",
                mountPath: "",
              },
            },
          },
        },
      });

    assert.strictEqual(initialResponse.status, "201");
    console.log(`Received Share ${receivedShareId} attach operation initiated.`);

    const poller = await getLongRunningPoller(client, initialResponse, {
      intervalInMs: pollingIntervalMs,
    });

    const response = await poller.pollUntilDone();
    assert.strictEqual(response.status, "200");
    console.log(`Received Share ${receivedShareId} attached to destination store.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    const receivedShareResponse: InPlaceReceivedShareOutput = response.body;
    assert.strictEqual(receivedShareResponse.id, receivedShareId);
    assert.strictEqual(receivedShareResponse.properties.state, "Succeeded");
    assert.strictEqual(receivedShareResponse.properties.shareStatus, "Attached");
    assert.strictEqual(receivedShareResponse.properties.displayName, displayName);
  });

  it("List all Attached Received Shares", async () => {
    const response = await client
      .path("/receivedShares/attached")
      .get({ queryParameters: { referenceName: env.STORAGE_ACCOUNT_RESOURCE_ID ?? "" } });

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const attachedReceivedShares: ReceivedShareListOutput = response.body;
    assert.isNotEmpty(attachedReceivedShares.value);

    const attachedReceivedShare = attachedReceivedShares.value[0];
    assert.strictEqual(attachedReceivedShare.id, receivedShareId);
    assert.strictEqual(attachedReceivedShare.properties.state, "Succeeded");
    assert.strictEqual(attachedReceivedShare.properties.shareStatus, "Attached");
    assert.strictEqual(attachedReceivedShare.properties.assetStoreKind, "AdlsGen2Account");
  });

  it("Delete a Received Share", async () => {
    const initialResponse = await client
      .path("/receivedShares/{receivedShareId}", receivedShareId)
      .delete();

    assert.strictEqual(initialResponse.status, "202");
    console.log(`Received Share ${receivedShareId} delete initiated.`);
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const initialOperationResponse: OperationResponseOutput = initialResponse.body;
    assert.strictEqual(initialOperationResponse.status, "NotStarted");

    const poller = await getLongRunningPoller(client, initialResponse, {
      intervalInMs: pollingIntervalMs,
    });

    const response = await poller.pollUntilDone();
    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const operationResponse: OperationResponseOutput = response.body;
    assert.strictEqual(operationResponse.status, "Succeeded");
    assert.isNull(operationResponse.error);
    console.log(`Received Share ${receivedShareId} deleted.`);
  });
});
