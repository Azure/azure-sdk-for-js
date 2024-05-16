// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";

import { FaceClient, getLongRunningPoller, isUnexpected } from "../../src/index.js";

// The crypto module is not available in browser environment, so implement a simple randomUUID function.
const randomUUID = (): string =>
  "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16),
  );

describe("PersonDirectory", () => {
  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("CreateDynamicPersonGroup", async () => {
    const dynamicPersonGroupId = recorder.variable("dynamicPersonGroupId", randomUUID());
    const createDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .put({
        body: { name: dynamicPersonGroupId },
      });
    assert.equal(createDynamicPersonGroupResponse.status, "200");

    const deleteDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .delete();
    const deleteDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      deleteDynamicPersonGroupResponse,
    );
    await deleteDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(deleteDynamicPersonGroupPoller.getOperationState().status, "succeeded");
  });

  it("CreateDynamicPersonGroupWithPerson", async () => {
    const createPersonResponse = await client.path("/persons").post({
      body: { name: "test" },
    });
    if (isUnexpected(createPersonResponse)) {
      throw new Error(createPersonResponse.body.error.message);
    }
    const { personId } = createPersonResponse.body;

    const dynamicPersonGroupId = recorder.variable("dynamicPersonGroupId", randomUUID());
    const createDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .put({
        body: {
          name: dynamicPersonGroupId,
          addPersonIds: [personId],
        },
      });
    assert.equal(createDynamicPersonGroupResponse.status, "202");

    const createPersonPoller = await getLongRunningPoller(client, createPersonResponse);
    await createPersonPoller.pollUntilDone();
    assert.equal(createPersonPoller.getOperationState().status, "succeeded");

    const createDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      createDynamicPersonGroupResponse,
    );
    await createDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(createDynamicPersonGroupPoller.getOperationState().status, "succeeded");

    const deletePersonResponse = await client.path("/persons/{personId}", personId).delete();
    const deletePersonPoller = await getLongRunningPoller(client, deletePersonResponse);
    await deletePersonPoller.pollUntilDone();
    assert.equal(deletePersonPoller.getOperationState().status, "succeeded");

    const deleteDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .delete();
    const deleteDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      deleteDynamicPersonGroupResponse,
    );
    await deleteDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(deleteDynamicPersonGroupPoller.getOperationState().status, "succeeded");
  });

  it("UpdateDynamicPersonGroup", async () => {
    const dynamicPersonGroupId = recorder.variable("dynamicPersonGroupId", randomUUID());
    await client.path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId).put({
      body: { name: dynamicPersonGroupId },
    });

    const updateDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .patch({
        body: { name: "foo" },
      });
    assert.equal(updateDynamicPersonGroupResponse.status, "200");

    const deleteDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .delete();
    const deleteDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      deleteDynamicPersonGroupResponse,
    );
    await deleteDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(deleteDynamicPersonGroupPoller.getOperationState().status, "succeeded");
  });

  it("UpdateDynamicPersonGroupWithPersonChange", async () => {
    const dynamicPersonGroupId = recorder.variable("dynamicPersonGroupId", randomUUID());
    await client.path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId).put({
      body: { name: dynamicPersonGroupId },
    });

    const createPersonResponse = await client.path("/persons").post({
      body: { name: "test" },
    });
    if (isUnexpected(createPersonResponse)) {
      throw new Error(createPersonResponse.body.error.message);
    }
    const { personId } = createPersonResponse.body;

    const updateDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .patch({
        body: {
          addPersonIds: [personId],
        },
      });
    assert.equal(updateDynamicPersonGroupResponse.status, "202");

    const createPersonPoller = await getLongRunningPoller(client, createPersonResponse);
    await createPersonPoller.pollUntilDone();
    assert.equal(createPersonPoller.getOperationState().status, "succeeded");

    const updateDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      updateDynamicPersonGroupResponse,
    );
    await updateDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(updateDynamicPersonGroupPoller.getOperationState().status, "succeeded");

    const deletePersonResponse = await client.path("/persons/{personId}", personId).delete();
    const deletePersonPoller = await getLongRunningPoller(client, deletePersonResponse);
    await deletePersonPoller.pollUntilDone();
    assert.equal(deletePersonPoller.getOperationState().status, "succeeded");

    const deleteDynamicPersonGroupResponse = await client
      .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
      .delete();
    const deleteDynamicPersonGroupPoller = await getLongRunningPoller(
      client,
      deleteDynamicPersonGroupResponse,
    );
    await deleteDynamicPersonGroupPoller.pollUntilDone();
    assert.equal(deleteDynamicPersonGroupPoller.getOperationState().status, "succeeded");
  });
});
