// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  LoadTestAdministrationContext,
  LoadTestAdministrationClientOptionalParams,
  createLoadTestAdministration,
} from "./api/index.js";
import {
  Test,
  TestFileInfo,
  TestAppComponents,
  TestServerMetricsConfiguration,
  TriggerUnion,
  NotificationRuleUnion,
  OperationStatus,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  getOperationStatus,
  generateTestPlanRecommendations,
  cloneTest,
  listNotificationRule,
  getNotificationRule,
  deleteNotificationRule,
  createOrUpdateNotificationRule,
  listTrigger,
  getTrigger,
  deleteTrigger,
  createOrUpdateTrigger,
  deleteTest,
  deleteTestFile,
  uploadTestFile,
  listTests,
  listTestFiles,
  getTestFile,
  getTest,
  getServerMetricsConfig,
  getAppComponents,
  createOrUpdateServerMetricsConfig,
  createOrUpdateAppComponents,
  createOrUpdateTest,
} from "./api/operations.js";
import {
  GetOperationStatusOptionalParams,
  GenerateTestPlanRecommendationsOptionalParams,
  CloneTestOptionalParams,
  ListNotificationRuleOptionalParams,
  GetNotificationRuleOptionalParams,
  DeleteNotificationRuleOptionalParams,
  CreateOrUpdateNotificationRuleOptionalParams,
  ListTriggerOptionalParams,
  GetTriggerOptionalParams,
  DeleteTriggerOptionalParams,
  CreateOrUpdateTriggerOptionalParams,
  DeleteTestOptionalParams,
  DeleteTestFileOptionalParams,
  UploadTestFileOptionalParams,
  ListTestsOptionalParams,
  ListTestFilesOptionalParams,
  GetTestFileOptionalParams,
  GetTestOptionalParams,
  GetServerMetricsConfigOptionalParams,
  GetAppComponentsOptionalParams,
  CreateOrUpdateServerMetricsConfigOptionalParams,
  CreateOrUpdateAppComponentsOptionalParams,
  CreateOrUpdateTestOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { LoadTestAdministrationClientOptionalParams } from "./api/loadTestAdministrationContext.js";

export class LoadTestAdministrationClient {
  private _client: LoadTestAdministrationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: LoadTestAdministrationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createLoadTestAdministration(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Get the status of a long running operation. */
  getOperationStatus(
    operationId: string,
    options: GetOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<OperationStatus> {
    return getOperationStatus(this._client, operationId, options);
  }

  /** Generate AI Recommendations to author a load test plan using the uploaded browser recording file. */
  generateTestPlanRecommendations(
    testId: string,
    options: GenerateTestPlanRecommendationsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<Test>, Test> {
    return generateTestPlanRecommendations(this._client, testId, options);
  }

  /** Clone the given test with optional overrides applied to the clone test. */
  cloneTest(
    testId: string,
    newTestId: string,
    options: CloneTestOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<Test>, Test> {
    return cloneTest(this._client, testId, newTestId, options);
  }

  /** Get all notification rules for the given filters. */
  listNotificationRule(
    options: ListNotificationRuleOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<NotificationRuleUnion> {
    return listNotificationRule(this._client, options);
  }

  /** Get notification rule details by notification rule Id. */
  getNotificationRule(
    notificationRuleId: string,
    options: GetNotificationRuleOptionalParams = { requestOptions: {} },
  ): Promise<NotificationRuleUnion> {
    return getNotificationRule(this._client, notificationRuleId, options);
  }

  /** Delete a notification rule by its notification rule Id. */
  deleteNotificationRule(
    notificationRuleId: string,
    options: DeleteNotificationRuleOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteNotificationRule(this._client, notificationRuleId, options);
  }

  /** Create a new notification rule or update an existing notification rule by providing the notification rule Id. */
  createOrUpdateNotificationRule(
    notificationRuleId: string,
    body: NotificationRuleUnion,
    options: CreateOrUpdateNotificationRuleOptionalParams = { requestOptions: {} },
  ): Promise<NotificationRuleUnion> {
    return createOrUpdateNotificationRule(this._client, notificationRuleId, body, options);
  }

  /** Get all triggers for the given filters. */
  listTrigger(
    options: ListTriggerOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TriggerUnion> {
    return listTrigger(this._client, options);
  }

  /** Get trigger details by trigger Id. */
  getTrigger(
    triggerId: string,
    options: GetTriggerOptionalParams = { requestOptions: {} },
  ): Promise<TriggerUnion> {
    return getTrigger(this._client, triggerId, options);
  }

  /** Delete a trigger by its trigger Id. */
  deleteTrigger(
    triggerId: string,
    options: DeleteTriggerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTrigger(this._client, triggerId, options);
  }

  /** Create a new trigger or update an existing trigger by providing the trigger Id. */
  createOrUpdateTrigger(
    triggerId: string,
    body: TriggerUnion,
    options: CreateOrUpdateTriggerOptionalParams = { requestOptions: {} },
  ): Promise<TriggerUnion> {
    return createOrUpdateTrigger(this._client, triggerId, body, options);
  }

  /** Delete a test by its test Id. */
  deleteTest(
    testId: string,
    options: DeleteTestOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTest(this._client, testId, options);
  }

  /** Delete file by the file name for a test */
  deleteTestFile(
    testId: string,
    fileName: string,
    options: DeleteTestFileOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTestFile(this._client, testId, fileName, options);
  }

  /**
   * Upload input file for a given test Id. File size can't be more than 50 MB.
   * Existing file with same name for the given test will be overwritten. File
   * should be provided in the request body as application/octet-stream.
   */
  uploadTestFile(
    testId: string,
    fileName: string,
    body: Uint8Array,
    options: UploadTestFileOptionalParams = { requestOptions: {} },
  ): Promise<TestFileInfo> {
    return uploadTestFile(this._client, testId, fileName, body, options);
  }

  /**
   * Get all load tests by the fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}.
   */
  listTests(
    options: ListTestsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Test> {
    return listTests(this._client, options);
  }

  /** Get all test files. */
  listTestFiles(
    testId: string,
    options: ListTestFilesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TestFileInfo> {
    return listTestFiles(this._client, testId, options);
  }

  /** Get all the files that are associated with a test. */
  getTestFile(
    testId: string,
    fileName: string,
    options: GetTestFileOptionalParams = { requestOptions: {} },
  ): Promise<TestFileInfo> {
    return getTestFile(this._client, testId, fileName, options);
  }

  /** Get load test details by test Id */
  getTest(testId: string, options: GetTestOptionalParams = { requestOptions: {} }): Promise<Test> {
    return getTest(this._client, testId, options);
  }

  /** List server metrics configuration for the given test. */
  getServerMetricsConfig(
    testId: string,
    options: GetServerMetricsConfigOptionalParams = { requestOptions: {} },
  ): Promise<TestServerMetricsConfiguration> {
    return getServerMetricsConfig(this._client, testId, options);
  }

  /** Get associated app component (collection of azure resources) for the given test. */
  getAppComponents(
    testId: string,
    options: GetAppComponentsOptionalParams = { requestOptions: {} },
  ): Promise<TestAppComponents> {
    return getAppComponents(this._client, testId, options);
  }

  /** Configure server metrics for a test */
  createOrUpdateServerMetricsConfig(
    testId: string,
    body: TestServerMetricsConfiguration,
    options: CreateOrUpdateServerMetricsConfigOptionalParams = { requestOptions: {} },
  ): Promise<TestServerMetricsConfiguration> {
    return createOrUpdateServerMetricsConfig(this._client, testId, body, options);
  }

  /** Add an app component to a test by providing the resource Id, name and type. */
  createOrUpdateAppComponents(
    testId: string,
    body: TestAppComponents,
    options: CreateOrUpdateAppComponentsOptionalParams = { requestOptions: {} },
  ): Promise<TestAppComponents> {
    return createOrUpdateAppComponents(this._client, testId, body, options);
  }

  /** Create a new test or update an existing test by providing the test Id. */
  createOrUpdateTest(
    testId: string,
    body: Test,
    options: CreateOrUpdateTestOptionalParams = { requestOptions: {} },
  ): Promise<Test> {
    return createOrUpdateTest(this._client, testId, body, options);
  }
}
