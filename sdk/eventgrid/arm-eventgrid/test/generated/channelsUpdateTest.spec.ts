// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { beforeEach, afterEach, it, describe } from "vitest";

describe("synchronously updates a channel with the specified parameters", () => {
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

  it("should synchronously updates a channel with the specified parameters for channelsUpdate", async function () {
    await client.channels.update(
      "examplerg",
      "examplePartnerNamespaceName1",
      "exampleChannelName1",
      { expirationTimeIfNotActivatedUtc: new Date("2022-03-23T23:06:11.785Z") },
    );
    /* Test passes if no exception is thrown */
  });
});
