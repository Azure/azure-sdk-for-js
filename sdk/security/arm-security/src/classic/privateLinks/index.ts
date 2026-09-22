// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  head,
  get,
} from "../../api/privateLinks/operations.js";
import {
  PrivateLinksListBySubscriptionOptionalParams,
  PrivateLinksListOptionalParams,
  PrivateLinksDeleteOptionalParams,
  PrivateLinksUpdateOptionalParams,
  PrivateLinksCreateOptionalParams,
  PrivateLinksHeadOptionalParams,
  PrivateLinksGetOptionalParams,
} from "../../api/privateLinks/options.js";
import { PrivateLinkResource, PrivateLinkUpdate } from "../../models/privateLinksAPI/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
    privateLinkName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateLinkName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateLinkName: string,
    options?: PrivateLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Update specific properties of a private link resource. Use this operation to update mutable properties like tags without affecting the entire resource configuration. */
  update: (
    resourceGroupName: string,
    privateLinkName: string,
    privateLink: PrivateLinkUpdate,
    options?: PrivateLinksUpdateOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Create a private link resource. This operation creates the necessary infrastructure to enable private endpoint connections to Microsoft Defender for Cloud services. For updates to existing resources, use the PATCH operation. The operation is asynchronous and may take several minutes to complete. */
  create: (
    resourceGroupName: string,
    privateLinkName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => PollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    privateLinkName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    privateLinkName: string,
    privateLink: PrivateLinkResource,
    options?: PrivateLinksCreateOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Checks whether private link exists. */
  head: (
    resourceGroupName: string,
    privateLinkName: string,
    options?: PrivateLinksHeadOptionalParams,
  ) => Promise<void>;
  /** Get a private link resource. Returns the configuration and status of private endpoint connectivity for Microsoft Defender for Cloud services in the specified region. */
  get: (
    resourceGroupName: string,
    privateLinkName: string,
    options?: PrivateLinksGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinks(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: PrivateLinksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: PrivateLinksListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      privateLinkName: string,
      options?: PrivateLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateLinkName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateLinkName: string,
      options?: PrivateLinksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, privateLinkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateLinkName: string,
      options?: PrivateLinksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, privateLinkName, options);
    },
    update: (
      resourceGroupName: string,
      privateLinkName: string,
      privateLink: PrivateLinkUpdate,
      options?: PrivateLinksUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateLinkName, privateLink, options),
    create: (
      resourceGroupName: string,
      privateLinkName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => create(context, resourceGroupName, privateLinkName, privateLink, options),
    beginCreate: async (
      resourceGroupName: string,
      privateLinkName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, privateLinkName, privateLink, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      privateLinkName: string,
      privateLink: PrivateLinkResource,
      options?: PrivateLinksCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, privateLinkName, privateLink, options);
    },
    head: (
      resourceGroupName: string,
      privateLinkName: string,
      options?: PrivateLinksHeadOptionalParams,
    ) => head(context, resourceGroupName, privateLinkName, options),
    get: (
      resourceGroupName: string,
      privateLinkName: string,
      options?: PrivateLinksGetOptionalParams,
    ) => get(context, resourceGroupName, privateLinkName, options),
  };
}

export function _getPrivateLinksOperations(context: SecurityCenterContext): PrivateLinksOperations {
  return {
    ..._getPrivateLinks(context),
  };
}
