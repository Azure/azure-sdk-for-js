// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  AzureDevCenterClient,
  DevBoxesCreateDevBoxParameters,
  getLongRunningPoller,
  isUnexpected,
} from "../../src/index";

describe("DevCenter Dev Boxes Operations Test", () => {
  let recorder: Recorder;
  let client: AzureDevCenterClient;
  let tenantId: string;
  let devCenter: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    tenantId = env["DEVCENTER_TENANT_ID"] || "<tenant id>";
    devCenter = env["DEFAULT_DEVCENTER_NAME"] || "sdk-default-devcenter";
    client = createRecordedClient(recorder, tenantId, devCenter, {
      allowInsecureConnection: false,
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Create dev box", async function () {
    // Build client and fetch required parameters
    const projectName = env["DEFAULT_PROJECT_NAME"] || "sdk-default-project";
    const poolName = env["DEFAULT_POOL_NAME"] || "sdk-default-pool";
    const devBoxName = "SdkTestDevBox";
    const userId = "me";

    console.log(
      `Running test for ${tenantId} -- ${devCenter} -- ${projectName} -- ${poolName} -- ${devBoxName}`
    );

    const devBoxCreateParameters: DevBoxesCreateDevBoxParameters = {
      contentType: "application/json",
      body: { poolName: poolName },
    };

    // Provision a dev box
    const devBoxCreateResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
        projectName,
        userId,
        devBoxName
      )
      .put(devBoxCreateParameters);

    if (isUnexpected(devBoxCreateResponse)) {
      console.log(`Unexpected ${JSON.stringify(devBoxCreateResponse)}`);
      throw new Error(devBoxCreateResponse.body?.error.message);
    }

    assert.equal(devBoxCreateResponse.status, "201", "Dev Box creation should return 201 Created.");

    const devBoxCreatePoller = getLongRunningPoller(client, devBoxCreateResponse);
    const devBoxCreateResult = await devBoxCreatePoller.pollUntilDone();

    if (isUnexpected(devBoxCreateResult)) {
      throw new Error(devBoxCreateResult.body?.error.message);
    }

    assert.equal(
      devBoxCreateResult.status,
      "200",
      "Dev box creation long-running operation should return 200 OK."
    );
    assert.equal(devBoxCreateResult.body.name, devBoxName);
    console.log(`Provisioned dev box with state ${devBoxCreateResult.body.provisioningState}.`);

    // Tear down the machine when finished
    const devBoxDeleteResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
        projectName,
        "me",
        devBoxName
      )
      .delete();

    if (isUnexpected(devBoxDeleteResponse)) {
      throw new Error(devBoxDeleteResponse.body?.error.message);
    }

    assert.equal(devBoxDeleteResponse.status, "202", "Delete Dev Box should return 202 Accepted.");

    const devBoxDeletePoller = getLongRunningPoller(client, devBoxDeleteResponse);
    const devBoxDeleteResult = await devBoxDeletePoller.pollUntilDone();

    if (isUnexpected(devBoxDeleteResult)) {
      throw new Error(devBoxDeleteResult.body?.error.message);
    }

    assert.equal(
      devBoxDeleteResult.status,
      "200",
      "Dev box delete long-running operation should return 200 OK."
    );

    console.log(`Cleaned up dev box successfully.`);
  });
});
