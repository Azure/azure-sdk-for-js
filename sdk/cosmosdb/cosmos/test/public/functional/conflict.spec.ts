// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { removeAllDatabases, getTestContainer, validateDiagnostics } from "../common/TestHelpers";
import { getCurrentTimestampInMs } from "../../../src/CosmosDiagnosticsContext";

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
  it("Test diagnostics for conflict", async function () {
    const container = await getTestContainer("conflicts");
    const timestamp = getCurrentTimestampInMs();
    const { diagnostics } = await container.conflicts
      .query("SELECT * from C", { forceQueryPlan: true })
      .fetchNext();
    validateDiagnostics(diagnostics, {
      requestStartTimeUTCInMsLowerLimit: timestamp,
      requestEndTimeUTCInMsHigherLimit: getCurrentTimestampInMs(),
      retryCount: 0,
      metadataCallCount: 2, // One call for database account + data query call.
      locationEndpointsContacted: 1,
    });
  });
});
