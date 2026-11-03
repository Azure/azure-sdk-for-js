// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { $delete, install, get } from "../../api/contentTemplate/operations.js";
import type {
  ContentTemplateDeleteOptionalParams,
  ContentTemplateInstallOptionalParams,
  ContentTemplateGetOptionalParams,
} from "../../api/contentTemplate/options.js";
import type { TemplateModel } from "../../models/models.js";

/** Interface representing a ContentTemplate operations. */
export interface ContentTemplateOperations {
  /** Delete an installed template. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    templateId: string,
    options?: ContentTemplateDeleteOptionalParams,
  ) => Promise<void>;
  /** Install a template. */
  install: (
    resourceGroupName: string,
    workspaceName: string,
    templateId: string,
    templateInstallationProperties: TemplateModel,
    options?: ContentTemplateInstallOptionalParams,
  ) => Promise<TemplateModel>;
  /**
   * Gets a template byt its identifier.
   * Expandable properties:
   * - properties/mainTemplate
   * - properties/dependantTemplates
   */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    templateId: string,
    options?: ContentTemplateGetOptionalParams,
  ) => Promise<TemplateModel>;
}

function _getContentTemplate(context: SecurityInsightsContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      templateId: string,
      options?: ContentTemplateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, templateId, options),
    install: (
      resourceGroupName: string,
      workspaceName: string,
      templateId: string,
      templateInstallationProperties: TemplateModel,
      options?: ContentTemplateInstallOptionalParams,
    ) =>
      install(
        context,
        resourceGroupName,
        workspaceName,
        templateId,
        templateInstallationProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      templateId: string,
      options?: ContentTemplateGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, templateId, options),
  };
}

export function _getContentTemplateOperations(
  context: SecurityInsightsContext,
): ContentTemplateOperations {
  return {
    ..._getContentTemplate(context),
  };
}
