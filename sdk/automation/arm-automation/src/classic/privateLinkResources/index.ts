// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listAutomation } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListAutomationOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for Automation account. */
  listAutomation: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: PrivateLinkResourcesListAutomationOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: AutomationContext) {
  return {
    listAutomation: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: PrivateLinkResourcesListAutomationOptionalParams,
    ) => listAutomation(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AutomationContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
