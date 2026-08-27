// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/addressPrefixSets/operations.js";
import type {
  AddressPrefixSetsListOptionalParams,
  AddressPrefixSetsDeleteOptionalParams,
  AddressPrefixSetsCreateOrUpdateOptionalParams,
  AddressPrefixSetsGetOptionalParams,
} from "../../api/addressPrefixSets/options.js";
import type { AddressPrefixSet } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AddressPrefixSets operations. */
export interface AddressPrefixSetsOperations {
  /** Gets all address prefix sets in an application security group. */
  list: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    options?: AddressPrefixSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<AddressPrefixSet>;
  /** Deletes the specified address prefix set. */
  delete: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    options?: AddressPrefixSetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    options?: AddressPrefixSetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    options?: AddressPrefixSetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an address prefix set. */
  createOrUpdate: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    resource: AddressPrefixSet,
    options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AddressPrefixSet>, AddressPrefixSet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    resource: AddressPrefixSet,
    options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AddressPrefixSet>, AddressPrefixSet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    resource: AddressPrefixSet,
    options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
  ) => Promise<AddressPrefixSet>;
  /** Gets the specified address prefix set. */
  get: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    addressPrefixSetName: string,
    options?: AddressPrefixSetsGetOptionalParams,
  ) => Promise<AddressPrefixSet>;
}

function _getAddressPrefixSets(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      options?: AddressPrefixSetsListOptionalParams,
    ) => list(context, resourceGroupName, applicationSecurityGroupName, options),
    delete: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      options?: AddressPrefixSetsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      options?: AddressPrefixSetsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      options?: AddressPrefixSetsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      resource: AddressPrefixSet,
      options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      resource: AddressPrefixSet,
      options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      resource: AddressPrefixSet,
      options?: AddressPrefixSetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      addressPrefixSetName: string,
      options?: AddressPrefixSetsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, applicationSecurityGroupName, addressPrefixSetName, options),
  };
}

export function _getAddressPrefixSetsOperations(
  context: NetworkManagementContext,
): AddressPrefixSetsOperations {
  return {
    ..._getAddressPrefixSets(context),
  };
}
