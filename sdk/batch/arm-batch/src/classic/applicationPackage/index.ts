// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import { activate, list, $delete, create, get } from "../../api/applicationPackage/operations.js";
import type {
  ApplicationPackageActivateOptionalParams,
  ApplicationPackageListOptionalParams,
  ApplicationPackageDeleteOptionalParams,
  ApplicationPackageCreateOptionalParams,
  ApplicationPackageGetOptionalParams,
} from "../../api/applicationPackage/options.js";
import type {
  ApplicationPackage,
  ActivateApplicationPackageParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicationPackage operations. */
export interface ApplicationPackageOperations {
  /** Activates the specified application package. This should be done after the `ApplicationPackage` was created and uploaded. This needs to be done before an `ApplicationPackage` can be used on Pools or Tasks. */
  activate: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    versionName: string,
    parameters: ActivateApplicationPackageParameters,
    options?: ApplicationPackageActivateOptionalParams,
  ) => Promise<ApplicationPackage>;
  /** Lists all of the application packages in the specified application. */
  list: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    options?: ApplicationPackageListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationPackage>;
  /** Deletes an application package record and its associated binary file. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    versionName: string,
    options?: ApplicationPackageDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an application package record. The record contains a storageUrl where the package should be uploaded to.  Once it is uploaded the `ApplicationPackage` needs to be activated using `ApplicationPackageActive` before it can be used. If the auto storage account was configured to use storage keys, the URL returned will contain a SAS. */
  create: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    versionName: string,
    options?: ApplicationPackageCreateOptionalParams,
  ) => Promise<ApplicationPackage>;
  /** Gets information about the specified application package. */
  get: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    versionName: string,
    options?: ApplicationPackageGetOptionalParams,
  ) => Promise<ApplicationPackage>;
}

function _getApplicationPackage(context: BatchManagementContext) {
  return {
    activate: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      versionName: string,
      parameters: ActivateApplicationPackageParameters,
      options?: ApplicationPackageActivateOptionalParams,
    ) =>
      activate(
        context,
        resourceGroupName,
        accountName,
        applicationName,
        versionName,
        parameters,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      options?: ApplicationPackageListOptionalParams,
    ) => list(context, resourceGroupName, accountName, applicationName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      versionName: string,
      options?: ApplicationPackageDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, applicationName, versionName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      versionName: string,
      options?: ApplicationPackageCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, applicationName, versionName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      versionName: string,
      options?: ApplicationPackageGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, applicationName, versionName, options),
  };
}

export function _getApplicationPackageOperations(
  context: BatchManagementContext,
): ApplicationPackageOperations {
  return {
    ..._getApplicationPackage(context),
  };
}
