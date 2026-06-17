// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/contentTemplates/operations.js";
import type { ContentTemplatesListOptionalParams } from "../../api/contentTemplates/options.js";
import type { TemplateModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContentTemplates operations. */
export interface ContentTemplatesOperations {
  /**
   * Gets all installed templates.
   * Expandable properties:
   * - properties/mainTemplate
   * - properties/dependantTemplates
   */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ContentTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<TemplateModel>;
}

function _getContentTemplates(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ContentTemplatesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getContentTemplatesOperations(
  context: SecurityInsightsContext,
): ContentTemplatesOperations {
  return {
    ..._getContentTemplates(context),
  };
}
