// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  validateLicense,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/licenses/operations.js";
import type {
  LicensesValidateLicenseOptionalParams,
  LicensesListBySubscriptionOptionalParams,
  LicensesListByResourceGroupOptionalParams,
  LicensesDeleteOptionalParams,
  LicensesUpdateOptionalParams,
  LicensesCreateOrUpdateOptionalParams,
  LicensesGetOptionalParams,
} from "../../api/licenses/options.js";
import type { License, LicenseUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Licenses operations. */
export interface LicensesOperations {
  /** The operation to validate a license. */
  validateLicense: (
    parameters: License,
    options?: LicensesValidateLicenseOptionalParams,
  ) => PollerLike<OperationState<License>, License>;
  /** @deprecated use validateLicense instead */
  beginValidateLicense: (
    parameters: License,
    options?: LicensesValidateLicenseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<License>, License>>;
  /** @deprecated use validateLicense instead */
  beginValidateLicenseAndWait: (
    parameters: License,
    options?: LicensesValidateLicenseOptionalParams,
  ) => Promise<License>;
  /** The operation to get all licenses of a non-Azure machine */
  listBySubscription: (
    options?: LicensesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<License>;
  /** The operation to get all licenses of a non-Azure machine */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LicensesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<License>;
  /** The operation to delete a license. */
  delete: (
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a license. */
  update: (
    resourceGroupName: string,
    licenseName: string,
    parameters: LicenseUpdate,
    options?: LicensesUpdateOptionalParams,
  ) => PollerLike<OperationState<License>, License>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    licenseName: string,
    parameters: LicenseUpdate,
    options?: LicensesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<License>, License>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    licenseName: string,
    parameters: LicenseUpdate,
    options?: LicensesUpdateOptionalParams,
  ) => Promise<License>;
  /** The operation to create or update a license. */
  createOrUpdate: (
    resourceGroupName: string,
    licenseName: string,
    parameters: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<License>, License>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    licenseName: string,
    parameters: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<License>, License>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    licenseName: string,
    parameters: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ) => Promise<License>;
  /** Retrieves information about the view of a license. */
  get: (
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesGetOptionalParams,
  ) => Promise<License>;
}

function _getLicenses(context: HybridComputeManagementContext) {
  return {
    validateLicense: (parameters: License, options?: LicensesValidateLicenseOptionalParams) =>
      validateLicense(context, parameters, options),
    beginValidateLicense: async (
      parameters: License,
      options?: LicensesValidateLicenseOptionalParams,
    ) => {
      const poller = validateLicense(context, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateLicenseAndWait: async (
      parameters: License,
      options?: LicensesValidateLicenseOptionalParams,
    ) => {
      return await validateLicense(context, parameters, options);
    },
    listBySubscription: (options?: LicensesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LicensesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      licenseName: string,
      options?: LicensesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, licenseName, options),
    beginDelete: async (
      resourceGroupName: string,
      licenseName: string,
      options?: LicensesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, licenseName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      licenseName: string,
      options?: LicensesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, licenseName, options);
    },
    update: (
      resourceGroupName: string,
      licenseName: string,
      parameters: LicenseUpdate,
      options?: LicensesUpdateOptionalParams,
    ) => update(context, resourceGroupName, licenseName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      licenseName: string,
      parameters: LicenseUpdate,
      options?: LicensesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, licenseName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      licenseName: string,
      parameters: LicenseUpdate,
      options?: LicensesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, licenseName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      licenseName: string,
      parameters: License,
      options?: LicensesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, licenseName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      licenseName: string,
      parameters: License,
      options?: LicensesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, licenseName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      licenseName: string,
      parameters: License,
      options?: LicensesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, licenseName, parameters, options);
    },
    get: (resourceGroupName: string, licenseName: string, options?: LicensesGetOptionalParams) =>
      get(context, resourceGroupName, licenseName, options),
  };
}

export function _getLicensesOperations(
  context: HybridComputeManagementContext,
): LicensesOperations {
  return {
    ..._getLicenses(context),
  };
}
