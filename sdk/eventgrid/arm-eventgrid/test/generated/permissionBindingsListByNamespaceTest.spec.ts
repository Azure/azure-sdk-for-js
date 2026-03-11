// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get all the permission bindings under a namespace", () => {
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

  it("should get all the permission bindings under a namespace for permissionBindingsListByNamespace", async function () {
    const resArray = new Array();
    for await (const item of client.permissionBindings.listByNamespace(
      "examplerg",
      "namespace123",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(resArray[0].name, "examplePermissionBindingName1");
    assert.strictEqual(resArray[0].type, "Microsoft.EventGrid/namespaces/permissionBindings");
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/namespaces/exampleNamespaceName1/permissionBindings/examplePermissionBindingName1",
    );
  });
});
