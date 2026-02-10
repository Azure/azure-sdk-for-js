// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { FullConfig } from "@playwright/test";
import PlaywrightReporter from "../../src/reporter/playwrightReporter.js";
import { ServiceAuth, InternalEnvironmentVariables } from "../../src/common/constants.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { state } from "../../src/common/state.js";
import { ServiceErrorMessageConstants } from "../../src/common/messages.js";

vi.mock("../../src/utils/playwrightReporterStorageManager.js", () => {
  const uploadHtmlReportAfterTestsMock = vi.fn();
  (globalThis as any).__uploadHtmlReportAfterTestsMock = uploadHtmlReportAfterTestsMock;
  class MockStorageManager {
    uploadPlaywrightHtmlReportAfterTests = uploadHtmlReportAfterTestsMock;
  }
  return {
    PlaywrightReporterStorageManager: MockStorageManager,
  };
});

vi.mock("../../src/utils/PlaywrightServiceClient.js", () => {
  const getWorkspaceMetadataMock = vi.fn();
  (globalThis as any).__getWorkspaceMetadataMock = getWorkspaceMetadataMock;
  class MockApiCall {
    getWorkspaceMetadata = getWorkspaceMetadataMock;
  }
  return {
    PlaywrightServiceClient: MockApiCall,
  };
});

vi.mock("../../src/utils/utils.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/utils/utils.js")>();
  const getHtmlReporterOutputFolderMock = vi.fn().mockReturnValue("playwright-report");
  const getPortalTestRunUrlMock = vi.fn().mockReturnValue("https://portal/link");
  (globalThis as any).__getHtmlReporterOutputFolderMock = getHtmlReporterOutputFolderMock;
  (globalThis as any).__getPortalTestRunUrlMock = getPortalTestRunUrlMock;
  return {
    ...actual,
    getHtmlReporterOutputFolder: getHtmlReporterOutputFolderMock,
    getPortalTestRunUrl: getPortalTestRunUrlMock,
  };
});

vi.mock("../../src/common/logger.js", () => ({
  coreLogger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../src/utils/getPlaywrightVersion.js", () => {
  const getPlaywrightVersionMock = vi.fn();
  (globalThis as any).__getPlaywrightVersionMock = getPlaywrightVersionMock;
  return {
    getPlaywrightVersion: getPlaywrightVersionMock,
  };
});

describe("PlaywrightReporter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.playwrightServiceConfig = null;
    // Set env flags to pass reporter pre-checks
    process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] = "true";
    process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "true";
    (globalThis as any).__getHtmlReporterOutputFolderMock.mockReturnValue("playwright-report");
    (globalThis as any).__getPortalTestRunUrlMock.mockReturnValue("https://portal/link");
    // Set default Playwright version to supported version
    (globalThis as any).__getPlaywrightVersionMock.mockReturnValue("1.57.0");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    state.playwrightServiceConfig = null;
    delete process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG];
    delete process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS];
  });

  it("should disable reporting when access token auth is used", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ACCESS_TOKEN;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTER_REQUIRES_ENTRA_AUTH.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when HTML reporter is not configured", async () => {
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const config = { reporter: [["list"]] } as unknown as FullConfig;
    (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue({
      storageUri: "https://account.blob.core.windows.net",
    });

    await reporter.onBegin(config);

    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.HTML_REPORTER_REQUIRED.message,
    );

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should enable reporting and upload artifacts when configuration is valid", async () => {
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
    const reporter = new PlaywrightReporter();
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    const workspaceMetadata = {
      storageUri: "https://account.blob.core.windows.net",
      subscriptionId: "sub-id",
      resourceId:
        "/subscriptions/sub-id/resourceGroups/my-rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/workspace-name",
      name: "workspace-name",
    };
    (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);
    (globalThis as any).__getHtmlReporterOutputFolderMock.mockReturnValue("custom-report");
    (globalThis as any).__uploadHtmlReportAfterTestsMock.mockResolvedValue({ success: true });
    (globalThis as any).__getPortalTestRunUrlMock.mockReturnValue("https://portal/link/test");

    const config = {
      reporter: [["html", { outputFolder: "custom-report" }]],
    } as unknown as FullConfig;

    await reporter.onBegin(config);
    await reporter.onEnd();

    expect((globalThis as any).__getWorkspaceMetadataMock).toHaveBeenCalled();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).toHaveBeenCalledWith(
      "custom-report",
      workspaceMetadata,
    );
    expect((globalThis as any).__getPortalTestRunUrlMock).toHaveBeenCalledWith(workspaceMetadata);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.COLLECTING_ARTIFACTS.message,
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.TEST_REPORT_VIEW_URL.formatWithUrl("https://portal/link/test"),
    );
  });

  it("should disable reporting when workspace metadata lacks storage URI", async () => {
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue({});

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.WORKSPACE_REPORTING_DISABLED.message,
    );
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should handle workspace metadata fetch failure gracefully", async () => {
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    (globalThis as any).__getWorkspaceMetadataMock.mockRejectedValue(new Error("fetch failed"));

    const config = { reporter: [["html"]] } as unknown as FullConfig;

    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `${ServiceErrorMessageConstants.WORKSPACE_METADATA_FETCH_FAILED.message}Error: fetch failed `,
    );

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  describe("Workspace metadata reporting field tests", () => {
    it("should enable reporting when reporting is 'Enabled' and storageUri is present", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

      const workspaceMetadata = {
        reporting: "Enabled",
        storageUri: "https://account.blob.core.windows.net",
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);
      (globalThis as any).__uploadHtmlReportAfterTestsMock.mockResolvedValue({ success: true });

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.REPORTING_ENABLED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).toHaveBeenCalled();
    });

    it("should disable reporting when reporting is 'Enabled' but storageUri is missing", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      const workspaceMetadata = {
        reporting: "Enabled",
        // storageUri intentionally missing
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.WORKSPACE_REPORTING_STORAGE_NOT_LINKED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
    });

    it("should disable reporting when reporting is 'Disabled' regardless of storageUri", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      const workspaceMetadata = {
        reporting: "Disabled",
        storageUri: "https://account.blob.core.windows.net", // Present but should be ignored
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.WORKSPACE_REPORTING_DISABLED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
    });

    it("should fallback to storageUri check when reporting field is not present", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

      const workspaceMetadata = {
        // reporting field intentionally missing
        storageUri: "https://account.blob.core.windows.net",
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);
      (globalThis as any).__uploadHtmlReportAfterTestsMock.mockResolvedValue({ success: true });

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.REPORTING_ENABLED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).toHaveBeenCalled();
    });

    it("should fallback to storageUri check when reporting field has unexpected value", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

      const workspaceMetadata = {
        reporting: "UnexpectedValue", // Invalid value
        storageUri: "https://account.blob.core.windows.net",
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);
      (globalThis as any).__uploadHtmlReportAfterTestsMock.mockResolvedValue({ success: true });

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.REPORTING_ENABLED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).toHaveBeenCalled();
    });

    it("should disable reporting when reporting field is not present and storageUri is missing", async () => {
      PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
      const reporter = new PlaywrightReporter();
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      const workspaceMetadata = {
        // Both reporting and storageUri intentionally missing
      };
      (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);

      const config = { reporter: [["html"]] } as unknown as FullConfig;
      await reporter.onBegin(config);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.WORKSPACE_REPORTING_DISABLED.message,
      );

      await reporter.onEnd();
      expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
    });
  });

  it("should disable reporting when service config is not used", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Set service config to false
    process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] = "false";
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTER_REQUIRES_SERVICE_CONFIG.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when service config environment variable is not set", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Remove service config environment variable
    delete process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG];
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTER_REQUIRES_SERVICE_CONFIG.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when test run creation failed", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Set test run creation to failed
    process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "false";
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_TEST_RUN_FAILED.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when test run creation success environment variable is not set", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Remove test run creation success environment variable
    delete process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS];
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_TEST_RUN_FAILED.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when Playwright version is too old for reporting feature", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Set Playwright version to below 1.57
    (globalThis as any).__getPlaywrightVersionMock.mockReturnValue("1.56.0");
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.PLAYWRIGHT_VERSION_TOO_OLD_FOR_REPORTING.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should disable reporting when Playwright version check fails", async () => {
    const reporter = new PlaywrightReporter();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    // Mock getPlaywrightVersion to throw an error
    (globalThis as any).__getPlaywrightVersionMock.mockImplementation(() => {
      throw new Error("Version check failed");
    });
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.PLAYWRIGHT_VERSION_TOO_OLD_FOR_REPORTING.message,
    );
    expect((globalThis as any).__getWorkspaceMetadataMock).not.toHaveBeenCalled();

    await reporter.onEnd();
    expect((globalThis as any).__uploadHtmlReportAfterTestsMock).not.toHaveBeenCalled();
  });

  it("should continue with reporting when Playwright version is supported", async () => {
    PlaywrightServiceConfig.instance.serviceAuthType = ServiceAuth.ENTRA_ID;
    const reporter = new PlaywrightReporter();
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    // Set Playwright version to supported version
    (globalThis as any).__getPlaywrightVersionMock.mockReturnValue("1.57.0");

    const workspaceMetadata = {
      storageUri: "https://account.blob.core.windows.net",
      subscriptionId: "sub-id",
      resourceId:
        "/subscriptions/sub-id/resourceGroups/my-rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/workspace-name",
      name: "workspace-name",
    };
    (globalThis as any).__getWorkspaceMetadataMock.mockResolvedValue(workspaceMetadata);
    (globalThis as any).__uploadHtmlReportAfterTestsMock.mockResolvedValue({ success: true });

    const config = { reporter: [["html"]] } as unknown as FullConfig;
    await reporter.onBegin(config);

    // Should not show version error and should proceed to get workspace metadata
    expect((globalThis as any).__getWorkspaceMetadataMock).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_ENABLED.message,
    );
  });
});
