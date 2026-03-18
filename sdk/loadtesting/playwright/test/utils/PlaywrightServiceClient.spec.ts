// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PlaywrightServiceClient } from "../../src/utils/PlaywrightServiceClient.js";
import {
  Constants,
  InternalEnvironmentVariables,
  ArmConstants,
} from "../../src/common/constants.js";
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

describe("PlaywrightServiceClient", () => {
  let apiCall: PlaywrightServiceClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // Clean up environment variables
    delete process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS];
    apiCall = new PlaywrightServiceClient();
    // Reset mocks to their default values for each test
    mockState.getAccessToken.mockReturnValue("mock-token");
    mockState.getTestRunApiUrl.mockReturnValue("https://example.com/test-run");
    mockState.getWorkspaceMetaDataApiUrl.mockReturnValue("https://example.com/workspace");
    mockState.randomUUID.mockReturnValue("mock-uuid");
  });

  afterEach(() => {
    delete process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS];
  });

  describe("createOrUpdateTestRun", () => {
    const mockPayload = {
      displayName: "test-run",
      config: { testConfig: "test-config" },
      ciConfig: { ciInfo: "test-ci-info" },
    } as TestRunCreatePayload;

    it("should call the API with correct parameters and complete successfully", async () => {
      // Arrange
      const mockResponse = {
        status: 200,
        bodyAsText: JSON.stringify({ id: "test-id", name: "test-name" }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      // Act
      const result = await apiCall.createOrUpdateTestRun(mockPayload);

      // Assert
      expect(result).toBeUndefined();
      expect(process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS]).toBe("true");
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
    });

    it("should handle missing access token gracefully", async () => {
      // Arrange
      mockState.getAccessToken.mockReturnValue(undefined);
      const result = await apiCall.createOrUpdateTestRun(mockPayload);
      expect(result).toBeUndefined();
      expect(process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS]).toBe("false");
      expect(mockState.callAPI).not.toHaveBeenCalled();
    });

    it("should handle API non-200 status gracefully", async () => {
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

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      // Act
      const result = await apiCall.createOrUpdateTestRun(mockPayload);

      // Assert
      expect(result).toBeUndefined();
      expect(process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS]).toBe("false");
      expect(mockState.extractErrorMessage).toHaveBeenCalledWith(mockResponse.bodyAsText);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.TEST_RUN_CREATION_FAILED.formatWithErrorDetails(errorMessage),
      );
    });

    it("should complete successfully when response body is empty", async () => {
      // Arrange
      const mockResponse = {
        status: 200,
        bodyAsText: "",
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      // Act
      const result = await apiCall.createOrUpdateTestRun(mockPayload);

      // Assert
      expect(result).toBeUndefined();
      expect(process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS]).toBe("true");
      expect(mockState.callAPI).toHaveBeenCalledTimes(1);
    });

    it("should handle unexpected exceptions gracefully", async () => {
      // Arrange
      const errorMessage = "Network connection failed";
      mockState.callAPI.mockRejectedValue(new Error(errorMessage));
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      // Act
      const result = await apiCall.createOrUpdateTestRun(mockPayload);

      // Assert
      expect(result).toBeUndefined();
      expect(process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS]).toBe("false");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        ServiceErrorMessageConstants.TEST_RUN_CREATION_FAILED.formatWithErrorDetails(errorMessage),
      );
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

  describe("getTenants", () => {
    it("should call the ARM tenants API and return parsed tenant list", async () => {
      const tenantList = [
        { tenantId: "tenant-1", defaultDomain: "contoso.onmicrosoft.com" },
        { tenantId: "tenant-2", defaultDomain: "fabrikam.onmicrosoft.com" },
      ];
      const mockResponse = {
        status: 200,
        bodyAsText: JSON.stringify({ value: tenantList }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      const result = await apiCall.getTenants();

      expect(mockState.getAccessToken).toHaveBeenCalledTimes(1);
      expect(mockState.callAPI).toHaveBeenCalledWith(
        "GET",
        `${ArmConstants.TenantsApiUrl}?api-version=${ArmConstants.TenantsApiVersion}`,
        null,
        "mock-token",
        "",
        "mock-uuid",
      );
      expect(result).toEqual(tenantList);
    });

    it("should throw when access token is missing", async () => {
      mockState.getAccessToken.mockReturnValue(undefined);

      await expect(apiCall.getTenants()).rejects.toThrow(
        "PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.",
      );

      expect(mockState.callAPI).not.toHaveBeenCalled();
    });

    it("should throw with error message when API returns non-200 status", async () => {
      const mockResponse = {
        status: 403,
        bodyAsText: JSON.stringify({ error: { message: "Forbidden" } }),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);
      mockState.extractErrorMessage.mockReturnValue("Forbidden");

      await expect(apiCall.getTenants()).rejects.toThrow("Forbidden");
      expect(mockState.extractErrorMessage).toHaveBeenCalledWith(mockResponse.bodyAsText);
    });

    it("should return empty array when response body has no value", async () => {
      const mockResponse = {
        status: 200,
        bodyAsText: JSON.stringify({}),
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      const result = await apiCall.getTenants();
      expect(result).toEqual([]);
    });

    it("should return empty array when response body is empty", async () => {
      const mockResponse = {
        status: 200,
        bodyAsText: "",
      };
      mockState.callAPI.mockResolvedValue(mockResponse);

      const result = await apiCall.getTenants();
      expect(result).toEqual([]);
    });
  });
});
