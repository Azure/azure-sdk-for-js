// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about a server administrator associated to a Microsoft Entra principal", () => {
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

  it("should gets information about a server administrator associated to a Microsoft Entra principal for getInformationAboutAServerAdministratorAssociatedToAMicrosoftEntraPrincipal", async function () {
    const result = await client.administratorsMicrosoftEntra.get(
      "exampleresourcegroup",
      "exampleserver",
      "oooooooo-oooo-oooo-oooo-oooooooooooo",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleuser@contoso.com");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/administrators");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/administrators/oooooooo-oooo-oooo-oooo-oooooooooooo",
    );
    assert.strictEqual(result.objectId, "oooooooo-oooo-oooo-oooo-oooooooooooo");
    assert.strictEqual(result.principalName, "exampleuser@contoso.com");
    assert.strictEqual(result.principalType, "User");
    assert.strictEqual(result.tenantId, "tttttttt-tttt-tttt-tttt-tttttttttttt");
  });
});
