// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTableClient, createTableServiceClient } from "./utils/recordedClient";

import { Context } from "mocha";
import { TableClient } from "../../src/TableClient";
import { TableServiceClient } from "../../src/TableServiceClient";
import { assert } from "chai";
import { isLiveMode } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { odata } from "../../src/odata";

const platform = isNodeLike ? "node" : "browser";

if (isLiveMode()) {
  describe(`AuthMethods Test ${platform}`, function () {
    let serviceClient: TableServiceClient;
    let tableClient: TableClient;
    const tableClientTableName = `Auth${platform}`;

    after(async function () {
      await tableClient.deleteTable();
    });

    describe("TableServiceClient", function () {
      beforeEach(async function (this: Context) {
        serviceClient = await createTableServiceClient();
      });

      it("Create and Delete Table", async function () {
        const tableName = `AuthTable${platform}`;
        await serviceClient.createTable(tableName, {
          onResponse: (rawResponse) => {
            assert.equal(rawResponse.status, 201);
          },
        });
        await serviceClient.deleteTable(tableName, {
          onResponse: (rawResponse) => {
            assert.equal(rawResponse.status, 204);
          },
        });
      });
    });

    describe("TableClient", function () {
      beforeEach(async function (this: Context) {
        tableClient = await createTableClient(tableClientTableName);
      });

      it("create, update and get entity", async function () {
        await tableClient.createTable();
        await tableClient.createEntity({ partitionKey: "P1", rowKey: "R1", foo: "bar" });
        await tableClient.updateEntity({ partitionKey: "P1", rowKey: "R1", foo: "baz" });
        const entity = await tableClient.getEntity("P1", "R1");
        assert.equal(entity.foo, "baz");
      });

      it("send a batch request", async function () {
        const partitionKey = "P2";
        await tableClient.createTable();

        await tableClient.submitTransaction([
          ["create", { partitionKey, rowKey: "R2", foo: "bar" }],
          ["create", { partitionKey, rowKey: "R4", foo: "baz" }],
        ]);
        const entities = tableClient.listEntities({
          queryOptions: { filter: odata`PartitionKey eq ${partitionKey}`, select: ["foo"] },
        });

        const values: string[] = [];

        for await (const entity of entities) {
          values.push(entity.foo as string);
        }

        assert.deepInclude(values, "bar");
        assert.deepInclude(values, "baz");
      });
    });
  });
}
