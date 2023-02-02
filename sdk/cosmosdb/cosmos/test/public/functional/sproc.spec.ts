// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Context } from "mocha";
import { Suite } from "mocha";
import { Constants } from "../../../src";
import { Container, StoredProcedureDefinition } from "../../../src/";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents";
import {
  bulkInsertItems,
  getTestContainer,
  getTestDatabase,
  removeAllDatabases,
} from "../common/TestHelpers";

// Used for sproc
declare let getContext: any;

describe("NodeJS CRUD Tests", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });
  describe("Validate sproc CRUD", function () {
    let container: Container;
    beforeEach(async function (this: Context) {
      container = await getTestContainer(this.test.fullTitle());
    });

    it("nativeApi Should do sproc CRUD operations successfully with create/replace", async function () {
      // read sprocs
      const { resources: sprocs } = await container.scripts.storedProcedures.readAll().fetchAll();
      assert.equal(sprocs.constructor, Array, "Value should be an array");

      // create a sproc
      const beforeCreateSprocsCount = sprocs.length;
      const sprocDefinition: StoredProcedureDefinition = {
        id: "sample sproc",
        body: "function () { const x = 10; }",
      };

      const { resource: sproc } = await container.scripts.storedProcedures.create(sprocDefinition);

      assert.equal(sproc.id, sprocDefinition.id);
      assert.equal(sproc.body, "function () { const x = 10; }");

      // read sprocs after creation
      const { resources: sprocsAfterCreation } = await container.scripts.storedProcedures
        .readAll()
        .fetchAll();
      assert.equal(
        sprocsAfterCreation.length,
        beforeCreateSprocsCount + 1,
        "create should increase the number of sprocs"
      );

      // query sprocs
      const querySpec = {
        query: "SELECT * FROM root r",
      };
      const { resources: queriedSprocs } = await container.scripts.storedProcedures
        .query(querySpec)
        .fetchAll();
      assert(queriedSprocs.length > 0, "number of sprocs for the query should be > 0");

      // replace sproc
      // prettier-ignore
      sproc.body = function () { const x = 20; console.log(x); };
      const { resource: replacedSproc } = await container.scripts
        .storedProcedure(sproc.id)
        .replace(sproc);

      assert.equal(replacedSproc.id, sproc.id);
      assert.equal(replacedSproc.body, "function () { const x = 20; console.log(x); }");

      // read sproc
      const { resource: sprocAfterReplace } = await container.scripts
        .storedProcedure(replacedSproc.id)
        .read();
      assert.equal(replacedSproc.id, sprocAfterReplace.id);

      // delete sproc
      await container.scripts.storedProcedure(replacedSproc.id).delete();

      // read sprocs after deletion
      try {
        await container.scripts.storedProcedure(replacedSproc.id).read();
        assert.fail("Must fail to read sproc after deletion");
      } catch (err: any) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });
  });

  describe("Validate stored procedure functionality", function () {
    let container: Container;
    beforeEach(async function (this: Context) {
      container = await getTestContainer(this.test.fullTitle());
    });

    it("nativeApi should do stored procedure operations successfully with create/replace", async function () {
      const sproc1: StoredProcedureDefinition = {
        id: "storedProcedure1",
        body: function () {
          for (let i = 0; i < 1000; i++) {
            const item = getContext().getResponse().getBody();
            if (i > 0 && item !== i - 1) throw "body mismatch";
            getContext().getResponse().setBody(i);
          }
        },
      };

      const sproc2: StoredProcedureDefinition = {
        id: "storedProcedure2",
        body: function () {
          for (let i = 0; i < 10; i++) {
            getContext().getResponse().appendValue("Body", i);
          }
        },
      };

      const sproc3: StoredProcedureDefinition = {
        id: "storedProcedure3",
        // TODO: I put any in here, but not sure how this will work...
        body: function (input: any) {
          getContext()
            .getResponse()
            .setBody("a" + input.temp);
        },
      };

      const { resource: retrievedSproc } = await container.scripts.storedProcedures.create(sproc1);
      const { resource: result } = await container.scripts
        .storedProcedure(retrievedSproc.id)
        .execute(undefined);
      assert.equal(result, 999);

      const { resource: retrievedSproc2 } = await container.scripts.storedProcedures.create(sproc2);
      const { resource: result2 } = await container.scripts
        .storedProcedure(retrievedSproc2.id)
        .execute(undefined);
      assert.equal(result2, 123456789);
      const { resource: retrievedSproc3 } = await container.scripts.storedProcedures.create(sproc3);
      const { resource: result3 } = await container.scripts
        .storedProcedure(retrievedSproc3.id)
        .execute(undefined, [{ temp: "so" }]);
      assert.equal(result3, "aso");
    });
  });

  it("nativeApi Should execute stored procedure with partition key successfully name based", async function () {
    const database = await getTestDatabase("sproc test database");
    // create container
    const partitionKey = "key";

    const containerDefinition = {
      id: "coll1",
      partitionKey: { paths: ["/" + partitionKey] },
    };

    const { resource: containerResult } = await database.containers.create(containerDefinition, {
      offerThroughput: 12000,
    });
    const container = await database.container(containerResult.id);

    const querySproc = {
      id: "querySproc",
      body: function () {
        const context = getContext();
        const container2 = context.getCollection();
        const response = context.getResponse();

        // query for players
        const query = "SELECT r.id, r.key, r.prop FROM r";
        const accept = container2.queryDocuments(
          container2.getSelfLink(),
          query,
          {},
          function (err: any, documents: any) {
            if (err) throw new Error("Error" + err.message);
            response.setBody(documents);
          }
        );

        if (!accept) throw "Unable to read player details, abort ";
      },
    };

    const documents = [
      { id: "document1" },
      { id: "document2", key: null, prop: 1 },
      { id: "document3", key: false, prop: 1 },
      { id: "document4", key: true, prop: 1 },
      { id: "document5", key: 1, prop: 1 },
      { id: "document6", key: "A", prop: 1 },
    ];

    await bulkInsertItems(container, documents);
    const { resource: sproc } = await container.scripts.storedProcedures.create(querySproc);
    const { resource: result } = await container.scripts
      .storedProcedure(sproc.id)
      .execute(null, []);
    assert(result !== undefined);
    assert.equal(result.length, 1);
    assert.equal(JSON.stringify(result[0]), JSON.stringify(documents[1]));

    const { resource: result2 } = await container.scripts
      .storedProcedure(sproc.id)
      .execute(1, null);
    assert(result2 !== undefined);
    assert.equal(result2.length, 1);
    assert.equal(JSON.stringify(result2[0]), JSON.stringify(documents[4]));
  });

  it("nativeApi Should execute stored procedure with partition key successfully name based : Hierarachial partitions", async function () {
    const database = await getTestDatabase("sproc test database");
    // create container
    const partitionKey1 = "key1";
    const partitionKey2 = "key2";

    const containerDefinition = {
      id: "coll1",
      partitionKey: {
        paths: ["/" + partitionKey1, "/" + partitionKey2],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };

    const { resource: containerResult } = await database.containers.create(containerDefinition, {
      offerThroughput: 12000,
    });
    const container = await database.container(containerResult.id);

    const querySproc = {
      id: "querySproc",
      body: function () {
        const context = getContext();
        const container2 = context.getCollection();
        const response = context.getResponse();

        // query for players
        const query = "SELECT r.id, r.key1, r.key2, r.prop FROM r";
        const accept = container2.queryDocuments(
          container2.getSelfLink(),
          query,
          {},
          function (err: any, documents: any) {
            if (err) throw new Error("Error" + err.message);
            response.setBody(documents);
          }
        );

        if (!accept) throw "Unable to read player details, abort ";
      },
    };

    const documents = [
      { id: "document1" },
      { id: "document2", key1: null, key2: "a", prop: 1 },
      { id: "document3", key1: false, key2: "a", prop: 1 },
      { id: "document4", key1: true, key2: "a", prop: 1 },
      { id: "document5", key1: 1, key2: "a", prop: 1 },
      { id: "document6", key1: "A", key2: "a", prop: 1 },
    ];

    await bulkInsertItems(container, documents);
    const { resource: sproc } = await container.scripts.storedProcedures.create(querySproc);
    const { resource: result } = await container.scripts
      .storedProcedure(sproc.id)
      .execute([null, "a"], []);
    assert(result !== undefined);
    assert.equal(result.length, 1);
    assert.equal(JSON.stringify(result[0]), JSON.stringify(documents[1]));

    const { resource: result2 } = await container.scripts
      .storedProcedure(sproc.id)
      .execute([1, "a"], null);
    assert(result2 !== undefined);
    assert.equal(result2.length, 1);
    assert.equal(JSON.stringify(result2[0]), JSON.stringify(documents[4]));
  });

  it("nativeApi Should enable/disable script logging while executing stored procedure", async function () {
    // create database
    const database = await getTestDatabase("sproc test database");
    // create container
    const { resource: containerResult } = await database.containers.create({
      id: "sample container",
    });

    const container = await database.container(containerResult.id);
    const sproc1 = {
      id: "storedProcedure",
      body: function () {
        const mytext = "x";
        const myval = 1;
        try {
          console.log("The value of %s is %s.", mytext, myval);
          getContext().getResponse().setBody("Success!");
        } catch (err: any) {
          getContext()
            .getResponse()
            .setBody("inline err: [" + err.number + "] " + err);
        }
      },
    };

    const { resource: retrievedSproc } = await container.scripts.storedProcedures.create(sproc1);
    const { resource: result1, headers: headers1 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute(undefined);
    assert.equal(result1, "Success!");
    assert.equal(headers1[Constants.HttpHeaders.ScriptLogResults], undefined);

    let requestOptions = { enableScriptLogging: true };
    const { resource: result2, headers: headers2 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute(undefined, [], requestOptions);
    assert.equal(result2, "Success!");
    assert.equal(
      headers2[Constants.HttpHeaders.ScriptLogResults],
      encodeURIComponent("The value of x is 1.")
    );

    requestOptions = { enableScriptLogging: false };
    const { resource: result3, headers: headers3 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute(undefined, [], requestOptions);
    assert.equal(result3, "Success!");
    assert.equal(headers3[Constants.HttpHeaders.ScriptLogResults], undefined);
  });
});
