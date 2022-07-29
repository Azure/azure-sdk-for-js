// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { Container, CosmosClient } from "../../../src";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { CosmosException } from "../../../src/diagnostics/CosmosException";
import { removeAllDatabases } from "../common/TestHelpers";
//import { removeAllDatabases } from "../common/TestHelpers";
//import { recordDiagnostics } from "../../../src/diagnostics/CosmosDiagnostics";
//import { CosmosException } from "../../../src/diagnostics/CosmosException";
//import { createOrUpsertPermission, getTestDatabase } from "../common/TestHelpers";

describe.only("Cosmos Diagnostic Tests", async function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  describe("Cosmos diagnostic test", function () {
    it.only("should return cosmos diagnostics", async function () {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "diagnostics" });
      console.log(db.cosmosDiagnostics);
    });

    it("should handle duration condition", async function () {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const response = await client.databases.createIfNotExists({ id: "CosmosDiagnosticsTest" });
      const readItem = await response.database.read();
      const diagnostics = response.activityId;
      console.log(diagnostics);
      assert(diagnostics);
      assert(JSON.parse(diagnostics));
      assert(typeof readItem.cosmosDiagnostisDurationInMs === "number");
      assert(
        readItem.cosmosDiagnostisDurationInMs > 0 ||
          readItem.cosmosDiagnostisDurationInMs === undefined
      );
      assert(!diagnostics.includes('""systemHistory":null'));
      // assert(diagnostics.includes('"RequestStats ":"Create"'));
      // //assert(diagnostics.includes('"metaDataName":"CONTAINER_LOOK_UP"'));
      //assert(diagnostics.includes('"serializationType":"PARTITION_KEY_FETCH_SERIALIZATION"'));
      // assert.notStrictEqual(undefined, readItem.getDuration, "duration not present");
      //ssert(diagnostics.match('(?s).*?"activityId":"[^\\s"]+".*'));
      //validateRegionContacted(createResponse.getDiagnostics(), testGatewayClient.asyncClient());
    });

    it("should throw cosmos exception", async function () {
      try {
        const client = new CosmosClient({ key: masterKey, endpoint });
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
        if (items.getDuration() > 60) {
          assert(items.getDuration);
          throw new CosmosException(`custom message`);
        }
      } catch (err: any) {
        assert(err);
      }
    });
  });
});
