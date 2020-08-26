// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Container } from "../../src";
import { ItemDefinition } from "../../src/client";
import {
  bulkDeleteItems,
  bulkInsertItems,
  bulkQueryItemsWithPartitionKey,
  bulkReadItems,
  bulkReplaceItems,
  createOrUpsertItem,
  getTestDatabase,
  removeAllDatabases,
  replaceOrUpsertItem,
  addEntropy,
  getTestContainer
} from "../common/TestHelpers";
import { BulkOperationType } from "../../src/utils/batch";

/**
 * @ignore
 * @hidden
 */
interface TestItem {
  id?: string;
  name?: string;
  foo?: string;
  key?: string;
  replace?: string;
}

describe("Item CRUD", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });
  const documentCRUDTest = async function(isUpsertTest: boolean) {
    // create database
    const database = await getTestDatabase("sample 中文 database");
    // create container
    const { resource: containerdef } = await database.containers.create({ id: "sample container" });
    const container: Container = database.container(containerdef.id);

    // read items
    const { resources: items } = await container.items.readAll().fetchAll();
    assert(Array.isArray(items), "Value should be an array");

    // create an item
    const beforeCreateDocumentsCount = items.length;
    const itemDefinition: TestItem = {
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property"
    };
    try {
      await createOrUpsertItem(
        container,
        itemDefinition,
        { disableAutomaticIdGeneration: true },
        isUpsertTest
      );
      assert.fail("id generation disabled must throw with invalid id");
    } catch (err) {
      assert(
        err !== undefined,
        "should throw an error because automatic id generation is disabled"
      );
    }
    const { resource: document } = await createOrUpsertItem(
      container,
      itemDefinition,
      undefined,
      isUpsertTest
    );
    assert.equal(document.name, itemDefinition.name);
    assert(document.id !== undefined);
    // read documents after creation
    const { resources: documents2 } = await container.items.readAll().fetchAll();
    assert.equal(
      documents2.length,
      beforeCreateDocumentsCount + 1,
      "create should increase the number of documents"
    );
    // query documents
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: document.id
        }
      ]
    };
    const { resources: results } = await container.items.query(querySpec).fetchAll();
    assert(results.length > 0, "number of results for the query should be > 0");
    const { resources: results2 } = await container.items.query(querySpec).fetchAll();
    assert(results2.length > 0, "number of results for the query should be > 0");

    // replace document
    document.name = "replaced document";
    document.foo = "not bar";
    const { resource: replacedDocument } = await replaceOrUpsertItem(
      container,
      document,
      undefined,
      isUpsertTest
    );
    assert.equal(
      replacedDocument.name,
      "replaced document",
      "document name property should change"
    );
    assert.equal(replacedDocument.foo, "not bar", "property should have changed");
    assert.equal(document.id, replacedDocument.id, "document id should stay the same");
    // read document
    const response2 = await container.item(replacedDocument.id, undefined).read<TestItem>();
    const document2 = response2.resource;
    assert.equal(replacedDocument.id, document2.id);
    assert.equal(typeof response2.requestCharge, "number");
    // delete document
    await container.item(replacedDocument.id, undefined).delete();

    // read documents after deletion
    const response = await container.item(replacedDocument.id, undefined).read();
    assert.equal(response.statusCode, 404, "response should return error code 404");
    assert.equal(response.resource, undefined);
  };

  it("Should do document CRUD operations successfully", async function() {
    await documentCRUDTest(false);
  });

  it("Should do document CRUD operations successfully with upsert", async function() {
    await documentCRUDTest(true);
  });

  it("Should do document CRUD operations over multiple partitions", async function() {
    // create database
    const database = await getTestDatabase("db1");
    const partitionKey = "key";

    // create container
    const containerDefinition = {
      id: "coll1",
      partitionKey: { paths: ["/" + partitionKey] }
    };

    const { resource: containerdef } = await database.containers.create(containerDefinition, {
      offerThroughput: 12000
    });
    const container = database.container(containerdef.id);

    const documents = [
      { id: "document1" },
      { id: "document2", key: null, prop: 1 },
      { id: "document3", key: false, prop: 1 },
      { id: "document4", key: true, prop: 1 },
      { id: "document5", key: 1, prop: 1 },
      { id: "document6", key: "A", prop: 1 },
      { id: "document7", key: "", prop: 1 }
    ];

    let returnedDocuments = await bulkInsertItems(container, documents);

    assert.equal(returnedDocuments.length, documents.length);
    returnedDocuments.sort(function(doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    await bulkReadItems(container, returnedDocuments, partitionKey);
    const { resources: successDocuments } = await container.items.readAll().fetchAll();
    assert(successDocuments !== undefined, "error reading documents");
    assert.equal(
      successDocuments.length,
      returnedDocuments.length,
      "Expected " + returnedDocuments.length + " documents to be succesfully read"
    );
    successDocuments.sort(function(doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    assert.equal(
      JSON.stringify(successDocuments),
      JSON.stringify(returnedDocuments),
      "Unexpected documents are returned"
    );

    returnedDocuments.forEach(function(document) {
      document.prop ? ++document.prop : null;
    });
    const newReturnedDocuments = await bulkReplaceItems(container, returnedDocuments, partitionKey);
    returnedDocuments = newReturnedDocuments;
    await bulkQueryItemsWithPartitionKey(container, returnedDocuments, partitionKey);
    const querySpec = {
      query: "SELECT * FROM Root"
    };
    const { resources: results } = await container.items
      .query<ItemDefinition>(querySpec, { enableScanInQuery: true })
      .fetchAll();
    assert(results !== undefined, "error querying documents");
    results.sort(function(doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    assert.equal(
      results.length,
      returnedDocuments.length,
      "Expected " + returnedDocuments.length + " documents to be succesfully queried"
    );
    assert.equal(
      JSON.stringify(results),
      JSON.stringify(returnedDocuments),
      "Unexpected query results"
    );

    await bulkDeleteItems(container, returnedDocuments, partitionKey);
  });

  it("Should auto generate an id for a collection partitioned on id", async function() {
    // https://github.com/Azure/azure-sdk-for-js/issues/9734
    const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
    const { resource } = await container.items.create({});
    assert.ok(resource.id);
  });
});

describe("bulk item operations", function() {
  describe("with v1 container", function() {
    let container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    before(async function() {
      container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined
        },
        throughput: 25100
      });
      readItemId = addEntropy("item1");
      await container.items.create({
        id: readItemId,
        key: "A",
        class: "2010"
      });
      deleteItemId = addEntropy("item2");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010"
      });
      replaceItemId = addEntropy("item3");
      await container.items.create({
        id: replaceItemId,
        key: 5,
        class: "2010"
      });
    });
    after(async () => { await container.database.delete() })
    it("handles create, upsert, replace, delete", async function() {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" }
        },
        {
          operationType: BulkOperationType.Upsert,
          partitionKey: "A",
          resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" }
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "A"
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
          partitionKey: "A"
        },
        {
          operationType: BulkOperationType.Replace,
          partitionKey: 5,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, name: "nice", key: 5 }
        }
      ];
      const response = await container.items.bulk(operations);
      // Create
      assert.equal(response[0].resourceBody.name, "sample");
      assert.equal(response[0].statusCode, 201);
      // Upsert
      assert.equal(response[1].resourceBody.name, "other");
      assert.equal(response[1].statusCode, 201);
      // Read
      assert.equal(response[2].resourceBody.class, "2010");
      assert.equal(response[2].statusCode, 200);
      // Delete
      assert.equal(response[3].statusCode, 204);
      // Replace
      assert.equal(response[4].resourceBody.name, "nice");
      assert.equal(response[4].statusCode, 200);
    });
  });
  describe("with v2 container", function() {
    let v2Container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    before(async function() {
      v2Container = await getTestContainer("bulk container v2", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: 2
        },
        throughput: 25100
      });
      readItemId = addEntropy("item1");
      await v2Container.items.create({
        id: readItemId,
        key: true,
        class: "2010"
      });
      deleteItemId = addEntropy("item2");
      await v2Container.items.create({
        id: deleteItemId,
        key: {},
        class: "2011"
      });
      replaceItemId = addEntropy("item3");
      await v2Container.items.create({
        id: replaceItemId,
        key: 5,
        class: "2012"
      });
    });
    after(async () => { await v2Container.database.delete() })
    it("handles create, upsert, replace, delete", async function() {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          partitionKey: "A",
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" }
        },
        {
          operationType: BulkOperationType.Upsert,
          partitionKey: "U",
          resourceBody: { id: addEntropy("doc2"), name: "other", key: "U" }
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: true
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
          partitionKey: {}
        },
        {
          operationType: BulkOperationType.Replace,
          partitionKey: 5,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, name: "nice", key: 5 }
        }
      ];
      const response = await v2Container.items.bulk(operations);
      // Create
      assert.equal(response[0].resourceBody.name, "sample");
      assert.equal(response[0].statusCode, 201);
      // Upsert
      assert.equal(response[1].resourceBody.name, "other");
      assert.equal(response[1].statusCode, 201);
      // Read
      assert.equal(response[2].resourceBody.class, "2010");
      assert.equal(response[2].statusCode, 200);
      // Delete
      assert.equal(response[3].statusCode, 204);
      // Replace
      assert.equal(response[4].resourceBody.name, "nice");
      assert.equal(response[4].statusCode, 200);
    });
    it("respects order", async function() {
      readItemId = addEntropy("item1");
      await v2Container.items.create({
        id: readItemId,
        key: "A",
        class: "2010"
      });
      const operations = [
        {
          operationType: BulkOperationType.Delete,
          id: readItemId,
          partitionKey: "A"
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "A"
        }
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[0].statusCode, 204);
      // Delete occurs first, so the read returns a 404
      assert.equal(response[1].statusCode, 404);
    });
    it("424 errors for operations after an error", async function() {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            ttl: -10
          }
        },
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            key: "A",
            licenseType: "B",
            id: "o239uroihndsf"
          }
        }
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[1].statusCode, 424);
    });
    it("autogenerates IDs for Create operations", async function() {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            key: "A",
            licenseType: "C"
          }
        }
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[0].statusCode, 201);
    });
  });
});
