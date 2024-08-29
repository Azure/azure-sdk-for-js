// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FullResult } from "@playwright/test/reporter";
import { Constants } from "../common/constants";
import { EnvironmentVariables } from "../common/environmentVariables";
import { HttpService } from "../common/httpService";
import { Shard, UploadMetadata } from "../model/shard";
import { StorageUri } from "../model/storageUri";
import { TestResult } from "../model/testResult";
import { TestRun } from "../model/testRun";
import { CIInfo } from "./cIInfoProvider";
import ReporterUtils from "./reporterUtils";
import { PipelineResponse } from "@azure/core-rest-pipeline";

export class ServiceClient {
  private httpService: HttpService;
  private readonly envVariables: EnvironmentVariables;
  private readonly reporterUtils: ReporterUtils;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(envVariables: EnvironmentVariables, reporterUtils: ReporterUtils) {
    this.httpService = new HttpService();
    this.envVariables = envVariables;
    this.reporterUtils = reporterUtils;
  }

  async patchTestRun(ciInfo: CIInfo): Promise<TestRun | undefined> {
    const testRun = await this.reporterUtils.getTestRunObject(ciInfo);
    const response: PipelineResponse = await this.httpService.callAPI(
      "PATCH",
      `${this.getServiceEndpoint()}/${Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}/${this.envVariables.runId}?api-version=${Constants.API_VERSION}`,
      JSON.stringify(testRun),
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as TestRun;
    } else if (response.status === 409) {
      process.stdout.write(
        `\n${Constants.CONFLICT_409_ERROR_MESSAGE.replace("{runId}", this.envVariables.runId)}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.FORBIDDEN_403_ERROR_MESSAGE.replace(new RegExp("{workspaceId}", "g"), this.envVariables.accountId!)}`,
      );
    } else {
      throw new Error(`Received status ${response.status} from service from PATCH TestRun call.`);
    }
    return; // Not all code paths return a value (warning fix).
  }

  async getTestRun(): Promise<TestRun> {
    const response: PipelineResponse = await this.httpService.callAPI(
      "GET",
      `${this.getServiceEndpoint()}/${Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId!).concat(`/${this.envVariables.runId}?api-version=${Constants.API_VERSION}`)}`,
      null,
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as TestRun;
    }  else if (response.status === 400) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[400].getTestRun}`,
      );
    }  else if (response.status === 401) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[401].getTestRun}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[403].getTestRun}`,
      );
    } 
    throw new Error(`Received status ${response.status} from service from GET TestRun call.`);
    
  }

  async patchTestRunShardStart():  Promise<Shard> {
    const patchTestRunShardObject = this.reporterUtils.getTestRunShardStartObject();
    const response: PipelineResponse = await this.httpService.callAPI(
      "PATCH",
      `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId).replace("{shardId}", this.envVariables.shardId!)}/?api-version=${Constants.API_VERSION}`,
      JSON.stringify(patchTestRunShardObject),
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as Shard;
    }else if (response.status === 400) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[400].patchTestRunShardStart}`,
      );
    }  else if (response.status === 401) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[401].patchTestRunShardStart}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[403].patchTestRunShardStart}`,
      );
    }  
      throw new Error(
        `Received status ${response.status} from service from PATCH TestRun Shard Start call.`,
      );
    
  }

  async patchTestRunShardEnd(
    result: FullResult,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard: Shard,
    errorMessages: string[],
    attachmentMetadata: UploadMetadata,
  ): Promise<TestRun> {
    const patchTestRunShardObject = this.reporterUtils.getTestRunShardEndObject(
      result,
      shard,
      errorMessages,
      attachmentMetadata,
    );
    const response: PipelineResponse = await this.httpService.callAPI(
      "PATCH",
      `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId).replace("{shardId}", this.envVariables.shardId!)}/?api-version=${Constants.API_VERSION}`,
      JSON.stringify(patchTestRunShardObject),
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as TestRun;
    } else if (response.status === 400) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[400].patchTestRunShardEnd}`,
      );
    }  else if (response.status === 401) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[401].patchTestRunShardEnd}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[403].patchTestRunShardEnd}`,
      );
    } 
      throw new Error(
        `Received status ${response.status} from service from PATCH TestRun Shard End call.`,
      );
   
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  async postTestResults(testResults: TestResult[]): Promise<void> {
    const payload: any = {
      value: testResults,
    };
    const response: PipelineResponse = await this.httpService.callAPI(
      "POST",
      `${this.getServiceEndpoint()}/${Constants.testResultsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}?api-version=${Constants.API_VERSION}`,
      JSON.stringify(payload),
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return;
    }else if (response.status === 400) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[400].postTestResults}`,
      );
    }  else if (response.status === 401) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[401].postTestResults}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[403].postTestResults}`,
      );
    }   else {
      throw new Error(
        `Received status ${response.status} from service from POST TestResults call.`,
      );
    }
  }

  async getStorageUri(): Promise<StorageUri> {
    const response: PipelineResponse = await this.httpService.callAPI(
      "GET",
      `${this.getServiceEndpoint()}/${Constants.storageUriEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId)}?api-version=${Constants.API_VERSION}`,
      null,
      this.envVariables.accessToken,
      this.envVariables.correlationId!,
    );
    if (response.status === 200) {
      return JSON.parse(response.bodyAsText!) as StorageUri;
    }else if (response.status === 400) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[400].getStorageUri}`,
      );
    }  else if (response.status === 401) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[401].getStorageUri}`,
      );
    } else if (response.status === 403) {
      process.stdout.write(
        `\n${Constants.ERROR_MESSAGE[403].getStorageUri}`,
      );
    }  
      throw new Error(`Received status ${response.status} from service from GET StorageUri call.`);
  }

  private getServiceEndpoint(): string {
    return process.env["PLAYWRIGHT_SERVICE_REPORTING_URL"]!;
  }
}