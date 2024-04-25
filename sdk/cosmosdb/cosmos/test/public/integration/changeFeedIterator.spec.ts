// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import {
  ChangeFeedIteratorOptions,
  ChangeFeedStartFrom,
  RequestOptions,
  ChangeFeedRetentionTimeSpan,
  ChangeFeedPolicy,
  ChangeFeedMode,
} from "../../../src";
import { Container, ContainerDefinition } from "../../../src";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents";
import {
  getTestContainer,
  removeAllDatabases,
  testForDiagnostics,
  changeFeedAllVersionsInsertItems,
  changeFeedAllVersionsUpsertItems,
  changeFeedAllVersionsDeleteItems,
} from "../common/TestHelpers";
import { FeedRangeInternal } from "../../../src/client/ChangeFeed/FeedRange";
import { getCurrentTimestampInMs } from "../../../src/utils/time";
import { StatusCodes } from "../../../src/common/statusCodes";

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
        throughput,
      );

      for (let i = 1; i < 11; i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("max item count cannot be < 1", async function () {
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
        throughput,
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

    it("startFromBeginning should fetch all results", async function () {
      const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
        changeFeedStartFrom: ChangeFeedStartFrom.Beginning(["0", 0]),
      };

      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

      while (iterator.hasMoreResults) {
        const { result: items } = await iterator.readNext();
        if (items.length === 0) break;
        assert.equal(items.length, 10, "initial number of items should be equal 10");
      }
    });

    it("Iterator should start from last continuation token and fetch remaining results", async function () {
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
        assert.equal(items.length, 4, "Remaining number of items should be equal 4");
      }
    });

    it("startFromNow should fetch all results from now on", async function () {
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

    it("check diagnostic for readNext operation.", async function () {
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
        throughput,
      );

      for (let i = 1; i < 6; i++) {
        await container.items.create({ name: "sample1", key: i });
        await container.items.create({ name: "sample2", key: i });
        await container.items.create({ name: "sample3", key: i });
        await container.items.create({ name: "sample4", key: i });
      }
    });

    it("ChangeFeedStartFrom.Beginning should fetch all results of all partitions", async function () {
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

    it("Iterator should start from last continuation token and fetch remaining results", async function () {
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

    it("partitions should be iterated breadth first", async function () {
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

    it("ChangeFeedStartFrom.Now() should fetch all results from now on for entire container", async function () {
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

describe("test changefeed for feed range", function () {
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
    const feedRanges = await container.getFeedRanges();

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(feedRanges[0]),
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    while (iterator.hasMoreResults) {
      const { result: items } = await iterator.readNext();
      if (items.length === 0) break;
      assert.equal(items.length, 10, "initial number of items should be equal 10");
    }
  });

  it("Iterator should start from last continuation token and fetch remaining results", async function () {
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
      assert.equal(items.length, 4, "Remaining number of items should be equal 4");
    }
  });

  it("ChangeFeedStartFrom.Now() should fetch all results from now on", async function () {
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

  it("fetch results for more than one physical partitions", async function () {
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

describe("test changefeed allVersionsAndDeletes mode for entire container", function () {
  let container: Container;
  before(async function () {
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
  it("startFromBeginning is not supported", async function () {
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

  it("validate changefeed results", async function () {
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
});

describe("test changefeed allVersionsAndDeletes mode for a feed range", function () {
  let container: Container;
  before(async function () {
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
  it("startFromBeginning is not supported", async function () {
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

  it("validate changefeed results", async function () {
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
});

describe("test changefeed allVersionsAndDeletes mode for a partition key", function () {
  let container: Container;
  before(async function () {
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
  it("startFromBeginning is not supported", async function () {
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

  it("validate changefeed results", async function () {
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
});
