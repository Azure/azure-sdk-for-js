// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  getContent,
  publish,
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/runbook/operations.js";
import type {
  RunbookGetContentOptionalParams,
  RunbookPublishOptionalParams,
  RunbookListByAutomationAccountOptionalParams,
  RunbookDeleteOptionalParams,
  RunbookUpdateOptionalParams,
  RunbookCreateOrUpdateOptionalParams,
  RunbookGetOptionalParams,
} from "../../api/runbook/options.js";
import type {
  Runbook,
  RunbookCreateOrUpdateParameters,
  RunbookUpdateParameters,
  RunbookGetContentResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Runbook operations. */
export interface RunbookOperations {
  /** Retrieve the content of runbook identified by runbook name. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookGetContentOptionalParams,
  ) => Promise<RunbookGetContentResponse>;
  /** Publish runbook draft. */
  publish: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use publish instead */
  beginPublish: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookPublishOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use publish instead */
  beginPublishAndWait: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookPublishOptionalParams,
  ) => Promise<void>;
  /** Retrieve a list of runbooks. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: RunbookListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Runbook>;
  /** Delete the runbook by name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the runbook identified by runbook name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: RunbookUpdateParameters,
    options?: RunbookUpdateOptionalParams,
  ) => Promise<Runbook>;
  /** Create the runbook identified by runbook name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: RunbookCreateOrUpdateParameters,
    options?: RunbookCreateOrUpdateOptionalParams,
  ) => Promise<Runbook>;
  /** Retrieve the runbook identified by runbook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookGetOptionalParams,
  ) => Promise<Runbook>;
}

function _getRunbook(context: AutomationContext) {
  return {
    getContent: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, runbookName, options),
    publish: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookPublishOptionalParams,
    ) => publish(context, resourceGroupName, automationAccountName, runbookName, options),
    beginPublish: async (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookPublishOptionalParams,
    ) => {
      const poller = publish(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPublishAndWait: async (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookPublishOptionalParams,
    ) => {
      return await publish(context, resourceGroupName, automationAccountName, runbookName, options);
    },
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: RunbookListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, runbookName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: RunbookUpdateParameters,
      options?: RunbookUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, runbookName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: RunbookCreateOrUpdateParameters,
      options?: RunbookCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
  };
}

export function _getRunbookOperations(context: AutomationContext): RunbookOperations {
  return {
    ..._getRunbook(context),
  };
}
