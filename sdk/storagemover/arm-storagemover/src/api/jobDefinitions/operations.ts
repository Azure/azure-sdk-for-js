// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  JobDefinition,
  jobDefinitionSerializer,
  jobDefinitionDeserializer,
  JobDefinitionUpdateParameters,
  jobDefinitionUpdateParametersSerializer,
  _JobDefinitionList,
  _jobDefinitionListDeserializer,
  JobRunResourceId,
  jobRunResourceIdDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  JobDefinitionsStopJobOptionalParams,
  JobDefinitionsStartJobOptionalParams,
  JobDefinitionsListOptionalParams,
  JobDefinitionsDeleteOptionalParams,
  JobDefinitionsUpdateOptionalParams,
  JobDefinitionsCreateOrUpdateOptionalParams,
  JobDefinitionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _stopJobSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsStopJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/stopJob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _stopJobDeserialize(
  result: PathUncheckedResponse,
): Promise<JobRunResourceId> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobRunResourceIdDeserializer(result.body);
}

/** Requests the Agent of any active instance of this Job Definition to stop. */
export async function stopJob(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsStopJobOptionalParams = { requestOptions: {} },
): Promise<JobRunResourceId> {
  const result = await _stopJobSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    options,
  );
  return _stopJobDeserialize(result);
}

export function _startJobSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsStartJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/startJob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _startJobDeserialize(
  result: PathUncheckedResponse,
): Promise<JobRunResourceId> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobRunResourceIdDeserializer(result.body);
}

/** Creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution. */
export async function startJob(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsStartJobOptionalParams = { requestOptions: {} },
): Promise<JobRunResourceId> {
  const result = await _startJobSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    options,
  );
  return _startJobDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  options: JobDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JobDefinitionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _jobDefinitionListDeserializer(result.body);
}

/** Lists all Job Definitions in a Project. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  options: JobDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, storageMoverName, projectName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Job Definition resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobDefinition: JobDefinitionUpdateParameters,
  options: JobDefinitionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: jobDefinitionUpdateParametersSerializer(jobDefinition),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<JobDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobDefinitionDeserializer(result.body);
}

/** Updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. */
export async function update(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobDefinition: JobDefinitionUpdateParameters,
  options: JobDefinitionsUpdateOptionalParams = { requestOptions: {} },
): Promise<JobDefinition> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    jobDefinition,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobDefinition: JobDefinition,
  options: JobDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: jobDefinitionSerializer(jobDefinition),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<JobDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobDefinitionDeserializer(result.body);
}

/** Creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobDefinition: JobDefinition,
  options: JobDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<JobDefinition> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    jobDefinition,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobDefinitionDeserializer(result.body);
}

/** Gets a Job Definition resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<JobDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    options,
  );
  return _getDeserialize(result);
}
