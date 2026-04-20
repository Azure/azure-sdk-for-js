// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  _MicrosoftMetricsMetricNamespaceCollection,
  MicrosoftMetricsMetricNamespace,
} from "../../models/microsoft/metrics/models.js";
import {
  _microsoftMetricsMetricNamespaceCollectionDeserializer,
  microsoftMetricsErrorResponseDeserializer,
} from "../../models/microsoft/metrics/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MetricNamespacesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: MetricNamespacesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/microsoft.insights/metricNamespaces{?api%2Dversion,startTime}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2024-02-01",
      startTime: options?.startTime,
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
): Promise<_MicrosoftMetricsMetricNamespaceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftMetricsMetricNamespaceCollectionDeserializer(result.body);
}

/** Lists the metric namespaces for the resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: MetricNamespacesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftMetricsMetricNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-02-01" },
  );
}
