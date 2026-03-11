// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("creates a new partner registration with the specified parameters", () => {
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

  it("should creates a new partner registration with the specified parameters for partnerRegistrationsCreateOrUpdate", async function () {
    const result = await client.partnerRegistrations.createOrUpdate(
      "examplerg",
      "examplePartnerRegistrationName1",
      { location: "global", tags: { key1: "value1", key2: "Value2", key3: "Value3" } },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplePartnerRegistrationName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerRegistrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerRegistrations/examplePartnerRegistrationName1",
    );
    assert.strictEqual(result.location, "global");
    assert.strictEqual(
      result.partnerRegistrationImmutableId,
      "cda82399-79fe-4d5a-bc6d-b05a437204d9",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.key1, "value1");
    assert.strictEqual(result.tags?.key2, "Value2");
    assert.strictEqual(result.tags?.key3, "Value3");
  });
});
