// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByRuntimeEnvironment,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/package/operations.js";
import type {
  PackageListByRuntimeEnvironmentOptionalParams,
  PackageDeleteOptionalParams,
  PackageUpdateOptionalParams,
  PackageCreateOrUpdateOptionalParams,
  PackageGetOptionalParams,
} from "../../api/package/options.js";
import type {
  Package,
  PackageCreateOrUpdateParameters,
  PackageUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Package operations. */
export interface PackageOperations {
  /** Retrieve the a list of Packages */
  listByRuntimeEnvironment: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    options?: PackageListByRuntimeEnvironmentOptionalParams,
  ) => PagedAsyncIterableIterator<Package>;
  /** Delete the package by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    packageName: string,
    options?: PackageDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the Package identified by Package name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    packageName: string,
    parameters: PackageUpdateParameters,
    options?: PackageUpdateOptionalParams,
  ) => Promise<Package>;
  /** Create or update the package identified by package name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    packageName: string,
    parameters: PackageCreateOrUpdateParameters,
    options?: PackageCreateOrUpdateOptionalParams,
  ) => Promise<Package>;
  /** Retrieve the Package identified by Package name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    packageName: string,
    options?: PackageGetOptionalParams,
  ) => Promise<Package>;
}

function _getPackage(context: AutomationContext) {
  return {
    listByRuntimeEnvironment: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      options?: PackageListByRuntimeEnvironmentOptionalParams,
    ) =>
      listByRuntimeEnvironment(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      packageName: string,
      options?: PackageDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        packageName,
        options,
      ),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      packageName: string,
      parameters: PackageUpdateParameters,
      options?: PackageUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        packageName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      packageName: string,
      parameters: PackageCreateOrUpdateParameters,
      options?: PackageCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        packageName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      packageName: string,
      options?: PackageGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        packageName,
        options,
      ),
  };
}

export function _getPackageOperations(context: AutomationContext): PackageOperations {
  return {
    ..._getPackage(context),
  };
}
