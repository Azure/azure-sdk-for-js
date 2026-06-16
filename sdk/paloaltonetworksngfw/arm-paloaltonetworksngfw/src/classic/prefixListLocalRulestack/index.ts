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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: PrefixListLocalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: PrefixListLocalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: PrefixListLocalRulestackDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a PrefixListResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: PrefixListResource,
    options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrefixListResource>, PrefixListResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: PrefixListResource,
    options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrefixListResource>, PrefixListResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: PrefixListResource,
    options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<PrefixListResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: PrefixListLocalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, localRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: PrefixListLocalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, localRulestackName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: PrefixListResource,
      options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: PrefixListResource,
      options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
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
      resource: PrefixListResource,
      options?: PrefixListLocalRulestackCreateOrUpdateOptionalParams,
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
