import assert from "assert";
import { Container, CosmosClient, DocumentBase } from "../..";
import { Database } from "../../client";
import { endpoint } from "../common/_testConfig";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("Authorization", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  // TODO: should have types for all these things
  let database: Database;
  let container: Container;

  let userReadDefinition: any = { id: "User With Read Permission" };
  let userAllDefinition: any = { id: "User With All Permission" };
  let collReadPermission: any = {
    id: "container Read Permission",
    permissionMode: DocumentBase.PermissionMode.Read
  };
  let collAllPermission: any = {
    id: "container All Permission",
    permissionMode: DocumentBase.PermissionMode.All
  };
  /************** TEST **************/

  beforeEach(async function() {
    await removeAllDatabases();

    // create a database & container
    container = await getTestContainer("Authorization tests");
    database = container.database;

    // create userReadPermission
    const { body: userDef } = await container.database.users.create(userReadDefinition);
    assert.equal(userReadDefinition.id, userDef.id, "userReadPermission is not created properly");
    userReadDefinition = userDef;
    const userRead = container.database.user(userDef.id);

    // give permission to read container, to userReadPermission
    collReadPermission.resource = container.url;
    const { body: readPermission } = await userRead.permissions.create(collReadPermission);
    assert.equal(readPermission.id, collReadPermission.id, "permission to read coll1 is not created properly");
    collReadPermission = readPermission;

    // create userAllPermission
    const { body: userAllDef } = await container.database.users.create(userAllDefinition);
    assert.equal(userAllDefinition.id, userAllDef.id, "userAllPermission is not created properly");
    userAllDefinition = userAllDef;
    const userAll = container.database.user(userAllDef.id);

    // create collAllPermission
    collAllPermission.resource = container.url;
    const { body: allPermission } = await userAll.permissions.create(collAllPermission);
    assert.equal(collAllPermission.id, allPermission.id, "permission to read coll2 is not created properly");
    collAllPermission = allPermission;
  });

  afterEach(async function() {
    await removeAllDatabases();
  });

  it("Accessing container by resourceTokens", async function() {
    const rTokens: any = {};
    rTokens[container.id] = collReadPermission._token;

    const clientReadPermission = new CosmosClient({
      endpoint,
      auth: { resourceTokens: rTokens }
    });

    const { body: coll } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .read();
    assert.equal(coll.id, container.id, "invalid container");
  });

  it("Accessing container by permissionFeed", async function() {
    const clientReadPermission = new CosmosClient({
      endpoint,
      auth: { permissionFeed: [collReadPermission] }
    });

    // self link must be used to access a resource using permissionFeed
    const { body: coll } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .read();
    assert.equal(coll.id, container.id, "invalid container");
  });

  it("Accessing container without permission fails", async function() {
    const clientNoPermission = new CosmosClient({ endpoint, auth: null });

    try {
      await clientNoPermission
        .database(database.id)
        .container(container.id)
        .read();
      assert.fail("accessing container did not throw");
    } catch (err) {
      assert(err !== undefined); // TODO: should check that we get the right error message
    }
  });

  it("Accessing document by permissionFeed of parent container", async function() {
    const { body: createdDoc } = await container.items.create({
      id: "document1"
    });
    const clientReadPermission = new CosmosClient({
      endpoint,
      auth: { permissionFeed: [collReadPermission] }
    });
    assert.equal("document1", createdDoc.id, "invalid documnet create");

    const { body: readDoc } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .item(createdDoc.id)
      .read<any>();
    assert.equal(readDoc.id, createdDoc.id, "invalid document read");
  });

  it("Modifying container by resourceTokens", async function() {
    const rTokens: any = {};
    rTokens[container.id] = collAllPermission._token;
    const clientAllPermission = new CosmosClient({
      endpoint,
      auth: { resourceTokens: rTokens }
    });

    // delete container
    return clientAllPermission
      .database(database.id)
      .container(container.id)
      .delete();
  });

  it("Modifying container by permissionFeed", async function() {
    const clientAllPermission = new CosmosClient({
      endpoint,
      auth: { permissionFeed: [collAllPermission] }
    });

    // self link must be used to access a resource using permissionFeed
    // delete container
    return clientAllPermission
      .database(database.id)
      .container(container.id)
      .delete();
  });
});
