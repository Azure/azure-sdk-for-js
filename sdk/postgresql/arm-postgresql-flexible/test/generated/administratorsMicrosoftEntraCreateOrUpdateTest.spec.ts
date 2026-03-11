// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("creates a new server administrator associated to a Microsoft Entra principal", () => {
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

  it("should creates a new server administrator associated to a Microsoft Entra principal for addAServerAdministratorAssociatedToAMicrosoftEntraPrincipal", async function () {
    const result = await client.administratorsMicrosoftEntra.createOrUpdate(
      "exampleresourcegroup",
      "exampleserver",
      "oooooooo-oooo-oooo-oooo-oooooooooooo",
      {
        principalName: "exampleuser@contoso.com",
        principalType: "User",
        tenantId: "tttttttt-tttt-tttt-tttt-tttttttttttt",
      },
    );
    assert.ok(result);
  });
});
