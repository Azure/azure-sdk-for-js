// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/licenseProfiles/operations.js";
import {
  LicenseProfilesListOptionalParams,
  LicenseProfilesDeleteOptionalParams,
  LicenseProfilesUpdateOptionalParams,
  LicenseProfilesCreateOrUpdateOptionalParams,
  LicenseProfilesGetOptionalParams,
} from "../../api/licenseProfiles/options.js";
import { LicenseProfile, LicenseProfileUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LicenseProfiles operations. */
export interface LicenseProfilesOperations {
  /** The operation to get all license profiles of a non-Azure machine */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: LicenseProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<LicenseProfile>;
  /** The operation to delete a license profile. */
  delete: (
    resourceGroupName: string,
    machineName: string,
    options?: LicenseProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    machineName: string,
    options?: LicenseProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    machineName: string,
    options?: LicenseProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a license profile. */
  update: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfileUpdate,
    options?: LicenseProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<LicenseProfile>, LicenseProfile>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfileUpdate,
    options?: LicenseProfilesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LicenseProfile>, LicenseProfile>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfileUpdate,
    options?: LicenseProfilesUpdateOptionalParams,
  ) => Promise<LicenseProfile>;
  /** The operation to create or update a license profile. */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfile,
    options?: LicenseProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LicenseProfile>, LicenseProfile>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfile,
    options?: LicenseProfilesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LicenseProfile>, LicenseProfile>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    parameters: LicenseProfile,
    options?: LicenseProfilesCreateOrUpdateOptionalParams,
  ) => Promise<LicenseProfile>;
  /** Retrieves information about the view of a license profile. */
  get: (
    resourceGroupName: string,
    machineName: string,
    options?: LicenseProfilesGetOptionalParams,
  ) => Promise<LicenseProfile>;
}

function _getLicenseProfiles(context: HybridComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      machineName: string,
      options?: LicenseProfilesListOptionalParams,
    ) => list(context, resourceGroupName, machineName, options),
    delete: (
      resourceGroupName: string,
      machineName: string,
      options?: LicenseProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, machineName, options),
    beginDelete: async (
      resourceGroupName: string,
      machineName: string,
      options?: LicenseProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, machineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      machineName: string,
      options?: LicenseProfilesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, machineName, options);
    },
    update: (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfileUpdate,
      options?: LicenseProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, machineName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfileUpdate,
      options?: LicenseProfilesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, machineName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfileUpdate,
      options?: LicenseProfilesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, machineName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfile,
      options?: LicenseProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, machineName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfile,
      options?: LicenseProfilesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, machineName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      parameters: LicenseProfile,
      options?: LicenseProfilesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, machineName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      machineName: string,
      options?: LicenseProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, options),
  };
}

export function _getLicenseProfilesOperations(
  context: HybridComputeManagementContext,
): LicenseProfilesOperations {
  return {
    ..._getLicenseProfiles(context),
  };
}
