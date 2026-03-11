// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get properties of a verified partner", () => {
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

  it("should get properties of a verified partner for verifiedPartnersGet", async function () {
    const result = await client.verifiedPartners.get("Contoso.Finance");
    assert.ok(result);
    assert.strictEqual(result.name, "Contoso.Finance");
    assert.strictEqual(result.type, "Microsoft.EventGrid/verifiedPartners");
    assert.strictEqual(
      result.id,
      "/providers/Microsoft.EventGrid/verifiedPartners/Contoso.Finance",
    );
    assert.strictEqual(result.organizationName, "Contoso");
    assert.strictEqual(result.partnerDisplayName, "Contoso - Finance Department");
    assert.strictEqual(
      result.partnerRegistrationImmutableId,
      "941892bc-f5d0-4d1c-8fb5-477570fc2b71",
    );
  });
});
