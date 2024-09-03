// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Assets Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let filter: string;
  let asset_name: string;
  let asset_kind: string;
  let asset_id: string;
  const UUID_REGEX: RegExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint + "/subscriptions/" + subscription_id + "/resourceGroups/" + resource_group + "/workspaces/" + workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    asset_name = "ku.edu";
    asset_kind = "domain";
    filter = `name = ${asset_name} and type = ${asset_kind}`;
    asset_id = `${asset_kind}$$${asset_name}`;
    console.log("subscription id is: " + subscription_id);
    // observation_asset_id = "71830a02-2037-5b7f-c644-8c940b89ceea";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list assets", async () => {
    console.log("filter: ", filter);
    const assetResponse = await client.path("/assets").get();
    if (isUnexpected(assetResponse)) {
      throw new Error(assetResponse.body?.error.message);
    }

    const asset_response = assetResponse.body.value![0];

    assert.strictEqual(assetResponse.status, "200");
    assert.isNotNull(asset_response.name);
    // assert.isNotEmpty(asset_response.id?.match(UUID_REGEX));
  });

  it("Should get a given asset", async () => {
    console.log("filter: ", filter);
    const assetResponse = await client.path("/assets/{assetId}", asset_id).get();

    if (isUnexpected(assetResponse)) {
      throw new Error(assetResponse.body?.error.message);
    }

    const asset_response = assetResponse.body;

    assert.strictEqual(assetResponse.status, "200");

    assert.strictEqual(asset_name, asset_response.name);
    // assert.strictEqual(asset_name, asset_response.displayName);
    // assert.isNotEmpty(asset_response.id?.match(UUID_REGEX));
  });

  it("Should update assets", async () => {
    const assetPageResponse = await client.path("/assets").post({
      body: { externalId: "new_external_id" },
      queryParameters: {
        filter: filter,
      },
    });
    if (isUnexpected(assetPageResponse)) {
      throw new Error(assetPageResponse.body?.error.message);
    }

    const task_response = assetPageResponse.body;

    assert.strictEqual("complete", task_response.state);
    assert.strictEqual("complete", task_response.phase);
    assert.isNotEmpty(task_response.id?.match(UUID_REGEX));
  });
});
