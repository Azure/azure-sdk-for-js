// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { removeAllDatabases, getTestContainer } from "../common/TestHelpers";

describe.only("Conflicts", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Query conflicts", function() {
    it("query conflicts", async function() {
      // create database
      const container = await getTestContainer("conflicts");

      const { resources } = await container.conflicts.query("SELECT * from C").fetchNext();

      assert.equal(resources.length, 0);
    });
  });
});
