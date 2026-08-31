// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, get } from "../../api/alertRuleTemplates/operations.js";
import type {
  AlertRuleTemplatesListOptionalParams,
  AlertRuleTemplatesGetOptionalParams,
} from "../../api/alertRuleTemplates/options.js";
import type { AlertRuleTemplateUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertRuleTemplates operations. */
export interface AlertRuleTemplatesOperations {
  /** Gets all alert rule templates. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: AlertRuleTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleTemplateUnion>;
  /** Gets the alert rule template. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    alertRuleTemplateId: string,
    options?: AlertRuleTemplatesGetOptionalParams,
  ) => Promise<AlertRuleTemplateUnion>;
}

function _getAlertRuleTemplates(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: AlertRuleTemplatesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      alertRuleTemplateId: string,
      options?: AlertRuleTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, alertRuleTemplateId, options),
  };
}

export function _getAlertRuleTemplatesOperations(
  context: SecurityInsightsContext,
): AlertRuleTemplatesOperations {
  return {
    ..._getAlertRuleTemplates(context),
  };
}
