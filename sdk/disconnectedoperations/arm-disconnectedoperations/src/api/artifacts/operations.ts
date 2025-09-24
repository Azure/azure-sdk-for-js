// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsManagementContext as Client } from "../index.js";
import type { _ArtifactListResult, Artifact, ArtifactDownloadResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _artifactListResultDeserializer,
  artifactDeserializer,
  artifactDownloadResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ArtifactsListDownloadUriOptionalParams,
  ArtifactsGetOptionalParams,
  ArtifactsListByParentOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listDownloadUriSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  artifactName: string,
  options: ArtifactsListDownloadUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts/{artifactName}/listDownloadUri{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      imageName: imageName,
      artifactName: artifactName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDownloadUriDeserialize(
  result: PathUncheckedResponse,
): Promise<ArtifactDownloadResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return artifactDownloadResultDeserializer(result.body);
}

/** Get artifact download link. */
export async function listDownloadUri(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  artifactName: string,
  options: ArtifactsListDownloadUriOptionalParams = { requestOptions: {} },
): Promise<ArtifactDownloadResult> {
  const result = await _listDownloadUriSend(
    context,
    resourceGroupName,
    name,
    imageName,
    artifactName,
    options,
  );
  return _listDownloadUriDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  artifactName: string,
  options: ArtifactsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts/{artifactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      imageName: imageName,
      artifactName: artifactName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Artifact> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return artifactDeserializer(result.body);
}

/** Get the resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  artifactName: string,
  options: ArtifactsGetOptionalParams = { requestOptions: {} },
): Promise<Artifact> {
  const result = await _getSend(context, resourceGroupName, name, imageName, artifactName, options);
  return _getDeserialize(result);
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ArtifactsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      imageName: imageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ArtifactListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _artifactListResultDeserializer(result.body);
}

/** List by parent */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ArtifactsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Artifact> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, name, imageName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
