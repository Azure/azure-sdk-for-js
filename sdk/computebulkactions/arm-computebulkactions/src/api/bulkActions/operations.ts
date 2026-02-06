// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeBulkActionsContext as Client } from "../index.js";
import type {
  LocationBasedLaunchBulkInstancesOperation,
  OperationStatusResult,
  _LaunchBulkInstancesOperationListResult,
  _VirtualMachineListResult,
  VirtualMachine,
  ExecuteDeallocateRequest,
  DeallocateResourceOperationResponse,
  ExecuteHibernateRequest,
  HibernateResourceOperationResponse,
  ExecuteStartRequest,
  StartResourceOperationResponse,
  ExecuteCreateRequest,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  locationBasedLaunchBulkInstancesOperationSerializer,
  locationBasedLaunchBulkInstancesOperationDeserializer,
  operationStatusResultDeserializer,
  _launchBulkInstancesOperationListResultDeserializer,
  _virtualMachineListResultDeserializer,
  executeDeallocateRequestSerializer,
  deallocateResourceOperationResponseDeserializer,
  executeHibernateRequestSerializer,
  hibernateResourceOperationResponseDeserializer,
  executeStartRequestSerializer,
  startResourceOperationResponseDeserializer,
  executeCreateRequestSerializer,
  createResourceOperationResponseDeserializer,
  executeDeleteRequestSerializer,
  deleteResourceOperationResponseDeserializer,
  getOperationStatusRequestSerializer,
  getOperationStatusResponseDeserializer,
  cancelOperationsRequestSerializer,
  cancelOperationsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BulkActionsVirtualMachinesCancelOperationsOptionalParams,
  BulkActionsVirtualMachinesGetOperationStatusOptionalParams,
  BulkActionsVirtualMachinesExecuteDeleteOptionalParams,
  BulkActionsVirtualMachinesExecuteCreateOptionalParams,
  BulkActionsVirtualMachinesExecuteStartOptionalParams,
  BulkActionsVirtualMachinesExecuteHibernateOptionalParams,
  BulkActionsVirtualMachinesExecuteDeallocateOptionalParams,
  BulkActionsListVirtualMachinesOptionalParams,
  BulkActionsListBySubscriptionOptionalParams,
  BulkActionsListByResourceGroupOptionalParams,
  BulkActionsCancelOptionalParams,
  BulkActionsDeleteOptionalParams,
  BulkActionsCreateOrUpdateOptionalParams,
  BulkActionsGetOperationStatusOptionalParams,
  BulkActionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _virtualMachinesCancelOperationsSend(
  context: Client,
  location: string,
  requestBody: CancelOperationsRequest,
  options: BulkActionsVirtualMachinesCancelOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesCancelOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cancelOperationsRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cancelOperationsResponseDeserializer(result.body);
}

/** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
export async function virtualMachinesCancelOperations(
  context: Client,
  location: string,
  requestBody: CancelOperationsRequest,
  options: BulkActionsVirtualMachinesCancelOperationsOptionalParams = { requestOptions: {} },
): Promise<CancelOperationsResponse> {
  const result = await _virtualMachinesCancelOperationsSend(
    context,
    location,
    requestBody,
    options,
  );
  return _virtualMachinesCancelOperationsDeserialize(result);
}

export function _virtualMachinesGetOperationStatusSend(
  context: Client,
  location: string,
  requestBody: GetOperationStatusRequest,
  options: BulkActionsVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getOperationStatusRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getOperationStatusResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
export async function virtualMachinesGetOperationStatus(
  context: Client,
  location: string,
  requestBody: GetOperationStatusRequest,
  options: BulkActionsVirtualMachinesGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<GetOperationStatusResponse> {
  const result = await _virtualMachinesGetOperationStatusSend(
    context,
    location,
    requestBody,
    options,
  );
  return _virtualMachinesGetOperationStatusDeserialize(result);
}

export function _virtualMachinesExecuteDeleteSend(
  context: Client,
  location: string,
  requestBody: ExecuteDeleteRequest,
  options: BulkActionsVirtualMachinesExecuteDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesExecuteDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeDeleteRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deleteResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteDelete(
  context: Client,
  location: string,
  requestBody: ExecuteDeleteRequest,
  options: BulkActionsVirtualMachinesExecuteDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeleteSend(context, location, requestBody, options);
  return _virtualMachinesExecuteDeleteDeserialize(result);
}

export function _virtualMachinesExecuteCreateSend(
  context: Client,
  location: string,
  requestBody: ExecuteCreateRequest,
  options: BulkActionsVirtualMachinesExecuteCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesExecuteCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeCreateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return createResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteCreate(
  context: Client,
  location: string,
  requestBody: ExecuteCreateRequest,
  options: BulkActionsVirtualMachinesExecuteCreateOptionalParams = { requestOptions: {} },
): Promise<CreateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteCreateSend(context, location, requestBody, options);
  return _virtualMachinesExecuteCreateDeserialize(result);
}

export function _virtualMachinesExecuteStartSend(
  context: Client,
  location: string,
  requestBody: ExecuteStartRequest,
  options: BulkActionsVirtualMachinesExecuteStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesExecuteStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeStartRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return startResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteStart(
  context: Client,
  location: string,
  requestBody: ExecuteStartRequest,
  options: BulkActionsVirtualMachinesExecuteStartOptionalParams = { requestOptions: {} },
): Promise<StartResourceOperationResponse> {
  const result = await _virtualMachinesExecuteStartSend(context, location, requestBody, options);
  return _virtualMachinesExecuteStartDeserialize(result);
}

export function _virtualMachinesExecuteHibernateSend(
  context: Client,
  location: string,
  requestBody: ExecuteHibernateRequest,
  options: BulkActionsVirtualMachinesExecuteHibernateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesExecuteHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeHibernateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteHibernate(
  context: Client,
  location: string,
  requestBody: ExecuteHibernateRequest,
  options: BulkActionsVirtualMachinesExecuteHibernateOptionalParams = { requestOptions: {} },
): Promise<HibernateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteHibernateSend(
    context,
    location,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteHibernateDeserialize(result);
}

export function _virtualMachinesExecuteDeallocateSend(
  context: Client,
  location: string,
  requestBody: ExecuteDeallocateRequest,
  options: BulkActionsVirtualMachinesExecuteDeallocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/virtualMachinesExecuteDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeDeallocateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteDeallocate(
  context: Client,
  location: string,
  requestBody: ExecuteDeallocateRequest,
  options: BulkActionsVirtualMachinesExecuteDeallocateOptionalParams = { requestOptions: {} },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeallocateSend(
    context,
    location,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteDeallocateDeserialize(result);
}

export function _listVirtualMachinesSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsListVirtualMachinesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations/{name}/virtualMachines{?api%2Dversion,%24filter,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24filter": options?.filter,
      "%24skiptoken": options?.skiptoken,
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

export async function _listVirtualMachinesDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _virtualMachineListResultDeserializer(result.body);
}

/** List VirtualMachine resources of a LaunchBulkInstancesOperation. */
export function listVirtualMachines(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsListVirtualMachinesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listVirtualMachinesSend(context, resourceGroupName, location, name, options),
    _listVirtualMachinesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  location: string,
  options: BulkActionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_LaunchBulkInstancesOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _launchBulkInstancesOperationListResultDeserializer(result.body);
}

/** List LaunchBulkInstancesOperation resources by subscriptionId. */
export function listBySubscription(
  context: Client,
  location: string,
  options: BulkActionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, location, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: BulkActionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
): Promise<_LaunchBulkInstancesOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _launchBulkInstancesOperationListResultDeserializer(result.body);
}

/** List LaunchBulkInstancesOperation resources by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: BulkActionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, location, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations/{name}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Cancels LaunchBulkInstancesOperation instances that have not yet launched. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, location, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion,deleteInstances}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      deleteInstances: options?.deleteInstances,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes LaunchBulkInstancesOperations. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, location, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedLaunchBulkInstancesOperation,
  options: BulkActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: locationBasedLaunchBulkInstancesOperationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return locationBasedLaunchBulkInstancesOperationDeserializer(result.body);
}

/** Creates or updates LaunchBulkInstancesOperations. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  resource: LocationBasedLaunchBulkInstancesOperation,
  options: BulkActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<LocationBasedLaunchBulkInstancesOperation>,
  LocationBasedLaunchBulkInstancesOperation
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, location, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<
    OperationState<LocationBasedLaunchBulkInstancesOperation>,
    LocationBasedLaunchBulkInstancesOperation
  >;
}

export function _getOperationStatusSend(
  context: Client,
  location: string,
  id: string,
  options: BulkActionsGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeBulkActions/locations/{location}/operations/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Get the status of a LaunchBulkInstancesOperation. */
export async function getOperationStatus(
  context: Client,
  location: string,
  id: string,
  options: BulkActionsGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getOperationStatusSend(context, location, id, options);
  return _getOperationStatusDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeBulkActions/locations/{location}/launchBulkInstancesOperations/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return locationBasedLaunchBulkInstancesOperationDeserializer(result.body);
}

/** Gets an instance of LaunchBulkInstancesOperations. */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  name: string,
  options: BulkActionsGetOptionalParams = { requestOptions: {} },
): Promise<LocationBasedLaunchBulkInstancesOperation> {
  const result = await _getSend(context, resourceGroupName, location, name, options);
  return _getDeserialize(result);
}
