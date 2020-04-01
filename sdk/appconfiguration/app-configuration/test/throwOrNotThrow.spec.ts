import { AppConfigurationClient, ConfigurationSetting } from "../src";
import {
  createAppConfigurationClientForTests,
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

  before(function() {
    client = createAppConfigurationClientForTests() || this.skip();
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

    afterEach(async function() {
      if (!this.currentTest?.isPending()) {
        await deleteKeyCompletely([addedSetting.key], client);
      }
    });

    it("get: Non-existent key throws 404", async () => {
      await assertThrowsRestError(
        () => client.getConfigurationSetting({ key: nonExistentKey }),
        404
      );
    });

    it("add: Setting already exists throws 412", async () => {
      await assertThrowsRestError(() => client.addConfigurationSetting(addedSetting), 412);
    });

    it("set: Existing key, (onlyIfUnchanged) throws 412", async () => {
      await assertThrowsRestError(
        () =>
          client.setConfigurationSetting(
            {
              ...addedSetting,
              etag: nonMatchingETag // purposefully make the etag not match the server
            },
            { onlyIfUnchanged: true }
          ),
        412
      );
    });

    it("set: trying to modify a read-only setting throws 409", async () => {
      await client.setReadOnly(addedSetting, true);

      await assertThrowsRestError(() => client.setConfigurationSetting(addedSetting), 409);
    });

    it("delete: key that is set to read-only throws 409", async () => {
      await client.setReadOnly(addedSetting, true);
      await assertThrowsRestError(async () => client.deleteConfigurationSetting(addedSetting), 409);
      await client.setReadOnly(addedSetting, false);
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

    afterEach(async function() {
      if (!this.currentTest?.isPending()) {
        await deleteKeyCompletely([addedSetting.key], client);
      }
    });

    it("get: value is unchanged from etag (304) using ifNoneMatch, sets all properties to undefined", async () => {
      const response = await client.getConfigurationSetting(addedSetting, {
        onlyIfChanged: true
      });

      assert.equal(304, response.statusCode);
      assert.ok(!response.value);
    });

    it("delete: non-existent key (no etag)", async () => {
      await client.deleteConfigurationSetting({ key: nonExistentKey });
    });
  });
});
