// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { update, get, $delete, create, list } from "../../api/exportConfigurations/operations.js";
import {
  ExportConfigurationsUpdateOptionalParams,
  ExportConfigurationsGetOptionalParams,
  ExportConfigurationsDeleteOptionalParams,
  ExportConfigurationsCreateOptionalParams,
  ExportConfigurationsListOptionalParams,
} from "../../api/exportConfigurations/options.js";
import {
  ApplicationInsightsComponentExportConfiguration,
  ApplicationInsightsComponentExportRequest,
} from "../../models/componentAPIs/models.js";

/** Interface representing a ExportConfigurations operations. */
export interface ExportConfigurationsOperations {
  /** Update the Continuous Export configuration for this export id. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    exportId: string,
    exportProperties: ApplicationInsightsComponentExportRequest,
    options?: ExportConfigurationsUpdateOptionalParams,
  ) => Promise<ApplicationInsightsComponentExportConfiguration>;
  /** Get the Continuous Export configuration for this export id. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    exportId: string,
    options?: ExportConfigurationsGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentExportConfiguration>;
  /** Delete a Continuous Export configuration of an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    exportId: string,
    options?: ExportConfigurationsDeleteOptionalParams,
  ) => Promise<ApplicationInsightsComponentExportConfiguration>;
  /** Create a Continuous Export configuration of an Application Insights component. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    exportProperties: ApplicationInsightsComponentExportRequest,
    options?: ExportConfigurationsCreateOptionalParams,
  ) => Promise<ApplicationInsightsComponentExportConfiguration[]>;
  /** Gets a list of Continuous Export configuration of an Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ExportConfigurationsListOptionalParams,
  ) => Promise<ApplicationInsightsComponentExportConfiguration[]>;
}

function _getExportConfigurations(context: ApplicationInsightsManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      resourceName: string,
      exportId: string,
      exportProperties: ApplicationInsightsComponentExportRequest,
      options?: ExportConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, exportId, exportProperties, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      exportId: string,
      options?: ExportConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, exportId, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      exportId: string,
      options?: ExportConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, exportId, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      exportProperties: ApplicationInsightsComponentExportRequest,
      options?: ExportConfigurationsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, exportProperties, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ExportConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getExportConfigurationsOperations(
  context: ApplicationInsightsManagementContext,
): ExportConfigurationsOperations {
  return {
    ..._getExportConfigurations(context),
  };
}
