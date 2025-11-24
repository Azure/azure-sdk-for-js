// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { initializePlaywrightServiceTestRun } from "../../src/core/initializePlaywrightServiceTestRun.js";
import { TestRunCreatePayload } from "../../src/common/types.js";

// Create a mock state object that will be accessible from both tests and mocks
const mockState = {
  patchTestRunAPI: vi.fn().mockResolvedValue({}),
  getTestRunConfig: vi.fn().mockReturnValue({ testConfig: "test-config" }),
  getCIInfo: vi.fn().mockReturnValue({ ciInfo: "test-ci-info" }),
  runName: "",
  runId: "test-run-id",
};

// Mock modules using only inline function definitions
vi.mock("../../src/utils/playwrightServiceApicall.js", () => ({
  PlaywrightServiceApiCall: vi.fn().mockImplementation(function (this: any) {
    this.patchTestRunAPI = (...args: any[]) => mockState.patchTestRunAPI(...args);
  }),
}));

vi.mock("../../src/common/playwrightServiceConfig.js", () => ({
  PlaywrightServiceConfig: {
    get instance() {
      return {
        get runName() {
          return mockState.runName;
        },
        get runId() {
          return mockState.runId;
        },
      };
    },
  },
}));

vi.mock("../../src/utils/utils.js", () => ({
  getTestRunConfig: (...args: any[]) => mockState.getTestRunConfig(...args),
}));

vi.mock("../../src/utils/cIInfoProvider.js", () => ({
  CIInfoProvider: {
    getCIInfo: (...args: any[]) => mockState.getCIInfo(...args),
  },
}));

describe("initializePlaywrightServiceTestRun", () => {
  const mockConfig = { projectName: "test-project" } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset config values before each test
    mockState.runName = "";
    mockState.runId = "test-run-id";
    mockState.patchTestRunAPI.mockResolvedValue({});
    mockState.getTestRunConfig.mockReturnValue({ testConfig: "test-config" });
    mockState.getCIInfo.mockReturnValue({ ciInfo: "test-ci-info" });
  });

  it("should create API client and call patchTestRunAPI with correct payload", async () => {
    // Arrange
    const expectedPayload = {
      displayName: "test-run-id", // runName is empty, so it should use runId
      config: { testConfig: "test-config" },
      ciConfig: { ciInfo: "test-ci-info" },
    } as TestRunCreatePayload;

    // Act
    await initializePlaywrightServiceTestRun(mockConfig);

    // Assert
    expect(mockState.patchTestRunAPI).toHaveBeenCalledTimes(1);
    expect(mockState.patchTestRunAPI).toHaveBeenCalledWith(expectedPayload);
    expect(mockState.getTestRunConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockState.getCIInfo).toHaveBeenCalledTimes(1);
  });

  it("should use runName as displayName when it's not empty", async () => {
    // Arrange
    mockState.runName = "custom-run-name";

    const expectedPayload = {
      displayName: "custom-run-name",
      config: { testConfig: "test-config" },
      ciConfig: { ciInfo: "test-ci-info" },
    } as TestRunCreatePayload;

    // Act
    await initializePlaywrightServiceTestRun(mockConfig);

    // Assert
    expect(mockState.patchTestRunAPI).toHaveBeenCalledWith(expectedPayload);
  });

  it("should use runId as displayName when runName is empty", async () => {
    // Arrange
    mockState.runName = "";
    mockState.runId = "specific-test-run-id";

    const expectedPayload = {
      displayName: "specific-test-run-id", // Should use runId when runName is empty
      config: { testConfig: "test-config" },
      ciConfig: { ciInfo: "test-ci-info" },
    } as TestRunCreatePayload;

    // Act
    await initializePlaywrightServiceTestRun(mockConfig);

    // Assert
    expect(mockState.patchTestRunAPI).toHaveBeenCalledWith(expectedPayload);
  });
});
