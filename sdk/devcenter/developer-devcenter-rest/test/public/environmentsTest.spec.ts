// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { createRecordedClient, createRecorder } from "./utils/recordedClient";
import {
  AzureDevCenterClient,
  EnvironmentsCreateOrUpdateEnvironmentParameters,
  getLongRunningPoller,
  isUnexpected,
  paginate,
} from "../../src/index";

describe("DevCenter Environments Operations Test", () => {
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

  it("Create environment", async function () {
    // Build client and fetch required parameters
    const projectName = env["DEFAULT_PROJECT_NAME"] || "sdk-default-project";
    const catalogName = env["DEFAULT_CATALOG_NAME"] || "sdk-default-catalog";
    const catalogItemName = env["DEFAULT_CATALOG_ITEM_NAME"] || "Empty";
    const environmentTypeName =
      env["DEFAULT_ENVIRONMENT_TYPE_NAME"] || "sdk-default-environment-type";
    const environmentName = "SdkTest-Environment";
    const userId = "me";

    console.log(
      `Running test for ${tenantId} -- ${devCenter} -- ${projectName} -- ${catalogName} -- ${catalogItemName} -- ${environmentTypeName} -- ${environmentName}`
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

    const environmentCreatePoller = getLongRunningPoller(client, environmentCreateResponse);
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

    // Get the deployment outputs
    const artifactListResult = await client
      .path(
        "/projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts",
        projectName,
        userId,
        environmentName
      )
      .get();

    if (isUnexpected(artifactListResult)) {
      throw new Error(artifactListResult.body?.error.message);
    }

    assert.equal(artifactListResult.status, "200", "Artifact listing should return 200 OK.");

    // Get the all results by helper function paginate
    const pageData = paginate(client, artifactListResult);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }

    assert.equal(result.length, 2, "Get all artifact data");

    console.log("Retrieved deployment artifacts:");
    console.log(artifactListResult.body.value);

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

    const environmentDeletePoller = getLongRunningPoller(client, environmentDeleteResponse);
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
