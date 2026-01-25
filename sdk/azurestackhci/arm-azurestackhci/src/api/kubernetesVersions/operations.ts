// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type { _KubernetesVersionListResult, KubernetesVersion } from "../../models/models.js";
import {
  _kubernetesVersionListResultDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { KubernetesVersionsListBySubscriptionLocationResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: KubernetesVersionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/kubernetesVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_KubernetesVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _kubernetesVersionListResultDeserializer(result.body);
}

/** List all kubernetes versions. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: KubernetesVersionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<KubernetesVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
