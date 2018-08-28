import assert from "assert";
import { Container } from "../..";
import { UserDefinedFunctionDefinition } from "../../client";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

const containerId = "sample container";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("User Defined Function", function() {
    let container: Container;

    beforeEach(async function() {
      // create database
      const database = await getTestDatabase("udf test database");

      // create container
      await database.containers.create({ id: containerId });

      container = await database.container(containerId);
    });
    it("nativeApi Should do UDF CRUD operations successfully", async function() {
      const { result: udfs } = await container.userDefinedFunctions.readAll().toArray();

      // create a udf
      const beforeCreateUdfsCount = udfs.length;
      const udfDefinition: UserDefinedFunctionDefinition = {
        id: "sample udf",
        body: "function () { const x = 10; }"
      };

      // TODO also handle upsert case
      const { body: udf } = await container.userDefinedFunctions.create(udfDefinition);

      assert.equal(udf.id, udfDefinition.id);
      assert.equal(udf.body, "function () { const x = 10; }");

      // read udfs after creation
      const { result: udfsAfterCreate } = await container.userDefinedFunctions.readAll().toArray();
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
      const { result: results } = await container.userDefinedFunctions.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace udf
      udfDefinition.body = "function () { const x = 10; }";
      const { body: replacedUdf } = await container.userDefinedFunction(udfDefinition.id).replace(udfDefinition);

      assert.equal(replacedUdf.id, udfDefinition.id);
      assert.equal(replacedUdf.body, "function () { const x = 10; }");

      // read udf
      const { body: udfAfterReplace } = await container.userDefinedFunction(replacedUdf.id).read();

      assert.equal(replacedUdf.id, udfAfterReplace.id);

      // delete udf
      const { body: res } = await container.userDefinedFunction(replacedUdf.id).delete();

      // read udfs after deletion
      try {
        const { body: badudf } = await container.userDefinedFunction(replacedUdf.id).read();
        assert.fail("Must fail to read after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });

    it("nativeApi Should do UDF CRUD operations successfully", async function() {
      const { result: udfs } = await container.userDefinedFunctions.readAll().toArray();

      // create a udf
      const beforeCreateUdfsCount = udfs.length;
      const udfDefinition = {
        id: "sample udf",
        body: "function () { const x = 10; }"
      };

      const { body: udf } = await container.userDefinedFunctions.upsert(udfDefinition);

      assert.equal(udf.id, udfDefinition.id);
      assert.equal(udf.body, "function () { const x = 10; }");

      // read udfs after creation
      const { result: udfsAfterCreate } = await container.userDefinedFunctions.readAll().toArray();
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
      const { result: results } = await container.userDefinedFunctions.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace udf
      udfDefinition.body = "function () { const x = 10; }";
      const { body: replacedUdf } = await container.userDefinedFunctions.upsert(udfDefinition);

      assert.equal(replacedUdf.id, udfDefinition.id);
      assert.equal(replacedUdf.body, "function () { const x = 10; }");

      // read udf
      const { body: udfAfterReplace } = await container.userDefinedFunction(replacedUdf.id).read();

      assert.equal(replacedUdf.id, udfAfterReplace.id);

      // delete udf
      const { body: res } = await container.userDefinedFunction(replacedUdf.id).delete();

      // read udfs after deletion
      try {
        const { body: badudf } = await container.userDefinedFunction(replacedUdf.id).read();
        assert.fail("Must fail to read after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });
  });
});
