// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LoadTestAdministrationContext as Client } from "./index.js";
import {
  Test,
  testSerializer,
  testDeserializer,
  TestFileInfo,
  testFileInfoDeserializer,
  TestAppComponents,
  testAppComponentsSerializer,
  testAppComponentsDeserializer,
  TestServerMetricsConfiguration,
  testServerMetricsConfigurationSerializer,
  testServerMetricsConfigurationDeserializer,
  _PagedTestFileInfo,
  _pagedTestFileInfoDeserializer,
  _PagedTest,
  _pagedTestDeserializer,
  triggerUnionSerializer,
  triggerUnionDeserializer,
  TriggerUnion,
  _PagedTrigger,
  _pagedTriggerDeserializer,
  notificationRuleUnionSerializer,
  notificationRuleUnionDeserializer,
  NotificationRuleUnion,
  _PagedNotificationRule,
  _pagedNotificationRuleDeserializer,
  OperationStatus,
  operationStatusDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationStatusSend(
  context: Client,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusDeserializer(result.body);
}

/** Get the status of a long running operation. */
export async function getOperationStatus(
  context: Client,
  operationId: string,
  options: GetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getOperationStatusSend(context, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _generateTestPlanRecommendationsSend(
  context: Client,
  testId: string,
  options: GenerateTestPlanRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}:generateTestPlanRecommendations{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _generateTestPlanRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<Test> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testDeserializer(result.body);
}

/** Generate AI Recommendations to author a load test plan using the uploaded browser recording file. */
export function generateTestPlanRecommendations(
  context: Client,
  testId: string,
  options: GenerateTestPlanRecommendationsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Test>, Test> {
  return getLongRunningPoller(
    context,
    _generateTestPlanRecommendationsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _generateTestPlanRecommendationsSend(context, testId, options),

      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<Test>, Test>;
}

export function _cloneTestSend(
  context: Client,
  testId: string,
  newTestId: string,
  options: CloneTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}:clone{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        newTestId: newTestId,
        displayName: options?.displayName,
        description: options?.description,
      },
    });
}

export async function _cloneTestDeserialize(result: PathUncheckedResponse): Promise<Test> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testDeserializer(result.body);
}

/** Clone the given test with optional overrides applied to the clone test. */
export function cloneTest(
  context: Client,
  testId: string,
  newTestId: string,
  options: CloneTestOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Test>, Test> {
  return getLongRunningPoller(context, _cloneTestDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cloneTestSend(context, testId, newTestId, options),

    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<Test>, Test>;
}

export function _listNotificationRuleSend(
  context: Client,
  options: ListNotificationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/notification-rules{?api%2Dversion,testIds,scopes,lastModifiedStartTime,lastModifiedEndTime,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      testIds: options?.testIds,
      scopes: options?.scopes,
      lastModifiedStartTime: !options?.lastModifiedStartTime
        ? options?.lastModifiedStartTime
        : options?.lastModifiedStartTime.toISOString(),
      lastModifiedEndTime: !options?.lastModifiedEndTime
        ? options?.lastModifiedEndTime
        : options?.lastModifiedEndTime.toISOString(),
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listNotificationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedNotificationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedNotificationRuleDeserializer(result.body);
}

/** Get all notification rules for the given filters. */
export function listNotificationRule(
  context: Client,
  options: ListNotificationRuleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NotificationRuleUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listNotificationRuleSend(context, options),
    _listNotificationRuleDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _getNotificationRuleSend(
  context: Client,
  notificationRuleId: string,
  options: GetNotificationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/notification-rules/{notificationRuleId}{?api%2Dversion}",
    {
      notificationRuleId: notificationRuleId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getNotificationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationRuleUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return notificationRuleUnionDeserializer(result.body);
}

/** Get notification rule details by notification rule Id. */
export async function getNotificationRule(
  context: Client,
  notificationRuleId: string,
  options: GetNotificationRuleOptionalParams = { requestOptions: {} },
): Promise<NotificationRuleUnion> {
  const result = await _getNotificationRuleSend(context, notificationRuleId, options);
  return _getNotificationRuleDeserialize(result);
}

export function _deleteNotificationRuleSend(
  context: Client,
  notificationRuleId: string,
  options: DeleteNotificationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/notification-rules/{notificationRuleId}{?api%2Dversion}",
    {
      notificationRuleId: notificationRuleId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteNotificationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a notification rule by its notification rule Id. */
export async function deleteNotificationRule(
  context: Client,
  notificationRuleId: string,
  options: DeleteNotificationRuleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNotificationRuleSend(context, notificationRuleId, options);
  return _deleteNotificationRuleDeserialize(result);
}

export function _createOrUpdateNotificationRuleSend(
  context: Client,
  notificationRuleId: string,
  body: NotificationRuleUnion,
  options: CreateOrUpdateNotificationRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/notification-rules/{notificationRuleId}{?api%2Dversion}",
    {
      notificationRuleId: notificationRuleId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: notificationRuleUnionSerializer(body),
    });
}

export async function _createOrUpdateNotificationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationRuleUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return notificationRuleUnionDeserializer(result.body);
}

/** Create a new notification rule or update an existing notification rule by providing the notification rule Id. */
export async function createOrUpdateNotificationRule(
  context: Client,
  notificationRuleId: string,
  body: NotificationRuleUnion,
  options: CreateOrUpdateNotificationRuleOptionalParams = { requestOptions: {} },
): Promise<NotificationRuleUnion> {
  const result = await _createOrUpdateNotificationRuleSend(
    context,
    notificationRuleId,
    body,
    options,
  );
  return _createOrUpdateNotificationRuleDeserialize(result);
}

export function _listTriggerSend(
  context: Client,
  options: ListTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/triggers{?api%2Dversion,testIds,states,lastModifiedStartTime,lastModifiedEndTime,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      testIds: options?.testIds,
      states: options?.states,
      lastModifiedStartTime: !options?.lastModifiedStartTime
        ? options?.lastModifiedStartTime
        : options?.lastModifiedStartTime.toISOString(),
      lastModifiedEndTime: !options?.lastModifiedEndTime
        ? options?.lastModifiedEndTime
        : options?.lastModifiedEndTime.toISOString(),
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTriggerDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedTrigger> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTriggerDeserializer(result.body);
}

/** Get all triggers for the given filters. */
export function listTrigger(
  context: Client,
  options: ListTriggerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggerUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listTriggerSend(context, options),
    _listTriggerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _getTriggerSend(
  context: Client,
  triggerId: string,
  options: GetTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/triggers/{triggerId}{?api%2Dversion}",
    {
      triggerId: triggerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTriggerDeserialize(result: PathUncheckedResponse): Promise<TriggerUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return triggerUnionDeserializer(result.body);
}

/** Get trigger details by trigger Id. */
export async function getTrigger(
  context: Client,
  triggerId: string,
  options: GetTriggerOptionalParams = { requestOptions: {} },
): Promise<TriggerUnion> {
  const result = await _getTriggerSend(context, triggerId, options);
  return _getTriggerDeserialize(result);
}

export function _deleteTriggerSend(
  context: Client,
  triggerId: string,
  options: DeleteTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/triggers/{triggerId}{?api%2Dversion}",
    {
      triggerId: triggerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTriggerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a trigger by its trigger Id. */
export async function deleteTrigger(
  context: Client,
  triggerId: string,
  options: DeleteTriggerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTriggerSend(context, triggerId, options);
  return _deleteTriggerDeserialize(result);
}

export function _createOrUpdateTriggerSend(
  context: Client,
  triggerId: string,
  body: TriggerUnion,
  options: CreateOrUpdateTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/triggers/{triggerId}{?api%2Dversion}",
    {
      triggerId: triggerId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: triggerUnionSerializer(body),
    });
}

export async function _createOrUpdateTriggerDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return triggerUnionDeserializer(result.body);
}

/** Create a new trigger or update an existing trigger by providing the trigger Id. */
export async function createOrUpdateTrigger(
  context: Client,
  triggerId: string,
  body: TriggerUnion,
  options: CreateOrUpdateTriggerOptionalParams = { requestOptions: {} },
): Promise<TriggerUnion> {
  const result = await _createOrUpdateTriggerSend(context, triggerId, body, options);
  return _createOrUpdateTriggerDeserialize(result);
}

export function _deleteTestSend(
  context: Client,
  testId: string,
  options: DeleteTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTestDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a test by its test Id. */
export async function deleteTest(
  context: Client,
  testId: string,
  options: DeleteTestOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTestSend(context, testId, options);
  return _deleteTestDeserialize(result);
}

export function _deleteTestFileSend(
  context: Client,
  testId: string,
  fileName: string,
  options: DeleteTestFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/files/{fileName}{?api%2Dversion}",
    {
      testId: testId,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTestFileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete file by the file name for a test */
export async function deleteTestFile(
  context: Client,
  testId: string,
  fileName: string,
  options: DeleteTestFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTestFileSend(context, testId, fileName, options);
  return _deleteTestFileDeserialize(result);
}

export function _uploadTestFileSend(
  context: Client,
  testId: string,
  fileName: string,
  body: Uint8Array,
  options: UploadTestFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/files/{fileName}{?api%2Dversion,fileType}",
    {
      testId: testId,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      fileType: options?.fileType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: body,
    });
}

export async function _uploadTestFileDeserialize(
  result: PathUncheckedResponse,
): Promise<TestFileInfo> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testFileInfoDeserializer(result.body);
}

/**
 * Upload input file for a given test Id. File size can't be more than 50 MB.
 * Existing file with same name for the given test will be overwritten. File
 * should be provided in the request body as application/octet-stream.
 */
export async function uploadTestFile(
  context: Client,
  testId: string,
  fileName: string,
  body: Uint8Array,
  options: UploadTestFileOptionalParams = { requestOptions: {} },
): Promise<TestFileInfo> {
  const result = await _uploadTestFileSend(context, testId, fileName, body, options);
  return _uploadTestFileDeserialize(result);
}

export function _listTestsSend(
  context: Client,
  options: ListTestsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests{?api%2Dversion,orderby,search,lastModifiedStartTime,lastModifiedEndTime,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      orderby: options?.orderby,
      search: options?.search,
      lastModifiedStartTime: !options?.lastModifiedStartTime
        ? options?.lastModifiedStartTime
        : options?.lastModifiedStartTime.toISOString(),
      lastModifiedEndTime: !options?.lastModifiedEndTime
        ? options?.lastModifiedEndTime
        : options?.lastModifiedEndTime.toISOString(),
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTestsDeserialize(result: PathUncheckedResponse): Promise<_PagedTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTestDeserializer(result.body);
}

/**
 * Get all load tests by the fully qualified resource Id e.g
 * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}.
 */
export function listTests(
  context: Client,
  options: ListTestsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Test> {
  return buildPagedAsyncIterator(
    context,
    () => _listTestsSend(context, options),
    _listTestsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listTestFilesSend(
  context: Client,
  testId: string,
  options: ListTestFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/files{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listTestFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedTestFileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedTestFileInfoDeserializer(result.body);
}

/** Get all test files. */
export function listTestFiles(
  context: Client,
  testId: string,
  options: ListTestFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TestFileInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listTestFilesSend(context, testId, options),
    _listTestFilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _getTestFileSend(
  context: Client,
  testId: string,
  fileName: string,
  options: GetTestFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/files/{fileName}{?api%2Dversion}",
    {
      testId: testId,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTestFileDeserialize(
  result: PathUncheckedResponse,
): Promise<TestFileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testFileInfoDeserializer(result.body);
}

/** Get all the files that are associated with a test. */
export async function getTestFile(
  context: Client,
  testId: string,
  fileName: string,
  options: GetTestFileOptionalParams = { requestOptions: {} },
): Promise<TestFileInfo> {
  const result = await _getTestFileSend(context, testId, fileName, options);
  return _getTestFileDeserialize(result);
}

export function _getTestSend(
  context: Client,
  testId: string,
  options: GetTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTestDeserialize(result: PathUncheckedResponse): Promise<Test> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testDeserializer(result.body);
}

/** Get load test details by test Id */
export async function getTest(
  context: Client,
  testId: string,
  options: GetTestOptionalParams = { requestOptions: {} },
): Promise<Test> {
  const result = await _getTestSend(context, testId, options);
  return _getTestDeserialize(result);
}

export function _getServerMetricsConfigSend(
  context: Client,
  testId: string,
  options: GetServerMetricsConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/server-metrics-config{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getServerMetricsConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<TestServerMetricsConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testServerMetricsConfigurationDeserializer(result.body);
}

/** List server metrics configuration for the given test. */
export async function getServerMetricsConfig(
  context: Client,
  testId: string,
  options: GetServerMetricsConfigOptionalParams = { requestOptions: {} },
): Promise<TestServerMetricsConfiguration> {
  const result = await _getServerMetricsConfigSend(context, testId, options);
  return _getServerMetricsConfigDeserialize(result);
}

export function _getAppComponentsSend(
  context: Client,
  testId: string,
  options: GetAppComponentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/app-components{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAppComponentsDeserialize(
  result: PathUncheckedResponse,
): Promise<TestAppComponents> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testAppComponentsDeserializer(result.body);
}

/** Get associated app component (collection of azure resources) for the given test. */
export async function getAppComponents(
  context: Client,
  testId: string,
  options: GetAppComponentsOptionalParams = { requestOptions: {} },
): Promise<TestAppComponents> {
  const result = await _getAppComponentsSend(context, testId, options);
  return _getAppComponentsDeserialize(result);
}

export function _createOrUpdateServerMetricsConfigSend(
  context: Client,
  testId: string,
  body: TestServerMetricsConfiguration,
  options: CreateOrUpdateServerMetricsConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/server-metrics-config{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: testServerMetricsConfigurationSerializer(body),
    });
}

export async function _createOrUpdateServerMetricsConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<TestServerMetricsConfiguration> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testServerMetricsConfigurationDeserializer(result.body);
}

/** Configure server metrics for a test */
export async function createOrUpdateServerMetricsConfig(
  context: Client,
  testId: string,
  body: TestServerMetricsConfiguration,
  options: CreateOrUpdateServerMetricsConfigOptionalParams = { requestOptions: {} },
): Promise<TestServerMetricsConfiguration> {
  const result = await _createOrUpdateServerMetricsConfigSend(context, testId, body, options);
  return _createOrUpdateServerMetricsConfigDeserialize(result);
}

export function _createOrUpdateAppComponentsSend(
  context: Client,
  testId: string,
  body: TestAppComponents,
  options: CreateOrUpdateAppComponentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}/app-components{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: testAppComponentsSerializer(body),
    });
}

export async function _createOrUpdateAppComponentsDeserialize(
  result: PathUncheckedResponse,
): Promise<TestAppComponents> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testAppComponentsDeserializer(result.body);
}

/** Add an app component to a test by providing the resource Id, name and type. */
export async function createOrUpdateAppComponents(
  context: Client,
  testId: string,
  body: TestAppComponents,
  options: CreateOrUpdateAppComponentsOptionalParams = { requestOptions: {} },
): Promise<TestAppComponents> {
  const result = await _createOrUpdateAppComponentsSend(context, testId, body, options);
  return _createOrUpdateAppComponentsDeserialize(result);
}

export function _createOrUpdateTestSend(
  context: Client,
  testId: string,
  body: Test,
  options: CreateOrUpdateTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tests/{testId}{?api%2Dversion}",
    {
      testId: testId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: testSerializer(body),
    });
}

export async function _createOrUpdateTestDeserialize(result: PathUncheckedResponse): Promise<Test> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return testDeserializer(result.body);
}

/** Create a new test or update an existing test by providing the test Id. */
export async function createOrUpdateTest(
  context: Client,
  testId: string,
  body: Test,
  options: CreateOrUpdateTestOptionalParams = { requestOptions: {} },
): Promise<Test> {
  const result = await _createOrUpdateTestSend(context, testId, body, options);
  return _createOrUpdateTestDeserialize(result);
}
