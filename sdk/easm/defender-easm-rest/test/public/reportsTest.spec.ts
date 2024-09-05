// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Reports Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let metric: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint +
        "/subscriptions/" +
        subscription_id +
        "/resourceGroups/" +
        resource_group +
        "/workspaces/" +
        workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    metric = "savedfilter_metric_51126";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list billable reports", async () => {
    const assetResponse = await client.path("/reports/assets:getBillable").post();
    if (isUnexpected(assetResponse)) {
      throw new Error(assetResponse.body?.error.message);
    }

    assert.strictEqual(assetResponse.status, "200");
  });

  it("Should get a snapshot of reports", async () => {
    const assetResponse = await client.path("/reports/assets:getSnapshot").post({
      body: {
        metric: metric,
        page: 0,
        size: 25,
      },
    });

    if (isUnexpected(assetResponse)) {
      throw new Error(assetResponse.body?.error.message);
    }

    const asset_response = assetResponse.body;

    assert.strictEqual(assetResponse.status, "200");

    assert.strictEqual(metric, asset_response.metric);
    assert.isNotEmpty(asset_response.description);
    assert.isNotEmpty(asset_response.assets);
  });

  it("Should get reports summary", async () => {
    const assetPageResponse = await client.path("/reports/assets:getSummary").post({
      body: { metrics: [metric] },
    });
    if (isUnexpected(assetPageResponse)) {
      throw new Error(assetPageResponse.body?.error.message);
    }

    const summary_response = assetPageResponse.body;

    assert.isNotEmpty(summary_response.assetSummaries);
  });
});
