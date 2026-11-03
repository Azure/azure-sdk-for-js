// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  MicrosoftEntraAdministrator,
  MicrosoftEntraAdministratorAdd,
  _MicrosoftEntraAdministratorListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  microsoftEntraAdministratorDeserializer,
  microsoftEntraAdministratorAddSerializer,
  _microsoftEntraAdministratorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MicrosoftEntraAdministratorsListOptionalParams,
  MicrosoftEntraAdministratorsDeleteOptionalParams,
  MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams,
  MicrosoftEntraAdministratorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MicrosoftEntraAdministratorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_MicrosoftEntraAdministratorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _microsoftEntraAdministratorListResultDeserializer(result.body);
}

/** Lists the PostgreSQL roles in a cluster that are members of azure_pg_admin and mapped to Microsoft Entra principals. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MicrosoftEntraAdministratorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftEntraAdministrator> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  options: MicrosoftEntraAdministratorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

/** Deletes a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  options: MicrosoftEntraAdministratorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, objectId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  resource: MicrosoftEntraAdministratorAdd,
  options: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftEntraAdministratorAddSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftEntraAdministrator> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return microsoftEntraAdministratorDeserializer(result.body);
}

/** Creates or replaces a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  resource: MicrosoftEntraAdministratorAdd,
  options: MicrosoftEntraAdministratorsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MicrosoftEntraAdministrator>, MicrosoftEntraAdministrator> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, objectId, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<MicrosoftEntraAdministrator>, MicrosoftEntraAdministrator>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  options: MicrosoftEntraAdministratorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<MicrosoftEntraAdministrator> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return microsoftEntraAdministratorDeserializer(result.body);
}

/** Gets information about a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  objectId: string,
  options: MicrosoftEntraAdministratorsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftEntraAdministrator> {
  const result = await _getSend(context, resourceGroupName, clusterName, objectId, options);
  return _getDeserialize(result);
}
