// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PrivateLinkResourceListResult,
  privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import { PrivateLinkResourcesListByElasticSanOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByElasticSanSend(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  options: PrivateLinkResourcesListByElasticSanOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      elasticSanName: elasticSanName,
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

export async function _listByElasticSanDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources that need to be created for a elastic San. */
export async function listByElasticSan(
  context: Client,
  resourceGroupName: string,
  elasticSanName: string,
  options: PrivateLinkResourcesListByElasticSanOptionalParams = {
    requestOptions: {},
  },
): Promise<PrivateLinkResourceListResult> {
  const result = await _listByElasticSanSend(context, resourceGroupName, elasticSanName, options);
  return _listByElasticSanDeserialize(result);
}
