// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChangeFeedIteratorOptions, RequestOptions } from "../../../src/index.js";
import {
  ChangeFeedStartFrom,
  ChangeFeedRetentionTimeSpan,
  ChangeFeedPolicy,
  ChangeFeedMode,
} from "../../../src/index.js";
import type { Container, ContainerDefinition } from "../../../src/index.js";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents/index.js";
import {
  getTestContainer,
  removeAllDatabases,
  testForDiagnostics,
  changeFeedAllVersionsInsertItems,
  changeFeedAllVersionsUpsertItems,
  changeFeedAllVersionsDeleteItems,
} from "../common/TestHelpers.js";
import { FeedRangeInternal } from "../../../src/client/ChangeFeed/FeedRange.js";
import { getCurrentTimestampInMs } from "../../../src/utils/time.js";
import { StatusCodes } from "../../../src/common/statusCodes.js";
import { describe, it, assert, beforeAll, afterAll } from "vitest";
import { skipTestForSignOff } from "../common/_testConfig.js";

describe("Change Feed Iterator", { timeout: 20000 }, () => {
  // delete all databases and create sample database
  beforeAll(async () => {
    await removeAllDatabases();
  });

  describe("test changefeed iterator options", () => {
    let container: Container;

    beforeAll(async () => {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/key1", "/key2"],
          kind: PartitionKeyKind.MultiHash,
          version: PartitionKeyDefinitionVersion.V2,
        },
      };
      const throughput: RequestOptions = { offerThroughput: 11000 };
      container = await getTestContainer(
        "change feed iterator options",
        undefined,
        containerDef,
        throughput,
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("max item count cannot be < 1", async () => {
      try {
        const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
          maxItemCount: 0,
          changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
        };
        const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

        while (iterator.hasMoreResults) {
          await iterator.readNext();
        }
      } catch (err: any) {
        assert.strictEqual(err.message, "maxItemCount must be a positive number");
        return;
      }
      assert.fail("Should have failed");
    });
  });

  describe("test changefeed for one partition key", () => {
    let container: Container;

    beforeAll(async () => {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/key1", "/key2"],
          kind: PartitionKeyKind.MultiHash,
          version: PartitionKeyDefinitionVersion.V2,
        },
      };
      const throughput: RequestOptions = { offerThroughput: 25100 };
      container = await getTestContainer(
        "changefeed for one partition key",
        undefined,
        containerDef,
        throughput,
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("check if maxItemCount property is being followed", async () => {
      const maxItemCount = 1;
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: maxItemCount,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const response = await iterator.readNext();
        const { result: items } = response;
        if (items.length === 0) {
          break;
        }
        assert.equal(items.length, maxItemCount, "No. of items should be equal to maxItemCount");
      }
    });

    it("startFromBeginning should fetch all results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };

      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 10, "initial number of items should be equal to 10");
      }
    });

    it("Iterator should start from last continuation token and fetch remaining results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      let count = 0;
      let continuationToken = undefined;

      while (iterator.hasMoreResults && count < 6) {
        const response = await iterator.readNext();
        count += response.result.length;
        continuationToken = response.continuationToken;
      }
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 4, "Remaining number of items should be equal to 4");
      }
    });

    it("startFromNow should fetch all results from now on", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if (items.length === 0) {
          break;
        }
      }
      // add 10 new items to this partition key
      for (let i = 11; i < 21; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
      }
      // again start the iterator
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
      }
    });
    // skipping this test for now due to flaky behavior
    it.skip("check diagnostic for readNext operation.", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      await container.items.create({ id: `diagnostic1`, key1: `0`, key2: 0 });
      const startTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return iterator.readNext();
        },
        {
          retryCount: 0,
          // metadataCallCount: 4,
          locationEndpointsContacted: 1,
          requestStartTimeUTCInMsLowerLimit: startTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs() - startTimestamp,
        },
      );
    });
  });

  describe.skipIf(skipTestForSignOff)("test changefeed for one prefix partition key", () => {
    let container: Container;

    beforeAll(async () => {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/key1", "/key2", "/key3"],
          kind: PartitionKeyKind.MultiHash,
          version: PartitionKeyDefinitionVersion.V2,
        },
      };
      const throughput: RequestOptions = { offerThroughput: 25100 };
      container = await getTestContainer(
        "changefeed for one prefix partition key",
        undefined,
        containerDef,
        throughput,
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 1 });
      }
    });

    it("check if maxItemCount property is being followed", async () => {
      const maxItemCount = 1;
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: maxItemCount,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const response = await iterator.readNext();
        const { result: items } = response;
        if (items.length === 0) {
          break;
        }
        assert.equal(items.length, maxItemCount, "No. of items should be equal to maxItemCount");
      }
    });

    it("startFromBeginning should fetch all results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };

      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 20, "initial number of items should be equal to 20");
      }
    });

    it("Iterator should start from last continuation token and fetch remaining results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      let count = 0;
      let continuationToken = undefined;

      while (iterator.hasMoreResults && count < 10) {
        const response = await iterator.readNext();
        count += response.result.length;
        continuationToken = response.continuationToken;
      }
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 10, "Remaining number of items should be equal to 10");
      }
    });

    it("startFromNow should fetch all results from now on", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["0", 0]),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if (items.length === 0) {
          break;
        }
      }
      // add 10 new items to this partition key
      for (let i = 11; i < 21; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 0 });
      }
      // again start the iterator
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
      }
    });

    it("should fetch correct results for undefined values of partition keys", async () => {
      let changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["2", 3]),
      };
      let iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if (items.length === 0) {
          break;
        }
      }
      // adding some items with key3 as undefined
      for (let i = 21; i < 22; i++) {
        await container.items.create({ id: `item${i}`, key1: `2`, key2: 3, key3: 0 });
        await container.items.create({ id: `item${i}`, key1: `2`, key2: 3, key3: undefined });
      }

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
        assert.equal(items.length, 2, "Number of items should be equal to 2");
      }

      changeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["2", undefined]),
      };
      iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if (items.length === 0) {
          break;
        }
      }
      // adding some items with key2 as undefined
      for (let i = 22; i < 23; i++) {
        await container.items.create({ id: `item${i}`, key1: `2`, key2: undefined, key3: 0 });
        await container.items.create({
          id: `item${i}`,
          key1: `2`,
          key2: undefined,
          key3: undefined,
        });
      }

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
        assert.equal(items.length, 2, "Number of items should be equal to 2");
      }

      // adding some items with key1 as undefined
      for (let i = 23; i < 24; i++) {
        await container.items.create({
          id: `item${i}`,
          key1: undefined,
          key2: undefined,
          key3: undefined,
        });
        await container.items.create({
          id: `item${i}`,
          key1: undefined,
          key2: undefined,
          key3: 0,
        });
        await container.items.create({
          id: `item${i}`,
          key1: undefined,
          key2: 1,
          key3: 0,
        });
        await container.items.create({
          id: `item${i}`,
          key1: undefined,
          key2: 0,
          key3: 1,
        });
      }

      changeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning([undefined, undefined, undefined]),
      };

      iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 1, "Number of items should be equal to 1");
      }

      changeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning([undefined, undefined]),
      };

      iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 2, "Number of items should be equal to 2");
      }

      changeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning([undefined]),
      };

      iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      let count = 0;
      let continuationToken = undefined;

      while (iterator.hasMoreResults && count < 2) {
        const response = await iterator.readNext();
        count += response.result.length;
        continuationToken = response.continuationToken;
      }
      assert.equal(count, 2, "count till now should be equal to 2");
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 2, "Remaining number of items should be equal to 2");
      }
    });
  });

  describe.skipIf(skipTestForSignOff)("test changefeed for entire container", () => {
    let container: Container;

    beforeAll(async () => {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/name"],
          kind: PartitionKeyKind.MultiHash,
          version: PartitionKeyDefinitionVersion.V2,
        },
      };
      const throughput: RequestOptions = { offerThroughput: 21000 };
      container = await getTestContainer(
        "changefeedEntireContainer",
        undefined,
        containerDef,
        throughput,
      );

      for (let i = 1; i < 6; i++) {
        await container.items.create({ name: "sample1", key: i });
        await container.items.create({ name: "sample2", key: i });
        await container.items.create({ name: "sample3", key: i });
        await container.items.create({ name: "sample4", key: i });
      }
    });

    it("ChangeFeedStartFrom.Beginning should fetch all results of all partitions", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      let counter = 0;
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        counter += items.length;
        if (items.length === 0) break;
      }
      assert.equal(counter, 20, "20 items should be fetched");
    });

    it("Iterator should start from last continuation token and fetch remaining results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      let counter = 0;
      let continuationToken = undefined;

      while (counter < 10) {
        const response = await iterator.readNext();
        counter += response.result.length;
        continuationToken = response.continuationToken;
      }
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);
      let counter2 = 0;
      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.readNext();
        counter2 += items.length;
        if (items.length === 0) break;
      }
      assert.equal(counter2, 10, "Remaining number of items should be equal to 10");
    });

    it("partitions should be iterated breadth first", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      let counter = 0;
      let partitionKey1: string | undefined = undefined;
      let partitionKey2: string | undefined = undefined;
      while (counter < 2) {
        const result = await iterator.readNext();
        if (counter === 0) {
          partitionKey1 = result.headers["x-ms-documentdb-partitionkeyrangeid"];
        }
        if (counter === 1) {
          partitionKey2 = result.headers["x-ms-documentdb-partitionkeyrangeid"];
        }
        counter++;
      }
      assert.notEqual(partitionKey1, partitionKey2, "Partition keys should be different");
    });

    it("ChangeFeedStartFrom.Now() should fetch all results from now on for entire container", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 10,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(),
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if (items.length === 0) {
          break;
        }
      }
      // add 20 new items to the container
      for (let i = 6; i < 11; i++) {
        await container.items.create({ name: "sample1", key: i });
        await container.items.create({ name: "sample2", key: i });
        await container.items.create({ name: "sample3", key: i });
        await container.items.create({ name: "sample4", key: i });
      }
      // again start the iterator
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
      }
    });
  });
});

describe.skipIf(skipTestForSignOff)("test changefeed for feed range", () => {
  let container: Container;

  beforeAll(async () => {
    const containerDef: ContainerDefinition = {
      partitionKey: {
        paths: ["/name"],
        version: PartitionKeyDefinitionVersion.V1,
      },
    };
    const throughput: RequestOptions = { offerThroughput: 21000 };
    container = await getTestContainer("changefeed Epk Range", undefined, containerDef, throughput);

    for (let i = 1; i < 11; i++) {
      await container.items.create({ name: "sample1", key: i });
      await container.items.create({ name: "sample2", key: i });
      await container.items.create({ name: "sample3", key: i });
      await container.items.create({ name: "sample4", key: i });
    }
  });
  it("startFromBeginning should fetch all results", async () => {
    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;
      assert.equal(items.length, 10, "initial number of items should be equal to 10");
    }
  });

  it("Iterator should start from last continuation token and fetch remaining results", async () => {
    const feedRanges = await container.getFeedRanges();
    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
    let counter = 0;
    let continuationToken = undefined;

    while (counter < 6) {
      const response = await iterator.readNext();
      counter += response.result.length;
      continuationToken = response.continuationToken;
    }

    const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    };
    const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

    while (iterator2.hasMoreResults) {
      const { result: items } = await iterator2.readNext();
      if (items.length === 0) break;
      assert.equal(items.length, 4, "Remaining number of items should be equal to 4");
    }
  });

  it("ChangeFeedStartFrom.Now() should fetch all results from now on", async () => {
    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 10,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(feedRanges[0]),
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      assert.equal(items.length, 0, "Initially no new changes");
      // initial result will be 0 as no new changes since creation of iterator
      if (items.length === 0) {
        break;
      }
    }
    // add 10 new items to this partition
    for (let i = 11; i < 21; i++) {
      await container.items.create({ name: "sample1", key: i });
      await container.items.create({ name: "sample2", key: i });
      await container.items.create({ name: "sample3", key: i });
      await container.items.create({ name: "sample4", key: i });
    }
    // again start the iterator
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;
      assert.notEqual(items.length, 0, "New changes should be fetched");
    }
  });

  it("fetch results for more than one physical partitions", async () => {
    const epkRange = new FeedRangeInternal("", "05C1DFFFFFFFF8");
    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(epkRange),
    };

    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let counter = 0;
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      counter += items.length;
      if (items.length === 0) {
        break;
      }
    }
    assert.equal(counter, 40, "40 items should be fetched");
  });
});

describe.skipIf(skipTestForSignOff)(
  "test changefeed allVersionsAndDeletes mode for entire container",
  () => {
    let container: Container;

    beforeAll(async () => {
      const newTimeStamp = ChangeFeedRetentionTimeSpan.fromMinutes(5);
      const changeFeedPolicy = new ChangeFeedPolicy(newTimeStamp);
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/name"],
          version: PartitionKeyDefinitionVersion.V1,
        },
        changeFeedPolicy: changeFeedPolicy,
      };
      const throughput: RequestOptions = { offerThroughput: 21000 };
      container = await getTestContainer(
        "Changefeed allVersionsAndDeletes-EntireContainer",
        undefined,
        containerDef,
        throughput,
      );
      await changeFeedAllVersionsInsertItems(container, 1, 5);
    });
    it("startFromBeginning is not supported", async () => {
      try {
        const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
          changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
          changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
        };
        const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

        while (iterator.hasMoreResults) {
          await iterator.readNext();
          assert.fail("Should have failed");
        }
      } catch (err: any) {
        assert.strictEqual(err.code, StatusCodes.BadRequest);
        assert.strictEqual(
          true,
          err.message.includes("You must read the change feed from within the retention period."),
        );
        return;
      }
    });

    it("validate changefeed results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      let continuationToken = undefined;

      while (iterator.hasMoreResults) {
        const res = await iterator.readNext();
        // intially there will be no results as no new changes since creation of iterator. This is just to get the continuation token for next iterator.
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
      }
      // add new documents to the container
      await changeFeedAllVersionsInsertItems(container, 6, 10);

      let counter = 0;
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "create");
        }
      }
      assert.strictEqual(counter, 20, "20 results should be fetched");

      // update documents in the container
      await changeFeedAllVersionsUpsertItems(container, 1, 5, 20);

      const changeFeedIteratorOptions3: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator3 = container.items.getChangeFeedIterator(changeFeedIteratorOptions3);

      counter = 0;
      while (iterator3.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "replace");
        }
      }
      assert.strictEqual(counter, 20, "20 results should be fetched");

      // delete documents in the container
      await changeFeedAllVersionsDeleteItems(container, 1, 5);

      const changeFeedIteratorOptions4: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator4 = container.items.getChangeFeedIterator(changeFeedIteratorOptions4);

      counter = 0;
      while (iterator4.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "delete");
        }
      }
      assert.strictEqual(counter, 20, "20 results should be fetched");
    });

    afterAll(async () => {
      if (container) {
        await container.delete();
      }
    });
  },
);

describe.skipIf(skipTestForSignOff)(
  "test changefeed allVersionsAndDeletes mode for a feed range",
  () => {
    let container: Container;

    beforeAll(async () => {
      const newTimeStamp = ChangeFeedRetentionTimeSpan.fromMinutes(5);
      const changeFeedPolicy = new ChangeFeedPolicy(newTimeStamp);
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/name"],
          version: PartitionKeyDefinitionVersion.V1,
        },
        changeFeedPolicy: changeFeedPolicy,
      };
      const throughput: RequestOptions = { offerThroughput: 21000 };
      container = await getTestContainer(
        "Changefeed allVersionsAndDeletes-FeedRange",
        undefined,
        containerDef,
        throughput,
      );
      await changeFeedAllVersionsInsertItems(container, 1, 5);
    });
    it("startFromBeginning is not supported", async () => {
      try {
        const feedRanges = await container.getFeedRanges();
        const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
          changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
          changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
        };
        const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

        while (iterator.hasMoreResults) {
          await iterator.readNext();
          assert.fail("Should have failed");
        }
      } catch (err: any) {
        assert.strictEqual(err.code, StatusCodes.BadRequest);
        assert.strictEqual(
          true,
          err.message.includes("You must read the change feed from within the retention period."),
        );
        return;
      }
    });

    it("validate changefeed results", async () => {
      const feedRanges = await container.getFeedRanges();
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(feedRanges[0]),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      let continuationToken = undefined;

      while (iterator.hasMoreResults) {
        const res = await iterator.readNext();
        // intially there will be no results as no new changes since creation of iterator. This is just to get the continuation token for next iterator.
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
      }
      // add new documents to the container
      await changeFeedAllVersionsInsertItems(container, 6, 10);
      let counter = 0;
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "create");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");

      // update documents in the container
      await changeFeedAllVersionsUpsertItems(container, 1, 5, 20);

      const changeFeedIteratorOptions3: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator3 = container.items.getChangeFeedIterator(changeFeedIteratorOptions3);

      counter = 0;
      while (iterator3.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "replace");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");

      // delete documents in the container
      await changeFeedAllVersionsDeleteItems(container, 1, 5);

      const changeFeedIteratorOptions4: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator4 = container.items.getChangeFeedIterator(changeFeedIteratorOptions4);

      counter = 0;
      while (iterator4.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "delete");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");
    });

    afterAll(async () => {
      if (container) {
        await container.delete();
      }
    });
  },
);

describe.skipIf(skipTestForSignOff)(
  "test changefeed allVersionsAndDeletes mode for a partition key",
  () => {
    let container: Container;

    beforeAll(async () => {
      const newTimeStamp = ChangeFeedRetentionTimeSpan.fromMinutes(5);
      const changeFeedPolicy = new ChangeFeedPolicy(newTimeStamp);
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/name"],
          version: PartitionKeyDefinitionVersion.V1,
        },
        changeFeedPolicy: changeFeedPolicy,
      };
      const throughput: RequestOptions = { offerThroughput: 21000 };
      container = await getTestContainer(
        "Changefeed allVersionsAndDeletes-PartitionKey",
        undefined,
        containerDef,
        throughput,
      );
      await changeFeedAllVersionsInsertItems(container, 1, 5);
    });

    it("startFromBeginning is not supported", async () => {
      try {
        const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
          changeFeedStartFrom: ChangeFeedStartFrom.Beginning("sample1"),
          changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
        };
        const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

        while (iterator.hasMoreResults) {
          await iterator.readNext();
          assert.fail("Should have failed");
        }
      } catch (err: any) {
        assert.strictEqual(err.code, StatusCodes.BadRequest);
        assert.strictEqual(
          true,
          err.message.includes("You must read the change feed from within the retention period."),
        );
        return;
      }
    });

    it("validate changefeed results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Now("sample1"),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      let continuationToken = undefined;

      while (iterator.hasMoreResults) {
        const res = await iterator.readNext();
        // intially there will be no results as no new changes since creation of iterator. This is just to get the continuation token for next iterator.
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
      }
      // add new documents to the container
      await changeFeedAllVersionsInsertItems(container, 6, 10);

      let counter = 0;
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "create");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");

      // update documents in the container
      await changeFeedAllVersionsUpsertItems(container, 1, 5, 20);

      const changeFeedIteratorOptions3: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator3 = container.items.getChangeFeedIterator(changeFeedIteratorOptions3);

      counter = 0;
      while (iterator3.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "replace");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");

      // delete documents in the container
      await changeFeedAllVersionsDeleteItems(container, 1, 5);

      const changeFeedIteratorOptions4: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator4 = container.items.getChangeFeedIterator(changeFeedIteratorOptions4);

      counter = 0;
      while (iterator4.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "delete");
        }
      }
      assert.strictEqual(counter, 5, "5 results should be fetched");
    });

    afterAll(async () => {
      if (container) {
        await container.delete();
      }
    });
  },
);

describe.skipIf(skipTestForSignOff)(
  "test changefeed allVersionsAndDeletes mode for a prefix partition key",
  () => {
    let container: Container;

    beforeAll(async () => {
      await removeAllDatabases();
      const newTimeStamp = ChangeFeedRetentionTimeSpan.fromMinutes(5);
      const changeFeedPolicy = new ChangeFeedPolicy(newTimeStamp);
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/key1", "/key2", "/key3"],
          kind: PartitionKeyKind.MultiHash,
          version: PartitionKeyDefinitionVersion.V2,
        },
        changeFeedPolicy: changeFeedPolicy,
      };
      const throughput: RequestOptions = { offerThroughput: 21000 };
      container = await getTestContainer(
        "Changefeed allVersionsAndDeletes-Prefix-PartitionKey",
        undefined,
        containerDef,
        throughput,
      );
      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 1 });
      }
    });
    it("startFromBeginning is not supported", async () => {
      try {
        const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
          changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
          changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
        };
        const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

        while (iterator.hasMoreResults) {
          await iterator.readNext();
          assert.fail("Should have failed");
        }
      } catch (err: any) {
        assert.strictEqual(err.code, StatusCodes.BadRequest);
        assert.strictEqual(
          true,
          err.message.includes("You must read the change feed from within the retention period."),
        );
        return;
      }
    });

    it("validate changefeed results", async () => {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Now(["0", 0]),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      let continuationToken = undefined;

      while (iterator.hasMoreResults) {
        const res = await iterator.readNext();
        // intially there will be no results as no new changes since creation of iterator. This is just to get the continuation token for next iterator.
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
      }
      // add new documents to the container
      for (let i = 11; i < 16; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 0, someValue: 2 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0, key3: 1, someValue: 2 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 0, someValue: 2 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1, key3: 1, someValue: 2 });
      }

      let counter = 0;
      const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

      while (iterator2.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "create");
        }
      }
      assert.strictEqual(counter, 10, "10 results should be fetched");

      // update documents in the container
      for (let i = 11; i < 16; i++) {
        await container.items.upsert({ id: `item${i}`, key1: `0`, key2: 0, key3: 0, someValue: 3 });
        await container.items.upsert({ id: `item${i}`, key1: `0`, key2: 0, key3: 1, someValue: 3 });
        await container.items.upsert({ id: `item${i}`, key1: `1`, key2: 1, key3: 0, someValue: 3 });
        await container.items.upsert({ id: `item${i}`, key1: `1`, key2: 1, key3: 1, someValue: 3 });
      }
      const changeFeedIteratorOptions3: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator3 = container.items.getChangeFeedIterator(changeFeedIteratorOptions3);

      counter = 0;
      while (iterator3.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "replace");
        }
      }
      assert.strictEqual(counter, 10, "10 results should be fetched");

      // delete documents in the container
      for (let i = 11; i < 16; i++) {
        await container.item(`item${i}`, ["0", 0, 0]).delete();
        await container.item(`item${i}`, ["0", 0, 1]).delete();
      }

      const changeFeedIteratorOptions4: ChangeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator4 = container.items.getChangeFeedIterator(changeFeedIteratorOptions4);

      counter = 0;
      while (iterator4.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        const resItems: any[] = res.result;
        counter += resItems.length;
        for (const item of resItems) {
          assert.strictEqual(item.metadata.operationType, "delete");
        }
      }
      assert.strictEqual(counter, 10, "10 results should be fetched");
    });

    afterAll(async () => {
      if (container) {
        await container.delete();
      }
    });
  },
);

describe("Change Feed with Priority Level", { timeout: 20000 }, () => {
  let container: Container;

  beforeAll(async () => {
    const containerDef: ContainerDefinition = {
      partitionKey: {
        paths: ["/name"],
        version: PartitionKeyDefinitionVersion.V1,
      },
    };
    const throughput: RequestOptions = { offerThroughput: 21000 };
    container = await getTestContainer("changefeed Priority Level", undefined, containerDef, throughput);

    // Create initial items for testing
    for (let i = 1; i < 11; i++) {
      await container.items.create({ name: "sample1", key: i });
      await container.items.create({ name: "sample2", key: i });
    }
  });

  it("should use PriorityLevel.Low for ChangeFeed operations", async () => {
    const { PriorityLevel } = await import("../../../src/documents/PriorityLevel.js");

    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
      priorityLevel: PriorityLevel.Low,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let processedItems = 0;
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;

      processedItems += items.length;
      // Verify we can process items successfully with Low priority
      assert(items.length > 0, "Should receive items with Low priority");

      // Stop after processing some items to avoid infinite loop
      if (processedItems >= 10) break;
    }

    assert(processedItems >= 10, "Should have processed at least 10 items with Low priority");
  });

  it("should use PriorityLevel.High for ChangeFeed operations", async () => {
    const { PriorityLevel } = await import("../../../src/documents/PriorityLevel.js");

    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
      priorityLevel: PriorityLevel.High,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let processedItems = 0;
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;

      processedItems += items.length;
      // Verify we can process items successfully with High priority
      assert(items.length > 0, "Should receive items with High priority");

      // Stop after processing some items to avoid infinite loop
      if (processedItems >= 10) break;
    }

    assert(processedItems >= 10, "Should have processed at least 10 items with High priority");
  });

  it("should use PriorityLevel with ChangeFeedStartFrom.Now()", async () => {
    const { PriorityLevel } = await import("../../../src/documents/PriorityLevel.js");

    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(feedRanges[0]),
      priorityLevel: PriorityLevel.Low,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
    let continuationToken = undefined;

    while (iterator.hasMoreResults) {
      const res = await iterator.readNext();
      // Initially there will be no results as no new changes since creation of iterator
      if (res.statusCode === StatusCodes.NotModified) {
        continuationToken = res.continuationToken;
        break;
      }
    }

    // Add new documents to the container
    await changeFeedAllVersionsInsertItems(container, 21, 25);

    let counter = 0;
    const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      priorityLevel: PriorityLevel.Low,
    };
    const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

    while (iterator2.hasMoreResults) {
      const { result: items } = await iterator2.readNext();
      if (items.length === 0) break;

      counter += items.length;
      assert(items.length > 0, "Should receive new items with Low priority");

      // Stop after processing some new items
      if (counter >= 8) break;
    }

    assert(counter >= 8, "Should have processed at least 8 new items with Low priority");
  });

  it("should use PriorityLevel with partition key", async () => {
    const { PriorityLevel } = await import("../../../src/documents/PriorityLevel.js");

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning("sample1"),
      priorityLevel: PriorityLevel.Low,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let processedItems = 0;
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;

      processedItems += items.length;

      // Verify all items have the correct partition key
      for (const item of items) {
        assert.strictEqual((item as any).name, "sample1", "All items should have partition key 'sample1'");
      }

      // Stop after processing some items
      if (processedItems >= 5) break;
    }

    assert(processedItems >= 5, "Should have processed at least 5 items for partition key with Low priority");
  });

  it("should use PriorityLevel with ChangeFeedMode.AllVersionsAndDeletes", async () => {
    const { PriorityLevel } = await import("../../../src/documents/PriorityLevel.js");

    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(feedRanges[0]),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      priorityLevel: PriorityLevel.Low,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
    let continuationToken = undefined;

    while (iterator.hasMoreResults) {
      const res = await iterator.readNext();
      if (res.statusCode === StatusCodes.NotModified) {
        continuationToken = res.continuationToken;
        break;
      }
    }

    // Add, modify, and delete documents to test all versions and deletes mode
    await changeFeedAllVersionsInsertItems(container, 26, 28);
    await changeFeedAllVersionsUpsertItems(container, 26, 28, 30);
    await changeFeedAllVersionsDeleteItems(container, 26, 28);

    let counter = 0;
    const changeFeedIteratorOptions2: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      priorityLevel: PriorityLevel.Low,
    };
    const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);

    while (iterator2.hasMoreResults) {
      const { result: items } = await iterator2.readNext();
      if (items.length === 0) break;

      counter += items.length;

      // Verify all items have metadata for all versions and deletes mode
      for (const item of items) {
        assert((item as any).metadata, "Items should have metadata in AllVersionsAndDeletes mode");
        assert((item as any).metadata.operationType, "Items should have operationType in metadata");
      }

      // Stop after processing some items
      if (counter >= 6) break;
    }

    assert(counter >= 6, "Should have processed at least 6 items in AllVersionsAndDeletes mode with Low priority");
  });

  afterAll(async () => {
    if (container) {
      await container.delete();
    }
  });
});
