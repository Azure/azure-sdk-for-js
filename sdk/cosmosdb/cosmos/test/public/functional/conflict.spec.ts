// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { Suite } from "mocha";
import { removeAllDatabases, getTestContainer, testForDiagnostics } from "../common/TestHelpers";
import { getCurrentTimestampInMs } from "../../../src/utils/time";

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
    await testForDiagnostics(
      async () => {
        return container.conflicts.query("SELECT * from C", { forceQueryPlan: true }).fetchNext();
      },
      {
        requestStartTimeUTCInMsLowerLimit: timestamp,
        requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
        retryCount: 0,
        // metadataCallCount: 2, // One call for database account + data query call.
        locationEndpointsContacted: 1,
      },
      true,
    );
  });
});
