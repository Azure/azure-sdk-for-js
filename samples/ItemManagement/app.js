// @ts-check

console.log();
console.log("Azure Cosmos DB Node.js Samples");
console.log("================================");
console.log();
console.log("ITEM MANAGEMENT");
console.log("===================");
console.log();

const cosmos = require("../../lib/");
const CosmosClient = cosmos.CosmosClient;
const config = require("../Shared/config");
const fs = require("fs");
const databaseId = config.names.database;
const containerId = config.names.container;

const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

const getItemDefinitions = function() {
  const data = fs.readFileSync("../Shared/Data/Families.json", "utf8");
  return JSON.parse(data).Families;
};

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, auth: { masterKey } });

//-------------------------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. create items   - Insert some items in to container
// 2. list items     - Read the item feed for a container
// 3. read item
// 3.1                  - Read a single item by its id
// 3.2                  - Use ETag and AccessCondition to only return a item if ETag does not match
// 4. query items    - Query for items by some property
// 5. replace item
// 5.1                  - Update some properties and replace the item
// 5.2                  - Use ETag and AccessCondition to only replace item if it has not changed
// 6. upsert item    - Update a item if it exists, else create new item
// 7. delete item    - Given a item id, delete it
//-------------------------------------------------------------------------------------------------------

async function run() {
  //ensuring a database & container exists for us to work with
  const { container, database } = await init();

  //1.
  console.log("\n1. insert items in to database '" + databaseId + "' and container '" + containerId + "'");
  const itemDefs = getItemDefinitions();
  const p = [];
  for (const itemDef of itemDefs) {
    p.push(container.items.create(itemDef));
  }
  await Promise.all(p);
  console.log(itemDefs.length + " items created");

  //2.
  console.log("\n2. list items in container '" + container.id + "'");
  const { result: itemDefList } = await container.items.readAll().toArray();

  for (const itemDef of itemDefList) {
    console.log(itemDef.id);
  }

  //3.1
  const item = container.item(itemDefList[0].id);
  console.log("\n3.1 read item '" + item.id + "'");
  const { body: readDoc } = await item.read();
  console.log("item with id '" + item.id + "' found");

  //3.2
  console.log("\n3.2 read item with AccessCondition and no change to _etag");
  const { body: item2, headers } = await item.read({
    accessCondition: { type: "IfNoneMatch", condition: readDoc._etag }
  });
  if (!item2 && headers["content-length"] == 0) {
    console.log(
      "As expected, no item returned. This is because the etag sent matched the etag on the server. i.e. you have the latest version of the item already"
    );
  }

  //if we someone else updates this item, its etag on the server would change.
  //repeating the above read with the old etag would then get a item in the response
  readDoc.foo = "bar";
  await item.replace(readDoc);
  const { body: item3, headers: headers3 } = await item.read({
    accessCondition: { type: "IfNoneMatch", condition: readDoc._etag }
  });
  if (!item3 && headers3["content-length"] === 0) {
    throw "Expected item this time. Something is wrong!";
  } else {
    console.log("This time the read request returned the item because the etag values did not match");
  }

  //4.
  const querySpec = {
    query: "SELECT * FROM Families f WHERE  f.lastName = @lastName",
    parameters: [
      {
        name: "@lastName",
        value: "Andersen"
      }
    ]
  };

  console.log("\n4. query items in container '" + container.id + "'");
  const { result: results } = await container.items.query(querySpec).toArray();

  if (results.length == 0) {
    throw "No items found matching";
  } else if (results.length > 1) {
    throw "More than 1 item found matching";
  }

  const person = results[0];
  console.log("The '" + person.id + "' family has lastName '" + person.lastName + "'");
  console.log("The '" + person.id + "' family has " + person.children.length + " children '");

  //add a new child to this family, and change the family's lastName
  const childDef = {
    firstName: "Newborn",
    gender: "unknown",
    fingers: 10,
    toes: 10
  };

  person.children.push(childDef);
  person.lastName = "Updated Family";

  //5.1
  console.log("\n5.1 replace item with id '" + item.id + "'");
  const { body: updatedPerson } = await item.replace(person);

  console.log("The '" + person.id + "' family has lastName '" + updatedPerson.lastName + "'");
  console.log("The '" + person.id + "' family has " + updatedPerson.children.length + " children '");

  // 5.2
  console.log("\n5.2 trying to replace item when item has changed in the database");
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
  } catch (err) {
    if (err.code == 412) {
      console.log("As expected, the replace item failed with a pre-condition failure");
    } else {
      throw err;
    }
  }

  //6.
  console.log("\n6. delete item '" + item.id + "'");
  await item.delete();

  await finish();
}

async function init() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  return { database, container };
}

async function handleError(error) {
  console.log("\nAn error with code '" + error.code + "' has occurred:");
  console.log("\t" + error.body || error);

  await finish();
}

async function finish() {
  await client.database(databaseId).delete();
  console.log("\nEnd of demo.");
}

run().catch(handleError);
