// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  jobExecutionTemplateSerializer,
  errorResponseDeserializer,
  Job,
  jobSerializer,
  jobDeserializer,
  JobPatchProperties,
  jobPatchPropertiesSerializer,
  _JobsCollection,
  _jobsCollectionDeserializer,
  JobExecutionBase,
  jobExecutionBaseDeserializer,
  ContainerAppJobExecutions,
  containerAppJobExecutionsDeserializer,
  JobSecretsCollection,
  jobSecretsCollectionDeserializer,
  DiagnosticsCollection,
  diagnosticsCollectionDeserializer,
  Diagnostics,
  diagnosticsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  JobsGetDetectorOptionalParams,
  JobsListDetectorsOptionalParams,
  JobsProxyGetOptionalParams,
  JobsStopExecutionOptionalParams,
  JobsSuspendOptionalParams,
  JobsResumeOptionalParams,
  JobsListSecretsOptionalParams,
  JobsStopMultipleExecutionsOptionalParams,
  JobsStartOptionalParams,
  JobsListBySubscriptionOptionalParams,
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getDetectorSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  detectorName: string,
  options: JobsGetDetectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectors/{detectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDetectorDeserialize(result: PathUncheckedResponse): Promise<Diagnostics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticsDeserializer(result.body);
}

/** Get the diagnostics data for a Container App Job. */
export async function getDetector(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  detectorName: string,
  options: JobsGetDetectorOptionalParams = { requestOptions: {} },
): Promise<Diagnostics> {
  const result = await _getDetectorSend(context, resourceGroupName, jobName, detectorName, options);
  return _getDetectorDeserialize(result);
}

export function _listDetectorsSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListDetectorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listDetectorsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticsCollectionDeserializer(result.body);
}

/** Get the list of diagnostics for a Container App Job. */
export function listDetectors(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListDetectorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Diagnostics> {
  return buildPagedAsyncIterator(
    context,
    () => _listDetectorsSend(context, resourceGroupName, jobName, options),
    _listDetectorsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _proxyGetSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  apiName: string,
  options: JobsProxyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectorProperties/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      apiName: apiName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _proxyGetDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Get the properties of a Container App Job. */
export async function proxyGet(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  apiName: string,
  options: JobsProxyGetOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _proxyGetSend(context, resourceGroupName, jobName, apiName, options);
  return _proxyGetDeserialize(result);
}

export function _stopExecutionSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobExecutionName: string,
  options: JobsStopExecutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions/{jobExecutionName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      jobExecutionName: jobExecutionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopExecutionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Terminates execution of a running container apps job */
export function stopExecution(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobExecutionName: string,
  options: JobsStopExecutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopExecutionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopExecutionSend(context, resourceGroupName, jobName, jobExecutionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _suspendDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Suspends a job */
export function suspend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsSuspendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _suspendDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _suspendSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Resumes a suspended job */
export function resume(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _resumeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resumeSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<JobSecretsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobSecretsCollectionDeserializer(result.body);
}

/** List secrets for a container apps job */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListSecretsOptionalParams = { requestOptions: {} },
): Promise<JobSecretsCollection> {
  const result = await _listSecretsSend(context, resourceGroupName, jobName, options);
  return _listSecretsDeserialize(result);
}

export function _stopMultipleExecutionsSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsStopMultipleExecutionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _stopMultipleExecutionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppJobExecutions> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppJobExecutionsDeserializer(result.body);
}

/** Terminates execution of a running container apps job */
export function stopMultipleExecutions(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsStopMultipleExecutionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerAppJobExecutions>, ContainerAppJobExecutions> {
  return getLongRunningPoller(context, _stopMultipleExecutionsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopMultipleExecutionsSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerAppJobExecutions>, ContainerAppJobExecutions>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
      body: !options?.template
        ? options?.template
        : jobExecutionTemplateSerializer(options?.template),
    });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<JobExecutionBase> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobExecutionBaseDeserializer(result.body);
}

/** Start a Container Apps Job */
export function start(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JobExecutionBase>, JobExecutionBase> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<JobExecutionBase>, JobExecutionBase>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: JobsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _jobsCollectionDeserializer(result.body);
}

/** Get the Container Apps Jobs in a given subscription. */
export function listBySubscription(
  context: Client,
  options: JobsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Job> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: JobsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _jobsCollectionDeserializer(result.body);
}

/** Get the Container Apps Jobs in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: JobsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Job> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Container Apps Job. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobEnvelope: JobPatchProperties,
  options: JobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: jobPatchPropertiesSerializer(jobEnvelope),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Patches a Container Apps Job using JSON Merge Patch */
export function update(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobEnvelope: JobPatchProperties,
  options: JobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, jobName, jobEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobEnvelope: Job,
  options: JobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: jobSerializer(jobEnvelope),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Create or Update a Container Apps Job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobEnvelope: Job,
  options: JobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Job>, Job> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, jobName, jobEnvelope, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Job>, Job>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Get the properties of a Container Apps Job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsGetOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _getSend(context, resourceGroupName, jobName, options);
  return _getDeserialize(result);
}
