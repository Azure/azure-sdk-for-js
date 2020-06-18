// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CosmosClient, PermissionMode } from "../../src";
import { PermissionDefinition } from "../../src/client";
import { endpoint, masterKey } from "../common/_testConfig";
import {
  createOrUpsertPermission,
  getTestContainer,
  getTestDatabase,
  removeAllDatabases
} from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Validate Authorization", function() {
    it("should handle all the key options", async function() {
      const clientOptionsKey = new CosmosClient({ endpoint, key: masterKey });
      assert(
        undefined !== (await clientOptionsKey.databases.readAll().fetchAll()),
        "Should be able to fetch list of databases"
      );

      const clientOptionsAuthKey = new CosmosClient({ endpoint, key: masterKey });
      assert(
        undefined !== (await clientOptionsAuthKey.databases.readAll().fetchAll()),
        "Should be able to fetch list of databases"
      );

      const clientOptionsAuthMasterKey = new CosmosClient({ endpoint, key: masterKey });
      assert(
        undefined !== (await clientOptionsAuthMasterKey.databases.readAll().fetchAll()),
        "Should be able to fetch list of databases"
      );
    });

    const setupEntities = async function(isUpsertTest: boolean) {
      // create database
      const database = await getTestDatabase("Validate Authorization database");
      // create container1

      const { resource: container1 } = await database.containers.create({
        id: "Validate Authorization container"
      });
      // create document1
      const { resource: document1 } = await database
        .container(container1.id)
        .items.create({ id: "coll1doc1", foo: "bar", key: "value" });
      // create document 2
      const { resource: document2 } = await database
        .container(container1.id)
        .items.create({ id: "coll1doc2", foo: "bar2", key: "value2" });

      // create container 2
      const { resource: container2 } = await database.containers.create({
        id: "sample container2"
      });

      // create user1
      const { resource: user1 } = await database.users.create({ id: "user1" });
      let permission = {
        id: "permission On Coll1",
        permissionMode: PermissionMode.Read,
        resource: (container1 as any)._self
      }; // TODO: any rid stuff
      // create permission for container1
      const { resource: permissionOnColl1 } = await createOrUpsertPermission(
        database.user(user1.id),
        permission,
        undefined,
        isUpsertTest
      );
      assert((permissionOnColl1 as any)._token !== undefined, "permission token is invalid");
      permission = {
        id: "permission On Doc1",
        permissionMode: PermissionMode.All,
        resource: (document2 as any)._self // TODO: any rid
      };
      // create permission for document 2
      const { resource: permissionOnDoc2 } = await createOrUpsertPermission(
        database.user(user1.id),
        permission,
        undefined,
        isUpsertTest
      );
      assert((permissionOnDoc2 as any)._token !== undefined, "permission token is invalid"); // TODO: any rid

      // create user 2
      const { resource: user2 } = await database.users.create({ id: "user2" });
      permission = {
        id: "permission On coll2",
        permissionMode: PermissionMode.All,
        resource: (container2 as any)._self // TODO: any rid
      };
      // create permission on container 2
      const { resource: permissionOnColl2 } = await createOrUpsertPermission(
        database.user(user2.id),
        permission,
        undefined,
        isUpsertTest
      );
      const entities = {
        database,
        coll1: container1,
        coll2: container2,
        doc1: document1,
        doc2: document2,
        user1,
        user2,
        permissionOnColl1,
        permissionOnDoc2,
        permissionOnColl2
      };

      return entities;
    };

    const authorizationCRUDTest = async function(isUpsertTest: boolean) {
      try {
        const badclient = new CosmosClient({ endpoint });
        await badclient.databases.readAll().fetchAll();
        assert.fail("Must fail");
      } catch (err) {
        assert(err !== undefined, "error should not be undefined");
        const unauthorizedErrorCode = 401;
        assert.equal(err.code, unauthorizedErrorCode, "error code should be equal to 401");
      }

      // setup entities
      // TODO: should move this out of this test and into before/etc.
      const entities = await setupEntities(isUpsertTest);
      const resourceTokens: any = {};
      resourceTokens[entities.coll1.id] = (entities.permissionOnColl1 as any)._token;
      resourceTokens[entities.doc1.id] = (entities.permissionOnColl1 as any)._token;

      const col1Client = new CosmosClient({ endpoint, resourceTokens });

      // 1. Success-- Use Col1 Permission to Read
      const { resource: successColl1 } = await col1Client
        .database(entities.database.id)
        .container(entities.coll1.id)
        .read();
      assert(successColl1 !== undefined, "error reading container");

      // 2. Failure-- Use Col1 Permission to delete
      try {
        await col1Client
          .database(entities.database.id)
          .container(entities.coll1.id)
          .delete();
        assert.fail("must fail if no permission");
      } catch (err) {
        assert(err !== undefined, "expected to fail, no permission to delete");
        assert.equal(err.code, 403, "Must return a code for not authorized");
      }

      // 3. Success-- Use Col1 Permission to Read All Docs
      const { resources: successDocuments } = await col1Client
        .database(entities.database.id)
        .container(entities.coll1.id)
        .items.readAll()
        .fetchAll();
      assert(successDocuments !== undefined, "error reading documents");
      assert.equal(successDocuments.length, 2, "Expected 2 Documents to be succesfully read");

      // 4. Success-- Use Col1 Permission to Read Col1Doc1
      const { resource: successDoc } = await col1Client
        .database(entities.database.id)
        .container(entities.coll1.id)
        .item(entities.doc1.id, undefined)
        .read();
      assert(successDoc !== undefined, "error reading document");
      assert.equal(
        successDoc.id,
        entities.doc1.id,
        "Expected to read children using parent permissions"
      );
      // TODO: Permission Feed uses RID right now
      /*
            const col2Client = new CosmosClient({
                endpoint,
                auth: { permissionFeed: [entities.permissionOnColl2] },
            });
            const doc = { id: "new doc", CustomProperty1: "BBBBBB", customProperty2: 1000 };
            const col2Container = await col2Client.databaseDatabase(entities.db.id)
                .containerContainer(entities.coll2.id);
            const { resources: successDoc2 } = await createOrUpsertItem(
                col2Container, doc, undefined, isUpsertTest);
            assert(successDoc2 !== undefined, "error creating document");
            assert.equal(successDoc2.CustomProperty1, doc.CustomProperty1,
                "document should have been created successfully");
            */
    };

    const authorizationCRUDOverMultiplePartitionsTest = async function() {
      // create database
      // create container
      const partitionKey = "key";
      const containerDefinition = {
        id: "coll1",
        partitionKey: { paths: ["/" + partitionKey] }
      };
      const container = await getTestContainer(
        "authorization CRUD multiple partitons",
        undefined,
        containerDefinition
      );
      // create user
      const { resource: userDef } = await container.database.users.create({ id: "user1" });
      const user = container.database.user(userDef.id);

      const key = 1;
      const permissionDefinition: PermissionDefinition = {
        id: "permission1",
        permissionMode: PermissionMode.All,
        resource: container.url,
        resourcePartitionKey: [key]
      };

      // create permission
      const { resource: permission } = await user.permissions.create(permissionDefinition);
      assert((permission as any)._token !== undefined, "permission token is invalid");
      const resourceTokens: any = {};
      resourceTokens[container.id] = (permission as any)._token;

      const restrictedClient = new CosmosClient({ endpoint, resourceTokens });
      await restrictedClient
        .database(container.database.id)
        .container(container.id)
        .items.create({ id: "document1", key: 1 });
      try {
        await restrictedClient
          .database(container.database.id)
          .container(container.id)
          .items.create({ id: "document2", key: 2 });
        assert.fail("Must throw unauthorized on read");
      } catch (err) {
        const unauthorizedErrorCode = 403;
        assert.equal(err.code, unauthorizedErrorCode);
      }
    };

    it("Should do authorization successfully name based", async function() {
      await authorizationCRUDTest(false);
    });

    it("Should do authorization successfully name based with upsert", async function() {
      await authorizationCRUDTest(true);
    });

    it("Should do authorization over multiple partitions successfully name based", async function() {
      await authorizationCRUDOverMultiplePartitionsTest();
    });

    it("should allow deletion of a doc with container token", async function() {
      const container = await getTestContainer("Validate Authorization container");

      const { resource: item } = await container.items.create({
        id: "coll1doc1",
        foo: "bar",
        key: "value"
      });

      // Create User
      const { resource: user } = await container.database.users.create({ id: "user1" });

      // Create Permission
      const { resource: permission } = await createOrUpsertPermission(
        container.database.user(user.id),
        {
          id: "permission On Coll1",
          permissionMode: PermissionMode.All,
          resource: (await container.read()).resource._self
        },
        undefined,
        false
      );

      const resourceTokens = {
        [`dbs/${container.database.id}/colls/${container.id}`]: permission._token
      };

      const client = new CosmosClient({
        resourceTokens: resourceTokens,
        endpoint: endpoint,
        connectionPolicy: {
          enableEndpointDiscovery: false
        }
      });

      const { statusCode } = await client
        .database(container.database.id)
        .container(container.id)
        .item(item.id)
        .delete();

      assert.equal(statusCode, 204);
    });
  });
});
