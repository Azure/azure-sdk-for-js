// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CosmosClient,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  EncryptionKeyWrapMetadata,
  KeyEncryptionKeyAlgorithm,
  Database,
  ClientEncryptionIncludedPath,
  EncryptionType,
  ClientEncryptionPolicy,
  StatusCodes,
  EncryptionKeyResolver,
  Container,
  // ContainerDefinition,
  ItemResponse,
  ItemDefinition,
  ClientEncryptionKeyResponse,
  EncryptionQueryBuilder,
  RequestOptions,
  SqlQuerySpec,
  QueryIterator,
  PatchOperationType,
  OperationInput,
  PatchOperation,
  BulkOperationType,
  ChangeFeedStartFrom,
  ContainerDefinition,
  ErrorResponse,
} from "../../../src";
import { assert } from "chai";

import { masterKey } from "../common/_fakeTestSecrets";
import { endpoint } from "../common/_testConfig";
// import { removeAllDatabases } from "../common/TestHelpers";
import { randomUUID } from "@azure/core-util";
import { StatusCode } from "nock";

let unwrapCount = 0;
let wrapCount = 0;

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private keyInfo: { [key: string]: number } = {
    tempmetadata1: 1,
    tempmetadata2: 2,
    "revokedKek-metadata": 3,
    mymetadata1: 4,
    mymetadata2: 5,
    testmetadata1: 6,
    metadataupdatedmetadata: 7,
  };
  revokeAccessSet = false;
  // public wrapKeyCallsCount: { [key: string]: number };
  // public unwrapKeyCallsCount: { [key: string]: number };
  constructor() {
    // this.wrapKeyCallsCount = {};
    // this.unwrapKeyCallsCount = {};
    this.revokeAccessSet = false;
  }
  async unwrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    console.log(algorithm);
    if (encryptionKeyId === "revokedKek-metadata" && this.revokeAccessSet) {
      const errorResponse = new ErrorResponse("Forbidden");
      errorResponse.statusCode = StatusCodes.Forbidden;
      throw errorResponse;
    }
    unwrapCount++;

    // if (!this.unwrapKeyCallsCount.encryptedKeyId) {
    //   this.unwrapKeyCallsCount[encryptionKeyId] = 1;
    //   console.log("count initalized", encryptionKeyId, JSON.stringify(this.unwrapKeyCallsCount));
    // } else {
    //   this.unwrapKeyCallsCount.encryptedKeyId++;

    //   console.log("count updated", encryptionKeyId, JSON.stringify(this.unwrapKeyCallsCount));
    // }
    const moveBy = this.keyInfo[encryptionKeyId];
    const plainKey = Buffer.alloc(key.length);
    for (let i = 0; i < key.length; i++) {
      plainKey[i] = key[i] - moveBy;
    }
    // console.log("encryptionKeyId-unwrapKey", encryptionKeyId);
    // console.log("plainKey", plainKey.toString("hex"));
    return plainKey;
  }

  async wrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer> {
    console.log(algorithm);
    wrapCount++;
    // if (!this.wrapKeyCallsCount.encryptedKeyId) {
    //   this.wrapKeyCallsCount[encryptionKeyId] = 1;
    // } else {
    //   this.wrapKeyCallsCount.encryptedKeyId++;
    // }
    const moveBy = this.keyInfo[encryptionKeyId];
    const encryptedKey = Buffer.alloc(wrappedKey.length);
    for (let i = 0; i < wrappedKey.length; i++) {
      encryptedKey[i] = wrappedKey[i] + moveBy;
    }
    return encryptedKey;
  }
}
const testKeyVault = "TESTKEYSTORE_VAULT" as EncryptionKeyResolverName;

let encryptionClient: CosmosClient;
let metadata1: EncryptionKeyWrapMetadata;
let metadata2: EncryptionKeyWrapMetadata;
let database: Database;
let encryptionContainer: Container;
let encryptionContainerForChangeFeed: Container;
let testKeyEncryptionKeyResolver: MockKeyVaultEncryptionKeyResolver;
let containerDefinition: ContainerDefinition;
let clientEncryptionPolicy: ClientEncryptionPolicy;

describe("dotnet test cases", () => {
  before(async () => {
    // await removeAllDatabases();
    testKeyEncryptionKeyResolver = new MockKeyVaultEncryptionKeyResolver();
    metadata1 = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "key1",
      "tempmetadata1",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    metadata2 = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "key2",
      "tempmetadata2",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    encryptionClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: testKeyEncryptionKeyResolver,
      encryptionKeyResolverName: testKeyVault,
    });
    database = (await encryptionClient.databases.createIfNotExists({ id: randomUUID() })).database;
    console.log(`database created ${database.id}`);
    const revokedKekMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "revokedKek",
      "revokedKek-metadata",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    await testCreateClientEncryptionKey("key1", metadata1);
    await testCreateClientEncryptionKey("key2", metadata2);
    console.log("client encryption keys created");
    await testCreateClientEncryptionKey("keyWithRevokedKek", revokedKekMetadata);
    const key1Paths = [
      "/PK",
      "/sensitive_NestedObjectFormatL1",
      "/sensitive_IntFormat",
      "/sensitive_DateFormat",
      "/sensitive_FloatFormat",
      "/sensitive_ArrayMultiTypes",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const key2Paths = [
      "/id",
      "/sensitive_DecimalFormat",
      "/sensitive_BoolFormat",
      "/sensitive_IntMultiDimArray",
      "/sensitive_ObjectArrayType",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key2",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const paths = key1Paths.concat(key2Paths);
    // paths.push(
    //   new ClientEncryptionIncludedPath(
    //     "/sensitive_ArrayFormat",
    //     "keyWithRevokedKek",
    //     EncryptionType.DETERMINISTIC,
    //     EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    //   ),
    // );
    clientEncryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    containerDefinition = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };

    const containerDefinitionForChangeFeed = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    encryptionContainer = (await database.containers.createIfNotExists(containerDefinition))
      .container;
    encryptionContainerForChangeFeed = (
      await database.containers.createIfNotExists(containerDefinitionForChangeFeed)
    ).container;

    await encryptionContainer.initializeEncryption();
    await encryptionContainerForChangeFeed.initializeEncryption();
  });

  beforeEach(async () => {
    const iterator = encryptionContainer.items.readAll();
    const { resources: items } = await iterator.fetchAll();
    if (items.length > 0) {
      for (const item of items) {
        await encryptionContainer.item(item.id, item.PK).delete();
      }
    }
  });

  it("create client encryption included paths and policy", async () => {
    let path = new ClientEncryptionIncludedPath(
      "/id",
      "key1",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    // check policy format version
    const policy = new ClientEncryptionPolicy([path]);
    const testcontainer = (
      await database.containers.createIfNotExists({
        id: randomUUID(),
        clientEncryptionPolicy: policy,
      })
    ).container;
    try {
      await testcontainer.initializeEncryption();
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Encryption of partition key or id is only supported with policy format version 2",
        ),
      );
    }
    await testcontainer.delete();

    path = new ClientEncryptionIncludedPath(
      "id",
      "key1",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    // check invalid path
    try {
      new ClientEncryptionPolicy([path]);
    } catch (err) {
      assert.ok(
        err.message.includes("Path in ClientEncryptionIncludedPath needs to start with '/'"),
      );
    }
    path = new ClientEncryptionIncludedPath(
      "/id",
      "",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    // check empty key
    try {
      new ClientEncryptionPolicy([path]);
    } catch (err) {
      assert.ok(
        err.message.includes(
          "ClientEncryptionKeyId needs to be defined in ClientEncryptionIncludedPath.",
        ),
      );
    }
  });

  it("encryption bulk operation", async () => {
    const docToCreate = TestDoc.create();

    const { resource: docToReplace } = await testCreateItem(encryptionContainer);
    docToReplace.nonsensitive = randomUUID();
    docToReplace.sensitive_StringFormat = randomUUID();

    const { resource: docToUpsert } = await testCreateItem(encryptionContainer);
    docToUpsert.nonsensitive = randomUUID();
    docToUpsert.sensitive_StringFormat = randomUUID();

    // doc not created before
    const docToUpsert2 = TestDoc.create();

    const { resource: docToDelete } = await testCreateItem(encryptionContainer);

    const clientWithBulk = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });

    const databaseWithBulk = (await clientWithBulk.databases.createIfNotExists({ id: database.id }))
      .database;
    const encryptionContainerWithBulk = (
      await databaseWithBulk.containers.createIfNotExists({ id: encryptionContainer.id })
    ).container;

    const operations = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: JSON.parse(JSON.stringify(docToCreate)),
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: docToUpsert2.PK,
        resourceBody: JSON.parse(JSON.stringify(docToUpsert2)),
      },
      {
        operationType: BulkOperationType.Replace,
        partitionKey: docToReplace.PK,
        id: docToReplace.id,
        resourceBody: JSON.parse(JSON.stringify(docToReplace)),
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: docToUpsert.PK,
        resourceBody: JSON.parse(JSON.stringify(docToUpsert)),
      },
      {
        operationType: BulkOperationType.Delete,
        id: docToDelete.id,
        partitionKey: docToDelete.PK,
      },
    ];

    const response = await encryptionContainerWithBulk.items.bulk(operations);
    console.log(response);
    assert.equal(StatusCodes.Created, response[0].statusCode);
    verifyExpectedDocResponse(docToCreate, response[0].resourceBody);
    assert.equal(StatusCodes.Created, response[1].statusCode);
    verifyExpectedDocResponse(docToUpsert2, response[1].resourceBody);
    assert.equal(StatusCodes.Ok, response[2].statusCode);
    verifyExpectedDocResponse(new TestDoc(docToReplace), response[2].resourceBody);
    assert.equal(StatusCodes.Ok, response[3].statusCode);
    verifyExpectedDocResponse(new TestDoc(docToUpsert), response[3].resourceBody);
    assert.equal(StatusCodes.NoContent, response[4].statusCode);
    assert.isNotObject(response[4].resourceBody);
    clientWithBulk.dispose();
  });

  it("encryption create client encryption key", async () => {
    let cekId = "anotherCek";
    let testmetadata1 = new EncryptionKeyWrapMetadata(
      testKeyVault,
      cekId,
      "testmetadata1",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    const clientEncryptionKeyProperties = (
      await testCreateClientEncryptionKey(cekId, testmetadata1)
    ).clientEncryptionKeyProperties;

    assert.ok(
      compareMetadata(testmetadata1, clientEncryptionKeyProperties.encryptionKeyWrapMetadata),
    );

    testmetadata1 = new EncryptionKeyWrapMetadata(
      testKeyVault,
      cekId,
      "testmetadata2",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    try {
      await testCreateClientEncryptionKey(cekId, testmetadata1);
      assert.fail("creating another key with same encryption key id should fail");
    } catch (error) {
      assert.equal(StatusCodes.Conflict, error.code);
    }

    cekId = "testAkvKid";
    const encryptionCosmosClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    let metadata = new EncryptionKeyWrapMetadata(
      EncryptionKeyResolverName.AzureKeyVault,
      "key1",
      "https://testkeyvault.vault.azure.net/keys/testkey/12345678",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    const database1 = (
      await encryptionCosmosClient.databases.createIfNotExists({ id: randomUUID() })
    ).database;
    let clientEncryptionKeyResponse = await database1.createClientEncryptionKey(
      cekId,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      metadata,
    );
    assert.equal(StatusCodes.Created, clientEncryptionKeyResponse.statusCode);
    metadata = new EncryptionKeyWrapMetadata(
      EncryptionKeyResolverName.AzureKeyVault,
      "key1",
      "https://testkeyvault.vault.azure.net/keys/testkey/9101112",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    clientEncryptionKeyResponse = await database1.rewrapClientEncryptionKey(cekId, metadata);
    assert.equal(StatusCodes.Ok, clientEncryptionKeyResponse.statusCode);
    encryptionCosmosClient.dispose();
  });

  it("rewrap client encryption key", async () => {
    const cekId = "rewrapkeytest";
    const metadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      cekId,
      "testmetadata1",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    let clientEncryptionKeyProperties = (await testCreateClientEncryptionKey(cekId, metadata))
      .clientEncryptionKeyProperties;
    assert.ok(
      compareMetadata(
        new EncryptionKeyWrapMetadata(
          testKeyVault,
          cekId,
          metadata.value,
          KeyEncryptionKeyAlgorithm.RSA_OAEP,
        ),
        clientEncryptionKeyProperties.encryptionKeyWrapMetadata,
      ),
    );
    const updatedMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      cekId,
      "metadata" + "updatedmetadata",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    clientEncryptionKeyProperties = (await testRewrapClientEncryptionKey(cekId, updatedMetadata))
      .clientEncryptionKeyProperties;
    // check if cek is wrapped with updated metadata
    assert.ok(
      compareMetadata(
        new EncryptionKeyWrapMetadata(
          testKeyVault,
          cekId,
          updatedMetadata.value,
          KeyEncryptionKeyAlgorithm.RSA_OAEP,
        ),
        clientEncryptionKeyProperties.encryptionKeyWrapMetadata,
      ),
    );
  });

  it("create encrypted item with null property", async () => {
    const testkeyEncryptionKeyResolver = new MockKeyVaultEncryptionKeyResolver();
    const client = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: testkeyEncryptionKeyResolver,
      encryptionKeyResolverName: testKeyVault,
    });
    const testdatabase = (await client.database(database.id).read()).database;
    const testcontainer = (await testdatabase.container(encryptionContainer.id).read()).container;
    let testDoc = TestDoc.create();
    testDoc.sensitive_ArrayFormat = null;
    testDoc.sensitive_StringFormat = null;
    testDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2.sensitive_StringFormatL2 =
      null;

    let createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    // query on document with null property

    const queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where c.sensitive_StringFormat = @sensitive_StringFormat AND c.sensitive_ArrayFormat = @sensitive_ArrayFormat" +
        " AND c.sensitive_IntFormat = @sensitive_IntFormat" +
        " AND c.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2.sensitive_StringFormatL2 = @sensitive_StringFormatL2" +
        " AND c.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2.sensitive_DecimalFormatL2 = @sensitive_DecimalFormatL2",
    );
    queryBuilder.addStringParameter(
      "@sensitive_StringFormat",
      testDoc.sensitive_StringFormat,
      "/sensitive_StringFormat",
    );
    queryBuilder.addArrayParameter(
      "@sensitive_ArrayFormat",
      testDoc.sensitive_ArrayFormat,
      "/sensitive_ArrayFormat",
    );
    queryBuilder.addIntegerParameter(
      "@sensitive_IntFormat",
      testDoc.sensitive_IntFormat,
      "/sensitive_IntFormat",
    );
    queryBuilder.addStringParameter(
      "@sensitive_StringFormatL2",
      testDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
        .sensitive_StringFormatL2,
      "/sensitive_NestedObjectFormatL1",
    );
    queryBuilder.addFloatParameter(
      "@sensitive_DecimalFormatL2",
      testDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
        .sensitive_DecimalFormatL2,
      "/sensitive_NestedObjectFormatL1",
    );

    const expectedDocList: TestDoc[] = [];
    expectedDocList.push(new TestDoc(testDoc));
    await validateQueryResults(testcontainer, queryBuilder, expectedDocList);

    // no access to key -> DOUBT
    testkeyEncryptionKeyResolver.revokeAccessSet = true;
    testDoc = TestDoc.create();
    testDoc.sensitive_ArrayFormat = null;
    testDoc.sensitive_StringFormat = null;

    createResponse = await testcontainer.items.create(testDoc);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    testkeyEncryptionKeyResolver.revokeAccessSet = false;
    client.dispose();
  });

  it("encryption create item and query", async () => {
    const testDoc = (await testCreateItem(encryptionContainer)).resource;
    await verifyItemByRead(encryptionContainer, testDoc);

    const expectedDoc = new TestDoc(testDoc);
    const expectedDocList: TestDoc[] = [];
    expectedDocList.push(expectedDoc);
    let queryBuilder = new EncryptionQueryBuilder("SELECT * FROM c");
    await validateQueryResults(encryptionContainer, queryBuilder, expectedDocList);
    queryBuilder = new EncryptionQueryBuilder(
      "select * from c where c.id = @theId and c.PK = @thePK",
    );

    queryBuilder.addStringParameter("@theId", expectedDoc.id, "/id");
    queryBuilder.addStringParameter("@thePK", expectedDoc.PK, "/PK");

    await validateQueryResults(encryptionContainer, queryBuilder, expectedDocList);
    queryBuilder = new EncryptionQueryBuilder(
      `SELECT * FROM c WHERE c.nonsensitive = '${expectedDoc.nonsensitive}'`,
    );
    await validateQueryResults(encryptionContainer, queryBuilder, expectedDocList);

    // query on non encrypted property
    const querySpec = {
      query: `SELECT * FROM c WHERE c.nonsensitive = '${expectedDoc.nonsensitive}'`,
    };
    await validateQueryResults(encryptionContainer, querySpec, expectedDocList);

    // response should be null without using addIntegerParameter method
    queryBuilder = new EncryptionQueryBuilder(
      `SELECT * FROM c WHERE c.sensitive_IntFormat = '${expectedDoc.sensitive_IntFormat}'`,
    );
    await validateQueryResults(encryptionContainer, queryBuilder, null);
  });

  it.skip("query on encrypted properties", async () => {
    console.log("START");
    const containerProperties = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const encryptionQueryContainer = (await database.containers.create(containerProperties))
      .container;
    encryptionQueryContainer.initializeEncryption();
    const testDoc1 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);
    const testDoc2 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);
    const testDoc3 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);

    // string/int
    const stringArray = [testDoc1.sensitive_StringFormat, "randomValue", null];

    let queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where array_contains(@sensitive_StringFormat, c.sensitive_StringFormat) " +
        "AND c.sensitive_NestedObjectFormatL1 = @sensitive_NestedObjectFormatL1",
    );

    queryBuilder.addArrayParameter(
      "@sensitive_StringFormat",
      stringArray,
      "/sensitive_StringFormat",
    );

    queryBuilder.addArrayParameter(
      "@sensitive_IntArray",
      testDoc1.sensitive_IntArray,
      "/sensitive_IntArray",
    );

    queryBuilder.addObjectParameter(
      "@sensitive_NestedObjectFormatL1",
      testDoc1.sensitive_NestedObjectFormatL1,
      "/sensitive_NestedObjectFormatL1",
    );
    await validateQueryResults(encryptionQueryContainer, queryBuilder, [testDoc1]);

    // bool/float
    queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where c.sensitive_BoolFormat = @sensitive_BoolFormat and c.sensitive_FloatFormat = @sensitive_FloatFormat",
    );
    queryBuilder.addBooleanParameter(
      "@sensitive_BoolFormat",
      testDoc1.sensitive_BoolFormat,
      "/sensitive_BoolFormat",
    );
    queryBuilder.addFloatParameter(
      "@sensitive_FloatFormat",
      testDoc1.sensitive_FloatFormat,
      "/sensitive_FloatFormat",
    );
    await validateQueryResults(encryptionQueryContainer, queryBuilder, [
      testDoc1,
      testDoc2,
      testDoc3,
    ]);

    // with encrypted and non encrypted properties
    const testDoc4 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);
    queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where c.nonsensitive = @nonsensitive and c.sensitive_IntFormat = @sensitive_IntFormat",
    );
    queryBuilder.addStringParameter("@nonsensitive", testDoc4.nonsensitive, "/nonsensitive");
    queryBuilder.addIntegerParameter(
      "@sensitive_IntFormat",
      testDoc4.sensitive_IntFormat,
      "/sensitive_IntFormat",
    );
    await validateQueryResults(encryptionQueryContainer, queryBuilder, [testDoc4]);

    // date
    queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where c.sensitive_DateFormat = @sensitive_DateFormat",
    );
    queryBuilder.addDateParameter(
      "@sensitive_DateFormat",
      testDoc1.sensitive_DateFormat,
      "/sensitive_DateFormat",
    );
    await validateQueryResults(encryptionQueryContainer, queryBuilder, null);
  });

  it("encryption batch CRUD", async () => {
    const partitionKey = "thePK";
    const doc1ToCreate = TestDoc.create(partitionKey);

    const doc1ToReplace = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    doc1ToReplace.nonsensitive = randomUUID();
    doc1ToReplace.sensitive_StringFormat = randomUUID();

    const doc2ToReplace = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    doc2ToReplace.nonsensitive = randomUUID();
    doc2ToReplace.sensitive_StringFormat = randomUUID();

    const doc1ToUpsert = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    doc1ToUpsert.nonsensitive = randomUUID();
    doc1ToUpsert.sensitive_StringFormat = randomUUID();

    const docToDelete = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );

    const docToPatch = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    docToPatch.sensitive_StringFormat = randomUUID();
    docToPatch.sensitive_DecimalFormat = 11.11;
    const patchOperations = {
      operations: [
        {
          op: PatchOperationType.replace,
          path: "/sensitive_StringFormat",
          value: docToPatch.sensitive_StringFormat,
        },
        {
          op: PatchOperationType.replace,
          path: "/sensitive_DecimalFormat",
          value: docToPatch.sensitive_DecimalFormat,
        },
      ],
    };
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: JSON.parse(JSON.stringify(doc1ToCreate)),
      },
      {
        operationType: "Upsert",
        resourceBody: JSON.parse(JSON.stringify(doc1ToUpsert)),
      },
      {
        operationType: "Replace",
        id: doc1ToReplace.id,
        resourceBody: JSON.parse(JSON.stringify(doc1ToReplace)),
      },
      {
        operationType: "Patch",
        id: docToPatch.id,
        resourceBody: patchOperations,
      },
      {
        operationType: "Delete",
        id: docToDelete.id,
      },
    ];

    const response = await encryptionContainer.items.batch(operations, partitionKey);
    assert.equal(StatusCodes.Ok, response.code);

    const doc1 = response.result[0];

    verifyExpectedDocResponse(doc1ToCreate, doc1.resourceBody);

    const doc2 = response.result[1];
    verifyExpectedDocResponse(doc1ToUpsert, doc2.resourceBody);

    const doc3 = response.result[2];
    verifyExpectedDocResponse(doc1ToReplace, doc3.resourceBody);

    const doc4 = response.result[3];
    verifyExpectedDocResponse(docToPatch, doc4.resourceBody);

    await verifyItemByRead(encryptionContainer, doc1ToCreate);
    await verifyItemByRead(encryptionContainer, doc1ToReplace);
    await verifyItemByRead(encryptionContainer, doc1ToUpsert);
    await verifyItemByRead(encryptionContainer, docToPatch);

    const readResponse = await encryptionContainer.item(docToDelete.id, docToDelete.PK).read();
    assert.equal(StatusCodes.NotFound, readResponse.statusCode);
  });

  it("encryption batch conflict response", async () => {
    const partitionKey = "thePK";
    const doc1ToCreateAgain = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    doc1ToCreateAgain.nonsensitive = randomUUID();
    doc1ToCreateAgain.sensitive_StringFormat = randomUUID();

    const response = await encryptionContainer.items.batch(
      [
        {
          operationType: "Create",
          resourceBody: JSON.parse(JSON.stringify(doc1ToCreateAgain)),
        },
      ],
      partitionKey,
    );
    console.log(response);
    assert.equal(StatusCodes.Conflict, response.result[0].statusCode);
    assert.equal(1, response.result.length);
  });

  it("encryption patch items", async () => {
    const docPostPatching = new TestDoc((await testCreateItem(encryptionContainer)).resource);
    docPostPatching.nonsensitive = randomUUID();
    docPostPatching.nonsensitiveInt++;
    docPostPatching.sensitive_StringFormat = randomUUID();
    docPostPatching.sensitive_DateFormat = new Date();
    docPostPatching.sensitive_DecimalFormat = 11.11;
    docPostPatching.sensitive_IntArray[1] = 1;
    docPostPatching.sensitive_IntMultiDimArray[1][0] = 7;
    docPostPatching.sensitive_IntFormat = 2020;
    docPostPatching.sensitive_BoolFormat = false;
    docPostPatching.sensitive_FloatFormat = 2020.2;

    let patchOperations: PatchOperation[] = [
      {
        op: PatchOperationType.incr,
        path: "/nonsensitiveInt",
        value: 1,
      },
      {
        op: PatchOperationType.replace,
        path: "/nonsensitive",
        value: docPostPatching.nonsensitive,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_StringFormat",
        value: docPostPatching.sensitive_StringFormat,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_DateFormat",
        value: docPostPatching.sensitive_DateFormat,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_DecimalFormat",
        value: docPostPatching.sensitive_DecimalFormat,
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_IntArray/1",
        value: docPostPatching.sensitive_IntArray[1],
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_IntMultiDimArray/1/0",
        value: docPostPatching.sensitive_IntMultiDimArray[1][0],
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_IntFormat",
        value: docPostPatching.sensitive_IntFormat,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_BoolFormat",
        value: docPostPatching.sensitive_BoolFormat,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_FloatFormat",
        value: docPostPatching.sensitive_FloatFormat,
      },
    ];
    await testPatchItem(encryptionContainer, patchOperations, docPostPatching, StatusCodes.Ok);

    docPostPatching.sensitive_ArrayFormat = [
      {
        sensitive_ArrayIntFormat: 100,
        sensitive_ArrayDecimalFormat: 100.2,
      },
      {
        sensitive_ArrayIntFormat: 2222,
        sensitive_ArrayDecimalFormat: 2222.22,
      },
    ];
    docPostPatching.sensitive_ArrayMultiTypes[0][1] = {
      sensitive_NestedObjectFormatL0: {
        sensitive_IntFormatL0: 123,
        sensitive_DecimalFormatL0: 123.1,
      },
      sensitive_StringArrayMultiType: ["sensitivedata"],
      sensitive_ArrayMultiTypeDecimalFormat: 123.2,
      sensitive_IntArrayMultiType: [1, 2],
    };
    docPostPatching.sensitive_NestedObjectFormatL1 = {
      sensitive_IntArrayL1: [999, 100],
      sensitive_IntFormatL1: 1999,
      sensitive_DecimalFormatL1: 1.1,
      sensitive_ArrayFormatL1: [
        {
          sensitive_ArrayIntFormat: 0,
          sensitive_ArrayDecimalFormat: 0.1,
        },
        {
          sensitive_ArrayIntFormat: 0,
          sensitive_ArrayDecimalFormat: 0.5,
        },
        {
          sensitive_ArrayIntFormat: 1,
          sensitive_ArrayDecimalFormat: 2.1,
        },
        {
          sensitive_ArrayIntFormat: 2,
          sensitive_ArrayDecimalFormat: 3.1,
        },
      ],
    };
    // patch operation on nested path properties
    patchOperations = [
      {
        op: PatchOperationType.replace,
        path: "/sensitive_ArrayFormat/0",
        value: docPostPatching.sensitive_ArrayFormat[0],
      },
      {
        op: PatchOperationType.add,
        path: "/sensitive_ArrayFormat/1",
        value: docPostPatching.sensitive_ArrayFormat[1],
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_ArrayMultiTypes/0/1",
        value: docPostPatching.sensitive_ArrayMultiTypes[0][1],
      },
      {
        op: PatchOperationType.remove,
        path: "/sensitive_NestedObjectFormatL1/sensitive_NestedObjectFormatL2",
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_NestedObjectFormatL1/sensitive_ArrayFormatL1/0",
        value: docPostPatching.sensitive_NestedObjectFormatL1.sensitive_ArrayFormatL1[0],
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_NestedObjectFormatL1/sensitive_ArrayFormatL1/1",
        value: docPostPatching.sensitive_NestedObjectFormatL1.sensitive_ArrayFormatL1[1],
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_NestedObjectFormatL1/sensitive_DecimalFormatL1",
        value: docPostPatching.sensitive_NestedObjectFormatL1.sensitive_DecimalFormatL1,
      },
    ];
    await testPatchItem(encryptionContainer, patchOperations, docPostPatching, StatusCodes.Ok);

    patchOperations = [
      {
        op: PatchOperationType.incr,
        path: "/sensitive_IntFormat",
        value: 1,
      },
    ];
    try {
      await encryptionContainer.item(docPostPatching.id, docPostPatching.PK).patch(patchOperations);
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Increment patch operation is not allowed for encrypted path '/sensitive_IntFormat'",
        ),
      );
    }
  });

  it("Encryption RUD item", async () => {
    // upsert should create a new item
    const testDoc = new TestDoc(
      (await testUpsertItem(encryptionContainer, TestDoc.create(), StatusCodes.Created)).resource,
    );
    await verifyItemByRead(encryptionContainer, testDoc);
    testDoc.nonsensitive = randomUUID();
    testDoc.sensitive_StringFormat = randomUUID();

    // upsert should update the item
    const updatedDoc = new TestDoc(
      (await testUpsertItem(encryptionContainer, testDoc, StatusCodes.Ok)).resource,
    );
    await verifyItemByRead(encryptionContainer, updatedDoc);

    updatedDoc.nonsensitive = randomUUID();
    updatedDoc.sensitive_StringFormat = randomUUID();

    const replacedDoc = new TestDoc(
      (await testReplaceItem(encryptionContainer, updatedDoc)).resource,
    );
    await verifyItemByRead(encryptionContainer, replacedDoc);
    await testDeleteItem(encryptionContainer, replacedDoc);
  });

  it("validate Partition Key and ID encryption support", async () => {
    let paths = ["/PK", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    let clientEncryptionPolicyWithRevokedKek = new ClientEncryptionPolicy(paths, 2);
    let containerProperties = {
      id: "StringPKEncContainer",
      partitionKey: {
        paths: ["/id"],
      },
      clientEncryptionPolicy: clientEncryptionPolicyWithRevokedKek,
    };
    let testcontainer = (await database.containers.create(containerProperties)).container;
    await testcontainer.initializeEncryption();
    const testDoc = TestDoc.create();
    let createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    let readResponse = await testcontainer.item(testDoc.id, testDoc.id).read();
    assert.equal(StatusCodes.Ok, readResponse.statusCode);
    verifyExpectedDocResponse(testDoc, readResponse.resource);

    // encrypt float type PK
    paths = ["/sensitive_FloatFormat", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    clientEncryptionPolicyWithRevokedKek = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: "FloatPKEncContainer",
      partitionKey: {
        paths: ["/sensitive_FloatFormat"],
      },
      clientEncryptionPolicy: clientEncryptionPolicyWithRevokedKek,
    };
    testcontainer = (await database.containers.create(containerProperties)).container;
    await testcontainer.initializeEncryption();

    createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    readResponse = await testcontainer.item(testDoc.id, testDoc.sensitive_FloatFormat).read();
    assert.equal(StatusCodes.Ok, readResponse.statusCode);
    verifyExpectedDocResponse(testDoc, readResponse.resource);

    // encrypt boolean type PK
    paths = ["/sensitive_BoolFormat", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    clientEncryptionPolicyWithRevokedKek = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: "BoolPKEncContainer",
      partitionKey: {
        paths: ["/sensitive_BoolFormat"],
      },
      clientEncryptionPolicy: clientEncryptionPolicyWithRevokedKek,
    };
    testcontainer = (await database.containers.create(containerProperties)).container;
    await testcontainer.initializeEncryption();

    createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    readResponse = await testcontainer.item(testDoc.id, testDoc.sensitive_BoolFormat).read();
    assert.equal(StatusCodes.Ok, readResponse.statusCode);
    verifyExpectedDocResponse(testDoc, readResponse.resource);
  });

  it("create and delete database with encryption enabled client without cek", async () => {
    const testdatabase = (await encryptionClient.databases.create({ id: "NoCEKDatabase" }))
      .database;
    const containerProperties = {
      id: "NoCEPContainer",
      partitionKey: {
        paths: ["/PK"],
      },
    };
    const testcontainer = (await testdatabase.containers.create(containerProperties)).container;
    await testcontainer.initializeEncryption();
    const testDoc = TestDoc.create();
    const createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);
    await testdatabase.delete();
  });

  // tests non-encrypted create operation with encrypted client
  it("encryption create item with no client encryption policy", async () => {
    await testCreateItem(encryptionContainer);
    const containerProperties = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/PK"],
      },
    };
    const encryptionContainerWithNoPolicy = (await database.containers.create(containerProperties))
      .container;
    await encryptionContainerWithNoPolicy.initializeEncryption();

    const testDoc = TestDoc.create();
    const createResponse = await encryptionContainerWithNoPolicy.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    const queryBuilder = new EncryptionQueryBuilder(
      `SELECT * FROM c where c.sensitive_StringFormat = @sensitive_StringFormat AND c.sensitive_IntFormat = @sensitive_IntFormat`,
    );
    queryBuilder.addStringParameter(
      "@sensitive_StringFormat",
      testDoc.sensitive_StringFormat,
      "/sensitive_StringFormat",
    );
    queryBuilder.addIntegerParameter(
      "@sensitive_IntFormat",
      testDoc.sensitive_IntFormat,
      "/sensitive_IntFormat",
    );
    const expectedDocList = [testDoc];
    await validateQueryResults(encryptionContainerWithNoPolicy, queryBuilder, expectedDocList);
    await encryptionContainerWithNoPolicy.delete();
  });

  it("encryption validate policy refresh post container delete with bulk", async () => {
    // create a container with 1st client
    let paths = [
      "/sensitive_IntArray",
      "/sensitive_NestedObjectFormatL1",
      "/sensitive_DoubleFormat",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    let encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    let containerProperties = {
      id: randomUUID(),
      partitionKey: "/sensitive_DoubleFormat",
      clientEncryptionPolicy: encryptionPolicy,
    };
    const encryptionContainerToDelete = (await database.containers.create(containerProperties))
      .container;
    await encryptionContainerToDelete.initializeEncryption();
    // create a document with 2nd client on same database and container
    const otherClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase = otherClient.database(database.id);
    const otherEncryptionContainer = otherDatabase.container(encryptionContainerToDelete.id);
    const testDoc = TestDoc.create();
    const createResponse = await otherEncryptionContainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);
    // Client 1 Deletes the Container referenced in Client 2 and Recreate with different policy
    await database.container(encryptionContainerToDelete.id).delete();
    paths = [
      new ClientEncryptionIncludedPath(
        "/sensitive_StringFormat",
        "key1",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/sensitive_BoolFormat",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/PK",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    ];
    encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: encryptionContainerToDelete.id,
      partitionKey: "/PK",
      clientEncryptionPolicy: encryptionPolicy,
    };
    await database.containers.create(containerProperties);
    try {
      await testCreateItem(encryptionContainerToDelete);
      assert.fail("create operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    const docToReplace = (await testCreateItem(encryptionContainerToDelete)).resource;
    docToReplace.sensitive_StringFormat = "docToBeReplaced";
    const docToUpsert = (await testCreateItem(encryptionContainerToDelete)).resource;
    docToUpsert.sensitive_StringFormat = "docToBeUpserted";
    const operations = [
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: docToUpsert.PK,
        resourceBody: JSON.parse(JSON.stringify(docToUpsert)),
      },
      {
        operationType: BulkOperationType.Replace,
        id: docToReplace.id,
        partitionKey: docToReplace.PK,
        resourceBody: JSON.parse(JSON.stringify(docToReplace)),
      },
      {
        operationType: BulkOperationType.Create,
        resourceBody: JSON.parse(JSON.stringify(TestDoc.create())),
      },
    ];
    try {
      await otherEncryptionContainer.items.bulk(operations);
    } catch (error) {
      assert.ok(
        error.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    // retry bulk operation with 2nd client
    const res = await otherEncryptionContainer.items.bulk(operations);
    assert.equal(StatusCodes.Ok, res[0].statusCode);
    assert.equal(StatusCodes.Ok, res[1].statusCode);
    assert.equal(StatusCodes.Created, res[2].statusCode);
    await verifyItemByRead(encryptionContainerToDelete, docToReplace);
    await testCreateItem(encryptionContainerToDelete);
    await verifyItemByRead(encryptionContainerToDelete, docToUpsert);
    // validate if the right policy was used, by reading them all back
    const response = await otherEncryptionContainer.items.readAll().fetchAll();
    console.log("query response: ", response);
    otherClient.dispose();
  });

  it("encryption validate policy refresh post container delete with patch", async () => {
    // create a container with 1st client
    let paths = [
      "/sensitive_IntArray",
      "/sensitive_NestedObjectFormatL1",
      "/sensitive_DoubleFormat",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    let encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    let containerProperties = {
      id: randomUUID(),
      partitionKey: "/sensitive_DoubleFormat",
      clientEncryptionPolicy: encryptionPolicy,
    };
    const encryptionContainerToDelete = (await database.containers.create(containerProperties))
      .container;
    await encryptionContainerToDelete.initializeEncryption();
    // create a document with 2nd client on same database and container
    const otherClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase = otherClient.database(database.id);
    const otherEncryptionContainer = otherDatabase.container(encryptionContainerToDelete.id);
    const testDoc = TestDoc.create();
    const createResponse = await otherEncryptionContainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);
    // Client 1 Deletes the Container referenced in Client 2 and Recreate with different policy
    await database.container(encryptionContainerToDelete.id).delete();
    paths = [
      new ClientEncryptionIncludedPath(
        "/sensitive_StringFormat",
        "key1",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/sensitive_BoolFormat",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/PK",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    ];
    encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: encryptionContainerToDelete.id,
      partitionKey: "/PK",
      clientEncryptionPolicy: encryptionPolicy,
    };
    await database.containers.create(containerProperties);
    try {
      await testCreateItem(encryptionContainerToDelete);
      assert.fail("create operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }

    const docPostPatching = (await testCreateItem(encryptionContainerToDelete)).resource;
    docPostPatching.nonsensitive = randomUUID();
    docPostPatching.nonSensitiveInt++;
    docPostPatching.sensitive_StringFormat = randomUUID();
    docPostPatching.sensitive_DateFormat = new Date();
    docPostPatching.sensitive_IntArray[1] = 19877;
    docPostPatching.sensitive_IntMultiDimArray[1][0] = 2020;
    docPostPatching.sensitive_IntFormat = 2020;
    docPostPatching.sensitive_NestedObjectFormatL1 = {
      sensitive_IntArrayL1: [999, 100],
      sensitive_IntFormatL1: 1999,
      sensitive_DecimalFormatL1: 1991.1,
      sensitive_ArrayFormatL1: [
        {
          sensitive_ArrayIntFormat: 0,
          sensitive_ArrayDecimalFormat: 0.1,
        },
        {
          sensitive_ArrayIntFormat: 1,
          sensitive_ArrayDecimalFormat: 2.1,
        },
        {
          sensitive_ArrayIntFormat: 2,
          sensitive_ArrayDecimalFormat: 3.1,
        },
      ],
    };
    const patchOperations = [
      {
        op: PatchOperationType.incr,
        path: "/nonSensitiveInt",
        value: 1,
      },
      {
        op: PatchOperationType.replace,
        path: "/nonsensitive",
        value: docPostPatching.nonsensitive,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_StringFormat",
        value: docPostPatching.sensitive_StringFormat,
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_DateFormat",
        value: docPostPatching.sensitive_DateFormat,
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_IntArray/1",
        value: docPostPatching.sensitive_IntArray[1],
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_IntMultiDimArray/1/0",
        value: docPostPatching.sensitive_IntMultiDimArray[1][0],
      },
      {
        op: PatchOperationType.replace,
        path: "/sensitive_IntFormat",
        value: docPostPatching.sensitive_IntFormat,
      },
      {
        op: PatchOperationType.remove,
        path: "/sensitive_NestedObjectFormatL1/sensitive_NestedObjectFormatL2",
        value: docPostPatching.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2,
      },
      {
        op: PatchOperationType.set,
        path: "/sensitive_NestedObjectFormatL1/sensitive_ArrayFormatL1/0",
        value: docPostPatching.sensitive_NestedObjectFormatL1.sensitive_ArrayFormatL1[0],
      },
    ];
    try {
      await testPatchItem(
        otherEncryptionContainer,
        patchOperations,
        docPostPatching,
        StatusCodes.Ok,
      );
      assert.fail("patch operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    await testPatchItem(otherEncryptionContainer, patchOperations, docPostPatching, StatusCodes.Ok);
    otherClient.dispose();
  });

  it("encryption validate policy refresh post container delete with query", async () => {
    // create a container with 1st client
    let paths = [
      "/sensitive_IntArray",
      "/sensitive_NestedObjectFormatL1",
      "/sensitive_DoubleFormat",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    let encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    let containerProperties = {
      id: randomUUID(),
      partitionKey: "/sensitive_DoubleFormat",
      clientEncryptionPolicy: encryptionPolicy,
    };
    const encryptionContainerToDelete = (await database.containers.create(containerProperties))
      .container;
    await encryptionContainerToDelete.initializeEncryption();
    // create a document with 2nd client on same database and container
    const otherClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase = otherClient.database(database.id);
    const otherEncryptionContainer = otherDatabase.container(encryptionContainerToDelete.id);
    const testDoc = TestDoc.create();
    let createResponse = await otherEncryptionContainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);
    // Client 1 Deletes the Container referenced in Client 2 and Recreate with different policy
    await database.container(encryptionContainerToDelete.id).delete();
    paths = [
      new ClientEncryptionIncludedPath(
        "/sensitive_StringFormat",
        "key1",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/sensitive_BoolFormat",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/PK",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    ];
    encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: encryptionContainerToDelete.id,
      partitionKey: "/PK",
      clientEncryptionPolicy: encryptionPolicy,
    };
    await database.containers.create(containerProperties);
    try {
      await testCreateItem(encryptionContainerToDelete);
      assert.fail("create operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    createResponse = await encryptionContainerToDelete.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    // check w.r.t to query if we are able to fail and update the policy
    try {
      await validateQueryResults(
        otherEncryptionContainer,
        new EncryptionQueryBuilder("SELECT * FROM c"),
        [testDoc],
      );
      assert.fail("query operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    // previous failure would have updated the policy in the cache.
    await validateQueryResults(
      otherEncryptionContainer,
      new EncryptionQueryBuilder("SELECT * FROM c"),
      [testDoc],
    );
    otherClient.dispose();
  });

  it("encryption validate policy refresh post container delete with batch", async () => {
    // create a container with 1st client
    let paths = [
      "/sensitive_IntArray",
      "/sensitive_NestedObjectFormatL1",
      "/sensitive_DoubleFormat",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "key1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    let encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    let containerProperties = {
      id: randomUUID(),
      partitionKey: "/sensitive_DoubleFormat",
      clientEncryptionPolicy: encryptionPolicy,
    };
    const encryptionContainerToDelete = (await database.containers.create(containerProperties))
      .container;
    await encryptionContainerToDelete.initializeEncryption();
    // create a document with 2nd client on same database and container
    const otherClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase = otherClient.database(database.id);
    const otherEncryptionContainer = otherDatabase.container(encryptionContainerToDelete.id);
    let testDoc = TestDoc.create();
    const createResponse = await otherEncryptionContainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);
    // Client 1 Deletes the Container referenced in Client 2 and Recreate with different policy
    await database.container(encryptionContainerToDelete.id).delete();
    paths = [
      new ClientEncryptionIncludedPath(
        "/sensitive_StringFormat",
        "key1",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/sensitive_BoolFormat",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
      new ClientEncryptionIncludedPath(
        "/PK",
        "key2",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    ];
    encryptionPolicy = new ClientEncryptionPolicy(paths, 2);
    containerProperties = {
      id: encryptionContainerToDelete.id,
      partitionKey: "/PK",
      clientEncryptionPolicy: encryptionPolicy,
    };
    await database.containers.create(containerProperties);
    try {
      await testCreateItem(encryptionContainerToDelete);
      assert.fail("create operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    testDoc = new TestDoc((await testCreateItem(encryptionContainerToDelete)).resource);
    const partitionKey = "thePK";
    //   batchResponse = await otherEncryptionContainer.CreateTransactionalBatch(new Cosmos.PartitionKey(partitionKey))
    //  .CreateItem(doc1ToCreate)
    //  .CreateItemStream(doc2ToCreate.ToStream())
    //  .ReadItem(doc1ToCreate.Id)
    //  .DeleteItem(doc2ToCreate.Id)
    //  .ExecuteAsync();
    const doc1ToCreate = TestDoc.create(partitionKey);
    const doc2ToCreate = TestDoc.create(partitionKey);
    // check w.r.t to Batch if we are able to fail and update the policy.
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: JSON.parse(JSON.stringify(doc1ToCreate)),
      },
      {
        operationType: "Create",
        resourceBody: JSON.parse(JSON.stringify(doc2ToCreate)),
      },
      {
        operationType: "Read",
        id: doc1ToCreate.id,
      },
      {
        operationType: "Delete",
        id: doc2ToCreate.id,
      },
    ];
    let batchResponse = null;
    try {
      batchResponse = await otherEncryptionContainer.items.batch(operations, partitionKey);
      assert.fail("batch operation should fail");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
        ),
      );
    }
    batchResponse = await otherEncryptionContainer.items.batch(operations, partitionKey);
    assert.equal(StatusCodes.Ok, batchResponse.code);
    const doc1 = batchResponse.result[0].resourceBody;
    verifyExpectedDocResponse(doc1ToCreate, doc1);
    const doc2 = batchResponse.result[1].resourceBody;
    verifyExpectedDocResponse(doc2ToCreate, doc2);
    otherClient.dispose();
  });

  it.skip("encryption validate policy refresh post database delete", async () => {
    const mainCLient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    let keyWrapMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "myCek",
      "mymetadata1",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    let mainDatabase = (await mainCLient.databases.createIfNotExists({ id: randomUUID() }))
      .database;
    await mainDatabase.createClientEncryptionKey(
      keyWrapMetadata.name,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      keyWrapMetadata,
    );

    const paths = [
      "/sensitive_StringFormat",
      "/sensitive_ArrayFormat",
      "/sensitive_NestedObjectFormatL1",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "myCek",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const encryptionPolicy = new ClientEncryptionPolicy(paths);
    let containerDef: ContainerDefinition = {
      id: "containerToBeDeleted",
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: encryptionPolicy,
    };
    const encryptionContainerToDelete = (
      await mainDatabase.containers.createIfNotExists(containerDef)
    ).container;
    await encryptionContainerToDelete.initializeEncryption();
    await testCreateItem(encryptionContainerToDelete);

    const otherClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase = otherClient.database(mainDatabase.id);
    const otherEncryptionContainer = otherDatabase.container(encryptionContainerToDelete.id);
    await testCreateItem(otherEncryptionContainer);

    // Client 1 Deletes the Database and  Container referenced in Client 2 and Recreate with different policy
    // delete database and recreate with same key name
    await mainDatabase.delete();
    mainDatabase = (await mainCLient.databases.createIfNotExists({ id: "databaseToBeDeleted" }))
      .database;
    keyWrapMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "myCek",
      "mymetadata2",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    await mainDatabase.createClientEncryptionKey(
      keyWrapMetadata.name,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      keyWrapMetadata,
    );
    const newModifiedPaths = [
      "/sensitive_IntArray",
      "/sensitive_DateFormat",
      "/sensitive_BoolFormat",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "myCek",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    clientEncryptionPolicy = new ClientEncryptionPolicy(newModifiedPaths);
    containerDef = {
      id: encryptionContainerToDelete.id,
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    await mainDatabase.containers.createIfNotExists(containerDef);

    try {
      await testCreateItem(encryptionContainerToDelete);
      assert.fail("create operation should fail");
    } catch (error) {
      console.log("error occurred");
      error.message.includes(
        "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
      );
    }
    // retrying should succeed
    let testDoc = new TestDoc((await testCreateItem(encryptionContainerToDelete)).resource);

    // try from other container. shoild fail due to policy mismatch
    try {
      await verifyItemByRead(otherEncryptionContainer, testDoc);
      assert.fail("read operation should fail");
    } catch (error) {
      error.message.includes(
        "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container.",
      );
    }
    // retrying should succeed
    await verifyItemByRead(otherEncryptionContainer, testDoc);

    // create new container in other client.
    // The test basically validates if the new key created is referenced, Since the other client would have had the old key cached.
    // and here we would not hit the incorrect container rid issue.
    const newModifiedPath2 = new ClientEncryptionIncludedPath(
      "/PK",
      "myCek",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const otherEncryptionContainer2 = (
      await otherDatabase.containers.createIfNotExists({
        id: "otherContainer2",
        partitionKey: "/PK",
        clientEncryptionPolicy: new ClientEncryptionPolicy([newModifiedPath2]),
      })
    ).container;

    // create an item
    const newDoc = new TestDoc((await testCreateItem(otherEncryptionContainer2)).resource);
    const otherClient2 = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
      encryptionKeyResolverName: testKeyVault,
    });
    const otherDatabase2 = otherClient2.database(mainDatabase.id);
    const otherEncryptionContainer3 = otherDatabase2.container(otherEncryptionContainer2.id);
    await verifyItemByRead(otherEncryptionContainer3, newDoc);

    // validate from other client that we indeed are using the key with metadata 2
    const otherEncryptionContainerFromClient2 = otherDatabase2.container(
      encryptionContainerToDelete.id,
    );
    await verifyItemByRead(otherEncryptionContainerFromClient2, testDoc);

    // previous referenced container
    await testCreateItem(otherEncryptionContainer);

    await testCreateItem(otherEncryptionContainer);
    await verifyItemByRead(otherEncryptionContainer, testDoc);

    testDoc = new TestDoc((await testCreateItem(otherEncryptionContainer)).resource);

    // to be sure if it was indeed encrypted with the new key.
    await verifyItemByRead(encryptionContainerToDelete, testDoc);

    // validate if the right policy was used, by reading them all back
    await encryptionContainerToDelete.items.readAll().fetchAll();
    await otherEncryptionContainer.items.readAll().fetchAll();

    await mainCLient.database(mainDatabase.id).delete();

    mainCLient.dispose();
    otherClient.dispose();
    otherClient2.dispose();
  });

  it.skip("test1234", async () => {
    // create a container with 1st client
    const client1 = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
    });
    const database1 = (await client1.databases.createIfNotExists({ id: "test4" })).database;
    // create container from clinet 1
    const container1 = await database1.containers.createIfNotExists({
      id: "test1",
      partitionKey: "/PK1",
    });

    await container1.container.items.create({ id: "1", PK1: "1" });
    console.log("container1: ", container1.resource._rid);
    const client2 = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
    });
    const database2 = await client2.databases.createIfNotExists({ id: "test4" });
    // read same contianer from client 2
    const container2 = await database2.database.containers.createIfNotExists({ id: "test1" });
    // console.log("container2: ", container2.resource._rid);
    // delete first container from cleint 2
    await container2.container.delete();
    // crewate new container from clietn 2
    await database2.database.containers.createIfNotExists({
      id: "test1",
      partitionKey: "/PK2",
    });
    await container1.container.items.create({ id: "2", PK2: "2" });
    // console.log("container2: ", container2.resource._rid);
    // await container2.container.items.create({ id: "test", PK1: "" });
    // console.log("container2: ", container2.resource._rid);
  });

  it("encryption decrypt group by query result test", async () => {
    const partitionKey = randomUUID();
    const testDoc1 = new TestDoc((await testCreateItem(encryptionContainer)).resource);

    const query = new EncryptionQueryBuilder(
      `SELECT COUNT(c.id), c.PK FROM c WHERE c.PK = @PK GROUP BY c.PK`,
    );

    query.addStringParameter("@PK", partitionKey, "/PK");
    let iterator = await encryptionContainer.items.getEncryptionQueryIterator(query);
    while (iterator.hasMoreResults()) {
      const response = await iterator.fetchNext();
      assert.isNotNull(response.diagnostics);
    }

    const withEncryptedParameter = new EncryptionQueryBuilder(
      "SELECT COUNT(c.id), c.sensitive_IntFormat FROM c WHERE c.sensitive_IntFormat = @Sensitive_IntFormat GROUP BY c.sensitive_IntFormat",
    );

    withEncryptedParameter.addIntegerParameter(
      "@Sensitive_IntFormat",
      testDoc1.sensitive_IntFormat,
      "/sensitive_IntFormat",
    );

    iterator = await encryptionContainer.items.getEncryptionQueryIterator(withEncryptedParameter);
    while (iterator.hasMoreResults()) {
      const response = await iterator.fetchNext();
      assert.isNotNull(response.diagnostics);
    }
  });

  it("should fail creating cep with duplicate path", async () => {
    // duplicate paths in policy
    const pathdup1 = new ClientEncryptionIncludedPath(
      "/sensitive_StringFormat",
      "key2",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const pathdup2 = new ClientEncryptionIncludedPath(
      "/sensitive_StringFormat",
      "key2",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const pathsWithDups = [pathdup1, pathdup2];
    try {
      new ClientEncryptionPolicy(pathsWithDups);
      assert.fail("ClientEncryptionPolicy creation should have failed");
    } catch (err) {
      assert.ok(
        err.message.includes(
          err.message,
          "Duplicate path found: /sensitive_StringFormat in client encryption policy.",
        ),
      );
    }
  });

  it("encryption change feed", async () => {
    const partitionKey = randomUUID();
    const changeFeedOptionsForEntireContainer = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      maxItemCount: 1,
    };
    const changeFeedOptionsForPartitionKey = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
    };

    const iteratorForPartitionKey = encryptionContainer.items.getChangeFeedIterator(
      changeFeedOptionsForPartitionKey,
    );
    const iteratorForEntireContainer = encryptionContainer.items.getChangeFeedIterator(
      changeFeedOptionsForEntireContainer,
    );
    const testDoc1 = new TestDoc(
      (await testCreateItem(encryptionContainer, partitionKey)).resource,
    );
    const testDoc2 = new TestDoc((await testCreateItem(encryptionContainer)).resource);

    let response = await iteratorForEntireContainer.readNext();
    verifyExpectedDocResponse(testDoc1, response.result[0]);
    assert.equal(StatusCodes.Ok, response.statusCode);
    response = await iteratorForEntireContainer.readNext();
    verifyExpectedDocResponse(testDoc2, response.result[0]);

    response = await iteratorForPartitionKey.readNext();
    assert.equal(StatusCodes.Ok, response.statusCode);
    assert.ok(response.result.length === 1);
    verifyExpectedDocResponse(testDoc1, response.result[0]);
  });

  it("encryption decrypt query result multiple docs", async () => {
    const testDoc1 = new TestDoc((await testCreateItem(encryptionContainer)).resource);
    const testDoc2 = new TestDoc((await testCreateItem(encryptionContainer)).resource);

    let query = `SELECT * FROM c WHERE c.nonsensitive IN ('${testDoc1.nonsensitive}', '${testDoc2.nonsensitive}')`;

    let iterator = encryptionContainer.items.query(query);
    let response = await iterator.fetchAll();
    assert.ok(response.resources.length === 2);
    for (const doc of response.resources) {
      assert.ok(doc.id === testDoc1.id || doc.id === testDoc2.id);
    }
    query += " ORDER BY c._ts";
    iterator = encryptionContainer.items.query(query);
    response = await iterator.fetchAll();
    assert.ok(response.resources.length === 2);
  });

  it("query with COUNT on encrypted item", async () => {
    await testCreateItem(encryptionContainer);
    const query = { query: "SELECT VALUE COUNT(1) FROM c" };
    const iterator = encryptionContainer.items.query(query);
    const response = await iterator.fetchAll();
    assert.equal(response.resources[0], 1);
  });

  it("validate caching of protected dek", async () => {
    const newTestKeyResolver = new MockKeyVaultEncryptionKeyResolver();
    let newClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: newTestKeyResolver,
      encryptionKeyResolverName: testKeyVault,
    });

    unwrapCount = 0;
    let newDatabase = newClient.database(database.id);
    let newContainer = newDatabase.container(encryptionContainer.id);

    for (let i = 0; i < 2; i++) {
      await testCreateItem(newContainer);
    }
    console.log("unwrapCount1: ", unwrapCount);
    newClient.dispose();
    // assert.equal(unwrapCount, 1);
    newClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: newTestKeyResolver,
      encryptionKeyResolverName: testKeyVault,
      encryptionKeyTimeToLiveInHours: 0,
    });
    newDatabase = newClient.database(database.id);
    newContainer = database.container(encryptionContainer.id);
    unwrapCount = 0;
    for (let i = 0; i < 2; i++) {
      await testCreateItem(encryptionContainer);
    }
    console.log("unwrapCount2: ", unwrapCount);
    // assert.ok(unwrapCount > 1);

    newClient.dispose();
  });

  it("key encryption key revoke test", async () => {
    const keyEncryptionKeyResolver = new MockKeyVaultEncryptionKeyResolver();
    const encryptionTestClient = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: keyEncryptionKeyResolver,
      encryptionKeyTimeToLiveInHours: 0,
      encryptionKeyResolverName: testKeyVault,
    });

    // await removeAllDatabases();

    const revokedKekMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "revokedKek",
      "revokedKek-metadata",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
    const testdatabase = (await encryptionTestClient.databases.createIfNotExists({ id: "myDb1" }))
      .database;
    await testdatabase.createClientEncryptionKey(
      "keyWithRevokedKek",
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      revokedKekMetadata,
    );

    // Once a Dek gets cached and the Kek is revoked, calls to unwrap/wrap keys would fail since KEK is revoked.
    // The Dek should be rewrapped if the KEK is revoked.
    // When an access to KeyVault fails, the Dek is fetched from the backend (force refresh to update the stale DEK) and cache is updated.
    const pathWithRevokedKek = new ClientEncryptionIncludedPath(
      "/sensitive_NestedObjectFormatL1",
      "keyWithRevokedKek",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const paths = [pathWithRevokedKek];
    const clientEncryptionPolicyWithRevokedKek = new ClientEncryptionPolicy(paths);
    const containerProperties = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/PK"],
      },
      clientEncryptionPolicy: clientEncryptionPolicyWithRevokedKek,
    };
    const testcontainer = (await testdatabase.containers.create(containerProperties)).container;
    const testDoc1 = new TestDoc((await testCreateItem(testcontainer)).resource);
    keyEncryptionKeyResolver.revokeAccessSet = true;
    // Try creating it and it should fail as it has been revoked.
    try {
      await testCreateItem(testcontainer);
      assert.fail("Create Item should have failed.");
    } catch (err) {
      assert.ok(
        err.message.includes(
          "needs to be rewrapped with a valid Key Encryption Key using rewrapClientEncryptionKey",
        ),
      );
    }
    const query = new EncryptionQueryBuilder("SELECT * FROM c");
    try {
      await validateQueryResults(testcontainer, query, [testDoc1]);
      assert.fail("Query should have failed.");
    } catch (error) {
      assert.ok(
        error.message.includes(
          "needs to be rewrapped with a valid Key Encryption Key using rewrapClientEncryptionKey",
        ),
      );
    }
    // Revoke access is set to false, so the next call should succeed.
    keyEncryptionKeyResolver.revokeAccessSet = false;
    await testdatabase.rewrapClientEncryptionKey("keyWithRevokedKek", metadata2);
    await testCreateItem(testcontainer);
    testKeyEncryptionKeyResolver.revokeAccessSet = false;
    encryptionTestClient.dispose();
  });
});

function compareMetadata(expected: any, actual: any): boolean {
  return (
    expected.type === actual.type &&
    expected.name === actual.name &&
    expected.value === actual.value &&
    expected.algorithm === actual.algorithm
  );
}

async function verifyItemByRead(
  container: Container,
  testDoc: any,
  requestOptions?: RequestOptions,
): Promise<void> {
  const readResponse = await container.item(testDoc.id, testDoc.PK).read(requestOptions);
  assert.equal(StatusCodes.Ok, readResponse.statusCode);
  verifyExpectedDocResponse(testDoc, readResponse.resource);
}

async function validateQueryResults(
  container: Container,
  query: EncryptionQueryBuilder | SqlQuerySpec,
  expectedDocList: TestDoc[],
  options?: RequestOptions,
  // decryptOperation?: boolean,
  // expectedPropertiesDecryptedCount: number = 12,
): Promise<void> {
  let iterator: QueryIterator<any>;
  if (query instanceof EncryptionQueryBuilder) {
    console.log("2148: ", expectedDocList[0].sensitive_NestedObjectFormatL1.sensitive_IntFormatL1);
    iterator = await container.items.getEncryptionQueryIterator(query, options);
    console.log("2149: ", expectedDocList[0].sensitive_NestedObjectFormatL1.sensitive_IntFormatL1);
  } else {
    iterator = container.items.query(query, options);
  }
  const results = await container.items.readAll().fetchAll();
  console.log("results: ", results);
  let totalDocs = 0;
  const docs: TestDoc[] = [];
  while (iterator.hasMoreResults()) {
    const response = await iterator.fetchNext();
    totalDocs += response.resources.length;
    for (let i = 0; i < response.resources.length; i++) {
      docs.push(response.resources[i]);
      // Todo: add function for verifying diagnostics and call it here
    }
  }
  if (expectedDocList) {
    assert.ok(totalDocs >= expectedDocList.length);
    for (const expectedDoc of expectedDocList) {
      const readDoc = docs.find((doc1) => doc1.id === expectedDoc.id);
      assert.isNotNull(expectedDoc);
      verifyExpectedDocResponse(expectedDoc, readDoc);
    }
  }
}

async function testCreateClientEncryptionKey(
  cekId: string,
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
): Promise<ClientEncryptionKeyResponse> {
  const response = await database.createClientEncryptionKey(
    cekId,
    EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    encryptionKeyWrapMetadata,
  );
  assert.equal(StatusCodes.Created, response.statusCode);
  assert.ok(response.requestCharge > 0);
  assert.isNotNull(response.etag);
  return response;
}

async function testRewrapClientEncryptionKey(
  cekId: string,
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
): Promise<ClientEncryptionKeyResponse> {
  const response = await database.rewrapClientEncryptionKey(cekId, encryptionKeyWrapMetadata);
  assert.equal(StatusCodes.Ok, response.statusCode);
  assert.ok(response.requestCharge > 0);
  assert.isNotNull(response.etag);
  return response;
}

async function testCreateItem(
  container: Container,
  partitionKey: string = null,
): Promise<ItemResponse<ItemDefinition>> {
  const testDoc = TestDoc.create(partitionKey);
  const response = await container.items.create(testDoc);
  assert.equal(response.statusCode, StatusCodes.Created);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

async function testUpsertItem(
  container: Container,
  testDoc: any,
  expectedStatusCode: StatusCode,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.items.upsert(testDoc);
  assert.equal(expectedStatusCode, response.statusCode);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

async function testReplaceItem(
  container: Container,
  testDoc: any,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.item(testDoc.id, testDoc.PK).replace(testDoc);
  assert.equal(StatusCodes.Ok, response.statusCode);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

async function testPatchItem(
  container: Container,
  patchOperations: PatchOperation[],
  expectedTestDoc: any,
  expectedStatusCode: StatusCode,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container
    .item(expectedTestDoc.id, expectedTestDoc.PK)
    .patch(patchOperations);
  assert.equal(expectedStatusCode, response.statusCode);
  verifyExpectedDocResponse(expectedTestDoc, response.resource);
  return response;
}

async function testDeleteItem(
  container: Container,
  testDoc: any,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.item(testDoc.id, testDoc.PK).delete();
  assert.equal(StatusCodes.NoContent, response.statusCode);
  assert.isNull(response.resource);
  return response;
}

function verifyExpectedDocResponse(expectedDoc: TestDoc, verifyDoc: any) {
  assert.equal(expectedDoc.id, verifyDoc.id);
  assert.equal(expectedDoc.sensitive_StringFormat, verifyDoc.sensitive_StringFormat);

  if (expectedDoc.sensitive_ArrayFormat != null) {
    assert.equal(
      expectedDoc.sensitive_ArrayFormat[0].sensitive_ArrayDecimalFormat,
      verifyDoc.sensitive_ArrayFormat[0].sensitive_ArrayDecimalFormat,
    );
    assert.equal(
      expectedDoc.sensitive_ArrayFormat[0].sensitive_ArrayIntFormat,
      verifyDoc.sensitive_ArrayFormat[0].sensitive_ArrayIntFormat,
    );
  } else {
    assert.equal(expectedDoc.sensitive_ArrayFormat, verifyDoc.sensitive_ArrayFormat);
  }

  if (expectedDoc.sensitive_IntArray != null) {
    for (let i = 0; i < expectedDoc.sensitive_IntArray.length; i++) {
      assert.equal(expectedDoc.sensitive_IntArray[i], verifyDoc.sensitive_IntArray[i]);
    }
  } else {
    assert.equal(expectedDoc.sensitive_IntArray, verifyDoc.sensitive_IntArray);
  }

  if (expectedDoc.sensitive_IntMultiDimArray != null) {
    for (let i = 0; i < expectedDoc.sensitive_IntMultiDimArray.length; i++) {
      for (let j = 0; j < expectedDoc.sensitive_IntMultiDimArray[i].length; j++) {
        assert.equal(
          expectedDoc.sensitive_IntMultiDimArray[i][j],
          verifyDoc.sensitive_IntMultiDimArray[i][j],
        );
      }
    }
  } else {
    assert.equal(expectedDoc.sensitive_IntMultiDimArray, verifyDoc.sensitive_IntMultiDimArray);
  }

  if (expectedDoc.sensitive_ObjectArrayType != null) {
    // const expectedValue = expectedDoc.sensitive_ObjectArrayType[0];
    // const test = verifyDoc.sensitive_ObjectArrayType[0];

    // assert.equal(expectedValue.sensitive_ArrayDecimalFormat, test.sensitive_ArrayDecimalFormat);
    // assert.equal(expectedValue.sensitive_ArrayIntFormat, test.sensitive_ArrayIntFormat);
    assert.equal(expectedDoc.sensitive_ObjectArrayType[1], verifyDoc.sensitive_ObjectArrayType[1]);
  } else {
    assert.equal(expectedDoc.sensitive_ObjectArrayType, verifyDoc.sensitive_ObjectArrayType);
  }

  if (expectedDoc.sensitive_ArrayMultiTypes != null) {
    for (let i = 0; i < expectedDoc.sensitive_ArrayMultiTypes.length; i++) {
      for (let j = 0; j < expectedDoc.sensitive_ArrayMultiTypes[i].length; j++) {
        const expectedItem = expectedDoc.sensitive_ArrayMultiTypes[i][j];
        const verifyItem = verifyDoc.sensitive_ArrayMultiTypes[i][j];
        assert.equal(
          expectedItem.sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
          verifyItem.sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
        );
        assert.equal(
          expectedItem.sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
          verifyItem.sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
        );
        assert.deepEqual(
          expectedItem.sensitive_StringArrayMultiType,
          verifyItem.sensitive_StringArrayMultiType,
        );
        assert.equal(
          expectedItem.sensitive_ArrayMultiTypeDecimalFormat,
          verifyItem.sensitive_ArrayMultiTypeDecimalFormat,
        );
        assert.deepEqual(
          expectedItem.sensitive_IntArrayMultiType,
          verifyItem.sensitive_IntArrayMultiType,
        );
      }
    }
  } else {
    assert.equal(expectedDoc.sensitive_ArrayMultiTypes, verifyDoc.sensitive_ArrayMultiTypes);
  }
  if (expectedDoc.sensitive_NestedObjectFormatL1 != null) {
    assert.equal(
      expectedDoc.sensitive_NestedObjectFormatL1.sensitive_IntFormatL1,
      verifyDoc.sensitive_NestedObjectFormatL1.sensitive_IntFormatL1,
    );

    if (expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2 != null) {
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_StringFormatL2,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_StringFormatL2,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_IntFormatL3,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_IntFormatL3,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_DecimalFormatL3,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_DecimalFormatL3,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayIntFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayIntFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayDecimalFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayDecimalFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayDecimalFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayDecimalFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayIntFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayIntFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
      );
    } else {
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2,
      );
    }
  } else {
    assert.equal(
      expectedDoc.sensitive_NestedObjectFormatL1,
      verifyDoc.sensitive_NestedObjectFormatL1,
    );
  }

  assert.equal(expectedDoc.sensitive_DecimalFormat, verifyDoc.sensitive_DecimalFormat);
  assert.equal(expectedDoc.sensitive_IntFormat, verifyDoc.sensitive_IntFormat);
  assert.equal(expectedDoc.sensitive_FloatFormat, verifyDoc.sensitive_FloatFormat);
  assert.equal(expectedDoc.sensitive_BoolFormat, verifyDoc.sensitive_BoolFormat);
  assert.equal(expectedDoc.nonsensitive, verifyDoc.nonsensitive);
  assert.equal(expectedDoc.nonsensitiveInt, verifyDoc.nonsensitiveInt);
}

class TestDoc {
  id: string;
  PK: string;
  nonsensitive: string;
  nonsensitiveInt: number;
  sensitive_StringFormat: string;
  sensitive_DateFormat: Date;
  sensitive_DecimalFormat: number;
  sensitive_BoolFormat: boolean;
  sensitive_IntFormat: number;
  sensitive_LongFormat: number;
  sensitive_FloatFormat: number;
  sensitive_DoubleFormat: number;
  sensitive_IntArray: number[];
  sensitive_IntMultiDimArray: number[][];
  sensitive_ArrayFormat: SensitiveArrayData[];
  sensitive_ArrayMultiTypes: SensitiveArrayMultiType[][];
  sensitive_ObjectArrayType: (SensitiveArrayData | number)[];
  sensitive_NestedObjectFormatL1: SensitiveNestedObjectL1;

  constructor(other: any) {
    this.id = other.id;
    this.PK = other.PK;
    this.nonsensitive = other.nonsensitive;
    this.nonsensitiveInt = other.nonsensitiveInt;
    this.sensitive_StringFormat = other.sensitive_StringFormat;
    this.sensitive_DateFormat = other.sensitive_DateFormat;
    this.sensitive_DecimalFormat = other.sensitive_DecimalFormat;
    this.sensitive_IntFormat = other.sensitive_IntFormat;
    this.sensitive_LongFormat = other.sensitive_LongFormat;
    this.sensitive_BoolFormat = other.sensitive_BoolFormat;
    this.sensitive_FloatFormat = other.sensitive_FloatFormat;
    this.sensitive_DoubleFormat = other.sensitive_DoubleFormat;
    this.sensitive_ArrayFormat = other.sensitive_ArrayFormat;
    this.sensitive_IntArray = other.sensitive_IntArray;
    this.sensitive_ObjectArrayType = other.sensitive_ObjectArrayType;
    this.sensitive_NestedObjectFormatL1 = other.sensitive_NestedObjectFormatL1;
    this.sensitive_ArrayMultiTypes = other.sensitive_ArrayMultiTypes;
    this.sensitive_IntMultiDimArray = other.sensitive_IntMultiDimArray;
  }

  static create(partitionKey: string | null = null): TestDoc {
    return {
      id: randomUUID(),
      PK: partitionKey || randomUUID(),
      nonsensitive: randomUUID(),
      nonsensitiveInt: 10,
      sensitive_StringFormat: randomUUID(),
      sensitive_DateFormat: new Date("1987-12-25T00:00:00Z"),
      sensitive_DecimalFormat: 472.3108,
      sensitive_IntArray: [999, 1000],
      sensitive_IntMultiDimArray: [
        [1, 2],
        [2, 3],
        [4, 5],
      ],
      sensitive_ObjectArrayType: [
        { sensitive_ArrayIntFormat: 18273, sensitive_ArrayDecimalFormat: 1234.11 },
        9823,
      ],
      sensitive_IntFormat: 1965,
      sensitive_LongFormat: Number.MAX_SAFE_INTEGER,
      sensitive_BoolFormat: true,
      sensitive_FloatFormat: 0.11983,
      sensitive_DoubleFormat: 1.1,
      sensitive_ArrayFormat: [
        { sensitive_ArrayIntFormat: 1111, sensitive_ArrayDecimalFormat: 1111.11 },
      ],
      sensitive_ArrayMultiTypes: [
        [
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 888,
              sensitive_DecimalFormatL0: 888.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata1a", "verysensitivedata1a", null],
            sensitive_ArrayMultiTypeDecimalFormat: 10.2,
            sensitive_IntArrayMultiType: [999, 1000],
          },
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 888,
              sensitive_DecimalFormatL0: 888.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata1b", "verysensitivedata1b"],
            sensitive_ArrayMultiTypeDecimalFormat: 12.2,
            sensitive_IntArrayMultiType: [888, 1010],
          },
        ],
        [
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 111,
              sensitive_DecimalFormatL0: 222.3,
            },
            sensitive_StringArrayMultiType: ["sensitivedata2a", "verysensitivedata2a"],
            sensitive_ArrayMultiTypeDecimalFormat: 9876.2,
            sensitive_IntArrayMultiType: [1, 2],
          },
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 878,
              sensitive_DecimalFormatL0: 188.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata2b", "verysensitivedata2b"],
            sensitive_ArrayMultiTypeDecimalFormat: 14.2,
            sensitive_IntArrayMultiType: [929, 1050],
          },
        ],
      ],
      sensitive_NestedObjectFormatL1: {
        sensitive_IntArrayL1: [999, 100],
        sensitive_IntFormatL1: 1999,
        sensitive_DecimalFormatL1: 1999.1,
        sensitive_ArrayFormatL1: [
          { sensitive_ArrayIntFormat: 1, sensitive_ArrayDecimalFormat: 2.1 },
          { sensitive_ArrayIntFormat: 2, sensitive_ArrayDecimalFormat: 3.1 },
        ],
        sensitive_NestedObjectFormatL2: {
          sensitive_StringFormatL2: "sensitiveData",
          sensitive_DecimalFormatL2: 2000.1,
          sensitive_ArrayFormatL2: [
            { sensitive_ArrayIntFormat: 2, sensitive_ArrayDecimalFormat: 3.1 },
          ],
          sensitive_NestedObjectFormatL3: {
            sensitive_IntFormatL3: 3000,
            sensitive_DecimalFormatL3: 3000.1,
            sensitive_ArrayFormatL3: [
              { sensitive_ArrayIntFormat: 3, sensitive_ArrayDecimalFormat: 4.1 },
            ],
            sensitive_ArrayWithObjectFormat: [
              {
                sensitive_ArrayIntFormat: 4,
                sensitive_ArrayDecimalFormat: 5.1,
                sensitive_NestedObjectFormatL0: {
                  sensitive_IntFormatL0: 888,
                  sensitive_DecimalFormatL0: 888.1,
                },
              },
            ],
          },
        },
      },
    };
  }
}

class HirarchicalPkTestDoc {
  Id: string;
  PK: string;
  State: string;
  City: string;
  ZipCode: string;
  constructor(Id: string, PK: string, State: string, City: string, ZipCode: string) {
    this.Id = Id;
    this.PK = PK;
    this.State = State;
    this.City = City;
    this.ZipCode = ZipCode;
  }

  static create(partitionKey: string = null): HirarchicalPkTestDoc {
    return new HirarchicalPkTestDoc(
      randomUUID(),
      partitionKey || randomUUID(),
      randomUUID(),
      randomUUID(),
      randomUUID(),
    );
  }

  equals(obj: HirarchicalPkTestDoc): boolean {
    return (
      obj instanceof HirarchicalPkTestDoc &&
      this.Id === obj.Id &&
      this.PK === obj.PK &&
      this.State === obj.State &&
      this.City === obj.City &&
      this.ZipCode === obj.ZipCode
    );
  }

  hashCode(): number {
    let hashCode = 1652434776;
    hashCode = hashCode * -1521134295 + this.hashCodeString(this.Id);
    hashCode = hashCode * -1521134295 + this.hashCodeString(this.PK);
    hashCode = hashCode * -1521134295 + this.hashCodeString(this.State);
    hashCode = hashCode * -1521134295 + this.hashCodeString(this.City);
    hashCode = hashCode * -1521134295 + this.hashCodeString(this.ZipCode);
    return hashCode;
  }

  hashCodeString(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }
}

// Test
const doc1 = HirarchicalPkTestDoc.create();
const doc2 = HirarchicalPkTestDoc.create();
console.log(doc1.equals(doc2)); // false

class SensitiveArrayData {
  sensitive_ArrayIntFormat: number;
  sensitive_ArrayDecimalFormat: number;
}

class SensitiveArrayMultiType {
  sensitive_NestedObjectFormatL0: SensitiveNestedObjectL0;
  sensitive_StringArrayMultiType: (string | null)[];
  sensitive_ArrayMultiTypeDecimalFormat: number;
  sensitive_IntArrayMultiType: number[];
}

class SensitiveNestedObjectL0 {
  sensitive_IntFormatL0: number;
  sensitive_DecimalFormatL0: number;
}

class SensitiveNestedObjectL1 {
  sensitive_NestedObjectFormatL2?: SensitiveNestedObjectL2;
  sensitive_IntFormatL1: number;
  sensitive_IntArrayL1: number[];
  sensitive_DecimalFormatL1: number;
  sensitive_ArrayFormatL1: SensitiveArrayData[];
}

class SensitiveNestedObjectL2 {
  sensitive_StringFormatL2: string;
  sensitive_DecimalFormatL2: number;
  sensitive_ArrayFormatL2: SensitiveArrayData[];
  sensitive_NestedObjectFormatL3: SensitiveNestedObjectL3;
}

class SensitiveNestedObjectL3 {
  sensitive_IntFormatL3: number;
  sensitive_ArrayFormatL3: SensitiveArrayData[];
  sensitive_DecimalFormatL3: number;
  sensitive_ArrayWithObjectFormat: SensitiveArrayDataWithObject[];
}

class SensitiveArrayDataWithObject {
  sensitive_ArrayIntFormat: number;
  sensitive_ArrayDecimalFormat: number;
  sensitive_NestedObjectFormatL0: SensitiveNestedObjectL0;
}
