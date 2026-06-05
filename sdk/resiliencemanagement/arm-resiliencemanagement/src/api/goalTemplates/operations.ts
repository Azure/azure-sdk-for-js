// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GoalTemplate,
  goalTemplateSerializer,
  goalTemplateDeserializer,
  _GoalTemplateListResult,
  _goalTemplateListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GoalTemplatesListOptionalParams,
  GoalTemplatesDeleteOptionalParams,
  GoalTemplatesUpdateOptionalParams,
  GoalTemplatesCreateOrUpdateOptionalParams,
  GoalTemplatesGetOptionalParams,
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
  serviceGroupName: string,
  options: GoalTemplatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates{?api%2Dversion,%24skipToken,%24top}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
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
): Promise<_GoalTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _goalTemplateListResultDeserializer(result.body);
}

/** List GoalTemplate resources by tenant */
export function list(
  context: Client,
  serviceGroupName: string,
  options: GoalTemplatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoalTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, options),
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
  serviceGroupName: string,
  goalTemplateName: string,
  options: GoalTemplatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalTemplateName: goalTemplateName,
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

/** Delete a GoalTemplate */
export function $delete(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  options: GoalTemplatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, serviceGroupName, goalTemplateName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  properties: GoalTemplate,
  options: GoalTemplatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalTemplateName: goalTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: goalTemplateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update a GoalTemplate */
export function update(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  properties: GoalTemplate,
  options: GoalTemplatesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, serviceGroupName, goalTemplateName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  resource: GoalTemplate,
  options: GoalTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalTemplateName: goalTemplateName,
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
    body: goalTemplateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GoalTemplate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return goalTemplateDeserializer(result.body);
}

/** Create a GoalTemplate */
export function createOrUpdate(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  resource: GoalTemplate,
  options: GoalTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GoalTemplate>, GoalTemplate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, serviceGroupName, goalTemplateName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<GoalTemplate>, GoalTemplate>;
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  options: GoalTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalTemplateName: goalTemplateName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GoalTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return goalTemplateDeserializer(result.body);
}

/** Get a GoalTemplate */
export async function get(
  context: Client,
  serviceGroupName: string,
  goalTemplateName: string,
  options: GoalTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<GoalTemplate> {
  const result = await _getSend(context, serviceGroupName, goalTemplateName, options);
  return _getDeserialize(result);
}
