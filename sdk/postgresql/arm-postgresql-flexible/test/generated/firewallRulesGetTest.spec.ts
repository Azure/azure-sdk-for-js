// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about a firewall rule in a server", () => {
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

  it("should gets information about a firewall rule in a server for getInformationAboutAFirewallRuleInAServer", async function () {
    const result = await client.firewallRules.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplefirewallrule",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplefirewallrule");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/firewallRules");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/servers/exampleserver/firewallRules/examplefirewallrule",
    );
    assert.strictEqual(result.endIpAddress, "255.255.255.255");
    assert.strictEqual(result.startIpAddress, "0.0.0.0");
  });
});
