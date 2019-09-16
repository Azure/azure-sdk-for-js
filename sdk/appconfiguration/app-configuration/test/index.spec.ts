// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import { getConnectionStringFromEnvironment } from "./testHelpers";
import * as dotenv from "dotenv";
import { AppConfigurationClient } from "../src";

dotenv.config();

describe("AppConfigurationClient", () => {
  const settings: Array<{ key: string; label?: string }> = [];

  let client: AppConfigurationClient;

  before("validate environment variables", () => {
    let connectionString = getConnectionStringFromEnvironment();
    client = new AppConfigurationClient(connectionString);
  });

  after("cleanup", async () => {
    for (const setting of settings) {
      await client.deleteConfigurationSetting(setting.key, { label: setting.label });
    }
  });

  describe("constructor", () => {
    it("supports connection string", async () => {
      const connectionString = getConnectionStringFromEnvironment();
      const client = new AppConfigurationClient(connectionString);
      // make sure a service call succeeds
      await client.listConfigurationSettings();
    });
  });

  describe("simple usages", () => {
    it("Add and query a setting without a label", async () => {
      const key = `noLabelTests-${Date.now()}`;

      await client.addConfigurationSetting(key, { value: "added" });

      await compare({
        key,
        value: "added",
        label: null
      });

      await client.deleteConfigurationSetting(key, {});

      // will recreate the setting
      await client.setConfigurationSetting(key, { value: "set" });

      await compare({
        key,
        value: "set",
        label: null
      });

      // and now acts as a wholesale update
      await client.setConfigurationSetting(key, { value: "set a second time" });

      await compare({
        key,
        value: "set a second time",
        label: null
      });

      await client.deleteConfigurationSetting(key, {});
    });

    async function compare(expected: { key: string, value: string, label: (string | null) }) {
      const actualSettings = await client.getConfigurationSetting(expected.key);

      assert.equal(expected.key, actualSettings.key);
      assert.equal(expected.value, actualSettings.value);
      assert.equal(expected.label, actualSettings.label);
    }
  });

  describe("addConfigurationSetting", () => {
    it("sample works", async () => {
      const key = `addConfigSample-${Date.now()}`;
      const result = await client.setConfigurationSetting(key, {
        value: "MyValue"
      });

      assert.equal(key, result.key);
    });

    it("adds a configuration setting", async () => {
      const key = `addConfigTest-${Date.now()}`;
      const label = "MyLabel";
      const value = "MyValue";
      const result = await client.addConfigurationSetting(key, { label, value });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );
    });

    it("throws an error if the configuration setting already exists", async () => {
      const key = `addConfigTestTwice-${Date.now()}`;
      const label = "test";
      const value = "foo";
      const result = await client.addConfigurationSetting(key, { label, value });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );

      // attempt to add the same setting
      try {
        await client.addConfigurationSetting(key, { label, value });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("deleteConfigurationSetting", () => {
    it("deletes an existing configuration setting", async () => {
      const key = `deleteConfigTest-${Date.now()}`;
      const label = "MyLabel";
      const value = "MyValue";

      // create configuration
      const result = await client.addConfigurationSetting(key, { label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );

      // delete configuration
      const deletedSetting = await client.deleteConfigurationSetting(key, { label });
      assert.equal(
        deletedSetting.key,
        key,
        "Unexpected key in result from deleteConfigurationSetting()."
      );
      assert.equal(
        deletedSetting.label,
        label,
        "Unexpected label in result from deleteConfigurationSetting()."
      );
      assert.equal(
        deletedSetting.value,
        value,
        "Unexpected value in result from deleteConfigurationSetting()."
      );

      // confirm setting no longer exists
      try {
        await client.getConfigurationSetting(key, { label });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });

    it("deletes an existing configuration setting (valid etag)", async () => {
      const key = `deleteConfigTestEtag-${Date.now()}`;
      const label = "test";
      const value = "foo";

      // create configuration
      const result = await client.addConfigurationSetting(key, { label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );

      // delete configuration
      const deletedSetting = await client.deleteConfigurationSetting(key, {
        label,
        etag: result.etag
      });
      assert.equal(
        deletedSetting.key,
        key,
        "Unexpected key in result from deleteConfigurationSetting()."
      );
      assert.equal(
        deletedSetting.label,
        label,
        "Unexpected label in result from deleteConfigurationSetting()."
      );
      assert.equal(
        deletedSetting.value,
        value,
        "Unexpected value in result from deleteConfigurationSetting()."
      );

      // confirm setting no longer exists
      try {
        await client.getConfigurationSetting(key, { label });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });

    it("does not throw when deleting a non-existent configuration setting", async () => {
      const key = `deleteConfigTestNA-${Date.now()}`;
      const label = "test";

      // delete configuration
      await client.deleteConfigurationSetting(key, { label });
    });

    it("throws when deleting a configuration setting (invalid etag)", async () => {
      const key = `deleteConfigTestBadEtag-${Date.now()}`;
      const label = "test";
      const value = "foo";

      // create configuration
      const result = await client.addConfigurationSetting(key, { label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );

      settings.push({ key, label });

      // delete configuration
      try {
        await client.deleteConfigurationSetting(key, { label, etag: "incorrect" });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("getConfigurationSetting", () => {
    it("retrieves an existing configuration setting", async () => {
      const key = `getConfigTest-${Date.now()}`;
      const label = "test";
      const value = "foo";
      const tags = {
        bar: "baz",
        car: "caz"
      };
      const contentType = "application/json";

      // create configuration
      const result = await client.addConfigurationSetting(key, { label, value, contentType, tags });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting()."
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting()."
      );
      assert.equal(
        result.locked,
        false,
        "Unexpected locked in result from addConfigurationSetting()."
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting()."
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting()."
      );

      // retrieve the value from the service
      const remoteResult = await client.getConfigurationSetting(key, { label });
      assert.equal(
        remoteResult.key,
        key,
        "Unexpected key in result from getConfigurationSetting()."
      );
      assert.equal(
        remoteResult.label,
        label,
        "Unexpected label in result from getConfigurationSetting()."
      );
      assert.equal(
        remoteResult.value,
        value,
        "Unexpected value in result from getConfigurationSetting()."
      );
      assert.equal(
        remoteResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from getConfigurationSetting()."
      );
      assert.equal(
        remoteResult.locked,
        false,
        "Unexpected locked in result from getConfigurationSetting()."
      );
      assert.deepEqual(
        remoteResult.tags,
        tags,
        "Unexpected tags in result from getConfigurationSetting()."
      );
      assert.equal(
        remoteResult.contentType,
        contentType,
        "Unexpected contentType in result from getConfigurationSetting()."
      );
    });

    it("throws when retrieving a non-existent configuration setting", async () => {
      const key = `getConfigTestNA-${Date.now()}`;
      const label = "test";

      // retrieve the value from the service
      try {
        await client.getConfigurationSetting(key, { label });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("listConfigurationSettings", () => {
    it("lists available configurationsettings", async () => {
      const keys = [
        `listConfigTest1-${Date.now()}`,
        `listConfigTest2-${Date.now()}`,
        `listConfigTest3-${Date.now()}`
      ];
      const label = `test-list-${Date.now()}`;
      const value = "foo";

      // add configurations
      for (const key of keys) {
        await client.addConfigurationSetting(key, { label, value });

        settings.push({ key, label });
      }

      const results = await client.listConfigurationSettings({ label: [label] });

      assert.equal(results.length, keys.length);
      // sort keys to make assertions easier
      results.sort((a, b) => (a.key! < b.key! ? -1 : 1));

      for (let i = 0; i < keys.length; i++) {
        assert.equal(
          results[i].key,
          keys[i],
          "Unexpected key in result from listConfigurationSettings()."
        );
        assert.equal(
          results[i].label,
          label,
          "Unexpected label in result from listConfigurationSettings()."
        );
        assert.equal(
          results[i].value,
          value,
          "Unexpected value in result from listConfigurationSettings()."
        );
      }
    });
  });
  describe("listRevisions", () => {
    it("lists revisions for a configuration setting", async () => {
      // create a setting and update it to create multiple revisions
      const key = `listRevisionsTest-${Date.now()}`;
      const label = `test-list-${Date.now()}`;

      await client.addConfigurationSetting(key, { label, value: "foo1" });
      await client.setConfigurationSetting(key, { label, value: "foo2" });

      const result = await client.listRevisions({ label: [label] });

      assert.equal(result.length, 2);
    });

    it("sample code works", async () => {
      const key = `listRevisionsSample-${Date.now()}`;

      // create a new setting
      await client.addConfigurationSetting(key, { value: "foo1" });

      // update it with a new value
      await client.setConfigurationSetting(key, { value: "foo2" });

      // retrieves all revisions matching that label
      const result = await client.listRevisions({ key: [key] });

      assert.equal(result.length, 2);
    });
  });

  describe("setConfigurationSetting", () => {
    it("replaces a configuration setting", async () => {
      const key = `setConfigTest-${Date.now()}`;
      const label = "test";
      const contentType = "application/json";
      const tags = {
        bar: "baz",
        car: "caz"
      };

      // create configuration
      const result = await client.addConfigurationSetting(key, {
        label,
        value: "foo",
        contentType,
        tags
      });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        "foo",
        "Unexpected value in result from addConfigurationSetting()."
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting()."
      );
      assert.equal(
        result.locked,
        false,
        "Unexpected locked in result from addConfigurationSetting()."
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting()."
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting()."
      );

      const replacedResult = await client.setConfigurationSetting(key, { label, value: "foo2" });

      assert.equal(
        replacedResult.key,
        key,
        "Unexpected key in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.label,
        label,
        "Unexpected label in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.value,
        "foo2",
        "Unexpected value in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.locked,
        false,
        "Unexpected locked in result from setConfigurationSetting()."
      );
      assert.deepEqual(
        replacedResult.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting()."
      );
      assert.strictEqual(
        replacedResult.contentType,
        null,
        "Unexpected contentType in result from setConfigurationSetting()."
      );
    });

    it("replaces a configuration setting (valid etag)", async () => {
      const key = `setConfigTestEtag-${Date.now()}`;
      const label = "test";
      const contentType = "application/json";
      const tags = {
        bar: "baz",
        car: "caz"
      };

      // create configuration
      const result = await client.addConfigurationSetting(key, {
        label,
        value: "foo",
        contentType,
        tags
      });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        "foo",
        "Unexpected value in result from addConfigurationSetting()."
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting()."
      );
      assert.equal(
        result.locked,
        false,
        "Unexpected locked in result from addConfigurationSetting()."
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting()."
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting()."
      );

      const replacedResult = await client.setConfigurationSetting(key, {
        label,
        value: "foo2",
        etag: result.etag
      });

      assert.equal(
        replacedResult.key,
        key,
        "Unexpected key in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.label,
        label,
        "Unexpected label in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.value,
        "foo2",
        "Unexpected value in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting()."
      );
      assert.equal(
        replacedResult.locked,
        false,
        "Unexpected locked in result from setConfigurationSetting()."
      );
      assert.deepEqual(
        replacedResult.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting()."
      );
      assert.strictEqual(
        replacedResult.contentType,
        null,
        "Unexpected contentType in result from setConfigurationSetting()."
      );
    });

    it("creates a configuration setting if it doesn't exist", async () => {
      const key = `setConfigTestNA-${Date.now()}`;
      const label = "test";
      const value = "foo";

      const result = await client.setConfigurationSetting(key, { label, value: "foo" });
      assert.equal(result.key, key, "Unexpected key in result from setConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from setConfigurationSetting()."
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from setConfigurationSetting()."
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting()."
      );
      assert.equal(
        result.locked,
        false,
        "Unexpected locked in result from setConfigurationSetting()."
      );
      assert.deepEqual(
        result.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting()."
      );
      assert.strictEqual(
        result.contentType,
        null,
        "Unexpected contentType in result from setConfigurationSetting()."
      );
    });

    it("throws when replacing a configuration setting (invalid etag)", async () => {
      const key = `setConfigTestBadEtag-${Date.now()}`;
      const label = "test";
      const contentType = "application/json";
      const tags = {
        bar: "baz",
        car: "caz"
      };

      // create configuration
      const result = await client.addConfigurationSetting(key, {
        label,
        value: "foo",
        contentType,
        tags
      });

      settings.push({ key, label });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting()."
      );
      assert.equal(
        result.value,
        "foo",
        "Unexpected value in result from addConfigurationSetting()."
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting()."
      );
      assert.equal(
        result.locked,
        false,
        "Unexpected locked in result from addConfigurationSetting()."
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting()."
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting()."
      );

      try {
        await client.setConfigurationSetting(key, { label, value: "foo2", etag: "incorrect" });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });
});
