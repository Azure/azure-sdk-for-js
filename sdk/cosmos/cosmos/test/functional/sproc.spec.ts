import assert from "assert";
import { Constants, PartitionKind } from "../../dist-esm";
import { Container, StoredProcedureDefinition } from "../../dist-esm/client";
import { bulkInsertItems, getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

// Used for sproc
declare var getContext: any;

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });
  describe("Validate sproc CRUD", function() {
    let container: Container;
    beforeEach(async function() {
      container = await getTestContainer(this.test.fullTitle());
    });

    it("nativeApi Should do sproc CRUD operations successfully with create/replace", async function() {
      // read sprocs
      const { resources: sprocs } = await container.scripts.storedProcedures.readAll().fetchAll();
      assert.equal(sprocs.constructor, Array, "Value should be an array");

      // create a sproc
      const beforeCreateSprocsCount = sprocs.length;
      const sprocDefinition: StoredProcedureDefinition = {
        id: "sample sproc",
        body: "function () { const x = 10; }"
      };

      const { resource: sproc } = await container.scripts.storedProcedures.create(sprocDefinition);

      assert.equal(sproc.id, sprocDefinition.id);
      assert.equal(sproc.body, "function () { const x = 10; }");

      // read sprocs after creation
      const { resources: sprocsAfterCreation } = await container.scripts.storedProcedures.readAll().fetchAll();
      assert.equal(
        sprocsAfterCreation.length,
        beforeCreateSprocsCount + 1,
        "create should increase the number of sprocs"
      );

      // query sprocs
      const querySpec = {
        query: "SELECT * FROM root r"
      };
      const { resources: queriedSprocs } = await container.scripts.storedProcedures.query(querySpec).fetchAll();
      assert(queriedSprocs.length > 0, "number of sprocs for the query should be > 0");

      // replace sproc
      // prettier-ignore
      sproc.body = function () { const x = 20; };
      const { resource: replacedSproc } = await container.scripts.storedProcedure(sproc.id).replace(sproc);

      assert.equal(replacedSproc.id, sproc.id);
      assert.equal(replacedSproc.body, "function () { const x = 20; }");

      // read sproc
      const { resource: sprocAfterReplace } = await container.scripts.storedProcedure(replacedSproc.id).read();
      assert.equal(replacedSproc.id, sprocAfterReplace.id);

      // delete sproc
      await container.scripts.storedProcedure(replacedSproc.id).delete();

      // read sprocs after deletion
      try {
        await container.scripts.storedProcedure(replacedSproc.id).read();
        assert.fail("Must fail to read sproc after deletion");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });

    it("nativeApi Should do sproc CRUD operations successfully name based with upsert", async function() {
      // read sprocs
      const { resources: sprocs } = await container.scripts.storedProcedures.readAll().fetchAll();
      assert.equal(sprocs.constructor, Array, "Value should be an array");

      // create a sproc
      const beforeCreateSprocsCount = sprocs.length;
      const sprocDefinition: StoredProcedureDefinition = {
        id: "sample sproc",
        // prettier-ignore
        body: function () { const x = 10; } // tslint:disable-line:object-literal-shorthand
      };

      const { resource: sproc } = await container.scripts.storedProcedures.upsert(sprocDefinition);

      assert.equal(sproc.id, sprocDefinition.id);
      assert.equal(sproc.body, "function () { const x = 10; }");

      // read sprocs after creation
      const { resources: sprocsAfterCreation } = await container.scripts.storedProcedures.readAll().fetchAll();
      assert.equal(
        sprocsAfterCreation.length,
        beforeCreateSprocsCount + 1,
        "create should increase the number of sprocs"
      );

      // query sprocs
      const querySpec = {
        query: "SELECT * FROM root r"
      };
      const { resources: queriedSprocs } = await container.scripts.storedProcedures.query(querySpec).fetchAll();
      assert(queriedSprocs.length > 0, "number of sprocs for the query should be > 0");

      // replace sproc
      // prettier-ignore
      sproc.body = function () { const x = 20; };
      const { resource: replacedSproc } = await container.scripts.storedProcedures.upsert(sproc);

      assert.equal(replacedSproc.id, sproc.id);
      assert.equal(replacedSproc.body, "function () { const x = 20; }");

      // read sproc
      const { resource: sprocAfterReplace } = await container.scripts.storedProcedure(replacedSproc.id).read();
      assert.equal(replacedSproc.id, sprocAfterReplace.id);

      // delete sproc
      await container.scripts.storedProcedure(replacedSproc.id).delete();

      // read sprocs after deletion
      try {
        await container.scripts.storedProcedure(replacedSproc.id).read();
        assert.fail("Must fail to read sproc after deletion");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });
  });

  describe("Validate stored procedure functionality", function() {
    let container: Container;
    beforeEach(async function() {
      container = await getTestContainer(this.test.fullTitle());
    });

    it("nativeApi should do stored procedure operations successfully with create/replace", async function() {
      // tslint:disable:no-var-keyword
      // tslint:disable:prefer-const
      // tslint:disable:curly
      // tslint:disable:no-string-throw
      // tslint:disable:object-literal-shorthand
      const sproc1: StoredProcedureDefinition = {
        id: "storedProcedure1",
        body: function() {
          for (var i = 0; i < 1000; i++) {
            const item = getContext()
              .getResponse()
              .getBody();
            if (i > 0 && item !== i - 1) throw "body mismatch";
            getContext()
              .getResponse()
              .setBody(i);
          }
        }
      };

      const sproc2: StoredProcedureDefinition = {
        id: "storedProcedure2",
        body: function() {
          for (var i = 0; i < 10; i++)
            getContext()
              .getResponse()
              .appendValue("Body", i);
        }
      };

      const sproc3: StoredProcedureDefinition = {
        id: "storedProcedure3",
        // TODO: I put any in here, but not sure how this will work...
        body: function(input: any) {
          getContext()
            .getResponse()
            .setBody("a" + input.temp);
        }
      };

      // tslint:enable:no-var-keyword
      // tslint:enable:prefer-const
      // tslint:enable:curly
      // tslint:enable:no-string-throw
      // tslint:enable:object-literal-shorthand

      const { resource: retrievedSproc } = await container.scripts.storedProcedures.create(sproc1);
      const { resource: result } = await container.scripts.storedProcedure(retrievedSproc.id).execute();
      assert.equal(result, 999);

      const { resource: retrievedSproc2 } = await container.scripts.storedProcedures.create(sproc2);
      const { resource: result2 } = await container.scripts.storedProcedure(retrievedSproc2.id).execute();
      assert.equal(result2, 123456789);
      const { resource: retrievedSproc3 } = await container.scripts.storedProcedures.create(sproc3);
      const { resource: result3 } = await container.scripts
        .storedProcedure(retrievedSproc3.id)
        .execute([{ temp: "so" }]);
      assert.equal(result3, "aso");
    });

    it("nativeApi Should do stored procedure operations successfully with upsert", async function() {
      // tslint:disable:no-var-keyword
      // tslint:disable:prefer-const
      // tslint:disable:curly
      // tslint:disable:no-string-throw
      // tslint:disable:object-literal-shorthand
      const sproc1: StoredProcedureDefinition = {
        id: "storedProcedure1",
        body: function() {
          for (var i = 0; i < 1000; i++) {
            const item = getContext()
              .getResponse()
              .getBody();
            if (i > 0 && item !== i - 1) throw "body mismatch";
            getContext()
              .getResponse()
              .setBody(i);
          }
        }
      };

      const sproc2: StoredProcedureDefinition = {
        id: "storedProcedure2",
        body: function() {
          for (var i = 0; i < 10; i++)
            getContext()
              .getResponse()
              .appendValue("Body", i);
        }
      };

      const sproc3: StoredProcedureDefinition = {
        id: "storedProcedure3",
        // TODO: I put any in here, but not sure how this will work...
        body: function(input: any) {
          getContext()
            .getResponse()
            .setBody("a" + input.temp);
        }
      };

      // tslint:enable:no-var-keyword
      // tslint:enable:prefer-const
      // tslint:enable:curly
      // tslint:enable:no-string-throw
      // tslint:enable:object-literal-shorthand

      const { resource: retrievedSproc } = await container.scripts.storedProcedures.upsert(sproc1);
      const { resource: result } = await container.scripts.storedProcedure(retrievedSproc.id).execute();
      assert.equal(result, 999);

      const { resource: retrievedSproc2 } = await container.scripts.storedProcedures.upsert(sproc2);
      const { resource: result2 } = await container.scripts.storedProcedure(retrievedSproc2.id).execute();
      assert.equal(result2, 123456789);
      const { resource: retrievedSproc3 } = await container.scripts.storedProcedures.upsert(sproc3);
      const { resource: result3 } = await container.scripts
        .storedProcedure(retrievedSproc3.id)
        .execute([{ temp: "so" }]);
      assert.equal(result3, "aso");
    });
  });

  it("nativeApi Should execute stored procedure with partition key successfully name based", async function() {
    const database = await getTestDatabase("sproc test database");
    // create container
    const partitionKey = "key";

    const containerDefinition = {
      id: "coll1",
      partitionKey: { paths: ["/" + partitionKey], kind: PartitionKind.Hash }
    };

    const { resource: containerResult } = await database.containers.create(containerDefinition, {
      offerThroughput: 12000
    });
    const container = await database.container(containerResult.id);

    // tslint:disable:no-var-keyword
    // tslint:disable:prefer-const
    // tslint:disable:curly
    // tslint:disable:no-string-throw
    // tslint:disable:no-shadowed-variable
    // tslint:disable:object-literal-shorthand
    const querySproc = {
      id: "querySproc",
      body: function() {
        var context = getContext();
        var container = context.getCollection();
        var response = context.getResponse();

        // query for players
        var query = "SELECT r.id, r.key, r.prop FROM r";
        var accept = container.queryDocuments(container.getSelfLink(), query, {}, function(
          err: any,
          documents: any,
          responseOptions: any
        ) {
          if (err) throw new Error("Error" + err.message);
          response.setBody(documents);
        });

        if (!accept) throw "Unable to read player details, abort ";
      }
    };
    // tslint:enable:no-var-keyword
    // tslint:enable:prefer-const
    // tslint:enable:curly
    // tslint:enable:no-string-throw
    // tslint:enable:no-shadowed-variable
    // tslint:enable:object-literal-shorthand

    const documents = [
      { id: "document1" },
      { id: "document2", key: null, prop: 1 },
      { id: "document3", key: false, prop: 1 },
      { id: "document4", key: true, prop: 1 },
      { id: "document5", key: 1, prop: 1 },
      { id: "document6", key: "A", prop: 1 }
    ];

    const returnedDocuments = await bulkInsertItems(container, documents);
    const { resource: sproc } = await container.scripts.storedProcedures.create(querySproc);
    const { resource: result } = await container.scripts.storedProcedure(sproc.id).execute([], { partitionKey: null });
    assert(result !== undefined);
    assert.equal(result.length, 1);
    assert.equal(JSON.stringify(result[0]), JSON.stringify(documents[1]));

    const { resource: result2 } = await container.scripts.storedProcedure(sproc.id).execute(null, { partitionKey: 1 });
    assert(result2 !== undefined);
    assert.equal(result2.length, 1);
    assert.equal(JSON.stringify(result2[0]), JSON.stringify(documents[4]));
  });

  it("nativeApi Should enable/disable script logging while executing stored procedure", async function() {
    // create database
    const database = await getTestDatabase("sproc test database");
    // create container
    const { resource: containerResult } = await database.containers.create({ id: "sample container" });

    const container = await database.container(containerResult.id);

    // tslint:disable:curly
    // tslint:disable:no-string-throw
    // tslint:disable:no-shadowed-variable
    // tslint:disable:one-line
    // tslint:disable:object-literal-shorthand
    const sproc1 = {
      id: "storedProcedure",
      body: function() {
        const mytext = "x";
        const myval = 1;
        try {
          console.log("The value of %s is %s.", mytext, myval);
          getContext()
            .getResponse()
            .setBody("Success!");
        } catch (err) {
          getContext()
            .getResponse()
            .setBody("inline err: [" + err.number + "] " + err);
        }
      }
    };

    // tslint:enable:curly
    // tslint:enable:no-string-throw
    // tslint:enable:no-shadowed-variable
    // tslint:enable:one-line
    // tslint:enable:object-literal-shorthand

    const { resource: retrievedSproc } = await container.scripts.storedProcedures.create(sproc1);
    const { resource: result1, headers: headers1 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute();
    assert.equal(result1, "Success!");
    assert.equal(headers1[Constants.HttpHeaders.ScriptLogResults], undefined);

    let requestOptions = { enableScriptLogging: true };
    const { resource: result2, headers: headers2 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute([], requestOptions);
    assert.equal(result2, "Success!");
    assert.equal(headers2[Constants.HttpHeaders.ScriptLogResults], encodeURIComponent("The value of x is 1."));

    requestOptions = { enableScriptLogging: false };
    const { resource: result3, headers: headers3 } = await container.scripts
      .storedProcedure(retrievedSproc.id)
      .execute([], requestOptions);
    assert.equal(result3, "Success!");
    assert.equal(headers3[Constants.HttpHeaders.ScriptLogResults], undefined);
  });
});
