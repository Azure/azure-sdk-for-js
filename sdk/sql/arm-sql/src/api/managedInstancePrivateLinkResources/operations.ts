// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ManagedInstancePrivateLink,
  _ManagedInstancePrivateLinkListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstancePrivateLinkDeserializer,
  _managedInstancePrivateLinkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams,
  ManagedInstancePrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstancePrivateLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstancePrivateLinkListResultDeserializer(result.body);
}

/** Gets the private link resources for SQL server. */
export function listByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstancePrivateLink> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByManagedInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  groupName: string,
  options: ManagedInstancePrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateLinkResources/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedInstancePrivateLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstancePrivateLinkDeserializer(result.body);
}

/** Gets a private link resource for SQL server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  groupName: string,
  options: ManagedInstancePrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedInstancePrivateLink> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    groupName,
    options,
  );
  return _getDeserialize(result);
}
