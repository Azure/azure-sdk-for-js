// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetricsContext as Client } from "./index.js";
import type { ResourceIdList, MetricResultsResponse } from "../models/models.js";
import {
  resourceIdListSerializer,
  metricResultsResponseDeserializer,
  errorResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { QueryResourcesOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _queryResourcesSend(
  context: Client,
  subscriptionId: string,
  metricNamespace: string,
  metricNames: string[],
  batchRequest: ResourceIdList,
  options: QueryResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/metrics:getBatch{?api%2Dversion,starttime,endtime,interval,metricnamespace,metricnames,aggregation,top,orderby,filter,rollupby}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion,
      starttime: options?.startTime,
      endtime: options?.endTime,
      interval: options?.interval,
      metricnamespace: metricNamespace,
      metricnames: metricNames.map((p: any) => {
        return p;
      }),
      aggregation: options?.aggregation,
      top: options?.top,
      orderby: options?.orderBy,
      filter: options?.filter,
      rollupby: options?.rollUpBy,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: resourceIdListSerializer(batchRequest),
  });
}

export async function _queryResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricResultsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return metricResultsResponseDeserializer(result.body);
}

/** Lists the metric values for multiple resources. */
export async function queryResources(
  context: Client,
  subscriptionId: string,
  metricNamespace: string,
  metricNames: string[],
  batchRequest: ResourceIdList,
  options: QueryResourcesOptionalParams = { requestOptions: {} },
): Promise<MetricResultsResponse> {
  const result = await _queryResourcesSend(
    context,
    subscriptionId,
    metricNamespace,
    metricNames,
    batchRequest,
    options,
  );
  return _queryResourcesDeserialize(result);
}
