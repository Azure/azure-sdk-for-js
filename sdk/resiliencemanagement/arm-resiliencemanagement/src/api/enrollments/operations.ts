// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Enrollment,
  enrollmentSerializer,
  enrollmentDeserializer,
  _EnrollmentListResult,
  _enrollmentListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EnrollmentsListOptionalParams,
  EnrollmentsDeleteOptionalParams,
  EnrollmentsCreateOrUpdateOptionalParams,
  EnrollmentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  options: EnrollmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      usagePlanName: usagePlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
): Promise<_EnrollmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _enrollmentListResultDeserializer(result.body);
}

/** List Enrollments by Usage Plan. */
export function list(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  options: EnrollmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Enrollment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, usagePlanName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  options: EnrollmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments/{enrollmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      usagePlanName: usagePlanName,
      enrollmentName: enrollmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

/** Delete an Enrollment. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  options: EnrollmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, usagePlanName, enrollmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  resource: Enrollment,
  options: EnrollmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments/{enrollmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      usagePlanName: usagePlanName,
      enrollmentName: enrollmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enrollmentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Enrollment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return enrollmentDeserializer(result.body);
}

/** Create or update an Enrollment. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  resource: Enrollment,
  options: EnrollmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Enrollment>, Enrollment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        usagePlanName,
        enrollmentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<Enrollment>, Enrollment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  options: EnrollmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments/{enrollmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      usagePlanName: usagePlanName,
      enrollmentName: enrollmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Enrollment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return enrollmentDeserializer(result.body);
}

/** Get an Enrollment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  usagePlanName: string,
  enrollmentName: string,
  options: EnrollmentsGetOptionalParams = { requestOptions: {} },
): Promise<Enrollment> {
  const result = await _getSend(context, resourceGroupName, usagePlanName, enrollmentName, options);
  return _getDeserialize(result);
}
