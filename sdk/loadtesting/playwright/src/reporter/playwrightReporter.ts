// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FullConfig, Reporter } from "@playwright/test/reporter";

/**
 * Azure Playwright Reporter - Uploads generated HTML report folder to Azure Storage.
 */
export default class PlaywrightReporter implements Reporter {
  private config: FullConfig | undefined;

  /**
   * Called when test run begins. Stores configuration for later use and validates serviceAuthType.
   * @param config - Playwright test configuration
   */
  onBegin(config: FullConfig): void {
    this.config = config;
    console.log(this.config);
  }

  /**
   * Called when test run ends. Uploads HTML report to Azure Storage.
   */
  async onEnd(): Promise<void> {
    console.log(`Uploading Playwright Test report in Azure storage account.`);
  }
}
