// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Client-Side Encryption
 */

require("dotenv").config();

const { ClientSecretCredential } = require("@azure/identity");

const {
  CosmosClient,
  AzureKeyVaultEncryptionKeyResolver,
  EncryptionKeyResolverName,
  EncryptionAlgorithm,
  KeyEncryptionAlgorithm,
  EncryptionType,
  EncryptionQueryBuilder,
} = require("@azure/cosmos");
const { finish, handleError, logStep } = require("./Shared/handleError");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
let client;

async function run() {
  logStep("Create encryption enabled cosmos client");
  const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");

  // create AzureKeyVaultEncryptionKeyResolver with credentials to get access to azure key vault
  const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);

  client = new CosmosClient({
    endpoint: endpoint,
    key: key,
    clientEncryptionOptions: {
      keyEncryptionKeyResolver: keyResolver,
      // setting 3600 seconds (1 hour) TTL for encryption keys. Default is 7200 seconds
      encryptionKeyTimeToLiveInSeconds: 3600,
    },
  });

  logStep("Create database and client encryption key");
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  console.log(`Database with id ${databaseId} created`);

  // metadata for the customer managed key that will be used to wrap client encryption key
  const metadata = {
    type: EncryptionKeyResolverName.AzureKeyVault,
    name: "akvKey",
    value: "https://<my-key-vault-1>.vault.azure.net/keys/cmk1/<version>", // key-vault url
    algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
  };
  await database.createClientEncryptionKey(
    "cek1",
    EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    metadata,
  );
  console.log(`Client encryption key with id cek1 created`);

  logStep("Create client encryption included path and policy");
  // adding id, salary and ssn properties for encryption
  const paths = ["/salary", "/ssn", "/id"].map((path) => ({
    path: path,
    clientEncryptionKeyId: "cek1",
    encryptionType: EncryptionType.DETERMINISTIC,
    encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
  }));
  // creating client encryption policy with included paths and policy version 2.
  // policy version 2 must be used if we encrypt id or partition key
  const clientEncryptionPolicy = {
    includedPaths: paths,
    policyFormatVersion: 2,
  };

  logStep("Create container with client encryption policy");
  const containerDefinition = {
    id: containerId,
    partitionKey: {
      paths: ["/id"],
    },
    clientEncryptionPolicy: clientEncryptionPolicy,
  };
  const { container } = await database.containers.createIfNotExists(containerDefinition);

  // optional call to initialize encryption. This will warm up the encryption cache.
  // If not initialized, it will be initialized on the first operation that requires encryption.
  await container.initializeEncryption();

  logStep("Create item with encrypted properties");
  const item1 = {
    id: "123456",
    firstName: "Jane",
    lastName: "Doe",
    department: "Customer Service",
    salary: { base: 51280, bonus: 1440 },
    ssn: "123-45-6789",
  };
  const item2 = {
    id: "654321",
    firstName: "John",
    lastName: "Doe",
    department: "Supply Chain",
    salary: { base: 47920, bonus: 1810 },
    ssn: "987-65-4321",
  };
  await container.items.create(item1);
  await container.items.create(item2);

  logStep("Read item with id");
  const { resource: item } = await container.item(item1.id, item1.id).read();
  console.log(`Item with id ${item1.id} is`, item);

  // Encrypted parameters can be added to the query based on their type using the methods -
  // addBooleanParameter, addIntegerParameter, addFloatParameter, addStringParameter, addArrayParameter,
  // addObjectParameter, addDateParameter.
  logStep("Query with string parameter");
  // use EncryptionQueryBuilder to create query with encrypted parameter
  const queryBuilder1 = new EncryptionQueryBuilder("SELECT * FROM c WHERE c.ssn = @ssn");
  // add string parameter to query
  queryBuilder1.addParameter("@ssn", item2.ssn, "/ssn");
  // use getEncryptionQueryIterator to get the iterator with encrypted parameters
  const iterator1 = await container.items.getEncryptionQueryIterator(queryBuilder1);
  const { resources: result1 } = await iterator1.fetchAll();
  console.log(`Query results: `, result1);

  logStep("Query with object parameter");
  const queryBuilder2 = new EncryptionQueryBuilder("SELECT * FROM c WHERE c.salary = @salary");
  // add object parameter to query
  queryBuilder2.addParameter("@salary", item1.salary, "/salary");
  const iterator2 = await container.items.getEncryptionQueryIterator(queryBuilder2);
  const { resources: result2 } = await iterator2.fetchAll();
  console.log(`Query results: `, result2);

  logStep("rewrap client encryption key");
  // new metadata for rewrapping client encryption key
  const newMetadata = {
    type: EncryptionKeyResolverName.AzureKeyVault,
    name: "v4key",
    value: "https://<my-key-vault-1>.vault.azure.net/keys/cmk2/<version>",
    algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
  };
  await database.rewrapClientEncryptionKey("cek1", newMetadata);
  console.log(`rewrapped client encryption key with id cek1`);
  // recommended to dispose client after use to clear all the timers
  client.dispose();
  await finish();
}

run().catch(handleError);
