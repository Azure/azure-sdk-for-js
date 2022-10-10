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
    assert.equal(devBoxCreateResponse.status, "201", "Dev Box creation should return 201 Created.");

    if (isUnexpected(devBoxCreateResponse)) {
      console.log(`Unexpected ${JSON.stringify(devBoxCreateResponse)}`);
      throw new Error(devBoxCreateResponse.body?.error.message);
    }

    const devBoxCreatePoller = getLongRunningPoller(client, devBoxCreateResponse);
    const devBoxCreateResult = await devBoxCreatePoller.pollUntilDone();

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
    assert.equal(devBoxDeleteResponse.status, "202", "Delete Dev Box should return 202 Accepted.");
    if (isUnexpected(devBoxDeleteResponse)) {
      throw new Error(devBoxDeleteResponse.body?.error.message);
    }

    const devBoxDeletePoller = getLongRunningPoller(client, devBoxDeleteResponse);
    await devBoxDeletePoller.pollUntilDone();
    console.log(`Cleaned up dev box successfully.`);
  });
});
