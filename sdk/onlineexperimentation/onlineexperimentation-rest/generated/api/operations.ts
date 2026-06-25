// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationContext as Client } from "./index.js";
import {
  ExperimentMetric,
  experimentMetricSerializer,
  experimentMetricDeserializer,
  ExperimentMetricValidationResult,
  experimentMetricValidationResultDeserializer,
  _PagedExperimentMetric,
  _pagedExperimentMetricDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  ListMetricsOptionalParams,
  DeleteMetricOptionalParams,
  ValidateMetricOptionalParams,
  CreateOrUpdateMetricOptionalParams,
  GetMetricOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listMetricsSend(
  context: Client,
  options: ListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/experiment-metrics{?api%2Dversion,top,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedExperimentMetric> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedExperimentMetricDeserializer(result.body);
}

/** Lists experiment metrics. */
export function listMetrics(
  context: Client,
  options: ListMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExperimentMetric> {
  return buildPagedAsyncIterator(
    context,
    () => _listMetricsSend(context, options),
    _listMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-31-preview",
    },
  );
}

export function _deleteMetricSend(
  context: Client,
  experimentMetricId: string,
  options: DeleteMetricOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/experiment-metrics/{experimentMetricId}{?api%2Dversion}",
    {
      experimentMetricId: experimentMetricId,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteMetricDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes an experiment metric. */
export async function deleteMetric(
  context: Client,
  experimentMetricId: string,
  options: DeleteMetricOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteMetricSend(context, experimentMetricId, options);
  return _deleteMetricDeserialize(result);
}

export function _validateMetricSend(
  context: Client,
  body: ExperimentMetric,
  options: ValidateMetricOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/experiment-metrics:validate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: experimentMetricSerializer(body),
    });
}

export async function _validateMetricDeserialize(
  result: PathUncheckedResponse,
): Promise<ExperimentMetricValidationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return experimentMetricValidationResultDeserializer(result.body);
}

/** Validates an experiment metric definition. */
export async function validateMetric(
  context: Client,
  body: ExperimentMetric,
  options: ValidateMetricOptionalParams = { requestOptions: {} },
): Promise<ExperimentMetricValidationResult> {
  const result = await _validateMetricSend(context, body, options);
  return _validateMetricDeserialize(result);
}

export function _createOrUpdateMetricSend(
  context: Client,
  experimentMetricId: string,
  resource: ExperimentMetric,
  options: CreateOrUpdateMetricOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/experiment-metrics/{experimentMetricId}{?api%2Dversion}",
    {
      experimentMetricId: experimentMetricId,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: experimentMetricSerializer(resource),
    });
}

export async function _createOrUpdateMetricDeserialize(
  result: PathUncheckedResponse,
): Promise<ExperimentMetric> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return experimentMetricDeserializer(result.body);
}

/** Creates or updates an experiment metric. */
export async function createOrUpdateMetric(
  context: Client,
  experimentMetricId: string,
  resource: ExperimentMetric,
  options: CreateOrUpdateMetricOptionalParams = { requestOptions: {} },
): Promise<ExperimentMetric> {
  const result = await _createOrUpdateMetricSend(context, experimentMetricId, resource, options);
  return _createOrUpdateMetricDeserialize(result);
}

export function _getMetricSend(
  context: Client,
  experimentMetricId: string,
  options: GetMetricOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/experiment-metrics/{experimentMetricId}{?api%2Dversion}",
    {
      experimentMetricId: experimentMetricId,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMetricDeserialize(
  result: PathUncheckedResponse,
): Promise<ExperimentMetric> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return experimentMetricDeserializer(result.body);
}

/** Fetches an experiment metric by ID. */
export async function getMetric(
  context: Client,
  experimentMetricId: string,
  options: GetMetricOptionalParams = { requestOptions: {} },
): Promise<ExperimentMetric> {
  const result = await _getMetricSend(context, experimentMetricId, options);
  return _getMetricDeserialize(result);
}
