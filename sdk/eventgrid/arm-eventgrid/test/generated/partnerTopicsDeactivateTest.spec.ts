// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("deactivate specific partner topic", () => {
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

  it("should deactivate specific partner topic for partnerTopicsDeactivate", async function () {
    const result = await client.partnerTopics.deactivate("examplerg", "examplePartnerTopic1");
    assert.ok(result);
    assert.strictEqual(result.name, "examplePartnerTopic1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerTopics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerTopics/examplePartnerTopic1",
    );
    assert.strictEqual(result.location, "centraluseuap");
    assert.strictEqual(result.activationState, "Deactivated");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.source, "ContosoCorp.Accounts.User1");
  });
});
