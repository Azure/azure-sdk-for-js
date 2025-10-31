// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/prefixListGlobalRulestack/operations.js";
import type {
  PrefixListGlobalRulestackListOptionalParams,
  PrefixListGlobalRulestackDeleteOptionalParams,
  PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
  PrefixListGlobalRulestackGetOptionalParams,
} from "../../api/prefixListGlobalRulestack/options.js";
import type { PrefixListGlobalRulestackResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrefixListGlobalRulestack operations. */
export interface PrefixListGlobalRulestackOperations {
  /** List PrefixListGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: PrefixListGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<PrefixListGlobalRulestackResource>;
  /** Delete a PrefixListGlobalRulestackResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: PrefixListGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PrefixListGlobalRulestackResource */
  createOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: PrefixListGlobalRulestackResource,
    options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<PrefixListGlobalRulestackResource>,
    PrefixListGlobalRulestackResource
  >;
  /** Get a PrefixListGlobalRulestackResource */
  get: (
    globalRulestackName: string,
    name: string,
    options?: PrefixListGlobalRulestackGetOptionalParams,
  ) => Promise<PrefixListGlobalRulestackResource>;
}

function _getPrefixListGlobalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    list: (globalRulestackName: string, options?: PrefixListGlobalRulestackListOptionalParams) =>
      list(context, globalRulestackName, options),
    delete: (
      globalRulestackName: string,
      name: string,
      options?: PrefixListGlobalRulestackDeleteOptionalParams,
    ) => $delete(context, globalRulestackName, name, options),
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: PrefixListGlobalRulestackResource,
      options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
    get: (
      globalRulestackName: string,
      name: string,
      options?: PrefixListGlobalRulestackGetOptionalParams,
    ) => get(context, globalRulestackName, name, options),
  };
}

export function _getPrefixListGlobalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): PrefixListGlobalRulestackOperations {
  return {
    ..._getPrefixListGlobalRulestack(context),
  };
}
