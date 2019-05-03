import assert from "assert";
import { Constants, CosmosClient, DocumentBase } from "../..";
import { Container } from "../../client";
import { endpoint, masterKey } from "../common/_testConfig";
import { bulkInsertItems, getTestContainer, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

// TODO: This is required for Node 6 and above, so just putting it in here.
// Might want to decide on only supporting async iterators once Node supports them officially.
if (!Symbol || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  before(async function() {
    await removeAllDatabases();
  });

  describe("Validate Queries CRUD", function() {
    const queriesCRUDTest = async function() {
      try {
        // create a database
        const database = await getTestDatabase("query test database");
        // query databases
        const querySpec0 = {
          query: "SELECT * FROM root r WHERE r.id=@id",
          parameters: [
            {
              name: "@id",
              value: database.id
            }
          ]
        };
        const { result: results } = await client.databases.query(querySpec0).toArray();
        assert(results.length > 0, "number of results for the query should be > 0");
        const querySpec1 = {
          query: "SELECT * FROM root r WHERE r.id='" + database.id + "'"
        };
        const { result: results2 } = await client.databases.query(querySpec1).toArray();
        assert(results2.length > 0, "number of results for the query should be > 0");
        const querySpec2 = "SELECT * FROM root r WHERE r.id='" + database.id + "'";
        const { result: results3 } = await client.databases.query(querySpec2).toArray();
        assert(results3.length > 0, "number of results for the query should be > 0");
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should do queries CRUD operations successfully name based", async function() {
      try {
        await queriesCRUDTest();
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Validate QueryIterator Functionality For Multiple Partition container", function() {
    const documentDefinitions = [
      { id: "document1" },
      { id: "document2", key: null, prop: 1 },
      { id: "document3", key: false, prop: 1 },
      { id: "document4", key: true, prop: 1 },
      { id: "document5", key: 1, prop: 1 },
      { id: "document6", key: "A", prop: 1 }
    ];

    let container: Container;

    // creates a new database, creates a new collecton, bulk inserts documents to the container
    beforeEach(async function() {
      const partitionKey = "key";
      const containerDefinition = {
        id: "coll1",
        partitionKey: {
          paths: ["/" + partitionKey],
          kind: DocumentBase.PartitionKind.Hash
        }
      };

      const containerOptions = { offerThroughput: 12000 };
      container = await getTestContainer("query CRUD database 中文", client, containerDefinition, containerOptions);
      await bulkInsertItems(container, documentDefinitions);
    });

    it("nativeApi validate QueryIterator nextItem on Multiple Partition Colleciton", async function() {
      // obtain an instance of queryIterator
      const queryIterator = container.items.readAll();
      let cnt = 0;
      while (queryIterator.hasMoreResults()) {
        const { result } = await queryIterator.nextItem();
        if (result === undefined) {
          break;
        }
        cnt++;
      }
      assert.equal(cnt, documentDefinitions.length);
    });
  });

  describe("Validate QueryIterator Functionality", function() {
    this.timeout(process.env.MOCHA_TIMEOUT || 30000);
    let resources: { container: Container; doc1: any; doc2: any; doc3: any };
    beforeEach(async function() {
      const container = await getTestContainer("Validate QueryIterator Functionality", client);
      const { body: doc1 } = await container.items.create({ id: "doc1", prop1: "value1" });
      const { body: doc2 } = await container.items.create({ id: "doc2", prop1: "value2" });
      const { body: doc3 } = await container.items.create({ id: "doc3", prop1: "value3" });
      resources = { container, doc1, doc2, doc3 };
    });

    const queryIteratorToArrayTest = async function() {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      const { result: docs } = await queryIterator.toArray();
      assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
      assert.equal(docs[0].id, resources.doc1.id);
      assert.equal(docs[1].id, resources.doc2.id);
      assert.equal(docs[2].id, resources.doc3.id);
    };

    const queryIteratorAsyncIteratorTest = async function() {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      for await (const { result: doc } of queryIterator.getAsyncIterator()) {
        counter++;
        if (counter === 1) {
          assert.equal(doc.id, resources.doc1.id, "first document should be doc1");
        } else if (counter === 2) {
          assert.equal(doc.id, resources.doc2.id, "second document should be doc2");
        } else if (counter === 3) {
          assert.equal(doc.id, resources.doc3.id, "third document should be doc3");
        }
      }
      assert(counter === 3, "iterator should have run 3 times");
    };

    const queryIteratorForEachTest = async function() {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      await queryIterator.forEach((item, headers, index) => {
        counter++;
        if (index === 0) {
          assert.equal(item.id, resources.doc1.id, "first document should be doc1");
        } else if (index === 1) {
          assert.equal(item.id, resources.doc2.id, "second document should be doc2");
        } else if (index === 2) {
          assert.equal(item.id, resources.doc3.id, "third document should be doc3");
        }
      });
      assert(counter === 3, "iterator should have run 3 times");
    };

    const queryIteratorNextAndMoreTest = async function() {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      assert.equal(queryIterator.hasMoreResults(), true);
      const { result: doc2 } = await queryIterator.nextItem();
      assert.equal(doc2.id, resources.doc1.id, "call queryIterator.nextItem after reset should return first document");
      const { result: doc1 } = await queryIterator.current();
      assert.equal(doc1.id, resources.doc1.id, "call queryIterator.current after reset should return first document");
      assert.equal(queryIterator.hasMoreResults(), true);
      const { result: doc4 } = await queryIterator.nextItem();
      assert.equal(doc4.id, resources.doc2.id, "call queryIterator.nextItem again should return second document");
      const { result: doc3 } = await queryIterator.current();
      assert.equal(doc3.id, resources.doc2.id, "call queryIterator.current should return second document");
      assert.equal(queryIterator.hasMoreResults(), true);
      const { result: doc6 } = await queryIterator.nextItem();
      assert.equal(doc6.id, resources.doc3.id, "call queryIterator.nextItem again should return third document");
      const { result: doc5 } = await queryIterator.current();
      assert.equal(doc5.id, resources.doc3.id, "call queryIterator.current should return third document");
      const { result: doc7 } = await queryIterator.nextItem();
      assert.equal(doc7, undefined, "queryIterator should return undefined if there is no elements");
    };

    const queryIteratorExecuteNextTest = async function() {
      let queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      const { result: docs, headers } = await queryIterator.executeNext();

      assert(headers !== undefined, "executeNext should pass headers as the third parameter to the callback");
      assert(headers[Constants.HttpHeaders.RequestCharge] > 0, "RequestCharge has to be non-zero");
      assert.equal(docs.length, 2, "first batch size should be 2");
      assert.equal(docs[0].id, resources.doc1.id, "first batch first document should be doc1");
      assert.equal(docs[1].id, resources.doc2.id, "batch first second document should be doc2");
      const { result: docs2 } = await queryIterator.executeNext();
      assert.equal(docs2.length, 1, "second batch size is unexpected");
      assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

      // validate Iterator.executeNext with continuation token
      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuation: headers[Constants.HttpHeaders.Continuation] as string
      });
      const { result: docsWithContinuation, headers: headersWithContinuation } = await queryIterator.executeNext();
      assert(
        headersWithContinuation !== undefined,
        "executeNext should pass headers as the third parameter to the callback"
      );
      assert(headersWithContinuation[Constants.HttpHeaders.RequestCharge] > 0, "RequestCharge has to be non-zero");
      assert.equal(docsWithContinuation.length, 1, "second batch size with continuation token is unexpected");
      assert.equal(docsWithContinuation[0].id, resources.doc3.id, "second batch element should be doc3");
    };

    it("nativeApi validate QueryIterator iterator toArray name based", async function() {
      await queryIteratorToArrayTest();
    });

    it("validate queryIterator asyncIterator", async function() {
      await queryIteratorAsyncIteratorTest();
    });

    it("validate queryIterator forEach", async function() {
      await queryIteratorForEachTest();
    });

    it("nativeApi validate queryIterator nextItem and hasMoreResults name based", async function() {
      await queryIteratorNextAndMoreTest();
    });

    it("nativeApi validate queryIterator iterator executeNext name based", async function() {
      await queryIteratorExecuteNextTest();
    });
  });
});
