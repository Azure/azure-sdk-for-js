// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionTypesContext as Client } from "../index.js";
import type {
  ExtensionType,
  _ExtensionTypesList,
  ExtensionTypeVersionForReleaseTrain,
  _ExtensionTypeVersionsList,
} from "../../models/models.js";
import {
  extensionTypeDeserializer,
  errorResponseDeserializer,
  _extensionTypesListDeserializer,
  extensionTypeVersionForReleaseTrainDeserializer,
  _extensionTypeVersionsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExtensionTypesClusterListVersionsOptionalParams,
  ExtensionTypesClusterGetVersionOptionalParams,
  ExtensionTypesListVersionsOptionalParams,
  ExtensionTypesGetVersionOptionalParams,
  ExtensionTypesListOptionalParams,
  ExtensionTypesGetOptionalParams,
  ExtensionTypesLocationListOptionalParams,
  ExtensionTypesLocationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _clusterListVersionsSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  options: ExtensionTypesClusterListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensionTypes/{extensionTypeName}/versions{?api%2Dversion,releaseTrain,majorVersion,showLatest}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionTypeName: extensionTypeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
      releaseTrain: options?.releaseTrain,
      majorVersion: options?.majorVersion,
      showLatest: options?.showLatest,
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

export async function _clusterListVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtensionTypeVersionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _extensionTypeVersionsListDeserializer(result.body);
}

/** List the version for an Extension Type installable to the cluster. */
export function clusterListVersions(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  options: ExtensionTypesClusterListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionTypeVersionForReleaseTrain> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _clusterListVersionsSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionTypeName,
        options,
      ),
    _clusterListVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _clusterGetVersionSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  versionNumber: string,
  options: ExtensionTypesClusterGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensionTypes/{extensionTypeName}/versions/{versionNumber}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionTypeName: extensionTypeName,
      versionNumber: versionNumber,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _clusterGetVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtensionTypeVersionForReleaseTrain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionTypeVersionForReleaseTrainDeserializer(result.body);
}

/** Get details of a version for an Extension Type installable to the cluster. */
export async function clusterGetVersion(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  versionNumber: string,
  options: ExtensionTypesClusterGetVersionOptionalParams = { requestOptions: {} },
): Promise<ExtensionTypeVersionForReleaseTrain> {
  const result = await _clusterGetVersionSend(
    context,
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionTypeName,
    versionNumber,
    options,
  );
  return _clusterGetVersionDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  location: string,
  extensionTypeName: string,
  options: ExtensionTypesListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KubernetesConfiguration/locations/{location}/extensionTypes/{extensionTypeName}/versions{?api%2Dversion,releaseTrain,clusterType,majorVersion,showLatest}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      extensionTypeName: extensionTypeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
      releaseTrain: options?.releaseTrain,
      clusterType: options?.clusterType,
      majorVersion: options?.majorVersion,
      showLatest: options?.showLatest,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtensionTypeVersionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _extensionTypeVersionsListDeserializer(result.body);
}

/** List the versions for an extension type and location. */
export function listVersions(
  context: Client,
  location: string,
  extensionTypeName: string,
  options: ExtensionTypesListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionTypeVersionForReleaseTrain> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, location, extensionTypeName, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _getVersionSend(
  context: Client,
  location: string,
  extensionTypeName: string,
  versionNumber: string,
  options: ExtensionTypesGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KubernetesConfiguration/locations/{location}/extensionTypes/{extensionTypeName}/versions/{versionNumber}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      extensionTypeName: extensionTypeName,
      versionNumber: versionNumber,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtensionTypeVersionForReleaseTrain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionTypeVersionForReleaseTrainDeserializer(result.body);
}

/** Get details of a version for an extension type and location */
export async function getVersion(
  context: Client,
  location: string,
  extensionTypeName: string,
  versionNumber: string,
  options: ExtensionTypesGetVersionOptionalParams = { requestOptions: {} },
): Promise<ExtensionTypeVersionForReleaseTrain> {
  const result = await _getVersionSend(
    context,
    location,
    extensionTypeName,
    versionNumber,
    options,
  );
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: ExtensionTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensionTypes{?api%2Dversion,publisherId,offerId,planId,releaseTrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
      publisherId: options?.publisherId,
      offerId: options?.offerId,
      planId: options?.planId,
      releaseTrain: options?.releaseTrain,
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
): Promise<_ExtensionTypesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _extensionTypesListDeserializer(result.body);
}

/** List installable Extension Types for the cluster based region and type for the cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: ExtensionTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionType> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  options: ExtensionTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensionTypes/{extensionTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionTypeName: extensionTypeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExtensionType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionTypeDeserializer(result.body);
}

/** Get an Extension Type installable to the cluster based region and type for the cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionTypeName: string,
  options: ExtensionTypesGetOptionalParams = { requestOptions: {} },
): Promise<ExtensionType> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionTypeName,
    options,
  );
  return _getDeserialize(result);
}

export function _locationListSend(
  context: Client,
  location: string,
  options: ExtensionTypesLocationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KubernetesConfiguration/locations/{location}/extensionTypes{?api%2Dversion,publisherId,offerId,planId,releaseTrain,clusterType}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
      publisherId: options?.publisherId,
      offerId: options?.offerId,
      planId: options?.planId,
      releaseTrain: options?.releaseTrain,
      clusterType: options?.clusterType,
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

export async function _locationListDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtensionTypesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _extensionTypesListDeserializer(result.body);
}

/** List all Extension Types for the location. */
export function locationList(
  context: Client,
  location: string,
  options: ExtensionTypesLocationListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExtensionType> {
  return buildPagedAsyncIterator(
    context,
    () => _locationListSend(context, location, options),
    _locationListDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-11-01-preview",
    },
  );
}

export function _locationGetSend(
  context: Client,
  location: string,
  extensionTypeName: string,
  options: ExtensionTypesLocationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KubernetesConfiguration/locations/{location}/extensionTypes/{extensionTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      extensionTypeName: extensionTypeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _locationGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtensionType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionTypeDeserializer(result.body);
}

/** Get an extension type for the location. */
export async function locationGet(
  context: Client,
  location: string,
  extensionTypeName: string,
  options: ExtensionTypesLocationGetOptionalParams = { requestOptions: {} },
): Promise<ExtensionType> {
  const result = await _locationGetSend(context, location, extensionTypeName, options);
  return _locationGetDeserialize(result);
}
