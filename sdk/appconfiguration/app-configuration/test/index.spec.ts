// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import {
  createAppConfigurationClientForTests,
  deleteKeyCompletely,
  toSortedArray,
  assertEqualSettings,
  assertThrowsRestError,
  assertThrowsAbortError
} from "./testHelpers";
import { AppConfigurationClient, ConfigurationSetting } from "../src";
import { delay } from "@azure/core-http";

describe("AppConfigurationClient", () => {
  const settings: Array<{ key: string; label?: string }> = [];

  let client: AppConfigurationClient;

  before("validate environment variables", function() {
    client = createAppConfigurationClientForTests() || this.skip();
  });

  after("cleanup", async () => {
    for (const setting of settings) {
      await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
    }
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

      // just a sanity check - the 'eTag' field that gets added by the response headers
      // is removed (and is replaced by the 'etag' field in the model)
      assert.ok(!(result as any).eTag);
      assert.ok(result.etag);
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

    it("accepts operation options", async () => {
      const key = `addConfigTestTwice-${Date.now()}`;
      const label = "test";
      const value = "foo";
      await assertThrowsAbortError(async () => {
        await client.addConfigurationSetting(
          { key, label, value },
          {
            requestOptions: {
              timeout: 1
            }
          }
        );
      });
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
      assert.equal(200, deletedSetting._response.status);

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
      const deletedSetting = await client.deleteConfigurationSetting(
        {
          key,
          label
        },
        { onlyIfUnchanged: true }
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
      await assertThrowsRestError(
        () =>
          client.deleteConfigurationSetting(
            { key, label, etag: "invalid" },
            { onlyIfUnchanged: true }
          ),
        412
      );
    });

    it("accepts operation options", async () => {
      const key = `deleteConfigTest-${Date.now()}`;
      const label = "MyLabel";
      const value = "MyValue";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

      // delete configuration
      await assertThrowsAbortError(async () => {
        await client.deleteConfigurationSetting(result, {
          requestOptions: { timeout: 1 }
        });
      });
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
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting()."
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
        remoteResult.isReadOnly,
        false,
        "Unexpected readOnly in result from getConfigurationSetting()."
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

    it("accepts operation options", async () => {
      const key = `getConfigTest-${Date.now()}`;
      const label = "test";
      const value = "foo";
      const tags = {
        bar: "baz",
        car: "caz"
      };
      const contentType = "application/json";
      const result = await client.addConfigurationSetting({ key, label, value, contentType, tags });
      await assertThrowsAbortError(async () => {
        await client.getConfigurationSetting({ key, label }, { requestOptions: { timeout: 1 } });
      });
    });

    it("by date", async () => {
      const key = `getConfigurationSettingByDate-${Date.now()}`;

      const initialSetting = await client.setConfigurationSetting({
        key,
        value: "value1"
      });

      await delay(1000);

      await client.setConfigurationSetting({
        key,
        value: "value2"
      });

      const settingAtPointInTime = await client.getConfigurationSetting(
        { key },
        {
          acceptDateTime: initialSetting.lastModified
        }
      );

      assert.equal("value1", settingAtPointInTime.value);
    });
  });

  describe("listConfigurationSettings", () => {
    const now = Date.now();
    const uniqueLabel = `listConfigSettingsLabel-${now}`;
    let listConfigSettingA: ConfigurationSetting;

    const productionASettingId = {
      key: `listConfigSettingA-${now}`,
      label: uniqueLabel,
      value: "[A] production value"
    };

    before(async () => {
      await client.addConfigurationSetting(productionASettingId);
      await client.setReadOnly(productionASettingId, true);

      listConfigSettingA = await client.addConfigurationSetting({
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
      let byLabelIterator = client.listConfigurationSettings({ labelFilter: uniqueLabel });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true
          },
          {
            key: `listConfigSettingB-${now}`,
            value: "[B] production value",
            label: uniqueLabel,
            isReadOnly: false
          }
        ],
        byLabelSettings
      );
    });

    it("label wildcards", async () => {
      // query with a direct label match
      let byLabelIterator = client.listConfigurationSettings({
        labelFilter: uniqueLabel.substring(0, uniqueLabel.length - 1) + "*"
      });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true
          },
          {
            key: `listConfigSettingB-${now}`,
            value: "[B] production value",
            label: uniqueLabel,
            isReadOnly: false
          }
        ],
        byLabelSettings
      );
    });

    it("exact match on key", async () => {
      let byKeyIterator = client.listConfigurationSettings({
        keyFilter: `listConfigSettingA-${now}`
      });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true
          },
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] value",
            label: undefined,
            isReadOnly: false
          }
        ],
        byKeySettings
      );
    });

    it("key wildcards", async () => {
      // query with a key wildcard
      const keyFilter = `listConfigSettingA-${now}`;
      let byKeyIterator = client.listConfigurationSettings({
        keyFilter: keyFilter.substring(0, keyFilter.length - 1) + "*"
      });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true
          },
          {
            key: `listConfigSettingA-${now}`,
            value: "[A] value",
            label: undefined,
            isReadOnly: false
          }
        ],
        byKeySettings
      );
    });

    it("filter on fields", async () => {
      // only fill in the 'readOnly' field (which is really the locked field in the REST model)
      let byKeyIterator = client.listConfigurationSettings({
        keyFilter: `listConfigSettingA-${now}`,
        fields: ["key", "label", "isReadOnly"]
      });
      let settings = await toSortedArray(byKeyIterator);

      // the fields we retrieved
      assert.equal(productionASettingId.key, settings[0].key);
      assert.ok(settings[0].isReadOnly);
      assert.equal(uniqueLabel, settings[0].label);

      assert.ok(!settings[0].contentType);
      assert.ok(!settings[0].value);
      assert.ok(!settings[0].etag);

      // only fill in the 'readOnly' field (which is really the locked field in the REST model)
      byKeyIterator = client.listConfigurationSettings({
        keyFilter: `listConfigSettingA-${now}`,
        fields: ["key", "label", "value"]
      });
      settings = await toSortedArray(byKeyIterator);

      // the fields we retrieved
      assert.equal(productionASettingId.key, settings[0].key);
      assert.equal("[A] production value", settings[0].value);
      assert.equal(uniqueLabel, settings[0].label);

      assert.ok(!settings[0].isReadOnly);
      assert.ok(!settings[0].contentType);
      assert.ok(!settings[0].etag);
    });

    it("by date", async () => {
      let byKeyIterator = client.listConfigurationSettings({
        keyFilter: "listConfigSettingA-*",
        acceptDateTime: listConfigSettingA.lastModified
      });

      let settings = await toSortedArray(byKeyIterator);
      let foundMyExactSettingToo = false;

      // all settings returned should be the same date or as old as my setting
      for (const setting of settings) {
        assert.ok(setting.lastModified);
        assert.ok(setting.lastModified! <= listConfigSettingA.lastModified!);

        if (setting.key === listConfigSettingA.key && setting.label === listConfigSettingA.label) {
          foundMyExactSettingToo = true;
        }
      }

      assert.ok(foundMyExactSettingToo);
    });

    it("list with multiple pages", async () => {
      const key = `listMultiplePagesOfResults-${Date.now()}`;

      // this number is arbitrarily chosen to match the size of a page + 1
      const expectedNumberOfLabels = 200;

      const addSettingPromises = [];

      for (let i = 0; i < expectedNumberOfLabels; i++) {
        addSettingPromises.push(
          client.addConfigurationSetting({
            key,
            value: `the value for ${i}`,
            label: i.toString()
          })
        );

        settings.push({ key, label: i.toString() });
      }

      await Promise.all(addSettingPromises);

      let listResult = await client.listConfigurationSettings({
        keyFilter: key
      });

      const sortedResults = await toSortedArray(listResult);
      assert.equal(sortedResults.length, 200);

      // make sure we have 200 unique labels
      const uniqueLabels = new Set(sortedResults.map((res) => res.label));
      assert.equal(uniqueLabels.size, 200);

      for (let i = 0; i < 200; ++i) {
        assert.ok(uniqueLabels.has(i.toString()));
      }
    });

    it("accepts operation options", async () => {
      await assertThrowsAbortError(async () => {
        const settingsIterator = client.listConfigurationSettings({
          requestOptions: { timeout: 1 }
        });
        await settingsIterator.next();
      });
    });
  });

  describe("listRevisions", () => {
    const now = Date.now();
    const key = `listRevisions-${now}`;
    const labelA = `list-revisions-A-${now}`;
    const labelB = `list-revisions-B-${now}`;
    let originalSetting: ConfigurationSetting;

    before(async () => {
      // we'll generate two sets of keys and labels for this selection
      originalSetting = await client.addConfigurationSetting({
        key,
        label: labelA,
        value: "fooA1"
      });
      await delay(1000);
      await client.setConfigurationSetting({ key, label: labelA, value: "fooA2" });

      await client.addConfigurationSetting({ key, label: labelB, value: "fooB1" });
      await client.setConfigurationSetting({ key, label: labelB, value: "fooB2" });
    });

    it("exact match on label", async () => {
      const revisionsWithLabelIterator = await client.listRevisions({ labelFilter: labelA });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false }
        ],
        revisions
      );
    });

    it("label wildcards", async () => {
      const revisionsWithLabelIterator = await client.listRevisions({
        labelFilter: labelA.substring(0, labelA.length - 1) + "*"
      });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false }
        ],
        revisions
      );
    });

    it("exact match on key", async () => {
      const revisionsWithKeyIterator = await client.listRevisions({ keyFilter: key });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
          { key, label: labelB, value: "fooB1", isReadOnly: false },
          { key, label: labelB, value: "fooB2", isReadOnly: false }
        ],
        revisions
      );
    });

    it("key wildcards", async () => {
      const revisionsWithKeyIterator = await client.listRevisions({
        keyFilter: key.substring(0, key.length - 1) + "*"
      });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
          { key, label: labelB, value: "fooB1", isReadOnly: false },
          { key, label: labelB, value: "fooB2", isReadOnly: false }
        ],
        revisions
      );
    });

    it("accepts operation options", async () => {
      await assertThrowsAbortError(async () => {
        const iter = client.listRevisions({ labelFilter: labelA, requestOptions: { timeout: 1 } });
        await iter.next();
      });
    });

    it("by date", async () => {
      let byKeyIterator = client.listRevisions({
        keyFilter: key,
        acceptDateTime: originalSetting.lastModified
      });

      let settings = await toSortedArray(byKeyIterator);

      assert.equal(1, settings.length);
      assert.deepEqual(
        {
          key: originalSetting.key,
          label: originalSetting.label,
          value: originalSetting.value,
          isReadOnly: originalSetting.isReadOnly
        },
        {
          key: settings[0].key,
          label: settings[0].label,
          value: settings[0].value,
          isReadOnly: settings[0].isReadOnly
        }
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
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting()."
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
        replacedResult.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting()."
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
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting()."
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

      const replacedResult = await client.setConfigurationSetting(
        {
          key,
          label,
          value: "foo2",
          etag: result.etag
        },
        { onlyIfUnchanged: true }
      );

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
        replacedResult.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting()."
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
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting()."
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

    it("accepts operation options", async () => {
      const key = `setConfigTestNA-${Date.now()}`;
      const label = "test";
      const value = "foo";
      await assertThrowsAbortError(async () => {
        const result = await client.setConfigurationSetting(
          { key, label, value: "foo" },
          {
            requestOptions: {
              timeout: 1
            }
          }
        );
      });
    });
  });
});
