// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  undoEdit,
  get,
  replaceContent,
  getContent,
} from "../../api/runbookDraftOperations/operations.js";
import type {
  RunbookDraftOperationsUndoEditOptionalParams,
  RunbookDraftOperationsGetOptionalParams,
  RunbookDraftOperationsReplaceContentOptionalParams,
  RunbookDraftOperationsGetContentOptionalParams,
} from "../../api/runbookDraftOperations/options.js";
import type {
  RunbookDraft,
  RunbookDraftUndoEditResult,
  RunbookDraftOperationsGetContentResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RunbookDraftOperations operations. */
export interface RunbookDraftOperationsOperations {
  /** Undo draft edit to last known published state identified by runbook name. */
  undoEdit: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftOperationsUndoEditOptionalParams,
  ) => Promise<RunbookDraftUndoEditResult>;
  /** Retrieve the runbook draft identified by runbook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftOperationsGetOptionalParams,
  ) => Promise<RunbookDraft>;
  /** Replaces the runbook draft content. */
  replaceContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftOperationsReplaceContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use replaceContent instead */
  beginReplaceContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftOperationsReplaceContentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use replaceContent instead */
  beginReplaceContentAndWait: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftOperationsReplaceContentOptionalParams,
  ) => Promise<void>;
  /** Retrieve the content of runbook draft identified by runbook name. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftOperationsGetContentOptionalParams,
  ) => Promise<RunbookDraftOperationsGetContentResponse>;
}

function _getRunbookDraftOperations(context: AutomationContext) {
  return {
    undoEdit: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDraftOperationsUndoEditOptionalParams,
    ) => undoEdit(context, resourceGroupName, automationAccountName, runbookName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDraftOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
    replaceContent: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      runbookContent: string,
      options?: RunbookDraftOperationsReplaceContentOptionalParams,
    ) =>
      replaceContent(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        runbookContent,
        options,
      ),
    beginReplaceContent: async (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      runbookContent: string,
      options?: RunbookDraftOperationsReplaceContentOptionalParams,
    ) => {
      const poller = replaceContent(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        runbookContent,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReplaceContentAndWait: async (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      runbookContent: string,
      options?: RunbookDraftOperationsReplaceContentOptionalParams,
    ) => {
      return await replaceContent(
        context,
        resourceGroupName,
        automationAccountName,
        runbookName,
        runbookContent,
        options,
      );
    },
    getContent: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDraftOperationsGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, runbookName, options),
  };
}

export function _getRunbookDraftOperationsOperations(
  context: AutomationContext,
): RunbookDraftOperationsOperations {
  return {
    ..._getRunbookDraftOperations(context),
  };
}
