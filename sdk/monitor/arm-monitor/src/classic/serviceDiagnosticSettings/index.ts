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
  ServiceDiagnosticSettingsResource,
  ServiceDiagnosticSettingsResourcePatch,
} from "../../models/microsoft/serviceDiagnosticsSettings/models.js";

/** Interface representing a ServiceDiagnosticSettings operations. */
export interface ServiceDiagnosticSettingsOperations {
  /** Updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases. */
  update: (
    resourceUri: string,
    serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
    options?: ServiceDiagnosticSettingsUpdateOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
  /** Create or update new diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  createOrUpdate: (
    resourceUri: string,
    parameters: ServiceDiagnosticSettingsResource,
    options?: ServiceDiagnosticSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
  /** Gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
  get: (
    resourceUri: string,
    options?: ServiceDiagnosticSettingsGetOptionalParams,
  ) => Promise<ServiceDiagnosticSettingsResource>;
}

function _getServiceDiagnosticSettings(context: MonitorContext) {
  return {
    update: (
      resourceUri: string,
      serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
      options?: ServiceDiagnosticSettingsUpdateOptionalParams,
    ) => update(context, resourceUri, serviceDiagnosticSettingsResource, options),
    createOrUpdate: (
      resourceUri: string,
      parameters: ServiceDiagnosticSettingsResource,
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
