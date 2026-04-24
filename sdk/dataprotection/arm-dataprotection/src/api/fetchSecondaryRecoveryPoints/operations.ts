// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  AzureBackupRecoveryPointResource,
  _AzureBackupRecoveryPointResourceList,
  FetchSecondaryRPsRequestParameters,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _azureBackupRecoveryPointResourceListDeserializer,
  fetchSecondaryRPsRequestParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FetchSecondaryRecoveryPointsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: FetchSecondaryRPsRequestParameters,
  options: FetchSecondaryRecoveryPointsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchSecondaryRecoveryPoints{?api%2Dversion,%24filter,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24skipToken": options?.skipToken,
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
    body: fetchSecondaryRPsRequestParametersSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureBackupRecoveryPointResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _azureBackupRecoveryPointResourceListDeserializer(result.body);
}

/** Returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross Region Restore. */
export function list(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: FetchSecondaryRPsRequestParameters,
  options: FetchSecondaryRecoveryPointsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AzureBackupRecoveryPointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, location, parameters, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
