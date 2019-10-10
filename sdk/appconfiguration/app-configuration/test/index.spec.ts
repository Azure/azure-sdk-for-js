// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import {
  getConnectionStringFromEnvironment,
  deleteKeyCompletely,
  toSortedArray,
  assertEqualSettings,
  assertThrowsRestError
} from "./testHelpers";
import { AppConfigurationClient } from "../src";
import { quoteETag, formatWildcards, extractAfterTokenFromNextLink } from '../src/internal/helpers';
import { ResponseBodyNotFoundError } from '@azure/core-http';

describe("AppConfigurationClient", () => {
  const settings: Array<{ key: string; label?: string }> = [];

  let client: AppConfigurationClient;

  before("validate environment variables", () => {
    let connectionString = getConnectionStringFromEnvironment();
    client = new AppConfigurationClient(connectionString);
  });

  after("cleanup", async () => {
    for (const setting of settings) {
      await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
    }
  });

  describe("constructor", () => {
    it("supports connection string", async () => {
      const connectionString = getConnectionStringFromEnvironment();
      const client = new AppConfigurationClient(connectionString);

      // make sure a service call succeeds

      // just not throwing an exception is enough - we just want to make sure that the call
      // can work.
      for await (const _ of await client.listConfigurationSettings()) {
        break;
      }
    });
  });

  describe("simple usages", () => {
    it("Add and query a setting without a label", async () => {
      const key = `noLabelTests-${Date.now()}`;

      await client.addConfigurationSetting({ key, value: "added" });

      await compare({
        key,
        value: "added",
        label: undefined
      });

      await client.deleteConfigurationSetting({ key });

      // will recreate the setting
      await client.setConfigurationSetting({ key, value: "set" });

      await compare({
        key,
        value: "set",
        label: undefined
      });

      // and now acts as a wholesale update
      await client.setConfigurationSetting({ key, value: "set a second time" });

      await compare({
        key,
        value: "set a second time",
        label: undefined
      });

      await client.deleteConfigurationSetting({ key });
    });

    async function compare(expected: { key: string; value: string; label?: string }) {
      const actualSettings = await client.getConfigurationSetting(expected);

      assert.equal(expected.key, actualSettings.key);
      assert.equal(expected.value, actualSettings.value);
      assert.equal(expected.label, actualSettings.label);
    }
  });

  describe("addConfigurationSetting", () => {
    it("sample works", async () => {
      const key = `addConfigSample-${Date.now()}`;
      const result = await client.setConfigurationSetting({
        key,
        value: "MyValue"
      });

      assert.equal(key, result.key);
    });

    it("adds a configuration setting", async () => {
      const key = `addConfigTest-${Date.now()}`;
      const label = "MyLabel";
      const value = "MyValue";
      const result = await client.addConfigurationSetting({ key, label, value });

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
      const result = await client.addConfigurationSetting({ key, label, value });

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
        await client.addConfigurationSetting({ key, label, value });
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
      const result = await client.addConfigurationSetting({ key, label, value });

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
      const deletedSetting = await client.deleteConfigurationSetting(result);
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
        await client.getConfigurationSetting({ key, label });
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
      const result = await client.addConfigurationSetting({ key, label, value });

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
      const deletedSetting = await client.deleteConfigurationSetting({
        key,
        label
      }, { ifMatch: result.etag });
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
        await client.getConfigurationSetting({ key, label });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });

    it("does not throw when deleting a non-existent configuration setting", async () => {
      const key = `deleteConfigTestNA-${Date.now()}`;
      const label = "test";

      // delete configuration
      const response = await client.deleteConfigurationSetting({ key, label });

      // we hoist this code up to the top in case users want to check if the 
      // delete actually happened (status code: 200) or if the setting wasn't 
      // found which results in the same state but might matter to 
      // the user(status code: 204)
      assert.equal(response._response.status, response.statusCode);
      assert.equal(204, response.statusCode);

      // also, fields throw on access
      assert.throws(() => response.key, (err: ResponseBodyNotFoundError) => {
        assert.equal("ResponseBodyNotFoundError", err.name);
        
        assert.equal("The key that we were requested to delete was not found (data in the non-response properties will be invalid)", err.message);
        assert.equal("Resource already deleted or missing", err.code);
        
        return true;
      });
    });

    it("throws when deleting a configuration setting (invalid etag)", async () => {
      const key = `deleteConfigTestBadEtag-${Date.now()}`;
      const label = "test";
      const value = "foo";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

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
      await assertThrowsRestError(() => client.deleteConfigurationSetting({ key, label }, { ifMatch: "incorrect" }), 412);
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
      const result = await client.addConfigurationSetting({ key, label, value, contentType, tags });

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
      const remoteResult = await client.getConfigurationSetting({ key, label });
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
        await client.getConfigurationSetting({ key, label });
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("listConfigurationSettings", () => {
    const now = Date.now();
    const uniqueLabel = `listConfigSettingsLabel-${now}`;

    before(async () => {
      await client.addConfigurationSetting({
        key: `listConfigSettingA-${now}`,
        label: uniqueLabel,
        value: "[A] production value"
      });
      await client.addConfigurationSetting({
        key: `listConfigSettingA-${now}`,
        value: "[A] value"
      });

      await client.addConfigurationSetting({
        key: `listConfigSettingB-${now}`,
        label: uniqueLabel,
        value: "[B] production value"
      });
      await client.addConfigurationSetting({
        key: `listConfigSettingB-${now}`,
        value: "[B] value"
      });
    });

    after(async () => {
      await deleteKeyCompletely([`listConfigSettingA-${now}`, `listConfigSettingB-${now}`], client);
    });

    it("undefined doesn't throw and will just return everything", async () => {
      const settingsIterator = await client.listConfigurationSettings();
      await settingsIterator.next();
    });

    it("exact match on label", async () => {
      // query with a direct label match
      let byLabelIterator = client.listConfigurationSettings({ labels: [uniqueLabel] });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel
          },
          {
            key: `listConfigSettingB-${now}`,
            value: "[B] production value",
            label: uniqueLabel
          }
        ],
        byLabelSettings
      );
    });

    it("label wildcards", async () => {
      // query with a direct label match
      let byLabelIterator = client.listConfigurationSettings({
        labels: ["*" + uniqueLabel.substring(1)]
      });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel
          },
          {
            key: `listConfigSettingB-${now}`,
            value: "[B] production value",
            label: uniqueLabel
          }
        ],
        byLabelSettings
      );
    });

    it("exact match on key", async () => {
      let byKeyIterator = client.listConfigurationSettings({ keys: [`listConfigSettingA-${now}`] });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel
          },
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] value",
            label: undefined
          }
        ],
        byKeySettings
      );
    });

    it("key wildcards", async () => {
      // query with a key wildcard
      let byKeyIterator = client.listConfigurationSettings({ keys: [`*istConfigSettingA-${now}`] });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel
          },
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] value",
            label: undefined
          }
        ],
        byKeySettings
      );
    });

    // TODO: this test is entirely too slow and needs to be replaced with
    //  one that uses recorded responses.
    /*
    it("list with multiple pages", async () => {
      const key = `listMultiplePagesOfResults-${Date.now()}`;

      // this number is arbitrarily chosen to match the size of a page + 1
      const expectedNumberOfLabels = 200;

      for (let i = 0; i < expectedNumberOfLabels; i++) {
        await client.addConfigurationSetting({
          key,
          value: `the value for ${i}`,
          label: i.toString()
        });
      }

      let listResult = await client.listConfigurationSettings({
        keys: [key]
      });

      let allResults = new Set<string>();
      let nextLinks = [];

      let addLabel = (label: string) => {
        assert.ok(!allResults.has(label));
        allResults.add(label);
      };

      listResult.items!.forEach(item => addLabel(item.label!));

      while (listResult.nextLink) {
        nextLinks.push(listResult.nextLink);

        listResult = await client.listConfigurationSettingsNext(listResult.nextLink, {
          keys: [key]
        });

        listResult.items!.forEach(item => addLabel(item.label!));
      }

      assert.equal(2, nextLinks.length);
      assert.equal(expectedNumberOfLabels, allResults.size);
      
      await cleanupSampleValues([key], client);
    });
    */
  });

  describe("listRevisions", () => {
    const now = Date.now();
    const key = `listRevisions-${now}`;
    const labelA = `list-revisions-A-${now}`;
    const labelB = `list-revisions-B-${now}`;

    before(async () => {
      // we'll generate two sets of keys and labels for this selection
      await client.addConfigurationSetting({ key, label: labelA, value: "fooA1" });
      await client.setConfigurationSetting({ key, label: labelA, value: "fooA2" });

      await client.addConfigurationSetting({ key, label: labelB, value: "fooB1" });
      await client.setConfigurationSetting({ key, label: labelB, value: "fooB2" });
    });

    it("exact match on label", async () => {
      const revisionsWithLabelIterator = await client.listRevisions({ labels: [labelA] });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [{ key, label: labelA, value: "fooA1" }, { key, label: labelA, value: "fooA2" }],
        revisions
      );
    });

    it("label wildcards", async () => {
      const revisionsWithLabelIterator = await client.listRevisions({
        labels: ["*" + labelA.substring(1)]
      });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [{ key, label: labelA, value: "fooA1" }, { key, label: labelA, value: "fooA2" }],
        revisions
      );
    });

    it("exact match on key", async () => {
      const revisionsWithKeyIterator = await client.listRevisions({ keys: [key] });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1" },
          { key, label: labelA, value: "fooA2" },
          { key, label: labelB, value: "fooB1" },
          { key, label: labelB, value: "fooB2" }
        ],
        revisions
      );
    });

    it("key wildcards", async () => {
      const revisionsWithKeyIterator = await client.listRevisions({
        keys: ["*" + key.substring(1)]
      });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1" },
          { key, label: labelA, value: "fooA2" },
          { key, label: labelB, value: "fooB1" },
          { key, label: labelB, value: "fooB2" }
        ],
        revisions
      );
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
      const result = await client.addConfigurationSetting({
        key,
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

      const replacedResult = await client.setConfigurationSetting({ key, label, value: "foo2" });

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
      const result = await client.addConfigurationSetting({
        key,
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

      const replacedResult = await client.setConfigurationSetting({
        key,
        label,
        value: "foo2"
      }, { ifMatch: result.etag });

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

      const result = await client.setConfigurationSetting({ key, label, value: "foo" });
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
      const result = await client.addConfigurationSetting({
        key,
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
        await client.setConfigurationSetting(
          { key, label, value: "foo2" },
          { ifMatch: "incorrect" }
        );
        throw new Error("Test failure");
      } catch (err) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("quoteETag", () => {
    it("undefined", () => {
      assert.equal(
        undefined,
        quoteETag(undefined)
      );

      assert.equal(
        '"etagishere"',
        quoteETag("etagishere")
      );

      assert.equal(
        "'etagishere'",
        quoteETag("'etagishere'")
      );

      assert.equal(
        "*",
        quoteETag("*")
      );
    });
  });

  describe("formatWildcards", () => {
    it("undefined", () => {
      const result = formatWildcards({
        keys: undefined,
        labels: undefined
      });

      assert.ok(!result.key);
      assert.ok(!result.label);
    });

    it("single values only", () => {
      const result = formatWildcards({
        keys: ["key1"],
        labels: ["label1"]
      });

      assert.equal("key1", result.key);
      assert.equal("label1", result.label);
    });

    it("multiple values", () => {
      const result = formatWildcards({
        keys: ["key1", "key2"],
        labels: ["label1", "label2"]
      });

      assert.equal("key1,key2", result.key);
      assert.equal("label1,label2", result.label);
    });
  });

  describe("extractAfterTokenFromNextLink", () => {
    it("token is extracted and properly unescaped", () => {
      let token = extractAfterTokenFromNextLink(
        "/kv?key=someKey&api-version=1.0&after=bGlah%3D"
      );
      assert.equal("bGlah=", token);
    });
  });
});
