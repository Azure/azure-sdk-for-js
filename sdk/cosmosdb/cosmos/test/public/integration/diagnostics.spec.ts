// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { Container, CosmosClient } from "../../../src";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { CosmosException } from "../../../src/diagnostics/CosmosException";
//import { removeAllDatabases } from "../common/TestHelpers";
//import { recordDiagnostics } from "../../../src/diagnostics/CosmosDiagnostics";
//import { CosmosException } from "../../../src/diagnostics/CosmosException";
//import { createOrUpsertPermission, getTestDatabase } from "../common/TestHelpers";

describe.only("Cosmos Diagnostic Tests", async function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  const client = new CosmosClient({
    endpoint,
    key: masterKey,
  });

  describe.only("Cosmos diagnostic test", function () {
    it("should return cosmos diagnostics", async function () {
      try {
        const database = await client.databases.createIfNotExists({ id: "CosmosDiagnosticsTest" });
        const databaseDiagnostics = database.getDiagnostics;
        assert.notStrictEqual(undefined, databaseDiagnostics);
        assert.strictEqual(CosmosException.getdiagnostics(), databaseDiagnostics);
      } catch (err: any) {
        console.log(CosmosException.getduration());
        throw new CosmosException(err);
      }
    });

    it("should handle duration condition", async function () {
      const response = await client.databases.createIfNotExists({ id: "CosmosDiagnosticsTest" });
      const readItem = await response.database.read();
      assert(typeof readItem.getDuration === "number");
      assert(readItem.getDuration);
      assert(readItem.getDuration > 0);
      assert.notStrictEqual(undefined, readItem.getDuration, "duration not present");
    });

    it("should throw cosmos exception", async function () {
      try {
        const { database: database } = await client.databases.createIfNotExists({
          id: "CosmosDiagnosticsTest",
        });
        // create container
        const { resource: containerdef } = await database.containers.create({
          id: "sample container",
        });
        const container: Container = database.container(containerdef.id);
        // read items
        const items = await container.items.readAll().fetchAll();
        if (items.getDuration > 60) {
          assert.strictEqual(items.getDuration, CosmosException.getduration);
          assert.strictEqual(
            items.getDiagnostics.length,
            CosmosException.getdiagnostics.length,
            "duration not present"
          );

          throw new CosmosException(`custom message`);
        }
      } catch (err: any) {
        assert(err);
      }
    });
  });
});
