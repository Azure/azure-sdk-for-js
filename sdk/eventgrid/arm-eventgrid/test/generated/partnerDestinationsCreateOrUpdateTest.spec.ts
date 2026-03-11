// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new partner destination with the specified parameters", () => {
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

  it("should asynchronously creates a new partner destination with the specified parameters for partnerDestinationsCreateOrUpdate", async function () {
    const result = await client.partnerDestinations.createOrUpdate(
      "examplerg",
      "examplePartnerDestinationName1",
      {
        location: "westus2",
        endpointBaseUrl: "https://www.example/endpoint",
        endpointServiceContext: "This is an example",
        expirationTimeIfNotActivatedUtc: new Date("2022-03-14T19:33:43.430Z"),
        messageForActivation: "Sample Activation message",
        partnerRegistrationImmutableId: "0bd70ee2-7d95-447e-ab1f-c4f320019404",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplePartnerDestinationName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerDestinations");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerDestinations/examplePartnerDestinationName1",
    );
    assert.strictEqual(result.location, "westus2");
    assert.strictEqual(result.activationState, "NeverActivated");
    assert.strictEqual(result.endpointBaseUrl, "https://www.example/endpoint");
    assert.strictEqual(result.endpointServiceContext, "string");
    assert.strictEqual(
      result.expirationTimeIfNotActivatedUtc.getTime(),
      new Date("2022-03-14T19:33:43.430Z").getTime(),
    );
    assert.strictEqual(result.messageForActivation, "Sample Activation message");
    assert.strictEqual(
      result.partnerRegistrationImmutableId,
      "0bd70ee2-7d95-447e-ab1f-c4f320019404",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
