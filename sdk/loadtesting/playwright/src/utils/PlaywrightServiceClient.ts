// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  getTestRunApiUrl,
  getAccessToken,
  extractErrorMessage,
  getWorkspaceMetaDataApiUrl,
} from "./utils.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { HttpService } from "../common/httpService.js";
import { TestRunCreatePayload, WorkspaceMetaData, TenantInfo } from "../common/types.js";
import { Constants, InternalEnvironmentVariables, ArmConstants } from "../common/constants.js";

export class PlaywrightServiceClient {
  private httpService: HttpService;

  constructor(httpService?: HttpService) {
    this.httpService = httpService ?? new HttpService();
  }

  async createOrUpdateTestRun(payload: TestRunCreatePayload): Promise<void> {
    try {
      const baseUrl = getTestRunApiUrl();
      const token = getAccessToken();
      if (!token) {
        throw new Error("PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.");
      }
      const url = new URL(baseUrl);
      url.searchParams.set("api-version", Constants.LatestAPIVersion);
      const method = "PATCH";
      const data = JSON.stringify(payload);
      const contentType = "application/merge-patch+json";
      const correlationId = crypto.randomUUID();

      const response = await this.httpService.callAPI(
        method,
        url.toString(),
        data,
        token,
        contentType,
        correlationId,
      );

      if (response.status !== 200) {
        const errorMessage = extractErrorMessage(response?.bodyAsText ?? "");
        process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "false";
        console.error(
          ServiceErrorMessageConstants.TEST_RUN_CREATION_FAILED.formatWithErrorDetails(
            errorMessage || "Unknown error",
          ),
        );
        return;
      }

      console.log("Test run created successfully.");
      process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "true";
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred during test run creation";
      process.env[InternalEnvironmentVariables.TEST_RUN_CREATION_SUCCESS] = "false";
      console.error(
        ServiceErrorMessageConstants.TEST_RUN_CREATION_FAILED.formatWithErrorDetails(errorMessage),
      );
    }
  }

  async getWorkspaceMetadata(): Promise<WorkspaceMetaData> {
    try {
      const baseUrl = getWorkspaceMetaDataApiUrl();
      const token = getAccessToken();
      if (!token) {
        throw new Error("PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.");
      }
      const url = new URL(baseUrl);
      url.searchParams.set("api-version", Constants.LatestAPIVersion);
      const method = "GET";
      const correlationId = crypto.randomUUID();

      const response = await this.httpService.callAPI(
        method,
        url.toString(),
        null,
        token,
        "",
        correlationId,
      );

      if (response.status !== 200) {
        const errorMessage = extractErrorMessage(response?.bodyAsText ?? "");
        throw new Error(
          ServiceErrorMessageConstants.FAILED_TO_GET_WORKSPACE_METADATA.formatWithError(
            errorMessage || `HTTP ${response.status}: Failed to retrieve workspace details`,
          ),
        );
      }

      return response.bodyAsText ? JSON.parse(response.bodyAsText) : {};
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ServiceErrorMessageConstants.FAILED_TO_GET_WORKSPACE_METADATA.message);
    }
  }

  async getTenants(): Promise<TenantInfo[]> {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.");
      }
      const url = new URL(ArmConstants.TenantsApiUrl);
      url.searchParams.set("api-version", ArmConstants.TenantsApiVersion);
      const method = "GET";
      const correlationId = crypto.randomUUID();

      const response = await this.httpService.callAPI(
        method,
        url.toString(),
        null,
        token,
        "",
        correlationId,
      );
      if (response.status !== 200) {
        const errorMessage = extractErrorMessage(response?.bodyAsText ?? "");
        throw new Error(
          errorMessage || `HTTP ${response.status}: Failed to retrieve tenant information`,
        );
      }
      const responseBody = response.bodyAsText ? JSON.parse(response.bodyAsText) : {};
      return responseBody.value ?? [];
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to retrieve tenant information.");
    }
  }
}
