// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new partner namespace with the specified parameters", () => {
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

  it("should asynchronously creates a new partner namespace with the specified parameters for partnerNamespacesCreateOrUpdate", async function () {
    const result = await client.partnerNamespaces.createOrUpdate(
      "examplerg",
      "examplePartnerNamespaceName1",
      {
        location: "westus",
        partnerRegistrationFullyQualifiedId:
          "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerRegistrations/ContosoCorpAccount1",
        tags: { tag1: "value1", tag2: "value2" },
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplePartnerNamespaceName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerNamespaces");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerNamespaces/examplePartnerNamespaceName1",
    );
    assert.strictEqual(result.location, "westus");
    assert.strictEqual(
      result.endpoint,
      "https://examplePartnerNamespaceName1.centraluseuap-1.eventgrid.azure.net/api/events",
    );
    assert.strictEqual(
      result.partnerRegistrationFullyQualifiedId,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerRegistrations/ContosoCorpAccount1",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.key1, "value1");
    assert.strictEqual(result.tags?.key2, "value2");
  });
});
