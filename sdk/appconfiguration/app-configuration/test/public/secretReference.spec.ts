// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  ConfigurationSetting,
  isSecretReference,
  parseSecretReference,
  secretReferenceContentType,
  SecretReferenceValue
} from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("AppConfigurationClient - SecretReference", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = startRecorder(this);
    client = createAppConfigurationClientForTests() || this.skip();
  });

  afterEach(async function(this: Context) {
    await recorder.stop();
  });

  describe("SecretReference configuration setting", () => {
    const getBaseSetting = (): ConfigurationSetting<SecretReferenceValue> => {
      return {
        value: {
          secretId: `https://vault_name.vault.azure.net/secrets/${recorder.getUniqueName("name-2")}`
        }, // TODO: It's a URL in .NET, should we leave it as a string input?
        isReadOnly: false,
        key: recorder.getUniqueName("name-3"),
        label: "label-s",
        contentType: secretReferenceContentType
      };
    };

    function assertSecretReferenceProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: ConfigurationSetting<SecretReferenceValue>
    ): void {
      assert.equal(isSecretReference(actual), true, "Expected to get the SecretReference");
      const actualSecretReference = parseSecretReference(actual);
      if (isSecretReference(actual)) {
        assert.equal(
          actual.key,
          expected.key,
          "Key from the response from get request is not as expected"
        );
        assert.equal(actualSecretReference.value.secretId, expected.value.secretId);
        assert.equal(actual.isReadOnly, expected.isReadOnly);
        assert.equal(actual.label, expected.label);
        assert.equal(actual.contentType, expected.contentType);
      }
    }

    let addResponse: AddConfigurationSettingResponse;
    let baseSetting: ConfigurationSetting<SecretReferenceValue>;
    beforeEach(async () => {
      baseSetting = getBaseSetting();
      addResponse = await client.addConfigurationSetting(baseSetting);
    });

    afterEach(async () => {
      await client.deleteConfigurationSetting({
        key: baseSetting.key
      });
    });

    it("can add and get SecretReference", async () => {
      assertSecretReferenceProps(addResponse, baseSetting);
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertSecretReferenceProps(getResponse, baseSetting);
    });

    it("can add and update SecretReference", async () => {
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      const newSecretId = `https://vault_name.vault.azure.net/secrets/${recorder.getUniqueName(
        "name-4"
      )}`;

      assertSecretReferenceProps(getResponse, baseSetting);
      const secretReference = parseSecretReference(getResponse);
      secretReference.value.secretId = newSecretId;

      const setResponse = await client.setConfigurationSetting(secretReference);
      assertSecretReferenceProps(setResponse, {
        ...baseSetting,
        value: { secretId: newSecretId }
      });

      const getResponseAfterUpdate = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertSecretReferenceProps(getResponseAfterUpdate, {
        ...baseSetting,
        value: { secretId: newSecretId }
      });
    });

    it("can add, list and update multiple SecretReferences", async () => {
      const secondSetting = {
        ...baseSetting,
        key: `${baseSetting.key}-2`
      };
      const newSecretId = `https://vault_name.vault.azure.net/secrets/${recorder.getUniqueName(
        "name-5"
      )}`;
      await client.addConfigurationSetting(secondSetting);

      let numberOFSecretReferencesReceived = 0;
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`
      })) {
        numberOFSecretReferencesReceived++;
        if (setting.key === baseSetting.key) {
          assertSecretReferenceProps(setting, baseSetting);
          await client.setConfigurationSetting({
            ...baseSetting,
            value: { secretId: newSecretId }
          });
        } else {
          assertSecretReferenceProps(setting, secondSetting);
          await client.setReadOnly(
            { key: setting.key, label: setting.label },
            !secondSetting.isReadOnly
          );
        }
      }
      assert.equal(numberOFSecretReferencesReceived, 2, "Unexpected number of FeatureFlags seen");
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`
      })) {
        numberOFSecretReferencesReceived--;
        if (setting.key === baseSetting.key) {
          assertSecretReferenceProps(setting, { ...baseSetting, value: { secretId: newSecretId } });
        } else {
          assertSecretReferenceProps(setting, {
            ...secondSetting,
            isReadOnly: !secondSetting.isReadOnly
          });
        }
      }

      assert.equal(
        numberOFSecretReferencesReceived,
        0,
        "Unexpected number of SecretReferences seen after updating"
      );
      await client.deleteConfigurationSetting({ key: secondSetting.key });
    });
  });

  describe("serializeAsConfigurationSettingParam", () => {
    [`[]`, "Hello World"].forEach((value) => {
      it(`Unexpected value ${value} as secret reference value`, async () => {
        const setting: ConfigurationSetting<SecretReferenceValue> = {
          contentType: secretReferenceContentType,
          key: recorder.getUniqueName("name-1"),
          isReadOnly: false,
          value: { secretId: "id" }
        };
        setting.value = value as any;
        await client.addConfigurationSetting(setting);
        assert.equal(
          (await client.getConfigurationSetting({ key: setting.key })).value,
          value,
          "message"
        );
        await client.deleteConfigurationSetting({ key: setting.key });
      });
    });
  });
});
