// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("approves or rejects a private endpoint connection", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should approves or rejects a private endpoint connection for approveOrRejectAPrivateEndpointConnection", async function () {
    const result = await client.privateEndpointConnections.update(
      "exampleresourcegroup",
      "exampleserver",
      "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
      {
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@contoso.com",
          status: "Approved",
        },
      },
    );
    assert.ok(result);
  });
});
