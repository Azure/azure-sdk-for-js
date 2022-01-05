// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { PermissionMode } from "../../../src";
import { PermissionDefinition } from "../../../src";
import {
  createOrUpsertPermission,
  getTestContainer,
  removeAllDatabases,
  replaceOrUpsertPermission,
} from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });
  describe("Validate Permission CRUD", function () {
    const permissionCRUDTest = async function (isUpsertTest: boolean): Promise<void> {
      // create container & database
      const container = await getTestContainer("Validate Permission Crud");

      // create user
      const { resource: userDef } = await container.database.users.create({ id: "new user" });
      const user = container.database.user(userDef.id);
      // list permissions
      const { resources: permissions } = await user.permissions.readAll().fetchAll();
      assert.equal(permissions.constructor, Array, "Value should be an array");
      const beforeCreateCount = permissions.length;
      const permissionDef: PermissionDefinition = {
        id: "new permission",
        permissionMode: PermissionMode.Read,
        resource: container.url,
      };

      // create permission
      const { resource: createdPermission } = await createOrUpsertPermission(
        user,
        permissionDef,
        undefined,
        isUpsertTest
      );
      let permission = user.permission(createdPermission.id);
      assert.equal(createdPermission.id, "new permission", "permission name error");

      // list permissions after creation
      const { resources: permissionsAfterCreation } = await user.permissions.readAll().fetchAll();
      assert.equal(permissionsAfterCreation.length, beforeCreateCount + 1);

      // query permissions
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: permissionDef.id,
          },
        ],
      };
      const { resources: results } = await user.permissions.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      permissionDef.permissionMode = PermissionMode.All;
      const { resource: replacedPermission } = await replaceOrUpsertPermission(
        user,
        permissionDef,
        undefined,
        isUpsertTest
      );
      assert.equal(
        replacedPermission.permissionMode,
        PermissionMode.All,
        "permission mode should change"
      );
      assert.equal(permissionDef.id, replacedPermission.id, "permission id should stay the same");

      // to change the id of an existing resourcewe have to use replace
      permissionDef.id = "replaced permission";
      const { resource: replacedPermission2 } = await permission.replace(permissionDef);
      assert.equal(replacedPermission2.id, "replaced permission", "permission name should change");
      assert.equal(permissionDef.id, replacedPermission2.id, "permission id should stay the same");
      permission = user.permission(replacedPermission2.id);

      // read permission
      const { resource: permissionAfterReplace } = await permission.read();
      assert.equal(permissionAfterReplace.id, permissionDef.id);

      // delete permission
      await permission.delete();

      // read permission after deletion
      try {
        await permission.read();
        assert.fail("Must fail to read permission after deletion");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    const permissionCRUDOverMultiplePartitionsTest = async function (
      isUpsertTest: boolean
    ): Promise<void> {
      // create database
      // create container
      const partitionKey = "id";
      const containerDefinition = {
        id: "coll1",
        partitionKey: { paths: ["/" + partitionKey] },
      };
      const container = await getTestContainer(
        "permission CRUD over multiple partitions",
        undefined,
        containerDefinition
      );

      // create user
      const { resource: userDef } = await container.database.users.create({ id: "new user" });
      const user = container.database.user(userDef.id);

      // list permissions
      const { resources: permissions } = await user.permissions.readAll().fetchAll();
      assert(Array.isArray(permissions), "Value should be an array");
      const beforeCreateCount = permissions.length;
      const permissionDefinition = {
        id: "new permission",
        permissionMode: PermissionMode.Read,
        resource: container.url,
        resourcePartitionKey: [1],
      };

      // create permission
      const response = await createOrUpsertPermission(
        user,
        permissionDefinition,
        undefined,
        isUpsertTest
      );
      const permissionDef = response.resource;
      let permission = user.permission(permissionDef.id);
      assert.equal(permissionDef.id, permissionDefinition.id, "permission name error");
      assert.equal(
        JSON.stringify(permissionDef.resourcePartitionKey),
        JSON.stringify(permissionDefinition.resourcePartitionKey),
        "permission resource partition key error"
      );

      // list permissions after creation
      const { resources: permissionsAfterCreation } = await user.permissions.readAll().fetchAll();
      assert.equal(permissionsAfterCreation.length, beforeCreateCount + 1);

      // query permissions
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: permissionDef.id,
          },
        ],
      };
      const { resources: results } = await user.permissions.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      // Replace permission
      permissionDef.permissionMode = PermissionMode.All;
      const { resource: replacedPermission } = await replaceOrUpsertPermission(
        user,
        permissionDef,
        undefined,
        isUpsertTest
      );
      assert.equal(
        replacedPermission.permissionMode,
        PermissionMode.All,
        "permission mode should change"
      );
      assert.equal(replacedPermission.id, permissionDef.id, "permission id should stay the same");
      assert.equal(
        JSON.stringify(replacedPermission.resourcePartitionKey),
        JSON.stringify(permissionDef.resourcePartitionKey),
        "permission resource partition key error"
      );

      // to change the id of an existing resourcewe have to use replace
      permissionDef.id = "replaced permission";
      const { resource: replacedPermission2 } = await permission.replace(permissionDef);
      assert.equal(replacedPermission2.id, permissionDef.id);
      permission = user.permission(replacedPermission2.id);

      // read permission
      const { resource: permissionAfterReplace } = await permission.read();
      assert.equal(permissionAfterReplace.id, replacedPermission2.id);

      // delete permission
      await permission.delete();

      // read permission after deletion
      try {
        await permission.read();
        assert.fail("Must throw on read after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("nativeApi Should do Permission CRUD operations successfully name based", async function () {
      await permissionCRUDTest(false);
    });

    it("nativeApi Should do Permission CRUD operations successfully name based with upsert", async function () {
      await permissionCRUDTest(true);
    });

    it("nativeApi Should do Permission CRUD operations over multiple partitions successfully name based", async function () {
      await permissionCRUDOverMultiplePartitionsTest(false);
    });

    it("nativeApi Should do Permission CRUD operations over multiple partitions successfully with upsert", async function () {
      await permissionCRUDOverMultiplePartitionsTest(true);
    });
  });
});
