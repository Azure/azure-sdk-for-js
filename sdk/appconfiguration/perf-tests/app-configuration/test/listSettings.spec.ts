// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfOptionDictionary, executeParallel } from "@azure/test-utils-perf";
import { AppConfigTest } from "./appConfigBase.spec";

interface ListTestOptions {
  /**
   * Number of settings to be created/listed in the test
   */
  count: number;
}

export class ListSettingsTest extends AppConfigTest<ListTestOptions> {
  static prefix = generateUuid();
  public options: PerfOptionDictionary<ListTestOptions> = {
    count: {
      required: true,
      description: "Number of settings to be listed",
      longName: "count",
      defaultValue: 10
    }
  };

  public async globalSetup(): Promise<void> {
    if (!this.parsedOptions.count.value) {
      return;
    }
    await executeParallel(
      async () => {
        await this.client.addConfigurationSetting({
          key: ListSettingsTest.prefix + generateUuid(),
          value: "random"
        });
      },
      this.parsedOptions.count.value,
      32
    );
  }

  async run(): Promise<void> {
    for await (const response of this.client
      .listConfigurationSettings({ keyFilter: ListSettingsTest.prefix + "*" })
      .byPage()) {
      // eslint-disable-next-line no-empty
      for (const _ of response.items) {
      }
    }
  }

  public async globalCleanup(): Promise<void> {
    const keys: string[] = [];
    for await (const response of this.client
      .listConfigurationSettings({ keyFilter: ListSettingsTest.prefix + "*" })
      .byPage()) {
      for (const setting of response.items) {
        keys.push(setting.key);
      }
    }
    if (!this.parsedOptions.count.value) {
      return;
    }
    await executeParallel(
      async (count: number) => {
        await this.client.deleteConfigurationSetting({ key: keys[count] });
      },
      this.parsedOptions.count.value,
      32
    );
  }
}
