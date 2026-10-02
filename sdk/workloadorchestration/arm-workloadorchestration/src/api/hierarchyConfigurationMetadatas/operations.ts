// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  HierarchyConfigurationMetadata,
  _HierarchyConfigurationMetadataListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hierarchyConfigurationMetadataDeserializer,
  _hierarchyConfigurationMetadataListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HierarchyConfigurationMetadatasListByParentOptionalParams,
  HierarchyConfigurationMetadatasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceUri: string,
  options: HierarchyConfigurationMetadatasListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/hierarchyConfigurationMetadatas{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HierarchyConfigurationMetadataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hierarchyConfigurationMetadataListResultDeserializer(result.body);
}

/** List Solution resources */
export function listByParent(
  context: Client,
  resourceUri: string,
  options: HierarchyConfigurationMetadatasListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HierarchyConfigurationMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceUri, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  hierarchyConfigurationMetadataName: string,
  options: HierarchyConfigurationMetadatasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/hierarchyConfigurationMetadatas/{hierarchyConfigurationMetadataName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      hierarchyConfigurationMetadataName: hierarchyConfigurationMetadataName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<HierarchyConfigurationMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hierarchyConfigurationMetadataDeserializer(result.body);
}

/** Get a Hierarchy Configuration Metadata resource */
export async function get(
  context: Client,
  resourceUri: string,
  hierarchyConfigurationMetadataName: string,
  options: HierarchyConfigurationMetadatasGetOptionalParams = { requestOptions: {} },
): Promise<HierarchyConfigurationMetadata> {
  const result = await _getSend(context, resourceUri, hierarchyConfigurationMetadataName, options);
  return _getDeserialize(result);
}
