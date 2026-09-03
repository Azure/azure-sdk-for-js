// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext as Client } from "../index.js";
import type {
  _HcpOperatorIdentityRoleSetListResult,
  HcpOperatorIdentityRoleSet,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _hcpOperatorIdentityRoleSetListResultDeserializer,
  hcpOperatorIdentityRoleSetDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HcpOperatorIdentityRoleSetsGetOptionalParams,
  HcpOperatorIdentityRoleSetsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  hcpOperatorIdentityRoleSetName: string,
  options: HcpOperatorIdentityRoleSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/hcpOperatorIdentityRoleSets/{hcpOperatorIdentityRoleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      hcpOperatorIdentityRoleSetName: hcpOperatorIdentityRoleSetName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
): Promise<HcpOperatorIdentityRoleSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hcpOperatorIdentityRoleSetDeserializer(result.body);
}

/** Get a HcpOperatorIdentityRoleSet */
export async function get(
  context: Client,
  location: string,
  hcpOperatorIdentityRoleSetName: string,
  options: HcpOperatorIdentityRoleSetsGetOptionalParams = { requestOptions: {} },
): Promise<HcpOperatorIdentityRoleSet> {
  const result = await _getSend(context, location, hcpOperatorIdentityRoleSetName, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: HcpOperatorIdentityRoleSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/hcpOperatorIdentityRoleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
): Promise<_HcpOperatorIdentityRoleSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hcpOperatorIdentityRoleSetListResultDeserializer(result.body);
}

/** List HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource */
export function list(
  context: Client,
  location: string,
  options: HcpOperatorIdentityRoleSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HcpOperatorIdentityRoleSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}
