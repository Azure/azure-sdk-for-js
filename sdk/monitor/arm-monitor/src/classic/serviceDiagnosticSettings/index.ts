// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { update, createOrUpdate, get } from "../../api/serviceDiagnosticSettings/operations.js";
import type {
  ServiceDiagnosticSettingsUpdateOptionalParams,
  ServiceDiagnosticSettingsCreateOrUpdateOptionalParams,
  ServiceDiagnosticSettingsGetOptionalParams,
} from "../../api/serviceDiagnosticSettings/options.js";
import type {
  MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource,
  MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch,
} from "../../models/microsoft/serviceDiagnosticsSettings/models.js";

/** Interface representing a ServiceDiagnosticSettings operations. */
export interface ServiceDiagnosticSettingsOperations {
  /** Updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases. */
  update: (
    resourceUri: string,
    serviceDiagnosticSettingsResource: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch,
    options?: ServiceDiagnosticSettingsUpdateOptionalParams,
  ) => Promise<MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource>;
  /** Create or update new diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  createOrUpdate: (
    resourceUri: string,
    parameters: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource,
    options?: ServiceDiagnosticSettingsCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource>;
  /** Gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  get: (
    resourceUri: string,
    options?: ServiceDiagnosticSettingsGetOptionalParams,
  ) => Promise<MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource>;
}

function _getServiceDiagnosticSettings(context: MonitorContext) {
  return {
    update: (
      resourceUri: string,
      serviceDiagnosticSettingsResource: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch,
      options?: ServiceDiagnosticSettingsUpdateOptionalParams,
    ) => update(context, resourceUri, serviceDiagnosticSettingsResource, options),
    createOrUpdate: (
      resourceUri: string,
      parameters: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource,
      options?: ServiceDiagnosticSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, parameters, options),
    get: (resourceUri: string, options?: ServiceDiagnosticSettingsGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getServiceDiagnosticSettingsOperations(
  context: MonitorContext,
): ServiceDiagnosticSettingsOperations {
  return {
    ..._getServiceDiagnosticSettings(context),
  };
}
