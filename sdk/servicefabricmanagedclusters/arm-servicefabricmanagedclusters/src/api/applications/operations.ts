// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import type {
  ApplicationResource,
  ApplicationUpdateParameters,
  _ApplicationResourceList,
  RuntimeResumeApplicationUpgradeParameters,
  RuntimeUpdateApplicationUpgradeParameters,
  ApplicationFetchHealthRequest,
  RestartDeployedCodePackageRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  applicationResourceSerializer,
  applicationResourceDeserializer,
  applicationUpdateParametersSerializer,
  _applicationResourceListDeserializer,
  runtimeResumeApplicationUpgradeParametersSerializer,
  runtimeUpdateApplicationUpgradeParametersSerializer,
  applicationFetchHealthRequestSerializer,
  restartDeployedCodePackageRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationsRestartDeployedCodePackageOptionalParams,
  ApplicationsFetchHealthOptionalParams,
  ApplicationsUpdateUpgradeOptionalParams,
  ApplicationsStartRollbackOptionalParams,
  ApplicationsResumeUpgradeOptionalParams,
  ApplicationsReadUpgradeOptionalParams,
  ApplicationsListOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsUpdateOptionalParams,
  ApplicationsCreateOrUpdateOptionalParams,
  ApplicationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _restartDeployedCodePackageSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RestartDeployedCodePackageRequest,
  options: ApplicationsRestartDeployedCodePackageOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/restartDeployedCodePackage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restartDeployedCodePackageRequestSerializer(parameters),
  });
}

export async function _restartDeployedCodePackageDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restart a code package instance of a service replica or instance. This is a potentially destabilizing operation that should be used with immense care. */
export function restartDeployedCodePackage(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RestartDeployedCodePackageRequest,
  options: ApplicationsRestartDeployedCodePackageOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _restartDeployedCodePackageDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _restartDeployedCodePackageSend(
          context,
          resourceGroupName,
          clusterName,
          applicationName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _fetchHealthSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationFetchHealthRequest,
  options: ApplicationsFetchHealthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/fetchHealth{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: applicationFetchHealthRequestSerializer(parameters),
  });
}

export async function _fetchHealthDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get the status of the deployed application health. It will query the cluster to find the health of the deployed application. */
export function fetchHealth(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationFetchHealthRequest,
  options: ApplicationsFetchHealthOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fetchHealthDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fetchHealthSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateUpgradeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RuntimeUpdateApplicationUpgradeParameters,
  options: ApplicationsUpdateUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/updateUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: runtimeUpdateApplicationUpgradeParametersSerializer(parameters),
  });
}

export async function _updateUpgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Send a request to update the current application upgrade. */
export function updateUpgrade(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RuntimeUpdateApplicationUpgradeParameters,
  options: ApplicationsUpdateUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateUpgradeSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startRollbackSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsStartRollbackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/startRollback{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startRollbackDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version. */
export function startRollback(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsStartRollbackOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startRollbackDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startRollbackSend(context, resourceGroupName, clusterName, applicationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resumeUpgradeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RuntimeResumeApplicationUpgradeParameters,
  options: ApplicationsResumeUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/resumeUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: runtimeResumeApplicationUpgradeParametersSerializer(parameters),
  });
}

export async function _resumeUpgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused. */
export function resumeUpgrade(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: RuntimeResumeApplicationUpgradeParameters,
  options: ApplicationsResumeUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resumeUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeUpgradeSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _readUpgradeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsReadUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/fetchUpgradeStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _readUpgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get the status of the latest application upgrade. It will query the cluster to find the status of the latest application upgrade. */
export function readUpgrade(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsReadUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _readUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _readUpgradeSend(context, resourceGroupName, clusterName, applicationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ApplicationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _applicationResourceListDeserializer(result.body);
}

/** Gets all managed application resources created or in the process of being created in the Service Fabric cluster resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ApplicationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Service Fabric managed application resource with the specified name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, applicationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationUpdateParameters,
  options: ApplicationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
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
    body: applicationUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationResourceDeserializer(result.body);
}

/** Updates an application resource of a given managed cluster. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationUpdateParameters,
  options: ApplicationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApplicationResource>, ApplicationResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, applicationName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationResource,
  options: ApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
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
    body: applicationResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationResourceDeserializer(result.body);
}

/** Create or update a Service Fabric managed application resource with the specified name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  parameters: ApplicationResource,
  options: ApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApplicationResource>, ApplicationResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApplicationResource>, ApplicationResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApplicationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationResourceDeserializer(result.body);
}

/** Get a Service Fabric managed application resource created or in the process of being created in the Service Fabric cluster resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ApplicationsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationResource> {
  const result = await _getSend(context, resourceGroupName, clusterName, applicationName, options);
  return _getDeserialize(result);
}
