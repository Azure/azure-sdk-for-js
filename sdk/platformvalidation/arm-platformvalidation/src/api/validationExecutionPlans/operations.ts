// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidationExecutionPlan,
  validationExecutionPlanSerializer,
  validationExecutionPlanDeserializer,
  ValidationExecutionPlanUpdate,
  validationExecutionPlanUpdateSerializer,
  _ValidationExecutionPlanListResult,
  _validationExecutionPlanListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationExecutionPlansListByResourceGroupOptionalParams,
  ValidationExecutionPlansDeleteOptionalParams,
  ValidationExecutionPlansUpdateOptionalParams,
  ValidationExecutionPlansCreateOrUpdateOptionalParams,
  ValidationExecutionPlansGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  options: ValidationExecutionPlansListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      "%24filter": options?.filter,
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
): Promise<_ValidationExecutionPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _validationExecutionPlanListResultDeserializer(result.body);
}

/** List validation test execution plans by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  options: ValidationExecutionPlansListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ValidationExecutionPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, cloudValidationName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ValidationExecutionPlansDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a validation test execution plan */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ValidationExecutionPlansDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  properties: ValidationExecutionPlanUpdate,
  options: ValidationExecutionPlansUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validationExecutionPlanUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationExecutionPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationExecutionPlanDeserializer(result.body);
}

/** Update a validation test execution plan */
export function update(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  properties: ValidationExecutionPlanUpdate,
  options: ValidationExecutionPlansUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  resource: ValidationExecutionPlan,
  options: ValidationExecutionPlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validationExecutionPlanSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationExecutionPlan> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationExecutionPlanDeserializer(result.body);
}

/** Create or update a validation test execution plan */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  resource: ValidationExecutionPlan,
  options: ValidationExecutionPlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ValidationExecutionPlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
): Promise<ValidationExecutionPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationExecutionPlanDeserializer(result.body);
}

/** Get a validation test execution plan */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ValidationExecutionPlansGetOptionalParams = { requestOptions: {} },
): Promise<ValidationExecutionPlan> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudValidationName,
    validationExecutionPlanName,
    options,
  );
  return _getDeserialize(result);
}
