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

export function _scheduledActionsVirtualMachinesSubmitDeallocateSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitDeallocate",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: submitDeallocateRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesSubmitDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
export async function scheduledActionsVirtualMachinesSubmitDeallocate(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesSubmitDeallocateSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesSubmitDeallocateDeserialize(result);
}

export function _scheduledActionsVirtualMachinesSubmitHibernateSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitHibernate",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: submitHibernateRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesSubmitHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
export async function scheduledActionsVirtualMachinesSubmitHibernate(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesSubmitHibernateSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesSubmitHibernateDeserialize(result);
}

export function _scheduledActionsVirtualMachinesSubmitStartSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitStart",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: submitStartRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesSubmitStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return startResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
export async function scheduledActionsVirtualMachinesSubmitStart(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesSubmitStartSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesSubmitStartDeserialize(result);
}

export function _scheduledActionsVirtualMachinesExecuteDeallocateSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDeallocate",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: executeDeallocateRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesExecuteDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function scheduledActionsVirtualMachinesExecuteDeallocate(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesExecuteDeallocateSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesExecuteDeallocateDeserialize(result);
}

export function _scheduledActionsVirtualMachinesExecuteHibernateSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteHibernate",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: executeHibernateRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesExecuteHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function scheduledActionsVirtualMachinesExecuteHibernate(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesExecuteHibernateSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesExecuteHibernateDeserialize(result);
}

export function _scheduledActionsVirtualMachinesExecuteStartSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteStart",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: executeStartRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesExecuteStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return startResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function scheduledActionsVirtualMachinesExecuteStart(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _scheduledActionsVirtualMachinesExecuteStartSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesExecuteStartDeserialize(result);
}

export function _scheduledActionsVirtualMachinesGetOperationStatusSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationStatus",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: getOperationStatusRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return getOperationStatusResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
export async function scheduledActionsVirtualMachinesGetOperationStatus(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationStatusResponse> {
  const result = await _scheduledActionsVirtualMachinesGetOperationStatusSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesGetOperationStatusDeserialize(result);
}

export function _scheduledActionsVirtualMachinesCancelOperationsSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesCancelOperations",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: cancelOperationsRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cancelOperationsResponseDeserializer(result.body);
}

/** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
export async function scheduledActionsVirtualMachinesCancelOperations(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): Promise<CancelOperationsResponse> {
  const result = await _scheduledActionsVirtualMachinesCancelOperationsSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesCancelOperationsDeserialize(result);
}

export function _scheduledActionsVirtualMachinesGetOperationErrorsSend(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationErrors",
      subscriptionId,
      locationparameter,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: getOperationErrorsRequestSerializer(requestBody),
    });
}

export async function _scheduledActionsVirtualMachinesGetOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return getOperationErrorsResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
export async function scheduledActionsVirtualMachinesGetOperationErrors(
  context: Client,
  subscriptionId: string,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationErrorsResponse> {
  const result = await _scheduledActionsVirtualMachinesGetOperationErrorsSend(
    context,
    subscriptionId,
    locationparameter,
    requestBody,
    options,
  );
  return _scheduledActionsVirtualMachinesGetOperationErrorsDeserialize(result);
}
