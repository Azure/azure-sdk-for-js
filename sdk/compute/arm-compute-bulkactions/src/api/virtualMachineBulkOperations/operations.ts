// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  ExecuteDeallocateContent,
  DeallocateResourceOperationResponse,
  ExecuteHibernateContent,
  HibernateResourceOperationResponse,
  ExecuteStartContent,
  StartResourceOperationResponse,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsContent,
  CancelOperationsResponse,
  ExecuteReimageRequest,
  ReimageResourceOperationResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  executeDeallocateContentSerializer,
  deallocateResourceOperationResponseDeserializer,
  executeHibernateContentSerializer,
  hibernateResourceOperationResponseDeserializer,
  executeStartContentSerializer,
  startResourceOperationResponseDeserializer,
  executeDeleteContentSerializer,
  deleteResourceOperationResponseDeserializer,
  getOperationStatusContentSerializer,
  getOperationStatusResponseDeserializer,
  cancelOperationsContentSerializer,
  cancelOperationsResponseDeserializer,
  executeReimageRequestSerializer,
  reimageResourceOperationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
  VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
  VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/**
 * This feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed. */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Get the current status of one or more operations identified by their Bulk Action Operation Ids. */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Delete one or more virtual machines. This operation is destructive. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Start one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Hibernate one or more virtual machines that support hibernation. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
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
      "api%2Dversion": context.apiVersion ?? "2026-09-06-preview",
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

/** Deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
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
