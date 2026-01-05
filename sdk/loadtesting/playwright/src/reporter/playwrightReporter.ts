// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { FullConfig, Reporter } from "@playwright/test/reporter";
import { PlaywrightReporterStorageManager } from "../utils/playwrightReporterStorageManager.js";
import {
  getHtmlReporterOutputFolder,
  getPortalTestRunUrl,
  getVersionInfo,
} from "../utils/utils.js";
import { coreLogger } from "../common/logger.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import { ServiceAuth, InternalEnvironmentVariables } from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { PlaywrightServiceClient } from "../utils/PlaywrightServiceClient.js";
import { getPlaywrightVersion } from "../utils/getPlaywrightVersion.js";
import type { WorkspaceMetaData, UploadResult } from "../common/types.js";

/**
 * Azure Playwright Reporter - Uploads generated Playwright test report folder to Azure Storage.
 */

export class PlaywrightReporter implements Reporter {
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

    // Check Playwright version for reporting feature compatibility
    try {
      const playwrightVersion = getPlaywrightVersion();
      const playwrightVersionInfo = getVersionInfo(playwrightVersion);

      // Check if version is < 1.57
      const isReportingSupportedVersion =
        playwrightVersionInfo.major > 1 ||
        (playwrightVersionInfo.major === 1 && playwrightVersionInfo.minor >= 57);

      if (!isReportingSupportedVersion) {
        console.error(
          ServiceErrorMessageConstants.PLAYWRIGHT_VERSION_TOO_OLD_FOR_REPORTING.message,
        );
        this.isReportingEnabled = false;
        return;
      }
    } catch (error) {
      coreLogger.error(`Failed to get Playwright version: ${error}`);
      console.error(ServiceErrorMessageConstants.PLAYWRIGHT_VERSION_TOO_OLD_FOR_REPORTING.message);
      this.isReportingEnabled = false;
      return;
    }

    // Check if using service config
    const usingServiceConfig =
      process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] === "true";
    coreLogger.info(`Using service config: ${usingServiceConfig}`);
    if (!usingServiceConfig) {
      console.error(ServiceErrorMessageConstants.REPORTER_REQUIRES_SERVICE_CONFIG.message);
      this.isReportingEnabled = false;
      return;
    }

    // Check if test run creation was successful
    const testRunCreationSuccess =
      process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] === "true";
    if (!testRunCreationSuccess) {
      console.error(ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message);
      console.error(ServiceErrorMessageConstants.REPORTING_TEST_RUN_FAILED.message);
      this.isReportingEnabled = false;
      return;
    }

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
      const playwrightServiceApiClient = new PlaywrightServiceClient();
      this.workspaceMetadata = await playwrightServiceApiClient.getWorkspaceMetadata();

      if (!this.workspaceMetadata?.storageUri) {
        console.error(ServiceErrorMessageConstants.WORKSPACE_REPORTING_DISABLED.message);
        this.isReportingEnabled = false;
        return;
      }

      this.isReportingEnabled = true;

      this.validateHtmlReporterConfiguration(config);
      if (this.isReportingEnabled) {
        console.log(ServiceErrorMessageConstants.REPORTING_ENABLED.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `${ServiceErrorMessageConstants.WORKSPACE_METADATA_FETCH_FAILED.message}Error: ${errorMessage} `,
      );
      this.isReportingEnabled = false;
    }
  }

  /**
   * Called when test run ends. Uploads Playwright test report to Azure Storage if reporting is enabled.
   */

  async onEnd(): Promise<void> {
    if (this.isReportingEnabled) {
      console.log(ServiceErrorMessageConstants.COLLECTING_ARTIFACTS.message);
      const uploadResult = await this.uploadHtmlReport();

      if (uploadResult.success) {
        if (
          uploadResult.partialSuccess &&
          uploadResult.failedFileDetails &&
          uploadResult.failedFileDetails.length > 0
        ) {
          console.log("Warning: Failed to upload the following files:");
          uploadResult.failedFileDetails.forEach((fileDetail) => {
            console.log(`  - ${fileDetail.fileName}, ERROR: ${fileDetail.error}`);
          });
          console.log(ServiceErrorMessageConstants.REPORTING_STATUS_PARTIAL.message);
        } else {
          console.log(ServiceErrorMessageConstants.REPORTING_STATUS_SUCCESS.message);
        }
        // Display portal URL for both full and partial success
        if (this.workspaceMetadata) {
          const portalUrl = getPortalTestRunUrl(this.workspaceMetadata);
          console.log(ServiceErrorMessageConstants.TEST_REPORT_VIEW_URL.formatWithUrl(portalUrl));
        }
      } else {
        console.error(ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message);
        if (uploadResult.errorMessage) {
          console.error(`Error: ${uploadResult.errorMessage}`);
        }
      }
    }
  }

  private async uploadHtmlReport(): Promise<UploadResult> {
    try {
      const outputFolder = getHtmlReporterOutputFolder(this.config);
      coreLogger.info(`Resolved Playwright test report output folder: ${outputFolder}`);
      const storageManager = new PlaywrightReporterStorageManager();
      coreLogger.info("Starting Playwright test report upload process");
      const uploadResult = await storageManager.uploadPlaywrightHtmlReportAfterTests(
        outputFolder,
        this.workspaceMetadata,
      );

      if (uploadResult.success) {
        coreLogger.info(`Playwright Test report uploaded successfully to Azure Storage.`);
      }
      return uploadResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      coreLogger.error(`Upload failed: ${errorMessage}`);
      return { success: false, errorMessage };
    }
  }

  private validateHtmlReporterConfiguration(config: FullConfig): void {
    if (!config.reporter || !Array.isArray(config.reporter)) {
      console.error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
      this.isReportingEnabled = false;
      return;
    }

    const htmlReporterIndex = config.reporter.findIndex((reporter) => {
      const reporterName = typeof reporter === "string" ? reporter : reporter?.[0];
      return reporterName === "html";
    });

    const azureReporterIndex = config.reporter.findIndex((reporter) => {
      const reporterName = typeof reporter === "string" ? reporter : reporter?.[0];
      return (
        typeof reporterName === "string" &&
        reporterName.includes("playwright") &&
        reporterName.includes("reporter")
      );
    });

    // Validate HTML reporter exists
    if (htmlReporterIndex === -1) {
      console.error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
      this.isReportingEnabled = false;
      return;
    }

    // Validate HTML reporter comes before Azure reporter (if Azure reporter exists)
    if (azureReporterIndex !== -1 && htmlReporterIndex > azureReporterIndex) {
      console.error(ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message);
      this.isReportingEnabled = false;
      return;
    }

    coreLogger.info(
      "HTML reporter validation passed - HTML reporter is configured and properly ordered",
    );
  }
}
