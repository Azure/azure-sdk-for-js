import assert from "assert";
import { UserDefinition } from "../../client";
import { createOrUpsertUser, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });
  describe("Validate User CRUD", function() {
    const userCRUDTest = async function(isUpsertTest: boolean) {
      // create database
      const database = await getTestDatabase("Validate user CRUD");

      // list users
      const { result: users } = await database.users.readAll().toArray();
      assert.equal(users.constructor, Array, "Value should be an array");
      const beforeCreateCount = users.length;

      // create user
      const { body: userDef } = await createOrUpsertUser(database, { id: "new user" }, undefined, isUpsertTest);
      assert.equal(userDef.id, "new user", "user name error");
      let user = database.user(userDef.id);

      // list users after creation
      const { result: usersAfterCreation } = await database.users.readAll().toArray();
      assert.equal(usersAfterCreation.length, beforeCreateCount + 1);

      // query users
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: "new user"
          }
        ]
      };
      const { result: results } = await database.users.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace user
      userDef.id = "replaced user";
      let replacedUser: UserDefinition;
      if (isUpsertTest) {
        const r = await database.users.upsert(userDef);
        replacedUser = r.body;
      } else {
        const r = await user.replace(userDef);
        replacedUser = r.body;
      }
      assert.equal(replacedUser.id, "replaced user", "user name should change");
      assert.equal(userDef.id, replacedUser.id, "user id should stay the same");
      user = database.user(replacedUser.id);

      // read user
      const { body: userAfterReplace } = await user.read();
      assert.equal(replacedUser.id, userAfterReplace.id);

      // delete user
      const { body: res } = await user.delete();

      // read user after deletion
      try {
        await user.read();
        assert.fail("Must fail to read user after deletion");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("nativeApi Should do User CRUD operations successfully name based", async function() {
      await userCRUDTest(false);
    });

    it("nativeApi Should do User CRUD operations successfully name based with upsert", async function() {
      await userCRUDTest(true);
    });
  });
});
