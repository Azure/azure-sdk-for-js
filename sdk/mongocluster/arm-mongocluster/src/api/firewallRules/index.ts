// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  firewallRulePropertiesSerializer,
  FirewallRule,
  _FirewallRuleListResult,
} from "../../models/models.js";
import { DocumentDBContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FirewallRulesGetOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesListByMongoClusterOptionalParams,
} from "../../models/options.js";

export function _firewallRulesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  options: FirewallRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
      firewallRuleName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _firewallRulesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          startIpAddress: result.body.properties?.["startIpAddress"],
          endIpAddress: result.body.properties?.["endIpAddress"],
        },
  };
}

/** Gets information about a mongo cluster firewall rule. */
export async function firewallRulesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  options: FirewallRulesGetOptionalParams = { requestOptions: {} },
): Promise<FirewallRule> {
  const result = await _firewallRulesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    mongoClusterName,
    firewallRuleName,
    options,
  );
  return _firewallRulesGetDeserialize(result);
}

export function _firewallRulesCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  resource: FirewallRule,
  options: FirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
      firewallRuleName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : firewallRulePropertiesSerializer(resource.properties),
      },
    });
}

export async function _firewallRulesCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          startIpAddress: result.body.properties?.["startIpAddress"],
          endIpAddress: result.body.properties?.["endIpAddress"],
        },
  };
}

/** Creates a new firewall rule or updates an existing firewall rule on a mongo cluster. */
export function firewallRulesCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  resource: FirewallRule,
  options: FirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirewallRule>, FirewallRule> {
  return getLongRunningPoller(
    context,
    _firewallRulesCreateOrUpdateDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _firewallRulesCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          mongoClusterName,
          firewallRuleName,
          resource,
          options,
        ),
    },
  ) as PollerLike<OperationState<FirewallRule>, FirewallRule>;
}

export function _firewallRulesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  options: FirewallRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
      firewallRuleName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _firewallRulesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a mongo cluster firewall rule. */
export function firewallRulesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  firewallRuleName: string,
  options: FirewallRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _firewallRulesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _firewallRulesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          mongoClusterName,
          firewallRuleName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _firewallRulesListByMongoClusterSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: FirewallRulesListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules",
      subscriptionId,
      resourceGroupName,
      mongoClusterName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _firewallRulesListByMongoClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirewallRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              provisioningState: p.properties?.["provisioningState"],
              startIpAddress: p.properties?.["startIpAddress"],
              endIpAddress: p.properties?.["endIpAddress"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List all the firewall rules in a given mongo cluster. */
export function firewallRulesListByMongoCluster(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  mongoClusterName: string,
  options: FirewallRulesListByMongoClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FirewallRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _firewallRulesListByMongoClusterSend(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    _firewallRulesListByMongoClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
