// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getTestRunApiUrl } from "./utils.js";
import { HttpService } from "../common/httpService.js";
import { TestRunCreatePayload } from "../common/types.js";

/**
 * Makes a PATCH call to the Playwright Service Test Run API to create or update a test run.
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
    const apiVersion = "2024-09-01-preview";
    const token = process.env["PLAYWRIGHT_SERVICE_ACCESS_TOKEN"];
    if (!token) {
      throw new Error("PLAYWRIGHT_SERVICE_ACCESS_TOKEN environment variable is not set.");
    }

    const url = `${baseUrl}?api-version=${apiVersion}`;
    const method = "PATCH";
    const data = JSON.stringify(payload);
    const contentType = "application/json";
    const correlationId = crypto.randomUUID();

    const response = await this.httpService.callAPI(
      method,
      url,
      data,
      token,
      contentType,
      correlationId,
    );
    if (response.status < 200 || response.status >= 300) {
      const errorText = response.bodyAsText ?? "";
      throw new Error(`Failed to create/update test run: ${response.status} - ${errorText}`);
    }
    return response.bodyAsText ? JSON.parse(response.bodyAsText) : {};
  }
}
