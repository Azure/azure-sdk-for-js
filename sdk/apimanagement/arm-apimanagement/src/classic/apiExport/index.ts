// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { get } from "../../api/apiExport/operations.js";
import type { ApiExportGetOptionalParams } from "../../api/apiExport/options.js";
import type { ApiExportResult, ExportFormat, ExportApi } from "../../models/models.js";

/** Interface representing a ApiExport operations. */
export interface ApiExportOperations {
  /** Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    format: ExportFormat,
    exportParam: ExportApi,
    options?: ApiExportGetOptionalParams,
  ) => Promise<ApiExportResult>;
}

function _getApiExport(context: ApiManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      format: ExportFormat,
      exportParam: ExportApi,
      options?: ApiExportGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, format, exportParam, options),
  };
}

export function _getApiExportOperations(context: ApiManagementContext): ApiExportOperations {
  return {
    ..._getApiExport(context),
  };
}
