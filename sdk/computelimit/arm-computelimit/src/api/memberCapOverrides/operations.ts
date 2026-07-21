// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type { MemberCapOverride, _MemberCapOverrideListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  memberCapOverrideSerializer,
  memberCapOverrideDeserializer,
  _memberCapOverrideListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MemberCapOverridesListByParentOptionalParams,
  MemberCapOverridesDeleteOptionalParams,
  MemberCapOverridesCreateOrUpdateOptionalParams,
  MemberCapOverridesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: MemberCapOverridesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}/memberCapOverrides{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_MemberCapOverrideListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _memberCapOverrideListResultDeserializer(result.body);
}

/** Lists all per-member cap overrides configured under a SharedLimitCap. */
export function listByParent(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: MemberCapOverridesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemberCapOverride> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, location, vmFamilyName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  options: MemberCapOverridesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}/memberCapOverrides/{memberSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      memberSubscriptionId: memberSubscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes the per-member cap override for a member subscription. */
export async function $delete(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  options: MemberCapOverridesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, location, vmFamilyName, memberSubscriptionId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  resource: MemberCapOverride,
  options: MemberCapOverridesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}/memberCapOverrides/{memberSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      memberSubscriptionId: memberSubscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: memberCapOverrideSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MemberCapOverride> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memberCapOverrideDeserializer(result.body);
}

/** Creates or replaces the cap override for a single member subscription. */
export async function createOrUpdate(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  resource: MemberCapOverride,
  options: MemberCapOverridesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MemberCapOverride> {
  const result = await _createOrUpdateSend(
    context,
    location,
    vmFamilyName,
    memberSubscriptionId,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  options: MemberCapOverridesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}/memberCapOverrides/{memberSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      memberSubscriptionId: memberSubscriptionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MemberCapOverride> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return memberCapOverrideDeserializer(result.body);
}

/** Gets the cap override configured for a single member subscription. */
export async function get(
  context: Client,
  location: string,
  vmFamilyName: string,
  memberSubscriptionId: string,
  options: MemberCapOverridesGetOptionalParams = { requestOptions: {} },
): Promise<MemberCapOverride> {
  const result = await _getSend(context, location, vmFamilyName, memberSubscriptionId, options);
  return _getDeserialize(result);
}
