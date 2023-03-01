// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Suite } from "mocha";
import { BulkOperationType } from "../../../src";
import { addEntropy, getTestDatabase } from "../common/TestHelpers";

describe("Diagnostics Test", function (this: Suite) {
  it("usecase 1", async function () {
    // create database
    const database = await getTestDatabase("sample 中文 database");
    // create container
    const containerDef = await database.containers.create({ id: "sample container" });
    const diagnostic = containerDef.diagnostics;
    console.log(diagnostic);
    // const container: Container = database.container(containerDef.resource.id);
  });

  it("usecase diagnostics", async function () {
    // create database
    const database = await getTestDatabase("sample 中文 database");
    // create container
    const { resource: containerDef } = await database.containers.create({ id: "sample container" });

    const container = database.container(containerDef.id);
    const readItemId = addEntropy("id1");
    const deleteItemId = addEntropy("id2");
    const replaceItemId = addEntropy("id3");
    const operations = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "A",
        resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" },
      },
      {
        operationType: BulkOperationType.Read,
        id: readItemId,
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Delete,
        id: deleteItemId,
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Replace,
        partitionKey: 5,
        id: replaceItemId,
        resourceBody: { id: replaceItemId, name: "nice", key: 5 },
      },
    ];
    const responses = await container.items.bulk(operations);

    console.log(responses.diagnostics);
    // const container: Container = database.container(containerDef.resource.id);
  });
});
