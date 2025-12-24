// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FullConfig, Reporter } from "@playwright/test/reporter";
import { PlaywrightReporterStorageManager } from "../utils/playwrightReporterStorageManager.js";
import { getHtmlReporterOutputFolder, getPortalTestRunUrl } from "../utils/utils.js";
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
  private isReportingEnabled = false;

  /**
   * Called when test run begins. Stores configuration for later use and validates serviceAuthType and
   * retrieves workspace metadata.
   * @param config - Playwright test configuration
   */

  async onBegin(config: FullConfig): Promise<void> {
    coreLogger.info(`Reporter configuration: ${JSON.stringify(config.reporter, null, 2)}`);

    this.config = config;

    // Check authentication
    const playwrightServiceConfig = PlaywrightServiceConfig.instance;
    coreLogger.info(`Current authentication type: ${playwrightServiceConfig.serviceAuthType}`);
    const isUsingAccessToken = playwrightServiceConfig.serviceAuthType === ServiceAuth.ACCESS_TOKEN;
    if (isUsingAccessToken) {
      console.error(ServiceErrorMessageConstants.REPORTER_REQUIRES_ENTRA_AUTH.message);
      this.isReportingEnabled = false;
      return;
    }
    coreLogger.info("Authentication validation passed - using ENTRA_ID");

    // Get workspace metadata for later use
    try {
      const playwrightServiceApiClient = new PlaywrightServiceApiCall();
      this.workspaceMetadata = await playwrightServiceApiClient.getWorkspaceMetadata();

      if (!this.workspaceMetadata?.storageUri) {
        console.error(ServiceErrorMessageConstants.WORKSPACE_REPORTING_DISABLED.message);
        console.error(ServiceErrorMessageConstants.STORAGE_URI_NOT_FOUND.message);
        this.isReportingEnabled = false;
        return;
      }

      console.log(ServiceErrorMessageConstants.REPORTING_ENABLED.message);
      this.isReportingEnabled = true;

      this.validateHtmlReporterConfiguration(config);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
      console.error(ServiceErrorMessageConstants.WORKSPACE_METADATA_FETCH_FAILED.message);
      this.isReportingEnabled = false;
    }
  }

  /**
   * Called when test run ends. Uploads Playwright test report to Azure Storage if reporting is enabled.
   */

  async onEnd(): Promise<void> {
    if (this.isReportingEnabled) {
      console.log(ServiceErrorMessageConstants.COLLECTING_ARTIFACTS.message);
      const uploadSuccess = await this.uploadHtmlReport();

      // Display portal URL only if upload was successful
      if (uploadSuccess && this.workspaceMetadata) {
        const portalUrl = getPortalTestRunUrl(this.workspaceMetadata);
        console.log(ServiceErrorMessageConstants.TEST_REPORT_VIEW_URL.formatWithUrl(portalUrl));
      }
    }
  }

  private async uploadHtmlReport(): Promise<boolean> {
    try {
      const outputFolder = getHtmlReporterOutputFolder(this.config);
      coreLogger.info(`Resolved Playwright test report output folder: ${outputFolder}`);
      const storageManager = new PlaywrightReporterStorageManager();
      coreLogger.info("Starting Playwright test report upload process");
      const uploadSuccess = await storageManager.uploadPlaywrightHtmlReportAfterTests(
        outputFolder,
        this.workspaceMetadata,
      );

      if (uploadSuccess) {
        coreLogger.info(`Playwright Test report uploaded successfully to Azure Storage.`);
      }
      return uploadSuccess;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message);
      console.error(errorMessage);
      return false;
    }
  }

  private validateHtmlReporterConfiguration(config: FullConfig): void {
    if (!config.reporter || !Array.isArray(config.reporter)) {
      console.error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
      this.isReportingEnabled = false;
      return;
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
      console.error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
      this.isReportingEnabled = false;
      return;
    }

    coreLogger.info("HTML reporter validation passed - HTML reporter is configured");
  }
}
