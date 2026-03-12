// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient, OperationType } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { testForDiagnostics } from "../common/TestHelpers.js";
import { describe, it, assert } from "vitest";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

describe("NodeJS CRUD Tests", { timeout: 10000 }, () => {
  describe("validate database account functionality", () => {
    it("nativeApi Should get database account successfully name based", async () => {
      const {
        resource: databaseAccount,
        headers,
        statusCode,
      } = await testForDiagnostics(
        async () => {
          return client.getDatabaseAccount();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 0,
          retryCount: 0,
          gatewayStatisticsTestSpec: [
            {
              operationType: OperationType.Read,
            },
          ],
        },
      );
      assert.equal(databaseAccount.DatabasesLink, "/dbs/");
      assert.equal(databaseAccount.MediaLink, "/media/");
      assert.equal(
        databaseAccount.MaxMediaStorageUsageInMB,
        headers["x-ms-max-media-storage-usage-mb"],
      ); // TODO: should use constants here
      assert.equal(
        databaseAccount.CurrentMediaStorageUsageInMB,
        headers["x-ms-media-storage-usage-mb"],
      );
      assert(databaseAccount.ConsistencyPolicy !== undefined);
      assert(statusCode !== undefined);
      assert(databaseAccount.enablePerPartitionFailover !== undefined);
    });
  });
});
