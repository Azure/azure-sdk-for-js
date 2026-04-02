// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterProfiles/operations.js";
import type {
  NetworkSecurityPerimeterProfilesListOptionalParams,
  NetworkSecurityPerimeterProfilesDeleteOptionalParams,
  NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterProfilesGetOptionalParams,
} from "../../api/networkSecurityPerimeterProfiles/options.js";
import type { NspProfile } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkSecurityPerimeterProfiles operations. */
export interface NetworkSecurityPerimeterProfilesOperations {
  /** Lists the NSP profiles in the specified network security perimeter. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<NspProfile>;
  /** Deletes an NSP profile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    options?: NetworkSecurityPerimeterProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network profile. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    parameters: NspProfile,
    options?: NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams,
  ) => Promise<NspProfile>;
  /** Gets the specified NSP profile. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    profileName: string,
    options?: NetworkSecurityPerimeterProfilesGetOptionalParams,
  ) => Promise<NspProfile>;
}

function _getNetworkSecurityPerimeterProfiles(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimeterProfilesListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      options?: NetworkSecurityPerimeterProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkSecurityPerimeterName, profileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      parameters: NspProfile,
      options?: NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        profileName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      profileName: string,
      options?: NetworkSecurityPerimeterProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityPerimeterName, profileName, options),
  };
}

export function _getNetworkSecurityPerimeterProfilesOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterProfilesOperations {
  return {
    ..._getNetworkSecurityPerimeterProfiles(context),
  };
}
