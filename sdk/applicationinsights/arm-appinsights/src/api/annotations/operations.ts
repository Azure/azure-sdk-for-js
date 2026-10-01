// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  _AnnotationsListResult,
  _annotationsListResultDeserializer,
  annotationArrayDeserializer,
  Annotation,
  annotationSerializer,
  annotationErrorDeserializer,
} from "../../models/componentAPIs/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AnnotationsGetOptionalParams,
  AnnotationsDeleteOptionalParams,
  AnnotationsCreateOptionalParams,
  AnnotationsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationId: string,
  options: AnnotationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      annotationId: annotationId,
      "api%2Dversion": "2015-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Annotation[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = annotationErrorDeserializer(result.body);

    throw error;
  }

  return annotationArrayDeserializer(result.body);
}

/** Get the annotation for given id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationId: string,
  options: AnnotationsGetOptionalParams = { requestOptions: {} },
): Promise<Annotation[]> {
  const result = await _getSend(context, resourceGroupName, resourceName, annotationId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationId: string,
  options: AnnotationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      annotationId: annotationId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an Annotation of an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationId: string,
  options: AnnotationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    annotationId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationProperties: Annotation,
  options: AnnotationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: annotationSerializer(annotationProperties),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Annotation[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = annotationErrorDeserializer(result.body);

    throw error;
  }

  return annotationArrayDeserializer(result.body);
}

/** Create an Annotation of an Application Insights component. */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  annotationProperties: Annotation,
  options: AnnotationsCreateOptionalParams = { requestOptions: {} },
): Promise<Annotation[]> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    annotationProperties,
    options,
  );
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  start: string,
  end: string,
  options: AnnotationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations{?api%2Dversion,start,end}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
      start: start,
      end: end,
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
): Promise<_AnnotationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = annotationErrorDeserializer(result.body);

    throw error;
  }

  return _annotationsListResultDeserializer(result.body);
}

/** Gets the list of annotations for a component for given time range */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  start: string,
  end: string,
  options: AnnotationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Annotation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, start, end, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-05-01" },
  );
}
