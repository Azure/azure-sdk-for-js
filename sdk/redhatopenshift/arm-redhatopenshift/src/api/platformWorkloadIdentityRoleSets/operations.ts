// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext as Client } from "../index.js";
import type {
  _PlatformWorkloadIdentityRoleSetList,
  PlatformWorkloadIdentityRoleSet,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _platformWorkloadIdentityRoleSetListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PlatformWorkloadIdentityRoleSetsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: PlatformWorkloadIdentityRoleSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/platformWorkloadIdentityRoleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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
): Promise<_PlatformWorkloadIdentityRoleSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _platformWorkloadIdentityRoleSetListDeserializer(result.body);
}

/** This operation returns a list of Platform Workload Identity Role Sets as a string */
export function list(
  context: Client,
  location: string,
  options: PlatformWorkloadIdentityRoleSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PlatformWorkloadIdentityRoleSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-25" },
  );
}
