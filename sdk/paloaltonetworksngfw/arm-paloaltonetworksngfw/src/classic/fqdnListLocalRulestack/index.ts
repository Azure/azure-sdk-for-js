// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByLocalRulestacks,
  $delete,
  createOrUpdate,
  get,
} from "../../api/fqdnListLocalRulestack/operations.js";
import type {
  FqdnListLocalRulestackListByLocalRulestacksOptionalParams,
  FqdnListLocalRulestackDeleteOptionalParams,
  FqdnListLocalRulestackCreateOrUpdateOptionalParams,
  FqdnListLocalRulestackGetOptionalParams,
} from "../../api/fqdnListLocalRulestack/options.js";
import type { FqdnListLocalRulestackResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FqdnListLocalRulestack operations. */
export interface FqdnListLocalRulestackOperations {
  /** List FqdnListLocalRulestackResource resources by LocalRulestacks */
  listByLocalRulestacks: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: FqdnListLocalRulestackListByLocalRulestacksOptionalParams,
  ) => PagedAsyncIterableIterator<FqdnListLocalRulestackResource>;
  /** Delete a FqdnListLocalRulestackResource */
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: FqdnListLocalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: FqdnListLocalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: FqdnListLocalRulestackDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a FqdnListLocalRulestackResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: FqdnListLocalRulestackResource,
    options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FqdnListLocalRulestackResource>, FqdnListLocalRulestackResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: FqdnListLocalRulestackResource,
    options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<FqdnListLocalRulestackResource>, FqdnListLocalRulestackResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: FqdnListLocalRulestackResource,
    options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<FqdnListLocalRulestackResource>;
  /** Get a FqdnListLocalRulestackResource */
  get: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: FqdnListLocalRulestackGetOptionalParams,
  ) => Promise<FqdnListLocalRulestackResource>;
}

function _getFqdnListLocalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByLocalRulestacks: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: FqdnListLocalRulestackListByLocalRulestacksOptionalParams,
    ) => listByLocalRulestacks(context, resourceGroupName, localRulestackName, options),
    delete: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: FqdnListLocalRulestackDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localRulestackName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: FqdnListLocalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, localRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: FqdnListLocalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, localRulestackName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: FqdnListLocalRulestackResource,
      options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: FqdnListLocalRulestackResource,
      options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        name,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: FqdnListLocalRulestackResource,
      options?: FqdnListLocalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        name,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: FqdnListLocalRulestackGetOptionalParams,
    ) => get(context, resourceGroupName, localRulestackName, name, options),
  };
}

export function _getFqdnListLocalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): FqdnListLocalRulestackOperations {
  return {
    ..._getFqdnListLocalRulestack(context),
  };
}
