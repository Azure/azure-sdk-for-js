// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import {
  Constants,
  Container,
  CosmosClient,
  OperationResponse,
  PatchOperation,
  PatchOperationType,
} from "../../../src";
import { ItemDefinition } from "../../../src";
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
  getTestContainer,
} from "../common/TestHelpers";
import { BulkOperationType, OperationInput } from "../../../src";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { generateOperationOfSize } from "../../internal/unit/utils/batch.spec";
interface TestItem {
  id?: string;
  name?: string;
  foo?: string;
  key?: string;
  replace?: string;
}

describe("Item CRUD", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });
  const documentCRUDTest = async function (isUpsertTest: boolean): Promise<void> {
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
      replace: "new property",
    };
    try {
      await createOrUpsertItem(
        container,
        itemDefinition,
        { disableAutomaticIdGeneration: true },
        isUpsertTest
      );
      assert.fail("id generation disabled must throw with invalid id");
    } catch (err: any) {
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
          value: document.id,
        },
      ],
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

  it("Should do document CRUD operations successfully", async function () {
    await documentCRUDTest(false);
  });

  it("Should do document CRUD operations successfully with upsert", async function () {
    await documentCRUDTest(true);
  });

  it("Should do document CRUD operations over multiple partitions", async function () {
    // create database
    const database = await getTestDatabase("db1");
    const partitionKey = "key";

    // create container
    const containerDefinition = {
      id: "coll1",
      partitionKey: { paths: ["/" + partitionKey] },
    };

    const { resource: containerdef } = await database.containers.create(containerDefinition, {
      offerThroughput: 12000,
    });
    const container = database.container(containerdef.id);

    const documents = [
      { id: "document1" },
      { id: "document2", key: null, prop: 1 },
      { id: "document3", key: false, prop: 1 },
      { id: "document4", key: true, prop: 1 },
      { id: "document5", key: 1, prop: 1 },
      { id: "document6", key: "A", prop: 1 },
      { id: "document7", key: "", prop: 1 },
    ];

    let returnedDocuments = await bulkInsertItems(container, documents);

    assert.equal(returnedDocuments.length, documents.length);
    returnedDocuments.sort(function (doc1, doc2) {
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
    successDocuments.sort(function (doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    assert.equal(
      JSON.stringify(successDocuments),
      JSON.stringify(returnedDocuments),
      "Unexpected documents are returned"
    );

    returnedDocuments.forEach(function (document) {
      document.prop ? ++document.prop : null; // eslint-disable-line no-unused-expressions
    });
    const newReturnedDocuments = await bulkReplaceItems(container, returnedDocuments, partitionKey);
    returnedDocuments = newReturnedDocuments;
    await bulkQueryItemsWithPartitionKey(container, returnedDocuments, partitionKey);
    const querySpec = {
      query: "SELECT * FROM Root",
    };
    const { resources: results } = await container.items
      .query<ItemDefinition>(querySpec, { enableScanInQuery: true })
      .fetchAll();
    assert(results !== undefined, "error querying documents");
    results.sort(function (doc1, doc2) {
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

  it("Should auto generate an id for a collection partitioned on id", async function () {
    // https://github.com/Azure/azure-sdk-for-js/issues/9734
    const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
    const { resource } = await container.items.create({});
    assert.ok(resource.id);
  });
});

describe("bulk/batch item operations", function () {
  describe("Check size based splitting of batches", function () {
    let container: Container;
    before(async function () {
      container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined,
        },
        throughput: 400,
      });
    });
    after(async () => {
      await container.database.delete();
    });
    it("Check case when cumulative size of all operations is less than threshold", async function () {
      const operations: OperationInput[] = [...Array(10).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(100, { partitionKey: "key_value" }, { key: "key_value" }),
          } as any)
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`)
      );
    });
    it("Check case when cumulative size of all operations is greater than threshold", async function () {
      const operations: OperationInput[] = [...Array(10).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(
              Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2)
            ),
            partitionKey: {},
          } as any)
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`)
      );
    });
    it("Check case when cumulative size of all operations is greater than threshold", async function () {
      const operations: OperationInput[] = [...Array(50).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(
              Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2),
              {},
              { key: "key_value" }
            ),
          } as any)
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`)
      );
    });
  });
  describe("with v1 container", function () {
    let container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    before(async function () {
      container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined,
        },
        throughput: 25100,
      });
      readItemId = addEntropy("item1");
      await container.items.create({
        id: readItemId,
        key: "A",
        class: "2010",
      });
      deleteItemId = addEntropy("item2");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010",
      });
      replaceItemId = addEntropy("item3");
      await container.items.create({
        id: replaceItemId,
        key: 5,
        class: "2010",
      });
    });
    after(async () => {
      await container.database.delete();
    });
    it("handles create, upsert, replace, delete", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
        },
        {
          operationType: BulkOperationType.Upsert,
          partitionKey: "A",
          resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" },
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Replace,
          partitionKey: 5,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, name: "nice", key: 5 },
        },
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
  describe("with v2 container", function () {
    let v2Container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let patchItemId: string;
    let deleteItemId: string;
    before(async function () {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb" });
      const database = db.database;
      const response = await database.containers.createIfNotExists({
        id: "patchContainer",
        partitionKey: {
          paths: ["/key"],
          version: 2,
        },
        throughput: 25100,
      });
      v2Container = response.container;
      readItemId = addEntropy("item1");
      await v2Container.items.create({
        id: readItemId,
        key: true,
        class: "2010",
      });
      deleteItemId = addEntropy("item2");
      await v2Container.items.create({
        id: deleteItemId,
        key: {},
        class: "2011",
      });
      replaceItemId = addEntropy("item3");
      await v2Container.items.create({
        id: replaceItemId,
        key: 5,
        class: "2012",
      });
      patchItemId = addEntropy("item4");
      await v2Container.items.create({
        id: patchItemId,
        key: 5,
        class: "2019",
      });
    });
    it("handles create, upsert, patch, replace, delete", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          partitionKey: "A",
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
        },
        {
          operationType: BulkOperationType.Upsert,
          partitionKey: "U",
          resourceBody: { name: "other", key: "U" },
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: true,
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
          partitionKey: {},
        },
        {
          operationType: BulkOperationType.Replace,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, name: "nice", key: 5 },
        },
        {
          operationType: BulkOperationType.Patch,
          partitionKey: 5,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
          },
        },
        {
          operationType: BulkOperationType.Patch,
          partitionKey: 5,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];
      const response = await v2Container.items.bulk(operations);
      // Create
      assert.strictEqual(response[0].resourceBody.name, "sample");
      assert.strictEqual(response[0].statusCode, 201);
      // Upsert
      assert.strictEqual(response[1].resourceBody.name, "other");
      assert.strictEqual(response[1].statusCode, 201);
      // Read
      assert.strictEqual(response[2].resourceBody.class, "2010");
      assert.strictEqual(response[2].statusCode, 200);
      // Delete
      assert.strictEqual(response[3].statusCode, 204);
      // Replace
      assert.strictEqual(response[4].resourceBody.name, "nice");
      assert.strictEqual(response[4].statusCode, 200);
      // Patch
      assert.strictEqual(response[5].resourceBody.great, "goodValue");
      assert.strictEqual(response[5].statusCode, 200);
    });
    it("respects order", async function () {
      readItemId = addEntropy("item1");
      await v2Container.items.create({
        id: readItemId,
        key: "A",
        class: "2010",
      });
      const operations = [
        {
          operationType: BulkOperationType.Delete,
          id: readItemId,
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "A",
        },
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[0].statusCode, 204);
      // Delete occurs first, so the read returns a 404
      assert.equal(response[1].statusCode, 404);
    });
    it("424 errors for operations after an error", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            ttl: -10,
            key: "A",
          },
        },
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            key: "A",
            licenseType: "B",
            id: "o239uroihndsf",
          },
        },
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[1].statusCode, 424);
    });
    it("Continues after errors with continueOnError true", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            ttl: -10,
            key: "A",
          },
        },
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            key: "A",
            licenseType: "B",
            id: addEntropy("sifjsiof"),
          },
        },
      ];
      const response = await v2Container.items.bulk(operations, { continueOnError: true });
      assert.strictEqual(response[1].statusCode, 201);
    });
    it("autogenerates IDs for Create operations", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            key: "A",
            licenseType: "C",
          },
        },
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[0].statusCode, 201);
    });
    it("handles operations with null, undefined, and 0 partition keys", async function () {
      const item1Id = addEntropy("item1");
      const item2Id = addEntropy("item2");
      const item3Id = addEntropy("item2");
      await v2Container.items.create({
        id: item1Id,
        key: null,
        class: "2010",
      });
      await v2Container.items.create({
        id: item2Id,
        key: 0,
      });
      await v2Container.items.create({
        id: item3Id,
        key: undefined,
      });
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Read,
          id: item1Id,
          partitionKey: null,
        },
        {
          operationType: BulkOperationType.Read,
          id: item2Id,
          partitionKey: 0,
        },
        {
          operationType: BulkOperationType.Read,
          id: item3Id,
          partitionKey: undefined,
        },
      ];
      const response = await v2Container.items.bulk(operations);
      assert.equal(response[0].statusCode, 200);
      assert.equal(response[1].statusCode, 200);
      assert.equal(response[2].statusCode, 200);
    });
  });
  describe("v2 single partition container", async function () {
    let container: Container;
    let deleteItemId: string;
    before(async function () {
      container = await getTestContainer("bulk container");
      deleteItemId = addEntropy("item2");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010",
      });
    });
    it("deletes an item with default partition", async function () {
      const operation: OperationInput = {
        operationType: BulkOperationType.Delete,
        id: deleteItemId,
      };

      const deleteResponse = await container.items.bulk([operation]);
      assert.equal(deleteResponse[0].statusCode, 204);
    });
  });
  describe("v2 multi partition container", async function () {
    let container: Container;
    let createItemId: string;
    let upsertItemId: string;
    before(async function () {
      container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/nested/key"],
          version: 2,
        },
        throughput: 25100,
      });
      createItemId = addEntropy("createItem");
      upsertItemId = addEntropy("upsertItem");
    });
    it("creates an item with nested object partition key", async function () {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: {
            id: createItemId,
            nested: {
              key: "A",
            },
          },
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: {
            id: upsertItemId,
            nested: {
              key: false,
            },
          },
        },
      ];

      const createResponse = await container.items.bulk(operations);
      assert.equal(createResponse[0].statusCode, 201);
    });
  });

  // TODO: Non-deterministic test. We can't guarantee we see any response with a 429 status code since the retries happen within the response
  describe("item read retries", async function () {
    it("retries on 429", async function () {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const { resource: db } = await client.databases.create({
        id: `small db ${Math.random() * 1000}`,
      });
      const containerResponse = await client
        .database(db.id)
        .containers.create({ id: `small container ${Math.random() * 1000}`, throughput: 400 });
      const container = containerResponse.container;
      await container.items.create({ id: "readme" });
      const arr = new Array(400);
      const promises = [];
      for (let i = 0; i < arr.length; i++) {
        promises.push(container.item("readme").read());
      }
      const resp = await Promise.all(promises);
      assert.equal(resp[0].statusCode, 200);
    });
  });

  describe("v2 single partition container", async function () {
    let container: Container;
    let createItemId: string;
    let otherItemId: string;
    let upsertItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    let patchItemId: string;
    before(async function () {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb" });
      const contResponse = await db.database.containers.createIfNotExists({
        id: "patchContainer",
        partitionKey: {
          paths: ["/key"],
          version: 2,
        },
        throughput: 25100,
      });
      container = contResponse.container;
      deleteItemId = addEntropy("item1");
      createItemId = addEntropy("item2");
      otherItemId = addEntropy("item2");
      upsertItemId = addEntropy("item4");
      replaceItemId = addEntropy("item3");
      patchItemId = addEntropy("item5");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010",
      });
      await container.items.create({
        id: replaceItemId,
        key: "A",
        class: "2010",
      });
      await container.items.create({
        id: patchItemId,
        key: "A",
        class: "2010",
      });
    });
    it("can batch all operation types", async function () {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: createItemId, key: "A", school: "high" },
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: upsertItemId, key: "A", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Replace,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, key: "A", school: "junior high" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
        },
        {
          operationType: BulkOperationType.Patch,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      const response = await container.items.batch(operations, "A");
      assert(isOperationResponse(response.result[0]));
      assert.strictEqual(response.result[0].statusCode, 201);
      assert.strictEqual(response.result[1].statusCode, 201);
      assert.strictEqual(response.result[2].statusCode, 200);
      assert.strictEqual(response.result[3].statusCode, 204);
      assert.strictEqual(response.result[4].statusCode, 200);
    });
    it("rolls back prior operations when one fails", async function () {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: otherItemId, key: "A", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId + addEntropy("make this 404"),
        },
      ];

      const deleteResponse = await container.items.batch(operations, "A");
      assert.strictEqual(deleteResponse.result[0].statusCode, 424);
      assert.strictEqual(deleteResponse.result[1].statusCode, 404);
      const { resource: readItem } = await container.item(otherItemId).read();
      assert.strictEqual(readItem, undefined);
      assert(isOperationResponse(deleteResponse.result[0]));
    });

    function isOperationResponse(object: unknown): object is OperationResponse {
      return (
        typeof object === "object" &&
        object !== null &&
        Object.prototype.hasOwnProperty.call(object, "statusCode") &&
        Object.prototype.hasOwnProperty.call(object, "requestCharge")
      );
    }
  });
});
describe("patch operations", function () {
  describe("various mixed operations", function () {
    let container: Container;
    let addItemId: string;
    let conditionItemId: string;
    before(async function () {
      addItemId = addEntropy("addItemId");
      conditionItemId = addEntropy("conditionItemId");
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb" });
      const contResponse = await db.database.containers.createIfNotExists({
        id: "patchContainer",
        partitionKey: {
          paths: ["/key"],
          version: 2,
        },
        throughput: 25100,
      });
      container = contResponse.container;
      await container.items.upsert({
        id: addItemId,
        first: 1,
        last: "a",
        removable: "yes",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
      await container.items.upsert({
        id: conditionItemId,
        first: 1,
        last: "a",
        removable: "no",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
    });
    it("handles add, remove, replace, set, incr", async function () {
      const operations: PatchOperation[] = [
        {
          op: "add",
          path: "/laster",
          value: "c",
        },
        {
          op: "replace",
          path: "/last",
          value: "b",
        },
        {
          op: "remove",
          path: "/removable",
        },
        {
          op: "set",
          path: "/existingObj/newKey",
          value: "newVal",
        },
        {
          op: "incr",
          path: "/num",
          value: 5,
        },
      ];
      const { resource: addItem } = await container.item(addItemId).patch(operations);
      assert.strictEqual(addItem.num, 5);
      assert.strictEqual(addItem.existingObj.newKey, "newVal");
      assert.strictEqual(addItem.laster, "c");
      assert.strictEqual(addItem.last, "b");
      assert.strictEqual(addItem.removable, undefined);
    });
    it("conditionally patches", async function () {
      const operations: PatchOperation[] = [
        {
          op: "add",
          path: "/newImproved",
          value: "it works",
        },
      ];
      const condition = "from c where NOT IS_DEFINED(c.newImproved)";
      const { resource: conditionItem } = await container
        .item(conditionItemId)
        .patch({ condition, operations });
      assert.strictEqual(conditionItem.newImproved, "it works");
    });
  });
});
