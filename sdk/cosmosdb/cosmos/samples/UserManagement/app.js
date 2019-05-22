// @ts-check
console.log();
console.log("Azure Cosmos DB Node.js Samples");
console.log("================================");
console.log();
console.log("USER MANAGEMENT");
console.log("================");
console.log();

const cosmos = require("../../lib/");
const CosmosClient = cosmos.CosmosClient;
const config = require("../Shared/config");
const databaseId = config.names.database;
const containerId = config.names.container;

const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

const container1Name = "COL1";
const container2Name = "COL2";
const user1Name = "Thomas Andersen";
const user2Name = "Robin Wakefield";
const item1Name = "item1";
const item2Name = "item2";
const item3Name = "item3";

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, auth: { masterKey } });

async function run() {
  const resources = await init();
  await attemptAdminOperations(resources.container1, resources.user1, resources.permission1);
  await attemptWriteWithReadPermissionAsync(resources.container1, resources.user1, resources.permission1);
  await attemptReadFromTwoCollections(
    resources.container1,
    resources.container2,
    resources.user1,
    resources.permission1,
    resources.permission3
  );
  await finish();
}

async function init() {
  //--------------------------------------------------------------------------------------------------
  // We need a database, two containers, two users, and some permissions for this sample,
  // So let's go ahead and set these up initially
  //--------------------------------------------------------------------------------------------------
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container: container1 } = await database.containers.createIfNotExists({ id: container1Name });
  const { container: container2 } = await database.containers.createIfNotExists({ id: container2Name });

  let itemSpec = { id: item1Name };

  let userDef = { id: user1Name };

  let permissionDef;

  const { body: itemDef, item: item1 } = await container1.items.create(itemSpec);
  console.log(item1Name + "Created in " + container1Name + " !");

  itemSpec = { id: item2Name };

  const { item: item2 } = await container1.items.create(itemSpec);
  console.log(item2Name + "Created in " + container1Name + " !");

  itemSpec = { id: item3Name };

  const { item: item3 } = await container2.items.create(itemSpec);
  console.log(item3Name + " Created in " + container2Name + " !");

  const { user: user1 } = await database.users.create(userDef);
  console.log(user1Name + " created!");

  userDef = { id: user2Name };

  const { user: user2 } = await database.users.create(userDef);
  console.log(user2Name + " created!");

  // Read Permission on container 1 for user1
  permissionDef = { id: "p1", permissionMode: cosmos.DocumentBase.PermissionMode.Read, resource: container1.url };

  const { ref: permission1 } = await user1.permissions.create(permissionDef);
  console.log("Read only permission assigned to Thomas Andersen on container 1!");

  permissionDef = { id: "p2", permissionMode: cosmos.DocumentBase.PermissionMode.All, resource: item1.url };

  // All Permissions on Doc1 for user1
  const { ref: permission2 } = await user1.permissions.create(permissionDef);
  console.log("All permission assigned to Thomas Andersen on item 1!");

  permissionDef = { id: "p3", permissionMode: cosmos.DocumentBase.PermissionMode.Read, resource: container2.url };

  // Read Permissions on Col2 for user1
  const { ref: permission3 } = await user1.permissions.create(permissionDef);
  console.log("Read permission assigned to Thomas Andersen on container 2!");

  permissionDef = { id: "p4", permissionMode: cosmos.DocumentBase.PermissionMode.All, resource: container2.url };

  const { ref: permission4 } = await user2.permissions.create(permissionDef);
  console.log("All permission assigned to Robin Wakefield on container 2!");

  const { result: permissions } = await user1.permissions.readAll().toArray();
  console.log("Fetched permission for Thomas Andersen. Count is : " + permissions.length);

  return { user1, user2, container1, container2, permission1, permission2, permission3, permission4 };
}

//handle error
async function handleError(error) {
  console.log();
  console.log("An error with code '" + error.code + "' has occurred:");
  console.log("\t" + error.body || error);
  if (error.headers) {
    console.log("\t" + JSON.stringify(error.headers));
  }
  console.log();
  try {
    await finish();
  } catch (err) {
    console.log("Database might not have cleaned itself up properly...");
  }
}

async function finish() {
  await client.database(databaseId).delete();
  console.log();
  console.log("End of demo.");
}

/**
 *
 * @param {cosmos.Permission} permission
 */
async function getResourceToken(container, permission) {
  const { body: permDef } = await permission.read();
  const resourceToken = {};
  resourceToken[container.url] = permDef._token;
  return resourceToken;
}

/**
 * Attempt to do admin operations when user only has Read on a container
 * @param {cosmos.Container} container
 * @param {cosmos.User} user
 * @param {cosmos.Permission} permission
 */
async function attemptAdminOperations(container, user, permission) {
  const resourceTokens = await getResourceToken(container, permission);
  const client = new CosmosClient({
    endpoint,
    auth: {
      resourceTokens
    }
  });

  await client
    .database(databaseId)
    .container(container.id)
    .items.readAll()
    .toArray();
  console.log(user.id + " able to perform read operation on container 1");

  try {
    await client.databases.readAll().toArray();
  } catch (err) {
    console.log(
      "Expected error occurred as " +
        user.id +
        " does not have access to get the list of databases. Error code : " +
        err.code
    );
  }
}

/**
 * attempts to write in container 1 with user 1 permission. It fails as the user1 has read only permission on container 1
 * @param {cosmos.Container} container
 * @param {cosmos.User} user
 * @param {cosmos.Permission} permission
 */
async function attemptWriteWithReadPermissionAsync(container, user, permission) {
  const resourceTokens = await getResourceToken(container, permission);
  const client = new CosmosClient({
    endpoint,
    auth: {
      resourceTokens
    }
  });

  const itemDef = { id: "not allowed" };
  try {
    await client
      .database(databaseId)
      .container(container.id)
      .items.upsert(itemDef);
  } catch (err) {
    console.log(
      "Expected error occurred as " +
        user.id +
        " does not have access to insert an item in the first container. Error code : " +
        err.code
    );
  }
}

//attempts to read from both the containers as the user has read permission
/**
 *
 * @param {cosmos.Container} container1
 * @param {cosmos.Container} container2
 * @param {cosmos.User} user1
 * @param {cosmos.Permission} permission1
 * @param {cosmos.Permission} permission2
 */
async function attemptReadFromTwoCollections(container1, container2, user1, permission1, permission2) {
  const token1 = await getResourceToken(container1, permission1);
  const token2 = await getResourceToken(container2, permission2);
  const resourceTokens = { ...token1, ...token2 };

  const client = new CosmosClient({
    endpoint,
    auth: {
      resourceTokens
    }
  });

  const { result: items1 } = await client
    .database(databaseId)
    .container(container1.id)
    .items.readAll()
    .toArray();
  console.log(user1.id + " able to read items from container 1. Document count is " + items1.length);

  const { result: items2 } = await client
    .database(databaseId)
    .container(container2.id)
    .items.readAll()
    .toArray();

  console.log(user1.id + " able to read items from container 2. Document count is " + items2.length);

  const itemDef = { id: "not allowed" };

  try {
    await client
      .database(databaseId)
      .container(container2.id)
      .items.upsert(itemDef);
  } catch (err) {
    console.log(
      "Expected error occurred as " +
        user1.id +
        " does not have access to insert an item in container 2. Error code : " +
        err.code
    );
  }
}

run().catch(handleError);
