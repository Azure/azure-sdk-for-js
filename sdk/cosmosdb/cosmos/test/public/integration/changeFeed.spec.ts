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

  describe("Newly updated items should be fetched incrementally", function () {
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
      await container.items.create({ id: "item1", key1: "0", key2: 0 });
      await container.items.create({ id: "item2", key1: "0", key2: 0 });
      await container.items.create({ id: "item1", key1: "1", key2: 1 });
      await container.items.create({ id: "item2", key1: "1", key2: 1 });
    });

    it("should throw if used with no partition key or partition key range id", async function () {
      const iterator = container.items.changeFeed({ startFromBeginning: true });

      try {
        await iterator.fetchNext();
      } catch (err: any) {
        assert.equal(
          err.message,
          "Container is partitioned, but no partition key or partition key range id was specified."
        );
        return;
      }
      assert.fail("Should have failed");
    });

    it("should fetch updated items only", async function () {
      const iterator = container.items.changeFeed(["0", 0], { startFromBeginning: true });

      const { result: items, headers } = await iterator.fetchNext();
      assert(headers.etag, "change feed response should have etag header");

      assert.equal(items.length, 2, "initial number of items should be equal 2");

      const item = items[1];
      item.name = "xyz";

      const { resource: replaced } = await container.items.upsert(item);
      assert.deepEqual(replaced.name, "xyz", "replaced item should be valid");

      const { result: itemsAfterUpdate } = await iterator.fetchNext();
      assert.equal(itemsAfterUpdate.length, 1, "initial number of items should be equal 1");
      assert.equal(itemsAfterUpdate[0].name, "xyz", "fetched item should have 'name: xyz'");
      assert.equal(itemsAfterUpdate[0].id, item.id, "fetched item should be valid");

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
