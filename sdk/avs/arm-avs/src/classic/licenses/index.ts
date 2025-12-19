// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import {
  getProperties,
  $delete,
  createOrUpdate,
  get,
  list,
} from "../../api/licenses/operations.js";
import type {
  LicensesGetPropertiesOptionalParams,
  LicensesDeleteOptionalParams,
  LicensesCreateOrUpdateOptionalParams,
  LicensesGetOptionalParams,
  LicensesListOptionalParams,
} from "../../api/licenses/options.js";
import type { License, LicensePropertiesUnion, LicenseName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Licenses operations. */
export interface LicensesOperations {
  /** Just like ArmResourceActionSync, but with no request body. */
  getProperties: (
    resourceGroupName: string,
    privateCloudName: string,
    licenseName: LicenseName,
    options?: LicensesGetPropertiesOptionalParams,
  ) => Promise<LicensePropertiesUnion>;
  /** Delete a License */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    licenseName: LicenseName,
    options?: LicensesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a License */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    licenseName: LicenseName,
    resource: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<License>, License>;
  /** Get a License */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    licenseName: LicenseName,
    options?: LicensesGetOptionalParams,
  ) => Promise<License>;
  /** List License resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: LicensesListOptionalParams,
  ) => PagedAsyncIterableIterator<License>;
}

function _getLicenses(context: AzureVMwareSolutionAPIContext) {
  return {
    getProperties: (
      resourceGroupName: string,
      privateCloudName: string,
      licenseName: LicenseName,
      options?: LicensesGetPropertiesOptionalParams,
    ) => getProperties(context, resourceGroupName, privateCloudName, licenseName, options),
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      licenseName: LicenseName,
      options?: LicensesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, licenseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      licenseName: LicenseName,
      resource: License,
      options?: LicensesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, privateCloudName, licenseName, resource, options),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      licenseName: LicenseName,
      options?: LicensesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, licenseName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: LicensesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getLicensesOperations(context: AzureVMwareSolutionAPIContext): LicensesOperations {
  return {
    ..._getLicenses(context),
  };
}
