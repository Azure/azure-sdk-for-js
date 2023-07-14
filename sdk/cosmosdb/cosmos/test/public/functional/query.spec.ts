// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { ContainerDefinition, CosmosClient } from "../../../src";
import { Container } from "../../../src/";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

// TODO: This is required for Node 6 and above, so just putting it in here.
// Might want to decide on only supporting async iterators once Node supports them officially.
if (!Symbol || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

describe("Queries", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  before(async function () {
    await removeAllDatabases();
  });

  describe("Query CRUD", function () {
    it("nativeApi Should do queries CRUD operations successfully name based", async function () {
      // create a database
      const database = await getTestDatabase("query test database");
      // query databases
      const querySpec0 = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: database.id,
          },
        ],
      };
      const { resources: results } = await client.databases.query(querySpec0).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");
      const querySpec1 = {
        query: "SELECT * FROM root r WHERE r.id='" + database.id + "'",
      };
      const { resources: results2 } = await client.databases.query(querySpec1).fetchAll();
      assert(results2.length > 0, "number of results for the query should be > 0");
      const querySpec2 = "SELECT * FROM root r WHERE r.id='" + database.id + "'";
      const { resources: results3 } = await client.databases.query(querySpec2).fetchAll();
      assert(results3.length > 0, "number of results for the query should be > 0");
    });
  });

  describe("QueryIterator", function (this: Suite) {
    this.timeout(process.env.MOCHA_TIMEOUT || 30000);
    let resources: { container: Container; doc1: any; doc2: any; doc3: any };

    before(async function () {
      const container = await getTestContainer("Validate QueryIterator Functionality", client);
      const { resource: doc1 } = await container.items.create({ id: "doc1", prop1: "value1" });
      const { resource: doc2 } = await container.items.create({ id: "doc2", prop1: "value2" });
      const { resource: doc3 } = await container.items.create({ id: "doc3", prop1: "value3" });
      resources = { container, doc1, doc2, doc3 };
    });

    it("fetchAll", async function () {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      const { resources: docs } = await queryIterator.fetchAll();
      assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
      assert.equal(docs[0].id, resources.doc1.id);
      assert.equal(docs[1].id, resources.doc2.id);
      assert.equal(docs[2].id, resources.doc3.id);
    });

    it("asyncIterator", async function () {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
        }
        counter++;
      }
      assert(counter === 2, "iterator should have run 3 times");
    });

    it("executeNext", async function () {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);
      assert(firstResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(firstResponse.resources.length, 2, "first batch size should be 2");
      assert.equal(
        firstResponse.resources[0].id,
        resources.doc1.id,
        "first batch first document should be doc1"
      );
      assert.equal(
        firstResponse.resources[1].id,
        resources.doc2.id,
        "batch first second document should be doc2"
      );
      const { resources: docs2 } = await queryIterator.fetchNext();
      assert.equal(docs2.length, 1, "second batch size is unexpected");
      assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

      // validate Iterator.executeNext with continuation token
      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: firstResponse.continuationToken,
      });
      const secondResponse = await queryIterator.fetchNext();
      // console.log(secondResponse);
      assert(secondResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(
        secondResponse.resources.length,
        1,
        "second batch size with continuation token is unexpected"
      );
      assert.equal(
        secondResponse.resources[0].id,
        resources.doc3.id,
        "second batch element should be doc3"
      );
    });
    it("fails with invalid continuation token", async function () {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);

      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: "junk",
      });

      try {
        await queryIterator.fetchNext();
      } catch (e: any) {
        assert(e.message.includes("Invalid Continuation Token"));
      }
    });

    describe("SUM query iterator", function (this: Suite) {
      this.timeout(process.env.MOCHA_TIMEOUT || 30000);

      it("returns undefined sum with null value in aggregator", async function () {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          }
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: null });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });
      it("returns undefined sum with false value in aggregator", async function () {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          }
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: false });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });
      it("returns undefined sum with empty array value in aggregator", async function () {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          }
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: [] });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });
      it("returns a valid sum with undefined value in aggregator", async function () {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          }
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: undefined });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 1);
        assert.equal(sum[0], 66);
      });
    });
  });

  describe("QueryIterator: Hierarchical partitions", function (this: Suite) {
    this.timeout(process.env.MOCHA_TIMEOUT || 30000);
    let resources: { container: Container; doc1: any; doc2: any; doc3: any; doc4: any };

    before(async function () {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/prop1", "/prop2"],
          version: PartitionKeyDefinitionVersion.V2,
          kind: PartitionKeyKind.MultiHash,
        },
      };
      const container = await getTestContainer(
        "Validate QueryIterator Functionality",
        client,
        containerDef
      );
      const { resource: doc1 } = await container.items.create({ id: "doc1", prop1: "a", prop2: 1 });
      const { resource: doc2 } = await container.items.create({ id: "doc2", prop1: "a", prop2: 1 });
      const { resource: doc3 } = await container.items.create({ id: "doc3", prop1: "a", prop2: 1 });
      const { resource: doc4 } = await container.items.create({ id: "doc4", prop1: "b", prop2: 2 });

      resources = { container, doc1, doc2, doc3, doc4 };
    });

    it("fetchAll", async function () {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      const { resources: docs } = await queryIterator.fetchAll();
      assert.equal(docs.length, 4, "queryIterator should return all documents using continuation");
      assert.equal(docs[0].id, resources.doc1.id);
      assert.equal(docs[1].id, resources.doc2.id);
      assert.equal(docs[2].id, resources.doc3.id);
      assert.equal(docs[3].id, resources.doc4.id);
    });

    it("asyncIterator", async function () {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else if (counter === 1) {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
          assert.equal(docs[1].id, resources.doc4.id, "fourth document should be doc4");
        }
        counter++;
      }
      assert.strictEqual(counter, 3, "iterator should have run 4 times");
    });

    it("asyncIterator - with partitionKey parameter", async function () {
      const queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
        }
        counter++;
      }
      assert.strictEqual(counter, 2, "iterator should have run 3 times");
    });

    it("executeNext", async function () {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);
      assert(firstResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(firstResponse.resources.length, 2, "first batch size should be 2");
      assert.equal(
        firstResponse.resources[0].id,
        resources.doc1.id,
        "first batch first document should be doc1"
      );
      assert.equal(
        firstResponse.resources[1].id,
        resources.doc2.id,
        "batch first second document should be doc2"
      );
      const { resources: docs2 } = await queryIterator.fetchNext();
      assert.equal(docs2.length, 1, "second batch size is unexpected");
      assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

      // validate Iterator.executeNext with continuation token
      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: firstResponse.continuationToken,
        partitionKey: ["a", 1],
      });
      const secondResponse = await queryIterator.fetchNext();
      // console.log(secondResponse);
      assert(secondResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(
        secondResponse.resources.length,
        1,
        "second batch size with continuation token is unexpected"
      );
      assert.equal(
        secondResponse.resources[0].id,
        resources.doc3.id,
        "second batch element should be doc3"
      );
    });
    it("fails with invalid continuation token", async function () {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);

      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: "junk",
      });

      try {
        await queryIterator.fetchNext();
      } catch (e: any) {
        assert(e.message.includes("Invalid Continuation Token"));
      }
    });

    describe("SUM query iterator", function (this: Suite) {
      this.timeout(process.env.MOCHA_TIMEOUT || 30000);

      it("return sum for given partition key", async function () {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: {
              paths: ["/city", "/address/zip"],
              version: PartitionKeyDefinitionVersion.V2,
              kind: PartitionKeyKind.MultiHash,
            },
          }
        );
        await container.items.create({
          id: "5eded6f8asdfasdfasdfaa21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5eded6f8a21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5edasdfasdfed6f8a21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5eded6f8a2dd1be0109ae34e29",
          age: 22,
          city: "b",
          address: { zip: 2 },
        });
        await container.items.create({
          id: "AndersenFamily",
          age: 11,
          city: "b",
          address: { zip: 2 },
        });
        await container.items.create({
          id: "5esdfeded6f8a2dd1be0109ae34e29",
          age: 113,
        });
        await container.items.create({
          id: "5edsfesdfeded6f8a2dd1be0109ae34e29",
          age: 115,
          address: { zip: 2 },
        });
        await container.items.create({ id: "1", age: 100, city: "b", address: { zip: 2 } });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: ["a", 1],
        });
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 1);
        assert.strictEqual(sum[0], 66, "Sum should be 66");

        const queryIterator2 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: ["b", 2],
        });
        const { resources: sum2 } = await queryIterator2.fetchAll();
        assert.equal(sum2.length, 1);
        assert.strictEqual(sum2[0], 133, "Sum should be 133");

        const queryIterator3 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: [undefined, undefined],
        });
        const { resources: sum3 } = await queryIterator3.fetchAll();
        assert.equal(sum3.length, 1);
        assert.strictEqual(sum3[0], 113, "Sum should be 113");

        const queryIterator4 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: [undefined, 2],
        });
        const { resources: sum4 } = await queryIterator4.fetchAll();
        assert.equal(sum4.length, 1);
        assert.strictEqual(sum4[0], 115, "Sum should be 115");
      });
    });
  });
});
