// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { get } from "../../api/workspaceApiExport/operations.js";
import type { WorkspaceApiExportGetOptionalParams } from "../../api/workspaceApiExport/options.js";
import type { ApiExportResult, ExportFormat, ExportApi } from "../../models/models.js";

/** Interface representing a WorkspaceApiExport operations. */
export interface WorkspaceApiExportOperations {
  /** Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    apiId: string,
    format: ExportFormat,
    exportParam: ExportApi,
    options?: WorkspaceApiExportGetOptionalParams,
  ) => Promise<ApiExportResult>;
}

function _getWorkspaceApiExport(context: ApiManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      apiId: string,
      format: ExportFormat,
      exportParam: ExportApi,
      options?: WorkspaceApiExportGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        apiId,
        format,
        exportParam,
        options,
      ),
  };
}

export function _getWorkspaceApiExportOperations(
  context: ApiManagementContext,
): WorkspaceApiExportOperations {
  return {
    ..._getWorkspaceApiExport(context),
  };
}
