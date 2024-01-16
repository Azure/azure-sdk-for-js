// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates item creation, read, delete and reading all items belonging to a container.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { logSampleHeader, handleError, finish, logStep } from "./Shared/handleError";
import { CosmosClient, PatchOperation } from "@azure/cosmos";

import { Families } from "./Data/Families.json";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

logSampleHeader("Item Management");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  // ensuring a database & container exists for us to work with
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });

  logStep("Insert items in to database '" + databaseId + "' and container '" + containerId + "'");

  await Promise.all(Families.map((itemDef: any) => container.items.create(itemDef)));
  console.log(Families.length + " items created");

  logStep("List items in container '" + container.id + "'");
  const { resources: itemDefList } = await container.items.readAll().fetchAll();

  for (const itemDef of itemDefList) {
    console.log(itemDef.id);
  }
  const id = itemDefList[0]!.id;
  if (typeof id === "undefined") {
    throw new Error("Id is undefined");
  }
  const item = container.item(id, undefined);
  logStep("Read item '" + item.id + "'");
  const { resource: readDoc } = await item.read();
  console.log("item with id '" + item.id + "' found");

  logStep("Read item with AccessCondition and no change to _etag");
  const { resource: item2, headers } = await item.read({
    accessCondition: { type: "IfNoneMatch", condition: readDoc._etag },
  });
  if (!item2 && headers["content-length"] === 0) {
    console.log(
      "As expected, no item returned. This is because the etag sent matched the etag on the server. i.e. you have the latest version of the item already"
    );
  }

  // if we someone else updates this item, its etag on the server would change.
  // repeating the above read with the old etag would then get a item in the response
  readDoc.foo = "bar";
  await item.replace(readDoc);
  const { resource: item3, headers: headers3 } = await item.read({
    accessCondition: { type: "IfNoneMatch", condition: readDoc._etag },
  });
  if (!item3 && headers3["content-length"] === 0) {
    throw "Expected item this time. Something is wrong!";
  } else {
    console.log(
      "This time the read request returned the item because the etag values did not match"
    );
  }

  const querySpec = {
    query: "SELECT * FROM Families f WHERE  f.lastName = @lastName",
    parameters: [
      {
        name: "@lastName",
        value: "Andersen",
      },
    ],
  };

  logStep("Query items in container '" + container.id + "'");
  const { resources: results } = await container.items.query(querySpec).fetchAll();

  if (results.length === 0) {
    throw "No items found matching";
  } else if (results.length > 1) {
    throw "More than 1 item found matching";
  }

  const person = results[0];
  console.log("The '" + person.id + "' family has lastName '" + person.lastName + "'");
  console.log("The '" + person.id + "' family has " + person.children.length + " children '");

  // add a new child to this family, and change the family's lastName
  const childDef = {
    firstName: "Newborn",
    gender: "unknown",
    fingers: 10,
    toes: 10,
  };

  person.children.push(childDef);
  person.lastName = "Updated Family";

  logStep("Replace item with id '" + item.id + "'");
  const { resource: updatedPerson } = await container.items.upsert(person);

  if (person && updatedPerson) {
    console.log("The '" + person.id + "' family has lastName '" + updatedPerson.lastName + "'");
    console.log(
      "The '" + person.id + "' family has " + updatedPerson.children.length + " children '"
    );
  }

  logStep("Trying to replace item when item has changed in the database");
  // The replace item above will work even if there's a new version of item on the server from what you originally read
  // If you want to prevent this from happening you can opt-in to a conditional update
  // Using accessCondition and etag you can specify that the replace only occurs if the etag you are sending matches the etag on the server
  // i.e. Only replace if the item hasn't changed

  // let's go update item
  person.foo = "bar";
  await item.replace(person);

  // now let's try another update to item with accessCondition and etag set
  person.foo = "should never get set";
  try {
    await item.replace(person, { accessCondition: { type: "IfMatch", condition: person._etag } });
    throw new Error("This should have failed!");
  } catch (err: any) {
    if (err) {
      console.log("As expected, the replace item failed with a pre-condition failure");
    } else {
      throw err;
    }
  }

  const upsertSource = itemDefList[1];
  logStep(
    `Upserting person ${upsertSource && upsertSource.id} with id ${
      upsertSource && upsertSource.id
    }...`
  );

  // a non-identity change will cause an update on upsert
  upsertSource.foo = "baz";
  const { resource: upsertedPerson1 } = await container.items.upsert(upsertSource);
  if (upsertedPerson1) {
    console.log(`Upserted ${upsertedPerson1.id} to id ${upsertedPerson1.id}.`);
  }
  // an identity change will cause an insert on upsert
  upsertSource.id = "HazzardFamily";
  const { resource: upsertedPerson2 } = await container.items.upsert(upsertSource);
  if (upsertedPerson2) {
    console.log(`Upserted ${upsertedPerson2.id} to id ${upsertedPerson2.id}.`);
  }

  if (upsertedPerson1 && upsertedPerson2) {
    if (upsertedPerson1.id === upsertedPerson2.id) {
      throw new Error("These two upserted records should have different resource IDs.");
    }
  }
  logStep("Patching an item with single patch operation");
  const patchSource = itemDefList.find((t) => t.id == "AndersenFamily");
  console.log(JSON.stringify(patchSource));
  const replaceOperation: PatchOperation[] = [
    {
      op: "replace",
      path: "/lastName",
      value: "Martin",
    },
  ];
  if (patchSource) {
    const patchId = patchSource && patchSource.id;
    if (typeof id === "undefined") {
      throw new Error("ID for old offer is undefined");
    }
    const { resource: patchSource1 } = await container.item(patchId!).patch(replaceOperation);
    if (patchSource1)
      console.log(`Patched ${patchSource.lastName} to new ${patchSource1.lastName}.`);
    logStep("Patching an item with multiple patch operations");
    const multipleOperations: PatchOperation[] = [
      {
        op: "add",
        path: "/aka",
        value: "MeFamily",
      },
      {
        op: "replace",
        path: "/lastName",
        value: "Jose",
      },
      {
        op: "remove",
        path: "/parents",
      },
      {
        op: "set",
        path: "/address/zip",
        value: 90211,
      },
      {
        op: "incr",
        path: "/address/zip",
        value: 5,
      },
    ];
    const { resource: patchSource2 } = await container.item(patchId!).patch(multipleOperations);
    if (patchSource2) {
      console.log(`Patched ${JSON.stringify(patchSource)} to new ${JSON.stringify(patchSource2)}.`);
    }

    logStep("Conditionally Patching an item using it's id");
    const operations: PatchOperation[] = [
      {
        op: "add",
        path: "/newImproved",
        value: "it works",
      },
    ];
    const condition = "from c where NOT IS_DEFINED(c.newImproved)";
    const { resource: patchSource3 } = await container
      .item(patchId!)
      .patch({ condition, operations });
    if (patchSource3) {
      console.log(`Patched ${JSON.stringify(patchSource)} to new ${JSON.stringify(patchSource3)}.`);
    }
  }
  logStep("Delete item '" + item.id + "'");
  await item.delete();

  await finish();
}
run().catch(handleError);
