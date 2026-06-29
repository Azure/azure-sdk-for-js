// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { update, createOrUpdate, get } from "../../api/diagnosticSettings/operations.js";
import type {
  DiagnosticSettingsUpdateOptionalParams,
  DiagnosticSettingsCreateOrUpdateOptionalParams,
  DiagnosticSettingsGetOptionalParams,
} from "../../api/diagnosticSettings/options.js";
import type {
  ServiceDiagnosticSettingsResource,
  ServiceDiagnosticSettingsResourcePatch,
} from "../../models/serviceDiagnosticsSettingsApi/models.js";

/** Interface representing a DiagnosticSettings operations. */
export interface DiagnosticSettingsOperations {
  /** Updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases. */
  update: (
    resourceUri: string,
    serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
    options?: DiagnosticSettingsUpdateOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
  /** Create or update new diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  createOrUpdate: (
    resourceUri: string,
    parameters: ServiceDiagnosticSettingsResource,
    options?: DiagnosticSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
  /** Gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  get: (
    resourceUri: string,
    options?: DiagnosticSettingsGetOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
}

function _getDiagnosticSettings(context: MonitorContext) {
  return {
    update: (
      resourceUri: string,
      serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
      options?: DiagnosticSettingsUpdateOptionalParams,
    ) => update(context, resourceUri, serviceDiagnosticSettingsResource, options),
    createOrUpdate: (
      resourceUri: string,
      parameters: ServiceDiagnosticSettingsResource,
      options?: DiagnosticSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, parameters, options),
    get: (resourceUri: string, options?: DiagnosticSettingsGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getDiagnosticSettingsOperations(
  context: MonitorContext,
): DiagnosticSettingsOperations {
  return {
    ..._getDiagnosticSettings(context),
  };
}
