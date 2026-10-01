// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/python3Package/operations.js";
import type {
  Python3PackageListByAutomationAccountOptionalParams,
  Python3PackageDeleteOptionalParams,
  Python3PackageUpdateOptionalParams,
  Python3PackageCreateOrUpdateOptionalParams,
  Python3PackageGetOptionalParams,
} from "../../api/python3Package/options.js";
import type {
  Module,
  PythonPackageCreateParameters,
  PythonPackageUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Python3Package operations. */
export interface Python3PackageOperations {
  /** Retrieve a list of python 3 packages. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: Python3PackageListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Module>;
  /** Delete the python 3 package by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    options?: Python3PackageDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the python 3 package identified by package name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    parameters: PythonPackageUpdateParameters,
    options?: Python3PackageUpdateOptionalParams,
  ) => Promise<Module>;
  /** Create or Update the python 3 package identified by package name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    parameters: PythonPackageCreateParameters,
    options?: Python3PackageCreateOrUpdateOptionalParams,
  ) => Promise<Module>;
  /** Retrieve the python 3 package identified by package name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    packageName: string,
    options?: Python3PackageGetOptionalParams,
  ) => Promise<Module>;
}

function _getPython3Package(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: Python3PackageListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      options?: Python3PackageDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, packageName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      parameters: PythonPackageUpdateParameters,
      options?: Python3PackageUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, packageName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      packageName: string,
      parameters: PythonPackageCreateParameters,
      options?: Python3PackageCreateOrUpdateOptionalParams,
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
      options?: Python3PackageGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, packageName, options),
  };
}

export function _getPython3PackageOperations(context: AutomationContext): Python3PackageOperations {
  return {
    ..._getPython3Package(context),
  };
}
