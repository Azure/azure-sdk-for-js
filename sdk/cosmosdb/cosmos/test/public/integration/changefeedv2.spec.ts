// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { RequestOptions } from "../../../src";
import { Container, ContainerDefinition } from "../../../src";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("Change Feed Iterator", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  // delete all databases and create sample database
  before(async function () {
    await removeAllDatabases();
  });

  describe("test changefeed iterator options", function () {
    let container: Container;

    // create container and two items
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
        "Newly updated items should be fetched incrementally",
        undefined,
        containerDef,
        throughput
      );

      for(let i=1;i<11;i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 1 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 0 });
        await container.items.create({ id: `item${i}`, key1: `1`, key2: 1 });
      }
    });

    it("should throw if more than one type of start options are passed.", async function () {
      const iterator = await container.items.getChangeFeedIterator({ startFromNow: true, startFromBeginning: true });

      try {
        await iterator.ReadNextAsync();
      } catch (err: any) {
        assert.strictEqual(
          err.message,
          "Only one of startFromBeginning, startFromNow, startTime, continuationToken can be specified"
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("only one of partition key or epkRange can be passed in options", async function () {
       const { resources } = await container.readPartitionKeyRanges().fetchAll();
      const iterator = await container.items.getChangeFeedIterator({ epkRange: resources[0], partitionKey: ['0',0], startFromBeginning: true });

      try {
        await iterator.ReadNextAsync();
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
      const iterator = await container.items.getChangeFeedIterator({ partitionKey: ['0',0], startFromBeginning: true, maxItemCount: 0 });

      try {
        await iterator.ReadNextAsync();
      } catch (err: any) {
        assert.strictEqual(
          err.message,
          "maxItemCount must be a positive number"
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("max item count cannot be < 1", async function () {
      const iterator = await container.items.getChangeFeedIterator({ partitionKey: ['0',0], startFromBeginning: true, maxItemCount: 0 });

      try {
        await iterator.ReadNextAsync();
      } catch (err: any) {
        assert.strictEqual(
          err.message,
          "maxItemCount must be a positive number"
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("maxItemCount property is being followed", async function () {
      const iterator = await container.items.getChangeFeedIterator({ partitionKey: ['0',0], startFromBeginning: true, maxItemCount: 1 });

      while(iterator.hasMoreResults) {
        const response = await iterator.ReadNextAsync();
        if(response.statusCode === 304)  
        break;
        const { result: items } = response;

        assert.equal(items.length, 1, "No. of items should be equal to maxItemCount");
      }
    });

    it("startFromBeginning should fetch all results", async function () {
      const iterator = await container.items.getChangeFeedIterator({partitionKey:["0", 0], startFromBeginning: true });

      while(iterator.hasMoreResults) {
        const { result: items, headers } = await iterator.ReadNextAsync();
        if(items.length === 0) 
        break;

        assert(headers.getContinuationToken(), "change feed response should have continuation token header");
        assert.equal(items.length, 10, "initial number of items should be equal 10");
      }
    });

    it("Iterator should start from last continuation token and fetch remaining results", async function () {
      const iterator = await container.items.getChangeFeedIterator({partitionKey:["0", 0], startFromBeginning: true, maxItemCount: 1 });

      let count = 0; 
      let continuationToken = undefined;

      while(iterator.hasMoreResults && count<7) {
        const { result, headers } = await iterator.ReadNextAsync();
        count += result.length;
        continuationToken = headers.getContinuationToken();
      }

      const iterator2 = await container.items.getChangeFeedIterator({partitionKey:["0", 0], continuationToken: continuationToken });

      while(iterator2.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        if(items.length === 0)
        break;
        assert.equal(items.length, 4, "Remaining number of items should be equal 4");
      }
    });

    it("startFromNow should fetch all results from now on", async function () {
      const iterator = await container.items.getChangeFeedIterator({partitionKey:["0", 0], startFromNow: true, maxItemCount: 10 });
      while(iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if(items.length === 0) {
          break;
        }
      }
      // add 10 new items to this partition key
      for(let i=11;i<21;i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 })
      }
      // again start the iterator
      while(iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        if(items.length === 0)
        break;
        assert.equal(items.length, 10, "New changes should be fetched");
      }
    });

    it("startFromNow should fetch all results from now on", async function () {
      const iterator = await container.items.getChangeFeedIterator({partitionKey:["0", 0], startFromNow: true, maxItemCount: 10 });
      while(iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        assert.equal(items.length, 0, "Initially no new changes");
        // initial result will be 0 as no new changes since creation of iterator
        if(items.length === 0) {
          break;
        }
      }
      // add 10 new items to this partition key
      for(let i=11;i<21;i++) {
        await container.items.create({ id: `item${i}`, key1: `0`, key2: 0 })
      }
      // again start the iterator
      while(iterator.hasMoreResults) {
        const { result: items } = await iterator.ReadNextAsync();
        if(items.length === 0)
        break;
        assert.equal(items.length, 10, "New changes should be fetched");
      }
    });
  });

  

  describe("Newly created items should be fetched incrementally", async function () {
    let container: Container;

    // create container and one item
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
        "Newly updated items should be fetched incrementally",
        undefined,
        containerDef,
        throughput
      );
      await container.items.create({ id: "item1", key1: "0", key2: 0 });
      await container.items.create({ id: "item1", key1: "1", key2: 1 });
    });

    after(async function () {
      await container.delete();
    });

    it("should fetch new items only", async function () {
      const iterator = container.items.changeFeed(["0", 0]);

      const { result: items, headers } = await iterator.fetchNext();
      assert(headers.etag, "change feed response should have etag header");
      assert.equal(items.length, 0, "change feed response should have no items on it initially");

      const { resource: itemThatWasCreated } = await container.items.create({
        id: "item2",
        prop: 1,
        key1: "0",
        key2: 0,
      });

      const { result: itemsAfterCreate } = await iterator.fetchNext();
      assert.equal(itemsAfterCreate.length, 1, "should have 1 item from create");
      const itemThatWasFound = itemsAfterCreate[0];

      assert.notDeepEqual(
        itemThatWasFound,
        itemThatWasCreated,
        "actual should not match with expected value."
      );
      delete itemThatWasFound._lsn;
      delete itemThatWasFound._metadata;
      assert.deepEqual(
        itemThatWasFound,
        itemThatWasCreated,
        "actual value doesn't match with expected value."
      );

      const { result: itemsShouldBeEmptyWithNoNewCreates } = await iterator.fetchNext();
      assert.equal(itemsShouldBeEmptyWithNoNewCreates.length, 0, "should be nothing new");

      await container.items.create({ id: "item3", key1: "0", key2: 0 });
      await container.items.create({ id: "item4", key1: "0", key2: 0 });
      await container.items.create({ id: "item3", key1: "1", key2: 1 });
      await container.items.create({ id: "item4", key1: "1", key2: 1 });
      const { result: itemsShouldHave2NewItems } = await iterator.fetchNext();
      assert.equal(itemsShouldHave2NewItems.length, 2, "there should be 2 results");
      const { result: shouldHaveNoItems } = await iterator.fetchNext();
      assert.equal(shouldHaveNoItems.length, 0, "there should be 0 results");
      const hasMoreResults = iterator.hasMoreResults;
      assert.equal(
        hasMoreResults,
        false,
        "hasMoreResults should be false when we read the whole page"
      );
    });
  });
});
