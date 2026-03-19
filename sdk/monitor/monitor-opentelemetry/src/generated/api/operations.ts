// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QuickpulseContext as Client } from "./index.js";
import {
  monitoringDataPointSerializer,
  CollectionConfigurationInfo,
  collectionConfigurationInfoDeserializer,
  serviceErrorDeserializer,
  monitoringDataPointArraySerializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { PublishOptionalParams, IsSubscribedOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _publishSend(
  context: Client,
  ikey: string,
  options: PublishOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/QuickPulseService.svc/post{?api%2Dversion,ikey}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      ikey: ikey,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.configurationEtag !== undefined
          ? { "x-ms-qps-configuration-etag": options?.configurationEtag }
          : {}),
        ...(options?.transmissionTime !== undefined
          ? { "x-ms-qps-transmission-time": options?.transmissionTime }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options["monitoringDataPoints"]
        ? options["monitoringDataPoints"]
        : monitoringDataPointArraySerializer(options["monitoringDataPoints"]),
    });
}

export async function _publishDeserialize(
  result: PathUncheckedResponse,
): Promise<CollectionConfigurationInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = serviceErrorDeserializer(result.body);
    throw error;
  }

  return collectionConfigurationInfoDeserializer(result.body);
}

/** Publish live metrics to the Live Metrics service when there is an active subscription to the metrics. */
export async function publish(
  context: Client,
  ikey: string,
  options: PublishOptionalParams = { requestOptions: {} },
): Promise<CollectionConfigurationInfo> {
  const result = await _publishSend(context, ikey, options);
  return _publishDeserialize(result);
}

export function _isSubscribedSend(
  context: Client,
  ikey: string,
  options: IsSubscribedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/QuickPulseService.svc/ping{?api%2Dversion,ikey}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      ikey: ikey,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.transmissionTime !== undefined
          ? { "x-ms-qps-transmission-time": options?.transmissionTime }
          : {}),
        ...(options?.machineName !== undefined
          ? { "x-ms-qps-machine-name": options?.machineName }
          : {}),
        ...(options?.instanceName !== undefined
          ? { "x-ms-qps-instance-name": options?.instanceName }
          : {}),
        ...(options?.streamId !== undefined ? { "x-ms-qps-stream-id": options?.streamId } : {}),
        ...(options?.roleName !== undefined ? { "x-ms-qps-role-name": options?.roleName } : {}),
        ...(options?.invariantVersion !== undefined
          ? { "x-ms-qps-invariant-version": options?.invariantVersion }
          : {}),
        ...(options?.configurationEtag !== undefined
          ? { "x-ms-qps-configuration-etag": options?.configurationEtag }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options["monitoringDataPoint"]
        ? options["monitoringDataPoint"]
        : monitoringDataPointSerializer(options["monitoringDataPoint"]),
    });
}

export async function _isSubscribedDeserialize(
  result: PathUncheckedResponse,
): Promise<CollectionConfigurationInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = serviceErrorDeserializer(result.body);
    throw error;
  }

  return collectionConfigurationInfoDeserializer(result.body);
}

/** Determine whether there is any subscription to the metrics and documents. */
export async function isSubscribed(
  context: Client,
  ikey: string,
  options: IsSubscribedOptionalParams = { requestOptions: {} },
): Promise<CollectionConfigurationInfo> {
  const result = await _isSubscribedSend(context, ikey, options);
  return _isSubscribedDeserialize(result);
}
