// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import {
  CosmosClient,
  Constants,
  Container,
  PluginConfig,
  CosmosClientOptions,
} from "../../../src";
import { removeAllDatabases, getTestContainer } from "../common/TestHelpers";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { ResourceType, HTTPMethod, StatusCodes } from "../../../src";

const plugins: PluginConfig[] = [
  {
    on: "request",
    plugin: (context, next) => {
      // Intercepts the API request to create a non-partitioned container using an old API version
      if (context.resourceType === ResourceType.container && context.method === HTTPMethod.post) {
        context.body = JSON.stringify({ id: JSON.parse(context.body).id });
      }
      context.headers[Constants.HttpHeaders.Version] = "2018-06-18";
      return next(context);
    },
  },
];

const options: CosmosClientOptions = {
  endpoint,
  key: masterKey,
};

const legacyClient = new CosmosClient({ ...options, plugins } as any);

const client = new CosmosClient({
  endpoint,
  key: masterKey,
});

describe("Non Partitioned Container", function () {
  let container: Container;
  before(async () => {
    await removeAllDatabases();
    const npContainer = await getTestContainer("Validate Container CRUD", legacyClient);
    container = client.database(npContainer.database.id).container(npContainer.id);
  });

  after(async () => {
    client.dispose();
    legacyClient.dispose();
  });

  it("should handle item CRUD", async () => {
    // read items
    const { resources: items } = await container.items.readAll().fetchAll();
    assert(Array.isArray(items), "Value should be an array");

    // create an item
    const name = "sample document";
    const { resource: item1 } = await container.items.create({
      id: "a",
      name,
      foo: "bar",
      key: "value",
    });

    assert.equal(item1.name, name);

    // read an item
    const { resource: item2 } = await container.item(item1.id, undefined).read();
    assert.equal(item2.id, item1.id);

    // upsert an item
    const { resource: item3 } = await container.items.upsert({
      id: "b",
      name: "sample document",
      foo: "bar",
      key: "value",
    });
    assert.equal(item3.name, name);

    // replace an item
    const newProp = "baz";
    const { resource: item4 } = await container.item("a", undefined).replace({
      id: "a",
      newProp,
    });
    assert.equal(item4.newProp, newProp);

    // read documents after creation
    const { resources: documents } = await container.items.readAll().fetchAll();
    assert.equal(documents.length, 2, "create should increase the number of documents");

    // query documents
    const { resources: results } = await container.items.query("SELECT * FROM root r").fetchAll();
    assert(results.length === 2, "Container should contain two items");

    // delete a document
    await container.item(item1.id, undefined).delete();

    // read documents after deletion
    const response = await container.item(item1.id, undefined).read();
    assert.equal(response.statusCode, StatusCodes.NotFound);
    assert.equal(response.resource, undefined);
  });
});
