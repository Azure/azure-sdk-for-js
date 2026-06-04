// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dscNodeConfiguration/operations.js";
import type {
  DscNodeConfigurationListByAutomationAccountOptionalParams,
  DscNodeConfigurationDeleteOptionalParams,
  DscNodeConfigurationCreateOrUpdateOptionalParams,
  DscNodeConfigurationGetOptionalParams,
} from "../../api/dscNodeConfiguration/options.js";
import type {
  DscNodeConfiguration,
  DscNodeConfigurationCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DscNodeConfiguration operations. */
export interface DscNodeConfigurationOperations {
  /** Retrieve a list of dsc node configurations. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscNodeConfigurationListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscNodeConfiguration>;
  /** Delete the Dsc node configurations by node configuration. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    options?: DscNodeConfigurationDeleteOptionalParams,
  ) => Promise<void>;
  /** Create the node configuration identified by node configuration name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<DscNodeConfiguration>;
  /** Retrieve the Dsc node configurations by node configuration. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    options?: DscNodeConfigurationGetOptionalParams,
  ) => Promise<DscNodeConfiguration>;
}

function _getDscNodeConfiguration(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscNodeConfigurationListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      options?: DscNodeConfigurationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, nodeConfigurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      parameters: DscNodeConfigurationCreateOrUpdateParameters,
      options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        nodeConfigurationName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      parameters: DscNodeConfigurationCreateOrUpdateParameters,
      options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        nodeConfigurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      parameters: DscNodeConfigurationCreateOrUpdateParameters,
      options?: DscNodeConfigurationCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        nodeConfigurationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      options?: DscNodeConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, nodeConfigurationName, options),
  };
}

export function _getDscNodeConfigurationOperations(
  context: AutomationContext,
): DscNodeConfigurationOperations {
  return {
    ..._getDscNodeConfiguration(context),
  };
}
