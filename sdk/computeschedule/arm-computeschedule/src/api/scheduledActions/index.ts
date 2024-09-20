// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  scheduleSerializer,
  executionParametersSerializer,
  resourcesSerializer,
  SubmitDeallocateRequest,
  DeallocateResourceOperationResponse,
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
} from "../../models/models.js";
import { ComputeScheduleContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
} from "../../models/options.js";

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
      body: {
        schedule: scheduleSerializer(requestBody.schedule),
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesSubmitDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine */
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
      body: {
        schedule: scheduleSerializer(requestBody.schedule),
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesSubmitHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesSubmitHibernate: submitHibernate for a virtual machine */
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
      body: {
        schedule: scheduleSerializer(requestBody.schedule),
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesSubmitStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesSubmitStart: submitStart for a virtual machine */
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
      body: {
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesExecuteDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesExecuteDeallocate: executeDeallocate for a virtual machine */
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
      body: {
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesExecuteHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesExecuteHibernate: executeHibernate for a virtual machine */
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
      body: {
        executionParameters: executionParametersSerializer(
          requestBody.executionParameters,
        ),
        resources: resourcesSerializer(requestBody.resources),
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesExecuteStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    description: result.body["description"],
    type: result.body["type"],
    location: result.body["location"],
    results:
      result.body["results"] === undefined
        ? result.body["results"]
        : result.body["results"].map((p: any) => {
            return {
              resourceId: p["resourceId"],
              errorCode: p["errorCode"],
              errorDetails: p["errorDetails"],
              operation: !p.operation
                ? undefined
                : {
                    operationId: p.operation?.["operationId"],
                    resourceId: p.operation?.["resourceId"],
                    opType: p.operation?.["opType"],
                    subscriptionId: p.operation?.["subscriptionId"],
                    deadline: p.operation?.["deadline"],
                    deadlineType: p.operation?.["deadlineType"],
                    state: p.operation?.["state"],
                    timeZone: p.operation?.["timeZone"],
                    resourceOperationError: !p.operation?.resourceOperationError
                      ? undefined
                      : {
                          errorCode:
                            p.operation?.resourceOperationError?.["errorCode"],
                          errorDetails:
                            p.operation?.resourceOperationError?.[
                              "errorDetails"
                            ],
                        },
                    completedAt: p.operation?.["completedAt"],
                    retryPolicy: !p.operation?.retryPolicy
                      ? undefined
                      : {
                          retryCount: p.operation?.retryPolicy?.["retryCount"],
                          retryWindowInMinutes:
                            p.operation?.retryPolicy?.["retryWindowInMinutes"],
                        },
                  },
            };
          }),
  };
}

/** virtualMachinesExecuteStart: executeStart for a virtual machine */
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
      body: {
        operationIds: requestBody["operationIds"],
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    results: result.body["results"].map((p: any) => {
      return {
        resourceId: p["resourceId"],
        errorCode: p["errorCode"],
        errorDetails: p["errorDetails"],
        operation: !p.operation
          ? undefined
          : {
              operationId: p.operation?.["operationId"],
              resourceId: p.operation?.["resourceId"],
              opType: p.operation?.["opType"],
              subscriptionId: p.operation?.["subscriptionId"],
              deadline: p.operation?.["deadline"],
              deadlineType: p.operation?.["deadlineType"],
              state: p.operation?.["state"],
              timeZone: p.operation?.["timeZone"],
              resourceOperationError: !p.operation?.resourceOperationError
                ? undefined
                : {
                    errorCode:
                      p.operation?.resourceOperationError?.["errorCode"],
                    errorDetails:
                      p.operation?.resourceOperationError?.["errorDetails"],
                  },
              completedAt: p.operation?.["completedAt"],
              retryPolicy: !p.operation?.retryPolicy
                ? undefined
                : {
                    retryCount: p.operation?.retryPolicy?.["retryCount"],
                    retryWindowInMinutes:
                      p.operation?.retryPolicy?.["retryWindowInMinutes"],
                  },
            },
      };
    }),
  };
}

/** virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine */
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
      body: {
        operationIds: requestBody["operationIds"],
        correlationid: requestBody["correlationid"],
      },
    });
}

export async function _scheduledActionsVirtualMachinesCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    results: result.body["results"].map((p: any) => {
      return {
        resourceId: p["resourceId"],
        errorCode: p["errorCode"],
        errorDetails: p["errorDetails"],
        operation: !p.operation
          ? undefined
          : {
              operationId: p.operation?.["operationId"],
              resourceId: p.operation?.["resourceId"],
              opType: p.operation?.["opType"],
              subscriptionId: p.operation?.["subscriptionId"],
              deadline: p.operation?.["deadline"],
              deadlineType: p.operation?.["deadlineType"],
              state: p.operation?.["state"],
              timeZone: p.operation?.["timeZone"],
              resourceOperationError: !p.operation?.resourceOperationError
                ? undefined
                : {
                    errorCode:
                      p.operation?.resourceOperationError?.["errorCode"],
                    errorDetails:
                      p.operation?.resourceOperationError?.["errorDetails"],
                  },
              completedAt: p.operation?.["completedAt"],
              retryPolicy: !p.operation?.retryPolicy
                ? undefined
                : {
                    retryCount: p.operation?.retryPolicy?.["retryCount"],
                    retryWindowInMinutes:
                      p.operation?.retryPolicy?.["retryWindowInMinutes"],
                  },
            },
      };
    }),
  };
}

/** virtualMachinesCancelOperations: cancelOperations for a virtual machine */
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
      body: { operationIds: requestBody["operationIds"] },
    });
}

export async function _scheduledActionsVirtualMachinesGetOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    results: result.body["results"].map((p: any) => {
      return {
        operationId: p["operationId"],
        creationTime: p["creationTime"],
        activationTime: p["activationTime"],
        completedAt: p["completedAt"],
        operationErrors:
          p["operationErrors"] === undefined
            ? p["operationErrors"]
            : p["operationErrors"].map((p: any) => {
                return {
                  errorCode: p["errorCode"],
                  errorDetails: p["errorDetails"],
                  timeStamp: p["timeStamp"],
                  crpOperationId: p["crpOperationId"],
                };
              }),
        requestErrorCode: p["requestErrorCode"],
        requestErrorDetails: p["requestErrorDetails"],
      };
    }),
  };
}

/** virtualMachinesGetOperationErrors: getOperationErrors associated with an operation on a virtual machine */
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
