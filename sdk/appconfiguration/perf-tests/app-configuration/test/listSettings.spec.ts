// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfStressOptionDictionary, executeParallel } from "@azure/test-utils-perfstress";
import { AppConfigTest } from "./appConfigBase.spec";

interface ListTestOptions {
  count: number;
}

export class ListSettingsTest extends AppConfigTest<ListTestOptions> {
  static prefix = generateUuid();
  public options: PerfStressOptionDictionary<ListTestOptions> = {
    count: {
      required: true,
      description: "Number of settings to be listed",
      longName: "count",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    await super.globalSetup();
    await executeParallel(
      async (_count: number, _index: number) => {
        await this.client.addConfigurationSetting({key: ListSettingsTest.prefix+generateUuid(), value:"random"});
      },
      this.parsedOptions.count.value!,
      32
    );
  }

  async runAsync(): Promise<void> {
    for await (const response of this.client.listConfigurationSettings({keyFilter:ListSettingsTest.prefix+"*"}).byPage()) {
      for (const _ of response.items) {
      }
    }
  }

  public async globalCleanup() {
    const keys:string[]=[];
    for await (const response of this.client.listConfigurationSettings({keyFilter:ListSettingsTest.prefix+"*"}).byPage()) {
      for (const setting of response.items) {
        keys.push(setting.key);
      }
    }
    await executeParallel(
      async (count: number, _: number) => {
        await this.client.deleteConfigurationSetting({key: keys[count]});
      },
      this.parsedOptions.count.value!,
      32
    );
    await super.globalCleanup();
  }
}
