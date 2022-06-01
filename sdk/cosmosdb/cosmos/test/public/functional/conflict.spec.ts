// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { removeAllDatabases, getTestContainer } from "../common/TestHelpers";

describe("Conflicts", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  describe("Query conflicts", function () {
    it("query conflicts", async function () {
      const container = await getTestContainer("conflicts");
      const { resources } = await container.conflicts.query("SELECT * from C").fetchNext();
      assert.equal(resources.length, 0);
    });
    it("query conflicts with forceQueryPlan", async function () {
      // TODO. Remove! This test is to prevent regression on a bug where a query plan was being fetched for non-item resources
      // Ideally QueryIterator for item gets its own type instead of shared amongst all resources
      const container = await getTestContainer("conflicts");
      const { resources } = await container.conflicts
        .query("SELECT * from C", { forceQueryPlan: true })
        .fetchNext();
      assert.equal(resources.length, 0);
    });
  });
});
