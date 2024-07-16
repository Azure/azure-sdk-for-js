// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FullResult } from "@playwright/test/reporter";
import { AxiosResponse } from "axios";
import Debug from "debug";
import { backOff } from "exponential-backoff";
import { Constants } from "../common/constants";
import { EnvironmentVariables } from "../common/environmentVariables";
import { HttpService } from "../common/httpService";
import { Shard, UploadMetadata } from "../model/shard";
import { StorageUri } from "../model/storageUri";
import { TestResult } from "../model/testResult";
import { TestRun } from "../model/testRun";
import { CIInfo } from "./cIInfoProvider";
import ReporterUtils from "./reporterUtils";

const debug = Debug(Constants.DEBUG_NAMESPACE);

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

  async patchTestRun(ciInfo: CIInfo): Promise<TestRun> {
    const testRun = await this.reporterUtils.getTestRunObject(ciInfo);
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "PATCH",
          `${this.getServiceEndpoint()}/${Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}/${this.envVariables.runId}?api-version=${Constants.API_VERSION}`,
          JSON.stringify(testRun),
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            `Received status ${response.status} from service from PATCH TestRun call.`,
          );
        }
      } catch (err: any) {
        debug(`\nError in PATCH TestRun call: ${err.message}.`);
        if (err.response.status === 409) {
          process.stdout.write(
            `\n${Constants.CONFLICT_409_ERROR_MESSAGE.replace("{runId}", this.envVariables.runId)}.`,
          );
        } else if (err.response.status === 403) {
          process.stdout.write(
            `\n${Constants.FORBIDDEN_403_ERROR_MESSAGE.replaceAll("{workspaceId}", this.envVariables.accountId!)}.`,
          );
        }
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  async getTestRun(): Promise<TestRun> {
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "GET",
          `${this.getServiceEndpoint()}/${Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId!).concat(`/${this.envVariables.runId}?api-version=${Constants.API_VERSION}`)}`,
          null,
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(`Received status ${response.status} from service from GET TestRun call.`);
        }
      } catch (err: any) {
        debug(`\nError in GET TestRun call: ${err.message}.`);
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  async patchTestRunShardStart(): Promise<Shard> {
    const patchTestRunShardObject = this.reporterUtils.getTestRunShardStartObject();
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "PATCH",
          `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId).replace("{shardId}", this.envVariables.shardId!)}/?api-version=${Constants.API_VERSION}`,
          JSON.stringify(patchTestRunShardObject),
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            `Received status ${response.status} from service from PATCH TestRun Shard Start call.`,
          );
        }
      } catch (err: any) {
        debug(`\nError in PATCH TestRun shard Start call: ${err.message}.`);
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
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
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "PATCH",
          `${this.getServiceEndpoint()}/${Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId).replace("{shardId}", this.envVariables.shardId!)}/?api-version=${Constants.API_VERSION}`,
          JSON.stringify(patchTestRunShardObject),
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            `Received status ${response.status} from service from PATCH TestRun Shard End call.`,
          );
        }
      } catch (err: any) {
        debug(`\nError in PATCH TestRun shard End call: ${err.message}.`);
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  async postTestResults(testResults: TestResult[]): Promise<void> {
    const payload: any = {
      value: testResults,
    };
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "POST",
          `${this.getServiceEndpoint()}/${Constants.testResultsEndpoint.replace("{workspaceId}", this.envVariables.accountId!)}?api-version=${Constants.API_VERSION}`,
          JSON.stringify(payload),
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return;
        } else {
          throw new Error(
            `Received status ${response.status} from service from POST TestResults call.`,
          );
        }
      } catch (err: any) {
        debug(`\nError in POST TestResults call: ${err.message}.`);
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  async getStorageUri(): Promise<StorageUri> {
    return backOff(async () => {
      try {
        const response: AxiosResponse = await this.httpService.callAPI(
          "GET",
          `${this.getServiceEndpoint()}/${Constants.storageUriEndpoint.replace("{workspaceId}", this.envVariables.accountId!).replace("{testRunId}", this.envVariables.runId)}?api-version=${Constants.API_VERSION}`,
          null,
          this.envVariables.accessToken,
          this.envVariables.correlationId!,
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(
            `Received status ${response.status} from service from GET StorageUri call.`,
          );
        }
      } catch (err: any) {
        debug(`\nError in GET StorageUri call: ${err.message}.`);
        throw err;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  private getServiceEndpoint(): string {
    return process.env["PLAYWRIGHT_SERVICE_REPORTING_URL"]!;
  }
}
