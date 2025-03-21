// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import {
  BulkOperationType,
  ChangeFeedStartFrom,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  CosmosEncryptedNumber,
  CosmosEncryptedNumberType,
  EncryptionQueryBuilder,
  ErrorResponse,
  OperationInput,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
  RestError,
  SqlQuerySpec,
} from "@azure/cosmos";
import {
  AzureKeyVaultEncryptionKeyResolver,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  EncryptionKeyWrapMetadata,
  KeyEncryptionAlgorithm,
} from "../src";
import { ClientSecretCredential } from "@azure/identity";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    // @ts-ignore
    const client = new CosmosClient({ endpoint, key });
  });

  it("ReadmeSampleCreateDatabase", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    console.log(database.id);
  });

  it("ReadmeSampleCreateContainer", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    console.log(container.id);
  });

  it("ReadmeSampleCreateContainerWithPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    await container.item("id", "1").read(); // string type
    await container.item("id", 2).read(); // number type
    await container.item("id", true).read(); // boolean type
    await container.item("id", {}).read(); // None type
    await container.item("id", undefined).read(); // None type
    await container.item("id", null).read(); // null type
  });

  it("ReadmeSampleCreateContainerWithPartitionKeySingleOrArray", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    await container.item("id", "1").read();
    await container.item("id", ["1"]).read();
  });

  it("ReadmeSampleCreateContainerWithPartitionKeyArray", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    await container.item("id", ["a", "b"]).read();
    await container.item("id", ["a", 2]).read();
    await container.item("id", [{}, {}]).read();
    await container.item("id", ["a", {}]).read();
    await container.item("id", [2, null]).read();
  });

  it("ReadmeSampleInsertItems", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const cities = [
      { id: "1", name: "Olympia", state: "WA", isCapitol: true },
      { id: "2", name: "Redmond", state: "WA", isCapitol: false },
      { id: "3", name: "Chicago", state: "IL", isCapitol: false },
    ];
    for (const city of cities) {
      await container.items.create(city);
    }
  });

  it("ReadmeSampleReadItem", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    await container.item("1", "1").read();
  });

  it("ReadmeSampleCreateContainerWithHierarchicalPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const containerDefinition = {
      id: "Test Database",
      partitionKey: {
        paths: ["/name", "/address/zip"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    console.log(container.id);
  });

  it("ReadmeSampleInsertItemWithHierarchicalPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const containerDefinition = {
      id: "Test Database",
      partitionKey: {
        paths: ["/name", "/address/zip"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    // @ts-preserve-whitespace
    const item = {
      id: "1",
      name: "foo",
      address: {
        zip: 100,
      },
      active: true,
    };
    await container.items.create(item);
  });

  it("ReadmeSampleReadItemWithHierarchicalPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const containerDefinition = {
      id: "Test Database",
      partitionKey: {
        paths: ["/name", "/address/zip"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    // @ts-preserve-whitespace
    await container.item("1", ["foo", 100]).read();
  });

  it("ReadmeSampleQueryItemWithHierarchicalPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const containerDefinition = {
      id: "Test Database",
      partitionKey: {
        paths: ["/name", "/address/zip"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    // @ts-preserve-whitespace
    const { resources } = await container.items
      .query("SELECT * from c WHERE c.active = true", {
        partitionKey: ["foo", 100],
      })
      .fetchAll();
    for (const item of resources) {
      console.log(`${item.name}, ${item.address.zip} `);
    }
  });

  it("ReadmeSampleDeleteItem", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // Delete the first item returned by the query above
    await container.item("1").delete();
  });

  it("ReadmeSampleQueryDatabase", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const { resources } = await container.items
      .query("SELECT * from c WHERE c.isCapitol = true")
      .fetchAll();
    for (const city of resources) {
      console.log(`${city.name}, ${city.state} is a capitol `);
    }
  });

  it("ReadmeSampleQueryDatabaseWithParameters", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const { resources } = await container.items
      .query({
        query: "SELECT * from c WHERE c.isCapitol = @isCapitol",
        parameters: [{ name: "@isCapitol", value: true }],
      })
      .fetchAll();
    for (const city of resources) {
      console.log(`${city.name}, ${city.state} is a capitol `);
    }
  });

  it("ReadmeSampleChangeFeedPullModelIteratorBeginning", async () => {
    // @ts-ignore
    const options = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
    };
  });

  it("ReadmeSampleChangeFeedPullModelIteratorTime", async () => {
    const time = new Date("2023/09/11"); // some sample date
    // @ts-ignore
    const options = {
      changeFeedStartFrom: ChangeFeedStartFrom.Time(time),
    };
  });

  it("ReadmeSampleChangeFeedPullModelIteratorNow", async () => {
    // Signals the iterator to read changefeed from this moment onward.
    // @ts-ignore
    const options = {
      changeFeedStartFrom: ChangeFeedStartFrom.Now(),
    };
  });

  it("ReadmeSampleChangeFeedPullModelIteratorContinuation", async () => {
    // Signals the iterator to read changefeed from a saved point.
    const continuationToken = "some continuation token received from previous request";
    // @ts-ignore
    const options = {
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    };
  });

  it("ReadmeSampleChangeFeedPullModelIteratorPartitionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const containerDefinition = {
      id: "Test Database",
      partitionKey: {
        paths: ["/name", "/address/zip"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.MultiHash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    // @ts-preserve-whitespace
    const partitionKey = "some-partition-Key-value";
    const options = {
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
    };
    // @ts-preserve-whitespace
    const iterator = container.items.getChangeFeedIterator(options);
    // @ts-preserve-whitespace
    while (iterator.hasMoreResults) {
      // @ts-ignore
      const response = await iterator.readNext();
      // process this response
    }
  });

  it("ReadmeSampleErrorHandling", async () => {
    try {
      // some code
    } catch (err) {
      if (err instanceof ErrorResponse) {
        // some specific error handling.
      } else if (err instanceof RestError) {
        // some specific error handling.
      }
      // handle other type of errors in similar way.
      else {
        // for any other error.
      }
    }
  });

  it("ReadmeSampleErrorHandlingConflicts", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    try {
      await container.items.create({ id: "existing-item-id" });
    } catch (error) {
      const err = error as ErrorResponse | RestError;
      if (err.code === 409) {
        console.log("There was a conflict with an existing item");
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });

  it("ReadmeSampleSetDiagnosticLevel", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    // @ts-ignore
    const client = new CosmosClient({
      endpoint,
      key,
      diagnosticLevel: CosmosDbDiagnosticLevel.debug,
    });
  });

  it("ReadmeSampleAccessDiagnostics", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    // @ts-ignore
    const client = new CosmosClient({
      endpoint,
      key,
      diagnosticLevel: CosmosDbDiagnosticLevel.debug,
    });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // For point look up operations
    // @ts-preserve-whitespace
    // @ts-ignore
    const { container, diagnostics: containerCreateDiagnostic } =
      await database.containers.createIfNotExists({
        id: "<container-id>",
        partitionKey: {
          paths: ["/key1"],
        },
      });
    // @ts-preserve-whitespace
    // For Batch operations
    const operations: OperationInput[] = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: { id: "A", key: "A", school: "high" },
      },
    ];
    // @ts-preserve-whitespace
    // @ts-ignore
    const response = await container.items.batch(operations, "A");
    // @ts-preserve-whitespace
    // For query operations
    const queryIterator = container.items.query("select * from c");
    // @ts-ignore
    const { resources, diagnostics } = await queryIterator.fetchAll();
    // @ts-preserve-whitespace
    // While error handling
    try {
      // Some operation that might fail
    } catch (err) {
      // @ts-ignore
      const diagnostics = err.diagnostics;
    }
  });

  it("ReadmeSampleNonStreamableCrossPartitionQuery", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const querySpec = {
      query: "SELECT c.status, COUNT(c.id) AS count FROM c GROUP BY c.status",
    };
    const queryOptions = {
      maxItemCount: 10, // maximum number of items to return per page
      enableCrossPartitionQuery: true,
    };
    const querIterator = container.items.query(querySpec, queryOptions);
    while (querIterator.hasMoreResults()) {
      // @ts-ignore
      const { resources: result } = await querIterator.fetchNext();
      //Do something with result
    }
  });

  it("CosmosClientCreate", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    // @ts-ignore
    const client = new CosmosClient({ endpoint, key });
  });

  it("CosmosClientWithConnectionPolicy", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    // @ts-ignore
    const client = new CosmosClient({
      endpoint,
      key,
      connectionPolicy: {
        requestTimeout: 10000,
      },
    });
  });

  it("CosmosClientDatabases", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-ignore
    const { resource: databaseDefinition, database } = await client.databases.create({
      id: "<name here>",
    });
  });

  it("CosmosClientDatabaseCreateContainer", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-ignore
    const container = client.database("<database id>").containers.create({
      id: "<name here>",
    });
  });

  it("CosmosClientDatabaseDelete", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    await client.database("<id here>").delete();
  });

  it("QueryIteratorIterateDatabases", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    for await (const { resources: db } of client.databases.readAll().getAsyncIterator()) {
      console.log(`Got ${db} from AsyncIterator`);
    }
  });

  it("SqlQuerySpecParameterizedSqlQuery", async () => {
    // @ts-ignore
    const query: SqlQuerySpec = {
      query: `SELECT * FROM Families f where f.lastName = @lastName`,
      parameters: [{ name: "@lastName", value: "Wakefield" }],
    };
  });

  it("SharedOptionsAbortSignal", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const controller = new AbortController();
    // @ts-ignore
    const results = container.items.query("SELECT * from c", {
      abortSignal: controller.signal,
    });
  });

  it("ChangeFeedPullModelIteratorIterate", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const options = { changeFeedStartFrom: ChangeFeedStartFrom.Now() };
    for await (const results of container.items.getChangeFeedIterator(options).getAsyncIterator()) {
      // Process result
      for (const resource of results.result) {
        console.log(resource);
      }
    }
  });

  it("ContainerItems", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: createdItem } = await container.items.create({
      id: "<item id>",
      properties: {},
    });
  });

  it("ItemsUpsert", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: createdItem1 } = await container.items.create({
      id: "<item id 1>",
      properties: {},
    });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: upsertItem1 } = await container.items.upsert({
      id: "<item id 1>",
      updated_properties: {},
    });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: upsertItem2 } = await container.items.upsert({
      id: "<item id 2>",
      properties: {},
    });
  });

  it("ContainerItem", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { body: replacedItem } = await container
      .item("<item id>", "<partition key value>")
      .replace({ id: "<item id>", title: "Updated post", authorID: 5 });
  });

  it("ContainersQueryAllContainers", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const querySpec: SqlQuerySpec = {
      query: `SELECT * FROM root r WHERE r.id = @container`,
      parameters: [{ name: "@container", value: "Todo" }],
    };
    // @ts-ignore
    const { resources: containerList } = await client
      .database("<db id>")
      .containers.query(querySpec)
      .fetchAll();
  });

  it("ContainersReadAllContainers", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: containerList } = await client
      .database("<db id>")
      .containers.readAll()
      .fetchAll();
  });

  it("DatabaseCreateContainer", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { body: containerDefinition, container } = await client
      .database("<db id>")
      .containers.create({ id: "<container id>" });
  });

  it("DatabaseDeleteUser", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    await client.database("<db id>").user("<user id>").delete();
  });

  it("DatabaseDeleteContainer", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    await client.database("<db id>").container("<container id>").delete();
  });

  it("DatabaseRead", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: database } = await client.database("<db id>").read();
  });

  it("DatabaseReadOffer", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: offer } = await client.database("<db id>").readOffer();
  });

  it("DatabaseCreateClientEncryptionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
    const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
    const client = new CosmosClient({
      endpoint,
      key,
      clientEncryptionOptions: {
        keyEncryptionKeyResolver: keyResolver,
      },
    });
    const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
    const metadata: EncryptionKeyWrapMetadata = {
      type: EncryptionKeyResolverName.AzureKeyVault,
      name: "<key-name>",
      value: "<key-vault-url>",
      algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
    };
    // @ts-preserve-whitespace
    await database.createClientEncryptionKey(
      "<cek-id>",
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      metadata,
    );
  });

  it("DatabaseReadClientEncryptionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
    const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
    const client = new CosmosClient({
      endpoint,
      key,
      clientEncryptionOptions: {
        keyEncryptionKeyResolver: keyResolver,
      },
    });
    const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: clientEncryptionKey } = await database.readClientEncryptionKey("<cek-id>");
  });

  it("DatabaseRewrapClientEncryptionKey", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
    const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
    const client = new CosmosClient({
      endpoint,
      key,
      clientEncryptionOptions: {
        keyEncryptionKeyResolver: keyResolver,
      },
    });
    const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
    const newMetadata: EncryptionKeyWrapMetadata = {
      type: EncryptionKeyResolverName.AzureKeyVault,
      name: "<key-name>",
      value: "<key-vault-url>",
      algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
    };
    // @ts-preserve-whitespace
    await database.rewrapClientEncryptionKey("<new-cek-id>", newMetadata);
  });

  it("DatabasesQueryDatabases", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const querySpec: SqlQuerySpec = {
      query: `SELECT * FROM root r WHERE r.id = @database`,
      parameters: [{ name: "@database", value: "Todo" }],
    };
    // @ts-ignore
    const { resources: databaseList } = await client.databases.query(querySpec).fetchAll();
  });

  it("DatabasesReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: databaseList } = await client.databases.readAll().fetchAll();
  });

  it("ItemsQueryItems", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const querySpec: SqlQuerySpec = {
      query: `SELECT * FROM Families f WHERE f.lastName = @lastName`,
      parameters: [{ name: "@lastName", value: "Hendricks" }],
    };
    // @ts-ignore
    const { resources: items } = await container.items.query(querySpec).fetchAll();
  });

  it("ItemRead", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    interface TodoItem {
      title: string;
      done: boolean;
      id: string;
    }
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: item } = await container.item("id").read<TodoItem>();
  });

  it("ItemReplace", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    interface TodoItem {
      title: string;
      done: boolean;
      id: string;
    }
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: item } = await container.item("id").read<TodoItem>();
    // @ts-preserve-whitespace
    item.done = true;
    // @ts-ignore
    const { resource: replacedItem } = await container.item("id").replace<TodoItem>(item);
  });

  it("ItemDelete", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    interface TodoItem {
      title: string;
      done: boolean;
      id: string;
    }
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: item } = await container.item("id").read<TodoItem>();
    // @ts-preserve-whitespace
    // @ts-ignore
    await container.item("id").delete<TodoItem>();
  });

  it("ItemPatch", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    interface TodoItem {
      title: string;
      done: boolean;
      id: string;
    }
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: item } = await container.item("id").read<TodoItem>();
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resource: patchedItem } = await container.item("id").patch<TodoItem>([
      {
        op: "replace", // Operation type (can be replace, add, remove, set, incr)
        path: "/title", // The path to the property to update
        value: "new-title", // New value for the property
      },
      {
        op: "remove",
        path: "/done",
      },
    ]);
  });

  it("ItemsQueryEncryptedItems", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const queryBuilder = new EncryptionQueryBuilder(
      `SELECT firstname FROM Families f WHERE f.lastName = @lastName`,
    );
    queryBuilder.addParameter("@lastName", "Hendricks", "/lastname");
    const queryIterator = await container.items.getEncryptionQueryIterator(queryBuilder);
    // @ts-ignore
    const { resources: items } = await queryIterator.fetchAll();
  });

  it("ItemsReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: containerList } = await container.items.readAll().fetchAll();
  });

  it("ItemsBulk", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // partitionKey is optional at the top level if present in the resourceBody
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: { id: "doc1", name: "sample", key: "A" },
      },
      {
        operationType: "Upsert",
        partitionKey: "A",
        resourceBody: { id: "doc2", name: "other", key: "A" },
      },
    ];
    // @ts-preserve-whitespace
    await container.items.bulk(operations);
  });

  it("ItemsBatch", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // The partitionKey is a required second argument. If it’s undefined, it defaults to the expected partition key format.
    const operations: OperationInput[] = [
      {
        operationType: "Create",
        resourceBody: { id: "doc1", name: "sample", key: "A" },
      },
      {
        operationType: "Upsert",
        resourceBody: { id: "doc2", name: "other", key: "A" },
      },
    ];
    // @ts-preserve-whitespace
    await container.items.batch(operations, "A");
  });

  it("OffersReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: offerList } = await client.offers.readAll().fetchAll();
  });

  it("PermissionsReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: permissionList } = await database
      .user("user1")
      .permissions.readAll()
      .fetchAll();
  });

  it("StoredProceduresQueryStoredProcedures", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    const querySpec: SqlQuerySpec = {
      query: `SELECT * FROM root r WHERE r.id = @sproc`,
      parameters: [{ name: "@sproc", value: "Todo" }],
    };
    // @ts-ignore
    const { resources: storedProceduresList } = await container.scripts.storedProcedures
      .query(querySpec)
      .fetchAll();
  });

  it("StoredProceduresReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: storedProceduresList } = await container.scripts.storedProcedures
      .readAll()
      .fetchAll();
  });

  it("TriggersReadAllTriggers", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: triggerList } = await container.scripts.triggers.readAll().fetchAll();
  });

  it("UsersReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: usersList } = await database.users.readAll().fetchAll();
  });

  it("UserDefinedFunctionsReadAll", async () => {
    const endpoint = "https://your-account.documents.azure.com";
    const key = "<database account masterkey>";
    const client = new CosmosClient({ endpoint, key });
    // @ts-preserve-whitespace
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    // @ts-preserve-whitespace
    const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
    // @ts-preserve-whitespace
    // @ts-ignore
    const { resources: udfList } = await container.scripts.userDefinedFunctions
      .readAll()
      .fetchAll();
  });

  it("CosmosEncryptedNumber", async () => {
    // @ts-ignore
    const encryptedNumber1: CosmosEncryptedNumber = {
      value: 4,
      numberType: CosmosEncryptedNumberType.Integer,
    };
    // @ts-ignore
    const encryptedNumber2: CosmosEncryptedNumber = {
      value: 4.1,
      numberType: CosmosEncryptedNumberType.Float,
    };
    // @ts-ignore
    const encryptedNumber3: CosmosEncryptedNumber = {
      value: 4,
      numberType: CosmosEncryptedNumberType.Float, // represents 4.0
    };
  });
});
