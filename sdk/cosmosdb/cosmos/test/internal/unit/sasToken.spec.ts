// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import { endpoint } from "../../public/common/_testConfig.js";
import { masterKey, userSasTokenKey } from "../../public/common/_fakeTestSecrets.js";
import { SasTokenPermissionKind } from "../../../src/common/index.js";
import { createAuthorizationSasToken } from "../../../src/utils/SasToken.js";
import type { SasTokenProperties } from "../../../src/client/SasToken/SasTokenProperties.js";
import { CosmosKeyType } from "../../../src/common/index.js";
import { CosmosContainerChildResourceKind } from "../../../src/common/constants.js";
import { describe, it, assert, expect } from "vitest";

describe("SAS Token Payload", () => {
  it("encodes partitionKeyValueRanges as plain strings, not byte arrays", async () => {
    const sasTokenProperties: SasTokenProperties = {
      user: "user1",
      userTag: "tag1",
      databaseName: "db1",
      containerName: "coll1",
      resourcePath: "",
      resourceName: "item1",
      resourceKind: CosmosContainerChildResourceKind.Item,
      partitionKeyValueRanges: ["rangeA", "rangeB"],
      startTime: new Date("2024-01-01T00:00:00Z"),
      expiryTime: new Date("2024-01-02T00:00:00Z"),
      keyType: CosmosKeyType.PrimaryMaster,
      controlPlaneReaderScope: SasTokenPermissionKind.ContainerReadAny,
      controlPlaneWriterScope: 0,
      dataPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
      dataPlaneWriterScope: 0,
    };

    const token = await createAuthorizationSasToken(masterKey, sasTokenProperties);

    // Extract payload from token: "type=sas&ver=1.0&sig=<sig>;<payloadBase64>"
    const payloadBase64 = token.split(";").slice(1).join(";");
    const payload = Buffer.from(payloadBase64, "base64").toString("utf-8");

    // The partition ranges line should contain the plain string values, not byte arrays
    const lines = payload.split("\n");
    // partitionRanges is the 4th field (index 3) in the payload
    const partitionRangesLine = lines[3];
    expect(partitionRangesLine).toBe("rangeA,rangeB,");
    // Verify it does NOT contain numeric byte representations
    expect(partitionRangesLine).not.toMatch(/^\d+(,\d+)*/);
  });

  it("produces empty partition ranges when array is empty", async () => {
    const sasTokenProperties: SasTokenProperties = {
      user: "user1",
      userTag: "tag1",
      databaseName: "db1",
      containerName: "coll1",
      resourcePath: "",
      resourceName: "",
      resourceKind: CosmosContainerChildResourceKind.Item,
      partitionKeyValueRanges: [],
      startTime: new Date("2024-01-01T00:00:00Z"),
      expiryTime: new Date("2024-01-02T00:00:00Z"),
      keyType: CosmosKeyType.PrimaryMaster,
      controlPlaneReaderScope: SasTokenPermissionKind.ContainerReadAny,
      controlPlaneWriterScope: 0,
      dataPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
      dataPlaneWriterScope: 0,
    };

    const token = await createAuthorizationSasToken(masterKey, sasTokenProperties);
    const payloadBase64 = token.split(";").slice(1).join(";");
    const payload = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const lines = payload.split("\n");
    expect(lines[3]).toBe("");
  });

  it("returns a token with correct prefix format", async () => {
    const sasTokenProperties: SasTokenProperties = {
      user: "user1",
      userTag: "",
      databaseName: "db1",
      containerName: "coll1",
      resourcePath: "",
      resourceName: "",
      resourceKind: CosmosContainerChildResourceKind.Item,
      partitionKeyValueRanges: [],
      startTime: new Date("2024-01-01T00:00:00Z"),
      expiryTime: new Date("2024-01-02T00:00:00Z"),
      keyType: CosmosKeyType.PrimaryMaster,
      controlPlaneReaderScope: SasTokenPermissionKind.ContainerReadAny,
      controlPlaneWriterScope: 0,
      dataPlaneReaderScope: SasTokenPermissionKind.ContainerFullAccess,
      dataPlaneWriterScope: 0,
    };

    const token = await createAuthorizationSasToken(masterKey, sasTokenProperties);
    expect(token).toMatch(/^type=sas&ver=1\.0&sig=.+;.+$/);
  });
});

describe.skip("SAS Token Authorization", () => {
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

  it("should connect with sas token properties set", async () => {
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

  it("should connect when a user set sas token", async () => {
    const sasTokenClient = new CosmosClient({
      endpoint,
      key: userSasTokenKey,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    const dbs = await sasTokenClient.databases.readAll().fetchAll();
    assert(undefined !== dbs, "Should be able to fetch list of databases");
  });
});
