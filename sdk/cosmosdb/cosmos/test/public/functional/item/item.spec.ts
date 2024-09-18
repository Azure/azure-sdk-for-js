// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { Suite } from "mocha";
import {
  Container,
  ContainerDefinition,
  ContainerRequest,
  CosmosClient,
  PatchOperation,
  RequestOptions,
} from "../../../../src";
import { ItemDefinition } from "../../../../src";
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
  testForDiagnostics,
} from "../../common/TestHelpers";
import { endpoint } from "../../common/_testConfig";
import { masterKey } from "../../common/_fakeTestSecrets";
import {
  PartitionKey,
  PartitionKeyDefinition,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
} from "../../../../src/documents";
import { PriorityLevel } from "../../../../src/documents/PriorityLevel";
import { getCurrentTimestampInMs } from "../../../../src/utils/time";

/**
 * Tests Item api.
 * Nomenclature
 * V1 Container - containerDefinition.partitionKey.version is undefined or 1
 * V2 Container - containerDefinition.partitionKey.version is 2
 * Single Partition Container - Container with only one physical partition.
 * Multi Partition Container - Container with more than one physical partition.
 * Hierarchical Partition Container - Container with more than one level of hierarchy of Partition Keys i.e. ['key1', 'key2']
 * Nested Partition Key - Partition Key composed of value which is nested in the document. i.e ['/Address/Zip']
 */

interface TestItem {
  id?: string;
  name?: string;
  foo?: string;
  key?: string | number | boolean;
  key2?: string | number | boolean;
  _partitionKey?: string;
  replace?: string;
  nested1?: {
    nested2: {
      nested3: string | number | boolean;
    };
  };
  prop?: number;
}

type CRUDTestDataSet = {
  // Container to create.
  containerDef: ContainerRequest;
  // item to create
  itemDef: TestItem;
  // item to replace it with
  replaceItemDef: TestItem;
  // Partition key to use for operations on original item
  originalItemPartitionKey?: PartitionKey;
  // Partition key to use for operations on replaced item
  replacedItemPartitionKey?: PartitionKey;
  propertyToCheck?: string[];
};

function extractNestedPropertyFromObject(obj: any, paths: string[] = []) {
  paths.reduce((ob: any, path: string) => {
    if (ob !== null && ob !== undefined && typeof ob === "object") {
      return ob[path];
    } else {
      throw new Error(`The property ${path} doesn't exisit in object`);
    }
  }, obj);
}

type MultiCRUDTestDataSet = {
  dbName: string;
  containerDef: ContainerDefinition;
  partitinKeyDef: PartitionKeyDefinition;
  containerRequestOps: RequestOptions;
  documents: TestItem[];
  singleDocFetchQuery: string;
  parameterGenerator: (doc: any) => { name: string; value: any }[];
};

/**
 * Helper function to run Create Upsert Read Update Replace Delete operation on Items.
 * @param dataset - CRUDTestDataSet
 * @param isUpsertTest - is upsert is to be tested instead of create.
 */
async function CRUDTestRunner(dataset: CRUDTestDataSet, isUpsertTest: boolean): Promise<void> {
  // create database
  const database = await getTestDatabase("sample 中文 database");
  // create container
  const { resource: containerdef } = await database.containers.create(dataset.containerDef);
  const container: Container = database.container(containerdef.id);

  // read items on empty container
  const { resources: items } = await container.items.readAll().fetchAll();
  assert(Array.isArray(items), "Value should be an array");

  // create an item
  const beforeCreateDocumentsCount = items.length;

  const itemDefinition = dataset.itemDef;
  try {
    await createOrUpsertItem(
      container,
      itemDefinition,
      { disableAutomaticIdGeneration: true },
      isUpsertTest,
    );
    assert.fail("id generation disabled must throw with invalid id");
  } catch (err: any) {
    assert(err !== undefined, "should throw an error because automatic id generation is disabled");
  }

  // create or upsert
  const { resource: document } = await createOrUpsertItem(
    container,
    itemDefinition,
    undefined,
    isUpsertTest,
  );
  assert.equal(
    extractNestedPropertyFromObject(document, dataset.propertyToCheck),
    extractNestedPropertyFromObject(itemDefinition, dataset.propertyToCheck),
  );
  assert(document.id !== undefined);
  // read documents after creation
  const { resources: documents2 } = await container.items.readAll().fetchAll();
  assert.equal(
    documents2.length,
    beforeCreateDocumentsCount + 1,
    "create should increase the number of documents",
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
  const replaceDocument: TestItem = { ...dataset.replaceItemDef, id: document.id };
  const { resource: replacedDocument } = await replaceOrUpsertItem(
    container,
    replaceDocument,
    undefined,
    isUpsertTest,
    dataset.originalItemPartitionKey,
  );
  assert.equal(replacedDocument.name, replaceDocument.name, "document name property should change");
  assert.equal(replacedDocument.foo, replaceDocument.foo, "property should have changed");
  assert.equal(document.id, replacedDocument.id, "document id should stay the same");
  // read document
  const response2 = await container
    .item(replacedDocument.id, dataset.replacedItemPartitionKey)
    .read<TestItem>();
  const document2 = response2.resource;
  assert.equal(replacedDocument.id, document2.id);
  assert.equal(typeof response2.requestCharge, "number");
  // delete document
  await container.item(replacedDocument.id, dataset.replacedItemPartitionKey).delete();

  // read documents after deletion
  const response = await container.item(replacedDocument.id, undefined).read();
  assert.equal(response.statusCode, 404, "response should return error code 404");
  assert.equal(response.resource, undefined);

  // update document
}

describe("Item CRUD hierarchical partition", function (this: Suite) {
  beforeEach(async function () {
    await removeAllDatabases();
  });
  it("hierarchycal partitions", async function () {
    const dbName = "hierarchical partition db";
    const database = await getTestDatabase(dbName);
    const containerDef = {
      id: "sample container",
      partitionKey: {
        paths: ["/foo", "/key"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const itemDefinition: TestItem = {
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    };

    const { resource: containerdef } = await database.containers.create(containerDef);
    const container: Container = database.container(containerdef.id);

    // read items
    const { resources: items } = await container.items.readAll().fetchAll();
    assert(Array.isArray(items), "Value should be an array");
    // create an item
    const beforeCreateDocumentsCount = items.length;

    const { resource: document } = await createOrUpsertItem(
      container,
      itemDefinition,
      undefined,
      false,
    );
    assert.equal(document.name, itemDefinition.name);
    assert(document.id !== undefined);
    // read documents after creation
    const { resources: documents2 } = await container.items.readAll().fetchAll();
    assert.equal(
      documents2.length,
      beforeCreateDocumentsCount + 1,
      "create should increase the number of documents",
    );
  });
});

describe("Create, Upsert, Read, Update, Replace, Delete Operations on Item", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  async function multipelPartitionCRUDTest(dataset: MultiCRUDTestDataSet): Promise<void> {
    const database = await getTestDatabase(dataset.dbName);
    const { resource: containerdef } = await database.containers.create(
      { ...dataset.containerDef, partitionKey: dataset.partitinKeyDef },
      dataset.containerRequestOps,
    );
    const container = database.container(containerdef.id);
    let returnedDocuments = await bulkInsertItems(container, dataset.documents);

    assert.equal(returnedDocuments.length, dataset.documents.length);
    returnedDocuments.sort(function (doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    await bulkReadItems(container, returnedDocuments, dataset.partitinKeyDef);
    const { resources: successDocuments } = await container.items.readAll().fetchAll();
    assert(successDocuments !== undefined, "error reading documents");
    assert.equal(
      successDocuments.length,
      returnedDocuments.length,
      "Expected " + returnedDocuments.length + " documents to be succesfully read",
    );
    successDocuments.sort(function (doc1, doc2) {
      return doc1.id.localeCompare(doc2.id);
    });
    assert.equal(
      JSON.stringify(successDocuments),
      JSON.stringify(returnedDocuments),
      "Unexpected documents are returned",
    );
    returnedDocuments.forEach(function (document) {
      document.prop ? ++document.prop : null; // eslint-disable-line no-unused-expressions
    });
    const newReturnedDocuments = await bulkReplaceItems(
      container,
      returnedDocuments,
      dataset.partitinKeyDef,
    );
    returnedDocuments = newReturnedDocuments;
    await bulkQueryItemsWithPartitionKey(
      container,
      returnedDocuments,
      dataset.singleDocFetchQuery,
      dataset.parameterGenerator,
    );
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
      "Expected " + returnedDocuments.length + " documents to be succesfully queried",
    );
    assert.equal(
      JSON.stringify(results),
      JSON.stringify(returnedDocuments),
      "Unexpected query results",
    );

    await bulkDeleteItems(container, returnedDocuments, dataset.partitinKeyDef);
  }

  const dataSetForDefaultSinglePhysicalPartition: CRUDTestDataSet = {
    containerDef: { id: "default container with single physical partition" },
    itemDef: {
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    },
    replaceItemDef: {
      name: "replaced document",
      foo: "not bar",
      key: "value",
      replace: "new property",
    },
    originalItemPartitionKey: undefined,
    replacedItemPartitionKey: undefined,
    propertyToCheck: ["name"],
  };

  const dataSetForDefaultMultiplePhysicalPartition1: CRUDTestDataSet = {
    ...dataSetForDefaultSinglePhysicalPartition,
    itemDef: {
      _partitionKey: "aswww", // For second physical partition
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    },
    replaceItemDef: {
      _partitionKey: "aswww", // For second physical partition
      name: "replaced document",
      foo: "not bar",
      key: "value",
      replace: "new property",
    },
    containerDef: {
      id: "default container with multiple physical partition",
      throughput: 12000,
    },
    originalItemPartitionKey: "aswww",
    replacedItemPartitionKey: "aswww",
  };

  const dataSetForDefaultMultiplePhysicalPartition2: CRUDTestDataSet = {
    ...dataSetForDefaultSinglePhysicalPartition,
    itemDef: {
      _partitionKey: "asdfadsf", // For second physical partition
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    },
    replaceItemDef: {
      _partitionKey: "asdfadsf", // For second physical partition
      name: "replaced document",
      foo: "not bar",
      key: "value",
      replace: "new property",
    },
    containerDef: {
      id: "default container with multiple physical partition",
      throughput: 12000,
    },
    originalItemPartitionKey: "asdfadsf",
    replacedItemPartitionKey: "asdfadsf",
  };

  const dataSetForHierarchicalPartitionKey: CRUDTestDataSet = {
    containerDef: {
      id: "sample container",
      partitionKey: {
        paths: ["/key", "/key2"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    },
    itemDef: {
      name: "sample document",
      foo: "bar",
      key2: "value2",
      key: "value",
      replace: "new property",
    },
    replaceItemDef: {
      name: "replaced document",
      foo: "not bar",
      key2: "value2",
      key: "value",
      replace: "new property",
    },
    originalItemPartitionKey: ["value", "value2"],
    replacedItemPartitionKey: ["value", "value2"],
  };
  const multiCrudDataset1: MultiCRUDTestDataSet = {
    dbName: "db1",
    partitinKeyDef: {
      paths: ["/key"],
    },
    containerDef: {
      id: "col1",
    },
    documents: [
      { id: "document1" },
      { id: "document2", key: null, key2: null, prop: 1 },
      { id: "document3", key: false, key2: false, prop: 1 },
      { id: "document4", key: true, key2: true, prop: 1 },
      { id: "document5", key: 1, key2: 1, prop: 1 },
      { id: "document6", key: "A", key2: "A", prop: 1 },
      { id: "document7", key: "", key2: "", prop: 1 },
    ],
    containerRequestOps: {
      offerThroughput: 12000,
    },
    singleDocFetchQuery: "SELECT * FROM root r WHERE r.key=@key",
    parameterGenerator: (doc: any) => {
      return [
        {
          name: "@key",
          value: doc["key"],
        },
      ];
    },
  };
  const multiCrudDatasetWithHierarchicalPartition: MultiCRUDTestDataSet = {
    dbName: "db1",
    partitinKeyDef: {
      paths: ["/key", "/key2"],
      version: PartitionKeyDefinitionVersion.V2,
      kind: PartitionKeyKind.MultiHash,
    },
    containerDef: {
      id: "col1",
    },
    documents: [
      { id: "document1" },
      { id: "document2", key: null, key2: null, prop: 1 },
      { id: "document3", key: false, key2: false, prop: 1 },
      { id: "document4", key: true, key2: true, prop: 1 },
      { id: "document5", key: 1, key2: 1, prop: 1 },
      { id: "document6", key: "A", key2: "A", prop: 1 },
      { id: "document7", key: "", key2: "", prop: 1 },
    ],
    containerRequestOps: {
      offerThroughput: 12000,
    },
    singleDocFetchQuery: "SELECT * FROM root r WHERE r.key=@key and r.key2=@key2",
    parameterGenerator: (doc: any) => {
      return [
        {
          name: "@key",
          value: doc["key"],
        },
        {
          name: "@key2",
          value: doc["key2"],
        },
      ];
    },
  };

  describe("V1 Container", async () => {
    describe("Single Partition Container", async () => {
      it("Should do document CRUD operations successfully : container with default partition key", async function () {
        await CRUDTestRunner(dataSetForDefaultSinglePhysicalPartition, false);
      });

      it("Should do document CRUD operations successfully with upsert : container with default partition key", async function () {
        await CRUDTestRunner(dataSetForDefaultSinglePhysicalPartition, true);
      });

      it("Should do document CRUD operations successfully : container with default partition key, multiple physical partitions", async function () {
        await CRUDTestRunner(dataSetForDefaultMultiplePhysicalPartition1, false);
        await CRUDTestRunner(dataSetForDefaultMultiplePhysicalPartition2, false);
      });

      it("Should do document CRUD operations successfully with upsert: container with default partition key, multiple physical partitions", async function () {
        await CRUDTestRunner(dataSetForDefaultMultiplePhysicalPartition1, true);
        await CRUDTestRunner(dataSetForDefaultMultiplePhysicalPartition2, true);
      });
    });
  });

  describe("V2 Container", async () => {
    describe("Multi Partition Container", async () => {
      it("Should do document CRUD operations successfully : container with hierarchical partition key", async function () {
        await CRUDTestRunner(dataSetForHierarchicalPartitionKey, false);
      });
      it("Should do document CRUD operations successfully with upsert : container with hierarchical partition key", async function () {
        await CRUDTestRunner(dataSetForHierarchicalPartitionKey, true);
      });
    });
  });

  it("Document CRUD over multiple partition: Single partition key", async function () {
    await multipelPartitionCRUDTest(multiCrudDataset1);
  });

  it("Document CRUD over multiple partition : Hierarchical partitions", async function () {
    await multipelPartitionCRUDTest(multiCrudDatasetWithHierarchicalPartition);
  });

  it("Should auto generate an id for a collection partitioned on id", async function () {
    // https://github.com/Azure/azure-sdk-for-js/issues/9734
    const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
    const { resource } = await container.items.create({});
    assert.ok(resource.id);
  });

  describe("Upsert when collection partitioned on id", async () => {
    // https://github.com/Azure/azure-sdk-for-js/issues/21383
    it("should create a new resource if /id is not passed", async function () {
      const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
      const { resource: resource } = await container.items.upsert({ key1: 0, key2: 0 });
      assert.ok(resource.id);
    });

    it("should create a new resource if /id is passed and resource doesn't exist", async function () {
      const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
      const { resource: resource } = await container.items.upsert({
        id: "1ee929e0-40aa-4143-978c-8415914056d4",
        key1: 0,
        key2: 0,
      });
      assert.ok(resource.id);
    });
    it("should update a resource if /id is passed and exists in container", async function () {
      const container = await getTestContainer("db1", undefined, { partitionKey: "/id" });
      const { resource: resource1 } = await container.items.upsert({ key1: 0, key2: 1 });
      assert.ok(resource1.id);

      const { resource: resource2 } = await container.items.upsert({
        id: resource1.id,
        key1: 0,
        key2: 2,
      });
      assert.strictEqual(resource1.id, resource2.id);
    });
  });

  describe("Test diagnostics for item CRUD", async function () {
    const container = await getTestContainer("db1", undefined, {
      throughput: 20000,
      partitionKey: "/id",
    });
    // Test diagnostic for item create
    const itemId = "2";
    it("Test diagnostics for item.create", async function () {
      const startTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.create({ id: itemId });
        },
        {
          requestStartTimeUTCInMsLowerLimit: startTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 5,
          locationEndpointsContacted: 1,
        },
      );
    });

    // Test diagnostic for item read
    it("Test diagnostics for item.read", async function () {
      const readTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.item(itemId, itemId).read();
        },
        {
          requestStartTimeUTCInMsLowerLimit: readTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 2, // 2 calls for database account
          locationEndpointsContacted: 1,
        },
      );
    });

    // Test diagnostic for item update
    it("Test diagnostics for item.upsert", async function () {
      const upsertTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.upsert({
            id: itemId,
            value: "3",
          });
        },
        {
          requestStartTimeUTCInMsLowerLimit: upsertTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 2, // 2 call for database account.
          locationEndpointsContacted: 1,
        },
      );
    });

    // Test diagnostic for item replace
    it("Test diagnostics for item.replace", async function () {
      const replaceTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.item(itemId, itemId).replace({
            id: itemId,
            value: "4",
          });
        },
        {
          requestStartTimeUTCInMsLowerLimit: replaceTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 2, // 2 call for database account.
          locationEndpointsContacted: 1,
        },
      );
    });

    // Test diagnostic for item query fetchAll
    it("Test diagnostics for items.query fetchAll", async function () {
      const fetchAllTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.query("select * from c ").fetchAll();
        },
        {
          requestStartTimeUTCInMsLowerLimit: fetchAllTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 11,
          locationEndpointsContacted: 1,
        },
        true,
      );
    });

    // Test diagnostic for item query fetchAll
    it("Test diagnostics for item.query fetchNext", async function () {
      const fetchNextTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.query("select * from c ").fetchNext();
        },
        {
          requestStartTimeUTCInMsLowerLimit: fetchNextTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 5,
          locationEndpointsContacted: 1,
        },
        true,
      );
    });
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
  describe("various mixed operations - hierarchical partitions", function () {
    let container: Container;
    let addItemId: string;
    let addItemWithOnePartitionKeyId: string;
    let addItemWithNoPartitionKeyId: string;
    let conditionItemId: string;
    before(async function () {
      addItemId = addEntropy("addItemId");
      addItemWithOnePartitionKeyId = addEntropy("addItemWithOnePartitionKeyId");
      addItemWithNoPartitionKeyId = addEntropy("addItemWithNoPartitionKeyId");
      conditionItemId = addEntropy("conditionItemId");
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb hp" });
      const contResponse = await db.database.containers.createIfNotExists({
        id: "patchContainer",
        partitionKey: {
          paths: ["/key1", "/key2"],
          version: 2,
          kind: PartitionKeyKind.MultiHash,
        },
        throughput: 25100,
      });
      container = contResponse.container;
      await container.items.upsert({
        // Second physical partition
        id: addItemId,
        first: 1,
        last: "a",
        key1: "asdf",
        key2: "dfs",
        removable: "yes",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
      await container.items.upsert({
        // First physical partition
        id: addItemWithOnePartitionKeyId,
        first: 1,
        last: "a",
        key1: "sdfasdf",
        key2: undefined,
        removable: "no",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
      await container.items.upsert({
        // First physical partition
        id: addItemWithNoPartitionKeyId,
        first: 1,
        last: "a",
        removable: "no",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
      await container.items.upsert({
        // First physical partition
        id: conditionItemId,
        first: 1,
        last: "a",
        key1: "sdfasdf",
        key2: undefined,
        removable: "no",
        existingObj: {
          key: "val",
        },
        num: 0,
      });
    });
    it("handles add, remove, replace, set, incr - hierarchical partitions", async function () {
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
      const { resource: addItem } = await container
        .item(addItemId, ["asdf", "dfs"])
        .patch(operations);
      assert.strictEqual(addItem.num, 5);
      assert.strictEqual(addItem.existingObj.newKey, "newVal");
      assert.strictEqual(addItem.laster, "c");
      assert.strictEqual(addItem.last, "b");
      assert.strictEqual(addItem.removable, undefined);

      const { resource: addItemWithOnePartitionKey } = await container
        .item(addItemWithOnePartitionKeyId, ["sdfasdf", undefined])
        .patch(operations);
      assert.strictEqual(addItemWithOnePartitionKey.num, 5);
      assert.strictEqual(addItemWithOnePartitionKey.existingObj.newKey, "newVal");
      assert.strictEqual(addItemWithOnePartitionKey.laster, "c");
      assert.strictEqual(addItemWithOnePartitionKey.last, "b");
      assert.strictEqual(addItemWithOnePartitionKey.removable, undefined);

      const { resource: addItemWithNoPartitionKey } = await container
        .item(addItemWithNoPartitionKeyId, [undefined, undefined])
        .patch(operations);
      assert.strictEqual(addItemWithNoPartitionKey.num, 5);
      assert.strictEqual(addItemWithNoPartitionKey.existingObj.newKey, "newVal");
      assert.strictEqual(addItemWithNoPartitionKey.laster, "c");
      assert.strictEqual(addItemWithNoPartitionKey.last, "b");
      assert.strictEqual(addItemWithNoPartitionKey.removable, undefined);
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
        .item(conditionItemId, ["sdfasdf", undefined])
        .patch({ condition, operations });
      assert.strictEqual(conditionItem.newImproved, "it works");
    });
  });
});

describe("Item CRUD with priority", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });
  const documentCRUDTest = async function (isUpsertTest: boolean): Promise<void> {
    // create database
    const database = await getTestDatabase("sample 中文 database");
    // create container
    const { resource: containerdef } = await database.containers.create(
      { id: "sample container" },
      { priorityLevel: PriorityLevel.Low },
    );
    const container: Container = database.container(containerdef.id);

    // read items
    const { resources: items } = await container.items
      .readAll({ priorityLevel: PriorityLevel.Low })
      .fetchAll();
    assert(Array.isArray(items), "Value should be an array");

    // create an item
    const beforeCreateDocumentsCount = items.length;
    const itemDefinition: TestItem = {
      name: "sample document",
      foo: "bar",
      key: "value",
      replace: "new property",
    };

    const { resource: document } = await createOrUpsertItem(
      container,
      itemDefinition,
      { priorityLevel: PriorityLevel.Low },
      isUpsertTest,
    );
    assert.equal(document.name, itemDefinition.name);
    assert(document.id !== undefined);
    // read documents after creation
    const { resources: documents2 } = await container.items
      .readAll({ priorityLevel: PriorityLevel.Low })
      .fetchAll();
    assert.equal(
      documents2.length,
      beforeCreateDocumentsCount + 1,
      "create should increase the number of documents",
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
    const { resources: results } = await container.items
      .query(querySpec, { priorityLevel: PriorityLevel.Low })
      .fetchAll();
    assert(results.length > 0, "number of results for the query should be > 0");

    // replace document
    document.name = "replaced document";
    document.foo = "not bar";
    const { resource: replacedDocument } = await replaceOrUpsertItem(
      container,
      document,
      { priorityLevel: PriorityLevel.Low },
      isUpsertTest,
    );
    assert.equal(
      replacedDocument.name,
      "replaced document",
      "document name property should change",
    );
    assert.equal(replacedDocument.foo, "not bar", "property should have changed");
    assert.equal(document.id, replacedDocument.id, "document id should stay the same");
    // read document
    const response2 = await container
      .item(replacedDocument.id, undefined)
      .read<TestItem>({ priorityLevel: PriorityLevel.Low });
    const document2 = response2.resource;
    assert.equal(replacedDocument.id, document2.id);
    assert.equal(typeof response2.requestCharge, "number");
    // delete document
    await container
      .item(replacedDocument.id, undefined)
      .delete({ priorityLevel: PriorityLevel.Low });

    // read documents after deletion
    const response = await container
      .item(replacedDocument.id, undefined)
      .read({ priorityLevel: PriorityLevel.Low });
    assert.equal(response.statusCode, 404, "response should return error code 404");
    assert.equal(response.resource, undefined);
  };

  it("Should do document CRUD operations successfully", async function () {
    await documentCRUDTest(false);
  });

  it("Should do document CRUD operations successfully with upsert", async function () {
    await documentCRUDTest(true);
  });
});
