// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { undoEdit, get, replaceContent, getContent } from "../../api/runbookDraft/operations.js";
import type {
  RunbookDraftUndoEditOptionalParams,
  RunbookDraftGetOptionalParams,
  RunbookDraftReplaceContentOptionalParams,
  RunbookDraftGetContentOptionalParams,
} from "../../api/runbookDraft/options.js";
import type {
  RunbookDraft,
  RunbookDraftUndoEditResult,
  RunbookDraftGetContentResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RunbookDraft operations. */
export interface RunbookDraftOperations {
  /** Undo draft edit to last known published state identified by runbook name. */
  undoEdit: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftUndoEditOptionalParams,
  ) => Promise<RunbookDraftUndoEditResult>;
  /** Retrieve the runbook draft identified by runbook name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftGetOptionalParams,
  ) => Promise<RunbookDraft>;
  /** Replaces the runbook draft content. */
  replaceContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftReplaceContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use replaceContent instead */
  beginReplaceContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftReplaceContentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use replaceContent instead */
  beginReplaceContentAndWait: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    runbookContent: string,
    options?: RunbookDraftReplaceContentOptionalParams,
  ) => Promise<void>;
  /** Retrieve the content of runbook draft identified by runbook name. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: RunbookDraftGetContentOptionalParams,
  ) => Promise<RunbookDraftGetContentResponse>;
}

function _getRunbookDraft(context: AutomationContext) {
  return {
    undoEdit: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDraftUndoEditOptionalParams,
    ) => undoEdit(context, resourceGroupName, automationAccountName, runbookName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: RunbookDraftGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
    replaceContent: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      runbookContent: string,
      options?: RunbookDraftReplaceContentOptionalParams,
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
      options?: RunbookDraftReplaceContentOptionalParams,
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
      options?: RunbookDraftReplaceContentOptionalParams,
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
      options?: RunbookDraftGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, runbookName, options),
  };
}

export function _getRunbookDraftOperations(context: AutomationContext): RunbookDraftOperations {
  return {
    ..._getRunbookDraft(context),
  };
}
