// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByLocalRulestacks,
  $delete,
  createOrUpdate,
  get,
} from "../../api/prefixListLocalRulestack/operations.js";
import type {
  PrefixListLocalRulestackListByLocalRulestacksOptionalParams,
  PrefixListLocalRulestackDeleteOptionalParams,
  PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  PrefixListLocalRulestackGetOptionalParams,
} from "../../api/prefixListLocalRulestack/options.js";
import type { PrefixListResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrefixListLocalRulestack operations. */
export interface PrefixListLocalRulestackOperations {
  /** List PrefixListResource resources by LocalRulestacks */
  listByLocalRulestacks: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: PrefixListLocalRulestackListByLocalRulestacksOptionalParams,
  ) => PagedAsyncIterableIterator<PrefixListResource>;
  /** Delete a PrefixListResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: PrefixListLocalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PrefixListResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: PrefixListResource,
    options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrefixListResource>, PrefixListResource>;
  /** Get a PrefixListResource */
  get: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: PrefixListLocalRulestackGetOptionalParams,
  ) => Promise<PrefixListResource>;
}

function _getPrefixListLocalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByLocalRulestacks: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: PrefixListLocalRulestackListByLocalRulestacksOptionalParams,
    ) => listByLocalRulestacks(context, resourceGroupName, localRulestackName, options),
    delete: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: PrefixListLocalRulestackDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localRulestackName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: PrefixListResource,
      options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localRulestackName, name, resource, options),
    get: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: PrefixListLocalRulestackGetOptionalParams,
    ) => get(context, resourceGroupName, localRulestackName, name, options),
  };
}

export function _getPrefixListLocalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): PrefixListLocalRulestackOperations {
  return {
    ..._getPrefixListLocalRulestack(context),
  };
}
