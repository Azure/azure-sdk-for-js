// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get all network security perimeter configurations associated with a topic or domain", () => {
  let recorder: Recorder;
  let client: EventGridManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new EventGridManagementClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get all network security perimeter configurations associated with a topic or domain for networkSecurityPerimeterConfigurationsList", async function () {
    const resArray = new Array();
    for await (const item of client.networkSecurityPerimeterConfigurations.list(
      "examplerg",
      "topics",
      "exampleResourceName",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(
      resArray[0].name,
      "8f6b6269-84f2-4d09-9e31-1127efcd1e40perimeter.someAssociation",
    );
    assert.strictEqual(
      resArray[0].type,
      "Microsoft.EventGrid/topics/networkSecurityPerimeterConfigurations",
    );
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/paasrg/providers/Microsoft.EventGrid/topics/egtopic/networkSecurityPerimeterConfigurations/8f6b6269-84f2-4d09-9e31-1127efcd1e40perimeter.someAssociation",
    );
  });
});
