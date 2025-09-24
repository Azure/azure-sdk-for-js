// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AppConfigurationClient,
  ConfigurationSetting,
  ConfigurationSettingParam,
  ListConfigurationSettingPage,
} from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  assertEqualSettings,
  assertTags,
  assertThrowsAbortError,
  assertThrowsRestError,
  createAppConfigurationClientForTests,
  deleteEverySetting,
  deleteKeyCompletely,
  startRecorder,
  toSortedArray,
  toSortedLabelsArray,
} from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach, afterAll, beforeAll } from "vitest";

describe("AppConfigurationClient", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  afterAll(async () => {
    if (!isPlaybackMode()) {
      await deleteEverySetting();
    }
  });

  describe("simple usages", () => {
    it("Add and query a setting without a label", async () => {
      const key = recorder.variable(
        "noLabelTests",
        `noLabelTests${Math.floor(Math.random() * 1000)}`,
      );

      await client.addConfigurationSetting({ key, value: "added" });

      await compare({
        key,
        value: "added",
        label: undefined,
      });

      await client.deleteConfigurationSetting({ key });

      // will recreate the setting
      await client.setConfigurationSetting({ key, value: "set" });

      await compare({
        key,
        value: "set",
        label: undefined,
      });

      // and now acts as a wholesale update
      await client.setConfigurationSetting({ key, value: "set a second time" });

      await compare({
        key,
        value: "set a second time",
        label: undefined,
      });

      await client.deleteConfigurationSetting({ key });
    });

    async function compare(expected: {
      key: string;
      value: string;
      label?: string;
    }): Promise<void> {
      const actualSettings = await client.getConfigurationSetting(expected);

      assert.equal(expected.key, actualSettings.key);
      assert.equal(expected.value, actualSettings.value);
      assert.equal(expected.label, actualSettings.label);
    }
  });

  describe("addConfigurationSetting", () => {
    it("sample works", async () => {
      const key = recorder.variable(
        "addConfigSample",
        `addConfigSample${Math.floor(Math.random() * 1000)}`,
      );
      const result = await client.setConfigurationSetting({
        key,
        value: "MyValue",
      });

      assert.equal(key, result.key);
    });

    it("adds a configuration setting", async () => {
      const key = recorder.variable(
        "addConfigTest",
        `addConfigTest${Math.floor(Math.random() * 1000)}`,
      );
      const label = "MyLabel";
      const value = "MyValue";
      const result = await client.addConfigurationSetting({ key, label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );

      // just a sanity check - the 'eTag' field that gets added by the response headers
      // is removed (and is replaced by the 'etag' field in the model)
      assert.ok(!(result as any).eTag);
      assert.ok(result.etag);

      await client.deleteConfigurationSetting({ key, label });
    });

    it("throws an error if the configuration setting already exists", async () => {
      const key = recorder.variable(
        "addConfigTestTwice",
        `addConfigTestTwice${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";
      const result = await client.addConfigurationSetting({ key, label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );

      // attempt to add the same setting
      try {
        await client.addConfigurationSetting({ key, label, value });
        throw new Error("Test failure");
      } catch (err: any) {
        assert.equal(
          (err as { message: string }).message,
          "Status 412: Setting was already present",
        );
        assert.notEqual((err as { message: string }).message, "Test failure");
      }

      await client.deleteConfigurationSetting({ key, label });
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts operation options", async () => {
      const key = recorder.variable(
        "addConfigTestTwice",
        `addConfigTestTwice${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";
      await assertThrowsAbortError(async () => {
        await client.addConfigurationSetting(
          { key, label, value },

          {
            requestOptions: {
              timeout: 1,
            },
          },
        );
      });
    });
  });

  describe("deleteConfigurationSetting", () => {
    it("deletes an existing configuration setting", async () => {
      const key = recorder.variable(
        "deleteConfigTestEtag",
        `deleteConfigTestEtag${Math.floor(Math.random() * 1000)}`,
      );
      const label = "MyLabel";
      const value = "MyValue";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );

      // delete configuration
      const deletedSetting = await client.deleteConfigurationSetting(result);
      assert.equal(200, deletedSetting.statusCode);

      // confirm setting no longer exists
      try {
        await client.getConfigurationSetting({ key, label });
        throw new Error("Test failure");
      } catch (err: any) {
        assert.notEqual((err as { message: string }).message, "Test failure");
      }
    });

    it("deletes an existing configuration setting (valid etag)", async () => {
      const key = recorder.variable(
        "deleteConfigTestEtag",
        `deleteConfigTestEtag${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );

      // delete configuration
      await client.deleteConfigurationSetting(
        {
          key,
          label,
        },
        { onlyIfUnchanged: true },
      );

      // confirm setting no longer exists
      try {
        await client.getConfigurationSetting({ key, label });
        throw new Error("Test failure");
      } catch (err: any) {
        assert.notEqual((err as { message: string }).message, "Test failure");
      }
    });

    it("does not throw when deleting a non-existent configuration setting", async () => {
      const key = recorder.variable(
        "deleteConfigTestNA",
        `deleteConfigTestNA${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";

      // delete configuration
      const response = await client.deleteConfigurationSetting({ key, label });

      // we hoist this code up to the top in case users want to check if the
      // delete actually happened (status code: 200) or if the setting wasn't
      // found which results in the same state but might matter to
      // the user(status code: 204)
      assert.equal(204, response.statusCode);
    });

    it("throws when deleting a configuration setting (invalid etag)", async () => {
      const key = recorder.variable(
        "deleteConfigTestBadEtag",
        `deleteConfigTestBadEtag${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );

      // delete configuration
      await assertThrowsRestError(
        () =>
          client.deleteConfigurationSetting(
            { key, label, etag: "invalid" },
            { onlyIfUnchanged: true },
          ),
        412,
      );

      await client.deleteConfigurationSetting({ key, label });
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async () => {
      // Recorder checks for the recording and complains before core-rest-pipeline could throw the AbortError (Recorder v2 should help here)
      const key = recorder.variable(
        "deleteConfigTest",
        `deleteConfigTest${Math.floor(Math.random() * 1000)}`,
      );
      const label = "MyLabel";
      const value = "MyValue";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value });

      // delete configuration
      await assertThrowsAbortError(async () => {
        await client.deleteConfigurationSetting(result, {
          requestOptions: { timeout: 1 },
        });
      });
    });
  });

  describe("getConfigurationSetting", () => {
    it("retrieves an existing configuration setting", async () => {
      const key = recorder.variable(
        "getConfigTest",
        `getConfigTest${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";
      const tags = {
        bar: "baz",
        car: "caz",
      };
      const contentType = "application/json";

      // create configuration
      const result = await client.addConfigurationSetting({ key, label, value, contentType, tags });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from addConfigurationSetting().",
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting().",
      );
      assert.equal(
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting().",
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting().",
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting().",
      );

      // retrieve the value from the service
      const remoteResult = await client.getConfigurationSetting({ key, label });
      assert.equal(
        remoteResult.key,
        key,
        "Unexpected key in result from getConfigurationSetting().",
      );
      assert.equal(
        remoteResult.label,
        label,
        "Unexpected label in result from getConfigurationSetting().",
      );
      assert.equal(
        remoteResult.value,
        value,
        "Unexpected value in result from getConfigurationSetting().",
      );
      assert.equal(
        remoteResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from getConfigurationSetting().",
      );
      assert.equal(
        remoteResult.isReadOnly,
        false,
        "Unexpected readOnly in result from getConfigurationSetting().",
      );
      assert.deepEqual(
        remoteResult.tags,
        tags,
        "Unexpected tags in result from getConfigurationSetting().",
      );
      assert.equal(
        remoteResult.contentType,
        contentType,
        "Unexpected contentType in result from getConfigurationSetting().",
      );

      await client.deleteConfigurationSetting({ key, label });
    });

    it("throws when retrieving a non-existent configuration setting", async () => {
      const key = recorder.variable(
        "getConfigTestNA",
        `getConfigTestNA${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";

      // retrieve the value from the service
      try {
        await client.getConfigurationSetting({ key, label });
        throw new Error("Test failure");
      } catch (err: any) {
        assert.notEqual((err as { message: string }).message, "Test failure");
      }
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async () => {
      const key = recorder.variable(
        "getConfigTest",
        `getConfigTest${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";
      const tags = {
        bar: "baz",
        car: "caz",
      };
      const contentType = "application/json";
      await client.addConfigurationSetting({ key, label, value, contentType, tags });
      await assertThrowsAbortError(async () => {
        await client.getConfigurationSetting({ key, label }, { requestOptions: { timeout: 1 } });
      });
    });

    it("by date", async () => {
      const key = recorder.variable(
        "getConfigurationSettingByDate",
        `getConfigurationSettingByDate${Math.floor(Math.random() * 1000)}`,
      );

      const initialSetting = await client.setConfigurationSetting({
        key,
        value: "value1",
      });

      await delay(1000);
      await client.setConfigurationSetting({
        key,
        value: "value2",
      });

      const settingAtPointInTime = await client.getConfigurationSetting(
        { key },

        {
          acceptDateTime: initialSetting.lastModified,
        },
      );

      assert.equal("value1", settingAtPointInTime.value);
    });

    it("Using `select` via `fields`", async () => {
      const settingToAdd: ConfigurationSettingParam = {
        key: recorder.variable("getConfigTest", `getConfigTest${Math.floor(Math.random() * 1000)}`),
        value: "value that will not be retrieved",
        contentType: "a content type",
        label: "a label",
      };

      await client.addConfigurationSetting(settingToAdd);
      await client.setReadOnly(settingToAdd, true);

      const retrievedSetting = await client.getConfigurationSetting(settingToAdd, {
        fields: ["isReadOnly", "contentType", "lastModified", "label"],
      });

      assert.isOk(retrievedSetting.lastModified);

      assert.deepEqual(
        {
          key: retrievedSetting.key,
          value: retrievedSetting.value,
          contentType: retrievedSetting.contentType,
          etag: retrievedSetting.etag,
          label: retrievedSetting.label,
          tags: retrievedSetting.tags,
          statusCode: retrievedSetting.statusCode,
          isReadOnly: retrievedSetting.isReadOnly,
        },
        {
          contentType: "a content type",
          isReadOnly: true,
          label: "a label",

          // this is an HTTP response field and is always included.
          statusCode: 200,

          // these values were purposefully omitted from my list of fields that I
          // selected above.
          key: undefined,
          value: undefined,
          etag: undefined,
          tags: undefined,
        },
      );
    });
  });

  describe("listLabels", () => {
    const uniqueLabel = "listConfigSettingsLabelA";
    let listConfigSettingA: ConfigurationSetting;
    let count = 0;

    /** Simulating a setting in production that will be made read only */
    const productionASettingId: Pick<
      ConfigurationSetting,
      "key" | "label" | "value" | "contentType" | "tags"
    > = {
      key: "",
      label: "",
      value: "[A] production value",
      contentType: "a content type",
      tags: {
        production: "A",
        value: "1",
      },
    };

    const keys: {
      listConfigSettingA: string;
      listConfigSettingB: string;
    } = {
      listConfigSettingA: "",
      listConfigSettingB: "",
    };

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await deleteEverySetting();
      }
    });

    beforeEach(async () => {
      keys.listConfigSettingA = recorder.variable(
        `listConfigSetting${count}A`,
        `listConfigSetting${count}A${Math.floor(Math.random() * 100000)}`,
      );

      keys.listConfigSettingB = recorder.variable(
        `listConfigSetting${count}B`,
        `listConfigSetting${count}B${Math.floor(Math.random() * 100000)}`,
      );
      count += 1;

      productionASettingId.key = keys.listConfigSettingA;
      productionASettingId.label = uniqueLabel;

      listConfigSettingA = await client.addConfigurationSetting(productionASettingId);
    });

    afterAll(async () => {
      try {
        await deleteKeyCompletely([keys.listConfigSettingA], client);
      } catch (e: any) {
        /** empty */
      }
    });

    it("basic list labels", async () => {
      // Use nameFilter to make the test deterministic in live mode.
      // Without this, parallel CI jobs (or other tests) that introduce an unlabeled setting
      // can cause an additional { name: null } label to appear between successive enumerations
      // in `toSortedLabelsArray`, leading to a mismatch. Filtering ensures we only retrieve
      // the label created for this test.
      const labelsIterator = client.listLabels({ nameFilter: uniqueLabel });
      const byLabelSettings = await toSortedLabelsArray(labelsIterator);
      assert.deepEqual(
        [
          {
            name: uniqueLabel,
          },
        ],
        byLabelSettings,
      );
    });

    it("name wildcards", async () => {
      const uniqueLabel2 = "listConfigSettingsLabelB";
      await client.addConfigurationSetting({
        key: keys.listConfigSettingB,
        label: uniqueLabel2,
        value: "[B] production value",
        tags: {
          production: "B",
          value: "2",
        },
      });
      const labelsIterator = client.listLabels({
        nameFilter: uniqueLabel.substring(0, uniqueLabel.length - 1) + "*",
      });
      const byLabelSettings = await toSortedLabelsArray(labelsIterator);
      assert.deepEqual(byLabelSettings, [
        {
          name: uniqueLabel,
        },
        {
          name: uniqueLabel2,
        },
      ]);

      await deleteKeyCompletely([keys.listConfigSettingB], client);
    });

    it("Using `select` via `fields`", async () => {
      // Add nameFilter to eliminate interference from concurrently added labels (null or others)
      // in live CI runs. This keeps the test focused on field selection behavior.
      const labelsIterator = client.listLabels({
        nameFilter: uniqueLabel,
        fields: ["name"],
      });

      const byLabelSettings = await toSortedLabelsArray(labelsIterator);
      assert.deepEqual(
        [
          {
            name: uniqueLabel,
          },
        ],
        byLabelSettings,
      );
    });

    it("by date", async () => {
      const labelsIterator = client.listLabels({
        acceptDateTime: listConfigSettingA.lastModified,
      });
      const labels = await toSortedLabelsArray(labelsIterator);
      let foundLabel = false;
      for (const label of labels) {
        assert.isDefined(label.name);

        if (label.name === uniqueLabel) {
          foundLabel = true;
        }
      }

      assert.isTrue(foundLabel);
    });
  });

  describe("listConfigurationSettings", () => {
    let uniqueLabel: string;
    let listConfigSettingA: ConfigurationSetting;
    let count = 0;

    /** Simulating a setting in production that will be made read only */
    const productionASettingId: Pick<
      ConfigurationSetting,
      "key" | "label" | "value" | "contentType" | "tags"
    > = {
      key: "",
      label: "",
      value: "[A] production value",
      contentType: "a content type",
      tags: {
        production: "A",
        value: "1",
      },
    };

    const keys: {
      listConfigSettingA: string;
      listConfigSettingB: string;
    } = {
      listConfigSettingA: "",
      listConfigSettingB: "",
    };

    beforeEach(async () => {
      keys.listConfigSettingA = recorder.variable(
        `listConfigSetting${count}A`,
        `listConfigSetting${count}A${Math.floor(Math.random() * 100000)}`,
      );
      keys.listConfigSettingB = recorder.variable(
        `listConfigSetting${count}B`,
        `listConfigSetting${count}B${Math.floor(Math.random() * 100000)}`,
      );
      count += 1;

      uniqueLabel = recorder.variable(
        "listConfigSettingsLabel",
        `listConfigSettingsLabel${Math.floor(Math.random() * 100000)}`,
      );
      productionASettingId.key = keys.listConfigSettingA;
      productionASettingId.label = uniqueLabel;

      await client.addConfigurationSetting(productionASettingId);
      await client.setReadOnly(productionASettingId, true);

      listConfigSettingA = await client.addConfigurationSetting({
        key: keys.listConfigSettingA,
        value: "[A] value",
        tags: {
          production: "A",
          value: "2",
        },
      });

      await client.addConfigurationSetting({
        key: keys.listConfigSettingB,
        label: uniqueLabel,
        value: "[B] production value",
        tags: {
          production: "B",
          value: "1",
        },
      });
      await client.addConfigurationSetting({
        key: keys.listConfigSettingB,
        value: "[B] value",
        tags: {
          production: "B",
          value: "2",
        },
      });
    });

    afterEach(async () => {
      try {
        await deleteKeyCompletely([keys.listConfigSettingA, keys.listConfigSettingB], client);
      } catch (e: any) {
        /** empty */
      }
    });

    it("undefined doesn't throw and will just return everything", async () => {
      const settingsIterator = client.listConfigurationSettings();
      await settingsIterator.next();
    });

    it("exact match on label", async () => {
      // query with a direct label match
      const byLabelIterator = client.listConfigurationSettings({ labelFilter: uniqueLabel });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: keys.listConfigSettingA,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true,
          },
          {
            key: keys.listConfigSettingB,
            value: "[B] production value",
            label: uniqueLabel,
            isReadOnly: false,
          },
        ],
        byLabelSettings,
      );
    });

    it("label wildcards", async () => {
      // query with a direct label match
      const byLabelIterator = client.listConfigurationSettings({
        labelFilter: uniqueLabel.substring(0, uniqueLabel.length - 1) + "*",
      });
      const byLabelSettings = await toSortedArray(byLabelIterator);

      assertEqualSettings(
        [
          {
            key: keys.listConfigSettingA,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true,
          },
          {
            key: keys.listConfigSettingB,
            value: "[B] production value",
            label: uniqueLabel,
            isReadOnly: false,
          },
        ],
        byLabelSettings,
      );
    });

    it("exact match on key", async () => {
      const byKeyIterator = client.listConfigurationSettings({
        keyFilter: keys.listConfigSettingA,
      });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: keys.listConfigSettingA,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true,
          },
          {
            key: keys.listConfigSettingA,
            value: "[A] value",
            label: undefined,
            isReadOnly: false,
          },
        ],
        byKeySettings,
      );
    });

    it("exact match on tags", async () => {
      await client.addConfigurationSetting({
        key: "listConfigSettingC",
        value: "[C] production value",
        tags: {
          production: "C",
          value: "2",
        },
      });
      const byTagsIterator = client.listConfigurationSettings({ tagsFilter: ["production=C"] });
      const byKeySettings = await toSortedArray(byTagsIterator);
      assertTags(
        [
          {
            tags: {
              production: "C",
              value: "2",
            },
          },
        ],
        byKeySettings,
      );
      assertEqualSettings(
        [
          {
            key: "listConfigSettingC",
            value: "[C] production value",
            label: undefined,
            isReadOnly: false,
          },
        ],
        byKeySettings,
      );

      await deleteKeyCompletely(["listConfigSettingC"], client);
    });

    it("key wildcards", async () => {
      // query with a key wildcard
      const keyFilter = keys.listConfigSettingA;
      const byKeyIterator = client.listConfigurationSettings({
        keyFilter: keyFilter.substring(0, keyFilter.length - 1) + "*",
      });
      const byKeySettings = await toSortedArray(byKeyIterator);

      assertEqualSettings(
        [
          {
            key: keys.listConfigSettingA,
            value: "[A] production value",
            label: uniqueLabel,
            isReadOnly: true,
          },
          {
            key: keys.listConfigSettingA,
            value: "[A] value",
            label: undefined,
            isReadOnly: false,
          },
        ],
        byKeySettings,
      );
    });

    it("Using `select` via `fields`", async () => {
      let byKeyIterator = client.listConfigurationSettings({
        keyFilter: productionASettingId.key,
        labelFilter: productionASettingId.label,
        fields: ["isReadOnly", "contentType", "lastModified", "label"],
      });
      const [retrievedSetting, ...otherValues] = await toSortedArray(byKeyIterator);

      assert.isEmpty(otherValues);
      assert.isOk(retrievedSetting.lastModified);

      assert.deepEqual(
        {
          key: retrievedSetting.key,
          value: retrievedSetting.value,
          contentType: retrievedSetting.contentType,
          etag: retrievedSetting.etag,
          label: retrievedSetting.label,
          tags: retrievedSetting.tags,
          isReadOnly: retrievedSetting.isReadOnly,
        },
        {
          contentType: "a content type",
          isReadOnly: true,
          label: productionASettingId.label,

          // these values were purposefully omitted from my list of fields that I
          // selected above.
          key: undefined,
          value: undefined,
          etag: undefined,
          tags: undefined,
        },
      );

      // only fill in the 'readOnly' field (which is really the locked field in the REST model)
      byKeyIterator = client.listConfigurationSettings({
        keyFilter: keys.listConfigSettingA,
        fields: ["key", "label", "value"],
      });
      const settings = await toSortedArray(byKeyIterator);

      // the fields we retrieved
      assert.equal(productionASettingId.key, settings[0].key);
      assert.equal("[A] production value", settings[0].value);
      assert.equal(uniqueLabel, settings[0].label);

      assert.ok(!settings[0].isReadOnly);
      assert.ok(!settings[0].contentType);
      assert.ok(!settings[0].etag);
    });

    it("by date", async () => {
      const byKeyIterator = client.listConfigurationSettings({
        keyFilter: "listConfigSetting*",
        acceptDateTime: listConfigSettingA.lastModified,
      });

      const settings = await toSortedArray(byKeyIterator);
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

    // This occasionally hits 429 error (throttling) since we are making 100s of requests in the test to create, get and delete keys.
    // To avoid hitting the service with too many requests, skipping the test in live.
    // More details at https://github.com/Azure/azure-sdk-for-js/issues/16743
    //
    // Remove the following line if you want to hit the live service.
    it("list with multiple pages", { skip: isLiveMode() }, async () => {
      const key = recorder.variable(
        "listMultiplePagesOfResults",
        `listMultiplePagesOfResults${Math.floor(Math.random() * 1000)}`,
      );

      // this number is arbitrarily chosen to match the size of a page + 1
      const expectedNumberOfLabels = 200;

      let addSettingPromises = [];

      for (let i = 0; i < expectedNumberOfLabels; i++) {
        addSettingPromises.push(
          client.addConfigurationSetting({
            key,
            value: `the value for ${i}`,
            label: i.toString(),
          }),
        );

        if (i !== 0 && i % 2 === 0) {
          await Promise.all(addSettingPromises);
          addSettingPromises = [];
        }
      }

      await Promise.all(addSettingPromises);

      const listResult = client.listConfigurationSettings({
        keyFilter: key,
      });

      const sortedResults = await toSortedArray(listResult);
      assert.equal(sortedResults.length, 200);

      // make sure we have 200 unique labels
      const uniqueLabels = new Set(sortedResults.map((res) => res.label));
      assert.equal(uniqueLabels.size, 200);

      for (let i = 0; i < 200; ++i) {
        assert.ok(uniqueLabels.has(i.toString()));
      }

      for (let i = 0; i < expectedNumberOfLabels; i++) {
        await client.deleteConfigurationSetting({ key, label: i.toString() });
      }
    });

    // This occasionally hits 429 error (throttling) since we are making 100s of requests in the test to create, get and delete keys.
    // To avoid hitting the service with too many requests, skipping the test in live.
    // More details at https://github.com/Azure/azure-sdk-for-js/issues/16743
    //
    // Remove the following line if you want to hit the live service.
    it("list with multiple pages - bypage and etags", { skip: isLiveMode() }, async () => {
      const key = recorder.variable(
        "listMultiplePagesOfResults",
        `listMultiplePagesOfResults${Math.floor(Math.random() * 1000)}`,
      );

      const pageSize = 100;

      // this number is chosen to create 2 full page an an empty 3 page
      const expectedNumberOfLabels = pageSize * 2;

      async function addConfigSettings(numToAdd: number, begin: number = 0): Promise<void> {
        let addSettingPromises = [];

        for (let i = begin; i < begin + numToAdd; i++) {
          addSettingPromises.push(
            client.addConfigurationSetting({
              key,
              value: `the value for ${i}`,
              label: i.toString(),
            }),
          );

          if (i !== 0 && i % 2 === 0) {
            await Promise.all(addSettingPromises);
            addSettingPromises = [];
          }
        }

        await Promise.all(addSettingPromises);
      }

      await addConfigSettings(expectedNumberOfLabels);

      // Passing marker as an argument
      let pageCount = 0;
      let iterator = client.listConfigurationSettings({ keyFilter: key }).byPage();
      const etags: string[] = [];
      for await (const page of iterator) {
        assert.isDefined(page.etag);
        pageCount++;
        etags.push(page.etag ?? "");
      }
      assert.equal(pageCount, 3);

      // Assert page not changes using the same etags
      iterator = client.listConfigurationSettings({ keyFilter: key, pageEtags: etags }).byPage();

      let response = await iterator.next();
      assertPage(response.value, 0, 304);

      response = await iterator.next();
      assertPage(response.value, 0, 304);

      response = await iterator.next();
      assertPage(response.value, 0, 304);

      // This number is arbitrarily chosen to add new setting to the 3rd page
      const additionalNumberOfLabels = 50;
      await addConfigSettings(additionalNumberOfLabels, expectedNumberOfLabels);

      // Second run with added settings
      iterator = client.listConfigurationSettings({ keyFilter: key, pageEtags: etags }).byPage();

      // First page no change
      response = await iterator.next();
      assertPage(response.value, 0, 304);

      // Second page: full settings with change
      response = await iterator.next();
      assertPage(response.value, pageSize, 200);

      // Third page: new settings with changes
      response = await iterator.next();
      assertPage(response.value, additionalNumberOfLabels, 200);

      function assertPage(
        page: ListConfigurationSettingPage,
        expectedLength: number,
        status: number,
      ): void {
        assert.equal(page._response.status, status);
        assert.equal(page.items.length, expectedLength);
        assert.isDefined(page.etag);
      }

      for (let i = 0; i < expectedNumberOfLabels + additionalNumberOfLabels; i++) {
        await client.deleteConfigurationSetting({ key, label: i.toString() });
      }
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async () => {
      await assertThrowsAbortError(async () => {
        const settingsIterator = client.listConfigurationSettings({
          requestOptions: { timeout: 1 },
        });
        await settingsIterator.next();
      });
    });
  });

  describe("listConfigSettings", () => {
    let key1: string;
    let key2: string;
    beforeEach(async () => {
      key1 = recorder.variable(
        "backslash-zero-label-1",
        `backslash-zero-label-1-${Math.floor(Math.random() * 900 + 100)}`,
      );
      key2 = recorder.variable(
        "backslash-zero-label-2",
        `backslash-zero-label-2-${Math.floor(Math.random() * 900 + 100)}`,
      );
      await client.addConfigurationSetting({
        key: key1,
        value: "[A] production value",
      });
      await client.addConfigurationSetting({
        key: key2,
        value: "[A] value",
      });

      await client.addConfigurationSetting({
        key: key2,
        value: "[B] value",
        label: "with label",
      });
    });

    afterEach(async () => {
      (
        await toSortedArray(
          client.listConfigurationSettings({
            keyFilter: "backslash-zero-label-*",
          }),
        )
      ).forEach(async (setting) => {
        try {
          await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
        } catch {
          /** empty code block */
        }
      });
    });

    it("matches any key without label - `backslash0`", async () => {
      const byLabelIterator = client.listConfigurationSettings({
        keyFilter: "backslash-zero-label-*",
        labelFilter: "\0",
      });
      const byLabelSettings = (await toSortedArray(byLabelIterator)).filter((setting) =>
        [key1, key2].includes(setting.key),
      );
      assert.equal(byLabelSettings.length, 2, "got unexpected number of settings");
      assertEqualSettings(
        [
          {
            key: key1,
            value: "[A] production value",
            label: undefined,
            isReadOnly: false,
          },
          {
            key: key2,
            value: "[A] value",
            label: undefined,
            isReadOnly: false,
          },
        ],
        byLabelSettings,
      );
    });
  });

  describe("listRevisions", () => {
    let key: string;
    let labelA: string;
    let labelB: string;
    let originalSetting: ConfigurationSetting;

    beforeEach(async () => {
      key = recorder.variable(
        `listRevisions`,
        `listRevisions${Math.floor(Math.random() * 100000)}`,
      );
      labelA = recorder.variable(
        `list-revisions-A`,
        `list-revisions-A${Math.floor(Math.random() * 100000)}`,
      );
      labelB = recorder.variable(
        `list-revisions-B`,
        `list-revisions-B${Math.floor(Math.random() * 100000)}`,
      );

      // we'll generate two sets of keys and labels for this selection
      originalSetting = await client.addConfigurationSetting({
        key,
        label: labelA,
        value: "fooA1",
      });
      await delay(1000);
      await client.setConfigurationSetting({ key, label: labelA, value: "fooA2" });
      await client.addConfigurationSetting({ key, label: labelB, value: "fooB1" });
      await client.setConfigurationSetting({ key, label: labelB, value: "fooB2" });
    });

    it("exact match on label", async () => {
      const revisionsWithLabelIterator = client.listRevisions({ labelFilter: labelA });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
        ],
        revisions,
      );
    });

    it("label wildcards", async () => {
      const revisionsWithLabelIterator = client.listRevisions({
        labelFilter: labelA.substring(0, labelA.length - 1) + "*",
      });
      const revisions = await toSortedArray(revisionsWithLabelIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
        ],
        revisions,
      );
    });

    it("exact match on key", async () => {
      const revisionsWithKeyIterator = client.listRevisions({ keyFilter: key });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
          { key, label: labelB, value: "fooB1", isReadOnly: false },
          { key, label: labelB, value: "fooB2", isReadOnly: false },
        ],
        revisions,
      );
    });

    it("key wildcards", async () => {
      const revisionsWithKeyIterator = client.listRevisions({
        keyFilter: key.substring(0, key.length - 1) + "*",
      });
      const revisions = await toSortedArray(revisionsWithKeyIterator);

      assertEqualSettings(
        [
          { key, label: labelA, value: "fooA1", isReadOnly: false },
          { key, label: labelA, value: "fooA2", isReadOnly: false },
          { key, label: labelB, value: "fooB1", isReadOnly: false },
          { key, label: labelB, value: "fooB2", isReadOnly: false },
        ],
        revisions,
      );
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async () => {
      await assertThrowsAbortError(async () => {
        const iter = client.listRevisions({ labelFilter: labelA, requestOptions: { timeout: 1 } });
        await iter.next();
      });
    });

    it("by date", async () => {
      const byKeyIterator = client.listRevisions({
        keyFilter: key,
        acceptDateTime: originalSetting.lastModified,
      });

      const settings = await toSortedArray(byKeyIterator);

      assert.deepEqual(
        {
          key: originalSetting.key,
          label: originalSetting.label,
          value: originalSetting.value,
          isReadOnly: originalSetting.isReadOnly,
        },
        {
          key: settings[0].key,
          label: settings[0].label,
          value: settings[0].value,
          isReadOnly: settings[0].isReadOnly,
        },
      );
    });
  });

  describe("setConfigurationSetting", () => {
    it("replaces a configuration setting", async () => {
      const key = recorder.variable(
        `setConfigTest`,
        `setConfigTest${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const contentType = "application/json";
      const tags = {
        bar: "baz",
        car: "caz",
      };

      // create configuration
      const result = await client.addConfigurationSetting({
        key,
        label,
        value: "foo",
        contentType,
        tags,
      });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        "foo",
        "Unexpected value in result from addConfigurationSetting().",
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting().",
      );
      assert.equal(
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting().",
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting().",
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting().",
      );

      const replacedResult = await client.setConfigurationSetting({ key, label, value: "foo2" });

      assert.equal(
        replacedResult.key,
        key,
        "Unexpected key in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.label,
        label,
        "Unexpected label in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.value,
        "foo2",
        "Unexpected value in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting().",
      );
      assert.deepEqual(
        replacedResult.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting().",
      );
      assert.strictEqual(
        replacedResult.contentType,
        undefined,
        "Unexpected contentType in result from setConfigurationSetting().",
      );

      await client.deleteConfigurationSetting({ key, label });
    });

    it("replaces a configuration setting (valid etag)", async () => {
      const key = recorder.variable(
        `setConfigTestEtag`,
        `setConfigTestEtag${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const contentType = "application/json";
      const tags = {
        bar: "baz",
        car: "caz",
      };

      // create configuration
      const result = await client.addConfigurationSetting({
        key,
        label,
        value: "foo",
        contentType,
        tags,
      });

      assert.equal(result.key, key, "Unexpected key in result from addConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from addConfigurationSetting().",
      );
      assert.equal(
        result.value,
        "foo",
        "Unexpected value in result from addConfigurationSetting().",
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from addConfigurationSetting().",
      );
      assert.equal(
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from addConfigurationSetting().",
      );
      assert.deepEqual(
        result.tags,
        tags,
        "Unexpected tags in result from addConfigurationSetting().",
      );
      assert.equal(
        result.contentType,
        contentType,
        "Unexpected contentType in result from addConfigurationSetting().",
      );

      const replacedResult = await client.setConfigurationSetting(
        {
          key,
          label,
          value: "foo2",
          etag: result.etag,
        },
        { onlyIfUnchanged: true },
      );

      assert.equal(
        replacedResult.key,
        key,
        "Unexpected key in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.label,
        label,
        "Unexpected label in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.value,
        "foo2",
        "Unexpected value in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting().",
      );
      assert.equal(
        replacedResult.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting().",
      );
      assert.deepEqual(
        replacedResult.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting().",
      );
      assert.strictEqual(
        replacedResult.contentType,
        undefined,
        "Unexpected contentType in result from setConfigurationSetting().",
      );

      await client.deleteConfigurationSetting({ key, label });
    });

    it("creates a configuration setting if it doesn't exist", async () => {
      const key = recorder.variable(
        `setConfigTestNA`,
        `setConfigTestNA${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";

      const result = await client.setConfigurationSetting({ key, label, value: "foo" });
      assert.equal(result.key, key, "Unexpected key in result from setConfigurationSetting().");
      assert.equal(
        result.label,
        label,
        "Unexpected label in result from setConfigurationSetting().",
      );
      assert.equal(
        result.value,
        value,
        "Unexpected value in result from setConfigurationSetting().",
      );
      assert.equal(
        result.lastModified instanceof Date,
        true,
        "Unexpected lastModified in result from setConfigurationSetting().",
      );
      assert.equal(
        result.isReadOnly,
        false,
        "Unexpected readOnly in result from setConfigurationSetting().",
      );
      assert.deepEqual(
        result.tags,
        {},
        "Unexpected tags in result from setConfigurationSetting().",
      );
      assert.strictEqual(
        result.contentType,
        undefined,
        "Unexpected contentType in result from setConfigurationSetting().",
      );
    });

    // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
    it.skip("accepts  operation options", async () => {
      const key = recorder.variable(
        `setConfigTestNA`,
        `setConfigTestNA${Math.floor(Math.random() * 1000)}`,
      );
      const label = "test";
      const value = "foo";
      await assertThrowsAbortError(async () => {
        await client.setConfigurationSetting(
          { key, label, value: value },
          {
            requestOptions: {
              timeout: 1,
            },
          },
        );
      });
    });
  });
});
