// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("performs ownership validation via checking TXT records for all custom domains in a namespace", () => {
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

  it("should performs ownership validation via checking TXT records for all custom domains in a namespace for namespacesValidateCustomDomainOwnership", async function () {
    const result = await client.namespaces.validateCustomDomainOwnership(
      "examplerg",
      "exampleNamespaceName1",
    );
    assert.ok(result);
    assert.ok(Array.isArray(result.customDomainsForTopicSpacesConfiguration));
    assert.strictEqual(result.customDomainsForTopicSpacesConfiguration.length, 1);
    assert.ok(Array.isArray(result.customDomainsForTopicsConfiguration));
    assert.strictEqual(result.customDomainsForTopicsConfiguration.length, 1);
  });
});
