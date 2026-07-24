// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  $delete,
  createOrUpdate,
  get,
} from "../../api/dscNodeConfigurationOperations/operations.js";
import type {
  DscNodeConfigurationOperationsDeleteOptionalParams,
  DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
  DscNodeConfigurationOperationsGetOptionalParams,
} from "../../api/dscNodeConfigurationOperations/options.js";
import type {
  DscNodeConfiguration,
  DscNodeConfigurationCreateOrUpdateParameters,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DscNodeConfigurationOperations operations. */
export interface DscNodeConfigurationOperationsOperations {
  /** Delete the Dsc node configurations by node configuration. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    options?: DscNodeConfigurationOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create the node configuration identified by node configuration name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    parameters: DscNodeConfigurationCreateOrUpdateParameters,
    options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => Promise<DscNodeConfiguration>;
  /** Retrieve the Dsc node configurations by node configuration. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeConfigurationName: string,
    options?: DscNodeConfigurationOperationsGetOptionalParams,
  ) => Promise<DscNodeConfiguration>;
}

function _getDscNodeConfigurationOperations(context: AutomationContext) {
  return {
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      options?: DscNodeConfigurationOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, nodeConfigurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeConfigurationName: string,
      parameters: DscNodeConfigurationCreateOrUpdateParameters,
      options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
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
      options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
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
      options?: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
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
      options?: DscNodeConfigurationOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, nodeConfigurationName, options),
  };
}

export function _getDscNodeConfigurationOperationsOperations(
  context: AutomationContext,
): DscNodeConfigurationOperationsOperations {
  return {
    ..._getDscNodeConfigurationOperations(context),
  };
}
