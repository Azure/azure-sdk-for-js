// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  UpgradeInsight,
  _UpgradeInsightListResult,
  GenerateUpgradeInsightsContentUnion,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  upgradeInsightDeserializer,
  _upgradeInsightListResultDeserializer,
  generateUpgradeInsightsContentUnionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UpgradeInsightsGenerateOptionalParams,
  UpgradeInsightsListOptionalParams,
  UpgradeInsightsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _generateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: GenerateUpgradeInsightsContentUnion,
  options: UpgradeInsightsGenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/generateUpgradeInsights{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-08-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateUpgradeInsightsContentUnionSerializer(body),
  });
}

export async function _generateDeserialize(result: PathUncheckedResponse): Promise<UpgradeInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return upgradeInsightDeserializer(result.body);
}

/**
 * Generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 */
export async function generate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: GenerateUpgradeInsightsContentUnion,
  options: UpgradeInsightsGenerateOptionalParams = { requestOptions: {} },
): Promise<UpgradeInsight> {
  const result = await _generateSend(context, resourceGroupName, resourceName, body, options);
  return _generateDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UpgradeInsightsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeInsights{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-08-02-preview",
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
): Promise<_UpgradeInsightListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _upgradeInsightListResultDeserializer(result.body);
}

/**
 * Lists the stored upgrade insights for the specified managed cluster, one entry per
 * scope that has been generated and not yet expired. This is a read-only operation and
 * does not regenerate any evaluation.
 */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UpgradeInsightsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpgradeInsight> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-02-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  upgradeInsightName: string,
  options: UpgradeInsightsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeInsights/{upgradeInsightName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      upgradeInsightName: upgradeInsightName,
      "api%2Dversion": context.apiVersion ?? "2026-08-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UpgradeInsight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return upgradeInsightDeserializer(result.body);
}

/**
 * Gets a stored upgrade insight for the managed cluster by its server-generated name.
 * This is a read-only operation: it returns the most recently generated readiness
 * evaluation for that scope from the data store, including the detected
 * upgrade-blocking issues and contextual upgrade information. It does not regenerate
 * the evaluation. If no non-expired evaluation exists for the name, it returns 404.
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  upgradeInsightName: string,
  options: UpgradeInsightsGetOptionalParams = { requestOptions: {} },
): Promise<UpgradeInsight> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    upgradeInsightName,
    options,
  );
  return _getDeserialize(result);
}
