// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import { AppConfigurationClient } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
import { Context } from "mocha";
import { AbortController } from "@azure/abort-controller";

describe("AppConfigurationClient", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = startRecorder(this);
    client = createAppConfigurationClientForTests() || this.skip();
  });

  afterEach(async function(this: Context) {
    await recorder.stop();
  });

  describe.only("simple usages", () => {
    it("Add and query a setting without a label", async () => {
      const key = recorder.getUniqueName("noLabelTests");
      const numberOfSettings = 200;
      const times = 1000;
      for (let time = 0; time < times; time++) {
        const promises = [];
        try {
          for (let index = 0; index < numberOfSettings; index++) {
            promises.push(
              client.addConfigurationSetting(
                {
                  key: key + " " + +index,
                  value: "added"
                },
                {
                  abortSignal: AbortController.timeout(10000)
                }
              )
            );
          }
          await Promise.all(promises);
        } catch (error) {
          console.log(error);
        }
      }

      await cleanupSampleValues([key], client);
    });
  });
});

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}
