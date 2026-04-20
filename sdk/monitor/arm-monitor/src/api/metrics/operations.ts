// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import {
  errorContractDeserializer,
  commonErrorResponseDeserializer,
} from "../../models/microsoft/common/models.js";
import type { Response } from "../../models/microsoft/metrics/models.js";
import {
  responseDeserializer,
  subscriptionScopeMetricsRequestBodyParametersSerializer,
} from "../../models/microsoft/metrics/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricsListOptionalParams,
  MetricsListAtSubscriptionScopePostOptionalParams,
  MetricsListAtSubscriptionScopeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: MetricsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/metrics{?api%2Dversion,timespan,interval,metricnames,aggregation,top,orderby,%24filter,resultType,metricnamespace,AutoAdjustTimegrain,ValidateDimensions,rollupby}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2024-02-01",
      timespan: options?.timespan,
      interval: options?.interval,
      metricnames: options?.metricnames,
      aggregation: options?.aggregation,
      top: options?.top,
      orderby: options?.orderby,
      "%24filter": options?.filter,
      resultType: options?.resultType,
      metricnamespace: options?.metricnamespace,
      AutoAdjustTimegrain: options?.autoAdjustTimegrain,
      ValidateDimensions: options?.validateDimensions,
      rollupby: options?.rollupby,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return responseDeserializer(result.body);
}

/** **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
export async function list(
  context: Client,
  resourceUri: string,
  options: MetricsListOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _listSend(context, resourceUri, options);
  return _listDeserialize(result);
}

export function _listAtSubscriptionScopePostSend(
  context: Client,
  region: string,
  options: MetricsListAtSubscriptionScopePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/metrics{?api%2Dversion,region,timespan,interval,metricnames,aggregation,top,orderby,%24filter,resultType,metricnamespace,AutoAdjustTimegrain,ValidateDimensions,rollupby}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-02-01",
      region: region,
      timespan: options?.timespan,
      interval: options?.interval,
      metricnames: options?.metricnames,
      aggregation: options?.aggregation,
      top: options?.top,
      orderby: options?.orderby,
      "%24filter": options?.filter,
      resultType: options?.resultType,
      metricnamespace: options?.metricnamespace,
      AutoAdjustTimegrain: options?.autoAdjustTimegrain,
      ValidateDimensions: options?.validateDimensions,
      rollupby: options?.rollupby,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : subscriptionScopeMetricsRequestBodyParametersSerializer(options["body"]),
  });
}

export async function _listAtSubscriptionScopePostDeserialize(
  result: PathUncheckedResponse,
): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorContractDeserializer(result.body);

    throw error;
  }

  return responseDeserializer(result.body);
}

/** **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
export async function listAtSubscriptionScopePost(
  context: Client,
  region: string,
  options: MetricsListAtSubscriptionScopePostOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _listAtSubscriptionScopePostSend(context, region, options);
  return _listAtSubscriptionScopePostDeserialize(result);
}

export function _listAtSubscriptionScopeSend(
  context: Client,
  region: string,
  options: MetricsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/metrics{?api%2Dversion,region,timespan,interval,metricnames,aggregation,top,orderby,%24filter,resultType,metricnamespace,AutoAdjustTimegrain,ValidateDimensions,rollupby}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-02-01",
      region: region,
      timespan: options?.timespan,
      interval: options?.interval,
      metricnames: options?.metricnames,
      aggregation: options?.aggregation,
      top: options?.top,
      orderby: options?.orderby,
      "%24filter": options?.filter,
      resultType: options?.resultType,
      metricnamespace: options?.metricnamespace,
      AutoAdjustTimegrain: options?.autoAdjustTimegrain,
      ValidateDimensions: options?.validateDimensions,
      rollupby: options?.rollupby,
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
): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorContractDeserializer(result.body);

    throw error;
  }

  return responseDeserializer(result.body);
}

/** **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
export async function listAtSubscriptionScope(
  context: Client,
  region: string,
  options: MetricsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _listAtSubscriptionScopeSend(context, region, options);
  return _listAtSubscriptionScopeDeserialize(result);
}
