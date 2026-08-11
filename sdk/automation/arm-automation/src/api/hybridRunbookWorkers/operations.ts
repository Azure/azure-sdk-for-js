// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  HybridRunbookWorker,
  HybridRunbookWorkerCreateParameters,
  _HybridRunbookWorkersListResult,
  HybridRunbookWorkerMoveParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hybridRunbookWorkerDeserializer,
  hybridRunbookWorkerCreateParametersSerializer,
  _hybridRunbookWorkersListResultDeserializer,
  hybridRunbookWorkerMoveParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HybridRunbookWorkersMoveOptionalParams,
  HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams,
  HybridRunbookWorkersDeleteOptionalParams,
  HybridRunbookWorkersPatchOptionalParams,
  HybridRunbookWorkersCreateOptionalParams,
  HybridRunbookWorkersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _moveSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  hybridRunbookWorkerMoveParameters: HybridRunbookWorkerMoveParameters,
  options: HybridRunbookWorkersMoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}/move{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      hybridRunbookWorkerId: hybridRunbookWorkerId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: hybridRunbookWorkerMoveParametersSerializer(hybridRunbookWorkerMoveParameters),
  });
}

export async function _moveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Move a hybrid worker to a different group. */
export async function move(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  hybridRunbookWorkerMoveParameters: HybridRunbookWorkerMoveParameters,
  options: HybridRunbookWorkersMoveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _moveSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerId,
    hybridRunbookWorkerMoveParameters,
    options,
  );
  return _moveDeserialize(result);
}

export function _listByHybridRunbookWorkerGroupSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _listByHybridRunbookWorkerGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_HybridRunbookWorkersListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hybridRunbookWorkersListResultDeserializer(result.body);
}

/** Retrieve a list of hybrid runbook workers. */
export function listByHybridRunbookWorkerGroup(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<HybridRunbookWorker> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByHybridRunbookWorkerGroupSend(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        options,
      ),
    _listByHybridRunbookWorkerGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      hybridRunbookWorkerId: hybridRunbookWorkerId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a hybrid runbook worker. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      hybridRunbookWorkerId: hybridRunbookWorkerId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.hybridRunbookWorkerCreationParameters
      ? options?.hybridRunbookWorkerCreationParameters
      : hybridRunbookWorkerCreateParametersSerializer(
          options?.hybridRunbookWorkerCreationParameters,
        ),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridRunbookWorker> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerDeserializer(result.body);
}

/** Update a hybrid runbook worker. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersPatchOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorker> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerId,
    options,
  );
  return _patchDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  hybridRunbookWorkerCreationParameters: HybridRunbookWorkerCreateParameters,
  options: HybridRunbookWorkersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      hybridRunbookWorkerId: hybridRunbookWorkerId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridRunbookWorkerCreateParametersSerializer(hybridRunbookWorkerCreationParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridRunbookWorker> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerDeserializer(result.body);
}

/** Create a hybrid runbook worker. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  hybridRunbookWorkerCreationParameters: HybridRunbookWorkerCreateParameters,
  options: HybridRunbookWorkersCreateOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorker> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerId,
    hybridRunbookWorkerCreationParameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      hybridRunbookWorkerId: hybridRunbookWorkerId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HybridRunbookWorker> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerDeserializer(result.body);
}

/** Retrieve a hybrid runbook worker. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerId: string,
  options: HybridRunbookWorkersGetOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorker> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerId,
    options,
  );
  return _getDeserialize(result);
}
