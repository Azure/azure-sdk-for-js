// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/logger/operations.js";
import type {
  LoggerListByServiceOptionalParams,
  LoggerDeleteOptionalParams,
  LoggerUpdateOptionalParams,
  LoggerCreateOrUpdateOptionalParams,
  LoggerGetEntityTagOptionalParams,
  LoggerGetOptionalParams,
} from "../../api/logger/options.js";
import type { LoggerContract, LoggerUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Logger operations. */
export interface LoggerOperations {
  /** Lists a collection of loggers in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: LoggerListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<LoggerContract>;
  /** Deletes the specified logger. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    loggerId: string,
    ifMatch: string,
    options?: LoggerDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing logger. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    loggerId: string,
    ifMatch: string,
    parameters: LoggerUpdateContract,
    options?: LoggerUpdateOptionalParams,
  ) => Promise<LoggerContract>;
  /** Creates or Updates a logger. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    loggerId: string,
    parameters: LoggerContract,
    options?: LoggerCreateOrUpdateOptionalParams,
  ) => Promise<LoggerContract>;
  /** Gets the entity state (Etag) version of the logger specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    loggerId: string,
    options?: LoggerGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the logger specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    loggerId: string,
    options?: LoggerGetOptionalParams,
  ) => Promise<LoggerContract>;
}

function _getLogger(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: LoggerListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      loggerId: string,
      ifMatch: string,
      options?: LoggerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, loggerId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      loggerId: string,
      ifMatch: string,
      parameters: LoggerUpdateContract,
      options?: LoggerUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, loggerId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      loggerId: string,
      parameters: LoggerContract,
      options?: LoggerCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, loggerId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      loggerId: string,
      options?: LoggerGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, loggerId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      loggerId: string,
      options?: LoggerGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, loggerId, options),
  };
}

export function _getLoggerOperations(context: ApiManagementContext): LoggerOperations {
  return {
    ..._getLogger(context),
  };
}
