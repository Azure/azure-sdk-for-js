// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  ExecuteDeallocateContent,
  DeallocateResourceOperationResponse,
  ResourceOperation,
  ExecuteHibernateContent,
  HibernateResourceOperationResponse,
  ExecuteStartContent,
  StartResourceOperationResponse,
  ExecuteCreateContent,
  CreateResourceOperationResponse,
  ExecuteVdiCreateRequest,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsContent,
  CancelOperationsResponse,
  ExecuteReimageRequest,
  ReimageResourceOperationResponse,
  _ListBulkOperationErrorsResponse,
  AcknowledgeBulkOperationErrorsRequest,
  AcknowledgeBulkOperationErrorsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  executeDeallocateContentSerializer,
  deallocateResourceOperationResponseDeserializer,
  executeHibernateContentSerializer,
  hibernateResourceOperationResponseDeserializer,
  executeStartContentSerializer,
  startResourceOperationResponseDeserializer,
  executeCreateContentSerializer,
  createResourceOperationResponseDeserializer,
  executeVdiCreateRequestSerializer,
  executeDeleteContentSerializer,
  deleteResourceOperationResponseDeserializer,
  getOperationStatusContentSerializer,
  getOperationStatusResponseDeserializer,
  cancelOperationsContentSerializer,
  cancelOperationsResponseDeserializer,
  executeReimageRequestSerializer,
  reimageResourceOperationResponseDeserializer,
  _listBulkOperationErrorsResponseDeserializer,
  acknowledgeBulkOperationErrorsRequestSerializer,
  acknowledgeBulkOperationErrorsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams,
  VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
  VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
  VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkCreateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
  VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _bulkAcknowledgeOperationErrorsSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  body: AcknowledgeBulkOperationErrorsRequest,
  options: VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/acknowledgeBulkOperationErrors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: acknowledgeBulkOperationErrorsRequestSerializer(body),
  });
}

export async function _bulkAcknowledgeOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<AcknowledgeBulkOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return acknowledgeBulkOperationErrorsResponseDeserializer(result.body);
}
/** BulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group */
export async function bulkAcknowledgeOperationErrors(
  context: Client,
  resourceGroupName: string,
  location: string,
  body: AcknowledgeBulkOperationErrorsRequest,
  options: VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): Promise<AcknowledgeBulkOperationErrorsResponse> {
  const result = await _bulkAcknowledgeOperationErrorsSend(
    context,
    resourceGroupName,
    location,
    body,
    options,
  );
  return _bulkAcknowledgeOperationErrorsDeserialize(result);
}

export function _bulkListOperationErrorsSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/listBulkOperationErrors{?api%2Dversion,lookbackInMinutes}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
      lookbackInMinutes: options?.lookbackInMinutes,
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

export async function _bulkListOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListBulkOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _listBulkOperationErrorsResponseDeserializer(result.body);
}
/** BulkListOperationErrors: List bulk operation errors for a resource group */
export function bulkListOperationErrors(
  context: Client,
  resourceGroupName: string,
  location: string,
  options: VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _bulkListOperationErrorsSend(context, resourceGroupName, location, options),
    _bulkListOperationErrorsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _bulkReimageOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteReimageRequest,
  options: VirtualMachineBulkOperationsBulkReimageOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkReimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeReimageRequestSerializer(requestBody),
  });
}

export async function _bulkReimageOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<ReimageResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return reimageResourceOperationResponseDeserializer(result.body);
}
/** BulkReimage: Execute reimage operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkReimageOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteReimageRequest,
  options: VirtualMachineBulkOperationsBulkReimageOperationOptionalParams = { requestOptions: {} },
): Promise<ReimageResourceOperationResponse> {
  const result = await _bulkReimageOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkReimageOperationDeserialize(result);
}

export function _bulkCancelOperationsSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: CancelOperationsContent,
  options: VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkCancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cancelOperationsContentSerializer(requestBody),
  });
}

export async function _bulkCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cancelOperationsResponseDeserializer(result.body);
}
/** BulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
export async function bulkCancelOperations(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: CancelOperationsContent,
  options: VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams = { requestOptions: {} },
): Promise<CancelOperationsResponse> {
  const result = await _bulkCancelOperationsSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkCancelOperationsDeserialize(result);
}

export function _bulkGetOperationsStatusSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: GetOperationStatusContent,
  options: VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getOperationStatusContentSerializer(requestBody),
  });
}

export async function _bulkGetOperationsStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getOperationStatusResponseDeserializer(result.body);
}
/** BulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines */
export async function bulkGetOperationsStatus(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: GetOperationStatusContent,
  options: VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationStatusResponse> {
  const result = await _bulkGetOperationsStatusSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkGetOperationsStatusDeserialize(result);
}

export function _bulkDeleteOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteDeleteContent,
  options: VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeDeleteContentSerializer(requestBody),
  });
}

export async function _bulkDeleteOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteResourceOperationResponseDeserializer(result.body);
}
/** BulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkDeleteOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteDeleteContent,
  options: VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams = { requestOptions: {} },
): Promise<DeleteResourceOperationResponse> {
  const result = await _bulkDeleteOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkDeleteOperationDeserialize(result);
}

export function _bulkVdiFlexCreateOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteVdiCreateRequest,
  options: VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkVdiFlexCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeVdiCreateRequestSerializer(requestBody),
  });
}

export async function _bulkVdiFlexCreateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createResourceOperationResponseDeserializer(result.body);
}
/** BulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection. */
export async function bulkVdiFlexCreateOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteVdiCreateRequest,
  options: VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<CreateResourceOperationResponse> {
  const result = await _bulkVdiFlexCreateOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkVdiFlexCreateOperationDeserialize(result);
}

export function _bulkCreateOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteCreateContent,
  options: VirtualMachineBulkOperationsBulkCreateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeCreateContentSerializer(requestBody),
  });
}

export async function _bulkCreateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createResourceOperationResponseDeserializer(result.body);
}
/** BulkCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkCreateOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteCreateContent,
  options: VirtualMachineBulkOperationsBulkCreateOperationOptionalParams = { requestOptions: {} },
): Promise<CreateResourceOperationResponse> {
  const result = await _bulkCreateOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkCreateOperationDeserialize(result);
}

export function _bulkStartOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteStartContent,
  options: VirtualMachineBulkOperationsBulkStartOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeStartContentSerializer(requestBody),
  });
}

export async function _bulkStartOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return startResourceOperationResponseDeserializer(result.body);
}
/** BulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkStartOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteStartContent,
  options: VirtualMachineBulkOperationsBulkStartOperationOptionalParams = { requestOptions: {} },
): Promise<StartResourceOperationResponse> {
  const result = await _bulkStartOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkStartOperationDeserialize(result);
}

export function _bulkHibernateOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteHibernateContent,
  options: VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeHibernateContentSerializer(requestBody),
  });
}

export async function _bulkHibernateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}
/** BulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkHibernateOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteHibernateContent,
  options: VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _bulkHibernateOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkHibernateOperationDeserialize(result);
}

export function _bulkDeallocateOperationSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteDeallocateContent,
  options: VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/locations/{location}/virtualMachinesBulkDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executeDeallocateContentSerializer(requestBody),
  });
}

export async function _bulkDeallocateOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}
/** BulkDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function bulkDeallocateOperation(
  context: Client,
  resourceGroupName: string,
  location: string,
  requestBody: ExecuteDeallocateContent,
  options: VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _bulkDeallocateOperationSend(
    context,
    resourceGroupName,
    location,
    requestBody,
    options,
  );
  return _bulkDeallocateOperationDeserialize(result);
}
