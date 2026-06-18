// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SubscriptionQuotaAllocationsList,
  subscriptionQuotaAllocationsListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GroupQuotaSubscriptionAllocationListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaSubscriptionAllocationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      subscriptionId: context.subscriptionId,
      groupQuotaName: groupQuotaName,
      resourceProviderName: resourceProviderName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionQuotaAllocationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return subscriptionQuotaAllocationsListDeserializer(result.body);
}

/** Gets all the quota allocated to a subscription for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}. This will include the GroupQuota and total quota allocated to the subscription. Only the Group quota allocated to the subscription can be allocated back to the MG Group Quota. */
export async function list(
  context: Client,
  managementGroupId: string,
  groupQuotaName: string,
  resourceProviderName: string,
  location: string,
  options: GroupQuotaSubscriptionAllocationListOptionalParams = { requestOptions: {} },
): Promise<SubscriptionQuotaAllocationsList> {
  const result = await _listSend(
    context,
    managementGroupId,
    groupQuotaName,
    resourceProviderName,
    location,
    options,
  );
  return _listDeserialize(result);
}
