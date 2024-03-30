// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import {
  CosmosClient,
  AzureKeyVaultEncryptionKeyResolver,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  EncryptionKeyWrapMetadata,
  KeyEncryptionKeyAlgorithm,
  Database,
  ClientEncryptionIncludedPath,
  EncryptionType,
  ClientEncryptionPolicy,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
  StatusCodes,
  PatchOperation,
} from "../../../src";
import { assert } from "chai";
import { masterKey } from "../common/_fakeTestSecrets";
import { endpoint } from "../common/_testConfig";

const credentials = new ClientSecretCredential(
  "<tenant-id>",
  "<client-id>", // HR service client ID
  "client-secret",
);

const client = new CosmosClient({
  endpoint: endpoint,
  key: masterKey,
  enableEncryption: true,
  keyEncryptionKeyResolver: new AzureKeyVaultEncryptionKeyResolver(credentials),
});

describe("Client Side Encryption", () => {
  let database: Database;
  before(async () => {
    try {
      const response = await client.databases.createIfNotExists({ id: "encryptionTestDatabase" });
      database = response.database;
      console.log("Database created");
      await database.createClientEncryptionKey(
        "dek1",
        EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
        new EncryptionKeyWrapMetadata(
          EncryptionKeyResolverName.AzureKeyVault,
          "akvKey",
          "<key-vault-url>",
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
    const includedPaths = ["/valueint", "/valuebit", "/object"].map(
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

  after(async () => {
    await database.delete();
  });
});
