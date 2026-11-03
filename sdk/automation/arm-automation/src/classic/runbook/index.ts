// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { getContent, publish } from "../../api/runbook/operations.js";
import type {
  RunbookGetContentOptionalParams,
  RunbookPublishOptionalParams,
} from "../../api/runbook/options.js";
import type { RunbookGetContentResponse } from "../../models/models.js";
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
  };
}

export function _getRunbookOperations(context: AutomationContext): RunbookOperations {
  return {
    ..._getRunbook(context),
  };
}
