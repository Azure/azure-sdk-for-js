// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  head,
  get,
} from "../../api/privateLinks/operations.js";
import type {
  PrivateLinksListBySubscriptionOptionalParams,
  PrivateLinksListOptionalParams,
  PrivateLinksDeleteOptionalParams,
  PrivateLinksUpdateOptionalParams,
  PrivateLinksCreateOptionalParams,
  PrivateLinksHeadOptionalParams,
  PrivateLinksGetOptionalParams,
} from "../../api/privateLinks/options.js";
import type {
  PrivateLinkResource,
  PrivateLinkUpdate,
} from "../../models/privateLinksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateLinks operations. */
export interface PrivateLinksOperations {
  /** Lists all the private links in the specified subscription. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified subscription. */
  listBySubscription: (
    options?: PrivateLinksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Lists all the private links in the specified resource group. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified resource group. */
  list: (
    resourceGroupName: string,
    options?: PrivateLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Delete a private link resource. This operation will remove the private link infrastructure and disconnect all associated private endpoints. This operation is asynchronous and may take several minutes to complete. */
  delete: (
    resourceGroupName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Update specific properties of a private link resource. Use this operation to update mutable properties like tags without affecting the entire resource configuration. */
  update: (
    resourceGroupName: string,
    privateLink: PrivateLinkUpdate,
    options?: PrivateLinksUpdateOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Create a private link resource. This operation creates the necessary infrastructure to enable private endpoint connections to Microsoft Defender for Cloud services. For updates to existing resources, use the PATCH operation. The operation is asynchronous and may take several minutes to complete. */
  create: (
    resourceGroupName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => PollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Checks whether private link exists. */
  head: (resourceGroupName: string, options?: PrivateLinksHeadOptionalParams) => Promise<void>;
  /** Get a private link resource. Returns the configuration and status of private endpoint connectivity for Microsoft Defender for Cloud services in the specified region. */
  get: (
    resourceGroupName: string,
    options?: PrivateLinksGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinks(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: PrivateLinksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: PrivateLinksListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (resourceGroupName: string, options?: PrivateLinksDeleteOptionalParams) =>
      $delete(context, resourceGroupName, options),
    beginDelete: async (resourceGroupName: string, options?: PrivateLinksDeleteOptionalParams) => {
      const poller = $delete(context, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      options?: PrivateLinksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, options);
    },
    update: (
      resourceGroupName: string,
      privateLink: PrivateLinkUpdate,
      options?: PrivateLinksUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateLink, options),
    create: (
      resourceGroupName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => create(context, resourceGroupName, privateLink, options),
    beginCreate: async (
      resourceGroupName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, privateLink, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, privateLink, options);
    },
    head: (resourceGroupName: string, options?: PrivateLinksHeadOptionalParams) =>
      head(context, resourceGroupName, options),
    get: (resourceGroupName: string, options?: PrivateLinksGetOptionalParams) =>
      get(context, resourceGroupName, options),
  };
}

export function _getPrivateLinksOperations(context: SecurityCenterContext): PrivateLinksOperations {
  return {
    ..._getPrivateLinks(context),
  };
}
