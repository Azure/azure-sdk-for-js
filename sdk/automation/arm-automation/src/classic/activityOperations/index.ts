// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByModule, get } from "../../api/activityOperations/operations.js";
import type {
  ActivityOperationsListByModuleOptionalParams,
  ActivityOperationsGetOptionalParams,
} from "../../api/activityOperations/options.js";
import type { Activity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ActivityOperations operations. */
export interface ActivityOperationsOperations {
  /** Retrieve a list of activities in the module identified by module name. */
  listByModule: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ActivityOperationsListByModuleOptionalParams,
  ) => PagedAsyncIterableIterator<Activity>;
  /** Retrieve the activity in the module identified by module name and activity name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    activityName: string,
    options?: ActivityOperationsGetOptionalParams,
  ) => Promise<Activity>;
}

function _getActivityOperations(context: AutomationContext) {
  return {
    listByModule: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      options?: ActivityOperationsListByModuleOptionalParams,
    ) => listByModule(context, resourceGroupName, automationAccountName, moduleName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      activityName: string,
      options?: ActivityOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, moduleName, activityName, options),
  };
}

export function _getActivityOperationsOperations(
  context: AutomationContext,
): ActivityOperationsOperations {
  return {
    ..._getActivityOperations(context),
  };
}
