// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PrivateLinkResourceListResult,
  _privateLinkResourceListResultDeserializer,
  PrivateLinkResource,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByCloudHsmClusterSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
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

export async function _listByCloudHsmClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources supported for the Cloud Hsm Cluster. */
export function listByCloudHsmCluster(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  options: CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCloudHsmClusterSend(context, resourceGroupName, cloudHsmClusterName, options),
    _listByCloudHsmClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
