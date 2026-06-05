// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ArmResponseErrorResponse,
  armResponseErrorResponseDeserializer,
  UpdateRecoveryResourcesRequest,
  updateRecoveryResourcesRequestSerializer,
  UpdateRecoveryResourcesResponse,
  updateRecoveryResourcesResponseDeserializer,
  ValidateForOperationRequest,
  validateForOperationRequestSerializer,
  FailoverRequest,
  failoverRequestSerializer,
  ValidateForRecoveryOperationBaseResponse,
  validateForRecoveryOperationBaseResponseDeserializer,
  reprotectRequestSerializer,
  RecoveryPlanActionBaseResponse,
  recoveryPlanActionBaseResponseDeserializer,
  TestFailoverCleanupRequest,
  testFailoverCleanupRequestSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecoveryPlanActionsTestFailoverCleanupOptionalParams,
  RecoveryPlanActionsTestFailoverOptionalParams,
  RecoveryPlanActionsReprotectOptionalParams,
  RecoveryPlanActionsFailoverCommitOptionalParams,
  RecoveryPlanActionsFailoverOptionalParams,
  RecoveryPlanActionsCheckReadinessOptionalParams,
  RecoveryPlanActionsValidateForReprotectOptionalParams,
  RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
  RecoveryPlanActionsValidateForTestFailoverOptionalParams,
  RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
  RecoveryPlanActionsValidateForFailoverOptionalParams,
  RecoveryPlanActionsValidateForOperationOptionalParams,
  RecoveryPlanActionsUpdateResourcesOptionalParams,
  RecoveryPlanActionsFinalizeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _testFailoverCleanupSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: TestFailoverCleanupRequest,
  options: RecoveryPlanActionsTestFailoverCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/testFailoverCleanup{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: testFailoverCleanupRequestSerializer(body),
  });
}

export async function _testFailoverCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlanActionBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryPlanActionBaseResponseDeserializer(result.body);
}

/** This action triggers the test failover cleanup operation on the recovery orchestration plan for the qualified resources. */
export function testFailoverCleanup(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: TestFailoverCleanupRequest,
  options: RecoveryPlanActionsTestFailoverCleanupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse> {
  return getLongRunningPoller(context, _testFailoverCleanupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverCleanupSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
}

export function _testFailoverSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsTestFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/testFailover{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: failoverRequestSerializer(body),
  });
}

export async function _testFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlanActionBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryPlanActionBaseResponseDeserializer(result.body);
}

/** This action triggers the test failover operation on the recovery orchestration plan for the qualified resources. */
export function testFailover(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsTestFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse> {
  return getLongRunningPoller(context, _testFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverSend(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
}

export function _reprotectSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsReprotectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/reprotect{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options?.body ? options?.body : reprotectRequestSerializer(options?.body),
  });
}

export async function _reprotectDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlanActionBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryPlanActionBaseResponseDeserializer(result.body);
}

/** This action triggers the reprotect operation on the recovery orchestration plan for the qualified resources. */
export function reprotect(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsReprotectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse> {
  return getLongRunningPoller(context, _reprotectDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reprotectSend(context, serviceGroupName, operationId, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
}

export function _failoverCommitSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsFailoverCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/failoverCommit{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _failoverCommitDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlanActionBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryPlanActionBaseResponseDeserializer(result.body);
}

/** This action triggers the failover commit operation on the recovery orchestration plan for the qualified resources. */
export function failoverCommit(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsFailoverCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse> {
  return getLongRunningPoller(context, _failoverCommitDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCommitSend(context, serviceGroupName, operationId, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
}

export function _failoverSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/failover{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: failoverRequestSerializer(body),
  });
}

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlanActionBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryPlanActionBaseResponseDeserializer(result.body);
}

/** This action triggers the failover operation on the recovery orchestration plan for the qualified resources. */
export function failover(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse> {
  return getLongRunningPoller(context, _failoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
}

export function _checkReadinessSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsCheckReadinessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/checkReadiness{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _checkReadinessDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** This action performs the necessary readiness check on the recovery orchestration plan to ensure it is in the desired state and eligible for all recovery actions, including all protected resources. */
export function checkReadiness(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsCheckReadinessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _checkReadinessDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _checkReadinessSend(context, serviceGroupName, operationId, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _validateForReprotectSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForReprotectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForReprotect{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options?.body ? options?.body : reprotectRequestSerializer(options?.body),
  });
}

export async function _validateForReprotectDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateForRecoveryOperationBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateForRecoveryOperationBaseResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for reprotect operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
export function validateForReprotect(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForReprotectOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ValidateForRecoveryOperationBaseResponse>,
  ValidateForRecoveryOperationBaseResponse
> {
  return getLongRunningPoller(context, _validateForReprotectDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForReprotectSend(context, serviceGroupName, operationId, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
}

export function _validateForTestFailoverCleanupSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForTestFailoverCleanup{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _validateForTestFailoverCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateForRecoveryOperationBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateForRecoveryOperationBaseResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for test failover cleanup operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
export function validateForTestFailoverCleanup(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ValidateForRecoveryOperationBaseResponse>,
  ValidateForRecoveryOperationBaseResponse
> {
  return getLongRunningPoller(
    context,
    _validateForTestFailoverCleanupDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateForTestFailoverCleanupSend(
          context,
          serviceGroupName,
          operationId,
          recoveryPlanName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  ) as PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
}

export function _validateForTestFailoverSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsValidateForTestFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForTestFailover{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: failoverRequestSerializer(body),
  });
}

export async function _validateForTestFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateForRecoveryOperationBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateForRecoveryOperationBaseResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for test failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
export function validateForTestFailover(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsValidateForTestFailoverOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ValidateForRecoveryOperationBaseResponse>,
  ValidateForRecoveryOperationBaseResponse
> {
  return getLongRunningPoller(context, _validateForTestFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForTestFailoverSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
}

export function _validateForFailoverCommitSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForFailoverCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForFailoverCommit{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _validateForFailoverCommitDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateForRecoveryOperationBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateForRecoveryOperationBaseResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for failover commit operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
export function validateForFailoverCommit(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsValidateForFailoverCommitOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ValidateForRecoveryOperationBaseResponse>,
  ValidateForRecoveryOperationBaseResponse
> {
  return getLongRunningPoller(
    context,
    _validateForFailoverCommitDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateForFailoverCommitSend(
          context,
          serviceGroupName,
          operationId,
          recoveryPlanName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  ) as PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
}

export function _validateForFailoverSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsValidateForFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForFailover{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: failoverRequestSerializer(body),
  });
}

export async function _validateForFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateForRecoveryOperationBaseResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateForRecoveryOperationBaseResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
export function validateForFailover(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: FailoverRequest,
  options: RecoveryPlanActionsValidateForFailoverOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ValidateForRecoveryOperationBaseResponse>,
  ValidateForRecoveryOperationBaseResponse
> {
  return getLongRunningPoller(context, _validateForFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForFailoverSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
}

export function _validateForOperationSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: ValidateForOperationRequest,
  options: RecoveryPlanActionsValidateForOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForOperation{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
    body: validateForOperationRequestSerializer(body),
  });
}

export async function _validateForOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmResponseErrorResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 200) {
      error.details = errorResponseDeserializer(result.body);
    } else {
      error.details = errorResponseDeserializer(result.body);
    }
    throw error;
  }

  return armResponseErrorResponseDeserializer(result.body);
}

/** This action checks if the recovery orchestration plan is eligible for operations like failover and reprotect, ensuring it meets the necessary criteria. */
export function validateForOperation(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: ValidateForOperationRequest,
  options: RecoveryPlanActionsValidateForOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse> {
  return getLongRunningPoller(context, _validateForOperationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForOperationSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
}

export function _updateResourcesSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: UpdateRecoveryResourcesRequest,
  options: RecoveryPlanActionsUpdateResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/updateResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateRecoveryResourcesRequestSerializer(body),
  });
}

export async function _updateResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateRecoveryResourcesResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return updateRecoveryResourcesResponseDeserializer(result.body);
}

/** This action adds or updates the resources to be included in the recovery orchestration plan. */
export function updateResources(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  body: UpdateRecoveryResourcesRequest,
  options: RecoveryPlanActionsUpdateResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateRecoveryResourcesResponse>, UpdateRecoveryResourcesResponse> {
  return getLongRunningPoller(context, _updateResourcesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateResourcesSend(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<
    OperationState<UpdateRecoveryResourcesResponse>,
    UpdateRecoveryResourcesResponse
  >;
}

export function _finalizeSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsFinalizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/finalize{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
  });
}

export async function _finalizeDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmResponseErrorResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 200) {
      error.details = errorResponseDeserializer(result.body);
    } else {
      error.details = errorResponseDeserializer(result.body);
    }
    throw error;
  }

  return armResponseErrorResponseDeserializer(result.body);
}

/** This action finalizes the recovery orchestration plan, ensuring all necessary configurations are in place. */
export function finalize(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  options: RecoveryPlanActionsFinalizeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse> {
  return getLongRunningPoller(context, _finalizeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _finalizeSend(context, serviceGroupName, operationId, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
}
