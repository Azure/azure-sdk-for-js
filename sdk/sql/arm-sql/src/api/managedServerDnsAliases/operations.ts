// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ManagedServerDnsAlias,
  ManagedServerDnsAliasCreation,
  _ManagedServerDnsAliasListResult,
  ManagedServerDnsAliasAcquisition,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedServerDnsAliasDeserializer,
  managedServerDnsAliasCreationSerializer,
  _managedServerDnsAliasListResultDeserializer,
  managedServerDnsAliasAcquisitionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedServerDnsAliasesAcquireOptionalParams,
  ManagedServerDnsAliasesListByManagedInstanceOptionalParams,
  ManagedServerDnsAliasesDeleteOptionalParams,
  ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
  ManagedServerDnsAliasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _acquireSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  parameters: ManagedServerDnsAliasAcquisition,
  options: ManagedServerDnsAliasesAcquireOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}/acquire{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dnsAliasName: dnsAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedServerDnsAliasAcquisitionSerializer(parameters),
  });
}

export async function _acquireDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedServerDnsAlias> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedServerDnsAliasDeserializer(result.body);
}

/** Acquires managed server DNS alias from another managed server. */
export function acquire(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  parameters: ManagedServerDnsAliasAcquisition,
  options: ManagedServerDnsAliasesAcquireOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias> {
  return getLongRunningPoller(context, _acquireDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _acquireSend(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>;
}

export function _listByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedServerDnsAliasesListByManagedInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedServerDnsAliasListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedServerDnsAliasListResultDeserializer(result.body);
}

/** Gets a list of managed server DNS aliases for a managed server. */
export function listByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedServerDnsAliasesListByManagedInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedServerDnsAlias> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByManagedInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  options: ManagedServerDnsAliasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dnsAliasName: dnsAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the managed server DNS alias with the given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  options: ManagedServerDnsAliasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, managedInstanceName, dnsAliasName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  parameters: ManagedServerDnsAliasCreation,
  options: ManagedServerDnsAliasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dnsAliasName: dnsAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedServerDnsAliasCreationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedServerDnsAlias> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedServerDnsAliasDeserializer(result.body);
}

/** Creates a managed server DNS alias. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  parameters: ManagedServerDnsAliasCreation,
  options: ManagedServerDnsAliasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  options: ManagedServerDnsAliasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dnsAliasName: dnsAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedServerDnsAlias> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedServerDnsAliasDeserializer(result.body);
}

/** Gets a server DNS alias. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dnsAliasName: string,
  options: ManagedServerDnsAliasesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedServerDnsAlias> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    dnsAliasName,
    options,
  );
  return _getDeserialize(result);
}
