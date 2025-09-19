// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type { GroupQuotasEnforcementStatus } from "../../models/models.js";
import {
  errorResponseDeserializer,
  groupQuotasEnforcementStatusSerializer,
  groupQuotasEnforcementStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GroupQuotaLocationSettingsUpdateOptionalParams,
  GroupQuotaLocationSettingsCreateOrUpdateOptionalParams,
  GroupQuotaLocationSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["locationSettings"]
      ? options["locationSettings"]
      : groupQuotasEnforcementStatusSerializer(options["locationSettings"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GroupQuotasEnforcementStatus> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return groupQuotasEnforcementStatusDeserializer(result.body);
}

/**
 * Enables the GroupQuotas enforcement for the resource provider and the location specified. The resource provider will start using the group quotas as the overall quota for the subscriptions included in the GroupQuota.  The subscriptions cannot request quota at subscription level since it is now part of an enforced group.
 * The subscriptions share the GroupQuotaLimits assigned to the GroupQuota. If the GroupQuotaLimits is used, then submit a groupQuotaLimit request for the specific resource - provider/location/resource.
 * Once the GroupQuota Enforcement is enabled then, it cannot be deleted or reverted back. To disable GroupQuota Enforcement -
 * 1. Remove all the subscriptions from the groupQuota using the delete API for Subscriptions (Check the example - GroupQuotaSubscriptions_Delete).
 * 2. Ten delete the GroupQuota (Check the example - GroupQuotas_Delete).
 */
export function update(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<GroupQuotasEnforcementStatus>, GroupQuotasEnforcementStatus> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GroupQuotasEnforcementStatus>, GroupQuotasEnforcementStatus>;
}

export function _createOrUpdateSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["locationSettings"]
      ? options["locationSettings"]
      : groupQuotasEnforcementStatusSerializer(options["locationSettings"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GroupQuotasEnforcementStatus> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return groupQuotasEnforcementStatusDeserializer(result.body);
}

/**
 * Enables the GroupQuotas enforcement for the resource provider and the location specified. The resource provider will start using the group quotas as the overall quota for the subscriptions included in the GroupQuota. The subscriptions cannot request quota at subscription level since it is now part of an enforced group.
 * The subscriptions share the GroupQuotaLimits assigned to the GroupQuota. If the GroupQuotaLimits is used, then submit a groupQuotaLimit request for the specific resource - provider/location/resource.
 * Once the GroupQuota Enforcement is enabled then, it cannot be deleted or reverted back. To disable GroupQuota Enforcement -
 * 1. Remove all the subscriptions from the groupQuota using the delete API for Subscriptions (Check the example - GroupQuotaSubscriptions_Delete).
 * 2. Then delete the GroupQuota (Check the example - GroupQuotas_Delete).
 */
export function createOrUpdate(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<GroupQuotasEnforcementStatus>, GroupQuotasEnforcementStatus> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GroupQuotasEnforcementStatus>, GroupQuotasEnforcementStatus>;
}

export function _getSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GroupQuotasEnforcementStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return groupQuotasEnforcementStatusDeserializer(result.body);
}

/** Gets the GroupQuotas enforcement settings for the ResourceProvider/location. The locations, where GroupQuota enforcement is not enabled will return Not Found. */
export async function get(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaLocationSettingsGetOptionalParams = { requestOptions: {} },
): Promise<GroupQuotasEnforcementStatus> {
  const result = await _getSend(
    context,
    managementGroupId,
    groupQuotaName,
    resourceProviderName,
    location,
    options,
  );
  return _getDeserialize(result);
}
