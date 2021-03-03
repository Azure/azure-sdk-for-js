// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { logSampleHeader, handleError, finish } from "./Shared/handleError";
import { Container, Permission, User, CosmosClient, PermissionMode } from "../dist";
import { endpoint, key, database as databaseId } from "./Shared/config";

logSampleHeader("User Management");

const container1Name = "COL1";
const container2Name = "COL2";
const user1Name = "Thomas Andersen";
const user2Name = "Robin Wakefield";
const item1Name = "item1";
const item2Name = "item2";
const item3Name = "item3";

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  // --------------------------------------------------------------------------------------------------
  // We need a database, two containers, two users, and some permissions for this sample,
  // So let's go ahead and set these up initially
  // --------------------------------------------------------------------------------------------------
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container: container1 } = await database.containers.createIfNotExists({
    id: container1Name
  });
  const { container: container2 } = await database.containers.createIfNotExists({
    id: container2Name
  });

  let itemSpec = { id: item1Name };

  let userDef = { id: user1Name };

  let permissionDef;

  const { item: item1 } = await container1.items.create(itemSpec);
  console.log(item1Name + "Created in " + container1Name + " !");

  itemSpec = { id: item2Name };

  await container1.items.create(itemSpec);
  console.log(item2Name + "Created in " + container1Name + " !");

  itemSpec = { id: item3Name };

  await container2.items.create(itemSpec);
  console.log(item3Name + " Created in " + container2Name + " !");

  const { user: user1 } = await database.users.create(userDef);
  console.log(user1Name + " created!");

  userDef = { id: user2Name };

  const { user: user2 } = await database.users.create(userDef);
  console.log(user2Name + " created!");

  // Read Permission on container 1 for user1
  permissionDef = { id: "p1", permissionMode: PermissionMode.Read, resource: container1.url };

  const { permission: permission1 } = await user1.permissions.create(permissionDef);
  console.log("Read only permission assigned to Thomas Andersen on container 1!");

  permissionDef = { id: "p2", permissionMode: PermissionMode.All, resource: item1.url };

  // All Permissions on Doc1 for user1
  await user1.permissions.create(permissionDef);
  console.log("All permission assigned to Thomas Andersen on item 1!");

  permissionDef = { id: "p3", permissionMode: PermissionMode.Read, resource: container2.url };

  // Read Permissions on Col2 for user1
  const { permission: permission3 } = await user1.permissions.create(permissionDef);
  console.log("Read permission assigned to Thomas Andersen on container 2!");

  permissionDef = { id: "p4", permissionMode: PermissionMode.All, resource: container2.url };

  await user2.permissions.create(permissionDef);
  console.log("All permission assigned to Robin Wakefield on container 2!");

  const { resources: permissions } = await user1.permissions.readAll().fetchAll();
  console.log("Fetched permission for Thomas Andersen. Count is : " + permissions.length);

  const resourceTokens = await getResourceToken(container1, permission1);
  const resourceTokenClient = new CosmosClient({
    endpoint,
    resourceTokens
  });

  await resourceTokenClient
    .database(databaseId)
    .container(container1.id)
    .items.readAll()
    .fetchAll();
  console.log(user1.id + " able to perform read operation on container 1");

  try {
    await resourceTokenClient.databases.readAll().fetchAll();
  } catch (err) {
    console.log(
      "Expected error occurred as " +
        user1.id +
        " does not have access to get the list of databases. Error code : " +
        err.code
    );
  }

  await attemptWriteWithReadPermission(container1, user1, permission1);
  await attemptReadFromTwoCollections(container1, container2, user1, permission1, permission3);
  await finish();
}

async function getResourceToken(
  container: Container,
  permission: Permission
): Promise<{
  [x: number]: any;
}> {
  const { resource: permDef } = await permission.read();
  return { [container.url]: permDef._token };
}

async function attemptWriteWithReadPermission(
  container: Container,
  user: User,
  permission: Permission
): Promise<void> {
  const resourceTokens = await getResourceToken(container, permission);
  const cosmosClient = new CosmosClient({
    endpoint,
    resourceTokens
  });

  const itemDef = { id: "not allowed" };
  try {
    await cosmosClient
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

// attempts to read from both the containers as the user has read permission
async function attemptReadFromTwoCollections(
  container1: Container,
  container2: Container,
  user1: User,
  permission1: Permission,
  permission2: Permission
): Promise<void> {
  const token1 = await getResourceToken(container1, permission1);
  const token2 = await getResourceToken(container2, permission2);
  const resourceTokens = { ...token1, ...token2 };

  const cosmosClient = new CosmosClient({
    endpoint,
    resourceTokens
  });

  const { resources: items1 } = await client
    .database(databaseId)
    .container(container1.id)
    .items.readAll()
    .fetchAll();
  console.log(
    user1.id + " able to read items from container 1. Document count is " + items1.length
  );

  const { resources: items2 } = await client
    .database(databaseId)
    .container(container2.id)
    .items.readAll()
    .fetchAll();

  console.log(
    user1.id + " able to read items from container 2. Document count is " + items2.length
  );

  const itemDef = { id: "not allowed" };

  try {
    await cosmosClient
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
