// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlaywrightServiceApiCall } from "../../src/utils/playwrightServiceApicall.js";
import { Constants } from "../../src/common/constants.js";
import { ServiceErrorMessageConstants } from "../../src/common/messages.js";
import { TestRunCreatePayload } from "../../src/common/types.js";

// Create a mock state object that will be accessible from both tests and mocks
const mockState = {
  callAPI: vi.fn(),
  exitWithFailureMessage: vi.fn(),
  getAccessToken: vi.fn().mockReturnValue("mock-token"),
  getTestRunApiUrl: vi.fn().mockReturnValue("https://example.com/test-run"),
  randomUUID: vi.fn().mockReturnValue("mock-uuid"),
  extractErrorMessage: vi.fn(),
  validateMptPAT: vi.fn(),
};

// Mock modules using only inline function definitions to avoid hoisting issues
vi.mock("../../src/common/httpService.js", () => ({
  HttpService: vi.fn().mockImplementation(() => ({
    callAPI: (...args: any[]) => mockState.callAPI(...args),
  })),
}));

// Partial mock utils: import original then override selected fns
vi.mock("../../src/utils/utils.js", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    getTestRunApiUrl: (...args: any[]) => mockState.getTestRunApiUrl(...args),
    getAccessToken: (...args: any[]) => mockState.getAccessToken(...args),
    exitWithFailureMessage: (...args: any[]) => mockState.exitWithFailureMessage(...args),
    extractErrorMessage: (...args: any[]) => mockState.extractErrorMessage(...args),
    validateMptPAT: (...args: any[]) => mockState.validateMptPAT(...args),
  };
});

// Mock the global crypto object since it's not imported but used directly
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => mockState.randomUUID(),
  },
  configurable: true,
});

describe("PlaywrightServiceApiCall", () => {
  let apiCall: PlaywrightServiceApiCall;

  beforeEach(() => {
    vi.clearAllMocks();
    apiCall = new PlaywrightServiceApiCall();
    // Reset mocks to their default values for each test
    mockState.getAccessToken.mockReturnValue("mock-token");
    mockState.getTestRunApiUrl.mockReturnValue("https://example.com/test-run");
    mockState.randomUUID.mockReturnValue("mock-uuid");
  });

  describe("patchTestRunAPI", () => {
    const mockPayload = {
      displayName: "test-run",
      config: { testConfig: "test-config" },
      ciConfig: { ciInfo: "test-ci-info" },
    } as TestRunCreatePayload;

    it("should call the API with correct parameters and return response data on success", async () => {
      // Arrange
      const mockResponse = {
        status: 200,
        bodyAsText: JSON.stringify({ id: "test-id", name: "test-name" }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      // Act
      const result = await apiCall.patchTestRunAPI(mockPayload);

      // Assert
      expect(mockState.getTestRunApiUrl).toHaveBeenCalledTimes(1);
      expect(mockState.getAccessToken).toHaveBeenCalledTimes(1);
      expect(mockState.validateMptPAT).toHaveBeenCalledTimes(1);
      expect(mockState.callAPI).toHaveBeenCalledWith(
        "PATCH",
        "https://example.com/test-run?api-version=" + Constants.LatestAPIVersion,
        JSON.stringify(mockPayload),
        "mock-token",
        "application/merge-patch+json",
        "mock-uuid",
      );
      expect(result).toEqual({ id: "test-id", name: "test-name" });
    });

    it("should throw error when access token is not available", async () => {
      // Arrange
      mockState.getAccessToken.mockReturnValue(undefined);

      // Act & Assert
      await expect(apiCall.patchTestRunAPI(mockPayload)).rejects.toThrow(
        "PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.",
      );

      // Verify API was not called
      expect(mockState.callAPI).not.toHaveBeenCalled();
      expect(mockState.validateMptPAT).not.toHaveBeenCalled();
    });

    it("should call exitWithFailureMessage when API returns non-200 status", async () => {
      // Arrange
      const errorMessage = "The displayName should be 1-200 characters long.";
      const mockResponse = {
        status: 400,
        bodyAsText: JSON.stringify({
          error: {
            code: 400,
            message: errorMessage,
          },
        }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);
      mockState.extractErrorMessage.mockReturnValue(errorMessage);

      // Mock exitWithFailureMessage to throw an error so we can verify it was called
      mockState.exitWithFailureMessage.mockImplementation(() => {
        throw new Error("Exit with failure message");
      });

      // Act & Assert
      await expect(apiCall.patchTestRunAPI(mockPayload)).rejects.toThrow(
        "Exit with failure message",
      );

      // Verify extractErrorMessage was called with the response body
      expect(mockState.extractErrorMessage).toHaveBeenCalledWith(mockResponse.bodyAsText);

      // Verify exitWithFailureMessage was called with the correct message and error details
      expect(mockState.exitWithFailureMessage).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.FAILED_TO_CREATE_TEST_RUN,
        errorMessage,
      );
      expect(mockState.validateMptPAT).toHaveBeenCalledTimes(1);
    });

    it("should return empty object when response body is empty", async () => {
      // Arrange
      const mockResponse = {
        status: 200,
        bodyAsText: "",
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      // Act
      const result = await apiCall.patchTestRunAPI(mockPayload);

      // Assert
      expect(result).toEqual({});
      expect(mockState.callAPI).toHaveBeenCalledTimes(1);
      expect(mockState.validateMptPAT).toHaveBeenCalledTimes(1);
    });
  });
});
