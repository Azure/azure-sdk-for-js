// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeScheduleContext as Client } from "../index.js";
import type {
  SubmitDeallocateRequest,
  DeallocateResourceOperationResponse,
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  ExecuteCreateRequest,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  submitDeallocateRequestSerializer,
  deallocateResourceOperationResponseDeserializer,
  submitHibernateRequestSerializer,
  hibernateResourceOperationResponseDeserializer,
  submitStartRequestSerializer,
  startResourceOperationResponseDeserializer,
  executeDeallocateRequestSerializer,
  executeHibernateRequestSerializer,
  executeStartRequestSerializer,
  executeCreateRequestSerializer,
  createResourceOperationResponseDeserializer,
  executeDeleteRequestSerializer,
  deleteResourceOperationResponseDeserializer,
  getOperationStatusRequestSerializer,
  getOperationStatusResponseDeserializer,
  cancelOperationsRequestSerializer,
  cancelOperationsResponseDeserializer,
  getOperationErrorsRequestSerializer,
  getOperationErrorsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _virtualMachinesGetOperationErrorsSend(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationErrors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getOperationErrorsRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesGetOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getOperationErrorsResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
export async function virtualMachinesGetOperationErrors(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationErrorsResponse> {
  const result = await _virtualMachinesGetOperationErrorsSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesGetOperationErrorsDeserialize(result);
}

export function _virtualMachinesCancelOperationsSend(
  context: Client,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesCancelOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): Promise<CancelOperationsResponse> {
  const result = await _virtualMachinesCancelOperationsSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesCancelOperationsDeserialize(result);
}

export function _virtualMachinesGetOperationStatusSend(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationStatusResponse> {
  const result = await _virtualMachinesGetOperationStatusSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesGetOperationStatusDeserialize(result);
}

export function _virtualMachinesExecuteDeleteSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeleteRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: ExecuteDeleteRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<DeleteResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeleteSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteDeleteDeserialize(result);
}

export function _virtualMachinesExecuteCreateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteCreateRequest,
  options: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: ExecuteCreateRequest,
  options: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams = {
    requestOptions: {},
  },
): Promise<CreateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteCreateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteCreateDeserialize(result);
}

export function _virtualMachinesExecuteStartSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _virtualMachinesExecuteStartSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteStartDeserialize(result);
}

export function _virtualMachinesExecuteHibernateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteHibernateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteHibernateDeserialize(result);
}

export function _virtualMachinesExecuteDeallocateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeallocateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteDeallocateDeserialize(result);
}

export function _virtualMachinesSubmitStartSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitStartRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitStartDeserialize(
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

/** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitStart(
  context: Client,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _virtualMachinesSubmitStartSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitStartDeserialize(result);
}

export function _virtualMachinesSubmitHibernateSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitHibernateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitHibernateDeserialize(
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

/** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitHibernate(
  context: Client,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _virtualMachinesSubmitHibernateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitHibernateDeserialize(result);
}

export function _virtualMachinesSubmitDeallocateSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitDeallocateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitDeallocateDeserialize(
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

/** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitDeallocate(
  context: Client,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _virtualMachinesSubmitDeallocateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitDeallocateDeserialize(result);
}
