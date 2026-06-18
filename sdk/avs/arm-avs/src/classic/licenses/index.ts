// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import {
  getProperties,
  $delete,
  createOrUpdate,
  get,
  list,
} from "../../api/licenses/operations.js";
import {
  LicensesGetPropertiesOptionalParams,
  LicensesDeleteOptionalParams,
  LicensesCreateOrUpdateOptionalParams,
  LicensesGetOptionalParams,
  LicensesListOptionalParams,
} from "../../api/licenses/options.js";
import { License, LicensePropertiesUnion, LicenseName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
