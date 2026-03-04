// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { TemplateTest } from "./templateBase.spec.js";

interface GetWidgetTestOptions {
  /**
   * Name of the widget to be created and fetched in the test.
   *
   * This obviously shouldn't affect the test's performance, but is instead used as an example
   * of how to create custom options.
   */
  widgetName: string;
}

export class GetWidgetTest extends TemplateTest<GetWidgetTestOptions> {
  static prefix = randomUUID();
  public options: PerfOptionDictionary<GetWidgetTestOptions> = {
    widgetName: {
      required: true,
      description: "Name of the widget to be created",
      longName: "widgetName",
      defaultValue: "widget",
    },
  };

  public async globalSetup(): Promise<void> {
    await this.appConfigurationClient.addConfigurationSetting({
      key: GetWidgetTest.prefix + this.parsedOptions.widgetName.value,
      value: "settingValue",
    });
  }

  async run(): Promise<void> {
    await this.templateClient.widgets.getWidget(
      GetWidgetTest.prefix + this.parsedOptions.widgetName.value,
    );
  }

  public async globalCleanup(): Promise<void> {
    await this.appConfigurationClient.deleteConfigurationSetting({
      key: GetWidgetTest.prefix + this.parsedOptions.widgetName.value,
    });
  }
}
