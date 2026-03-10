// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/suppressionListAddresses/operations.js";
import type {
  SuppressionListAddressesListOptionalParams,
  SuppressionListAddressesDeleteOptionalParams,
  SuppressionListAddressesCreateOrUpdateOptionalParams,
  SuppressionListAddressesGetOptionalParams,
} from "../../api/suppressionListAddresses/options.js";
import type { SuppressionListAddressResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SuppressionListAddresses operations. */
export interface SuppressionListAddressesOperations {
  /** Get all the addresses in a suppression list. */
  list: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    options?: SuppressionListAddressesListOptionalParams,
  ) => PagedAsyncIterableIterator<SuppressionListAddressResource>;
  /** Operation to delete a single address from a suppression list. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    addressId: string,
    options?: SuppressionListAddressesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a SuppressionListAddress. */
  createOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    addressId: string,
    parameters: SuppressionListAddressResource,
    options?: SuppressionListAddressesCreateOrUpdateOptionalParams,
  ) => Promise<SuppressionListAddressResource>;
  /** Get a SuppressionListAddress. */
  get: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    addressId: string,
    options?: SuppressionListAddressesGetOptionalParams,
  ) => Promise<SuppressionListAddressResource>;
}

function _getSuppressionListAddresses(context: CommunicationServiceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      options?: SuppressionListAddressesListOptionalParams,
    ) =>
      list(context, resourceGroupName, emailServiceName, domainName, suppressionListName, options),
    delete: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      addressId: string,
      options?: SuppressionListAddressesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        addressId,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      addressId: string,
      parameters: SuppressionListAddressResource,
      options?: SuppressionListAddressesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        addressId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      addressId: string,
      options?: SuppressionListAddressesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        addressId,
        options,
      ),
  };
}

export function _getSuppressionListAddressesOperations(
  context: CommunicationServiceManagementContext,
): SuppressionListAddressesOperations {
  return {
    ..._getSuppressionListAddresses(context),
  };
}
