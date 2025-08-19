// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  Experiment,
  experimentSerializer,
  experimentDeserializer,
  errorResponseDeserializer,
  ExperimentUpdate,
  experimentUpdateSerializer,
  _ExperimentListResult,
  _experimentListResultDeserializer,
  ExperimentExecution,
  experimentExecutionDeserializer,
  _ExperimentExecutionListResult,
  _experimentExecutionListResultDeserializer,
  ExperimentExecutionDetails,
  experimentExecutionDetailsDeserializer,
} from "../../models/models.js";
import {
  ExperimentsExecutionDetailsOptionalParams,
  ExperimentsListAllExecutionsOptionalParams,
  ExperimentsGetExecutionOptionalParams,
  ExperimentsStartOptionalParams,
  ExperimentsCancelOptionalParams,
  ExperimentsListAllOptionalParams,
  ExperimentsListOptionalParams,
  ExperimentsDeleteOptionalParams,
  ExperimentsUpdateOptionalParams,
  ExperimentsCreateOrUpdateOptionalParams,
  ExperimentsGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _executionDetailsSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentsExecutionDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions/{executionId}/executionDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      executionId: executionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _executionDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExperimentExecutionDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return experimentExecutionDetailsDeserializer(result.body);
}

/** Execution details of an experiment resource. */
export async function executionDetails(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentsExecutionDetailsOptionalParams = { requestOptions: {} },
): Promise<ExperimentExecutionDetails> {
  const result = await _executionDetailsSend(
    context,
    resourceGroupName,
    experimentName,
    executionId,
    options,
  );
  return _executionDetailsDeserialize(result);
}

export function _listAllExecutionsSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsListAllExecutionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAllExecutionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExperimentExecutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _experimentExecutionListResultDeserializer(result.body);
}

/** Get a list of executions of an Experiment resource. */
export function listAllExecutions(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsListAllExecutionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExperimentExecution> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllExecutionsSend(context, resourceGroupName, experimentName, options),
    _listAllExecutionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getExecutionSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentsGetExecutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions/{executionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      executionId: executionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getExecutionDeserialize(
  result: PathUncheckedResponse,
): Promise<ExperimentExecution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return experimentExecutionDeserializer(result.body);
}

/** Get an execution of an Experiment resource. */
export async function getExecution(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentsGetExecutionOptionalParams = { requestOptions: {} },
): Promise<ExperimentExecution> {
  const result = await _getExecutionSend(
    context,
    resourceGroupName,
    experimentName,
    executionId,
    options,
  );
  return _getExecutionDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Start a Experiment resource. */
export function start(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, experimentName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Cancel a running Experiment resource. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, experimentName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listAllSend(
  context: Client,
  options: ExperimentsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/experiments{?api%2Dversion,running,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      running: options?.running,
      continuationToken: options?.continuationToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExperimentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _experimentListResultDeserializer(result.body);
}

/** Get a list of Experiment resources in a subscription. */
export function listAll(
  context: Client,
  options: ExperimentsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Experiment> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: ExperimentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments{?api%2Dversion,running,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      running: options?.running,
      continuationToken: options?.continuationToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExperimentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _experimentListResultDeserializer(result.body);
}

/** Get a list of Experiment resources in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: ExperimentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Experiment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a Experiment resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, experimentName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  properties: ExperimentUpdate,
  options: ExperimentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: experimentUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Experiment> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return experimentDeserializer(result.body);
}

/** The operation to update an experiment. */
export function update(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  properties: ExperimentUpdate,
  options: ExperimentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Experiment>, Experiment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, experimentName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Experiment>, Experiment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  resource: Experiment,
  options: ExperimentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: experimentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Experiment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return experimentDeserializer(result.body);
}

/** Create or update a Experiment resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  resource: Experiment,
  options: ExperimentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Experiment>, Experiment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, experimentName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Experiment>, Experiment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Experiment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return experimentDeserializer(result.body);
}

/** Get a Experiment resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentsGetOptionalParams = { requestOptions: {} },
): Promise<Experiment> {
  const result = await _getSend(context, resourceGroupName, experimentName, options);
  return _getDeserialize(result);
}
