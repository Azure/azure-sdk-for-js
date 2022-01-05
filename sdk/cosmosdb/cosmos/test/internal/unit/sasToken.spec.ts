// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CosmosClient } from "../../../src";
import { endpoint } from "../../public/common/_testConfig";
import { masterKey, userSasTokenKey } from "../../public/common/_fakeTestSecrets";
import { SasTokenPermissionKind } from "../../../src/common";
import { createAuthorizationSasToken } from "../../../src/utils/SasToken";
import { SasTokenProperties } from "../../../src/client/SasToken/SasTokenProperties";

describe.skip("SAS Token Authorization", function () {
  const sasTokenProperties = <SasTokenProperties>{
    user: "user1",
    userTag: "",
    databaseName: "db1",
    containerName: "coll1",
    resourcePath: "/dbs/db1/colls/coll1/",
    partitionKeyValueRanges: [],
    startTime: new Date(),
    expiryTime: new Date(),
    keyType: 0,
    controlPlaneReaderScope: SasTokenPermissionKind.ContainerReadAny,
    controlPlaneWriterScope: 0,
    dataPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
    dataPlaneWriterScope: 0,
  };

  it("should connect with sas token properties set", async function () {
    const key = await createAuthorizationSasToken(masterKey, sasTokenProperties);

    // If connecting to the Cosmos DB Emulator, disable TLS verification for your node process:
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const client = new CosmosClient({
      endpoint,
      key: key,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    const database = client.database(sasTokenProperties.databaseName);
    const container = database.container(sasTokenProperties.containerName);
    const newItem = {
      id: "4",
      category: "fun",
      name: "Cosmos DB",
      description: "Complete Cosmos DB Node.js Quickstart ⚡.",
      isComplete: false,
    };

    const item = await container.items.create(newItem);
    assert(undefined !== item, "Should create an item based on sas token properties");

    const dbs = await client.databases.readAll().fetchAll();
    assert(undefined !== dbs, "Should be able to fetch list of databases");
  });

  it("should connect when a user set sas token", async function () {
    const sasTokenClient = new CosmosClient({
      endpoint,
      key: userSasTokenKey,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    const dbs = await sasTokenClient.databases.readAll().fetchAll();
    assert(undefined !== dbs, "Should be able to fetch list of databases");
  });
});
