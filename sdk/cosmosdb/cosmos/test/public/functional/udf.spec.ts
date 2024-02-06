// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { UserDefinedFunctionDefinition, Container } from "../../../src";
import { removeAllDatabases, getTestContainer } from "../common/TestHelpers";

describe("User Defined Function", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  let container: Container;

  beforeEach(async function () {
    await removeAllDatabases();
    // get container
    container = await getTestContainer("UDFTests");
  });
  it("nativeApi Should do UDF CRUD operations successfully", async function () {
    const { resources: udfs } = await container.scripts.userDefinedFunctions.readAll().fetchAll();

    // create a udf
    const beforeCreateUdfsCount = udfs.length;
    const udfDefinition: UserDefinedFunctionDefinition = {
      id: "sample udf",
      body: "function () { const x = 10; }",
    };

    // TODO also handle upsert case
    const { resource: udf } = await container.scripts.userDefinedFunctions.create(udfDefinition);

    assert.equal(udf.id, udfDefinition.id);
    assert.equal(udf.body, "function () { const x = 10; }");

    // read udfs after creation
    const { resources: udfsAfterCreate } = await container.scripts.userDefinedFunctions
      .readAll()
      .fetchAll();
    assert.equal(
      udfsAfterCreate.length,
      beforeCreateUdfsCount + 1,
      "create should increase the number of udfs"
    );

    // query udfs
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: udfDefinition.id,
        },
      ],
    };
    const { resources: results } = await container.scripts.userDefinedFunctions
      .query(querySpec)
      .fetchAll();
    assert(results.length > 0, "number of results for the query should be > 0");

    // replace udf
    udfDefinition.body = "function () { const x = 10; }";
    const { resource: replacedUdf } = await container.scripts
      .userDefinedFunction(udfDefinition.id)
      .replace(udfDefinition);

    assert.equal(replacedUdf.id, udfDefinition.id);
    assert.equal(replacedUdf.body, "function () { const x = 10; }");

    // read udf
    const { resource: udfAfterReplace } = await container.scripts
      .userDefinedFunction(replacedUdf.id)
      .read();

    assert.equal(replacedUdf.id, udfAfterReplace.id);

    // delete udf
    await container.scripts.userDefinedFunction(replacedUdf.id).delete();

    // read udfs after deletion
    try {
      await container.scripts.userDefinedFunction(replacedUdf.id).read();
      assert.fail("Must fail to read after delete");
    } catch (err: any) {
      const notFoundErrorCode = 404;
      assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
    }
  });
});
