// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  getTestRunApiUrl,
  getAccessToken,
  extractErrorMessage,
  exitWithFailureMessage,
} from "./utils.js";
import { HttpService } from "../common/httpService.js";
import { TestRunCreatePayload } from "../common/types.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { Constants } from "../common/constants.js";

/**
 * Makes a PATCH call to the Playwright workspaces Test Run API to create or update a test run.
 *
 * @param payload - The request payload (displayName, config, ciConfig, etc.).
 * @returns The parsed JSON response from the API.
 * @throws If the API call fails (non-2xx response).
 */
export class PlaywrightServiceApiCall {
  private httpService: HttpService;

  constructor(httpService?: HttpService) {
    this.httpService = httpService ?? new HttpService();
  }

  async patchTestRunAPI(payload: TestRunCreatePayload): Promise<any> {
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
      exitWithFailureMessage(ServiceErrorMessageConstants.FAILED_TO_CREATE_TEST_RUN, errorMessage);
    }
    console.log("Test run created successfully.");
    return response.bodyAsText ? JSON.parse(response.bodyAsText) : {};
  }
}
