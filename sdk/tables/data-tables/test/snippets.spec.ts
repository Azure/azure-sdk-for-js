// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureNamedKeyCredential,
  AzureSASCredential,
  TableClient,
  TableServiceClient,
  TableTransaction,
  TransactionAction,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_NamedKeyCredential", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const serviceClient = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential,
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const account = "<account name>";
    // @ts-preserve-whitespace
    const clientWithAAD = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential,
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-preserve-whitespace
    const serviceClientWithSAS = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      new AzureSASCredential(sas),
    );
  });

  it("ReadmeSampleCreateClient_SASTokenURL", async () => {
    const account = "<account name>";
    const sasToken = "<SAS token>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const serviceClientWithSASURL = new TableServiceClient(
      `https://${account}.table.core.windows.net?${sasToken}`,
    );
  });

  it("ReadmeSampleListTables", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const serviceClient = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    let i = 0;
    const tables = serviceClient.listTables();
    for await (const table of tables) {
      console.log(`Table${++i}: ${table.name}`);
    }
  });

  it("ReadmeSampleCreateTable", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const serviceClient = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const tableName = "newtable";
    // If the table 'newTable' already exists, createTable doesn't throw
    await serviceClient.createTable(tableName);
  });

  it("ReadmeSampleCreateTable_IfExists", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const serviceClient = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const tableName = `newtable${+new Date()}`;
    await serviceClient.createTable(tableName, {
      onResponse: (response) => {
        if (response.status === 409) {
          console.log(`Table ${tableName} already exists`);
        }
      },
    });
  });

  it("ReadmeSampleCreateTableClient_NamedKeyCredential", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    // Use AzureNamedKeyCredential with storage account and account key
    // AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
  });

  it("ReadmeSampleCreateTableClient_TokenCredential", async () => {
    // DefaultAzureCredential expects the following three environment variables:
    // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // - AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();
    const account = "<account name>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const clientWithAAD = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
  });

  it("ReadmeSampleCreateTableClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const clientWithSAS = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      new AzureSASCredential(sas),
    );
  });

  it("ReadmeSampleCreateTableClient_SASTokenURL", async () => {
    const account = "<account name>";
    const sasToken = "<SAS token>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const clientWithSAS = new TableClient(
      `https://${account}.table.core.windows.net?${sasToken}`,
      tableName,
    );
  });

  it("ReadmeSampleListEntities", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    let i = 0;
    const entities = client.listEntities();
    for await (const entity of entities) {
      console.log(`Entity${++i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
    }
  });

  it("ReadmeSampleTableClientCreateTable", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    // If the table 'newTable' already exists, createTable doesn't throw
    await client.createTable();
  });

  it("ReadmeSampleGetEntity", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const entity = await client.getEntity("<partitionKey>", "<rowKey>");
    console.log(`Entity: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
  });

  it("ReadmeSampleCreateEntity", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const testEntity = {
      partitionKey: "P1",
      rowKey: "R1",
      foo: "foo",
      bar: 123,
    };
    await client.createEntity(testEntity);
  });

  it("ReadmeSampleDeleteEntity", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    // deleteEntity deletes the entity that matches exactly the partitionKey and rowKey
    await client.deleteEntity("<partitionKey>", "<rowKey>");
  });

  it("ReadmeSampleUpdateEntity", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const entity = { partitionKey: "p1", rowKey: "r1", bar: "updatedBar" };
    // @ts-preserve-whitespace
    // Update uses update mode "Merge" as default
    // merge means that update will match a stored entity
    // that has the same partitionKey and rowKey as the entity
    // passed to the method and then will only update the properties present in it.
    // Any other properties that are not defined in the entity passed to updateEntity
    // will remain as they are in the service
    await client.updateEntity(entity);
    // @ts-preserve-whitespace
    // We can also set the update mode to Replace, which will match the entity passed
    // to updateEntity with one stored in the service and replace with the new one.
    // If there are any missing properties in the entity passed to updateEntity, they
    // will be removed from the entity stored in the service
    await client.updateEntity(entity, "Replace");
  });

  it("ReadmeSampleUpsertEntity", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const entity = { partitionKey: "p1", rowKey: "r1", bar: "updatedBar" };
    // @ts-preserve-whitespace
    // Upsert uses update mode "Merge" as default.
    // This behaves similarly to update but creates the entity
    // if it doesn't exist in the service
    await client.upsertEntity(entity);
    // @ts-preserve-whitespace
    // We can also set the update mode to Replace.
    // This behaves similarly to update but creates the entity
    // if it doesn't exist in the service
    await client.upsertEntity(entity, "Replace");
  });

  it("ReadmeSampleSubmitTransaction", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const actions: TransactionAction[] = [
      ["create", { partitionKey: "p1", rowKey: "1", data: "test1" }],
      ["delete", { partitionKey: "p1", rowKey: "2" }],
      ["update", { partitionKey: "p1", rowKey: "3", data: "newTest" }, "Merge"],
    ];
    const result = await client.submitTransaction(actions);
  });

  it("ReadmeSampleSubmitTransactionWithTableTransaction", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    const transaction = new TableTransaction();
    // @ts-preserve-whitespace
    // Call the available action in the TableTransaction object
    transaction.createEntity({ partitionKey: "p1", rowKey: "1", data: "test1" });
    transaction.deleteEntity("p1", "2");
    transaction.updateEntity({ partitionKey: "p1", rowKey: "3", data: "newTest" }, "Merge");
    // @ts-preserve-whitespace
    // submitTransaction with the actions list on the transaction.
    const result = await client.submitTransaction(transaction.actions);
  });

  it("ReadmeSampleDeleteTable", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const tableName = "<tableName>";
    // @ts-preserve-whitespace
    const credential = new AzureNamedKeyCredential(account, accountKey);
    const client = new TableClient(
      `https://${account}.table.core.windows.net`,
      tableName,
      credential,
    );
    // @ts-preserve-whitespace
    await client.deleteTable();
  });

  it("ReadmeSampleCreateTableClient_ConnectionString", async () => {
    const connectionString = "UseDevelopmentStorage=true";
    const client = TableClient.fromConnectionString(connectionString, "myTable");
  });

  it("ReadmeSampleCreateTableClient_Azurite", async () => {
    const client = new TableClient(
      "<Azurite-http-table-endpoint>",
      "myTable",
      new AzureNamedKeyCredential("<Azurite-account-name>", "<Azurite-account-key>"),
      { allowInsecureConnection: true },
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
