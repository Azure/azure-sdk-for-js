// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("synchronously creates or updates a partner configuration with the specified parameters", () => {
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

  it("should synchronously creates or updates a partner configuration with the specified parameters for partnerConfigurationsCreateOrUpdate", async function () {
    const result = await client.partnerConfigurations.createOrUpdate("examplerg", {
      partnerAuthorization: {
        authorizedPartnersList: [
          {
            authorizationExpirationTimeInUtc: new Date("2022-01-28T01:20:55.142Z"),
            partnerName: "Contoso.Finance",
            partnerRegistrationImmutableId: "941892bc-f5d0-4d1c-8fb5-477570fc2b71",
          },
          {
            authorizationExpirationTimeInUtc: new Date("2022-02-20T01:00:00.142Z"),
            partnerName: "fabrikam.HR",
            partnerRegistrationImmutableId: "5362bdb6-ce3e-4d0d-9a5b-3eb92c8aab38",
          },
        ],
        defaultMaximumExpirationTimeInDays: 10,
      },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "default");
    assert.strictEqual(result.type, "Microsoft.EventGrid/partnerConfigurations");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerConfigurations/default",
    );
    assert.strictEqual(result.location, "global");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
