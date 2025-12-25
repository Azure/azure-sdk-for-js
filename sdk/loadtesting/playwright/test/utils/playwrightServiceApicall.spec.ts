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
  getWorkspaceMetaDataApiUrl: vi.fn().mockReturnValue("https://example.com/workspace"),
  randomUUID: vi.fn().mockReturnValue("mock-uuid"),
  extractErrorMessage: vi.fn(),
};

// Mock modules using only inline function definitions to avoid hoisting issues
vi.mock("../../src/common/httpService.js", () => ({
  HttpService: vi.fn().mockImplementation(function (this: any) {
    this.callAPI = (...args: any[]) => mockState.callAPI(...args);
  }),
}));

vi.mock("../../src/utils/utils.js", () => ({
  getTestRunApiUrl: (...args: any[]) => mockState.getTestRunApiUrl(...args),
  getAccessToken: (...args: any[]) => mockState.getAccessToken(...args),
  exitWithFailureMessage: (...args: any[]) => mockState.exitWithFailureMessage(...args),
  extractErrorMessage: (...args: any[]) => mockState.extractErrorMessage(...args),
  getWorkspaceMetaDataApiUrl: (...args: any[]) => mockState.getWorkspaceMetaDataApiUrl(...args),
}));

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
    mockState.getWorkspaceMetaDataApiUrl.mockReturnValue("https://example.com/workspace");
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

    it("should exit with failure message when access token is not available", async () => {
      // Arrange
      mockState.getAccessToken.mockReturnValue(undefined);
      mockState.exitWithFailureMessage.mockImplementation(() => {
        throw new Error("Exit due to missing token");
      });

      // Act & Assert
      await expect(apiCall.patchTestRunAPI(mockPayload)).rejects.toThrow(
        "Exit due to missing token",
      );

      // Verify API was not called
      expect(mockState.callAPI).not.toHaveBeenCalled();
      expect(mockState.exitWithFailureMessage).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.FAILED_TO_CREATE_TEST_RUN,
        "PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.",
      );
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
    });
  });

  describe("getWorkspaceMetadata", () => {
    it("should call the API and return parsed response on success", async () => {
      const mockResponse = {
        status: 200,
        bodyAsText: JSON.stringify({ storageUri: "https://account.blob.core.windows.net" }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      const result = await apiCall.getWorkspaceMetadata();

      expect(mockState.getWorkspaceMetaDataApiUrl).toHaveBeenCalledTimes(1);
      expect(mockState.getAccessToken).toHaveBeenCalledTimes(1);
      expect(mockState.callAPI).toHaveBeenCalledWith(
        "GET",
        "https://example.com/workspace?api-version=" + Constants.LatestAPIVersion,
        null,
        "mock-token",
        "",
        "mock-uuid",
      );
      expect(result).toEqual({ storageUri: "https://account.blob.core.windows.net" });
    });

    it("should throw when access token is missing", async () => {
      mockState.getAccessToken.mockReturnValue(undefined);

      await expect(apiCall.getWorkspaceMetadata()).rejects.toThrow(
        "PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.",
      );

      expect(mockState.callAPI).not.toHaveBeenCalled();
    });

    it("should throw with detailed message when API call fails", async () => {
      const mockResponse = {
        status: 403,
        bodyAsText: JSON.stringify({ error: { message: "Forbidden" } }),
      };

      mockState.callAPI.mockResolvedValue(mockResponse);
      mockState.extractErrorMessage.mockReturnValue("Forbidden");

      await expect(apiCall.getWorkspaceMetadata()).rejects.toThrow("Forbidden");

      expect(mockState.extractErrorMessage).toHaveBeenCalledWith(mockResponse.bodyAsText);
    });
  });
});
