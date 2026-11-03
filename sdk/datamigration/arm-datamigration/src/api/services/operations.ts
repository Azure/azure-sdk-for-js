// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext as Client } from "../index.js";
import type {
  DataMigrationService,
  _DataMigrationServiceList,
  DataMigrationServiceStatusResponse,
  _ServiceSkuList,
  AvailableServiceSku,
  NameAvailabilityRequest,
  NameAvailabilityResponse,
} from "../../models/models.js";
import {
  apiErrorDeserializer,
  dataMigrationServiceSerializer,
  dataMigrationServiceDeserializer,
  _dataMigrationServiceListDeserializer,
  dataMigrationServiceStatusResponseDeserializer,
  _serviceSkuListDeserializer,
  nameAvailabilityRequestSerializer,
  nameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesCheckChildrenNameAvailabilityOptionalParams,
  ServicesListSkusOptionalParams,
  ServicesStopOptionalParams,
  ServicesStartOptionalParams,
  ServicesCheckStatusOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  parameters: NameAvailabilityRequest,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nameAvailabilityRequestSerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return nameAvailabilityResponseDeserializer(result.body);
}

/** This method checks whether a proposed top-level resource name is valid and available. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  parameters: NameAvailabilityRequest,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, location, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _checkChildrenNameAvailabilitySend(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: NameAvailabilityRequest,
  options: ServicesCheckChildrenNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nameAvailabilityRequestSerializer(parameters),
  });
}

export async function _checkChildrenNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return nameAvailabilityResponseDeserializer(result.body);
}

/** This method checks whether a proposed nested resource name is valid and available. */
export async function checkChildrenNameAvailability(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: NameAvailabilityRequest,
  options: ServicesCheckChildrenNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityResponse> {
  const result = await _checkChildrenNameAvailabilitySend(
    context,
    groupName,
    serviceName,
    parameters,
    options,
  );
  return _checkChildrenNameAvailabilityDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceSkuList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _serviceSkuListDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Database Migration Service (classic). The skus action returns the list of SKUs that a service resource can be updated to. */
export function listSkus(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesListSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailableServiceSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listSkusSend(context, groupName, serviceName, options),
    _listSkusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _stopSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped. */
export function stop(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, groupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action starts the service and the service can be used for data migration. */
export function start(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, groupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _checkStatusSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesCheckStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/checkStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _checkStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<DataMigrationServiceStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataMigrationServiceStatusResponseDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action performs a health check and returns the status of the service and virtual machine size. */
export async function checkStatus(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesCheckStatusOptionalParams = { requestOptions: {} },
): Promise<DataMigrationServiceStatusResponse> {
  const result = await _checkStatusSend(context, groupName, serviceName, options);
  return _checkStatusDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataMigrationServiceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _dataMigrationServiceListDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a subscription. */
export function list(
  context: Client,
  options: ServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataMigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  groupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataMigrationServiceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _dataMigrationServiceListDeserializer(result.body);
}

/** The Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group. */
export function listByResourceGroup(
  context: Client,
  groupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataMigrationService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, groupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}{?api%2Dversion,deleteRunningTasks}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      deleteRunningTasks: options?.deleteRunningTasks,
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
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The DELETE method deletes a service. Any running tasks will be canceled. */
export function $delete(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, groupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: DataMigrationService,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataMigrationServiceSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataMigrationService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataMigrationServiceDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PATCH method updates an existing service. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy"). */
export function update(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: DataMigrationService,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataMigrationService>, DataMigrationService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, groupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DataMigrationService>, DataMigrationService>;
}

export function _createOrUpdateSend(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: DataMigrationService,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataMigrationServiceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataMigrationService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataMigrationServiceDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PUT method creates a new service or updates an existing one. When a service is updated, existing child resources (i.e. tasks) are unaffected. Services currently support a single kind, "vm", which refers to a VM-based service, although other kinds may be added in the future. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy"). The provider will reply when successful with 200 OK or 201 Created. Long-running operations use the provisioningState property. */
export function createOrUpdate(
  context: Client,
  groupName: string,
  serviceName: string,
  parameters: DataMigrationService,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataMigrationService>, DataMigrationService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, groupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-01-preview",
  }) as PollerLike<OperationState<DataMigrationService>, DataMigrationService>;
}

export function _getSend(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DataMigrationService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataMigrationServiceDeserializer(result.body);
}

/** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance. */
export async function get(
  context: Client,
  groupName: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<DataMigrationService> {
  const result = await _getSend(context, groupName, serviceName, options);
  return _getDeserialize(result);
}
