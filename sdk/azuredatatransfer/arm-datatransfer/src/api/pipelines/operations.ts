// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  Pipeline,
  PipelinesPatch,
  _PipelineListResult,
  ResourceBody,
  Connection,
  Schema,
  TransferFlowRequestBody,
  TransferFlowResponseBody,
  Action,
  ConnectionIdList,
  ListFlowsByPipelineResult,
  ListTransferFlowsByPipelineRequestBody,
  _ListTransferFlowsByPipelineResult,
  TransferFlowSummary,
  SchemasListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  pipelineSerializer,
  pipelineDeserializer,
  pipelinesPatchSerializer,
  _pipelineListResultDeserializer,
  resourceBodySerializer,
  connectionDeserializer,
  schemaSerializer,
  transferFlowRequestBodySerializer,
  transferFlowResponseBodyDeserializer,
  actionSerializer,
  connectionIdListSerializer,
  listFlowsByPipelineResultDeserializer,
  listTransferFlowsByPipelineRequestBodySerializer,
  _listTransferFlowsByPipelineResultDeserializer,
  schemasListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PipelinesRejectTransferFlowOptionalParams,
  PipelinesRejectConnectionOptionalParams,
  PipelinesListSchemasListOptionalParams,
  PipelinesListTransferFlowsOptionalParams,
  PipelinesListOptionalParams,
  PipelinesExecuteActionOptionalParams,
  PipelinesApproveTransferFlowOptionalParams,
  PipelinesApproveConnectionOptionalParams,
  PipelinesListBySubscriptionOptionalParams,
  PipelinesListByResourceGroupOptionalParams,
  PipelinesDeleteOptionalParams,
  PipelinesUpdateOptionalParams,
  PipelinesCreateOrUpdateOptionalParams,
  PipelinesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _rejectTransferFlowSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: TransferFlowRequestBody,
  options: PipelinesRejectTransferFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/rejectTransferFlow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: transferFlowRequestBodySerializer(body),
  });
}

export async function _rejectTransferFlowDeserialize(
  result: PathUncheckedResponse,
): Promise<TransferFlowResponseBody> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return transferFlowResponseBodyDeserializer(result.body);
}

/** Rejects pending flow request(s) associated with the specified Pipeline. */
export function rejectTransferFlow(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: TransferFlowRequestBody,
  options: PipelinesRejectTransferFlowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TransferFlowResponseBody>, TransferFlowResponseBody> {
  return getLongRunningPoller(context, _rejectTransferFlowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rejectTransferFlowSend(context, resourceGroupName, pipelineName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<TransferFlowResponseBody>, TransferFlowResponseBody>;
}

export function _rejectConnectionSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  connection: ResourceBody,
  options: PipelinesRejectConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/rejectConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceBodySerializer(connection),
  });
}

export async function _rejectConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Rejects a pending connection request associated with the specified Pipeline. */
export function rejectConnection(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  connection: ResourceBody,
  options: PipelinesRejectConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connection>, Connection> {
  return getLongRunningPoller(context, _rejectConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rejectConnectionSend(context, resourceGroupName, pipelineName, connection, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<Connection>, Connection>;
}

export function _listSchemasListSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  schema: Schema,
  options: PipelinesListSchemasListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/listSchemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: schemaSerializer(schema),
  });
}

export async function _listSchemasListDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemasListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemasListResultDeserializer(result.body);
}

/** Lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
export async function listSchemasList(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  schema: Schema,
  options: PipelinesListSchemasListOptionalParams = { requestOptions: {} },
): Promise<SchemasListResult> {
  const result = await _listSchemasListSend(
    context,
    resourceGroupName,
    pipelineName,
    schema,
    options,
  );
  return _listSchemasListDeserialize(result);
}

export function _listTransferFlowsSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: {
    body?: ListTransferFlowsByPipelineRequestBody;
  },
  options: PipelinesListTransferFlowsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/listTransferFlows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !body.body ? body.body : listTransferFlowsByPipelineRequestBodySerializer(body.body),
  });
}

export async function _listTransferFlowsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListTransferFlowsByPipelineResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _listTransferFlowsByPipelineResultDeserializer(result.body);
}

/** Lists the storage and messaging transfer flows that use the specified Pipeline, across all subscriptions and tenants that use it. This is the pipeline approver view; it differs from the subscription and resource group list operations, which only return the caller's own transfer flows. Results do not cross clouds; the remote side of each flow is referenced only through remoteTransferFlowResourceId. */
export function listTransferFlows(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: {
    body?: ListTransferFlowsByPipelineRequestBody;
  },
  options: PipelinesListTransferFlowsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TransferFlowSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listTransferFlowsSend(context, resourceGroupName, pipelineName, body, options),
    _listTransferFlowsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-29-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: {
    connections?: ConnectionIdList;
  },
  options: PipelinesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/listFlows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !body.connections ? body.connections : connectionIdListSerializer(body.connections),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ListFlowsByPipelineResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return listFlowsByPipelineResultDeserializer(result.body);
}

/** Lists all Flows associated with the specified Pipeline. */
export async function list(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: {
    connections?: ConnectionIdList;
  },
  options: PipelinesListOptionalParams = { requestOptions: {} },
): Promise<ListFlowsByPipelineResult> {
  const result = await _listSend(context, resourceGroupName, pipelineName, body, options);
  return _listDeserialize(result);
}

export function _executeActionSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  action: Action,
  options: PipelinesExecuteActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/executeAction{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: actionSerializer(action),
  });
}

export async function _executeActionDeserialize(result: PathUncheckedResponse): Promise<Pipeline> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pipelineDeserializer(result.body);
}

/** Executes a privileged or administrative action on the specified Pipeline. */
export function executeAction(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  action: Action,
  options: PipelinesExecuteActionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pipeline>, Pipeline> {
  return getLongRunningPoller(context, _executeActionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _executeActionSend(context, resourceGroupName, pipelineName, action, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<Pipeline>, Pipeline>;
}

export function _approveTransferFlowSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: TransferFlowRequestBody,
  options: PipelinesApproveTransferFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/approveTransferFlow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: transferFlowRequestBodySerializer(body),
  });
}

export async function _approveTransferFlowDeserialize(
  result: PathUncheckedResponse,
): Promise<TransferFlowResponseBody> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return transferFlowResponseBodyDeserializer(result.body);
}

/** Approves pending flow request(s) associated with the specified Pipeline. */
export function approveTransferFlow(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  body: TransferFlowRequestBody,
  options: PipelinesApproveTransferFlowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TransferFlowResponseBody>, TransferFlowResponseBody> {
  return getLongRunningPoller(context, _approveTransferFlowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _approveTransferFlowSend(context, resourceGroupName, pipelineName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<TransferFlowResponseBody>, TransferFlowResponseBody>;
}

export function _approveConnectionSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  connection: ResourceBody,
  options: PipelinesApproveConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/approveConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceBodySerializer(connection),
  });
}

export async function _approveConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<Connection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectionDeserializer(result.body);
}

/** Approves a pending connection request associated with the specified Pipeline. */
export function approveConnection(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  connection: ResourceBody,
  options: PipelinesApproveConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connection>, Connection> {
  return getLongRunningPoller(context, _approveConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _approveConnectionSend(context, resourceGroupName, pipelineName, connection, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<Connection>, Connection>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: PipelinesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/pipelines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PipelineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pipelineListResultDeserializer(result.body);
}

/** Lists all Pipeline resources within the current subscription. */
export function listBySubscription(
  context: Client,
  options: PipelinesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pipeline> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-29-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PipelinesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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
): Promise<_PipelineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pipelineListResultDeserializer(result.body);
}

/** Lists all Pipeline resources within the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PipelinesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pipeline> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-29-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: PipelinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

/** Deletes the specified Pipeline resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: PipelinesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, pipelineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  pipeline: PipelinesPatch,
  options: PipelinesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pipelinesPatchSerializer(pipeline),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline. */
export function update(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  pipeline: PipelinesPatch,
  options: PipelinesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, pipelineName, pipeline, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  pipeline: Pipeline,
  options: PipelinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pipelineSerializer(pipeline),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Pipeline> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pipelineDeserializer(result.body);
}

/** Creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  pipeline: Pipeline,
  options: PipelinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pipeline>, Pipeline> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, pipelineName, pipeline, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<Pipeline>, Pipeline>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: PipelinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Pipeline> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pipelineDeserializer(result.body);
}

/** Retrieves the specified Pipeline resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: PipelinesGetOptionalParams = { requestOptions: {} },
): Promise<Pipeline> {
  const result = await _getSend(context, resourceGroupName, pipelineName, options);
  return _getDeserialize(result);
}
