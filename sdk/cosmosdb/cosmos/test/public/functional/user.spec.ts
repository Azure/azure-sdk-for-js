// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { UserDefinition } from "../../../src";
import { createOrUpsertUser, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });
  describe("Validate User CRUD", function () {
    const userCRUDTest = async function (isUpsertTest: boolean): Promise<void> {
      // create database
      const database = await getTestDatabase("Validate user CRUD");

      // list users
      const { resources: users } = await database.users.readAll().fetchAll();
      assert.equal(users.constructor, Array, "Value should be an array");
      const beforeCreateCount = users.length;

      // create user
      const { resource: userDef } = await createOrUpsertUser(
        database,
        { id: "new user" },
        undefined,
        isUpsertTest
      );
      assert.equal(userDef.id, "new user", "user name error");
      let user = database.user(userDef.id);

      // list users after creation
      const { resources: usersAfterCreation } = await database.users.readAll().fetchAll();
      assert.equal(usersAfterCreation.length, beforeCreateCount + 1);

      // query users
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: "new user",
          },
        ],
      };
      const { resources: results } = await database.users.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace user
      userDef.id = "replaced user";
      let replacedUser: UserDefinition;
      if (isUpsertTest) {
        const r = await database.users.upsert(userDef);
        replacedUser = r.resource;
      } else {
        const r = await user.replace(userDef);
        replacedUser = r.resource;
      }
      assert.equal(replacedUser.id, "replaced user", "user name should change");
      assert.equal(userDef.id, replacedUser.id, "user id should stay the same");
      user = database.user(replacedUser.id);

      // read user
      const { resource: userAfterReplace } = await user.read();
      assert.equal(replacedUser.id, userAfterReplace.id);

      // delete user
      await user.delete();

      // read user after deletion
      try {
        await user.read();
        assert.fail("Must fail to read user after deletion");
      } catch (err: any) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("nativeApi Should do User CRUD operations successfully name based", async function () {
      await userCRUDTest(false);
    });

    it("nativeApi Should do User CRUD operations successfully name based with upsert", async function () {
      await userCRUDTest(true);
    });
  });
});
