// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { TemplateTest } from "./templateBase.spec.js";

interface GetConfigurationSettingTestOptions {
  /**
   * Name of the setting to be created and fetched in the test.
   *
   * This obviously shouldn't affect the test's performance, but is instead used as an example
   * of how to create custom options.
   */
  settingName: string;
}

export class GetConfigurationSettingTest extends TemplateTest<GetConfigurationSettingTestOptions> {
  static prefix = randomUUID();
  public options: PerfOptionDictionary<GetConfigurationSettingTestOptions> = {
    settingName: {
      required: true,
      description: "Name of the setting to be created",
      longName: "settingName",
      defaultValue: "setting",
    },
  };

  public async globalSetup(): Promise<void> {
    await this.appConfigurationClient.addConfigurationSetting({
      key: GetConfigurationSettingTest.prefix + this.parsedOptions.settingName.value,
      value: "settingValue",
    });
  }

  async run(): Promise<void> {
    await this.templateClient.getConfigurationSetting(
      GetConfigurationSettingTest.prefix + this.parsedOptions.settingName.value,
    );
  }

  public async globalCleanup(): Promise<void> {
    await this.appConfigurationClient.deleteConfigurationSetting({
      key: GetConfigurationSettingTest.prefix + this.parsedOptions.settingName.value,
    });
  }
}
