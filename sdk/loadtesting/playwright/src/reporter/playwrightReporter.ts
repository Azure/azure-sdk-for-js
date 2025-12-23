// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FullConfig, Reporter } from "@playwright/test/reporter";
import { PlaywrightReporterStorageManager } from "../utils/playwrightReporterStorageManager.js";
import {
  getHtmlReporterOutputFolder,
  getPortalTestRunUrl,
  exitWithFailureMessage,
} from "../utils/utils.js";
import { coreLogger } from "../common/logger.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import { ServiceAuth } from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { PlaywrightServiceApiCall } from "../utils/playwrightServiceApicall.js";
import type { WorkspaceMetaData } from "../common/types.js";

/**
 * Azure Playwright Reporter - Uploads generated Playwright test report folder to Azure Storage.
 */

export default class PlaywrightReporter implements Reporter {
  private config: FullConfig | undefined;
  private workspaceMetadata: WorkspaceMetaData | null = null;

  /**
   * Called when test run begins. Stores configuration for later use and validates serviceAuthType and
   * retrieves workspace metadata.
   * @param config - Playwright test configuration
   */

  async onBegin(config: FullConfig): Promise<void> {
    coreLogger.info(`Reporter configuration: ${JSON.stringify(config.reporter, null, 2)}`);

    // Validate that HTML reporter is configured
    this.validateHtmlReporterConfiguration(config);

    // Validate that reporter is used only with ENTRA_ID authentication
    const playwrightServiceConfig = PlaywrightServiceConfig.instance;
    coreLogger.info(`Current authentication type: ${playwrightServiceConfig.serviceAuthType}`);
    const isUsingAccessToken = playwrightServiceConfig.serviceAuthType === ServiceAuth.ACCESS_TOKEN;
    if (isUsingAccessToken) {
      exitWithFailureMessage(ServiceErrorMessageConstants.REPORTER_REQUIRES_ENTRA_AUTH);
    }
    coreLogger.info("Authentication validation passed - using ENTRA_ID");
    this.config = config;
    // Get workspace metadata for later use
    try {
      const playwrightServiceApiClient = new PlaywrightServiceApiCall();
      this.workspaceMetadata = await playwrightServiceApiClient.getWorkspaceMetadata();
      process.stdout.write("Initializing reporting for this test run.\n");
    } catch (error) {
      coreLogger.error(
        `Failed to get workspace metadata: ${error instanceof Error ? error.message : String(error)}\n`,
      );
      process.stderr.write("Failed to initialize reporting for this test run.\n");
    }
  }

  /**

   * Called when test run ends. Uploads Playwright test report to Azure Storage.

   */

  async onEnd(): Promise<void> {
    process.stdout.write(`Uploading Playwright Test report in Azure storage account.\n`);
    await this.uploadHtmlReport();
  }

  private async uploadHtmlReport(): Promise<void> {
    try {
      const outputFolder = getHtmlReporterOutputFolder(this.config);
      coreLogger.info(`Resolved Playwright test report output folder: ${outputFolder}`);
      const storageManager = new PlaywrightReporterStorageManager();
      coreLogger.info("Starting Playwright test report upload process");
      await storageManager.uploadPlaywrightHtmlReportAfterTests(
        outputFolder,
        this.workspaceMetadata,
      );
      coreLogger.info(`✅ Playwright Test report uploaded successfully to Azure Storage.`);

      // Display portal URL for test report
      if (this.workspaceMetadata) {
        const portalUrl = getPortalTestRunUrl(this.workspaceMetadata);
        process.stdout.write(`You can view test report at: ${portalUrl}\n`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      process.stderr.write(`❌ Failed to upload Playwright test report: ${errorMessage}\n`);
    }
  }

  private validateHtmlReporterConfiguration(config: FullConfig): void {
    if (!config.reporter || !Array.isArray(config.reporter)) {
      throw new Error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
    }

    const hasHtmlReporter = config.reporter.some((reporter) => {
      if (typeof reporter === "string") {
        return reporter === "html";
      }
      if (Array.isArray(reporter) && reporter.length > 0) {
        return reporter[0] === "html";
      }
      return false;
    });

    if (!hasHtmlReporter) {
      exitWithFailureMessage(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED);
    }

    coreLogger.info("HTML reporter validation passed - HTML reporter is configured");
  }
}
