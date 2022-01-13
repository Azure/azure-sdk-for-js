// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Shows various ways to manage indexing items or changing container index policies.
 */

require("dotenv").config();

const { logSampleHeader, handleError, finish, logStep } = require("./Shared/handleError");
const { CosmosClient, IndexKind, DataType } = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

logSampleHeader("Index Management");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  // We're using the default indexing policy because by default indexingMode == consistent & automatic == true
  // which means that by default all items added to a container are indexed as the item is written
  const { container, resource: containerDef } = await database.containers.createIfNotExists({
    id: containerId,
  });

  logStep("Manually exclude an item from being indexed");
  console.log("create container with default index policy");

  // We're using the default indexing policy because by default indexingMode == consistent & automatic == true
  // which means that by default all items added to a container are indexed as the item is written
  // One of items.create() options is indexingDirectives which can be include, or exclude
  // We're using exclude this time to manually exclude this item from being indexed
  console.log("Create item, but exclude from index");
  const { resource: itemDef, item } = await container.items.create(
    { id: "item1", foo: "bar" },
    { indexingDirective: "exclude" }
  );

  if (itemDef) {
    console.log(`Item with id  ${itemDef.id} 'created`);
  }

  const querySpec = {
    query: "SELECT * FROM root r WHERE r.foo=@foo",
    parameters: [
      {
        name: "@foo",
        value: "bar",
      },
    ],
  };

  console.log("Querying all items for the given item should not find any results");
  const { resources: results } = await container.items.query(querySpec).fetchAll();
  if (results.length !== 0) {
    throw new Error("there were not meant to be results");
  }
  console.log("No results found");

  console.log("item.read() should still find the item");
  await item.read();
  console.log("item.read() found item");

  logStep("Switch auto indexing off, and manually index item");
  console.log("Update container indexingPolicy.automatic : false");

  const indexingPolicySpec = { automatic: false };

  // Index transform is an async operation that is performed on a Container
  // You can contiue to use the container while this is happening, but depending
  // on the transform and your queries you may get inconsistent results as the index is updated
  // In this case it will be almost instant because we only have one item
  // but this can take some time on larger containers
  await container.replace({
    id: containerId,
    partitionKey: containerDef && containerDef.partitionKey,
    indexingPolicy: indexingPolicySpec,
  });

  // items.create() takes RequestOptions as 2nd parameter.
  // One of these options is indexingDirectives which can be include, or exclude
  // we're using include this time to manually index this particular item
  console.log("Create item, and explicitly include in index");
  const { resource: itemDef2 } = await container.items.create(
    { id: "item2", foo: "bar" },
    { indexingDirective: "include" }
  );
  if (itemDef) {
    console.log(`Item with id  ${itemDef.id} 'created`);
  }

  console.log("Querying all items for a given item should find a result as it was indexed");
  const { resources: results2 } = await container.items.query(querySpec).fetchAll();
  if (results2.length === 0) {
    throw new Error("There were meant to be results");
  } else {
    const fetchedItemDef = results2[0];
    console.log("Item with id '" + fetchedItemDef && fetchedItemDef.id + "' found");
  }

  logStep("Create a range index on string path");
  // Azure Cosmos DB index knows about 3 datatypes - numbers, strings and geojson
  // Next we are going to create a custom index policy which enables range index on a string path

  console.log("update container with range index on string paths");
  await container.replace({
    id: containerId,
    partitionKey: containerDef && containerDef.partitionKey,
    indexingPolicy: {
      includedPaths: [
        {
          path: "/*",
          indexes: [
            {
              kind: IndexKind.Range,
              dataType: DataType.String,
            },
            {
              kind: IndexKind.Range,
              dataType: DataType.Number,
            },
          ],
        },
      ],
    },
  });

  if (containerDef) {
    console.log(`Container  ${containerDef.id} 'updated with new index policy`);
  }

  // create an item
  console.log("Creating item");
  await container.items.create({ id: "item3", stringField: "a string value" });
  console.log("Item created");

  console.log("Querying for item where stringField > 'a', should return results");
  // notice how we're switching to queryIterator.executeNext instead of calling .fetchAll() as before
  // reason being, fetchAll will issue multiple requests to the server until it has fetched all results
  // here we can control this using executeNext.
  // now we can get the headers for each request which includes the charge, continuation tokens etc.
  const queryIterator = container.items.query(
    {
      query: "SELECT * FROM root r WHERE r.stringField > @value",
      parameters: [
        {
          name: "@value",
          value: "a",
        },
      ],
    },
    { enableScanInQuery: true }
  );
  const { resources: items, requestCharge } = await queryIterator.fetchNext();
  const itemDef3 = items[0];
  console.log("Item '" + itemDef3 && itemDef3.id + "' found, request charge: " + requestCharge);

  logStep("Update index to exclude paths from indexing");
  await container.replace({
    id: containerId,
    partitionKey: containerDef && containerDef.partitionKey,
    indexingPolicy: {
      // the special "/" must always be included somewhere. in this case we're including root
      // and then excluding specific paths
      includedPaths: [
        {
          path: "/",
          indexes: [
            {
              kind: IndexKind.Range,
              dataType: DataType.Number,
              precision: 2,
            },
          ],
        },
      ],
      excludedPaths: [
        {
          path: "/metaData/*",
        },
      ],
    },
  });

  if (containerDef) {
    console.log(`Container  ${containerDef.id} 'updated with excludedPaths`);
  }

  // create an item
  console.log("Creating item");
  const { item: item4 } = await container.items.create({
    id: "item4",
    metaData: "meta",
    subDoc: {
      searchable: "searchable",
      subSubDoc: { someProperty: "value" },
    },
  });

  console.log("Item created");
  try {
    // expecting an exception on this query due to the fact that it includes paths that
    // have been excluded. If you want to force a scan, then enableScanInQuery
    console.log("Querying for item where metaData = 'meta', should throw an exception");
    const result = await container.items
      .query({
        query: "SELECT * FROM root r WHERE r.metaData = @value",
        parameters: [
          {
            name: "@value",
            value: "meta",
          },
        ],
      })
      .fetchAll();
    console.log(result.resources);
    throw new Error("Should've produced an error");
  } catch (err) {
    if (err instanceof Error) {
      if (err && err.message !== undefined) {
        console.log("Threw, as expected");
      } else {
        throw err;
      }
    }
  }

  // You can still read the item by its id
  console.log("Can still item.read() using '" + item4 && item4.id + "'");
  await item.read();
  await finish();
}

run().catch(handleError);
