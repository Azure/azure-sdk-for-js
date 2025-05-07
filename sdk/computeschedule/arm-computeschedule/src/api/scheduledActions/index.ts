// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ComputeScheduleContext as Client,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
} from "../index.js";
import {
  SubmitDeallocateRequest,
  submitDeallocateRequestSerializer,
  DeallocateResourceOperationResponse,
  deallocateResourceOperationResponseDeserializer,
  SubmitHibernateRequest,
  submitHibernateRequestSerializer,
  HibernateResourceOperationResponse,
  hibernateResourceOperationResponseDeserializer,
  SubmitStartRequest,
  submitStartRequestSerializer,
  StartResourceOperationResponse,
  startResourceOperationResponseDeserializer,
  ExecuteDeallocateRequest,
  executeDeallocateRequestSerializer,
  ExecuteHibernateRequest,
  executeHibernateRequestSerializer,
  ExecuteStartRequest,
  executeStartRequestSerializer,
  GetOperationStatusRequest,
  getOperationStatusRequestSerializer,
  GetOperationStatusResponse,
  getOperationStatusResponseDeserializer,
  CancelOperationsRequest,
  cancelOperationsRequestSerializer,
  CancelOperationsResponse,
  cancelOperationsResponseDeserializer,
  GetOperationErrorsRequest,
  getOperationErrorsRequestSerializer,
  GetOperationErrorsResponse,
  getOperationErrorsResponseDeserializer,
} from "../../models/models.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _virtualMachinesGetOperationErrorsSend(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationErrors",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: getOperationErrorsRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesGetOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesCancelOperations",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: cancelOperationsRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationStatus",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: getOperationStatusRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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

export function _virtualMachinesExecuteStartSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteStart",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: executeStartRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesExecuteStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteHibernate",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: executeHibernateRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesExecuteHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDeallocate",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: executeDeallocateRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesExecuteDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitStart",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: submitStartRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesSubmitStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitHibernate",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: submitHibernateRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesSubmitHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitDeallocate",
      context.subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: submitDeallocateRequestSerializer(requestBody),
    });
}

export async function _virtualMachinesSubmitDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
