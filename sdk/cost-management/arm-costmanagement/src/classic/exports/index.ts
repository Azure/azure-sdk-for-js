// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import {
  getExecutionHistory,
  execute,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/exports/operations.js";
import type {
  ExportsGetExecutionHistoryOptionalParams,
  ExportsExecuteOptionalParams,
  ExportsListOptionalParams,
  ExportsDeleteOptionalParams,
  ExportsCreateOrUpdateOptionalParams,
  ExportsGetOptionalParams,
} from "../../api/exports/options.js";
import type { Export, ExportExecutionListResult, ExportListResult } from "../../models/models.js";

/** Interface representing a Exports operations. */
export interface ExportsOperations {
  /** The operation to get the run history of an export for the defined scope and export name. */
  getExecutionHistory: (
    scope: string,
    exportName: string,
    options?: ExportsGetExecutionHistoryOptionalParams,
  ) => Promise<ExportExecutionListResult>;
  /** The operation to run an export. */
  execute: (
    scope: string,
    exportName: string,
    options?: ExportsExecuteOptionalParams,
  ) => Promise<void>;
  /** The operation to list all exports at the given scope. */
  list: (scope: string, options?: ExportsListOptionalParams) => Promise<ExportListResult>;
  /** The operation to delete a export. */
  delete: (
    scope: string,
    exportName: string,
    options?: ExportsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
  createOrUpdate: (
    scope: string,
    exportName: string,
    parameters: Export,
    options?: ExportsCreateOrUpdateOptionalParams,
  ) => Promise<Export>;
  /** The operation to get the export for the defined scope by export name. */
  get: (scope: string, exportName: string, options?: ExportsGetOptionalParams) => Promise<Export>;
}

function _getExports(context: CostManagementContext) {
  return {
    getExecutionHistory: (
      scope: string,
      exportName: string,
      options?: ExportsGetExecutionHistoryOptionalParams,
    ) => getExecutionHistory(context, scope, exportName, options),
    execute: (scope: string, exportName: string, options?: ExportsExecuteOptionalParams) =>
      execute(context, scope, exportName, options),
    list: (scope: string, options?: ExportsListOptionalParams) => list(context, scope, options),
    delete: (scope: string, exportName: string, options?: ExportsDeleteOptionalParams) =>
      $delete(context, scope, exportName, options),
    createOrUpdate: (
      scope: string,
      exportName: string,
      parameters: Export,
      options?: ExportsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, exportName, parameters, options),
    get: (scope: string, exportName: string, options?: ExportsGetOptionalParams) =>
      get(context, scope, exportName, options),
  };
}

export function _getExportsOperations(context: CostManagementContext): ExportsOperations {
  return {
    ..._getExports(context),
  };
}
