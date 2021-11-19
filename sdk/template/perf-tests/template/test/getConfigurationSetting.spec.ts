// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { TemplateTest } from "./templateBase.spec";

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
  static prefix = generateUuid();
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
      GetConfigurationSettingTest.prefix + this.parsedOptions.settingName.value
    );
  }

  public async globalCleanup(): Promise<void> {
    await this.appConfigurationClient.deleteConfigurationSetting({
      key: GetConfigurationSettingTest.prefix + this.parsedOptions.settingName.value,
    });
  }
}
