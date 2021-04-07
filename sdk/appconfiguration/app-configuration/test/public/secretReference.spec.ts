// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  isSecretReference,
  SecretReference,
  secretReferenceContentType
} from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
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
    const getBaseSetting = (): SecretReference => {
      return {
        secretId: `https://vault_name.vault.azure.net/secrets/${recorder.getUniqueName("name-2")}`, // TODO: It's a URL in .NET, should we leave it as a string input?
        isReadOnly: false,
        key: recorder.getUniqueName("name-3"),
        label: "label-s",
        contentType: secretReferenceContentType
      };
    };

    function assertSecretReferenceProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: SecretReference
    ) {
      assert.equal(isSecretReference(actual), true, "Expected to get the SecretReference");
      if (isSecretReference(actual)) {
        assert.equal(
          actual.key,
          expected.key,
          "Key from the response from get request is not as expected"
        );
        assert.equal(actual.secretId, expected.secretId);
        assert.equal(actual.isReadOnly, expected.isReadOnly);
        assert.equal(actual.label, expected.label);
        assert.equal(actual.contentType, expected.contentType);
      }
    }

    let addResponse: AddConfigurationSettingResponse;
    let baseSetting: SecretReference;
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
      if (isSecretReference(getResponse)) {
        getResponse.secretId = newSecretId;
      }

      const setResponse = await client.setConfigurationSetting(getResponse);
      assertSecretReferenceProps(setResponse, {
        ...baseSetting,
        secretId: newSecretId
      });

      const getResponseAfterUpdate = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertSecretReferenceProps(getResponseAfterUpdate, {
        ...baseSetting,
        secretId: newSecretId
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
            secretId: newSecretId
          } as SecretReference);
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
          assertSecretReferenceProps(setting, { ...baseSetting, secretId: newSecretId });
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
});
