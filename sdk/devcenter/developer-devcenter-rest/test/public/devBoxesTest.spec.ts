// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, beforeEach, afterEach, expect, assert } from "vitest";
import {
  AzureDeveloperDevCenterClient,
  getLongRunningPoller,
  isUnexpected,
  PoolOutput,
  paginate,
  DevBoxOutput,
  DevBoxActionOutput,
  ScheduleOutput,
  DelayActionsParameters,
  DevBoxActionDelayResultOutput,
  CreateDevBoxParameters,
} from "../../src/index.js";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DevCenter Dev Boxes Operations Test", () => {
  let recorder: Recorder;
  let client: AzureDeveloperDevCenterClient;

  let endpoint: string;
  let projectName: string;
  let userId: string;
  let poolName: string;
  let devboxName: string;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);

    endpoint = env["ENDPOINT"] || "";
    projectName = env["DEFAULT_PROJECT_NAME"] || "";
    userId = env["DEFAULT_USER_NAME"] || "";
    poolName = env["DEFAULT_POOL_NAME"] || "";
    devboxName = env["DEFAULT_DEVBOX_NAME"] || "";

    client = createRecordedClient(recorder, endpoint, {
      allowInsecureConnection: false,
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("GetPool", async function () {
    const poolOutput = await client
      .path("/projects/{projectName}/pools/{poolName}", projectName, poolName)
      .get();

    if (isUnexpected(poolOutput)) {
      throw poolOutput.body.error;
    }

    expect(poolOutput.body.name).to.equal(poolName);
  });

  it("GetPools", async function () {
    const poolsList = await client.path("/projects/{projectName}/pools", projectName).get();

    if (isUnexpected(poolsList)) {
      throw poolsList.body.error;
    }

    const pools: PoolOutput[] = [];
    console.log("Iterating through pool results:");

    for await (const pool of paginate(client, poolsList)) {
      const { name } = pool;
      console.log(`Received pool "${name}"`);
      pools.push(pool);
    }

    expect(pools.length).to.equal(1);
    expect(pools[0].name).to.equal(poolName);
  });

  it("GetSchedule", async function () {
    const scheduleOutput = await client
      .path(
        "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
        projectName,
        poolName,
        "default",
      )
      .get();

    if (isUnexpected(scheduleOutput)) {
      throw scheduleOutput.body.error;
    }

    expect(scheduleOutput.body.name).to.equal("default");
  });

  it("GetSchedules", async function () {
    const schedulesListResponse = await client
      .path("/projects/{projectName}/pools/{poolName}/schedules", projectName, poolName)
      .get();

    if (isUnexpected(schedulesListResponse)) {
      throw schedulesListResponse.body.error;
    }

    const schedules: ScheduleOutput[] = [];
    console.log("Iterating through schedules results:");

    for await (const schedule of paginate(client, schedulesListResponse)) {
      const { name } = schedule;
      console.log(`Received schedule "${name}"`);
      schedules.push(schedule);
    }

    expect(schedules.length).to.equal(1);
    expect(schedules[0].name).to.equal("default");
  });

  it("GetDevBox", async function () {
    await setupDevBox();
    const devboxOutput = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
        projectName,
        userId,
        devboxName,
      )
      .get();

    if (isUnexpected(devboxOutput)) {
      throw devboxOutput.body.error;
    }

    expect(devboxOutput.body.name).to.equal(devboxName);
  });

  it("GetRemoteConnection", async function () {
    await setupDevBox();
    const remoteConnectionResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
        projectName,
        userId,
        devboxName,
      )
      .get();

    if (isUnexpected(remoteConnectionResponse)) {
      throw remoteConnectionResponse.body.error;
    }

    assert.isTrue(stringIsAValidUrl(remoteConnectionResponse.body.rdpConnectionUrl as string));
  });

  it("GetAllDevBoxes", async function () {
    await setupDevBox();
    const devboxesListResponse = await client.path("/devboxes").get();

    if (isUnexpected(devboxesListResponse)) {
      throw devboxesListResponse.body.error;
    }

    const devBoxes: DevBoxOutput[] = [];
    console.log("Iterating through dev boxes results:");

    for await (const devBox of paginate(client, devboxesListResponse)) {
      const { name } = devBox;
      console.log(`Received DevBox "${name}"`);
      devBoxes.push(devBox);
    }

    expect(devBoxes.length).to.equal(1);
    expect(devBoxes[0].name).to.equal(devboxName);
  });

  it("GetAllDevBoxesByUser", async function () {
    await setupDevBox();
    const devboxesListResponse = await client.path("/users/{userId}/devboxes", userId).get();

    if (isUnexpected(devboxesListResponse)) {
      throw devboxesListResponse.body.error;
    }

    const devBoxes: DevBoxOutput[] = [];
    console.log("Iterating through dev boxes results:");

    for await (const devBox of paginate(client, devboxesListResponse)) {
      const { name } = devBox;
      console.log(`Received DevBox "${name}"`);
      devBoxes.push(devBox);
    }

    expect(devBoxes.length).to.equal(1);
    expect(devBoxes[0].name).to.equal(devboxName);
  });

  it("GetDevBoxes", async function () {
    await setupDevBox();
    const devboxesListResponse = await client
      .path("/projects/{projectName}/users/{userId}/devboxes", projectName, userId)
      .get();

    if (isUnexpected(devboxesListResponse)) {
      throw devboxesListResponse.body.error;
    }

    const devBoxes: DevBoxOutput[] = [];
    console.log("Iterating through dev boxes results:");

    for await (const devBox of paginate(client, devboxesListResponse)) {
      const { name } = devBox;
      console.log(`Received DevBox "${name}"`);
      devBoxes.push(devBox);
    }

    expect(devBoxes.length).to.equal(1);
    expect(devBoxes[0].name).to.equal(devboxName);
  });

  it("GetActions", async function () {
    await setupDevBox();
    const actionsListResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions",
        projectName,
        userId,
        devboxName,
      )
      .get();

    if (isUnexpected(actionsListResponse)) {
      throw actionsListResponse.body.error;
    }

    const actions: DevBoxActionOutput[] = [];
    console.log("Iterating through dev box actions results:");

    for await (const action of paginate(client, actionsListResponse)) {
      const { name } = action;
      console.log(`Received DevBox action"${name}"`);
      actions.push(action);
    }

    expect(actions.length).to.equal(1);
    expect(actions[0].name).to.equal("schedule-default");
  });

  it("GetAction", async function () {
    await setupDevBox();
    const actionResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}",
        projectName,
        userId,
        devboxName,
        "schedule-default",
      )
      .get();

    if (isUnexpected(actionResponse)) {
      throw actionResponse.body.error;
    }

    expect(actionResponse.body.name).to.equal("schedule-default");
  });

  it("DelayAction", async function () {
    await setupDevBox();
    const delayActionParameters: DelayActionsParameters = {
      queryParameters: {
        until: "2024-07-04T02:10:00Z",
      },
    };

    const delayActionResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay",
        projectName,
        userId,
        devboxName,
        "schedule-default",
      )
      .post(delayActionParameters);

    assert.equal(delayActionResponse.status, "200", "Delaying DevBox action should return 200 OK.");
  });

  it("DelayAllActions", async function () {
    await setupDevBox();
    const delayActionsParameters: DelayActionsParameters = {
      queryParameters: {
        until: "2024-07-04T02:20:00Z",
      },
    };

    const delayActionsResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay",
        projectName,
        userId,
        devboxName,
      )
      .post(delayActionsParameters);

    if (isUnexpected(delayActionsResponse)) {
      throw new Error(delayActionsResponse.body?.error.message);
    }

    const actionDelayResults: DevBoxActionDelayResultOutput[] = [];

    for await (const actionDelay of paginate(client, delayActionsResponse)) {
      actionDelayResults.push(actionDelay);
    }

    expect(actionDelayResults.length).to.equal(1);
    expect(actionDelayResults[0].result).to.equal("Succeeded");
  });

  it("SkipAction", async function () {
    await setupDevBox();
    const skipActionResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip",
        projectName,
        userId,
        devboxName,
        "schedule-default",
      )
      .post();

    assert.equal(skipActionResponse.status, "204");
  });

  it("StartsStopsAndDeleteDevBox", async function () {
    await setupDevBox();
    // Stop an already running Dev Box
    const stopDevBoxResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop",
        projectName,
        userId,
        devboxName,
      )
      .post();

    const devBoxStopPoller = await getLongRunningPoller(
      client,
      stopDevBoxResponse,
      testPollingOptions,
    );
    const devBoxStopResult = await devBoxStopPoller.pollUntilDone();

    if (isUnexpected(devBoxStopResult)) {
      throw new Error(devBoxStopResult.body?.error.message);
    }

    assert.equal(
      devBoxStopResult.status,
      "200",
      "Dev box stop long-running operation should return 200 OK.",
    );

    // Start Dev Box
    const startDevBoxResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start",
        projectName,
        userId,
        devboxName,
      )
      .post();

    const devBoxStartPoller = await getLongRunningPoller(
      client,
      startDevBoxResponse,
      testPollingOptions,
    );
    const devBoxStartResult = await devBoxStartPoller.pollUntilDone();

    if (isUnexpected(devBoxStartResult)) {
      throw new Error(devBoxStartResult.body?.error.message);
    }

    assert.equal(
      devBoxStartResult.status,
      "200",
      "Dev box start long-running operation should return 200 OK.",
    );

    await deleteDevBox();
  });

  async function setupDevBox() {
    const devboxesListResponse = await client
      .path("/projects/{projectName}/users/{userId}/devboxes", projectName, userId)
      .get();

    if (isUnexpected(devboxesListResponse)) {
      throw devboxesListResponse.body.error;
    }

    const devBoxes: DevBoxOutput[] = [];
    console.log("Iterating through dev boxes results:");

    for await (const devBox of paginate(client, devboxesListResponse)) {
      const { name } = devBox;
      console.log(`Received DevBox "${name}"`);
      devBoxes.push(devBox);
    }

    if (devBoxes.length >= 1) {
      return;
    }

    const devBoxCreateParameters: CreateDevBoxParameters = {
      contentType: "application/json",
      body: { poolName: poolName },
    };

    // Provision a dev box
    const devBoxCreateResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
        projectName,
        userId,
        devboxName,
      )
      .put(devBoxCreateParameters);

    if (isUnexpected(devBoxCreateResponse)) {
      console.log(`Unexpected ${JSON.stringify(devBoxCreateResponse)}`);
      throw devBoxCreateResponse;
    }

    assert.equal(devBoxCreateResponse.status, "201", "Dev Box creation should return 201 Created.");

    const devBoxCreatePoller = await getLongRunningPoller(
      client,
      devBoxCreateResponse,
      testPollingOptions,
    );
    const devBoxCreateResult = await devBoxCreatePoller.pollUntilDone();

    if (isUnexpected(devBoxCreateResult)) {
      throw devBoxCreateResult;
    }

    assert.equal(
      devBoxCreateResult.status,
      "200",
      "Dev box creation long-running operation should return 200 OK.",
    );

    assert.equal(devBoxCreateResult.body.name, devboxName);
    console.log(`Provisioned dev box with state ${devBoxCreateResult.body.provisioningState}.`);
  }

  async function deleteDevBox() {
    const devBoxDeleteResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
        projectName,
        "me",
        devboxName,
      )
      .delete();

    if (isUnexpected(devBoxDeleteResponse)) {
      throw new Error(devBoxDeleteResponse.body?.error.message);
    }

    assert.equal(devBoxDeleteResponse.status, "202", "Delete Dev Box should return 202 Accepted.");

    const devBoxDeletePoller = await getLongRunningPoller(
      client,
      devBoxDeleteResponse,
      testPollingOptions,
    );
    const devBoxDeleteResult = await devBoxDeletePoller.pollUntilDone();

    if (isUnexpected(devBoxDeleteResult)) {
      throw new Error(devBoxDeleteResult.body?.error.message);
    }

    assert.equal(
      devBoxDeleteResult.status,
      "200",
      "Dev box delete long-running operation should return 200 OK.",
    );

    console.log(`Cleaned up dev box successfully.`);
  }

  function stringIsAValidUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch (err: any) {
      return false;
    }
  }
});
