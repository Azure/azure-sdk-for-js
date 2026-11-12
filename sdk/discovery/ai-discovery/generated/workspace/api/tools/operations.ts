// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext as Client } from "../index.js";
import {
  RunResult,
  runResultDeserializer,
  inlineFileArraySerializer,
  inputDataMountArraySerializer,
  outputDataMountArraySerializer,
  infraOverridesSerializer,
  _runRequestEnvironmentVariableArraySerializer,
  ComputeUsage,
  computeUsageDeserializer,
} from "../../../models/microsoft/discovery/workspace/models.js";
import {
  OperationStatusRunResultError,
  operationStatusRunResultErrorDeserializer,
  PagedOperation,
  pagedOperationDeserializer,
} from "../../../models/models.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  ToolsGetComputeUsageOptionalParams,
  ToolsGetOperationsOptionalParams,
  ToolsCancelRunLroOptionalParams,
  ToolsRunOptionalParams,
  ToolsGetRunStatusOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getComputeUsageSend(
  context: Client.WorkspaceContext,
  projectName: string,
  options: ToolsGetComputeUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tools/projects/{projectName}/computeUsage{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getComputeUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputeUsage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return computeUsageDeserializer(result.body);
}
/** Examine compute usage. */
export async function getComputeUsage(
  context: Client.WorkspaceContext,
  projectName: string,
  options: ToolsGetComputeUsageOptionalParams = { requestOptions: {} },
): Promise<ComputeUsage> {
  const result = await _getComputeUsageSend(context, projectName, options);
  return _getComputeUsageDeserialize(result);
}

export function _getOperationsSend(
  context: Client.WorkspaceContext,
  projectName: string,
  options: ToolsGetOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tools/projects/{projectName}/operations{?api%2Dversion,top,skip,maxpagesize}",
    {
      projectName: projectName,
      "api%2Dversion": "2026-06-01",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pagedOperationDeserializer(result.body);
}
/** List tool runs. */
export async function getOperations(
  context: Client.WorkspaceContext,
  projectName: string,
  options: ToolsGetOperationsOptionalParams = { requestOptions: {} },
): Promise<PagedOperation> {
  const result = await _getOperationsSend(context, projectName, options);
  return _getOperationsDeserialize(result);
}

export function _cancelRunLroSend(
  context: Client.WorkspaceContext,
  projectName: string,
  operationId: string,
  options: ToolsCancelRunLroOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tools/projects/{projectName}/operations/{operationId}:cancel{?api%2Dversion}",
    {
      projectName: projectName,
      operationId: operationId,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelRunLroDeserialize(result: PathUncheckedResponse): Promise<RunResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return runResultDeserializer(result.body.result);
}
/** Cancel an ongoing tool run. */
export function cancelRunLro(
  context: Client.WorkspaceContext,
  projectName: string,
  operationId: string,
  options: ToolsCancelRunLroOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RunResult>, RunResult> {
  return getLongRunningPoller(context, _cancelRunLroDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelRunLroSend(context, projectName, operationId, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<RunResult>, RunResult>;
}

export function _runSend(
  context: Client.WorkspaceContext,
  projectName: string,
  toolId: string,
  nodePoolIds: string[],
  options: ToolsRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tools/projects/{projectName}:run{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      toolId: toolId,
      command: options?.command,
      inlineFiles: !options?.inlineFiles
        ? options?.inlineFiles
        : inlineFileArraySerializer(options?.inlineFiles),
      inputData: !options?.inputData
        ? options?.inputData
        : inputDataMountArraySerializer(options?.inputData),
      outputData: !options?.outputData
        ? options?.outputData
        : outputDataMountArraySerializer(options?.outputData),
      nodePoolIds: nodePoolIds.map((p: any) => {
        return p;
      }),
      infraOverrides: !options?.infraOverrides
        ? options?.infraOverrides
        : infraOverridesSerializer(options?.infraOverrides),
      environmentVariables: !options?.environmentVariables
        ? options?.environmentVariables
        : _runRequestEnvironmentVariableArraySerializer(options?.environmentVariables),
    },
  });
}

export async function _runDeserialize(result: PathUncheckedResponse): Promise<RunResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return runResultDeserializer(result.body.result);
}
/** Run the specified tool in the context of the specified project. */
export function run(
  context: Client.WorkspaceContext,
  projectName: string,
  toolId: string,
  nodePoolIds: string[],
  options: ToolsRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RunResult>, RunResult> {
  return getLongRunningPoller(context, _runDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _runSend(context, projectName, toolId, nodePoolIds, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<RunResult>, RunResult>;
}

export function _getRunStatusSend(
  context: Client.WorkspaceContext,
  projectName: string,
  operationId: string,
  options: ToolsGetRunStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tools/projects/{projectName}/operations/{operationId}{?api%2Dversion,logCount}",
    {
      projectName: projectName,
      operationId: operationId,
      "api%2Dversion": "2026-06-01",
      logCount: options?.logCount,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getRunStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusRunResultError> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusRunResultErrorDeserializer(result.body);
}
/** Used for to poll status of a Tool run. */
export async function getRunStatus(
  context: Client.WorkspaceContext,
  projectName: string,
  operationId: string,
  options: ToolsGetRunStatusOptionalParams = { requestOptions: {} },
): Promise<OperationStatusRunResultError> {
  const result = await _getRunStatusSend(context, projectName, operationId, options);
  return _getRunStatusDeserialize(result);
}
