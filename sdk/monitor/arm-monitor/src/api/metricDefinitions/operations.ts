// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import {
  errorContractDeserializer,
  commonErrorResponseDeserializer,
} from "../../models/microsoft/common/models.js";
import type {
  _SubscriptionScopeMetricDefinitionCollection,
  SubscriptionScopeMetricDefinition,
  _MetricDefinitionCollection,
  MetricDefinition,
} from "../../models/microsoft/metrics/models.js";
import {
  _subscriptionScopeMetricDefinitionCollectionDeserializer,
  _metricDefinitionCollectionDeserializer,
} from "../../models/microsoft/metrics/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricDefinitionsListOptionalParams,
  MetricDefinitionsListAtSubscriptionScopeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: MetricDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/metricDefinitions{?api%2Dversion,metricnamespace}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2024-02-01",
      metricnamespace: options?.metricnamespace,
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
): Promise<_MetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _metricDefinitionCollectionDeserializer(result.body);
}

/** Lists the metric definitions for the resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: MetricDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-02-01" },
  );
}

export function _listAtSubscriptionScopeSend(
  context: Client,
  region: string,
  options: MetricDefinitionsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/metricDefinitions{?api%2Dversion,region,metricnamespace}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-02-01",
      region: region,
      metricnamespace: options?.metricnamespace,
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

export async function _listAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_SubscriptionScopeMetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorContractDeserializer(result.body);

    throw error;
  }

  return _subscriptionScopeMetricDefinitionCollectionDeserializer(result.body);
}

/** Lists the metric definitions for the subscription. */
export function listAtSubscriptionScope(
  context: Client,
  region: string,
  options: MetricDefinitionsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubscriptionScopeMetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtSubscriptionScopeSend(context, region, options),
    _listAtSubscriptionScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-02-01" },
  );
}
