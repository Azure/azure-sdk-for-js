// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  ConfigurationSetting,
  SnapshotReferenceValue,
} from "../../src/index.js";
import {
  isSnapshotReference,
  parseSnapshotReference,
  snapshotReferenceContentType,
} from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("AppConfigurationClient - SnapshotReference", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  describe("SnapshotReference configuration setting", () => {
    const getBaseSetting = (): ConfigurationSetting<SnapshotReferenceValue> => {
      return {
        value: {
          snapshotName: recorder.variable(
            "snapshot-name",
            `snapshot-name${Math.floor(Math.random() * 1000)}`,
          ),
        },
        isReadOnly: false,
        key: recorder.variable("snapshot-ref", `snapshot-ref${Math.floor(Math.random() * 1000)}`),
        label: "label-sn",
        contentType: snapshotReferenceContentType,
      };
    };

    function assertSnapshotReferenceProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: ConfigurationSetting<SnapshotReferenceValue>,
    ): void {
      assert.equal(isSnapshotReference(actual), true, "Expected to get the SnapshotReference");
      const actualSnapshotReference = parseSnapshotReference(actual);
      if (isSnapshotReference(actual)) {
        assert.equal(
          actual.key,
          expected.key,
          "Key from the response from get request is not as expected",
        );
        assert.equal(actualSnapshotReference.value.snapshotName, expected.value.snapshotName);
        assert.equal(actual.isReadOnly, expected.isReadOnly);
        assert.equal(actual.label, expected.label);
        assert.equal(actual.contentType, expected.contentType);
      }
    }

    let addResponse: AddConfigurationSettingResponse;
    let baseSetting: ConfigurationSetting<SnapshotReferenceValue>;
    beforeEach(async () => {
      baseSetting = getBaseSetting();
      addResponse = await client.addConfigurationSetting(baseSetting);
    });

    afterEach(async () => {
      await client.setReadOnly(
        {
          key: baseSetting.key,
          label: baseSetting.label,
        },
        false,
      );
      await client.deleteConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
    });

    it("can add and get SnapshotReference", async () => {
      assertSnapshotReferenceProps(addResponse, baseSetting);
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      assertSnapshotReferenceProps(getResponse, baseSetting);
    });

    it("can add and update SnapshotReference", async () => {
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      const newSnapshotName = recorder.variable(
        "snapshot-name-2",
        `snapshot-name-2${Math.floor(Math.random() * 1000)}`,
      );

      assertSnapshotReferenceProps(getResponse, baseSetting);
      const snapshotReference = parseSnapshotReference(getResponse);
      snapshotReference.value.snapshotName = newSnapshotName;

      const setResponse = await client.setConfigurationSetting(snapshotReference);
      assertSnapshotReferenceProps(setResponse, {
        ...baseSetting,
        value: { snapshotName: newSnapshotName },
      });

      const getResponseAfterUpdate = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      assertSnapshotReferenceProps(getResponseAfterUpdate, {
        ...baseSetting,
        value: { snapshotName: newSnapshotName },
      });
    });

    it("can add, list and update multiple SnapshotReferences", async () => {
      const secondSetting: ConfigurationSetting<SnapshotReferenceValue> = {
        ...baseSetting,
        key: `${baseSetting.key}-2`,
      };
      const newSnapshotName = recorder.variable(
        "snapshot-name-3",
        `snapshot-name-3${Math.floor(Math.random() * 1000)}`,
      );
      await client.addConfigurationSetting(secondSetting);

      let numberOfSnapshotReferencesReceived = 0;
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`,
      })) {
        numberOfSnapshotReferencesReceived++;
        if (setting.key === baseSetting.key) {
          assertSnapshotReferenceProps(setting, baseSetting);
          await client.setConfigurationSetting({
            ...baseSetting,
            value: { snapshotName: newSnapshotName },
          });
        } else {
          assertSnapshotReferenceProps(setting, secondSetting);
          await client.setReadOnly(
            { key: setting.key, label: setting.label },
            !secondSetting.isReadOnly,
          );
        }
      }
      assert.equal(
        numberOfSnapshotReferencesReceived,
        2,
        "Unexpected number of SnapshotReferences seen",
      );
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`,
      })) {
        numberOfSnapshotReferencesReceived--;
        if (setting.key === baseSetting.key) {
          assertSnapshotReferenceProps(setting, {
            ...baseSetting,
            value: { snapshotName: newSnapshotName },
          });
        } else {
          assertSnapshotReferenceProps(setting, {
            ...secondSetting,
            isReadOnly: !secondSetting.isReadOnly,
          });
        }
      }

      assert.equal(
        numberOfSnapshotReferencesReceived,
        0,
        "Unexpected number of SnapshotReferences seen after updating",
      );
      await client.setReadOnly({ key: secondSetting.key, label: secondSetting.label }, false);
      await client.deleteConfigurationSetting({
        key: secondSetting.key,
        label: secondSetting.label,
      });
    });
  });

  describe("serializeAsConfigurationSettingParam", () => {
    [`[]`, "Hello World"].forEach((value) => {
      it(`Unexpected value ${value} as snapshot reference value`, async () => {
        const setting: ConfigurationSetting<SnapshotReferenceValue> = {
          contentType: snapshotReferenceContentType,
          key: recorder.variable(
            "snapshot-ref-1",
            `snapshot-ref-1${Math.floor(Math.random() * 1000)}`,
          ),
          isReadOnly: false,
          value: { snapshotName: "name" },
        };
        setting.value = value as any;
        await client.addConfigurationSetting(setting as any);
        assert.equal(
          (await client.getConfigurationSetting({ key: setting.key })).value,
          value,
          "message",
        );
        await client.deleteConfigurationSetting({ key: setting.key });
      });
    });
  });
});
