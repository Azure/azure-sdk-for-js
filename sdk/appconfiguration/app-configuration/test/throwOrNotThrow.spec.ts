import { AppConfigurationClient, ConfigurationSetting } from "../src";
import {
  getConnectionStringFromEnvironment,
  deleteKeyCompletely,
  assertThrowsRestError
} from "./testHelpers";
import * as assert from "assert";

// There's been discussion on other teams about what errors are thrown when. This
// is the file where I've documented the throws/notThrows cases to make coordination
// with other teams simpler. (there's redundancy with other parts of the test suite but
// that's okay)
describe("Various error cases", () => {
  let client: AppConfigurationClient;
  const nonMatchingETag = "never-match-etag";

  before(() => {
    client = new AppConfigurationClient(getConnectionStringFromEnvironment());
  });

  describe("throws", () => {
    let addedSetting: ConfigurationSetting;
    let nonExistentKey: string;

    beforeEach(async () => {
      addedSetting = await client.addConfigurationSetting({
        key: `etags-${Date.now()}`,
        value: "world"
      });

      nonExistentKey = "non-existent key " + addedSetting.key;
    });

    afterEach(async () => {
      await deleteKeyCompletely([addedSetting.key], client);
    });

    it("get: Non-existent key throws 404", async () => {
      await assertThrowsRestError(() => client.getConfigurationSetting(nonExistentKey), 404);
    });

    it("get: Non-existent key (ifMatch: non-matching etag) throws 404", async () => {
      await assertThrowsRestError(
        () => client.getConfigurationSetting(nonExistentKey, { ifMatch: nonMatchingETag }),
        412
      );
    });

    it("get: Non-existent key (ifMatch: *) throws 412", async () => {
      await assertThrowsRestError(
        () => client.getConfigurationSetting(nonExistentKey, { ifMatch: "*" }),
        412
      );
    });

    it("get: value is unchanged from etag (304) using ifNoneMatch, throws ReponseBodyNotFoundError (derived from RestError)", async () => {
      const errThrown = await assertThrowsRestError(
        () =>
          client.getConfigurationSetting(addedSetting.key, {
            ifNoneMatch: addedSetting.etag
          }),
        304
      );

      assert.equal("ResponseBodyNotFoundError", errThrown.name);
    });

    it("add: Setting already exists throws 412", async () => {
      await assertThrowsRestError(() => client.addConfigurationSetting(addedSetting), 412);
    });

    it("set: Existing key, (ifMatch: non-matching etag) throws 412", async () => {
      await assertThrowsRestError(
        () => client.setConfigurationSetting(addedSetting, { ifMatch: nonMatchingETag }),
        412
      );
    });

    it("set: trying to modify a read-only setting throws 409", async () => {
      await client.setReadOnly(addedSetting);

      await assertThrowsRestError(() => client.setConfigurationSetting(addedSetting), 409);
    });
  });

  // these are just here for completeness so we understand what the failures are for some
  // of the weirder, but possible, scenarios from our API.
  describe("throws, but not mainline scenarios", () => {
    const nonExistentKey = `non-existent-key-etags-${Date.now()}`;

    // it's a bit non-sensical (delete a key that doesn't exist but
    // only if it matches any key)
    it("delete: Non-existent key (ifMatch: *) throws 412", async () => {
      await assertThrowsRestError(
        () => client.deleteConfigurationSetting(nonExistentKey, { ifMatch: "*" }),
        412
      );
    });

    // again, a weird one - delete a non-existent key but only if the etag doesn't match
    it("delete: Non-existent key (ifMatch: non-matching etag) throws 412", async () => {
      await assertThrowsRestError(
        () => client.deleteConfigurationSetting(nonExistentKey, { ifMatch: nonMatchingETag }),
        412
      );
    });
  });

  describe("doesn't throw", () => {
    let addedSetting: ConfigurationSetting;
    let nonExistentKey: string;

    beforeEach(async () => {
      // same setup for all tests:
      // key: hello{date}, value: world

      // the 'no label' value for 'hello'
      addedSetting = await client.addConfigurationSetting({
        key: `etags-${Date.now()}`,
        value: "world"
      });

      nonExistentKey = "bogus key " + addedSetting.key;
    });

    afterEach(async () => {
      await deleteKeyCompletely([addedSetting.key], client);
    });

    it("delete: non-existent key (no etag)", async () => {
      await client.deleteConfigurationSetting(nonExistentKey);
    });
  });
});