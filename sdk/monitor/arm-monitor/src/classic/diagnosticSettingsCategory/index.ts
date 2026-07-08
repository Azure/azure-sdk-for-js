// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list, get } from "../../api/diagnosticSettingsCategory/operations.js";
import type {
  DiagnosticSettingsCategoryListOptionalParams,
  DiagnosticSettingsCategoryGetOptionalParams,
} from "../../api/diagnosticSettingsCategory/options.js";
import type { DiagnosticsSettingsDiagnosticSettingsCategoryResource } from "../../models/diagnosticsSettings/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiagnosticSettingsCategory operations. */
export interface DiagnosticSettingsCategoryOperations {
  /** Lists the diagnostic settings categories for the specified resource. */
  list: (
    resourceUri: string,
    options?: DiagnosticSettingsCategoryListOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticsSettingsDiagnosticSettingsCategoryResource>;
  /** Gets the diagnostic settings category for the specified resource. */
  get: (
    resourceUri: string,
    name: string,
    options?: DiagnosticSettingsCategoryGetOptionalParams,
  ) => Promise<DiagnosticsSettingsDiagnosticSettingsCategoryResource>;
}

function _getDiagnosticSettingsCategory(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: DiagnosticSettingsCategoryListOptionalParams) =>
      list(context, resourceUri, options),
    get: (
      resourceUri: string,
      name: string,
      options?: DiagnosticSettingsCategoryGetOptionalParams,
    ) => get(context, resourceUri, name, options),
  };
}

export function _getDiagnosticSettingsCategoryOperations(
  context: MonitorContext,
): DiagnosticSettingsCategoryOperations {
  return {
    ..._getDiagnosticSettingsCategory(context),
  };
}
