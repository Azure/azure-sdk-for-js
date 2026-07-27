// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext as Client } from "../index.js";
import {
  Investigation,
  investigationSerializer,
  investigationDeserializer,
  InvestigationOperationStatus,
  investigationOperationStatusDeserializer,
  DiscoveryEngine,
  discoveryEngineDeserializer,
  DiscoveryEngineUpdate,
  discoveryEngineUpdateSerializer,
} from "../../../models/microsoft/discovery/workspace/models.js";
import {
  PagedInvestigation,
  pagedInvestigationDeserializer,
  PagedWorkingMemoryEntry,
  pagedWorkingMemoryEntryDeserializer,
} from "../../../models/models.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  InvestigationsUpdateDiscoveryEngineOptionalParams,
  InvestigationsStopDiscoveryEngineOptionalParams,
  InvestigationsStartDiscoveryEngineOptionalParams,
  InvestigationsGetDiscoveryEngineMemoryOptionalParams,
  InvestigationsGetDiscoveryEngineOptionalParams,
  InvestigationsListOptionalParams,
  InvestigationsDeleteOptionalParams,
  InvestigationsUpdateOptionalParams,
  InvestigationsCreateOrReplaceOptionalParams,
  InvestigationsGetOperationStatusOptionalParams,
  InvestigationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateDiscoveryEngineSend(
  context: Client,
  projectName: string,
  investigationName: string,
  body: DiscoveryEngineUpdate,
  options: InvestigationsUpdateDiscoveryEngineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/discoveryEngine{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: discoveryEngineUpdateSerializer(body),
  });
}

export async function _updateDiscoveryEngineDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryEngine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveryEngineDeserializer(result.body);
}
/** Update the discovery engine for an investigation. This will create the discovery engine if it does not already exist. */
export async function updateDiscoveryEngine(
  context: Client,
  projectName: string,
  investigationName: string,
  body: DiscoveryEngineUpdate,
  options: InvestigationsUpdateDiscoveryEngineOptionalParams = { requestOptions: {} },
): Promise<DiscoveryEngine> {
  const result = await _updateDiscoveryEngineSend(
    context,
    projectName,
    investigationName,
    body,
    options,
  );
  return _updateDiscoveryEngineDeserialize(result);
}

export function _stopDiscoveryEngineSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsStopDiscoveryEngineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/discoveryEngine:stop{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _stopDiscoveryEngineDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryEngine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveryEngineDeserializer(result.body);
}
/** Stop the discovery engine for an investigation. */
export async function stopDiscoveryEngine(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsStopDiscoveryEngineOptionalParams = { requestOptions: {} },
): Promise<DiscoveryEngine> {
  const result = await _stopDiscoveryEngineSend(context, projectName, investigationName, options);
  return _stopDiscoveryEngineDeserialize(result);
}

export function _startDiscoveryEngineSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsStartDiscoveryEngineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/discoveryEngine:start{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startDiscoveryEngineDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryEngine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveryEngineDeserializer(result.body);
}
/** Start the discovery engine for an investigation. */
export async function startDiscoveryEngine(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsStartDiscoveryEngineOptionalParams = { requestOptions: {} },
): Promise<DiscoveryEngine> {
  const result = await _startDiscoveryEngineSend(context, projectName, investigationName, options);
  return _startDiscoveryEngineDeserialize(result);
}

export function _getDiscoveryEngineMemorySend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetDiscoveryEngineMemoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/discoveryEngine/workingMemory{?api%2Dversion,top,skip,maxpagesize}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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

export async function _getDiscoveryEngineMemoryDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedWorkingMemoryEntry> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pagedWorkingMemoryEntryDeserializer(result.body);
}
/** List discovery engine working memory entries for an investigation. */
export async function getDiscoveryEngineMemory(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetDiscoveryEngineMemoryOptionalParams = { requestOptions: {} },
): Promise<PagedWorkingMemoryEntry> {
  const result = await _getDiscoveryEngineMemorySend(
    context,
    projectName,
    investigationName,
    options,
  );
  return _getDiscoveryEngineMemoryDeserialize(result);
}

export function _getDiscoveryEngineSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetDiscoveryEngineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/discoveryEngine{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
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

export async function _getDiscoveryEngineDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryEngine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveryEngineDeserializer(result.body);
}
/** Get the discovery engine for an investigation. */
export async function getDiscoveryEngine(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetDiscoveryEngineOptionalParams = { requestOptions: {} },
): Promise<DiscoveryEngine> {
  const result = await _getDiscoveryEngineSend(context, projectName, investigationName, options);
  return _getDiscoveryEngineDeserialize(result);
}

export function _listSend(
  context: Client,
  projectName: string,
  options: InvestigationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations{?api%2Dversion,createdSince,top,skip,maxpagesize}",
    {
      projectName: projectName,
      "api%2Dversion": "2026-06-01",
      createdSince: !options?.createdSince
        ? options?.createdSince
        : options?.createdSince.toISOString(),
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<PagedInvestigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pagedInvestigationDeserializer(result.body);
}
/** List Investigation resources */
export async function list(
  context: Client,
  projectName: string,
  options: InvestigationsListOptionalParams = { requestOptions: {} },
): Promise<PagedInvestigation> {
  const result = await _listSend(context, projectName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  // Delete is a long-running operation monitored via getOperationStatus, whose
  // terminal `result` field is null for a delete (there is no resource to
  // return). The emitter mistypes the final result as `Investigation` (from the
  // status monitor's `result` property) and generates a deserializer that
  // dereferences the null `result.body.result`, which throws. A delete yields
  // no resource, so resolve the poller with void — matching KnowledgeBases.delete.
  return;
}
/** Delete a Investigation. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, projectName, investigationName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  projectName: string,
  investigationName: string,
  resource: Investigation,
  options: InvestigationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: investigationSerializer(resource),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Investigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return investigationDeserializer(result.body);
}
/** Updates an Investigation. */
export async function update(
  context: Client,
  projectName: string,
  investigationName: string,
  resource: Investigation,
  options: InvestigationsUpdateOptionalParams = { requestOptions: {} },
): Promise<Investigation> {
  const result = await _updateSend(context, projectName, investigationName, resource, options);
  return _updateDeserialize(result);
}

export function _createOrReplaceSend(
  context: Client,
  projectName: string,
  investigationName: string,
  resource: Investigation,
  options: InvestigationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: investigationSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<Investigation> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return investigationDeserializer(result.body);
}
/** Creates an Investigation. */
export async function createOrReplace(
  context: Client,
  projectName: string,
  investigationName: string,
  resource: Investigation,
  options: InvestigationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): Promise<Investigation> {
  const result = await _createOrReplaceSend(
    context,
    projectName,
    investigationName,
    resource,
    options,
  );
  return _createOrReplaceDeserialize(result);
}

export function _getOperationStatusSend(
  context: Client,
  projectName: string,
  investigationName: string,
  operationId: string,
  options: InvestigationsGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}/operations/{operationId}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      operationId: operationId,
      "api%2Dversion": "2026-06-01",
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

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<InvestigationOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return investigationOperationStatusDeserializer(result.body);
}
/** Get the status of a long-running operation. */
export async function getOperationStatus(
  context: Client,
  projectName: string,
  investigationName: string,
  operationId: string,
  options: InvestigationsGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<InvestigationOperationStatus> {
  const result = await _getOperationStatusSend(
    context,
    projectName,
    investigationName,
    operationId,
    options,
  );
  return _getOperationStatusDeserialize(result);
}

export function _getSend(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/investigations/{investigationName}{?api%2Dversion}",
    {
      projectName: projectName,
      investigationName: investigationName,
      "api%2Dversion": "2026-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Investigation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return investigationDeserializer(result.body);
}
/** Fetch a Investigation by name. */
export async function get(
  context: Client,
  projectName: string,
  investigationName: string,
  options: InvestigationsGetOptionalParams = { requestOptions: {} },
): Promise<Investigation> {
  const result = await _getSend(context, projectName, investigationName, options);
  return _getDeserialize(result);
}
