// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  AzureBackupJobResource,
  _AzureBackupJobResourceList,
  _azureBackupJobResourceListDeserializer,
  CrossRegionRestoreJobsRequest,
  crossRegionRestoreJobsRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FetchCrossRegionRestoreJobsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreJobsRequest,
  options: FetchCrossRegionRestoreJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJobs{?api%2Dversion,%24filter}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      "%24filter": options?.filter,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: crossRegionRestoreJobsRequestSerializer(parameters),
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureBackupJobResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
  options: FetchCrossRegionRestoreJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureBackupJobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, location, parameters, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}
