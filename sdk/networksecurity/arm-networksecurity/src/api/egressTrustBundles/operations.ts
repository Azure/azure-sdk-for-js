// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type { EgressTrustBundle } from "../../models/microsoft/networkSecurity/models.js";
import { egressTrustBundleDeserializer } from "../../models/microsoft/networkSecurity/models.js";
import type { _EgressTrustBundleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _egressTrustBundleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EgressTrustBundlesListByParentOptionalParams,
  EgressTrustBundlesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: EgressTrustBundlesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/egressTrustBundles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_EgressTrustBundleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _egressTrustBundleListResultDeserializer(result.body);
}

/**
 * Lists the egress TLS-inspection trust bundles for the fabric. The bundle is a singleton,
 * so this returns the single `default` bundle. It exists because Azure Policy cannot
 * populate compliance data for a resource type that has no collection GET.
 */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: EgressTrustBundlesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EgressTrustBundle> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, agentFabricName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: EgressTrustBundlesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/agentFabrics/{agentFabricName}/egressTrustBundles/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentFabricName: agentFabricName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EgressTrustBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return egressTrustBundleDeserializer(result.body);
}

/**
 * Gets the egress TLS-inspection trust bundle for the fabric.
 *
 * The bundle changes rarely, so callers are expected to cache it for the advertised
 * validity period rather than reading it per workload. To decide whether a cached copy is
 * still current, compare `bundleVersion`: it is derived from the anchor set, so it changes
 * exactly when the anchors change and is stable otherwise. Every read returns the full
 * bundle together with refreshed cache metadata.
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentFabricName: string,
  options: EgressTrustBundlesGetOptionalParams = { requestOptions: {} },
): Promise<EgressTrustBundle> {
  const result = await _getSend(context, resourceGroupName, agentFabricName, options);
  return _getDeserialize(result);
}
