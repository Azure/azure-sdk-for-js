// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using SasTokens for granting scoped access to Cosmos resources. *Private feature*
 */

const path = require("path");
require("dotenv").config();

const { SasTokenPermissionKind } = require("../dist-esm/common/constants");
const { createAuthorizationSasToken } = require("../dist-esm/utils/SasToken");
const { handleError, finish, logStep } = require("./Shared/handleError");
const { CosmosClient } = require("../dist-esm/CosmosClient");

const { COSMOS_ENDPOINT: endpoint, COSMOS_KEY: masterKey } = process.env;
const sasToken = "your-sas-token";

async function run() {
  logStep("Create a SasToken object");

  const sasTokenProperties = {
    user: "your-user",
    userTag: "your-userTag",
    databaseName: "your-databaseName",
    containerName: "your-containerName",
    resourcePath: "your-resource-path",
    partitionKeyValueRanges: [],
    startTime: new Date(),
    expiryTime: new Date(),
    keyType: 0,
    controlPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
    controlPlaneWriterScope: 0,
    dataPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
    dataPlaneWriterScope: 0
  };

  const key = await createAuthorizationSasToken(masterKey, sasTokenProperties);

  // If connecting to the Cosmos DB Emulator, disable TLS verification for your node process:
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const client = new CosmosClient({
    endpoint,
    key: key
  });

  const database = client.database(sasTokenProperties.databaseName);
  const container = database.container(sasTokenProperties.containerName);
  const newItem = {
    id: "your-itemId",
    category: "your-category",
    name: "your-name",
    description: "your-description",
    isComplete: false
  };

  const querySpec = {
    query: "SELECT * from c"
  };

  await container.items.create(newItem);

  // read all items in the Items container
  const { resources: items } = await container.items.query(querySpec).fetchAll();

  items.forEach((item) => {
    console.log(`${item.id} - ${item.description}`);
  });

  await client.databases.readAll().fetchAll();

  logStep("Fetch all databases using existing user token");
  const sasTokenClient = new CosmosClient({
    endpoint,
    key: sasToken
  });

  logStep("Fetch all databases");
  await sasTokenClient.databases.readAll().fetchAll();

  await finish();
}

run().catch(handleError);
