// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";
import { PlaywrightReporterStorageManager } from "../../src/utils/playwrightReporterStorageManager.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { ServiceErrorMessageConstants } from "../../src/common/messages.js";
import * as fs from "node:fs";
import { join } from "node:path";
import process from "node:process";

vi.mock("../../src/utils/utils.js", () => ({
  populateValuesFromServiceUrl: () => ({
    region: "eastus",
    domain: "playwright.microsoft.com",
    accountId: "workspace-123",
  }),
  getStorageAccountNameFromUri: () => "account",
  calculateOptimalConcurrency: vi.fn(),
  collectAllFiles: vi.fn().mockReturnValue([]),
}));

vi.mock("@azure/storage-blob", () => ({
  BlobServiceClient: class {
    constructor(_url: string, _credential: any) {}
    getContainerClient(_name: string) {
      return {
        exists: vi.fn().mockResolvedValue(true),
        create: vi.fn().mockResolvedValue(undefined),
        getBlockBlobClient: vi.fn().mockImplementation(() => {
          // Provide a globally accessible mock client so tests can assert method calls
          return (
            (globalThis as any).__mockBlockBlobClient || {
              upload: vi.fn(),
              uploadData: vi.fn(),
              uploadStream: vi.fn(),
            }
          );
        }),
      };
    }
  },
}));

vi.mock("../../src/common/logger.js", () => ({
  coreLogger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("PlaywrightReporterStorageManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset singleton state
    PlaywrightServiceConfig.instance.credential = undefined;
    PlaywrightServiceConfig.instance.runId = "run-abc";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uploadPlaywrightHtmlReportAfterTests returns false when no credential", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const ok = await mgr.uploadPlaywrightHtmlReportAfterTests("playwright-report", {
      storageUri: "https://account.blob.core.windows.net",
      name: "ws",
      resourceId:
        "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/ws",
      subscriptionId: "sub",
    } as any);

    expect(ok).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.NO_CRED_ENTRA_AUTH_ERROR.message,
    );
  });

  it("uploadPlaywrightHtmlReportAfterTests returns false when output folder missing", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    PlaywrightServiceConfig.instance.credential = { token: "mock" } as any;
    // Use a unique folder name that does not exist to avoid ESM spy limitations
    const folderName = `non-existent-report-folder-${Date.now()}`;
    const outputPath = join(process.cwd(), folderName);
    if (fs.existsSync(outputPath)) {
      try {
        fs.rmSync(outputPath, { recursive: true, force: true });
      } catch {}
    }
    const ok = await mgr.uploadPlaywrightHtmlReportAfterTests(folderName, {
      storageUri: "https://account.blob.core.windows.net",
      name: "ws",
      resourceId:
        "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/ws",
      subscriptionId: "sub",
    } as any);

    expect(ok).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.PLAYWRIGHT_TEST_REPORT_NOT_FOUND.formatWithFolder(folderName),
    );
  });

  it("uploadPlaywrightHtmlReportAfterTests calls uploadHtmlReportFolder on success", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    PlaywrightServiceConfig.instance.credential = { token: "mock" } as any;
    PlaywrightServiceConfig.instance.runId = "run-123";

    const folderName = "playwright-report";
    const outputPath = join(process.cwd(), folderName);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const spy = vi.spyOn(mgr as any, "uploadHtmlReportFolder").mockResolvedValue(undefined);

    const workspace = {
      storageUri: "https://account.blob.core.windows.net",
      name: "ws",
      resourceId:
        "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/ws",
      subscriptionId: "sub",
    } as any;

    const ok = await mgr.uploadPlaywrightHtmlReportAfterTests(folderName, workspace);

    expect(ok).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      PlaywrightServiceConfig.instance.credential,
      "run-123",
      outputPath,
      workspace,
    );

    // Cleanup
    try {
      fs.rmSync(outputPath, { recursive: true, force: true });
    } catch {}
    spy.mockRestore();
  });

  it("uploadHtmlReportFolder handles missing storageUri without throwing", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await mgr.uploadHtmlReportFolder({} as any, "run-1", join(process.cwd(), "playwright-report"), {
      // storageUri intentionally missing
      name: "ws",
      resourceId:
        "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/ws",
      subscriptionId: "sub",
    } as any);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.REPORTING_STATUS_FAILED.message,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.STORAGE_URI_NOT_FOUND.message,
    );
  });

  it("modifyTraceIndexHtml is no-op when trace/index.html is missing", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    const tmpRoot = join(process.cwd(), `tmp-playwright-${Date.now()}`);
    fs.mkdirSync(tmpRoot, { recursive: true });

    // Call private method via any-cast; should not throw and not create the file
    await (mgr as any).modifyTraceIndexHtml(tmpRoot);

    const indexPath = join(tmpRoot, "trace/index.html");
    expect(fs.existsSync(indexPath)).toBe(false);

    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("modifyTraceIndexHtml rewrites trace/index.html with redirect script", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    const tmpRoot = join(process.cwd(), `tmp-playwright-${Date.now()}`);
    const traceDir = join(tmpRoot, "trace");
    fs.mkdirSync(traceDir, { recursive: true });
    const indexPath = join(traceDir, "index.html");
    fs.writeFileSync(indexPath, "<html>old</html>");

    await (mgr as any).modifyTraceIndexHtml(tmpRoot);

    const content = fs.readFileSync(indexPath, "utf-8");
    expect(content).toContain("Redirecting to Trace Viewer");
    expect(content).toContain("https://trace.playwright.dev/");

    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("uploadHtmlReportFolder uses upload strategies for small/medium/large files", async () => {
    const mgr = new PlaywrightReporterStorageManager();
    PlaywrightServiceConfig.instance.credential = { token: "mock" } as any;
    PlaywrightServiceConfig.instance.runId = "run-123";

    // Prepare temporary output folder and placeholder files
    const outputFolder = join(process.cwd(), `playwright-report-${Date.now()}`);
    fs.mkdirSync(outputFolder, { recursive: true });
    fs.writeFileSync(join(outputFolder, "small.bin"), "data");
    fs.writeFileSync(join(outputFolder, "medium.bin"), "moredata");
    fs.writeFileSync(join(outputFolder, "large.bin"), "evenmoredata");

    // Attach spies to a global BlockBlobClient mock used by the storage mock
    const uploadSpy = vi.fn().mockResolvedValue(undefined);
    const uploadDataSpy = vi.fn().mockResolvedValue(undefined);
    const uploadStreamSpy = vi.fn().mockImplementation(async (stream: any) => {
      await new Promise<void>((resolve) => {
        if (stream && typeof stream.on === "function") {
          stream.on("open", () => resolve());
        } else {
          resolve();
        }
      });
      try {
        if (stream && typeof stream.destroy === "function") {
          stream.destroy();
        }
      } catch {}
    });
    (globalThis as any).__mockBlockBlobClient = {
      upload: uploadSpy,
      uploadData: uploadDataSpy,
      uploadStream: uploadStreamSpy,
    };

    // Provide deterministic file list with sizes triggering each strategy
    const { UploadConstants } = await vi.importActual<
      typeof import("../../src/common/constants.js")
    >("../../src/common/constants.js");

    const files = [
      {
        fullPath: join(outputFolder, "small.bin"),
        relativePath: "run-123/small.bin",
        size: UploadConstants.SMALL_FILE_THRESHOLD - 1,
        contentType: "application/octet-stream",
      },
      {
        fullPath: join(outputFolder, "medium.bin"),
        relativePath: "run-123/medium.bin",
        size: UploadConstants.SMALL_FILE_THRESHOLD + 1, // <= LARGE threshold
        contentType: "application/octet-stream",
      },
      {
        fullPath: join(outputFolder, "large.bin"),
        relativePath: "run-123/large.bin",
        size: UploadConstants.LARGE_FILE_THRESHOLD + 1,
        contentType: "application/octet-stream",
      },
    ];

    // Drive the parallel engine with a small concurrency
    const utils = await vi.importMock<typeof import("../../src/utils/utils.js")>(
      "../../src/utils/utils.js",
    );
    (utils.calculateOptimalConcurrency as unknown as Mock).mockReturnValue(1);
    (utils.collectAllFiles as unknown as Mock).mockReturnValue(files);

    const ok = await mgr.uploadHtmlReportFolder(
      PlaywrightServiceConfig.instance.credential as any,
      "run-123",
      outputFolder,
      {
        storageUri: "https://account.blob.core.windows.net",
        name: "ws",
        resourceId:
          "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.LoadTestService/playwrightWorkspaces/ws",
        subscriptionId: "sub",
      } as any,
    );

    expect(ok).toBeUndefined();
    expect(uploadSpy).toHaveBeenCalled();
    expect(uploadDataSpy).toHaveBeenCalled();
    expect(uploadStreamSpy).toHaveBeenCalled();

    // Cleanup
    delete (globalThis as any).__mockBlockBlobClient;
    fs.rmSync(outputFolder, { recursive: true, force: true });
  });
});
