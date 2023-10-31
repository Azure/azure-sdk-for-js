// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { createRecordedClient, createRecorder } from "./utils/recordedClient";
import {
  AzureDevCenterClient,
  EnvironmentsCreateOrUpdateEnvironmentParameters,
  getLongRunningPoller,
  isUnexpected,
} from "../../src/index";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};
describe("DevCenter Environments Operations Test", () => {
  let recorder: Recorder;
  let client: AzureDevCenterClient;
  let endpoint: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    endpoint =
      env["DEVCENTER_ENDPOINT"] ||
      "https://8ab2df1c-ed88-4946-a8a9-e1bbb3e4d1fd-sdk-dc-na4b3zkj5hmeo.eastus.devcenter.azure.com";
    client = createRecordedClient(recorder, endpoint, {
      allowInsecureConnection: false,
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Create environment", async function () {
    // Build client and fetch required parameters
    const projectName = env["DEFAULT_PROJECT_NAME"] || "sdk-project-hdhjgzht7tgyq";
    const catalogName = env["DEFAULT_CATALOG_NAME"] || "sdk-default-catalog";
    const catalogItemName = env["DEFAULT_CATALOG_ITEM_NAME"] || "Empty";
    const environmentTypeName =
      env["DEFAULT_ENVIRONMENT_TYPE_NAME"] || "sdk-environment-type-5x47m3lk7iv3i";
    const environmentName = "SdkTest-Environment";
    const userId = "me";

    console.log(
      `Running test for ${endpoint} -- ${projectName} -- ${catalogName} -- ${catalogItemName} -- ${environmentTypeName} -- ${environmentName}`
    );

    const environmentsCreateParameters: EnvironmentsCreateOrUpdateEnvironmentParameters = {
      contentType: "application/json",
      body: {
        catalogItemName: catalogItemName,
        environmentType: environmentTypeName,
        catalogName: catalogName,
      },
    };

    // Provision an environment
    const environmentCreateResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/environments/{environmentName}",
        projectName,
        userId,
        environmentName
      )
      .put(environmentsCreateParameters);
    console.log("Sent create");
    if (isUnexpected(environmentCreateResponse)) {
      throw new Error(
        `Creation failed with message ${environmentCreateResponse.body?.error.message}`
      );
    }

    assert.equal(
      environmentCreateResponse.status,
      "201",
      "Environment creation should return 201 created."
    );

    const environmentCreatePoller = getLongRunningPoller(client, environmentCreateResponse, testPollingOptions);
    const environmentCreateResult = await environmentCreatePoller.pollUntilDone();

    if (isUnexpected(environmentCreateResult)) {
      throw new Error(
        `Creation failed with message ${environmentCreateResult.body?.error.message}`
      );
    }

    assert.equal(
      environmentCreateResult.status,
      "200",
      "Create environment polling should return 200 OK."
    );
    assert.equal(environmentCreateResult.body.name, environmentName);
    assert.equal(environmentCreateResult.body.provisioningState, "Succeeded");
    console.log(
      `Provisioned environment with state ${environmentCreateResult.body.provisioningState}.`
    );

    // Tear down the environment when finished
    const environmentDeleteResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/environments/{environmentName}",
        projectName,
        userId,
        environmentName
      )
      .delete();

    if (isUnexpected(environmentDeleteResponse)) {
      throw new Error(environmentDeleteResponse.body?.error.message);
    }

    assert.equal(
      environmentDeleteResponse.status,
      "202",
      "Environment delete should return 202 accepted."
    );

    const environmentDeletePoller = getLongRunningPoller(client, environmentDeleteResponse, testPollingOptions);
    const environmentDeleteResult = await environmentDeletePoller.pollUntilDone();

    if (isUnexpected(environmentDeleteResult)) {
      throw new Error(environmentDeleteResult.body?.error.message);
    }

    assert.equal(
      environmentDeleteResult.status,
      "200",
      "Environment delete long-running operation should return 200 OK."
    );

    console.log("Cleaned up environment successfully.");
  });
});
