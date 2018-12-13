import assert from "assert";
import { RequestOptions } from "../..";
import { Container, ContainerDefinition } from "../../client";
import { Helper } from "../../common";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

function hasDupeKey(items: any[]) {
  if (items && items.length === 0) {
    return false;
  }
  const key = items[0].key;
  let hasDupe = false;
  for (const item of items) {
    if (item.key !== key) {
      hasDupe = true;
      break;
    }
  }
  return hasDupe;
}

describe("Change Feed Iterator", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  describe("Non-partitioned", function() {
    // delete all databases and create sample database
    before(async function() {
      await removeAllDatabases();
    });

    (process.env.TESTS_MULTIREGION ? describe.skip : describe)("Should only find items after start time", function() {
      let container: Container;

      // create container and two items
      before(async function() {
        container = await getTestContainer("Newly updated items should be fetched incrementally");
      });

      after(async function() {
        await container.delete();
      });

      it("should fetch updated items only with start time", async function() {
        await container.items.create({ id: "item1" });
        const date = new Date();
        await Helper.sleep(3000);
        await container.items.create({ id: "item2" });
        const iterator = container.items.readChangeFeed({ startTime: date });

        const { result: itemsShouldBeEmpty, etag: initialEtag } = await iterator.executeNext();

        assert(initialEtag, "change feed response should have etag header");
        const etag = initialEtag;

        assert.equal(itemsShouldBeEmpty.length, 0, "Initial request should have empty results");

        const { result: items } = await iterator.executeNext();

        assert.equal(items.length, 1, "initial number of items should be equal 1");
        assert.equal(items[0].id, "item2", "should find the newest item, but not the old");
        const item = { id: "item2", name: "xyz" };

        const { body: replaced } = await container.item(item.id).replace(item);
        assert.deepEqual(replaced.name, "xyz", "replaced item should be valid");

        // Should continue from last etag
        const { result: itemsAfterUpdate } = await iterator.executeNext();
        assert.equal(itemsAfterUpdate.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsAfterUpdate[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsAfterUpdate[0].id, item.id, "fetched item should be valid");

        // Equivalent to execute next on other iterator from the previous etag
        const iteratorWithContinuation = container.items.readChangeFeed({ continuation: etag });
        const { result: itemsWithContinuation } = await iteratorWithContinuation.executeNext();
        assert.equal(itemsWithContinuation.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsWithContinuation[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsWithContinuation[0].id, item.id, "fetched item should be valid");
      });
    });

    describe("Newly updated items should be fetched incrementally", function() {
      let container: Container;

      // create container and two items
      before(async function() {
        container = await getTestContainer("Newly updated items should be fetched incrementally");
        await container.items.create({ id: "item1" });
        await container.items.create({ id: "item2" });
      });

      after(async function() {
        await container.delete();
      });

      it("should fetch updated items only", async function() {
        const iterator = container.items.readChangeFeed({ startFromBeginning: true });

        const { result: items, headers } = await iterator.executeNext();
        assert(headers.etag, "change feed response should have etag header");
        const etag = headers.etag;

        assert.equal(items.length, 2, "initial number of items should be equal 2");

        const item = items[1];
        item.name = "xyz";

        const { body: replaced } = await container.item(item.id).replace(item);
        assert.deepEqual(replaced.name, "xyz", "replaced item should be valid");

        // Should continue from last etag
        const { result: itemsAfterUpdate } = await iterator.executeNext();
        assert.equal(itemsAfterUpdate.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsAfterUpdate[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsAfterUpdate[0].id, item.id, "fetched item should be valid");

        // Equivalent to execute next on other iterator from the previous etag
        const iteratorWithContinuation = container.items.readChangeFeed({ continuation: etag });
        const { result: itemsWithContinuation } = await iteratorWithContinuation.executeNext();
        assert.equal(itemsWithContinuation.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsWithContinuation[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsWithContinuation[0].id, item.id, "fetched item should be valid");
      });
    });

    describe("Async iterator should find items", function() {
      let container: Container;

      // create container and two items
      before(async function() {
        container = await getTestContainer("Newly updated items should be fetched incrementally");
        await container.items.create({ id: "item1" });
        await container.items.create({ id: "item2" });
      });

      after(async function() {
        await container.delete();
      });

      it("should fetch updated items only", async function() {
        const iterator = container.items.readChangeFeed({ startFromBeginning: true });

        const items: any[] = [];
        for await (const page of iterator.getAsyncIterator()) {
          if (page.result.length === 0) {
            break;
          }
          items.push(...page.result);
        }

        assert.equal(items.length, 2, "initial number of items should be equal 2");

        const item = items[1];
        item.name = "xyz";

        const { body: replaced } = await container.item(item.id).replace(item);
        assert.deepEqual(replaced.name, "xyz", "replaced item should be valid");

        // Should continue from last etag
        const itemsAfterUpdate: any[] = [];
        for await (const page of iterator.getAsyncIterator()) {
          if (page.result.length === 0) {
            break;
          }
          itemsAfterUpdate.push(...page.result);
        }
        assert.equal(itemsAfterUpdate.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsAfterUpdate[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsAfterUpdate[0].id, item.id, "fetched item should be valid");
      });
    });

    describe("Newly created items should be fetched incrementally", async function() {
      let container: Container;

      // create container and one item
      before(async function() {
        container = await getTestContainer("Newly updated items should be fetched incrementally");
        await container.items.create({ id: "item1" });
      });

      after(async function() {
        await container.delete();
      });

      it("should fetch new items only", async function() {
        const iterator = container.items.readChangeFeed({});

        const { result: items, headers } = await iterator.executeNext();
        assert(headers.etag, "change feed response should have etag header");
        assert.equal(items.length, 0, "change feed response should have no items on it initially");

        const { body: itemThatWasCreated } = await container.items.create({
          id: "item2",
          prop: 1
        });

        const { result: itemsAfterCreate } = await iterator.executeNext();
        assert.equal(itemsAfterCreate.length, 1, "should have 1 item from create");
        const itemThatWasFound = itemsAfterCreate[0];

        assert.notDeepEqual(itemThatWasFound, itemThatWasCreated, "actual should not match with expected value.");
        delete itemThatWasFound._lsn;
        delete itemThatWasFound._metadata;
        assert.deepEqual(itemThatWasFound, itemThatWasCreated, "actual value doesn't match with expected value.");

        const { result: itemsShouldBeEmptyWithNoNewCreates } = await iterator.executeNext();
        assert.equal(itemsShouldBeEmptyWithNoNewCreates.length, 0, "should be nothing new");

        await container.items.create({ id: "item3" });
        await container.items.create({ id: "item4" });
        const { result: itemsShouldHave2NewItems } = await iterator.executeNext();
        assert.equal(itemsShouldHave2NewItems.length, 2, "there should be 2 results");
      });
    });
  });

  describe("Partition Key", function() {
    // delete all databases and create sample database
    before(async function() {
      await removeAllDatabases();
    });

    describe("Newly updated items should be fetched incrementally", function() {
      let container: Container;

      // create container and two items
      before(async function() {
        const containerDef: ContainerDefinition = {
          partitionKey: {
            kind: "Hash",
            paths: ["/key"]
          }
        };
        const throughput: RequestOptions = { offerThroughput: 25100 };
        container = await getTestContainer(
          "Newly updated items should be fetched incrementally",
          undefined,
          containerDef,
          throughput
        );
        await container.items.create({ id: "item1", key: "0" });
        await container.items.create({ id: "item2", key: "0" });
        await container.items.create({ id: "item1", key: "1" });
        await container.items.create({ id: "item2", key: "1" });
      });

      after(async function() {
        await container.delete();
      });

      it("should throw if used with no partition key or partition key range id", async function() {
        const iterator = container.items.readChangeFeed({ startFromBeginning: true });

        try {
          await iterator.executeNext();
        } catch (err) {
          assert.equal(
            err.message,
            "Container is partitioned, but no partition key or partition key range id was specified."
          );
          return;
        }
        assert.fail("Should have failed");
      });

      it("should fetch updated items only", async function() {
        const iterator = container.items.readChangeFeed("0", { startFromBeginning: true });

        const { result: items, headers } = await iterator.executeNext();
        assert(headers.etag, "change feed response should have etag header");

        assert.equal(items.length, 2, "initial number of items should be equal 2");

        const item = items[1];
        item.name = "xyz";

        const { body: replaced } = await container.item(item.id).replace(item);
        assert.deepEqual(replaced.name, "xyz", "replaced item should be valid");

        const { result: itemsAfterUpdate } = await iterator.executeNext();
        assert.equal(itemsAfterUpdate.length, 1, "initial number of items should be equal 1");
        assert.equal(itemsAfterUpdate[0].name, "xyz", "fetched item should have 'name: xyz'");
        assert.equal(itemsAfterUpdate[0].id, item.id, "fetched item should be valid");
      });
    });

    describe("Newly created items should be fetched incrementally", async function() {
      let container: Container;

      // create container and one item
      before(async function() {
        const containerDef: ContainerDefinition = {
          partitionKey: {
            kind: "Hash",
            paths: ["/key"]
          }
        };
        const throughput: RequestOptions = { offerThroughput: 25100 };
        container = await getTestContainer(
          "Newly updated items should be fetched incrementally",
          undefined,
          containerDef,
          throughput
        );
        await container.items.create({ id: "item1", key: "0" });
        await container.items.create({ id: "item1", key: "1" });
      });

      after(async function() {
        await container.delete();
      });

      it("should fetch new items only", async function() {
        const iterator = container.items.readChangeFeed("0", {});

        const { result: items, headers } = await iterator.executeNext();
        assert(headers.etag, "change feed response should have etag header");
        assert.equal(items.length, 0, "change feed response should have no items on it initially");

        const { body: itemThatWasCreated, headers: createHeaders } = await container.items.create({
          id: "item2",
          prop: 1,
          key: "0"
        });
        console.log(`createHeaders: ${createHeaders}`);

        const { result: itemsAfterCreate } = await iterator.executeNext();
        assert.equal(itemsAfterCreate.length, 1, "should have 1 item from create");
        const itemThatWasFound = itemsAfterCreate[0];

        assert.notDeepEqual(itemThatWasFound, itemThatWasCreated, "actual should not match with expected value.");
        delete itemThatWasFound._lsn;
        delete itemThatWasFound._metadata;
        assert.deepEqual(itemThatWasFound, itemThatWasCreated, "actual value doesn't match with expected value.");

        const { result: itemsShouldBeEmptyWithNoNewCreates } = await iterator.executeNext();
        assert.equal(itemsShouldBeEmptyWithNoNewCreates.length, 0, "should be nothing new");

        await container.items.create({ id: "item3", key: "0" });
        await container.items.create({ id: "item4", key: "0" });
        await container.items.create({ id: "item3", key: "1" });
        await container.items.create({ id: "item4", key: "1" });
        const { result: itemsShouldHave2NewItems } = await iterator.executeNext();
        assert.equal(itemsShouldHave2NewItems.length, 2, "there should be 2 results");
      });
    });
  });
});
