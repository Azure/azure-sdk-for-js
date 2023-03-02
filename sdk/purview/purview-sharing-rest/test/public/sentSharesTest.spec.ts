// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getLongRunningPoller,
  InPlaceSentShareOutput,
  isUnexpected,
  OperationResponseOutput,
  PurviewSharingClient,
  SentShareInvitationListOutput,
  SentShareListOutput,
  ServiceInvitationOutput,
  UserInvitationOutput,
} from "../../src";
import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Sent Shares Operations", () => {
  let recorder: Recorder;
  let client: PurviewSharingClient;

  const pollingIntervalMs = 30000;
  const sentShareId = "5eb6b8b8-bada-415c-abaa-6a61511570b7";
  const sentShareUserInvitationId = "66b75a2f-9a36-434e-a3e0-0c39dafb39ce";
  const sentShareServiceInvitationId = "b798b80f-b945-424f-834e-7c55a1ec34a8";
  const targetActiveDirectoryId = "cf5f72d3-1204-4980-ab81-21d1ed8804ef";
  const targetObjectId = "2a702475-98ac-43cc-993f-cb6029205292";
  const targetEmail = "user@domain.com";

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Create a new Sent Share", async function () {
    const displayName = "JS-SDK-Sent-Share";
    const response = await client.path("/sentShares/{sentShareId}", sentShareId).put({
      body: {
        shareKind: "InPlace",
        properties: {
          displayName: displayName,
          description: "Sent share created by and for JS SDK tests.",
          artifact: {
            storeKind: "BlobAccount",
            storeReference: {
              referenceName: env.STORAGE_ACCOUNT_RESOURCE_ID ?? "",
              type: "ArmResourceReference",
            },
            properties: {
              paths: [
                {
                  containerName: "sharedcontainer",
                  senderPath: "Folder/File.txt",
                  receiverPath: "ReceiverVisibleFileName.txt",
                },
              ],
            },
          },
        },
      },
    });

    assert.strictEqual(response.status, "201");
    console.log(`Sent Share ${sentShareId} created.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const sentShareResponse = response.body;
    assert.strictEqual(sentShareResponse.id, sentShareId);
    assert.strictEqual(sentShareResponse.properties.state, "Succeeded");
    assert.strictEqual(sentShareResponse.properties.displayName, displayName);
    assert.strictEqual(sentShareResponse.properties.artifact.properties.paths.length, 1);
  });

  it("Get a Sent Share", async function () {
    const response = await client.path("/sentShares/{sentShareId}", sentShareId).get();

    assert.strictEqual(response.status, "200");
    console.log(`Sent Share ${sentShareId} retrieved.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const sentShareResponse: InPlaceSentShareOutput = response.body;
    assert.strictEqual(sentShareResponse.properties.displayName, "JS-SDK-Sent-Share");
    assert.strictEqual(sentShareResponse.shareKind, "InPlace");
    assert.strictEqual(sentShareResponse.id, sentShareId);
    assert.strictEqual(sentShareResponse.properties.state, "Succeeded");
    assert.strictEqual(sentShareResponse.properties.artifact.storeKind, "BlobAccount");
    assert.strictEqual(sentShareResponse.properties.artifact.properties.paths.length, 1);
  });

  it("Update an existing Sent Share", async function () {
    const displayName = "JS-SDK-Sent-Share-Updated";
    const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).put({
      body: {
        shareKind: "InPlace",
        properties: {
          displayName: displayName,
          description: "Sent share updated by and for JS SDK tests.",
          artifact: {
            storeKind: "BlobAccount",
            storeReference: {
              referenceName: env.STORAGE_ACCOUNT_RESOURCE_ID ?? "",
              type: "ArmResourceReference",
            },
            properties: {
              paths: [
                {
                  containerName: "sharedcontainer",
                  senderPath: "Folder/File.txt",
                  receiverPath: "ReceiverVisibleFileName.txt",
                },
                {
                  containerName: "newsharedcontainer",
                  senderPath: "NewFolder/NewFile.txt",
                  receiverPath: "ReceiverVisibleNewFileName.txt",
                },
              ],
            },
          },
        },
      },
    });

    assert.strictEqual(initialResponse.status, "200");
    console.log(`Sent Share ${sentShareId} update initiated.`);

    const poller = await getLongRunningPoller(client, initialResponse, {
      intervalInMs: pollingIntervalMs,
    });

    const response = await poller.pollUntilDone();
    assert.strictEqual(response.status, "200");
    console.log(`Sent Share ${sentShareId} updated.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const sentShareResponse: InPlaceSentShareOutput = response.body;
    assert.strictEqual(sentShareResponse.id, sentShareId);
    assert.strictEqual(sentShareResponse.properties.state, "Succeeded");
    assert.strictEqual(sentShareResponse.properties.displayName, displayName);
    assert.strictEqual(sentShareResponse.properties.artifact.properties.paths.length, 2);
  });

  it("List all Sent Shares", async function () {
    const response = await client
      .path("/sentShares")
      .get({ queryParameters: { referenceName: env.STORAGE_ACCOUNT_RESOURCE_ID ?? "" } });

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const sentsharesListResponse: SentShareListOutput = response.body;
    assert.strictEqual(sentsharesListResponse.value.length, 1);
    console.log("Retrieved Sent Shares.");

    const sentshare = sentsharesListResponse.value[0];
    assert.strictEqual(sentshare.id, sentShareId);
    assert.strictEqual(sentshare.properties.state, "Succeeded");
    assert.strictEqual(sentshare.properties.displayName, "JS-SDK-Sent-Share-Updated");
    assert.strictEqual(sentshare.properties.artifact.properties.paths.length, 2);
  });

  it("Create a new User Invitation", async function () {
    const response = await client
      .path(
        "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
        sentShareId,
        sentShareUserInvitationId
      )
      .put({
        body: {
          invitationKind: "User",
          properties: {
            targetEmail: targetEmail,
            expirationDate: "2023-11-30T23:59:59Z",
            notify: false,
          },
        },
      });

    assert.strictEqual(response.status, "201");
    console.log(
      `Sent Share invitation ${sentShareUserInvitationId} for user ${targetEmail} created.`
    );
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    if (response.body.invitationKind !== "User") {
      assert.fail("Unexpected invitation kind.");
    }

    const invitationResponse: UserInvitationOutput = response.body;
    assert.strictEqual(invitationResponse.id, sentShareUserInvitationId);
    assert.strictEqual(invitationResponse.properties.shareStatus, "Detached");
    assert.strictEqual(invitationResponse.properties.state, "Succeeded");
    assert.strictEqual(invitationResponse.properties.targetEmail, targetEmail);
  });

  it("Notify an invited User", async function () {
    const response = await client
      .path(
        "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}:notify",
        sentShareId,
        sentShareUserInvitationId
      )
      .post();

    assert.strictEqual(response.status, "200");
    console.log(`Sent Share invitation ${sentShareUserInvitationId} notified.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    if (response.body.invitationKind !== "User") {
      assert.fail("Unexpected invitation kind.");
    }

    const invitationResponse: UserInvitationOutput = response.body;
    assert.strictEqual(invitationResponse.id, sentShareUserInvitationId);
    assert.strictEqual(invitationResponse.properties.shareStatus, "Detached");
    assert.strictEqual(invitationResponse.properties.state, "Succeeded");
    assert.strictEqual(invitationResponse.properties.targetEmail, targetEmail);
  });

  it("Create a new Service Invitation", async function () {
    const response = await client
      .path(
        "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
        sentShareId,
        sentShareServiceInvitationId
      )
      .put({
        body: {
          invitationKind: "Service",
          properties: {
            targetActiveDirectoryId,
            targetObjectId,
            expirationDate: "2023-12-31T23:59:59Z",
          },
        },
      });

    assert.strictEqual(response.status, "201");
    console.log(
      `Sent Share invitation ${sentShareServiceInvitationId} for service ${targetActiveDirectoryId}_${targetObjectId} created.`
    );
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    if (response.body.invitationKind !== "Service") {
      assert.fail("Unexpected invitation kind.");
    }

    const invitationResponse: ServiceInvitationOutput = response.body;
    assert.strictEqual(invitationResponse.id, sentShareServiceInvitationId);
    assert.strictEqual(invitationResponse.properties.shareStatus, "Detached");
    assert.strictEqual(invitationResponse.properties.state, "Succeeded");
    assert.strictEqual(
      invitationResponse.properties.targetActiveDirectoryId,
      targetActiveDirectoryId
    );
    assert.strictEqual(invitationResponse.properties.targetObjectId, targetObjectId);
  });

  it("Get a Sent Share Invitation", async function () {
    const response = await client
      .path(
        "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
        sentShareId,
        sentShareServiceInvitationId
      )
      .get();

    assert.strictEqual(response.status, "200");
    console.log(`Sent Share Invitation ${sentShareServiceInvitationId} retrieved.`);
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    if (response.body.invitationKind !== "Service") {
      assert.fail("Unexpected invitation kind.");
    }

    const invitationResponse: ServiceInvitationOutput = response.body;
    assert.strictEqual(invitationResponse.id, sentShareServiceInvitationId);
    assert.strictEqual(invitationResponse.properties.shareStatus, "Detached");
    assert.strictEqual(invitationResponse.properties.state, "Succeeded");
    assert.strictEqual(
      invitationResponse.properties.targetActiveDirectoryId,
      targetActiveDirectoryId
    );
    assert.strictEqual(invitationResponse.properties.targetObjectId, targetObjectId);
  });

  it("List all Sent Share Invitations", async function () {
    const response = await client
      .path("/sentShares/{sentShareId}/sentShareInvitations", sentShareId)
      .get();

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const sentsharesListResponse: SentShareInvitationListOutput = response.body;
    assert.strictEqual(sentsharesListResponse.value.length, 2);
    console.log("Retrieved Sent Share Invitations.");

    const sentshareInvitation = sentsharesListResponse.value.find(
      (i) => i.invitationKind === "Service"
    ) as ServiceInvitationOutput;

    assert.isDefined(sentshareInvitation);
    assert.strictEqual(sentshareInvitation.id, sentShareServiceInvitationId);
    assert.strictEqual(sentshareInvitation.properties.state, "Succeeded");
    assert.strictEqual(
      sentshareInvitation.properties.targetActiveDirectoryId,
      targetActiveDirectoryId
    );
    assert.strictEqual(sentshareInvitation.properties.targetObjectId, targetObjectId);
  });

  it("Delete a Sent Share Invitation", async function () {
    const initialResponse = await client
      .path(
        "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
        sentShareId,
        sentShareServiceInvitationId
      )
      .delete();

    assert.strictEqual(initialResponse.status, "202");
    console.log(`Sent Share Invitation ${sentShareUserInvitationId} delete initiated.`);
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
    console.log(`Sent Share Invitation ${sentShareId} deleted.`);
  });

  it("Delete a Sent Share", async function () {
    const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).delete();

    assert.strictEqual(initialResponse.status, "202");
    console.log(`Sent Share ${sentShareId} delete initiated.`);
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
    console.log(`Sent Share ${sentShareId} deleted.`);
  });
});
