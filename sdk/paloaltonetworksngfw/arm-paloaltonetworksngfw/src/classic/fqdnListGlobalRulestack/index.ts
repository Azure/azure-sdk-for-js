// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/fqdnListGlobalRulestack/operations.js";
import type {
  FqdnListGlobalRulestackListOptionalParams,
  FqdnListGlobalRulestackDeleteOptionalParams,
  FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  FqdnListGlobalRulestackGetOptionalParams,
} from "../../api/fqdnListGlobalRulestack/options.js";
import type { FqdnListGlobalRulestackResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FqdnListGlobalRulestack operations. */
export interface FqdnListGlobalRulestackOperations {
  /** List FqdnListGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: FqdnListGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<FqdnListGlobalRulestackResource>;
  /** Delete a FqdnListGlobalRulestackResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: FqdnListGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a FqdnListGlobalRulestackResource */
  createOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: FqdnListGlobalRulestackResource,
    options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FqdnListGlobalRulestackResource>, FqdnListGlobalRulestackResource>;
  /** Get a FqdnListGlobalRulestackResource */
  get: (
    globalRulestackName: string,
    name: string,
    options?: FqdnListGlobalRulestackGetOptionalParams,
  ) => Promise<FqdnListGlobalRulestackResource>;
}

function _getFqdnListGlobalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    list: (globalRulestackName: string, options?: FqdnListGlobalRulestackListOptionalParams) =>
      list(context, globalRulestackName, options),
    delete: (
      globalRulestackName: string,
      name: string,
      options?: FqdnListGlobalRulestackDeleteOptionalParams,
    ) => $delete(context, globalRulestackName, name, options),
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: FqdnListGlobalRulestackResource,
      options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
    get: (
      globalRulestackName: string,
      name: string,
      options?: FqdnListGlobalRulestackGetOptionalParams,
    ) => get(context, globalRulestackName, name, options),
  };
}

export function _getFqdnListGlobalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): FqdnListGlobalRulestackOperations {
  return {
    ..._getFqdnListGlobalRulestack(context),
  };
}
