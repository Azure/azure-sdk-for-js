// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("synchronously creates or updates a new channel with the specified parameters", () => {
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

  it("should synchronously creates or updates a new channel with the specified parameters for channelsCreateOrUpdate", async function () {
    const result = await client.channels.createOrUpdate(
      "examplerg",
      "examplePartnerNamespaceName1",
      "exampleChannelName1",
      {
        channelType: "PartnerTopic",
        expirationTimeIfNotActivatedUtc: new Date("2021-10-21T22:50:25.410433Z"),
        messageForActivation: "Example message to approver",
        partnerTopicInfo: {
          name: "examplePartnerTopic1",
          azureSubscriptionId: "8f6b6269-84f2-4d09-9e31-1127efcd1e40",
          resourceGroupName: "examplerg2",
          source: "ContosoCorp.Accounts.User1",
        },
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleChannelName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerNamespaces/channels");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerNamespaces/examplePartnerNamespaceName1/changes/exampleChannelName1",
    );
    assert.strictEqual(result.channelType, "PartnerTopic");
    assert.strictEqual(
      result.expirationTimeIfNotActivatedUtc.getTime(),
      new Date("2021-10-21T22:50:25.410433Z").getTime(),
    );
    assert.strictEqual(result.messageForActivation, "Example message to approver");
  });
});
