import assert from "assert";
import { UserDefinedFunctionDefinition, Container } from "../../dist-esm/client";
import { getTestDatabase, removeAllDatabases, getTestContainer } from "../common/TestHelpers";

const containerId = "sample container";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("User Defined Function", function() {
    let container: Container;

    beforeEach(async function() {
      // get container
      container = await getTestContainer("UDFTests");
    });
    it("nativeApi Should do UDF CRUD operations successfully", async function() {
      const { resources: udfs } = await container.scripts.userDefinedFunctions.readAll().fetchAll();

      // create a udf
      const beforeCreateUdfsCount = udfs.length;
      const udfDefinition: UserDefinedFunctionDefinition = {
        id: "sample udf",
        body: "function () { const x = 10; }"
      };

      // TODO also handle upsert case
      const { resource: udf } = await container.scripts.userDefinedFunctions.create(udfDefinition);

      assert.equal(udf.id, udfDefinition.id);
      assert.equal(udf.body, "function () { const x = 10; }");

      // read udfs after creation
      const { resources: udfsAfterCreate } = await container.scripts.userDefinedFunctions.readAll().fetchAll();
      assert.equal(udfsAfterCreate.length, beforeCreateUdfsCount + 1, "create should increase the number of udfs");

      // query udfs
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: udfDefinition.id
          }
        ]
      };
      const { resources: results } = await container.scripts.userDefinedFunctions.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace udf
      udfDefinition.body = "function () { const x = 10; }";
      const { resource: replacedUdf } = await container.scripts
        .userDefinedFunction(udfDefinition.id)
        .replace(udfDefinition);

      assert.equal(replacedUdf.id, udfDefinition.id);
      assert.equal(replacedUdf.body, "function () { const x = 10; }");

      // read udf
      const { resource: udfAfterReplace } = await container.scripts.userDefinedFunction(replacedUdf.id).read();

      assert.equal(replacedUdf.id, udfAfterReplace.id);

      // delete udf
      const { resource: res } = await container.scripts.userDefinedFunction(replacedUdf.id).delete();

      // read udfs after deletion
      try {
        const { resource: badudf } = await container.scripts.userDefinedFunction(replacedUdf.id).read();
        assert.fail("Must fail to read after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });

    it("nativeApi Should do UDF CRUD operations successfully", async function() {
      const { resources: udfs } = await container.scripts.userDefinedFunctions.readAll().fetchAll();

      // create a udf
      const beforeCreateUdfsCount = udfs.length;
      const udfDefinition = {
        id: "sample udf",
        body: "function () { const x = 10; }"
      };

      const { resource: udf } = await container.scripts.userDefinedFunctions.upsert(udfDefinition);

      assert.equal(udf.id, udfDefinition.id);
      assert.equal(udf.body, "function () { const x = 10; }");

      // read udfs after creation
      const { resources: udfsAfterCreate } = await container.scripts.userDefinedFunctions.readAll().fetchAll();
      assert.equal(udfsAfterCreate.length, beforeCreateUdfsCount + 1, "create should increase the number of udfs");

      // query udfs
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: udfDefinition.id
          }
        ]
      };
      const { resources: results } = await container.scripts.userDefinedFunctions.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace udf
      udfDefinition.body = "function () { const x = 10; }";
      const { resource: replacedUdf } = await container.scripts.userDefinedFunctions.upsert(udfDefinition);

      assert.equal(replacedUdf.id, udfDefinition.id);
      assert.equal(replacedUdf.body, "function () { const x = 10; }");

      // read udf
      const { resource: udfAfterReplace } = await container.scripts.userDefinedFunction(replacedUdf.id).read();

      assert.equal(replacedUdf.id, udfAfterReplace.id);

      // delete udf
      const { resource: res } = await container.scripts.userDefinedFunction(replacedUdf.id).delete();

      // read udfs after deletion
      try {
        const { resource: badudf } = await container.scripts.userDefinedFunction(replacedUdf.id).read();
        assert.fail("Must fail to read after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });
  });
});
