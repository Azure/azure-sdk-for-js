import * as assert from "assert";
import { CosmosClient } from "../../";
import { UserDefinition } from "../../client";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const endpoint = testConfig.host;
const masterKey = testConfig.masterKey;
const client = new CosmosClient({ endpoint, auth: { masterKey } });

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  // remove all databases from the endpoint before each test
  beforeEach(async function() {
    this.timeout(10000);
    try {
      await TestHelpers.removeAllDatabases(client);
    } catch (err) {
      throw err;
    }
  });
  describe("Validate User CRUD", function() {
    const userCRUDTest = async function(isUpsertTest: boolean) {
      // create database
      const database = await TestHelpers.getTestDatabase(client, "Validate user CRUD");

      // list users
      const { result: users } = await database.users.readAll().toArray();
      assert.equal(users.constructor, Array, "Value should be an array");
      const beforeCreateCount = users.length;

      // create user
      const { body: userDef } = await TestHelpers.createOrUpsertUser(
        database,
        { id: "new user" },
        undefined,
        isUpsertTest
      );
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
