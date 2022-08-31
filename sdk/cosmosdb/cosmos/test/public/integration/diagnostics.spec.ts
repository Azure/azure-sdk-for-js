// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Suite } from "mocha";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { removeAllDatabases } from "../common/TestHelpers";
import { CosmosClient } from "../../../src";

describe("Cosmos Diagnostic Tests", async function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  describe.only("Cosmos diagnostic test", function () {
    it.only("should return cosmos diagnostics", async function () {
      const client = new CosmosClient({
        key: masterKey,
        endpoint: endpoint,
        connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      });
      // ensuring a database & container exists for us to work with
      const databases = await client.databases.create({
        id: "CosmosDiagnosticsTestdb",
      });
      console.log(databases.getCosmosDiagnostics());
      const containers = await databases.database.containers.create({
        id: "CosmosDiagnosticsTestContainer",
      });
      console.log(containers.getCosmosDiagnostics());
      await containers.container.items.create({
        id: "1",
        category: "fun",
        name: "Cosmos diagnostics",
        description: "Cosmos diagnostics is fun ⚡.",
        isComplete: false,
      });
      const item = await containers.container.items.readAll().fetchAll();
      console.log(item.getCosmosDiagnostics());
    });
  });
});
