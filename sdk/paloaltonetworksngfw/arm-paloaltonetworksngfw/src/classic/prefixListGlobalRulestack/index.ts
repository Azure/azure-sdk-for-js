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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrefixListGlobalRulestack operations. */
export interface PrefixListGlobalRulestackOperations {
  /** List PrefixListGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: PrefixListGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<PrefixListGlobalRulestackResource>;
  /** Delete a PrefixListGlobalRulestackResource */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: PrefixListGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    name: string,
    options?: PrefixListGlobalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    name: string,
    options?: PrefixListGlobalRulestackDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: PrefixListGlobalRulestackResource,
    options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PrefixListGlobalRulestackResource>,
      PrefixListGlobalRulestackResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    name: string,
    resource: PrefixListGlobalRulestackResource,
    options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<PrefixListGlobalRulestackResource>;
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
    beginDelete: async (
      globalRulestackName: string,
      name: string,
      options?: PrefixListGlobalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      name: string,
      options?: PrefixListGlobalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, name, options);
    },
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: PrefixListGlobalRulestackResource,
      options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      name: string,
      resource: PrefixListGlobalRulestackResource,
      options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, name, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      name: string,
      resource: PrefixListGlobalRulestackResource,
      options?: PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, name, resource, options);
    },
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
