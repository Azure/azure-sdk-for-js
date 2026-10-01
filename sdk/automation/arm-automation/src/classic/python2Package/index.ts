// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/python2Package/operations.js";
import type {
  Python2PackageListByAutomationAccountOptionalParams,
  Python2PackageDeleteOptionalParams,
  Python2PackageUpdateOptionalParams,
  Python2PackageCreateOrUpdateOptionalParams,
  Python2PackageGetOptionalParams,
} from "../../api/python2Package/options.js";
import type {
  Module,
  PythonPackageCreateParameters,
  PythonPackageUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Python2Package operations. */
export interface Python2PackageOperations {
  /** Retrieve a list of python 2 packages. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: Python2PackageListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Module>;
  /** Delete the python 2 package by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    options?: Python2PackageDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the python 2 package identified by package name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    parameters: PythonPackageUpdateParameters,
    options?: Python2PackageUpdateOptionalParams,
  ) => Promise<Module>;
  /** Create or Update the python 2 package identified by package name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    parameters: PythonPackageCreateParameters,
    options?: Python2PackageCreateOrUpdateOptionalParams,
  ) => Promise<Module>;
  /** Retrieve the python 2 package identified by package name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    options?: Python2PackageGetOptionalParams,
  ) => Promise<Module>;
}

function _getPython2Package(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: Python2PackageListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      options?: Python2PackageDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, packageName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      parameters: PythonPackageUpdateParameters,
      options?: Python2PackageUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, packageName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      parameters: PythonPackageCreateParameters,
      options?: Python2PackageCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        packageName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      options?: Python2PackageGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, packageName, options),
  };
}

export function _getPython2PackageOperations(context: AutomationContext): Python2PackageOperations {
  return {
    ..._getPython2Package(context),
  };
}
