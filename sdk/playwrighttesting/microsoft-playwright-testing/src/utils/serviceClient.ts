// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FullResult } from "@playwright/test/reporter";
import { Constants, InternalEnvironmentVariables } from "../common/constants.js";
import type { EnvironmentVariables } from "../common/environmentVariables.js";
import { HttpService } from "../common/httpService.js";
import type { Shard, UploadMetadata } from "../model/shard.js";
import type { StorageUri } from "../model/storageUri.js";
import type { TestResult } from "../model/testResult.js";
import type { TestRun } from "../model/testRun.js";
import type { CIInfo } from "./cIInfoProvider.js";
import type ReporterUtils from "./reporterUtils.js";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { reporterLogger } from "../common/logger.js";

export class ServiceClient {
  private httpService: HttpService;
  private readonly envVariables: EnvironmentVariables;
  private readonly reporterUtils: ReporterUtils;
  private readonly addInformationalMessage: (errorMessage: string) => void;
  private isInformationMessagePresent: (key: string) => boolean;
  private addKeyToInformationMessage: (key: string) => void;
  constructor(
    /* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */
    envVariables: EnvironmentVariables,
    reporterUtils: ReporterUtils,
    /* eslint-enable @azure/azure-sdk/ts-use-interface-parameters */
    addErrorInformation: (errorMessage: string) => void,
    isInformationMessagePresent: (key: string) => boolean,
    addKeyToInformationMessage: (key: string) => void,
  ) {
    this.httpService = new HttpService();
    this.envVariables = envVariables;
    this.reporterUtils = reporterUtils;
    this.addInformationalMessage = addErrorInformation;
    this.isInformationMessagePresent = isInformationMessagePresent;
    this.addKeyToInformationMessage = addKeyToInformationMessage;
  }

  async patchTestRun(ciInfo: CIInfo): Promise<TestRun> {
    const testRun = await this.reporterUtils.getTestRunObject(ciInfo);

    // Escape the runId to avoid issues with special characters
    const escapedRunId = encodeURIComponent(this.envVariables.runId!);
    const response: PipelineResponse = await this.httpService.callAPI(
      "PATCH",
      `${this.getServiceEndpoint()}/${Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}/${escapedRunId}?api-version=${Constants.API_VERSION}`,
      JSON.stringify(testRun),
      this.envVariables.accessToken,
      "application/merge-patch+json",
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as TestRun;
    } else if (response.status === 409) {
      const errorMessage = Constants.CONFLICT_409_ERROR_MESSAGE.replace(
        "{runId}",
        this.envVariables.runId,
      );
      this.addInformationalMessage(errorMessage);
      process.stdout.write(`\n${errorMessage}`);
    } else if (response.status === 403) {
      const errorMessage = Constants.FORBIDDEN_403_ERROR_MESSAGE.replace(
        new RegExp("{workspaceId}", "g"),
        this.envVariables.accountId!,
      );
      this.addInformationalMessage(errorMessage);
      process.stdout.write(`\n${errorMessage}`);
    } else {
      this.handleErrorResponse(response, Constants.patchTestRun);
    }
    throw new Error(`Received status ${response.status} from service from PATCH TestRun call.`);
  }

  async postTestRunShardStart(): Promise<Shard> {
    const postTestRunShardObject = this.reporterUtils.getTestRunShardStartObject();
    const escapedRunId = encodeURIComponent(this.envVariables.runId!);
    const response: PipelineResponse = await this.httpService.callAPI(
      "POST",
      `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", escapedRunId)}/?api-version=${Constants.API_VERSION}`,
      JSON.stringify(postTestRunShardObject),
      this.envVariables.accessToken,
      "application/json",
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as Shard;
    }
    this.handleErrorResponse(response, Constants.patchTestRunShardStart);

    throw new Error(
      `Received status ${response.status} from service from PATCH TestRun Shard Start call.`,
    );
  }

  async postTestRunShardEnd(
    result: FullResult,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard: Shard,
    errorMessages: string[],
    attachmentMetadata: UploadMetadata,
    workers: number,
  ): Promise<TestRun> {
    const postTestRunShardObject = this.reporterUtils.getTestRunShardEndObject(
      result,
      shard,
      errorMessages,
      attachmentMetadata,
      workers,
    );
    const escapedRunId = encodeURIComponent(this.envVariables.runId!);
    const response: PipelineResponse = await this.httpService.callAPI(
      "POST",
      `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", escapedRunId)}/?api-version=${Constants.API_VERSION}`,
      JSON.stringify(postTestRunShardObject),
      this.envVariables.accessToken,
      "application/json",
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as TestRun;
    }
    this.handleErrorResponse(response, Constants.patchTestRunShardEnd);

    throw new Error(
      `Received status ${response.status} from service from PATCH TestRun Shard End call.`,
    );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  async postTestResults(testResults: TestResult[]): Promise<void> {
    try {
      const payload: any = {
        value: testResults,
      };
      const response: PipelineResponse = await this.httpService.callAPI(
        "POST",
        `${this.getServiceEndpoint()}/${Constants.testResultsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}?api-version=${Constants.API_VERSION}`,
        JSON.stringify(payload),
        this.envVariables.accessToken,
        "application/json",
        this.envVariables.correlationId!,
      );
      if (response.status === 200) {
        return;
      }
      this.handleErrorResponse(response, Constants.postTestResults);
    } catch (error) {
      reporterLogger.error(`Error occurred while posting test results: ${error}`);
    }
  }

  async createStorageUri(): Promise<StorageUri> {
    const escapedRunId = encodeURIComponent(this.envVariables.runId!);
    const response: PipelineResponse = await this.httpService.callAPI(
      "POST",
      `${this.getServiceEndpoint()}/${Constants.storageUriEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", escapedRunId)}?api-version=${Constants.API_VERSION}`,
      null,
      this.envVariables.accessToken,
      "application/json",
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as StorageUri;
    }
    this.handleErrorResponse(response, Constants.getStorageUri);

    throw new Error(`Received status ${response.status} from service from GET StorageUri call.`);
  }

  private getServiceEndpoint(): string {
    return process.env[InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL]!;
  }

  private handleErrorResponse(response: PipelineResponse, action: string): void {
    const statusCode = response.status;
    const errorMessage = Constants.ERROR_MESSAGE[action]?.[statusCode] ?? "Unknown error occured.";
    if (!this.isInformationMessagePresent(statusCode.toString())) {
      this.addKeyToInformationMessage(statusCode.toString());
      this.addInformationalMessage(errorMessage);
    }
    process.stdout.write(`${errorMessage}\n`);
  }
}
