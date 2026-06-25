// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/fqdnListGlobalRulestack/operations.js";
import {
  FqdnListGlobalRulestackListOptionalParams,
  FqdnListGlobalRulestackDeleteOptionalParams,
  FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  FqdnListGlobalRulestackGetOptionalParams,
} from "../../api/fqdnListGlobalRulestack/options.js";
import { FqdnListGlobalRulestackResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FqdnListGlobalRulestack operations. */
export interface FqdnListGlobalRulestackOperations {
  /** List FqdnListGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: FqdnListGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<FqdnListGlobalRulestackResource>;
  /** Delete a FqdnListGlobalRulestackResource */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: FqdnListGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    name: string,
    options?: FqdnListGlobalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    name: string,
    options?: FqdnListGlobalRulestackDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a FqdnListGlobalRulestackResource */
  createOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: FqdnListGlobalRulestackResource,
    options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FqdnListGlobalRulestackResource>, FqdnListGlobalRulestackResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: FqdnListGlobalRulestackResource,
    options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<FqdnListGlobalRulestackResource>,
      FqdnListGlobalRulestackResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    name: string,
    resource: FqdnListGlobalRulestackResource,
    options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<FqdnListGlobalRulestackResource>;
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
    beginDelete: async (
      globalRulestackName: string,
      name: string,
      options?: FqdnListGlobalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      name: string,
      options?: FqdnListGlobalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, name, options);
    },
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: FqdnListGlobalRulestackResource,
      options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      name: string,
      resource: FqdnListGlobalRulestackResource,
      options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, name, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      name: string,
      resource: FqdnListGlobalRulestackResource,
      options?: FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, name, resource, options);
    },
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
