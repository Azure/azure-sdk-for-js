// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderContext } from "../../api/edgeOrderContext.js";
import { AddressResource, AddressUpdateParameter } from "../../models/models.js";
import {
  AddressesListBySubscriptionOptionalParams,
  AddressesListByResourceGroupOptionalParams,
  AddressesDeleteOptionalParams,
  AddressesUpdateOptionalParams,
  AddressesCreateOptionalParams,
  AddressesGetOptionalParams,
} from "../../api/addresses/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/addresses/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Addresses operations. */
export interface AddressesOperations {
  /** List all the addresses available under the subscription. */
  listBySubscription: (
    options?: AddressesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AddressResource>;
  /** List all the addresses available under the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AddressesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AddressResource>;
  /** Delete an address. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    addressName: string,
    options?: AddressesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the properties of an existing address. */
  update: (
    resourceGroupName: string,
    addressName: string,
    addressUpdateParameter: AddressUpdateParameter,
    options?: AddressesUpdateOptionalParams,
  ) => PollerLike<OperationState<AddressResource>, AddressResource>;
  /**
   * Create a new address with the specified parameters. Existing address cannot be updated with this API and should
   * instead be updated with the Update address API.
   */
  create: (
    resourceGroupName: string,
    addressName: string,
    addressResource: AddressResource,
    options?: AddressesCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get information about the specified address. */
  get: (
    resourceGroupName: string,
    addressName: string,
    options?: AddressesGetOptionalParams,
  ) => Promise<AddressResource>;
}

function _getAddresses(context: EdgeOrderContext) {
  return {
    listBySubscription: (options?: AddressesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AddressesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      addressName: string,
      options?: AddressesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, addressName, options),
    update: (
      resourceGroupName: string,
      addressName: string,
      addressUpdateParameter: AddressUpdateParameter,
      options?: AddressesUpdateOptionalParams,
    ) => update(context, resourceGroupName, addressName, addressUpdateParameter, options),
    create: (
      resourceGroupName: string,
      addressName: string,
      addressResource: AddressResource,
      options?: AddressesCreateOptionalParams,
    ) => create(context, resourceGroupName, addressName, addressResource, options),
    get: (resourceGroupName: string, addressName: string, options?: AddressesGetOptionalParams) =>
      get(context, resourceGroupName, addressName, options),
  };
}

export function _getAddressesOperations(context: EdgeOrderContext): AddressesOperations {
  return {
    ..._getAddresses(context),
  };
}
