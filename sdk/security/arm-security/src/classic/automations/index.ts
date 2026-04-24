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
  AutomationsAPIAutomation,
  AutomationsAPIAutomationUpdateModel,
  AutomationsAPIAutomationValidationStatus,
} from "../../models/automationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Automations operations. */
export interface AutomationsOperations {
  /** Validates the security automation model before create or update. Any validation errors are returned to the client. */
  validate: (
    resourceGroupName: string,
    automationName: string,
    automation: AutomationsAPIAutomation,
    options?: AutomationsValidateOptionalParams,
  ) => Promise<AutomationsAPIAutomationValidationStatus>;
  /** Lists all the security automations in the specified subscription. Use the 'nextLink' property in the response to get the next page of security automations for the specified subscription. */
  list: (
    options?: AutomationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationsAPIAutomation>;
  /** Lists all the security automations in the specified resource group. Use the 'nextLink' property in the response to get the next page of security automations for the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutomationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationsAPIAutomation>;
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
    automation: AutomationsAPIAutomationUpdateModel,
    options?: AutomationsUpdateOptionalParams,
  ) => Promise<AutomationsAPIAutomation>;
  /** Creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated. */
  createOrUpdate: (
    resourceGroupName: string,
    automationName: string,
    automation: AutomationsAPIAutomation,
    options?: AutomationsCreateOrUpdateOptionalParams,
  ) => Promise<AutomationsAPIAutomation>;
  /** Retrieves information about the model of a security automation. */
  get: (
    resourceGroupName: string,
    automationName: string,
    options?: AutomationsGetOptionalParams,
  ) => Promise<AutomationsAPIAutomation>;
}

function _getAutomations(context: SecurityCenterContext) {
  return {
    validate: (
      resourceGroupName: string,
      automationName: string,
      automation: AutomationsAPIAutomation,
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
      automation: AutomationsAPIAutomationUpdateModel,
      options?: AutomationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationName, automation, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationName: string,
      automation: AutomationsAPIAutomation,
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
