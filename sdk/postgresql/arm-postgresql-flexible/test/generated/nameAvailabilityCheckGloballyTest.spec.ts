// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints", () => {
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

  it("should checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints for checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints", async function () {
    const result = await client.nameAvailability.checkGlobally({
      name: "exampleserver",
      type: "Microsoft.DBforPostgreSQL/flexibleServers",
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampleserver");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers");
    assert.strictEqual(result.message, "");
    assert.strictEqual(result.nameAvailable, true);
  });
});
