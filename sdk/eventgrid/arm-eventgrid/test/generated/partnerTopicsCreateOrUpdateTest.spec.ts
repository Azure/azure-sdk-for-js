// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new partner topic with the specified parameters", () => {
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

  it("should asynchronously creates a new partner topic with the specified parameters for partnerTopicsCreateOrUpdate", async function () {
    const result = await client.partnerTopics.createOrUpdate(
      "examplerg",
      "examplePartnerTopicName1",
      {
        location: "westus2",
        expirationTimeIfNotActivatedUtc: new Date("2022-03-23T23:06:13.109Z"),
        messageForActivation: "Example message for activation",
        partnerRegistrationImmutableId: "6f541064-031d-4cc8-9ec3-a3b4fc0f7185",
        partnerTopicFriendlyDescription: "Example description",
        source: "ContosoCorp.Accounts.User1",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplePartnerTopicName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerTopics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerTopics/examplePartnerTopicName1",
    );
    assert.strictEqual(result.location, "centraluseuap");
    assert.strictEqual(result.activationState, "NeverActivated");
    assert.strictEqual(
      result.expirationTimeIfNotActivatedUtc.getTime(),
      new Date("2022-03-23T23:06:13.109Z").getTime(),
    );
    assert.strictEqual(result.messageForActivation, "Example message for activation");
    assert.strictEqual(
      result.partnerRegistrationImmutableId,
      "6f541064-031d-4cc8-9ec3-a3b4fc0f7185",
    );
    assert.strictEqual(result.partnerTopicFriendlyDescription, "Example description");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.source, "ContosoCorp.Accounts.User1");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
