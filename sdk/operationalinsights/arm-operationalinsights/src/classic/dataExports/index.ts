// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { listByWorkspace, $delete, createOrUpdate, get } from "../../api/dataExports/operations.js";
import {
  DataExportsListByWorkspaceOptionalParams,
  DataExportsDeleteOptionalParams,
  DataExportsCreateOrUpdateOptionalParams,
  DataExportsGetOptionalParams,
} from "../../api/dataExports/options.js";
import { DataExport } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataExports operations. */
export interface DataExportsOperations {
  /** Lists the data export instances within a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DataExportsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<DataExport>;
  /** Deletes the specified data export in a given workspace.. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    dataExportName: string,
    options?: DataExportsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a data export. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dataExportName: string,
    parameters: DataExport,
    options?: DataExportsCreateOrUpdateOptionalParams,
  ) => Promise<DataExport>;
  /** Gets a data export instance. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dataExportName: string,
    options?: DataExportsGetOptionalParams,
  ) => Promise<DataExport>;
}

function _getDataExports(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DataExportsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      dataExportName: string,
      options?: DataExportsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, dataExportName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dataExportName: string,
      parameters: DataExport,
      options?: DataExportsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dataExportName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dataExportName: string,
      options?: DataExportsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dataExportName, options),
  };
}

export function _getDataExportsOperations(
  context: OperationalInsightsManagementContext,
): DataExportsOperations {
  return {
    ..._getDataExports(context),
  };
}
