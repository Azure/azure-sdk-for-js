// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import { list, $delete, update, create, get } from "../../api/application/operations.js";
import type {
  ApplicationListOptionalParams,
  ApplicationDeleteOptionalParams,
  ApplicationUpdateOptionalParams,
  ApplicationCreateOptionalParams,
  ApplicationGetOptionalParams,
} from "../../api/application/options.js";
import type { Application } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Application operations. */
export interface ApplicationOperations {
  /** Lists all of the applications in the specified account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ApplicationListOptionalParams,
  ) => PagedAsyncIterableIterator<Application>;
  /** Deletes an application. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    options?: ApplicationDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates settings for the specified application. */
  update: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    parameters: Application,
    options?: ApplicationUpdateOptionalParams,
  ) => Promise<Application>;
  /** Adds an application to the specified Batch account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    options?: ApplicationCreateOptionalParams,
  ) => Promise<Application>;
  /** Gets information about the specified application. */
  get: (
    resourceGroupName: string,
    accountName: string,
    applicationName: string,
    options?: ApplicationGetOptionalParams,
  ) => Promise<Application>;
}

function _getApplication(context: BatchManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ApplicationListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      options?: ApplicationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, applicationName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      parameters: Application,
      options?: ApplicationUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, applicationName, parameters, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      options?: ApplicationCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, applicationName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      applicationName: string,
      options?: ApplicationGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, applicationName, options),
  };
}

export function _getApplicationOperations(context: BatchManagementContext): ApplicationOperations {
  return {
    ..._getApplication(context),
  };
}
