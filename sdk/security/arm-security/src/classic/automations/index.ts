// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  validate,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/automations/operations.js";
import type {
  AutomationsValidateOptionalParams,
  AutomationsListOptionalParams,
  AutomationsListByResourceGroupOptionalParams,
  AutomationsDeleteOptionalParams,
  AutomationsUpdateOptionalParams,
  AutomationsCreateOrUpdateOptionalParams,
  AutomationsGetOptionalParams,
} from "../../api/automations/options.js";
import type {
  Automation,
  AutomationUpdateModel,
  AutomationValidationStatus,
} from "../../models/automationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Automations operations. */
export interface AutomationsOperations {
  /** Validates the security automation model before create or update. Any validation errors are returned to the client. */
  validate: (
    resourceGroupName: string,
    automationName: string,
    automation: Automation,
    options?: AutomationsValidateOptionalParams,
  ) => Promise<AutomationValidationStatus>;
  /** Lists all the security automations in the specified subscription. Use the 'nextLink' property in the response to get the next page of security automations for the specified subscription. */
  list: (options?: AutomationsListOptionalParams) => PagedAsyncIterableIterator<Automation>;
  /** Lists all the security automations in the specified resource group. Use the 'nextLink' property in the response to get the next page of security automations for the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutomationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Automation>;
  /** Deletes a security automation. */
  delete: (
    resourceGroupName: string,
    automationName: string,
    options?: AutomationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a security automation */
  update: (
    resourceGroupName: string,
    automationName: string,
    automation: AutomationUpdateModel,
    options?: AutomationsUpdateOptionalParams,
  ) => Promise<Automation>;
  /** Creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated. */
  createOrUpdate: (
    resourceGroupName: string,
    automationName: string,
    automation: Automation,
    options?: AutomationsCreateOrUpdateOptionalParams,
  ) => Promise<Automation>;
  /** Retrieves information about the model of a security automation. */
  get: (
    resourceGroupName: string,
    automationName: string,
    options?: AutomationsGetOptionalParams,
  ) => Promise<Automation>;
}

function _getAutomations(context: SecurityCenterContext) {
  return {
    validate: (
      resourceGroupName: string,
      automationName: string,
      automation: Automation,
      options?: AutomationsValidateOptionalParams,
    ) => validate(context, resourceGroupName, automationName, automation, options),
    list: (options?: AutomationsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutomationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      automationName: string,
      options?: AutomationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationName, options),
    update: (
      resourceGroupName: string,
      automationName: string,
      automation: AutomationUpdateModel,
      options?: AutomationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationName, automation, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationName: string,
      automation: Automation,
      options?: AutomationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, automationName, automation, options),
    get: (
      resourceGroupName: string,
      automationName: string,
      options?: AutomationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationName, options),
  };
}

export function _getAutomationsOperations(context: SecurityCenterContext): AutomationsOperations {
  return {
    ..._getAutomations(context),
  };
}
