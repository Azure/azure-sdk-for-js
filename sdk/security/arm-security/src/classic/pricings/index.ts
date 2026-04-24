// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, update, get } from "../../api/pricings/operations.js";
import type {
  PricingsListOptionalParams,
  PricingsDeleteOptionalParams,
  PricingsUpdateOptionalParams,
  PricingsGetOptionalParams,
} from "../../api/pricings/options.js";
import type { Pricing } from "../../models/pricingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Pricings operations. */
export interface PricingsOperations {
  /** Lists Microsoft Defender for Cloud pricing configurations of the scopeId, that match the optional given $filter. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines'). Valid $filter is: 'name in ({planName1},{planName2},...)'. If $filter is not provided, the unfiltered list will be returned. If '$filter=name in (planName1,planName2)' is provided, the returned list includes the pricings set for 'planName1' and 'planName2' only. */
  list: (
    scopeId: string,
    options?: PricingsListOptionalParams,
  ) => PagedAsyncIterableIterator<Pricing>;
  /** Deletes a provided Microsoft Defender for Cloud pricing configuration in a specific resource. Valid only for resource scope (Supported resources are: 'VirtualMachines, VMSS, ARC Machines, and Containers'). */
  delete: (
    scopeId: string,
    pricingName: string,
    options?: PricingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a provided Microsoft Defender for Cloud pricing configuration in the scope. Valid scopes are: subscription id or a specific resource id (Supported resources are: 'VirtualMachines, VMSS and ARC Machines' and only for plan='VirtualMachines' and subPlan='P1'). */
  update: (
    scopeId: string,
    pricingName: string,
    pricing: Pricing,
    options?: PricingsUpdateOptionalParams,
  ) => Promise<Pricing>;
  /** Get the Defender plans pricing configurations of the selected scope (valid scopes are resource id or a subscription id). At the resource level, supported resource types are 'VirtualMachines, VMSS and ARC Machines'. */
  get: (
    scopeId: string,
    pricingName: string,
    options?: PricingsGetOptionalParams,
  ) => Promise<Pricing>;
}

function _getPricings(context: SecurityCenterContext) {
  return {
    list: (scopeId: string, options?: PricingsListOptionalParams) =>
      list(context, scopeId, options),
    delete: (scopeId: string, pricingName: string, options?: PricingsDeleteOptionalParams) =>
      $delete(context, scopeId, pricingName, options),
    update: (
      scopeId: string,
      pricingName: string,
      pricing: Pricing,
      options?: PricingsUpdateOptionalParams,
    ) => update(context, scopeId, pricingName, pricing, options),
    get: (scopeId: string, pricingName: string, options?: PricingsGetOptionalParams) =>
      get(context, scopeId, pricingName, options),
  };
}

export function _getPricingsOperations(context: SecurityCenterContext): PricingsOperations {
  return {
    ..._getPricings(context),
  };
}
