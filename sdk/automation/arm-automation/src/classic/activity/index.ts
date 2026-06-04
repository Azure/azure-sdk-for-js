// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByModule, get } from "../../api/activity/operations.js";
import type {
  ActivityListByModuleOptionalParams,
  ActivityGetOptionalParams,
} from "../../api/activity/options.js";
import type { Activity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Activity operations. */
export interface ActivityOperations {
  /** Retrieve a list of activities in the module identified by module name. */
  listByModule: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    options?: ActivityListByModuleOptionalParams,
  ) => PagedAsyncIterableIterator<Activity>;
  /** Retrieve the activity in the module identified by module name and activity name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    moduleName: string,
    activityName: string,
    options?: ActivityGetOptionalParams,
  ) => Promise<Activity>;
}

function _getActivity(context: AutomationContext) {
  return {
    listByModule: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      options?: ActivityListByModuleOptionalParams,
    ) => listByModule(context, resourceGroupName, automationAccountName, moduleName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      moduleName: string,
      activityName: string,
      options?: ActivityGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, moduleName, activityName, options),
  };
}

export function _getActivityOperations(context: AutomationContext): ActivityOperations {
  return {
    ..._getActivity(context),
  };
}
