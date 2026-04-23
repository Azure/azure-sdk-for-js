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
  ExecuteCreateContent,
  CreateResourceOperationResponse,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
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
  executeDeleteContentSerializer,
  deleteResourceOperationResponseDeserializer,
  getOperationStatusContentSerializer,
  getOperationStatusResponseDeserializer,
  cancelOperationsRequestSerializer,
  cancelOperationsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _virtualMachinesCancelOperationsSend(
  context: Client,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesCancelOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams = {
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
  requestBody: GetOperationStatusContent,
  options: VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: GetOperationStatusContent,
  options: VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams = {
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
  requestBody: ExecuteDeleteContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesExecuteDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: ExecuteDeleteContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams = {
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
  requestBody: ExecuteCreateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesExecuteCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: ExecuteCreateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams = {
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
  requestBody: ExecuteStartContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesExecuteStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: ExecuteStartContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams = {
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
  requestBody: ExecuteHibernateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesExecuteHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: ExecuteHibernateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams = {
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
  requestBody: ExecuteDeallocateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{locationparameter}/virtualMachinesExecuteDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
  requestBody: ExecuteDeallocateContent,
  options: VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams = {
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
