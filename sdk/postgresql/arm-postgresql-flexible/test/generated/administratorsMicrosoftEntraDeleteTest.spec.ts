// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { beforeEach, afterEach, it, describe } from "vitest";

describe("deletes an existing server administrator associated to a Microsoft Entra principal", () => {
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

  it("should deletes an existing server administrator associated to a Microsoft Entra principal for deleteAServerAdministratorAssociatedToAMicrosoftEntraPrincipal", async function () {
    await client.administratorsMicrosoftEntra.delete(
      "exampleresourcegroup",
      "exampleserver",
      "oooooooo-oooo-oooo-oooo-oooooooooooo",
    );
    /* Test passes if no exception is thrown */
  });
});
