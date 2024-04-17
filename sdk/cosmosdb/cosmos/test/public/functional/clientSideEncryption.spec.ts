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
  PatchOperation,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
  OperationInput,
  PatchOperationType,
  BulkOperationType,
  EncryptionKeyResolver,
  EncryptionQueryBuilder,
} from "../../../src";
import { assert } from "chai";
import { masterKey } from "../common/_fakeTestSecrets";
import { endpoint } from "../common/_testConfig";

import { removeAllDatabases } from "../common/TestHelpers";

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  async wrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    // To satisfy build requirements
    const _ = encryptionKeyId + algorithm + key.toString();
    console.log(_.slice(0, 0));

    const base64key = "CWF5CrojTqFvTUWWHhq/IVWYIFbUYF99QwisJmCV3mc=";
    return Buffer.from(base64key, "base64");
  }

  async unwrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer> {
    // To satisfy build requirements
    const _ = encryptionKeyId + algorithm + wrappedKey.toString();
    console.log(_.slice(0, 0));

    const base64key = "CGB4CbkiTaBuTESVHRm+IFSXH1XTX158QgerJV+U3WY=";
    return Buffer.from(base64key, "base64");
  }
}
const testKeyVault = "TESTKEYSTORE_VAULT" as EncryptionKeyResolverName;

const client = new CosmosClient({
  endpoint: endpoint,
  key: masterKey,
  enableEncryption: true,
  keyEncryptionKeyResolver: new MockKeyVaultEncryptionKeyResolver(),
});

describe("Client Side Encryption", () => {
  let database: Database;
  before(async () => {
    await removeAllDatabases();
    try {
      const response = await client.databases.createIfNotExists({ id: "encryptionTestDatabase2" });
      database = response.database;
      console.log("Database created");
      await database.createClientEncryptionKey(
        "dek1",
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        new EncryptionKeyWrapMetadata(
          testKeyVault,
          "key1",
          "tempmetadata1",
          KeyEncryptionKeyAlgorithm.RSA_OAEP,
        ),
      );
    } catch (error) {
      console.error("Error creating database or encryption key:", error);
    }
  });

  it("CRUD operations on encryption-enabled container with non-encrypted partition key/id", async () => {
    const includedPaths = [
      "/valueint",
      "/valuedouble",
      "/valuestring",
      "/valuebit",
      "/object",
      "/array",
    ].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths);
    const { container } = await database.containers.createIfNotExists({
      id: "encryptionContainer",
      partitionKey: "/id",
      clientEncryptionPolicy: clientEncryptionPolicy,
    });
    await container.initializeEncryption();

    // create Item
    const createResponse = await container.items.create({
      id: "1",
      valueint: 32,
      valuedouble: 3.14,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });

    assert.equal(createResponse.statusCode, StatusCodes.Created);
    // upsert Item
    const upsertResponse = await container.items.upsert({
      id: "1",
      valueint: 105,
      valuedouble: 8.5,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });
    assert.equal(upsertResponse.statusCode, StatusCodes.Ok);

    // read item
    const readResponse = await container.item("1", "1").read();
    assert.equal(readResponse.statusCode, StatusCodes.Ok);

    // replace item
    const replaceResponse = await container.item("1", "1").replace({
      id: "1",
      valueint: 500,
      valuedouble: 8.5,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });
    assert.equal(replaceResponse.statusCode, StatusCodes.Ok);

    // patch item
    const patchOperations: PatchOperation[] = [
      { op: "replace", path: "/valueint", value: 1000 },
      { op: "remove", path: "/valuebit" },
    ];
    const patchResponse = await container.item("1", "1").patch(patchOperations);
    assert.equal(patchResponse.statusCode, StatusCodes.Ok);

    // delete operation
    const deleteResponse = await container.item("1", "1").delete();
    assert.equal(deleteResponse.statusCode, StatusCodes.NoContent);
  });

  it("should validate policy format version", async () => {
    const path = new ClientEncryptionIncludedPath(
      "/id",
      "dek1",
      EncryptionType.DETERMINISTIC,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy([path]);
    const { container } = await database.containers.createIfNotExists({
      id: "encryptionContainerWithEncryptedId",
      partitionKey: "/id",
      clientEncryptionPolicy: clientEncryptionPolicy,
    });
    try {
      await container.initializeEncryption();
      assert.fail("Expected an error to be thrown");
    } catch (error) {
      const errorMessage = error.message;
      const exepectedErrorMessage =
        "Encryption of partition key or id is only supported with policy format version 2.";
      assert.equal(errorMessage, exepectedErrorMessage);
    }
  });

  it("should validate encryption type with policy version 2.", async () => {
    const path = new ClientEncryptionIncludedPath(
      "/id",
      "dek1",
      EncryptionType.RANDOMIZED,
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy([path], 2);
    const { container } = await database.containers.createIfNotExists({
      id: "encryptionContainerWithEncryptedId1",
      partitionKey: "/id",
      clientEncryptionPolicy: clientEncryptionPolicy,
    });
    try {
      await container.initializeEncryption();
      assert.fail("Expected an error to be thrown");
    } catch (error) {
      const errorMessage = error.message;
      const exepectedErrorMessage =
        "Encryption Type must be deterministic for encryption of partition key/id";
      assert.equal(errorMessage, exepectedErrorMessage);
    }
  });

  it("CRUD operation with encrypted hierarchical partition key", async () => {
    const includedPaths = ["/valueint", "/valuebit", "/object", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);

    const containerDefinition = {
      id: "hierarchicalEncryptionContainer",
      partitionKey: {
        paths: ["/valuestring", "/object/o1"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    // console.log(container.id);
    await container.initializeEncryption();

    // create Item
    const createResponse = await container.items.create({
      id: "1",
      valueint: 32,
      valuedouble: 3.14,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });

    assert.equal(createResponse.statusCode, StatusCodes.Created);

    // upsert Item
    const upsertResponse = await container.items.upsert({
      id: "1",
      valueint: 100,
      valuedouble: 3.14,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });

    assert.equal(upsertResponse.statusCode, StatusCodes.Ok);

    const upsertResponse1 = await container.items.upsert({
      id: "1",
      valueint: 100,
      valuedouble: 3.14,
      valuestring: "hello",
      valuebit: true,
      object: {
        o1: 35,
        o2: 3.14,
      },
      array: ["hello", true],
    });
    assert.equal(upsertResponse1.statusCode, StatusCodes.Created);

    // read item
    const readResponse = await container.item("1", ["hello", 32]).read();
    assert.equal(readResponse.statusCode, StatusCodes.Ok);
    // replace item
    const replaceResponse = await container.item("1", ["hello", 32]).replace({
      id: "1",
      valueint: 32,
      valuedouble: 8.5,
      valuestring: "hello",
      valuebit: false,
      object: {
        o1: 32,
        o2: 3.14,
      },
      array: ["hello", true],
    });
    assert.equal(replaceResponse.statusCode, StatusCodes.Ok);
    // patch item
    const patchOperations: PatchOperation[] = [
      { op: "add", path: "/valuebit", value: true },
      { op: "replace", path: "/valueint", value: 1000 },
      { op: "remove", path: "/valuebit" },
    ];
    const patchResponse = await container.item("1", ["hello", 32]).patch(patchOperations);
    assert.equal(patchResponse.statusCode, StatusCodes.Ok);
    // delete operation
    const deleteResponse = await container.item("1", ["hello", 32]).delete();
    assert.equal(deleteResponse.statusCode, StatusCodes.NoContent);
  });

  it("encryption batch operation", async () => {
    const includedPaths = ["/key", "/id", "/object"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);
    const containerDef = {
      id: "encryption_container_batch",
      partitionKey: "/key",
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    await container.initializeEncryption();
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: { id: "doc1", name: "sample", key: "A", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: "Upsert",
        resourceBody: { id: "doc2", name: "other", key: "A", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: "Read",
        id: "doc1",
      },
      {
        operationType: "Delete",
        id: "doc1",
      },
      {
        operationType: "Patch",
        id: "doc2",
        resourceBody: {
          operations: [{ op: PatchOperationType.set, path: "/name", value: "sample" }],
          condition: "from c where NOT IS_DEFINED(c.newImproved)",
        },
      },
    ];

    const response = await container.items.batch(operations, "A");
    assert.equal(response.result[0].statusCode, StatusCodes.Created);
    assert.equal(response.result[1].statusCode, StatusCodes.Created);
    assert.equal(response.result[2].statusCode, StatusCodes.Ok);
    assert.equal(response.result[3].statusCode, StatusCodes.NoContent);
    assert.equal(response.result[4].statusCode, StatusCodes.Ok);
  });

  it("encryption batch with hierarchical partition key", async () => {
    const includedPaths = ["/key", "/id", "/object"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);
    const containerDef = {
      id: "encryption_hierarchical_container_batch",
      partitionKey: {
        paths: ["/key", "/object/o1"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    await container.initializeEncryption();
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: { id: "doc1", name: "sample", key: "A", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: "Upsert",
        resourceBody: { id: "doc2", name: "other", key: "A", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: "Read",
        id: "doc1",
      },
      {
        operationType: "Delete",
        id: "doc1",
      },
      {
        operationType: "Patch",
        id: "doc2",
        resourceBody: {
          operations: [{ op: PatchOperationType.set, path: "/name", value: "sample" }],
          condition: "from c where NOT IS_DEFINED(c.newImproved)",
        },
      },
    ];

    const response = await container.items.batch(operations, ["A", 1]);
    assert.equal(response.result[0].statusCode, StatusCodes.Created);
    assert.equal(response.result[1].statusCode, StatusCodes.Created);
    assert.equal(response.result[2].statusCode, StatusCodes.Ok);
    assert.equal(response.result[3].statusCode, StatusCodes.NoContent);
    assert.equal(response.result[4].statusCode, StatusCodes.Ok);
  });

  it("encryption bulk operation", async () => {
    const includedPaths = ["/key", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);
    const containerDef = {
      id: "encryption_container_bulk",
      partitionKey: "/key",
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    await container.initializeEncryption();
    const operations = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: { id: "doc1", name: "sample", key: "A" },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "A",
        resourceBody: { id: "doc2", name: "other", key: "A" },
      },
      {
        operationType: BulkOperationType.Read,
        id: "doc1",
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Delete,
        id: "doc2",
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Replace,
        partitionKey: "A",
        id: "doc1",
        resourceBody: { id: "doc2", name: "nice", key: "A" },
      },
    ];
    const response = await container.items.bulk(operations);
    assert.equal(response[0].statusCode, StatusCodes.Created);
    assert.equal(response[1].statusCode, StatusCodes.Created);
    assert.equal(response[2].statusCode, StatusCodes.Ok);
    assert.equal(response[3].statusCode, StatusCodes.NoContent);
    assert.equal(response[4].statusCode, StatusCodes.Ok);
  });

  it("encryption bulk operation with hierarchical partition key", async () => {
    const includedPaths = ["/key", "/id"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);
    const containerDef = {
      id: "encryption_hierarchical_container_bulk",
      partitionKey: {
        paths: ["/key", "/object/o1"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    await container.initializeEncryption();
    const operations = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: { id: "doc1", name: "sample", key: "A", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: ["B", 1],
        resourceBody: { id: "doc1", name: "other", key: "B", object: { o1: 1, o2: 2 } },
      },
      {
        operationType: BulkOperationType.Read,
        id: "doc1",
        partitionKey: ["A", 1],
      },
      {
        operationType: BulkOperationType.Delete,
        id: "doc1",
        partitionKey: ["A", 1],
      },
      {
        operationType: BulkOperationType.Replace,
        partitionKey: ["B", 1],
        id: "doc1",
        resourceBody: { id: "doc1", name: "nice", key: "B", object: { o1: 1, o2: 2 } },
      },
    ];
    const response = await container.items.bulk(operations);
    assert.equal(response[0].statusCode, StatusCodes.Created);
    assert.equal(response[1].statusCode, StatusCodes.Created);
    assert.equal(response[2].statusCode, StatusCodes.Ok);
    assert.equal(response[3].statusCode, StatusCodes.NoContent);
    assert.equal(response[4].statusCode, StatusCodes.Ok);
  });

  it("encryption query iterator", async () => {
    const includedPaths = ["/key", "/id", "/boolval", "/floatval"].map(
      (path) =>
        new ClientEncryptionIncludedPath(
          path,
          "dek1",
          EncryptionType.DETERMINISTIC,
          EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        ),
    );
    const clientEncryptionPolicy = new ClientEncryptionPolicy(includedPaths, 2);
    const containerDef = {
      id: "encryption_query_container",
      partitionKey: "/key",
      clientEncryptionPolicy: clientEncryptionPolicy,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    await container.initializeEncryption();
    await Promise.all([
      container.items.create({ id: "1", name: "foo", key: 1, boolval: true, floatval: 3.0 }),
      container.items.create({ id: "2", name: "bar", key: 2, boolval: false, floatval: 6.5 }),
      container.items.create({ id: "1", name: "foo", key: 3, boolval: true, floatval: 6.5 }),
      container.items.create({ id: "2", name: "bar", key: 4, boolval: false, floatval: 0.0 }),
    ]);
    const readAllResponse = await container.items.readAll().fetchAll();
    assert.equal(readAllResponse.resources.length, 4);

    const queryBuilder = new EncryptionQueryBuilder(
      "SELECT * FROM f WHERE f.id = @id and f.boolval = @boolval",
    );
    queryBuilder.addStringParameter("@id", "1", "/id");
    queryBuilder.addBooleanParameter("@boolval", true, "/boolval");
    const iterator1 = await container.items.getEncryptionQueryIterator(queryBuilder);
    for await (const response of iterator1.getAsyncIterator()) {
      assert.equal(response.resources.length, 2);
    }

    const queryBuilder1 = new EncryptionQueryBuilder(
      "SELECT * FROM f WHERE f.id = @id and f.floatval = @floatval",
    );
    queryBuilder1.addStringParameter("@id", "1", "/id");
    queryBuilder1.addFloatParameter("@floatval", 6.5, "/floatval");

    const iterator2 = await container.items.getEncryptionQueryIterator(queryBuilder1);
    const fetchNextResponse = await iterator2.fetchNext();
    assert.equal(fetchNextResponse.resources.length, 1);

    const queryBuilder2 = new EncryptionQueryBuilder("SELECT * FROM f WHERE f.key = @key");
    queryBuilder2.addIntegerParameter("@key", 1, "/key");
    const iterator3 = await container.items.getEncryptionQueryIterator(queryBuilder2);
    const fetchAllResponse = await iterator3.fetchAll();
    assert.equal(fetchAllResponse.resources.length, 1);
  });
});
