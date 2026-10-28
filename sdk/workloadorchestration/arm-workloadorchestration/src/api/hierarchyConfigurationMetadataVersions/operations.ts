// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  HierarchyConfigurationMetadataVersion,
  _HierarchyConfigurationMetadataVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hierarchyConfigurationMetadataVersionDeserializer,
  _hierarchyConfigurationMetadataVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HierarchyConfigurationMetadataVersionsListByParentOptionalParams,
  HierarchyConfigurationMetadataVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceUri: string,
  hierarchyConfigurationMetadataName: string,
  options: HierarchyConfigurationMetadataVersionsListByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/hierarchyConfigurationMetadatas/{hierarchyConfigurationMetadataName}/versions{?api%2Dversion}",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HierarchyConfigurationMetadataVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hierarchyConfigurationMetadataVersionListResultDeserializer(result.body);
}

/** List Hierarchy Configuration Metadata Version resources */
export function listByParent(
  context: Client,
  resourceUri: string,
  hierarchyConfigurationMetadataName: string,
  options: HierarchyConfigurationMetadataVersionsListByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<HierarchyConfigurationMetadataVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceUri, hierarchyConfigurationMetadataName, options),
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
  hierarchyConfigurationMetadataVersionName: string,
  options: HierarchyConfigurationMetadataVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Edge/hierarchyConfigurationMetadatas/{hierarchyConfigurationMetadataName}/versions/{hierarchyConfigurationMetadataVersionName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      hierarchyConfigurationMetadataName: hierarchyConfigurationMetadataName,
      hierarchyConfigurationMetadataVersionName: hierarchyConfigurationMetadataVersionName,
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
): Promise<HierarchyConfigurationMetadataVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hierarchyConfigurationMetadataVersionDeserializer(result.body);
}

/** Get a Hierarchy Configuration Metadata Version resource */
export async function get(
  context: Client,
  resourceUri: string,
  hierarchyConfigurationMetadataName: string,
  hierarchyConfigurationMetadataVersionName: string,
  options: HierarchyConfigurationMetadataVersionsGetOptionalParams = { requestOptions: {} },
): Promise<HierarchyConfigurationMetadataVersion> {
  const result = await _getSend(
    context,
    resourceUri,
    hierarchyConfigurationMetadataName,
    hierarchyConfigurationMetadataVersionName,
    options,
  );
  return _getDeserialize(result);
}
