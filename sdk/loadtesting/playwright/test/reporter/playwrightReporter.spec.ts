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

describe("PlaywrightReporter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.playwrightServiceConfig = null;
    // Set env flags to pass reporter pre-checks
    process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] = "true";
    process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "true";
    (globalThis as any).__getHtmlReporterOutputFolderMock.mockReturnValue("playwright-report");
    (globalThis as any).__getPortalTestRunUrlMock.mockReturnValue("https://portal/link");
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

    expect((globalThis as any).__getWorkspaceMetadataMock).toHaveBeenCalled();
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
});
