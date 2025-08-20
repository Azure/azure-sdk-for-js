// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { ServiceAuth } from "$internal/common/constants.js";

// Mock the modules needed
vi.mock("$internal/common/customerConfig.js", () => ({
  default: {
    globalSetup: null,
  },
}));

vi.mock("$internal/common/executor.js", () => ({
  loadCustomerGlobalFunction: vi.fn(),
}));

describe("playwrightServiceGlobalSetup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should only call playwrightServiceEntra.globalSetup when serviceAuthType is ENTRA_ID", async () => {
    // Import the modules after mocking
    const playwrightServiceEntra = await import("$internal/core/playwrightServiceEntra.js");
    const { PlaywrightServiceConfig } = await import(
      "$internal/common/playwrightServiceConfig.js"
    );
    const initializeModule = await import(
      "$internal/core/initializePlaywrightServiceTestRun.js"
    );

    // Create spies
    vi.spyOn(playwrightServiceEntra.default, "globalSetup").mockResolvedValue(undefined);
    vi.spyOn(PlaywrightServiceConfig.instance, "serviceAuthType", "get").mockReturnValue(
      ServiceAuth.ENTRA_ID,
    );
    vi.spyOn(initializeModule, "initializePlaywrightServiceTestRun").mockResolvedValue(undefined);

    // Setup mock config
    const mockConfig = {
      configFile: "/path/to/config/file",
    } as any;

    // Import the module under test last, after all mocks are set up
    const globalSetupModule = await import(
      "$internal/core/global/playwright-service-global-setup.js"
    );

    // Act - with ENTRA_ID auth type
    await globalSetupModule.default(mockConfig);

    // Assert
    expect(playwrightServiceEntra.default.globalSetup).toHaveBeenCalledTimes(1);
    expect(initializeModule.initializePlaywrightServiceTestRun).toHaveBeenCalledWith(mockConfig);

    // Reset mocks for second test
    vi.clearAllMocks();

    // Change auth type to something else
    vi.spyOn(PlaywrightServiceConfig.instance, "serviceAuthType", "get").mockReturnValue(
      "NOT_ENTRA_ID",
    );

    // Act - with non-ENTRA_ID auth type
    await globalSetupModule.default(mockConfig);

    // Assert
    expect(playwrightServiceEntra.default.globalSetup).not.toHaveBeenCalled();
    expect(initializeModule.initializePlaywrightServiceTestRun).toHaveBeenCalledWith(mockConfig);
  });
});
