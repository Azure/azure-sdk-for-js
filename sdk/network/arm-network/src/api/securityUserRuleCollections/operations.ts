// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { SecurityUserRuleCollection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  securityUserRuleCollectionSerializer,
  securityUserRuleCollectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _SecurityUserRuleCollectionListResult } from "../../models/models.js";
import { _securityUserRuleCollectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityUserRuleCollectionsListOptionalParams,
  SecurityUserRuleCollectionsDeleteOptionalParams,
  SecurityUserRuleCollectionsCreateOrUpdateOptionalParams,
  SecurityUserRuleCollectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  options: SecurityUserRuleCollectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      configurationName: configurationName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_SecurityUserRuleCollectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityUserRuleCollectionListResultDeserializer(result.body);
}

/** Lists all the security user rule collections in a security configuration, in a paginated format. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  options: SecurityUserRuleCollectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityUserRuleCollection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, configurationName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  options: SecurityUserRuleCollectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}{?api%2Dversion,force}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      configurationName: configurationName,
      ruleCollectionName: ruleCollectionName,
      "api%2Dversion": "2025-05-01",
      force: options?.force,
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a Security User Rule collection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  options: SecurityUserRuleCollectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        ruleCollectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  securityUserRuleCollection: SecurityUserRuleCollection,
  options: SecurityUserRuleCollectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      configurationName: configurationName,
      ruleCollectionName: ruleCollectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityUserRuleCollectionSerializer(securityUserRuleCollection),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityUserRuleCollection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityUserRuleCollectionDeserializer(result.body);
}

/** Creates or updates a security user rule collection. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  securityUserRuleCollection: SecurityUserRuleCollection,
  options: SecurityUserRuleCollectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SecurityUserRuleCollection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    securityUserRuleCollection,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  options: SecurityUserRuleCollectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      configurationName: configurationName,
      ruleCollectionName: ruleCollectionName,
      "api%2Dversion": "2025-05-01",
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
): Promise<SecurityUserRuleCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityUserRuleCollectionDeserializer(result.body);
}

/** Gets a network manager security user configuration rule collection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  configurationName: string,
  ruleCollectionName: string,
  options: SecurityUserRuleCollectionsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityUserRuleCollection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    options,
  );
  return _getDeserialize(result);
}
