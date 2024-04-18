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
  ContainerDefinition,
  ItemResponse,
  ItemDefinition,
  ClientEncryptionKeyResponse,
  EncryptionQueryBuilder,
  RequestOptions,
  SqlQuerySpec,
  QueryIterator,
} from "../../../src";
import { assert } from "chai";

import { masterKey } from "../common/_fakeTestSecrets";
import { endpoint } from "../common/_testConfig";
import { removeAllDatabases } from "../common/TestHelpers";
import { randomUUID } from "@azure/core-util";
import { StatusCode } from "nock";

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private keyInfo: { [key: string]: number } = {
    tempmetadata1: 1,
    tempmetadata2: 2,
  };
  revokeAccessSet = false;
  wrapKeyCallsCount: { [key: string]: number };
  unwrapKeyCallsCount: { [key: string]: number };
  constructor() {
    this.wrapKeyCallsCount = {};
    this.unwrapKeyCallsCount = {};
    this.revokeAccessSet = false;
  }
  async unwrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    console.log(algorithm);
    if (encryptionKeyId === "revokedKek-metadata" && this.revokeAccessSet) {
      throw new Error("Forbidden");
    }
    if (!this.unwrapKeyCallsCount.encryptedKeyId) {
      this.unwrapKeyCallsCount[encryptionKeyId] = 1;
    } else {
      this.unwrapKeyCallsCount.encryptedKeyId++;
    }
    const moveBy = this.keyInfo[encryptionKeyId];
    const plainKey = Buffer.alloc(key.length);
    for (let i = 0; i < key.length; i++) {
      plainKey[i] = key[i] - moveBy;
    }
    return plainKey;
  }

  async wrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer> {
    console.log(algorithm);
    if (!this.wrapKeyCallsCount.encryptedKeyId) {
      this.wrapKeyCallsCount[encryptionKeyId] = 1;
    } else {
      this.wrapKeyCallsCount.encryptedKeyId++;
    }
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
    await removeAllDatabases();
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
    });
    database = (await encryptionClient.databases.createIfNotExists({ id: randomUUID() })).database;
    await testCreateClientEncryptionKey("key1", metadata1);
    await testCreateClientEncryptionKey("key2", metadata2);

    const revokedKekMetadata = new EncryptionKeyWrapMetadata(
      testKeyVault,
      "revokedKek",
      "revokedKek-metadata",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );
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
    paths.push(
      new ClientEncryptionIncludedPath(
        "/sensitive_ArrayFormat",
        "keyWithRevokedKek",
        EncryptionType.DETERMINISTIC,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      ),
    );
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

  it("Encryption Bulk Crud", async () => {
    const { resource: docToReplace } = await testCreateItem(encryptionContainer);
    docToReplace.nonsensitive = randomUUID();
    docToReplace.sensitive_StringFormat = randomUUID();

    const { resource: docToUpsert } = await testCreateItem(encryptionContainer);
    docToUpsert.nonsensitive = randomUUID();
    docToUpsert.sensitive_StringFormat = randomUUID();

    const { resource: docToDelete } = await testCreateItem(encryptionContainer);

    const clientWithBulk = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
    });

    const databaseWithBulk = (await clientWithBulk.databases.createIfNotExists({ id: database.id }))
      .database;
    const encryptionContainerWithBulk = (
      await databaseWithBulk.containers.createIfNotExists({ id: encryptionContainer.id })
    ).container;

    await testCreateItem(encryptionContainerWithBulk);
    await testUpsertItem(encryptionContainerWithBulk, TestDoc.create(), StatusCodes.Created);
    await testReplaceItem(encryptionContainerWithBulk, docToReplace);
    await testUpsertItem(encryptionContainerWithBulk, docToUpsert, StatusCodes.Ok);
    await testDeleteItem(encryptionContainerWithBulk, docToDelete);
    clientWithBulk.dispose();
  });

  it("create client encryption key", async () => {
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
      compareMetadata(
        new EncryptionKeyWrapMetadata(
          testKeyVault,
          cekId,
          testmetadata1.value,
          KeyEncryptionKeyAlgorithm.RSA_OAEP,
        ),
        clientEncryptionKeyProperties.encryptionKeyWrapMetadata,
      ),
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

    // complete key identifier not passed
    metadata = new EncryptionKeyWrapMetadata(
      EncryptionKeyResolverName.AzureKeyVault,
      "key1",
      "https://testkeyvault.vault.azure.net/keys/testkey",
      KeyEncryptionKeyAlgorithm.RSA_OAEP,
    );

    try {
      clientEncryptionKeyResponse = await database1.createClientEncryptionKey(
        cekId,
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        metadata,
      );
      assert.fail("Key creation should fail.");
    } catch (error) {
      assert.equal(true, error.message.startsWith("Invalid Key Vault URI"));
    }

    try {
      clientEncryptionKeyResponse = await database1.rewrapClientEncryptionKey(cekId, metadata);
      assert.fail("Key creation should fail.");
    } catch (error) {
      assert.equal(true, error.message.startsWith("Invalid Key Vault URI"));
    }
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
    const clientWithNoCaching = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      enableEncryption: true,
      keyEncryptionKeyResolver: testkeyEncryptionKeyResolver,
    });
    const testdatabase = (await clientWithNoCaching.database(database.id).read()).database;
    const testcontainer = (await testdatabase.container(encryptionContainer.id).read()).container;
    const testDoc = TestDoc.create();
    testDoc.sensitive_ArrayFormat = null;
    testDoc.sensitive_StringFormat = null;
    testDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2.sensitive_StringFormatL2 =
      null;

    const createResponse = await testcontainer.items.create(testDoc);
    assert.equal(StatusCodes.Created, createResponse.statusCode);
    verifyExpectedDocResponse(testDoc, createResponse.resource);

    // query on document with null property

    const queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM c where c.sensitive_StringFormat = @Sensitive_StringFormat" +
        " AND c.sensitive_IntFormat = @Sensitive_IntFormat" +
        " AND c.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2.sensitive_StringFormatL2 = @Sensitive_StringFormatL2",
    );
    queryBuilder.addStringParameter(
      "@Sensitive_StringFormat",
      testDoc.sensitive_StringFormat,
      "/sensitive_StringFormat",
    );
    queryBuilder.addIntegerParameter(
      "@Sensitive_IntFormat",
      testDoc.sensitive_IntFormat,
      "/sensitive_IntFormat",
    );
    queryBuilder.addStringParameter(
      "@Sensitive_StringFormatL2",
      testDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
        .sensitive_StringFormatL2,
      "/sensitive_NestedObjectFormatL1",
    );

    const expectedDocList: TestDoc[] = [];
    expectedDocList.push(new TestDoc(testDoc));
    await validateQueryResults(testcontainer, queryBuilder, expectedDocList);

    // // no access to key -> DOUBT
    // testkeyEncryptionKeyResolver.revokeAccessSet = true;
    // testDoc = TestDoc.create();
    // testDoc.sensitive_ArrayFormat = null;
    // testDoc.sensitive_StringFormat = null;

    // createResponse = await testcontainer.items.create(testDoc);
    // verifyExpectedDocResponse(testDoc, createResponse.resource);

    // testkeyEncryptionKeyResolver.revokeAccessSet = false;
    clientWithNoCaching.dispose();
  });

  it("encryption create item and query", async () => {
    const testDoc = (await testCreateItem(encryptionContainer)).resource;
    await verifyItemByRead(encryptionContainer, testDoc);

    const expectedDoc = new TestDoc(testDoc);
    const expectedDocList: TestDoc[] = [];
    expectedDocList.push(new TestDoc(expectedDoc));
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

    // without query builder
    const querySpec = {
      query: `SELECT * FROM c WHERE c.nonsensitive = '${expectedDoc.nonsensitive}'`,
    };
    await validateQueryResults(encryptionContainer, querySpec, expectedDocList);

    queryBuilder = new EncryptionQueryBuilder(
      `SELECT * FROM c WHERE c.sensitive_IntFormat = '${expectedDoc.sensitive_IntFormat}'`,
    );
    await validateQueryResults(encryptionContainer, queryBuilder, null);
  });

  //   it("query on encrypted properties", async () => {
  //     const containerProperties = {
  //        id: randomUUID(),
  //       partitionKey: {
  //         paths: ["/PK"],
  //       },
  //       clientEncryptionPolicy: clientEncryptionPolicy,
  //     }
  //     const encryptionQueryContainer = (await database.containers.create(containerProperties)).container;
  //     let testDoc1 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);
  //     let testDoc2 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);
  //     let testDoc3 = new TestDoc((await testCreateItem(encryptionQueryContainer)).resource);

  //     // string/int
  //     const stringArray = [testDoc1.sensitive_StringFormat, "randomValue", null];

  //     const queryBuilder = new EncryptionQueryBuilder(
  //        "SELECT * FROM c where array_contains(@sensitive_StringFormat, c.sensitive_StringFormat) " +
  //         "AND c.sensitive_NestedObjectFormatL1 = @sensitive_NestedObjectFormatL1"
  //     )

  //     queryBuilder.addStringParameter(
  //       "@sensitive_StringFormat",
  //       stringArray,
  //       "/sensitive_StringFormat"
  //     )
  // });
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
    iterator = await container.items.getEncryptionQueryIterator(query, options);
  } else {
    iterator = container.items.query(query, options);
  }
  let totalDocs = 0;
  const docs: TestDoc[] = [];
  // docs.push(expectedDocList[0]);
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
    for (const readDoc of docs) {
      const expectedDoc = expectedDocList.find((doc1) => doc1.id === readDoc.id);
      assert.isNotNull(expectedDoc);
      console.log("expectedDoc: ", expectedDoc);
      console.log("readDoc: ", readDoc);
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

// async function testPatchItem(
//   container: Container,
//   patchOperations: PatchOperation[],
//   expectedTestDoc: TestDoc,
//   expectedStatusCode: StatusCode,
// ): Promise<ItemResponse<ItemDefinition>> {
//   const response = await container
//     .item(expectedTestDoc.id, expectedTestDoc.PK)
//     .patch(patchOperations);
//   assert.equal(expectedStatusCode, response.statusCode);
//   verifyExpectedDocResponse(expectedTestDoc, response.resource);
//   return response;
// }

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
  // sensitive_DateFormat: Date;
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
    // this.sensitive_DateFormat = other.Sensitive_DateFormat;
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
      // sensitive_DateFormat: new Date(1987, 11, 25),
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
  sensitive_NestedObjectFormatL2: SensitiveNestedObjectL2;
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
