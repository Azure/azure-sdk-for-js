// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ExperimentExecution,
  experimentExecutionDeserializer,
  _ExperimentExecutionListResult,
  _experimentExecutionListResultDeserializer,
  ExperimentExecutionDetails,
  experimentExecutionDetailsDeserializer,
} from "../../models/models.js";
import {
  ExperimentExecutionsGetExecutionDetailsOptionalParams,
  ExperimentExecutionsListAllExecutionsOptionalParams,
  ExperimentExecutionsGetExecutionOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getExecutionDetailsSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentExecutionsGetExecutionDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions/{executionId}/getExecutionDetails{?api%2Dversion}",
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

export async function _getExecutionDetailsDeserialize(
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
export async function getExecutionDetails(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  executionId: string,
  options: ExperimentExecutionsGetExecutionDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<ExperimentExecutionDetails> {
  const result = await _getExecutionDetailsSend(
    context,
    resourceGroupName,
    experimentName,
    executionId,
    options,
  );
  return _getExecutionDetailsDeserialize(result);
}

export function _listAllExecutionsSend(
  context: Client,
  resourceGroupName: string,
  experimentName: string,
  options: ExperimentExecutionsListAllExecutionsOptionalParams = {
    requestOptions: {},
  },
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
  options: ExperimentExecutionsListAllExecutionsOptionalParams = {
    requestOptions: {},
  },
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
  options: ExperimentExecutionsGetExecutionOptionalParams = {
    requestOptions: {},
  },
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
  options: ExperimentExecutionsGetExecutionOptionalParams = {
    requestOptions: {},
  },
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
