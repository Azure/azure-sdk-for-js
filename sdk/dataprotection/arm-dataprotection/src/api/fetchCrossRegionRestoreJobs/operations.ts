// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  AzureBackupJobResource,
  _AzureBackupJobResourceList,
  CrossRegionRestoreJobsRequest,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _azureBackupJobResourceListDeserializer,
  crossRegionRestoreJobsRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FetchCrossRegionRestoreJobsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreJobsRequest,
  options: FetchCrossRegionRestoreJobsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJobs{?api%2Dversion,%24filter}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
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
    body: crossRegionRestoreJobsRequestSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureBackupJobResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _azureBackupJobResourceListDeserializer(result.body);
}

/** Fetches list of Cross Region Restore job belonging to the vault */
export function list(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreJobsRequest,
  options: FetchCrossRegionRestoreJobsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AzureBackupJobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, location, parameters, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
