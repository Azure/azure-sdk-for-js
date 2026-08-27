// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext as Client } from "../index.js";
import type { DataPolicyManifest, _DataPolicyManifestListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dataPolicyManifestDeserializer,
  _dataPolicyManifestListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataPolicyManifestsListOptionalParams,
  DataPolicyManifestsGetByPolicyModeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DataPolicyManifestsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/dataPolicyManifests{?api%2Dversion,%24filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
      "%24filter": options?.filter,
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
): Promise<_DataPolicyManifestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dataPolicyManifestListResultDeserializer(result.body);
}

/** This operation retrieves a list of all the data policy manifests that match the optional given $filter. Valid values for $filter are: \"$filter=namespace eq '{0}'\". If $filter is not provided, the unfiltered list includes all data policy manifests for data resource types. If $filter=namespace is provided, the returned list only includes all data policy manifests that have a namespace matching the provided value. */
export function list(
  context: Client,
  options: DataPolicyManifestsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataPolicyManifest> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getByPolicyModeSend(
  context: Client,
  policyMode: string,
  options: DataPolicyManifestsGetByPolicyModeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/dataPolicyManifests/{policyMode}{?api%2Dversion}",
    {
      policyMode: policyMode,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getByPolicyModeDeserialize(
  result: PathUncheckedResponse,
): Promise<DataPolicyManifest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataPolicyManifestDeserializer(result.body);
}

/** This operation retrieves the data policy manifest with the given policy mode. */
export async function getByPolicyMode(
  context: Client,
  policyMode: string,
  options: DataPolicyManifestsGetByPolicyModeOptionalParams = { requestOptions: {} },
): Promise<DataPolicyManifest> {
  const result = await _getByPolicyModeSend(context, policyMode, options);
  return _getByPolicyModeDeserialize(result);
}
