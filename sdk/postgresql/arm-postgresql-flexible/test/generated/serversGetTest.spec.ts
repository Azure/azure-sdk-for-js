// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about an existing server", () => {
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

  it("should gets information about an existing server for getInformationAboutAnExistingServer", async function () {
    const result = await client.servers.get("exampleresourcegroup", "exampleserver");
    assert.ok(result);
    assert.strictEqual(result.name, "exampleserver");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver",
    );
    assert.strictEqual(result.location, "eastus");
    assert.strictEqual(result.administratorLogin, "exampleadministratorlogin");
    assert.strictEqual(result.availabilityZone, "1");
    assert.strictEqual(
      result.fullyQualifiedDomainName,
      "exampleserver.postgres.database.azure.com",
    );
    assert.strictEqual(result.minorVersion, "5");
    assert.strictEqual(result.replicaCapacity, 5);
    assert.strictEqual(result.replicationRole, "Primary");
    assert.strictEqual(result.state, "Ready");
    assert.strictEqual(result.version, "17");
    assert.strictEqual(result.sku?.name, "Standard_D4ds_v5");
    assert.strictEqual(result.sku?.tier, "GeneralPurpose");
    assert.strictEqual(
      result.systemData?.createdAt.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
  });

  it("should gets information about an existing server for getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections", async function () {
    const result = await client.servers.get("exampleresourcegroup", "exampleserver");
    assert.ok(result);
    assert.strictEqual(result.name, "exampleserver");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver",
    );
    assert.strictEqual(result.location, "eastus");
    assert.strictEqual(result.administratorLogin, "exampleadministratorlogin");
    assert.strictEqual(result.availabilityZone, "1");
    assert.strictEqual(
      result.fullyQualifiedDomainName,
      "exampleserver.postgres.database.azure.com",
    );
    assert.strictEqual(result.minorVersion, "5");
    assert.ok(Array.isArray(result.privateEndpointConnections));
    assert.strictEqual(result.privateEndpointConnections.length, 1);
    assert.strictEqual(result.state, "Ready");
    assert.strictEqual(result.version, "17");
    assert.strictEqual(result.sku?.name, "Standard_D4ds_v5");
    assert.strictEqual(result.sku?.tier, "GeneralPurpose");
  });

  it("should gets information about an existing server for getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer", async function () {
    const result = await client.servers.get("exampleresourcegroup", "exampleserver");
    assert.ok(result);
    assert.strictEqual(result.name, "exampleserver");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver",
    );
    assert.strictEqual(result.location, "eastus");
    assert.strictEqual(result.administratorLogin, "exampleadministratorlogin");
    assert.strictEqual(result.availabilityZone, "1");
    assert.strictEqual(
      result.fullyQualifiedDomainName,
      "exampleserver.postgres.database.azure.com",
    );
    assert.strictEqual(result.minorVersion, "5");
    assert.strictEqual(result.replicaCapacity, 5);
    assert.strictEqual(result.replicationRole, "Primary");
    assert.strictEqual(result.state, "Ready");
    assert.strictEqual(result.version, "17");
    assert.strictEqual(result.sku?.name, "Standard_D4ds_v5");
    assert.strictEqual(result.sku?.tier, "GeneralPurpose");
    assert.strictEqual(
      result.systemData?.createdAt.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.tags?.VnetServer, "1");
  });
});
