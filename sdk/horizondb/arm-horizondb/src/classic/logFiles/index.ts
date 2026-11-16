// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { listDownloadUrls, list, get } from "../../api/logFiles/operations.js";
import type {
  LogFilesListDownloadUrlsOptionalParams,
  LogFilesListOptionalParams,
  LogFilesGetOptionalParams,
} from "../../api/logFiles/options.js";
import type { LogFile, LogFileDownloadUrl } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LogFiles operations. */
export interface LogFilesOperations {
  /** Gets a short-lived signed URL for downloading a captured log file. The signed URL is returned only by this action so routine resource GET and LIST responses do not expose bearer credentials. */
  listDownloadUrls: (
    resourceGroupName: string,
    clusterName: string,
    logFileName: string,
    options?: LogFilesListDownloadUrlsOptionalParams,
  ) => Promise<LogFileDownloadUrl>;
  /** Lists captured log files for a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: LogFilesListOptionalParams,
  ) => PagedAsyncIterableIterator<LogFile>;
  /** Gets metadata for a captured HorizonDB log file. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    logFileName: string,
    options?: LogFilesGetOptionalParams,
  ) => Promise<LogFile>;
}

function _getLogFiles(context: HorizonDbContext) {
  return {
    listDownloadUrls: (
      resourceGroupName: string,
      clusterName: string,
      logFileName: string,
      options?: LogFilesListDownloadUrlsOptionalParams,
    ) => listDownloadUrls(context, resourceGroupName, clusterName, logFileName, options),
    list: (resourceGroupName: string, clusterName: string, options?: LogFilesListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      logFileName: string,
      options?: LogFilesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, logFileName, options),
  };
}

export function _getLogFilesOperations(context: HorizonDbContext): LogFilesOperations {
  return {
    ..._getLogFiles(context),
  };
}
