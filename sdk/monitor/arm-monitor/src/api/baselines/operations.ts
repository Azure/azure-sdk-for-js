// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  _MetricBaselinesResponse,
  SingleMetricBaseline,
} from "../../models/microsoft/metricBaselines/models.js";
import {
  _metricBaselinesResponseDeserializer,
  metricBaselinesErrorResponseDeserializer,
} from "../../models/microsoft/metricBaselines/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BaselinesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: BaselinesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/metricBaselines{?api%2Dversion,metricnames,metricnamespace,timespan,interval,aggregation,sensitivities,%24filter,resultType}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2019-03-01",
      metricnames: options?.metricnames,
      metricnamespace: options?.metricnamespace,
      timespan: options?.timespan,
      interval: options?.interval,
      aggregation: options?.aggregation,
      sensitivities: options?.sensitivities,
      "%24filter": options?.filter,
      resultType: options?.resultType,
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
): Promise<_MetricBaselinesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = metricBaselinesErrorResponseDeserializer(result.body);

    throw error;
  }

  return _metricBaselinesResponseDeserializer(result.body);
}

/** **Lists the metric baseline values for a resource**. */
export function list(
  context: Client,
  resourceUri: string,
  options: BaselinesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SingleMetricBaseline> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-03-01" },
  );
}
