// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { RequestOptions } from "../../../src";
import { Container, ContainerDefinition } from "../../../src";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";
import { IEpkRange } from "../../../src/client/ChangeFeed/IEpkRange";

describe("Change Feed Iterator", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  // delete all databases and create sample database
  before(async function () {
    await removeAllDatabases();
  });

  describe("test changefeed iterator options", function () {
    let container: Container;

    before(async function () {
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
        throughput
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("should throw if more than one type of start options are passed.", async function () {
      try {
        const iterator = await container.items.getChangeFeedIterator({
          partitionKey: ["0", 0],
          startFromNow: true,
          startFromBeginning: true,
        });
        while (iterator.hasMoreResults) {
          await iterator.ReadNextAsync();
        }
      } catch (err: any) {
        assert.equal(
          err.message,
          "Only one of startFromBeginning, startFromNow, startTime, continuationToken can be specified"
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("only one of partition key or epkRange can be passed in options", async function () {
      const { resources } = await container.readPartitionKeyRanges().fetchAll();
      try {
        const iterator = await container.items.getChangeFeedIterator({
          epkRange: resources[0],
          partitionKey: ["0", 0],
          startFromBeginning: true,
        });
        while (iterator.hasMoreResults) {
          await iterator.ReadNextAsync();
        }
      } catch (err: any) {
        assert.strictEqual(
          err.message,
          "PartitionKey and EpkRange cannot be specified at the same time"
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("max item count cannot be < 1", async function () {
      try {
        const iterator = await container.items.getChangeFeedIterator({
          partitionKey: ["0", 0],
          startFromBeginning: true,
          maxItemCount: 0,
        });
        while (iterator.hasMoreResults) {
          await iterator.ReadNextAsync();
        }
      } catch (err: any) {
        assert.strictEqual(err.message, "maxItemCount must be a positive number");
        return;
      }
      assert.fail("Should have failed");
    });
  });

  describe("test changefeed for one partition key", function () {
    let container: Container;

    before(async function () {
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
        throughput
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("check if maxItemCount property is being followed", async function () {
      const maxItemCount = 1;
      const iterator = await container.items.getChangeFeedIterator({
        partitionKey: ["0", 0],
        startFromBeginning: true,
        maxItemCount: maxItemCount,
      });

      while (iterator.hasMoreResults) {
        const response = await iterator.ReadNextAsync();
        const { result: items } = response;
        if (items.length === 0) {
          break;
        }
        assert.equal(items.length, maxItemCount, "No. of items should be equal to maxItemCount");
      }
    });

    it("startFromBeginning should fetch all results", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        partitionKey: ["0", 0],
        startFromBeginning: true,
      });

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        if (items.length === 0) break;
        assert.equal(items.length, 10, "initial number of items should be equal 10");
      }
    });

    it("Iterator should start from last continuation token and fetch remaining results", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        partitionKey: ["0", 0],
        startFromBeginning: true,
        maxItemCount: 1,
      });

      let count = 0;
      let continuationToken = undefined;

      while (iterator.hasMoreResults && count < 6) {
        const response = await iterator.ReadNextAsync();
        count += response.result.length;
        continuationToken = response.continuationToken;
      }
      const iterator2 = await container.items.getChangeFeedIterator({
        partitionKey: ["0", 0],
        continuationToken: continuationToken,
      });

      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.ReadNextAsync();
        if (items.length === 0) break;
        assert.equal(items.length, 4, "Remaining number of items should be equal 4");
      }
    });

    it("startFromNow should fetch all results from now on", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        partitionKey: ["0", 0],
        startFromNow: true,
        maxItemCount: 10,
      });
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
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
        const { result: items } = await iterator.ReadNextAsync();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
      }
    });
  });

  describe("test changefeed for entire container", function () {
    let container: Container;
    before(async function () {
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
        throughput
      );

      for (let i = 1; i < 6; i++) {
        await container.items.create({ name: "sample1", key: i });
        await container.items.create({ name: "sample2", key: i });
        await container.items.create({ name: "sample3", key: i });
        await container.items.create({ name: "sample4", key: i });
      }
    });

    it("startFromBeginning should fetch all results of all partitions", async function () {
      const iterator = await container.items.getChangeFeedIterator({ startFromBeginning: true });
      let counter = 0;
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        counter += items.length;
        if (items.length === 0) break;
      }
      assert.equal(counter, 20, "20 items should be fetched");
    });

    it("Iterator should start from last continuation token and fetch remaining results", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        startFromBeginning: true,
        maxItemCount: 1,
      });

      let counter = 0;
      let continuationToken = undefined;

      while (counter < 10) {
        const response = await iterator.ReadNextAsync();
        counter += response.result.length;
        continuationToken = response.continuationToken;
      }
      const iterator2 = await container.items.getChangeFeedIterator({
        continuationToken: continuationToken,
        maxItemCount: 1,
      });
      let counter2 = 0;
      while (iterator2.hasMoreResults) {
        const { result: items } = await iterator2.ReadNextAsync();
        counter2 += items.length;
        if (items.length === 0) break;
      }
      assert.equal(counter2, 10, "Remaining number of items should be equal to 10");
    });

    it("partitions should be iterated breadth first", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        startFromBeginning: true,
        maxItemCount: 1,
      });

      let counter = 0;
      let partitionKey1: string | undefined = undefined;
      let partitionKey2: string | undefined = undefined;
      while (counter < 2) {
        const result = await iterator.ReadNextAsync();
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

    it("startFromNow should fetch all results from now on for entire container", async function () {
      const iterator = await container.items.getChangeFeedIterator({
        startFromNow: true,
        maxItemCount: 10,
      });
      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
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
        const { result: items } = await iterator.ReadNextAsync();
        if (items.length === 0) break;
        assert.notEqual(items.length, 0, "New changes should be fetched");
      }
    });
  });
});

describe("test changefeed for epk range", function () {
  let container: Container;
  before(async function () {
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
  it("startFromBeginning should fetch all results", async function () {
    const { resources } = await container.readPartitionKeyRanges().fetchAll();
    const iterator = await container.items.getChangeFeedIterator({
      epkRange: resources[0],
      startFromBeginning: true,
    });

    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.ReadNextAsync();
      if (items.length === 0) break;
      assert.equal(items.length, 10, "initial number of items should be equal 10");
    }
  });

  it("Iterator should start from last continuation token and fetch remaining results", async function () {
    const { resources } = await container.readPartitionKeyRanges().fetchAll();
    const iterator = await container.items.getChangeFeedIterator({
      epkRange: resources[0],
      startFromBeginning: true,
      maxItemCount: 1,
    });

    let counter = 0;
    let continuationToken = undefined;

    while (counter < 6) {
      const response = await iterator.ReadNextAsync();
      counter += response.result.length;
      continuationToken = response.continuationToken;
    }
    const iterator2 = await container.items.getChangeFeedIterator({
      epkRange: resources[0],
      continuationToken: continuationToken,
    });

    while (iterator2.hasMoreResults) {
      const { result: items } = await iterator2.ReadNextAsync();
      if (items.length === 0) break;
      assert.equal(items.length, 4, "Remaining number of items should be equal 4");
    }
  });

  it("startFromNow should fetch all results from now on", async function () {
    const { resources } = await container.readPartitionKeyRanges().fetchAll();
    const iterator = await container.items.getChangeFeedIterator({
      epkRange: resources[0],
      startFromNow: true,
      maxItemCount: 10,
    });
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.ReadNextAsync();
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
      const { result: items } = await iterator.ReadNextAsync();
      if (items.length === 0) break;
      assert.notEqual(items.length, 0, "New changes should be fetched");
    }
  });

  it("fetch results for more than one physical partitions", async function () {
    const epkRange: IEpkRange = {
      minInclusive: "",
      maxExclusive: "05C1DFFFFFFFF8",
    };
    const iterator = await container.items.getChangeFeedIterator({
      epkRange: epkRange,
      startFromBeginning: true,
      maxItemCount: 10,
    });
    let counter = 0;
    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.ReadNextAsync();
      counter += items.length;
      if (items.length === 0) {
        break;
      }
    }
    assert.equal(counter, 40, "40 items should be fetched");
  });
});
