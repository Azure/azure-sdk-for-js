// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/diagnosticSettings/operations.js";
import type {
  DiagnosticSettingsListOptionalParams,
  DiagnosticSettingsDeleteOptionalParams,
  DiagnosticSettingsCreateOrUpdateOptionalParams,
  DiagnosticSettingsGetOptionalParams,
} from "../../api/diagnosticSettings/options.js";
import type { DiagnosticsSettingsDiagnosticSettingsResource } from "../../models/diagnosticsSettings/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiagnosticSettings operations. */
export interface DiagnosticSettingsOperations {
  /** Gets the active diagnostic settings list for the specified resource. */
  list: (
    resourceUri: string,
    options?: DiagnosticSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticsSettingsDiagnosticSettingsResource>;
  /** Deletes existing diagnostic settings for the specified resource. */
  delete: (
    resourceUri: string,
    name: string,
    options?: DiagnosticSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates diagnostic settings for the specified resource. */
  createOrUpdate: (
    resourceUri: string,
    name: string,
    parameters: DiagnosticsSettingsDiagnosticSettingsResource,
    options?: DiagnosticSettingsCreateOrUpdateOptionalParams,
  ) => Promise<DiagnosticsSettingsDiagnosticSettingsResource>;
  /** Gets the active diagnostic settings for the specified resource. */
  get: (
    resourceUri: string,
    name: string,
    options?: DiagnosticSettingsGetOptionalParams,
  ) => Promise<DiagnosticsSettingsDiagnosticSettingsResource>;
}

function _getDiagnosticSettings(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: DiagnosticSettingsListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (resourceUri: string, name: string, options?: DiagnosticSettingsDeleteOptionalParams) =>
      $delete(context, resourceUri, name, options),
    createOrUpdate: (
      resourceUri: string,
      name: string,
      parameters: DiagnosticsSettingsDiagnosticSettingsResource,
      options?: DiagnosticSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, name, parameters, options),
    get: (resourceUri: string, name: string, options?: DiagnosticSettingsGetOptionalParams) =>
      get(context, resourceUri, name, options),
  };
}

export function _getDiagnosticSettingsOperations(
  context: MonitorContext,
): DiagnosticSettingsOperations {
  return {
    ..._getDiagnosticSettings(context),
  };
}
