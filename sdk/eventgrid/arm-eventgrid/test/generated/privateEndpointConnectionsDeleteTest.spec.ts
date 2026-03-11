// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { beforeEach, afterEach, it, describe } from "vitest";

describe("delete a specific private endpoint connection under a topic, domain, or partner namespace or namespace", () => {
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

  it("should delete a specific private endpoint connection under a topic, domain, or partner namespace or namespace for privateEndpointConnectionsDelete", async function () {
    await client.privateEndpointConnections.delete(
      "examplerg",
      "topics",
      "exampletopic1",
      "BMTPE5.8A30D251-4C61-489D-A1AA-B37C4A329B8B",
    );
    /* Test passes if no exception is thrown */
  });
});
