// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  PricingsAPIPricing,
  _PricingsAPIPricingList,
} from "../../models/pricingsAPI/models.js";
import {
  pricingsAPIPricingSerializer,
  pricingsAPIPricingDeserializer,
  _pricingsAPIPricingListDeserializer,
} from "../../models/pricingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PricingsListOptionalParams,
  PricingsDeleteOptionalParams,
  PricingsUpdateOptionalParams,
  PricingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scopeId: string,
  options: PricingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/pricings{?api%2Dversion,%24filter}",
    {
      scopeId: scopeId,
      "api%2Dversion": "2024-01-01",
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
): Promise<_PricingsAPIPricingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _pricingsAPIPricingListDeserializer(result.body);
}

/** Lists Microsoft Defender for Cloud pricing configurations of the scopeId, that match the optional given $filter. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines'). Valid $filter is: 'name in ({planName1},{planName2},...)'. If $filter is not provided, the unfiltered list will be returned. If '$filter=name in (planName1,planName2)' is provided, the returned list includes the pricings set for 'planName1' and 'planName2' only. */
export function list(
  context: Client,
  scopeId: string,
  options: PricingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PricingsAPIPricing> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scopeId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", apiVersion: "2024-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scopeId: string,
  pricingName: string,
  options: PricingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/pricings/{pricingName}{?api%2Dversion}",
    {
      scopeId: scopeId,
      pricingName: pricingName,
      "api%2Dversion": "2024-01-01",
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
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers'). */
export async function $delete(
  context: Client,
  scopeId: string,
  pricingName: string,
  options: PricingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scopeId, pricingName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  scopeId: string,
  pricingName: string,
  pricing: PricingsAPIPricing,
  options: PricingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/pricings/{pricingName}{?api%2Dversion}",
    {
      scopeId: scopeId,
      pricingName: pricingName,
      "api%2Dversion": "2024-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pricingsAPIPricingSerializer(pricing),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PricingsAPIPricing> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return pricingsAPIPricingDeserializer(result.body);
}

/** Updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1'). */
export async function update(
  context: Client,
  scopeId: string,
  pricingName: string,
  pricing: PricingsAPIPricing,
  options: PricingsUpdateOptionalParams = { requestOptions: {} },
): Promise<PricingsAPIPricing> {
  const result = await _updateSend(context, scopeId, pricingName, pricing, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  scopeId: string,
  pricingName: string,
  options: PricingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/pricings/{pricingName}{?api%2Dversion}",
    {
      scopeId: scopeId,
      pricingName: pricingName,
      "api%2Dversion": "2024-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PricingsAPIPricing> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return pricingsAPIPricingDeserializer(result.body);
}

/** Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'. */
export async function get(
  context: Client,
  scopeId: string,
  pricingName: string,
  options: PricingsGetOptionalParams = { requestOptions: {} },
): Promise<PricingsAPIPricing> {
  const result = await _getSend(context, scopeId, pricingName, options);
  return _getDeserialize(result);
}
