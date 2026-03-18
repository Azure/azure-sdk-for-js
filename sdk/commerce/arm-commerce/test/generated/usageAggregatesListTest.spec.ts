// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { UsageManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("query aggregated Azure subscription consumption data for a date range", () => {
  let recorder: Recorder;
  let client: UsageManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new UsageManagementClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should query aggregated Azure subscription consumption data for a date range for getUsageAggregatesList", async function () {
    const resArray = new Array();
    for await (const item of client.usageAggregates.list(
      new Date("2014-05-01T00:00:00+00:00"),
      new Date("2015-06-01T00:00:00+00:00"),
      { showDetails: true },
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(resArray[0].name, "Daily_BRSDT_20140501_0000");
    assert.strictEqual(resArray[0].type, "Microsoft.Commerce/UsageAggregate");
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/f68815e6-3c41-45ef-bbd8-5f83303c396b/providers/Microsoft.Commerce/UsageAggregates/Daily_BRSDT_20140501_0000",
    );
  });
});
