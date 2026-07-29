// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  PolicyMetadata,
  _PolicyMetadataCollection,
  SlimPolicyMetadata,
} from "../../models/policyInsightsApi/models.js";
import {
  errorResponseDeserializer,
  policyMetadataDeserializer,
  _policyMetadataCollectionDeserializer,
} from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyMetadataOperationsListOptionalParams,
  PolicyMetadataOperationsGetResourceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: PolicyMetadataOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PolicyInsights/policyMetadata{?api%2Dversion,%24top}",
    {
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
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
): Promise<_PolicyMetadataCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyMetadataCollectionDeserializer(result.body);
}

/** Get a list of the policy metadata resources. */
export function list(
  context: Client,
  options: PolicyMetadataOperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SlimPolicyMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _getResourceSend(
  context: Client,
  resourceName: string,
  options: PolicyMetadataOperationsGetResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PolicyInsights/policyMetadata/{+resourceName}{?api%2Dversion}",
    {
      resourceName: resourceName,
      "api%2Dversion": "2024-10-01",
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

export async function _getResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyMetadataDeserializer(result.body);
}

/** Get policy metadata resource. */
export async function getResource(
  context: Client,
  resourceName: string,
  options: PolicyMetadataOperationsGetResourceOptionalParams = { requestOptions: {} },
): Promise<PolicyMetadata> {
  const result = await _getResourceSend(context, resourceName, options);
  return _getResourceDeserialize(result);
}
